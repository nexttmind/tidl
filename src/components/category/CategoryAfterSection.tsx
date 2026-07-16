import { motion, useReducedMotion } from "framer-motion";
import type { CategoryDefinition } from "@/lib/categories";
import { catReveal, catStagger } from "./category-motion";

type CategoryAfterSectionProps = {
  category: CategoryDefinition;
  onStartIntake: () => void;
};

/**
 * Emotional close — life after starting TIDL care.
 */
export function CategoryAfterSection({ category, onStartIntake }: CategoryAfterSectionProps) {
  const reduce = useReducedMotion();
  const reveal = reduce ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } } : catReveal;

  return (
    <section
      className="cat-after"
      id="cat-after"
      data-site-header-theme="light"
      aria-label="Life after TIDL"
    >
      <motion.div
        className="cat-after-inner"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
        variants={catStagger}
      >
        <motion.p className="cat-after-kicker" variants={reveal}>
          After you start
        </motion.p>
        <motion.h2 className="cat-after-title" variants={reveal}>
          {category.afterHeadline}
        </motion.h2>
        <motion.p className="cat-after-lead" variants={reveal}>
          {category.afterLead}
        </motion.p>
        <motion.button
          type="button"
          className="cat-btn cat-btn--primary"
          onClick={onStartIntake}
          variants={reveal}
          whileHover={reduce ? undefined : { scale: 1.02, y: -2 }}
          whileTap={reduce ? undefined : { scale: 0.98 }}
        >
          {category.ctaLabel}
        </motion.button>
      </motion.div>
    </section>
  );
}
