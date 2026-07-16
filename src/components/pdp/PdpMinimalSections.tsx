import type { MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, settle } from "./pdp-ui";

type StartProps = { onStart: (e: MouseEvent) => void };

const DONE_PHRASES = [
  "You’re done starting over every Monday",
  "You’re done hiding from photos",
  "You’re done sitting out dates",
  "You’re done feeling rejected before you walk in",
  "You’re done of eating when you’re not even hungry",
  "You’re done of feeling lazy in your own body",
  "You’re done of clothes that don’t feel like you",
  "You’re done waiting to feel like yourself again",
] as const;

const HOW_STEPS = [
  {
    n: "01",
    verb: "Assess",
    whisper: "Tell us what you want to change — five honest minutes.",
    image: "/peptides/glp-1-weight-loss.png",
    tone: "product" as const,
  },
  {
    n: "02",
    verb: "Prescribe",
    whisper: "A licensed provider reviews you. Only if it’s right.",
    image: "/pdp/how-kit.png",
    tone: "kit" as const,
  },
  {
    n: "03",
    verb: "Ship",
    whisper: "Pen + medication, discreet, with clear how-to.",
    image: "/peptides/glp-1-weight-loss.png",
    tone: "product" as const,
  },
  {
    n: "04",
    verb: "Begin",
    whisper: "Walk back into your life — lighter, present, yours.",
    image: "/pdp/AFTER.png",
    tone: "photo" as const,
  },
] as const;

/** Emotional tickers — “this is me” recognition, left → right. */
export function PdpUnderstandSection() {
  const loop = [...DONE_PHRASES, ...DONE_PHRASES];

  return (
    <section className="hm-section hm-understand hm-understand--marquee" id="understand" data-pdp-header-theme="light">
      <div className="hm-shell hm-understand-head">
        <Reveal>
          <h2 className="hm-h2">This is you talking</h2>
        </Reveal>
      </div>

      <div className="hm-done-marquee" aria-label="Things you’re done with">
        <div className="hm-done-track">
          {loop.map((phrase, i) => (
            <span key={`${phrase}-${i}`} className="hm-done-item">
              <span className="hm-done-text">{phrase}</span>
              <span className="hm-done-dot" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineStep({
  step,
  index,
  reduceMotion,
}: {
  step: (typeof HOW_STEPS)[number];
  index: number;
  reduceMotion: boolean | null;
}) {
  const imageAbove = index % 2 === 0;
  const enterY = imageAbove ? -48 : 48;

  const media = (
    <motion.div
      className={`hm-how-tl-media hm-how-tl-media--${step.tone}`}
      initial={reduceMotion ? false : { opacity: 0, y: enterY, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.75, delay: 0.08 * index, ease: settle }}
      whileHover={reduceMotion ? undefined : { y: imageAbove ? -8 : 8, scale: 1.04 }}
    >
      <img src={step.image} alt="" loading="lazy" />
    </motion.div>
  );

  const copy = (
    <motion.div
      className="hm-how-tl-copy"
      initial={reduceMotion ? false : { opacity: 0, y: imageAbove ? 28 : -28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.65, delay: 0.1 + 0.08 * index, ease: settle }}
    >
      <h3>{step.verb}</h3>
      <p>{step.whisper}</p>
    </motion.div>
  );

  return (
    <li className={`hm-how-tl-step${imageAbove ? " is-above" : " is-below"}`}>
      <div className="hm-how-tl-above">{imageAbove ? media : copy}</div>

      <motion.div
        className="hm-how-tl-node"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.45, delay: 0.05 * index, ease: settle }}
        whileHover={reduceMotion ? undefined : { scale: 1.12 }}
      >
        <span>{step.n}</span>
      </motion.div>

      <div className="hm-how-tl-below">{imageAbove ? copy : media}</div>
    </li>
  );
}

/** Alternating timeline — image above / under the line, scroll + hover motion. */
export function PdpHowItWorks(_props: StartProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hm-section hm-how hm-how--timeline" id="how" data-pdp-header-theme="light">
      <div className="hm-shell hm-how-tl-head">
        <Reveal>
          <h2 className="hm-h2">How it works</h2>
          <p className="hm-lede">Five minutes. Real care. Your door.</p>
        </Reveal>
      </div>

      <div className="hm-how-tl">
        <div className="hm-how-tl-line" aria-hidden="true" />
        <ol className="hm-how-tl-track">
          {HOW_STEPS.map((step, index) => (
            <TimelineStep
              key={step.n}
              step={step}
              index={index}
              reduceMotion={reduceMotion}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
