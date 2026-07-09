import { SITE_IMAGES } from "@/lib/site-assets";
import { getProductBySlug } from "@/lib/products";
import type { ProductSlug } from "@/types/quiz";
import type { CategorySlug } from "@/lib/categories";

export type ProductForm = "pen" | "pill";

export type CatalogProduct = {
  slug: ProductSlug;
  categorySlug: CategorySlug;
  form: ProductForm;
  shortName: string;
  headline: string;
  summary: string;
  image: string;
  highlights: readonly string[];
};

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    slug: "glp-1-weight-loss",
    categorySlug: "weight-loss",
    form: "pen",
    shortName: "GLP-1 Weight Loss",
    headline: "Lose weight. Keep it off. Pre-dosed pen.",
    summary:
      "Doctor-prescribed GLP-1 in the TIDL Pen. Your dose is set to your prescription. No mixing, no guesswork.",
    image: SITE_IMAGES.products.penPrimary,
    highlights: ["TIDL Pen delivery", "Licensed provider review", "Discreet shipping"],
  },
  {
    slug: "trt-hormonal",
    categorySlug: "testosterone",
    form: "pill",
    shortName: "Testosterone Therapy",
    headline: "Energy, strength, and drive back on your terms.",
    summary:
      "Lab-guided TRT from licensed providers. A plan built around your levels, lifestyle, and goals.",
    image: SITE_IMAGES.products.pillPink,
    highlights: ["Lab-guided dosing", "Ongoing monitoring", "Telehealth-first care"],
  },
  {
    slug: "longevity-peptides",
    categorySlug: "longevity",
    form: "pen",
    shortName: "Longevity Peptides",
    headline: "Recover faster. Sleep deeper. Stay sharp.",
    summary:
      "Physician-supervised peptide protocols for recovery, metabolic health, and long-term performance.",
    image: SITE_IMAGES.products.penSecondary,
    highlights: ["Personalized protocol", "Recovery-focused", "Ongoing care team"],
  },
  {
    slug: "performance-recovery",
    categorySlug: "longevity",
    form: "pill",
    shortName: "Performance & Recovery",
    headline: "Train harder. Bounce back faster.",
    summary:
      "Targeted metabolic and peptide support for athletic performance and consistent recovery between sessions.",
    image: SITE_IMAGES.products.pillProtocol,
    highlights: ["Custom protocol", "Performance-focused", "Physician-reviewed"],
  },
];

export function getCatalogProduct(slug: ProductSlug): CatalogProduct | undefined {
  return CATALOG_PRODUCTS.find((p) => p.slug === slug);
}

export function getCatalogProductsByCategory(categorySlug: CategorySlug): CatalogProduct[] {
  return CATALOG_PRODUCTS.filter((p) => p.categorySlug === categorySlug);
}

export function getCatalogPrice(slug: ProductSlug): number {
  return getProductBySlug(slug)?.monthlyPrice ?? 0;
}

export const PRODUCT_PATHS: Record<ProductSlug, `/products/${ProductSlug}`> = {
  "glp-1-weight-loss": "/products/glp-1-weight-loss",
  "trt-hormonal": "/products/trt-hormonal",
  "longevity-peptides": "/products/longevity-peptides",
  "performance-recovery": "/products/performance-recovery",
};

export const CATEGORY_PATHS: Record<CategorySlug, `/category/${CategorySlug}`> = {
  "weight-loss": "/category/weight-loss",
  testosterone: "/category/testosterone",
  longevity: "/category/longevity",
};
