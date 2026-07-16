import { motion, useReducedMotion } from "framer-motion";
import { usePdpData } from "./PdpDataProvider";
import { settle } from "./pdp-ui";

const GOAL_TITLES: Record<string, string> = {
  longevity: "What longevity care can unlock",
  "metabolic-health": "What metabolic support can unlock",
  performance: "What performance protocols can unlock",
  recovery: "What recovery protocols can unlock",
  "hormonal-health": "What hormonal balance can unlock",
};

/**
 * Goal-specific proof section for non–weight-loss PDPs.
 * Replaces fat→slim before/after with outcomes that match the category.
 */
export function PdpGoalOutcomesSection() {
  const { goal, marketing, outcomePhrases, heroImage, heroProduct } = usePdpData();
  const reduce = useReducedMotion();

  if (goal === "weight-loss") return null;

  const title = GOAL_TITLES[goal] ?? "What this protocol can unlock";
  const outcomes = outcomePhrases.slice(0, 4);
  const benefits = heroProduct.specs
    .filter((s) => !/what it does|provider dose|how to use|storage|us pharmacy/i.test(s.label))
    .slice(0, 3);

  return (
    <section className="hm-section hm-goal-proof" id="outcomes" data-pdp-header-theme="light">
      <div className="hm-shell hm-goal-proof-inner">
        <motion.div
          className="hm-goal-proof-copy"
          initial={reduce ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: settle }}
        >
          <h2 className="hm-h2">{title}</h2>
          {marketing?.dream ? <p className="hm-lede">{marketing.dream}</p> : null}

          <ul className="hm-goal-proof-list">
            {outcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          {benefits.length > 0 ? (
            <div className="hm-goal-proof-benefits">
              {benefits.map((b) => (
                <article key={b.label}>
                  <h3>{b.label}</h3>
                  <p>{b.detail}</p>
                </article>
              ))}
            </div>
          ) : null}
        </motion.div>

        <motion.div
          className="hm-goal-proof-media"
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.05, ease: settle }}
        >
          <img src={heroImage} alt="" loading="lazy" />
        </motion.div>
      </div>
    </section>
  );
}
