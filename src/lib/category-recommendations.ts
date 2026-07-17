import { ASK_TIDL_ANSWERS, ASK_TIDL_FALLBACK } from "@/lib/ask-tidl-content";
import { getRecommendedTreatment } from "@/lib/products";
import { PRODUCT_PATHS } from "@/lib/product-catalog";
import type { CategorySlug } from "@/lib/categories";
import type { GoalId, ProductSlug } from "@/types/quiz";

export type CategoryRecommendation = {
  query: string;
  answer: string;
  productSlug: ProductSlug;
  productName: string;
  productPath: `/products/${ProductSlug}`;
  action: "quiz" | "product" | "bundle" | "faq" | "safety";
};

const CATEGORY_GOALS: Record<CategorySlug, GoalId> = {
  "weight-loss": "weight-loss",
  "metabolic-health": "metabolic-health",
  testosterone: "hormonal-health",
  longevity: "longevity",
  performance: "performance",
  recovery: "recovery",
};

function findAnswer(query: string): string {
  const q = query.trim().toLowerCase();
  if (!q) return ASK_TIDL_FALLBACK;

  const exact = Object.entries(ASK_TIDL_ANSWERS).find(([key]) => key.toLowerCase() === q);
  if (exact) return exact[1];

  const partial = Object.entries(ASK_TIDL_ANSWERS).find(
    ([key, value]) =>
      key.toLowerCase().includes(q) ||
      q.split(/\s+/).some((word) => word.length > 3 && (key.toLowerCase().includes(word) || value.toLowerCase().includes(word))),
  );
  if (partial) return partial[1];

  if (q.includes("pen") || q.includes("glp") || q.includes("dose") || q.includes("click") || q.includes("food") || q.includes("noise")) {
    return ASK_TIDL_ANSWERS["What is the TIDL Pen?"];
  }
  if (
    q.includes("fit") ||
    q.includes("eligib") ||
    q.includes("quiz") ||
    q.includes("start today") ||
    q.includes("myself")
  ) {
    return ASK_TIDL_ANSWERS["Am I a fit for GLP-1?"];
  }
  if (
    q.includes("trt") ||
    q.includes("testosterone") ||
    q.includes("hormone") ||
    q.includes("energy") ||
    q.includes("tired") ||
    q.includes("exhaust")
  ) {
    return ASK_TIDL_ANSWERS["How does TRT work?"];
  }
  if (q.includes("peptide") || q.includes("longevity") || q.includes("recover")) {
    return ASK_TIDL_ANSWERS["What are peptides?"];
  }
  if (q.includes("doctor") || q.includes("provider") || q.includes("listen")) {
    return ASK_TIDL_ANSWERS["Is a doctor involved?"];
  }
  if (q.includes("soon") || q.includes("fast") || q.includes("start")) {
    return ASK_TIDL_ANSWERS["How fast do I start?"];
  }

  return ASK_TIDL_FALLBACK;
}

function resolveAction(query: string): CategoryRecommendation["action"] {
  const q = query.toLowerCase();
  if (q.includes("price") || q.includes("cost") || q.includes("bundle") || q.includes("protocol")) {
    return "product";
  }
  if (q.includes("safe") || q.includes("doctor") || q.includes("pharmacy")) {
    return "safety";
  }
  if (q.includes("faq") || q.includes("question") || q.includes("ship")) {
    return "faq";
  }
  if (q.includes("pen") || q.includes("product") || q.includes("program")) {
    return "product";
  }
  return "quiz";
}

export function getCategoryRecommendation(
  query: string,
  slug: CategorySlug,
): CategoryRecommendation {
  const goal = CATEGORY_GOALS[slug];
  const product = getRecommendedTreatment(goal, null);
  const action = resolveAction(query);

  return {
    query: query.trim(),
    answer: findAnswer(query),
    productSlug: product.slug,
    productName: product.name,
    productPath: PRODUCT_PATHS[product.slug],
    action,
  };
}

export { CATEGORY_GOALS as CATEGORY_GOAL_MAP };
