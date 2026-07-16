import { type MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePdpData } from "./PdpDataProvider";
import { settle } from "./pdp-ui";

type PdpCtaBandProps = {
  onStart: (e: MouseEvent) => void;
};

/** Closing CTA — curved dark plate, clear next step. */
export function PdpCtaBand({ onStart }: PdpCtaBandProps) {
  const { goal, marketing, heroImage, heroProduct } = usePdpData();
  const reduce = useReducedMotion();
  const isWeightLoss = goal === "weight-loss";

  const titleLead = isWeightLoss
    ? "The strongest version of you"
    : (marketing?.motivationHeadline ?? "Care that fits your goals");
  const titleGold = isWeightLoss ? "is a quiz away." : "Start with a 5-minute quiz.";
  const mediaSrc = isWeightLoss ? "/pdp/AFTER.png" : heroImage;
  const captionStrong = isWeightLoss
    ? "Feel like yourself again"
    : (marketing?.dream
        ? "Built around your goals"
        : heroProduct.name);

  return (
    <section className="hm-cta-wrap" id="get-started" data-pdp-header-theme="light">
      <div className="hm-cta-band">
        <div className="hm-cta-band-glow" aria-hidden="true" />

        <motion.div
          className="hm-cta-band-copy"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: settle }}
        >
          <h2 className="hm-cta-title">
            {titleLead}
            <span className="hm-cta-title-gold">{titleGold}</span>
          </h2>

          <ul className="hm-cta-signals" aria-label="What happens next">
            <li>5-min intake</li>
            <li>Doctor review</li>
            <li>Pen + meds</li>
          </ul>

          <div className="hm-cta-actions">
            <button type="button" className="hm-btn hm-btn-gold" onClick={onStart}>
              Start my free quiz
            </button>
            <p className="hm-cta-whisper">Private. Prescription required.</p>
          </div>
        </motion.div>

        <motion.figure
          className="hm-cta-band-plate"
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, delay: 0.05, ease: settle }}
        >
          <div className="hm-cta-band-media">
            <img src={mediaSrc} alt="" loading="lazy" />
          </div>
          <figcaption className="hm-cta-caption">
            <strong>{captionStrong}</strong>
            <span>Individual results vary.</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
