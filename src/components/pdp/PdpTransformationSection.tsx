import { motion, useReducedMotion } from "framer-motion";
import type { MouseEvent } from "react";
import { usePdpData } from "./PdpDataProvider";
import { PdpButton } from "./pdp-ui";

type PdpTransformationSectionProps = {
  onStart: (e?: MouseEvent) => void;
};

export function PdpTransformationSection({ onStart }: PdpTransformationSectionProps) {
  const { marketing } = usePdpData();
  const reduce = useReducedMotion();
  if (!marketing) return null;

  return (
    <section className="pdp-transform" id="transform" data-pdp-header-theme="dark">
      {/* Emotional "this is you" block */}
      <div className="pdp-transform-emotion">
        <motion.div
          className="pdp-transform-emotion-copy"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="pdp-transform-kicker">This is you</span>
          <h2 className="pdp-transform-headline">{marketing.emotionalHeadline}</h2>
          <p className="pdp-transform-sub">{marketing.emotionalSub}</p>

          <ul className="pdp-transform-pains">
            {marketing.painPoints.map((pain) => (
              <li key={pain}>
                <span className="pdp-transform-pain-mark" aria-hidden="true">
                  ✕
                </span>
                {pain}
              </li>
            ))}
          </ul>

          <p className="pdp-transform-dream">{marketing.dream}</p>
          <PdpButton label="See if you qualify" onClick={onStart} />
        </motion.div>
      </div>

      {/* Before / after proof */}
      <div className="pdp-transform-proof">
        <div className="pdp-transform-proof-head">
          <span className="pdp-transform-kicker">Real journeys</span>
          <h3 className="pdp-transform-proof-title">Proof, not promises</h3>
          <p className="pdp-transform-proof-note">
            Physician-guided results. Individual results vary — your provider builds the plan that's right for you.
          </p>
        </div>

        <div className="pdp-transform-ba-grid">
          {marketing.beforeAfter.map((item, i) => (
            <motion.figure
              key={item.caption + i}
              className="pdp-transform-ba"
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="pdp-transform-ba-media">
                <img src={item.image} alt="" loading="lazy" />
                <span className="pdp-transform-ba-tag pdp-transform-ba-tag--before">
                  {item.beforeLabel}
                </span>
                <span className="pdp-transform-ba-tag pdp-transform-ba-tag--after">
                  {item.afterLabel}
                </span>
                <span className="pdp-transform-ba-weeks">{item.weeks}</span>
              </div>
              <figcaption className="pdp-transform-ba-caption">{item.caption}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      {/* Motivation band */}
      <motion.div
        className="pdp-transform-band"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h3 className="pdp-transform-band-title">{marketing.motivationHeadline}</h3>
        <p className="pdp-transform-band-sub">{marketing.motivationSub}</p>
        <PdpButton label="Start my 5-minute quiz" onClick={onStart} />
      </motion.div>
    </section>
  );
}
