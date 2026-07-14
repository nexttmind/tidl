import { type MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePdpData } from "./PdpDataProvider";
import { settle } from "./pdp-ui";

const BEFORE = [
  "Skipping plans because none of your clothes feel right",
  "Avoiding photos, mirrors, and tight seating",
  "Starting over every Monday — and quitting by Thursday",
] as const;

const AFTER = [
  "Saying yes to invitations without a second thought",
  "Dressing for the day you want — not the body you hide",
  "A pre-dosed weekly routine you can actually stick with",
] as const;

type PdpBeforeAfterSectionProps = {
  onStart: (e: MouseEvent) => void;
};

export function PdpBeforeAfterSection({ onStart }: PdpBeforeAfterSectionProps) {
  const { showPenShowcase } = usePdpData();
  const reduceMotion = useReducedMotion();

  if (!showPenShowcase) return null;

  return (
    <section className="pdp-shift" id="life-shift" data-pdp-header-theme="light">
      <div className="pdp-shift-inner">
        <motion.header
          className="pdp-shift-head"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: settle }}
        >
          <span className="pdp-kicker">The difference that sells itself</span>
          <h2 className="pdp-shift-title">
            Before the Pen.
            <span> After momentum.</span>
          </h2>
          <p className="pdp-shift-lead">
            This isn&apos;t about a smaller number on a chart. It&apos;s about showing up in your life
            again — with a clinical plan built for consistency.
          </p>
        </motion.header>

        <div className="pdp-shift-board">
          <motion.article
            className="pdp-shift-panel pdp-shift-panel--before"
            initial={reduceMotion ? false : { opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: settle }}
          >
            <div className="pdp-shift-panel-label">
              <span>01</span>
              Before
            </div>
            <h3 className="pdp-shift-panel-title">Life on pause</h3>
            <ul className="pdp-shift-list">
              {BEFORE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.article>

          <div className="pdp-shift-divider" aria-hidden="true">
            <span className="pdp-shift-divider-core">PEN</span>
          </div>

          <motion.article
            className="pdp-shift-panel pdp-shift-panel--after"
            initial={reduceMotion ? false : { opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, delay: 0.08, ease: settle }}
          >
            <div className="pdp-shift-panel-label">
              <span>02</span>
              After
            </div>
            <h3 className="pdp-shift-panel-title">Life in motion</h3>
            <ul className="pdp-shift-list">
              {AFTER.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.article>
        </div>

        <motion.div
          className="pdp-shift-cta"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: settle }}
        >
          <p>Start with a five-minute intake. A licensed provider reviews your plan before anything ships.</p>
          <a href="#get-started" className="pdp-shift-btn" onClick={onStart}>
            Start your free assessment
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
