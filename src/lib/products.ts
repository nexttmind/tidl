import { SITE_IMAGES } from "@/lib/site-assets";
import type { GoalId, ProductSlug } from "@/types/quiz";

export interface Product {
  slug: ProductSlug;
  name: string;
  brandName: string;
  tag: string;
  description: string;
  dosage: string;
  monthlyPrice: number;
  goal: GoalId;
  image: string;
  outcomes: readonly string[];
}

const GLP1_PRODUCT: Product = {
  slug: "glp-1-weight-loss",
  brandName: "Lirosome",
  name: "GLP-1 Weight Loss Program",
  tag: "Weight loss · TIDL Pen",
  description:
    "Doctor-prescribed GLP-1 treatment with pre-dosed delivery. Personalized dosing based on your assessment.",
  dosage: "Personalized weekly dose",
  monthlyPrice: 299,
  goal: "weight-loss",
  image: SITE_IMAGES.products.penPrimary,
  outcomes: ["Steady weight loss", "Reduced appetite", "Simple weekly routine"],
};

// Peptide products are generated from src/lib/peptides.ts. The import is placed
// after the type/const above to avoid a circular-init issue (peptides.ts imports
// the Product type only).
import { PEPTIDE_DEFS, peptideToProduct } from "@/lib/peptides";

export const PRODUCTS: Product[] = [
  GLP1_PRODUCT,
  ...PEPTIDE_DEFS.map(peptideToProduct),
];

const GOAL_FALLBACK: Record<GoalId, ProductSlug> = {
  "weight-loss": "glp-1-weight-loss",
  "metabolic-health": "glp-1-weight-loss",
  longevity: "glp-1-weight-loss",
  "hormonal-health": "glp-1-weight-loss",
  performance: "glp-1-weight-loss",
  recovery: "glp-1-weight-loss",
};

export const GENERIC_FALLBACK_PRODUCT: Product = {
  slug: "glp-1-weight-loss",
  brandName: "Physician-Guided Treatment",
  name: "Physician-Guided Treatment",
  tag: "Personalized care",
  description: "A licensed provider will review your intake and recommend appropriate care.",
  dosage: "Personalized to your profile",
  monthlyPrice: 249,
  goal: "weight-loss",
  image: SITE_IMAGES.products.penPrimary,
  outcomes: ["Physician-reviewed plan", "Discreet delivery", "Ongoing telehealth care"],
};

export function getProductBySlug(slug: ProductSlug): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getGoalFromProduct(slug: ProductSlug): GoalId | null {
  return getProductBySlug(slug)?.goal ?? null;
}

export function getRecommendedTreatment(
  goal: GoalId | null,
  productSlug: ProductSlug | null,
): Product {
  if (productSlug) {
    const bySlug = getProductBySlug(productSlug);
    if (bySlug) return bySlug;
  }
  if (goal) {
    const fallbackSlug = GOAL_FALLBACK[goal];
    const byGoal = getProductBySlug(fallbackSlug);
    if (byGoal) return byGoal;
  }
  return GENERIC_FALLBACK_PRODUCT;
}
