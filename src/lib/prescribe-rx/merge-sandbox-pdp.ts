import type { PdpPageContent } from "@/components/pdp/data/types";
import type { LiveProduct } from "@/lib/prescribe-rx/use-live-catalog";

/**
 * Prefer a live sandbox description only when it adds real patient-facing copy.
 * Sandbox short_description often equals the pharmacy label / is empty — keep curated.
 */
function usableLiveCopy(live: LiveProduct, curated: string): string {
  const candidates = [live.description, live.shortDescription]
    .map((s) => s?.trim() ?? "")
    .filter(Boolean);

  for (const text of candidates) {
    const sameAsName = text.toLowerCase() === live.name.trim().toLowerCase();
    const tooShort = text.length < 40;
    if (!sameAsName && !tooShort) return text;
  }
  return curated;
}

/**
 * Light overlay of the live sandbox product onto the static PDP shell.
 *
 * Safe overlays: vial image (+ useful long description when present).
 * Always keep curated: marketing name, descriptor, specs, perks, trust.
 * Price is applied by the PDP page via resolveDisplayPackagePrice (live sandbox
 * consumer/final price when present) — this merge does not overwrite startingPrice.
 * Never surface SKU, UUIDs, or wholesale.
 */
export function mergeSandboxIntoPdp(
  base: PdpPageContent,
  live: LiveProduct | undefined,
): PdpPageContent {
  if (!live) return base;

  const usePeptideImage = base.productForm !== "pen";
  const image = usePeptideImage ? live.image : base.heroImage;
  const summary = usableLiveCopy(live, base.heroProduct.summary);

  return {
    ...base,
    heroImage: image,
    penImage: usePeptideImage ? live.image : base.penImage,
    heroProduct: {
      ...base.heroProduct,
      summary,
      // Keep curated name, descriptor, specs, perks, trustNote.
      // startingPrice / priceNote are set by ProductPdpPage from live catalog.
    },
  };
}
