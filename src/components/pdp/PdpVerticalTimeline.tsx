import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { usePdpData } from "./PdpDataProvider";
import { Reveal, settle } from "./pdp-ui";

import type { TimelineStep } from "./data/types";

function TimelineStepRow({ step, index }: { step: TimelineStep; index: number }) {
  const rowRef = useRef<HTMLElement>(null);
  const inView = useInView(rowRef, { amount: 0.55, margin: "-12% 0px -12% 0px" });
  const reduceMotion = useReducedMotion();
  const side = index % 2 === 0 ? "left" : "right";
  const slideFrom = side === "left" ? -36 : 36;

  return (
    <article
      ref={rowRef}
      className={`pdp-vtimeline-step pdp-vtimeline-step--${side}${inView ? " is-visible" : ""}`}
      data-timeline-step={index}
    >
      <motion.div
        className="pdp-vtimeline-marker"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.35, y: 8 }}
        animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.35, y: 8 }}
        transition={{ type: "spring", stiffness: 420, damping: 24, mass: 0.7 }}
      >
        <span>{step.step}</span>
      </motion.div>

      <motion.div
        className="pdp-vtimeline-body"
        initial={reduceMotion ? false : { opacity: 0, x: slideFrom, filter: "blur(6px)" }}
        animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: slideFrom, filter: "blur(6px)" }}
        transition={{ duration: 0.55, delay: 0.08, ease: settle }}
      >
        <div className="pdp-vtimeline-meta">
          <h3>{step.label}</h3>
          <span className="pdp-vtimeline-duration">{step.duration}</span>
        </div>
        <p>{step.detail}</p>
      </motion.div>
    </article>
  );
}

export function PdpVerticalTimeline() {
  const { verticalTimeline } = usePdpData();
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.75", "end 0.35"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0.05, 1]);

  return (
    <section className="pdp-section pdp-section--timeline" id="journey" ref={sectionRef} data-pdp-header-theme="light">
      <div className="pdp-vtimeline-wrap">
        <Reveal>
          <span className="pdp-kicker">Your care path</span>
          <h2 className="pdp-section-title">From intake to delivery</h2>
          <p className="pdp-section-lead">
            Five clear steps — each designed to feel fast, legitimate, and entirely on your terms.
          </p>
        </Reveal>

        <div className="pdp-vtimeline">
          <div className="pdp-vtimeline-rail" aria-hidden="true">
            <motion.div className="pdp-vtimeline-rail-fill" style={{ scaleY: reduceMotion ? 1 : lineScale }} />
          </div>

          <div className="pdp-vtimeline-steps">
            {verticalTimeline.map((step, index) => (
              <TimelineStepRow key={step.step} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
