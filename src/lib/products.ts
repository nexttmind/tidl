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

export const PRODUCTS: Product[] = [
  {
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
  },
  {
    slug: "longevity-peptides",
    brandName: "Tirosane",
    name: "Longevity Peptide Protocol",
    tag: "Longevity · TIDL Pen",
    description:
      "Peptide therapy to support recovery, sleep, and metabolic health under physician supervision.",
    dosage: "Protocol-based dosing",
    monthlyPrice: 349,
    goal: "longevity",
    image: SITE_IMAGES.products.penSecondary,
    outcomes: ["Deeper sleep", "Faster recovery", "Metabolic support"],
  },
  {
    slug: "trt-hormonal",
    brandName: "TIDL Cycle",
    name: "Testosterone Replacement Therapy",
    tag: "Hormonal health · Protocol",
    description:
      "TRT built around your labs and lifestyle. Ongoing monitoring by a licensed provider.",
    dosage: "Lab-guided dosing",
    monthlyPrice: 199,
    goal: "hormonal-health",
    image: SITE_IMAGES.products.pillPink,
    outcomes: ["Restored energy", "Strength and drive", "Lab-guided dosing"],
  },
  {
    slug: "performance-recovery",
    brandName: "TIDL Core",
    name: "Performance & Recovery Program",
    tag: "Performance · Protocol",
    description:
      "Targeted peptide and metabolic support for athletic performance and faster recovery.",
    dosage: "Custom protocol",
    monthlyPrice: 279,
    goal: "performance",
    image: SITE_IMAGES.products.pillProtocol,
    outcomes: ["Faster bounce-back", "Train harder", "Consistent recovery"],
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
