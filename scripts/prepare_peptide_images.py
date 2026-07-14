#!/usr/bin/env python3
"""
Download PrescribeRx catalog peptide images, remove studio backgrounds,
and map each featured TIDL product to a transparent PNG.

Usage (from repo root, with catalog JSON already saved):
  python scripts/prepare_peptide_images.py

Requires: pillow, urllib (stdlib)
"""

from __future__ import annotations

import json
import re
import urllib.request
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
CATALOG_JSON = ROOT / "scripts" / "prx-catalog-images.json"
OUT_CATALOG = ROOT / "public" / "peptides" / "catalog"
OUT_FEATURED = ROOT / "public" / "peptides"
MAP_JSON = ROOT / "src" / "lib" / "peptide-image-map.json"

# Featured TIDL products → preferred catalog name substrings (ordered).
# Matching prefers products that actually have an image_url.
FEATURED: dict[str, list[str]] = {
    "glp-1-weight-loss": ["tirzepatide", "semaglutide", "cagrilinitide", "retatrutide"],
    "retatrutide": ["reta 100", "reta 60", "reta 200", "retatrutide", "tirzepatide", "semaglutide"],
    "bpc-157": ["bpc-157 10mg", "bpc-157 20mg", "bpc-157", "wolverine", "glow"],
    "tb-500": ["tb-500 10mg", "tb-500", "wolverine", "glow", "bpc-157"],
    "wolverine": [
        "wolverine bpc-157 10mg tb-500 10mg 10ml",
        "wolverine bpc-157",
        "wolverine",
        "bpc-157/tb-500",
    ],
    "cjc-1295-ipamorelin": [
        "cjc-1295/ipamorelin",
        "cjc (no dac)/ipamorelin",
        "cjc-1295 no dac",
        "ipamorelin",
        "cjc",
    ],
    "tesamorelin": ["tesamorelin", "ipamorelin", "cjc-1295/ipamorelin", "sermorelin"],
    "mots-c": ["mots-c", "mots", "5 amino"],
    "nad-plus": ["nad+", "nad -", "nad "],
    "ghk-cu": ["ghk-cu", "ghk", "glow"],
    "sermorelin": ["sermorelin", "tesamorelin", "ipamorelin", "cjc-1295"],
}


def load_catalog() -> list[dict]:
    data = json.loads(CATALOG_JSON.read_text(encoding="utf-8-sig"))
    if isinstance(data, dict) and "products" in data:
        return data["products"]
    return data


def has_image(p: dict) -> bool:
    return bool(p.get("image_url"))


def find_match(products: list[dict], keywords: list[str]) -> dict | None:
    """Prefer an exact-ish name hit that has an image; never return imageless hits."""
    active = [p for p in products if p.get("is_active", True) is not False]
    imaged = [p for p in active if has_image(p)]
    for kw in keywords:
        kw_l = kw.lower()
        # Prefer names that start with / equal the compound when possible
        for pool in (imaged,):
            for p in pool:
                name = (p.get("name") or "").lower()
                if kw_l in name:
                    return p
    return None


def any_peptide_image(products: list[dict], exclude_id: str | None = None) -> dict | None:
    for p in products:
        if not has_image(p):
            continue
        if exclude_id and p.get("id") == exclude_id:
            continue
        if p.get("is_active", True) is False:
            continue
        return p
    return None


