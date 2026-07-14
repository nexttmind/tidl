import { PRODUCTS } from "@/lib/products";
import { formatCurrency } from "@/lib/pricing";

export const HOMEPAGE_STARTING_PRICE = PRODUCTS[0]?.monthlyPrice ?? 299;
export const HOMEPAGE_STARTING_PRICE_LABEL = formatCurrency(HOMEPAGE_STARTING_PRICE);

export const HERO_COPY = {
  headline: "The only GLP-1 that's pre-dosed for you. Click it, don't calculate it.",
  subhead: `Doctor-prescribed GLP-1, delivered pre-dosed to your door. Plans start at ${HOMEPAGE_STARTING_PRICE_LABEL}/mo. Online in 5 minutes.`,
  cta: "Take the 5-Minute Quiz",
} as const;

export const TESTIMONIAL_DISCLAIMER =
  "*Individual results vary. Reflects one patient's treatment plan and is not a guarantee of your results.";
