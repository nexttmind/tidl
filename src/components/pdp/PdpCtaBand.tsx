import { type MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";

type PdpCtaBandProps = {
  onStart: (e: MouseEvent) => void;
};

export function PdpCtaBand({ onStart }: PdpCtaBandProps) {
  const reduce = useReducedMotion();

  return (
    <section className="pdp-final-rush" id="get-started" data-pdp-header-theme="light">
      <motion.div
        className="pdp-final-rush-inner"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="pdp-manifesto-kicker">Your turn</p>
        <h2>
          The strongest version of you
          <span> is one quiz away.</span>
        </h2>
        <p>Five minutes. A licensed provider. A plan built for your body — not another Monday restart.</p>
        <button type="button" className="pdp-campaign-cta pdp-campaign-cta--ink" onClick={onStart}>
          Start my free assessment
        </button>
      </motion.div>
    </section>
  );
}
