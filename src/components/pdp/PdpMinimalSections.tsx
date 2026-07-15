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
  "You’re done waiting to feel like her again",
] as const;

const HOW_CHAPTERS = [
  {
    n: "01",
    verb: "Assess",
    whisper: "your goals",
    image: "/pdp/patient-after.png",
    tone: "photo" as const,
  },
  {
    n: "02",
    verb: "Prescribe",
    whisper: "if right for you",
    image: "/pdp/how-kit.png",
    tone: "kit" as const,
  },
  {
    n: "03",
    verb: "Ship",
    whisper: "pen + medication",
    image: "/peptides/glp-1-weight-loss.png",
    tone: "product" as const,
  },
  {
    n: "04",
    verb: "Begin",
    whisper: "with clarity",
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
          <p className="hm-kicker">We get it</p>
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

function HowChapterCard({
  chapter,
  index,
}: {
  chapter: (typeof HOW_CHAPTERS)[number];
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const fromLeft = index % 2 === 0;
  // Arc depths: outer cards travel farther / rotate more — semicircle meet in the middle.
  const arcX = fromLeft ? -140 - index * 18 : 140 + (3 - index) * 18;
  const arcY = -110 - (index === 0 || index === 3 ? 24 : 8);
  const arcRotate = fromLeft ? -22 - index * 2 : 22 + (3 - index) * 2;

  return (
    <motion.div
      className="hm-how-chapter"
      initial={
        reduceMotion
          ? false
          : { opacity: 0, x: arcX, y: arcY, rotate: arcRotate, scale: 0.86 }
      }
      whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.85,
        delay: 0.08 * index,
        ease: settle,
      }}
    >
      <article className={`hm-how-card hm-how-card--${chapter.tone}`} role="listitem">
        <span className="hm-how-ghost" aria-hidden="true">
          {chapter.n}
        </span>
        <div className="hm-how-card-media">
          <img src={chapter.image} alt="" loading="lazy" />
        </div>
        <div className="hm-how-card-copy">
          <h3>{chapter.verb}</h3>
          <p>{chapter.whisper}</p>
        </div>
      </article>
    </motion.div>
  );
}

/** Medical path — light, product-true, no apps. */
export function PdpHowItWorks({ onStart }: StartProps) {
  return (
    <section className="hm-section hm-how hm-how--film hm-how--med" id="how" data-pdp-header-theme="light">
      <div className="hm-shell hm-how-film-head">
        <Reveal>
          <h2 className="hm-h2">How it works</h2>
        </Reveal>
      </div>

      <div className="hm-how-rail" role="list">
        {HOW_CHAPTERS.map((chapter, i) => (
          <HowChapterCard key={chapter.n} chapter={chapter} index={i} />
        ))}
      </div>

      <div className="hm-how-film-cta">
        <button type="button" className="hm-btn hm-btn-primary" onClick={onStart}>
          Get started
        </button>
      </div>
    </section>
  );
}
