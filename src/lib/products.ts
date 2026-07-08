import type { GoalId, ProductSlug } from "@/types/quiz";

export interface Product {
  slug: ProductSlug;
  name: string;
  description: string;
  dosage: string;
  monthlyPrice: number;
  goal: GoalId;
}

export const PRODUCTS: Product[] = [
  {
    slug: "glp-1-weight-loss",
    name: "GLP-1 Weight Loss Program",
    description:
      "Doctor-prescribed GLP-1 treatment with pre-dosed delivery. Personalized dosing based on your assessment.",
    dosage: "Personalized weekly dose",
    monthlyPrice: 299,
    goal: "weight-loss",
  },
  {
    slug: "longevity-peptides",
    name: "Longevity Peptide Protocol",
    description:
      "Peptide therapy to support recovery, sleep, and metabolic health under physician supervision.",
    dosage: "Protocol-based dosing",
    monthlyPrice: 349,
    goal: "longevity",
  },
  {
    slug: "trt-hormonal",
    name: "Testosterone Replacement Therapy",
    description:
      "TRT built around your labs and lifestyle. Ongoing monitoring by a licensed provider.",
    dosage: "Lab-guided dosing",
    monthlyPrice: 199,
    goal: "hormonal-health",
  },
  {
    slug: "performance-recovery",
    name: "Performance & Recovery Program",
    description:
      "Targeted peptide and metabolic support for athletic performance and faster recovery.",
    dosage: "Custom protocol",
    monthlyPrice: 279,
    goal: "performance",
  },
];

const GOAL_FALLBACK: Record<GoalId, ProductSlug> = {
  "weight-loss": "glp-1-weight-loss",
  "metabolic-health": "glp-1-weight-loss",
  longevity: "longevity-peptides",
  "hormonal-health": "trt-hormonal",
  performance: "performance-recovery",
  recovery: "performance-recovery",
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
  return PRODUCTS[0];
}
