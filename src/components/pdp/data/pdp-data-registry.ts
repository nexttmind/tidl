import type { ProductSlug } from "@/types/quiz";
import type { PdpPageContent } from "./types";
import { getCatalogProduct } from "@/lib/product-catalog";
import { PEPTIDE_DEFS, peptideToPdpContent, peptideToPdpMeta } from "@/lib/peptides";
import { GLP1_PDP_CONTENT } from "./glp1-pdp-content";

const PDP_REGISTRY: Record<ProductSlug, PdpPageContent> = {
  "glp-1-weight-loss": GLP1_PDP_CONTENT,
  ...Object.fromEntries(PEPTIDE_DEFS.map((def) => [def.slug, peptideToPdpContent(def)])),
} as Record<ProductSlug, PdpPageContent>;

function withCatalogAssets(slug: ProductSlug, content: PdpPageContent): PdpPageContent {
  const catalog = getCatalogProduct(slug);
  if (!catalog) return content;

  const isPen = catalog.form === "pen";

  return {
    ...content,
    productForm: catalog.form,
    heroImage: catalog.image,
    penImage: catalog.image,
    showPenShowcase: isPen,
    penShowcase: isPen ? content.penShowcase : undefined,
  };
}

export function getPdpContent(slug: ProductSlug): PdpPageContent {
  return withCatalogAssets(slug, PDP_REGISTRY[slug]);
}

export const PDP_META: Record<
  ProductSlug,
  { title: string; description: string }
> = {
  "glp-1-weight-loss": {
    title: "GLP-1 Weight Loss Program | Tidl Health",
    description:
      "Doctor-prescribed GLP-1 weight loss with the pre-dosed TIDL Pen. Take a 5-minute quiz, get reviewed by a licensed provider, and receive discreet delivery.",
  },
  ...Object.fromEntries(PEPTIDE_DEFS.map((def) => [def.slug, peptideToPdpMeta(def)])),
} as Record<ProductSlug, { title: string; description: string }>;
