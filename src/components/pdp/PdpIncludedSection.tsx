import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { usePdpData } from "./PdpDataProvider";
import { Reveal, settle } from "./pdp-ui";

function IncludedLine({ phrase, index }: { phrase: string; index: number }) {
  const lineRef = useRef<HTMLParagraphElement>(null);
  const inView = useInView(lineRef, {
    once: false,
    amount: 0.65,
    margin: "-12% 0px -12% 0px",
  });
  const reduceMotion = useReducedMotion();
  const fromTop = index % 2 === 0;
  const hiddenY = fromTop ? -56 : 56;

  return (
    <motion.p
      ref={lineRef}
      className={`pdp-included-line${inView ? " is-active" : ""}${fromTop ? " from-top" : " from-bottom"}`}
      initial={false}
      animate={
        reduceMotion
          ? { opacity: inView ? 1 : 0.2, y: 0, color: inView ? "#171310" : "rgba(23, 19, 16, 0.16)" }
          : {
              opacity: inView ? 1 : 0.14,
              y: inView ? 0 : hiddenY,
              x: inView ? 8 : 0,
              color: inView ? "#171310" : "rgba(23, 19, 16, 0.16)",
            }
      }
      transition={{ duration: 0.6, ease: settle }}
    >
      {phrase}
    </motion.p>
  );
}

export function PdpIncludedSection() {
  const { includedPhrases } = usePdpData();

  return (
    <section className="pdp-included-full" id="included" data-pdp-header-theme="light">
      <div className="pdp-included-full-inner">
        <Reveal className="pdp-included-full-head">
          <span className="pdp-kicker">Full care package</span>
          <h2 className="pdp-included-full-title">What's included</h2>
          <p className="pdp-included-full-lead">
            More than medicine. A complete experience from intake through delivery and ongoing support.
          </p>
        </Reveal>

        <div className="pdp-included-full-stage">
          <div className="pdp-included-full-track">
            {includedPhrases.map((phrase, index) => (
              <IncludedLine key={phrase} phrase={phrase} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
