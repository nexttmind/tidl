#!/usr/bin/env python3
"""Build before/after PDP cards from sandbox peptide vial PNGs only (no lifestyle photos)."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFont

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "peptides"
OUT = ROOT / "public" / "peptides" / "ba"
MAP = ROOT / "src" / "lib" / "peptide-image-map.json"

CANVAS = (720, 900)


def load_font(size: int):
    for name in ("arial.ttf", "segoeui.ttf", "C:/Windows/Fonts/arial.ttf", "C:/Windows/Fonts/segoeui.ttf"):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()


def make_card(vial: Image.Image, *, label: str, weeks: str, muted: bool) -> Image.Image:
    canvas = Image.new("RGBA", CANVAS, (23, 19, 16, 255))
    # subtle vignette-ish fill
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle((28, 28, CANVAS[0] - 28, CANVAS[1] - 28), radius=36, fill=(36, 30, 24, 255))

    vial = vial.convert("RGBA")
    # fit vial into center
    max_w, max_h = 420, 620
    vial.thumbnail((max_w, max_h), Image.Resampling.LANCZOS)
    if muted:
        vial = ImageEnhance.Color(vial).enhance(0.35)
        vial = ImageEnhance.Brightness(vial).enhance(0.85)

    x = (CANVAS[0] - vial.size[0]) // 2
    y = (CANVAS[1] - vial.size[1]) // 2 - 20
    canvas.alpha_composite(vial, (x, y))

    font_lg = load_font(28)
    font_sm = load_font(20)
    # pill tags
    tag = label.upper()
    tw = draw.textlength(tag, font=font_sm) + 28
    draw.rounded_rectangle((48, 56, 48 + tw, 96), radius=999, fill=(216, 185, 138, 230))
    draw.text((62, 64), tag, fill=(23, 19, 16, 255), font=font_sm)

    draw.rounded_rectangle((48, CANVAS[1] - 110, CANVAS[0] - 48, CANVAS[1] - 58), radius=18, fill=(0, 0, 0, 140))
    draw.text((68, CANVAS[1] - 98), weeks, fill=(243, 236, 225, 255), font=font_lg)

    return canvas


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    import json

    mapping = json.loads(MAP.read_text(encoding="utf-8-sig"))
    for slug in mapping:
        src = SRC / f"{slug}.png"
        if not src.exists():
            print("skip missing", slug)
            continue
        vial = Image.open(src)
        before = make_card(vial, label="Week 0", weeks="Before protocol", muted=True)
        after = make_card(vial, label="Week 12", weeks="On protocol", muted=False)
        before_path = OUT / f"{slug}-before.png"
        after_path = OUT / f"{slug}-after.png"
        before.save(before_path, "PNG", optimize=True)
        after.save(after_path, "PNG", optimize=True)
        print("wrote", before_path.name, after_path.name)


if __name__ == "__main__":
    main()
