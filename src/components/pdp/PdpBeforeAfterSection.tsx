import { type MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { settle } from "./pdp-ui";

type PdpBeforeAfterSectionProps = {
  onStart: (e: MouseEvent) => void;
};

const LEFT_STATS = [
  { label: "Week 0", value: "Starting point" },
  { label: "Food noise", value: "Constant" },
  { label: "Energy", value: "Drained by noon" },
  { label: "Clothes", value: "Hiding in them" },
] as const;

const RIGHT_STATS = [
  { label: "14 weeks", value: "−18 lbs*" },
  { label: "Cravings", value: "Quieter" },
  { label: "Energy", value: "Steady again" },
  { label: "Confidence", value: "Showing up" },
] as const;

const TECH_STRIP = [
  { k: "Active", v: "Tirzepatide GLP-1/GIP" },
  { k: "Rhythm", v: "Weekly protocol" },
  { k: "Care", v: "Provider-guided" },
  { k: "Kit", v: "TIDL Pen included" },
] as const;

/** Life-shift — slider with flanking results + technical strip below. */
export function PdpBeforeAfterSection({ onStart }: PdpBeforeAfterSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="pdp-shift pdp-shift--v2" id="life-shift" data-pdp-header-theme="light">
      <div className="pdp-shift-inner pdp-shift-inner--wide">
        <motion.header
          className="pdp-shift-head"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: settle }}
        >
          <h2 className="pdp-shift-title pdp-shift-title--plain">Feel like you again</h2>
        </motion.header>

        <motion.div
          className="pdp-shift-stage pdp-shift-stage--flanked"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: settle }}
        >
          <aside className="pdp-shift-flank pdp-shift-flank--before" aria-label="Before results">
            <p className="pdp-shift-flank-kicker">Before</p>
            {LEFT_STATS.map((row) => (
              <div key={row.label} className="pdp-shift-stat">
                <span className="pdp-shift-stat-label">{row.label}</span>
                <strong className="pdp-shift-stat-value">{row.value}</strong>
              </div>
            ))}
          </aside>

          <div className="pdp-shift-stage-core">
            <BeforeAfterSlider
              className="pdp-shift-slider"
              beforeSrc="/pdp/patient-before.png"
              afterSrc="/pdp/AFTER.png"
              showLabels={false}
              showHint={false}
            />
          </div>

          <aside className="pdp-shift-flank pdp-shift-flank--after" aria-label="After results">
            <p className="pdp-shift-flank-kicker">After</p>
            {RIGHT_STATS.map((row) => (
              <div key={row.label} className="pdp-shift-stat">
                <span className="pdp-shift-stat-label">{row.label}</span>
                <strong className="pdp-shift-stat-value">{row.value}</strong>
              </div>
            ))}
          </aside>
        </motion.div>

        <div className="pdp-shift-tech" aria-label="Treatment details">
          {TECH_STRIP.map((item) => (
            <div key={item.k} className="pdp-shift-tech-item">
              <span>{item.k}</span>
              <strong>{item.v}</strong>
            </div>
          ))}
        </div>

        <p className="pdp-shift-disclaimer">
          *Illustrative patient journey. Individual results vary. Prescription required.
        </p>

        <motion.div
          className="pdp-shift-cta"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: settle }}
        >
          <button type="button" className="hm-btn hm-btn-primary" onClick={onStart}>
            Take the 5-minute quiz
          </button>
        </motion.div>
      </div>
    </section>
  );
}
