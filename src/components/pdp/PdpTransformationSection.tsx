import { motion, useReducedMotion } from "framer-motion";
import type { MouseEvent } from "react";
import { usePdpData } from "./PdpDataProvider";

type PdpTransformationSectionProps = {
  onStart: (e?: MouseEvent) => void;
};

/** Emotional story — headline, dream, portrait. Pain ticker lives in the marquee above. */
export function PdpTransformationSection({ onStart }: PdpTransformationSectionProps) {
  const { marketing } = usePdpData();
  const reduce = useReducedMotion();
  if (!marketing) return null;

  return (
    <section className="pdp-manifesto" id="transform" data-pdp-header-theme="light">
      <div className="pdp-manifesto-grid">
        <motion.div
          className="pdp-manifesto-copy"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="pdp-manifesto-kicker">This is you</p>
          <h2>{marketing.emotionalHeadline}</h2>
          <p className="pdp-manifesto-sub">{marketing.emotionalSub}</p>

          <blockquote className="pdp-manifesto-dream">{marketing.dream}</blockquote>

          <button type="button" className="pdp-campaign-cta" onClick={onStart}>
            Yes — that&apos;s me. Start my intake
          </button>
        </motion.div>

        <motion.figure
          className="pdp-manifesto-portrait"
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.75, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src="/pdp/patient-aspire.png" alt="" loading="lazy" />
          <figcaption>
            <strong>Become her.</strong>
            <span>One plan. One provider. Real change.</span>
          </figcaption>
        </motion.figure>
      </div>

      <motion.div
        className="pdp-manifesto-band"
        initial={reduce ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.55 }}
      >
        <h3>{marketing.motivationHeadline}</h3>
        <p>{marketing.motivationSub}</p>
        <button type="button" className="pdp-campaign-cta pdp-campaign-cta--ink" onClick={onStart}>
          Start my 5-minute quiz
        </button>
      </motion.div>
    </section>
  );
}
