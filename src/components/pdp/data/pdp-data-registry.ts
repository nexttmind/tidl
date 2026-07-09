import type { ProductSlug } from "@/types/quiz";
import type { PdpPageContent } from "./types";
import { getCatalogProduct } from "@/lib/product-catalog";
import { GLP1_PDP_CONTENT } from "./glp1-pdp-content";
import { TRT_PDP_CONTENT } from "./trt-pdp-content";
import { LONGEVITY_PDP_CONTENT } from "./longevity-pdp-content";
import { PERFORMANCE_PDP_CONTENT } from "./performance-pdp-content";

const PDP_REGISTRY: Record<ProductSlug, PdpPageContent> = {
  "glp-1-weight-loss": GLP1_PDP_CONTENT,
  "trt-hormonal": TRT_PDP_CONTENT,
  "longevity-peptides": LONGEVITY_PDP_CONTENT,
  "performance-recovery": PERFORMANCE_PDP_CONTENT,
};

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
  "trt-hormonal": {
    title: "Testosterone Replacement Therapy | Tidl Health",
    description:
      "Lab-guided TRT from licensed providers. Take a 5-minute intake, get a personalized plan, and receive discreet delivery from a US pharmacy.",
  },
  "longevity-peptides": {
    title: "Longevity Peptide Protocol | Tidl Health",
    description:
      "Physician-supervised peptide protocols for recovery, sleep, and metabolic health. Start with a 5-minute quiz and ongoing telehealth care.",
  },
  "performance-recovery": {
    title: "Performance & Recovery Program | Tidl Health",
    description:
      "Targeted peptide and metabolic support for athletic performance and faster recovery. Doctor-reviewed plans with discreet delivery.",
  },
};
