import { SITE_IMAGES } from "@/lib/site-assets";
import { getProductBySlug } from "@/lib/products";
import { PEPTIDE_DEFS, peptideToCatalogProduct } from "@/lib/peptides";
import { PRODUCT_SLUGS, type ProductSlug } from "@/types/quiz";
import type { CategorySlug } from "@/lib/categories";

export type ProductForm = "pen" | "pill" | "vial";

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

const GLP1_CATALOG_PRODUCT: CatalogProduct = {
  slug: "glp-1-weight-loss",
  categorySlug: "weight-loss",
  form: "pen",
  shortName: "GLP-1 Weight Loss",
  headline: "Lose weight. Keep it off. Pre-dosed pen.",
  summary:
    "Doctor-prescribed GLP-1 in the TIDL Pen. Your dose is set to your prescription. No mixing, no guesswork.",
  image: SITE_IMAGES.products.penPrimary,
  highlights: ["TIDL Pen delivery", "Licensed provider review", "Discreet shipping"],
};

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  GLP1_CATALOG_PRODUCT,
  ...PEPTIDE_DEFS.map(peptideToCatalogProduct),
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

export const PRODUCT_PATHS = Object.fromEntries(
  PRODUCT_SLUGS.map((slug) => [slug, `/products/${slug}`]),
) as Record<ProductSlug, `/products/${ProductSlug}`>;

export const CATEGORY_PATHS: Record<CategorySlug, `/category/${CategorySlug}`> = {
  "weight-loss": "/category/weight-loss",
  "metabolic-health": "/category/metabolic-health",
  testosterone: "/category/testosterone",
  longevity: "/category/longevity",
  performance: "/category/performance",
  recovery: "/category/recovery",
};
