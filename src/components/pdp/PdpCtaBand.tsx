import { type MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { settle } from "./pdp-ui";

type PdpCtaBandProps = {
  onStart: (e: MouseEvent) => void;
};

/** Closing CTA — curved dark plate, clear next step. */
export function PdpCtaBand({ onStart }: PdpCtaBandProps) {
  const reduce = useReducedMotion();

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
            The strongest version of you
            <span className="hm-cta-title-gold">is a quiz away.</span>
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
            <img src="/pdp/AFTER.png" alt="" loading="lazy" />
          </div>
          <figcaption className="hm-cta-caption">
            <strong>Feel like yourself again</strong>
            <span>Individual results vary.</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
