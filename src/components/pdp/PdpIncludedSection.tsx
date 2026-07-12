import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { IncludedItem } from "./data/types";
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

function IncludedMobileCard({
  item,
  index,
  penImage,
}: {
  item: IncludedItem;
  index: number;
  penImage: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className={`pdp-incm-card${item.accent ? " is-accent" : ""}`}
      initial={reduceMotion ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.2), ease: settle }}
    >
      <span className="pdp-incm-rail-dot" aria-hidden="true" />
      <div className="pdp-incm-top">
        <span className="pdp-incm-num">{item.num}</span>
        <h3 className="pdp-incm-title">{item.title}</h3>
      </div>
      <p className="pdp-incm-detail">{item.detail}</p>
      {item.accent ? (
        <div className="pdp-incm-pen" aria-hidden="true">
          <img src={penImage} alt="" loading="lazy" />
        </div>
      ) : null}
    </motion.article>
  );
}

export function PdpIncludedSection() {
  const { includedPhrases, includedItems, penImage } = usePdpData();

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

        {/* Desktop / tablet — full-bleed typography */}
        <div className="pdp-included-full-stage">
          <div className="pdp-included-full-track">
            {includedPhrases.map((phrase, index) => (
              <IncludedLine key={phrase} phrase={phrase} index={index} />
            ))}
          </div>
        </div>

        {/* Mobile — connected checklist cards */}
        <div className="pdp-incm">
          <span className="pdp-incm-rail" aria-hidden="true" />
          {includedItems.map((item, index) => (
            <IncludedMobileCard key={item.id} item={item} index={index} penImage={penImage} />
          ))}
        </div>
      </div>
    </section>
  );
}
