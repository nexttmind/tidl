import { motion, useReducedMotion } from "framer-motion";
import type { CategoryDefinition } from "@/lib/categories";
import { catReveal, catStagger } from "./category-motion";

type CategoryTrustSectionProps = {
  category: CategoryDefinition;
};

const TRUST_LINE = [
  {
    id: "care",
    title: "Personalized care",
    body: "A licensed provider reviews your goals and history — then recommends treatment only when it fits you.",
  },
  {
    id: "pharmacy",
    title: "US-based pharmacy",
    body: "Every prescription is filled by a licensed US pharmacy and ships discreetly to your door.",
  },
  {
    id: "pen",
    title: "The TIDL Pen",
    body: "When your protocol uses the pen, your dose is set before it leaves the pharmacy. Click and go — no mixing at home.",
  },
] as const;

/**
 * Calm trust line — one job: what matters when buying peptides with TIDL.
 */
export function CategoryTrustSection({ category }: CategoryTrustSectionProps) {
  const reduce = useReducedMotion();
  const reveal = reduce ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } } : catReveal;

  return (
    <section
      className="cat-trust"
      id="cat-trust"
      data-site-header-theme="light"
      aria-label="What matters with TIDL"
    >
      <motion.div
        className="cat-trust-inner"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-12%" }}
        variants={catStagger}
      >
        <motion.p className="cat-trust-kicker" variants={reveal}>
          What matters for {category.navLabel.toLowerCase()}
        </motion.p>
        <motion.h2 className="cat-trust-title" variants={reveal}>
          We built TIDL around how people actually decide.
        </motion.h2>
        <motion.p className="cat-trust-lead" variants={reveal}>
          Personalized care. A legitimate US pharmacy. And the TIDL Pen when your plan calls for
          simple, pharmacy-set dosing.
        </motion.p>

        <div className="cat-trust-grid">
          {TRUST_LINE.map((item) => (
            <motion.article key={item.id} className="cat-trust-item" variants={reveal}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
