import { type MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { settle } from "./pdp-ui";

type PdpCtaBandProps = {
  onStart: (e: MouseEvent) => void;
};

/** Closing pitch: emotional, woman-first, quiz as the first brave step. */
export function PdpCtaBand({ onStart }: PdpCtaBandProps) {
  const reduce = useReducedMotion();

  return (
    <section className="hm-cta-band" id="get-started" data-pdp-header-theme="dark">
      <div className="hm-cta-band-media" aria-hidden="true">
        <img src="/pdp/AFTER.png" alt="" loading="lazy" />
        <div className="hm-cta-band-veil" />
      </div>

      <motion.div
        className="hm-cta-band-inner"
        initial={reduce ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.75, ease: settle }}
      >
        <p className="hm-cta-kicker">She is waiting on you</p>
        <h2 className="hm-cta-title">
          Let her be the first
          <span> to take this quiz.</span>
        </h2>
        <p className="hm-cta-copy">
          Not another Monday promise. Not after one more dress you avoid.
          Five honest minutes, a licensed provider, and the quiet decision to
          become her again before the world gets the old version of you back.
        </p>
        <button type="button" className="hm-btn hm-btn-gold" onClick={onStart}>
          Start my free quiz
        </button>
        <p className="hm-cta-whisper">No pressure. Just the first honest step.</p>
      </motion.div>
    </section>
  );
}
