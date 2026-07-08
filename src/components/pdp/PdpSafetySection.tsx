import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { PEN_IMAGE, SAFETY_PILLARS } from "./data/glp1-pdp-data";
import { Reveal, settle } from "./pdp-ui";

function SafetyCard({
  num,
  label,
  detail,
  index,
  side,
}: {
  num: string;
  label: string;
  detail: string;
  index: number;
  side: "left" | "right";
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const reduceMotion = useReducedMotion();
  const fromX = side === "left" ? -28 : 28;

  return (
    <motion.article
      ref={ref}
      className={`pdp-safety-card pdp-safety-card--${side}`}
      initial={reduceMotion ? false : { opacity: 0, x: fromX, y: 18 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.62, delay: index * 0.12, ease: settle }}
    >
      <span className="pdp-safety-card-num">{num}</span>
      <span className="pdp-safety-card-divider" aria-hidden="true" />
      <div className="pdp-safety-card-copy">
        <h3>{label}</h3>
        <p>{detail}</p>
      </div>
    </motion.article>
  );
}

export function PdpSafetySection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, amount: 0.65 });
  const visualInView = useInView(visualRef, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const title = "Built like a real medical brand".split(" ");

  return (
    <section className="pdp-safety-full" id="safety">
      <div className="pdp-safety-full-inner">
        <Reveal className="pdp-safety-full-head">
          <span className="pdp-kicker">Safety & trust</span>
          <h2 className="pdp-safety-full-title" ref={titleRef}>
            {title.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                className="inline-block"
                initial={reduceMotion ? false : { opacity: 0, y: 16, filter: "blur(8px)" }}
                animate={titleInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.55, delay: index * 0.05, ease: settle }}
              >
                {word}
                {index < title.length - 1 ? "\u00A0" : ""}
              </motion.span>
            ))}
          </h2>
          <motion.p
            className="pdp-safety-full-lead"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.28, ease: settle }}
          >
            Licensed providers and US pharmacies — prescription-only, private care.
          </motion.p>
        </Reveal>

        <div className="pdp-safety-full-body-wrap">
          <span className="pdp-safety-accent" aria-hidden="true" />

          <div className="pdp-safety-full-body">
            <div className="pdp-safety-full-side pdp-safety-full-side--left">
              {SAFETY_PILLARS.slice(0, 2).map((pillar, index) => (
                <SafetyCard
                  key={pillar.id}
                  num={pillar.num}
                  label={pillar.label}
                  detail={pillar.detail}
                  index={index}
                  side="left"
                />
              ))}
            </div>

            <motion.div
              ref={visualRef}
              className="pdp-safety-full-visual"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.92, y: 20 }}
              animate={visualInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.75, ease: settle }}
            >
              <div className="pdp-safety-full-visual-glow" aria-hidden="true" />
              <div className="pdp-safety-pen-float">
                <img src={PEN_IMAGE} alt="" loading="lazy" />
              </div>
            </motion.div>

            <div className="pdp-safety-full-side pdp-safety-full-side--right">
              {SAFETY_PILLARS.slice(2).map((pillar, index) => (
                <SafetyCard
                  key={pillar.id}
                  num={pillar.num}
                  label={pillar.label}
                  detail={pillar.detail}
                  index={index}
                  side="right"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
