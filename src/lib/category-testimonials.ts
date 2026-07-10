import type { CategorySlug } from "@/lib/categories";
import { GLP1_TESTIMONIALS, TESTIMONIALS, type Testimonial } from "@/lib/testimonials";

export function getCategoryTestimonials(slug: CategorySlug): Testimonial[] {
  if (slug === "weight-loss" || slug === "metabolic-health") {
    return GLP1_TESTIMONIALS;
  }
  return TESTIMONIALS;
}
