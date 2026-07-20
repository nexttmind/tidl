import { motion, useReducedMotion } from "framer-motion";
import type { CategoryDefinition, CategorySlug } from "@/lib/categories";
import { catReveal, catStagger } from "./category-motion";

type CategoryAfterSectionProps = {
  category: CategoryDefinition;
  onStartIntake: () => void;
};

const AFTER_IMAGES: Record<CategorySlug, string> = {
  "weight-loss": "/category/weight-loss/after.png",
  "metabolic-health": "/category/metabolic-health/after.png",
  testosterone: "/category/testosterone/after.png",
  longevity: "/category/longevity/mood-2.png",
  performance: "/category/performance/ritual-3.png",
  recovery: "/category/recovery/stretch.png",
};

/**
 * Emotional close — life after starting TIDL care.
 * Image-led, short copy, bold type.
 */
export function CategoryAfterSection({ category, onStartIntake }: CategoryAfterSectionProps) {
  const reduce = useReducedMotion();
  const reveal = reduce ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } } : catReveal;

  return (
    <section
      className="cat-after"
      id="cat-after"
      data-site-header-theme="dark"
      aria-label="Life after TIDL"
    >
      <motion.div
        className="cat-after-stage"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
        variants={catStagger}
      >
        <motion.figure className="cat-after-media" variants={reveal}>
          <img
            src={AFTER_IMAGES[category.slug]}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </motion.figure>

        <motion.div className="cat-after-copy" variants={reveal}>
          <p className="cat-after-kicker">After you start</p>
          <h2 className="cat-after-title">{category.afterHeadline}</h2>
          <p className="cat-after-lead">{category.afterLead}</p>
          <motion.button
            type="button"
            className="cat-btn cat-btn--primary"
            onClick={onStartIntake}
            whileHover={reduce ? undefined : { scale: 1.02, y: -2 }}
            whileTap={reduce ? undefined : { scale: 0.98 }}
          >
            {category.ctaLabel}
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