def download(url: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers={"User-Agent": "tidl-peptide-prep/1.0"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        dest.write_bytes(resp.read())


def remove_studio_background(src: Path, dest: Path, threshold: int = 36) -> None:
    """
    Convert near-white / corner-matched studio background to transparency.
    Uses numpy for speed (pure-PIL flood fill is too slow on large images).
    """
    import numpy as np
    from collections import deque

    img = Image.open(src).convert("RGBA")
    arr = np.array(img)
    h, w = arr.shape[:2]
    rgb = arr[:, :, :3].astype(np.int16)
    alpha = arr[:, :, 3].copy()

    corners = [
        rgb[2, 2],
        rgb[2, w - 3],
        rgb[h - 3, 2],
        rgb[h - 3, w - 3],
        rgb[2, w // 2],
        rgb[h // 2, 2],
    ]
    bg = np.mean(corners, axis=0)

    dist = np.max(np.abs(rgb - bg), axis=2)
    is_bg = (dist <= threshold) | (alpha < 20)

    # Contiguous flood fill from image edges only (keeps white labels intact)
    mask = np.zeros((h, w), dtype=bool)
    q: deque[tuple[int, int]] = deque()
    for x in range(w):
        q.append((0, x))
        q.append((h - 1, x))
    for y in range(h):
        q.append((y, 0))
        q.append((y, w - 1))

    while q:
        y, x = q.popleft()
        if y < 0 or x < 0 or y >= h or x >= w or mask[y, x] or not is_bg[y, x]:
            continue
        mask[y, x] = True
        q.extend(((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)))

    arr[:, :, 3] = np.where(mask, 0, alpha)
    out = Image.fromarray(arr, "RGBA")

    bbox = out.getbbox()
    if bbox:
        pad = 12
        left = max(0, bbox[0] - pad)
        top = max(0, bbox[1] - pad)
        right = min(w, bbox[2] + pad)
        bottom = min(h, bbox[3] + pad)
        out = out.crop((left, top, right, bottom))

    max_side = 1200
    if max(out.size) > max_side:
        out.thumbnail((max_side, max_side), Image.Resampling.LANCZOS)

    dest.parent.mkdir(parents=True, exist_ok=True)
    out.save(dest, "PNG", optimize=True)


def slugify(name: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    return s[:80] or "peptide"


def main() -> None:
    products = load_catalog()
    print(f"catalog products: {len(products)}", flush=True)
    imaged = [p for p in products if has_image(p)]
    print(f"with images: {len(imaged)}", flush=True)

    # Download + clean every unique catalog image once
    catalog_paths: dict[str, str] = {}  # product id -> public URL path
    for i, p in enumerate(imaged, 1):
        pid = p["id"]
        raw = OUT_CATALOG / f"{pid}.src"
        out = OUT_CATALOG / f"{pid}.png"
        public_path = f"/peptides/catalog/{pid}.png"
        if out.exists() and out.stat().st_size > 1000:
            catalog_paths[pid] = public_path
            print(f"[{i}/{len(imaged)}] skip existing {p['name']}", flush=True)
            continue
        print(f"[{i}/{len(imaged)}] download {p['name']}", flush=True)
        try:
            download(p["image_url"], raw)
            remove_studio_background(raw, out)
            raw.unlink(missing_ok=True)
            catalog_paths[pid] = public_path
            print(f"  ok -> {out.name}", flush=True)
        except Exception as exc:  # noqa: BLE001
            print(f"  FAILED: {exc}", flush=True)
            raw.unlink(missing_ok=True)

    # Map featured products
    featured_map: dict[str, dict] = {}
    for slug, keywords in FEATURED.items():
        match = find_match(products, keywords)
        source = "match"
        if not match or match["id"] not in catalog_paths:
            # Fall back to another peptide image from the catalog pool
            fallback = any_peptide_image(products)
            if fallback and fallback["id"] in catalog_paths:
                match = fallback
                source = "fallback-peptide"
            else:
                print(f"!! no peptide image available for {slug}")
                continue

        src_png = OUT_CATALOG / f"{match['id']}.png"
        dest = OUT_FEATURED / f"{slug}.png"
        dest.write_bytes(src_png.read_bytes())
        featured_map[slug] = {
            "image": f"/peptides/{slug}.png",
            "catalogId": match["id"],
            "catalogName": match["name"],
            "source": source,
        }
        print(f"feature {slug} <- {match['name']} ({source})")

    MAP_JSON.parent.mkdir(parents=True, exist_ok=True)
    MAP_JSON.write_text(json.dumps(featured_map, indent=2), encoding="utf-8")
    print(f"wrote {MAP_JSON}")
    print(f"featured mapped: {len(featured_map)}")


if __name__ == "__main__":
    main()
