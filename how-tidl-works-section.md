# HOW TIDL WORKS — Code + CSS

This file contains the full current implementation for the “How TIDL Works” premium storytelling section.

## `src/components/home/how-it-works/HowItWorksSection.tsx`

```tsx
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ContourMap } from "./ContourMap";
import { HIW_STEPS, HIW_SUPPORTING } from "./data";
import type { HiWCard, ImageMotion } from "./data";
import "./how-it-works.css";

const STEP_COUNT = 3;
/** Each chapter gets an equal scroll segment; tall track prevents skipping on fast scroll */
const CHAPTER_SCROLL_VH = 155;
const settle = [0.22, 1, 0.36, 1] as const;

function resolveStep(scrollProgress: number, currentStep: number): number {
  const segment = 1 / STEP_COUNT;
  const h = segment * 0.18;

  if (currentStep === 0) {
    if (scrollProgress >= segment - h) return 1;
    return 0;
  }
  if (currentStep === 1) {
    if (scrollProgress < segment - h) return 0;
    if (scrollProgress >= 2 * segment - h) return 2;
    return 1;
  }
  if (scrollProgress < 2 * segment - h) return 1;
  return 2;
}

function stepProgress(scrollProgress: number, step: number): number {
  const segment = 1 / STEP_COUNT;
  const start = step * segment;
  const local = (scrollProgress - start) / segment;
  return Math.max(0, Math.min(1, local));
}

function WordReveal({ text, active }: { text: string; active: boolean }) {
  const words = text.split(" ");
  return (
    <h3 className="hiw-step-headline" aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="hiw-word"
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={
            active
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 18, filter: "blur(6px)" }
          }
          transition={{ duration: 0.38, delay: i * 0.04, ease: settle }}
        >
          {word}
        </motion.span>
      ))}
    </h3>
  );
}

function FloatingCard({
  card,
  index,
  active,
}: {
  card: HiWCard;
  index: number;
  active: boolean;
}) {
  const { Icon, title, description } = card;
  return (
    <motion.article
      className={`hiw-float-card hiw-float-card--${index}`}
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={
        active
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 18, scale: 0.96 }
      }
      transition={{ duration: 0.45, delay: 0.2 + index * 0.08, ease: settle }}
    >
      <div className="hiw-float-icon">
        <Icon />
      </div>
      <p className="hiw-float-title">{title}</p>
      <p className="hiw-float-desc">{description}</p>
    </motion.article>
  );
}

function imageVariants(motionType: ImageMotion) {
  if (motionType === "slideRight") {
    return {
      initial: { opacity: 0, x: 80, scale: 1.02 },
      animate: { opacity: 1, x: 0, scale: 1 },
      exit: { opacity: 0, x: -40, scale: 0.98 },
    };
  }
  if (motionType === "crossfade") {
    return {
      initial: { opacity: 0, scale: 1.06 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.96 },
    };
  }
  return {
    initial: { opacity: 0, y: 48, scale: 1.02 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -24, scale: 0.98 },
  };
}

function StripHeadline({
  text,
  delay,
  reduceMotion,
}: {
  text: string;
  delay: number;
  reduceMotion: boolean;
}) {
  const words = text.split(" ");
  if (reduceMotion) return <>{text}</>;

  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="hiw-strip-word"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, delay: delay + i * 0.035, ease: settle }}
        >
          {word}
          {i < words.length - 1 ? " " : null}
        </motion.span>
      ))}
    </>
  );
}

function StripItem({
  card,
  index,
  reduceMotion,
}: {
  card: HiWCard;
  index: number;
  reduceMotion: boolean;
}) {
  const itemDelay = index * 0.11;
  const { Icon, title, description } = card;
  const iconDelay = itemDelay;
  const headlineDelay = itemDelay + 0.08;
  const descDelay = itemDelay + 0.16;

  if (reduceMotion) {
    return (
      <div className="hiw-strip-item">
        <Icon className="hiw-strip-icon" aria-hidden="true" />
        <p className="hiw-strip-title">{title}</p>
        <p className="hiw-strip-desc">{description}</p>
      </div>
    );
  }

  return (
    <motion.div
      className="hiw-strip-item"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, delay: itemDelay, ease: settle }}
    >
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.28, delay: iconDelay, ease: settle }}
      >
        <Icon className="hiw-strip-icon" aria-hidden="true" />
      </motion.div>
      <p className="hiw-strip-title">
        <StripHeadline text={title} delay={headlineDelay} reduceMotion={reduceMotion} />
      </p>
      <motion.p
        className="hiw-strip-desc"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, delay: descDelay, ease: settle }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
}

function StepVisual({
  stepIndex,
  active,
  pulse,
  reduceMotion,
}: {
  stepIndex: number;
  active: boolean;
  pulse: boolean;
  reduceMotion: boolean;
}) {
  const step = HIW_STEPS[stepIndex];
  const variants = imageVariants(step.imageMotion);
  const shouldRevealStrip = reduceMotion ? true : active;

  return (
    <div className="hiw-visual">
      <AnimatePresence mode="wait">
        <motion.div
          key={`img-${step.id}`}
          className="hiw-image-wrap"
          initial={variants.initial}
          animate={variants.animate}
          exit={variants.exit}
          transition={{ duration: 0.65, ease: settle }}
        >
          <img src={step.image} alt="" loading="lazy" />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {reduceMotion ? (
          <div key={`strip-${step.id}`} className="hiw-info-strip">
            {step.cards.map((card, i) => (
              <StripItem key={card.title} card={card} index={i} reduceMotion />
            ))}
          </div>
        ) : (
          <motion.div
            key={`strip-${step.id}`}
            className="hiw-info-strip"
            initial={{ opacity: 0 }}
            animate={shouldRevealStrip ? { opacity: 1 } : { opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.26, ease: settle }}
          >
            {step.cards.map((card, i) => (
              <StripItem key={card.title} card={card} index={i} reduceMotion={false} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Timeline({
  activeStep,
  beamScale,
}: {
  activeStep: number;
  beamScale: number;
}) {
  return (
    <div className="hiw-timeline" aria-label="Treatment journey progress">
      <div className="hiw-timeline-rail" aria-hidden="true">
        <motion.div
          className="hiw-timeline-beam"
          style={{ scaleY: beamScale }}
        />
      </div>
      {HIW_STEPS.map((step, i) => (
        <motion.div
          key={step.id}
          className={`hiw-timeline-step${i === activeStep ? " is-active" : ""}${i < activeStep ? " is-complete" : ""}`}
          animate={i === activeStep ? { scale: [1, 1.02, 1] } : { scale: 1 }}
          transition={{ duration: 0.5, ease: settle }}
        >
          <span className="hiw-timeline-dot" aria-hidden="true" />
          <span>{step.timelineLabel}</span>
        </motion.div>
      ))}
    </div>
  );
}

function MobileChapter({
  step,
  onGetStarted,
  showCta,
}: {
  step: (typeof HIW_STEPS)[number];
  onGetStarted?: () => void;
  showCta?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduceMotion) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion]);

  return (
    <article className="hiw-mobile-chapter" ref={ref}>
      <p className="hiw-kicker">{`0${step.id + 1}`}</p>
      <WordReveal text={step.headline} active={visible} />
      <motion.p
        className="hiw-step-body"
        initial={{ opacity: 0, y: 12 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45, delay: 0.2, ease: settle }}
      >
        {step.body}
      </motion.p>
      <div className="hiw-mobile-visual">
        <StepVisual
          stepIndex={step.id}
          active={visible}
          pulse={showCta ?? false}
          reduceMotion={reduceMotion}
        />
      </div>
      {showCta ? (
        <motion.div
          className="hiw-cta-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button type="button" className="hiw-cta is-glow" onClick={onGetStarted}>
            Get Started
          </button>
        </motion.div>
      ) : null}
    </article>
  );
}

export function HowItWorksSection({
  onGetStarted,
}: {
  onGetStarted?: () => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const [showCta, setShowCta] = useState(false);
  const [pulse, setPulse] = useState(false);

  const pulsedRef = useRef(false);
  const activeStepRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const beamScale = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0.12, 0.45, 0.78, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduceMotion) return;
    const step = resolveStep(v, activeStepRef.current);
    if (step !== activeStepRef.current) {
      activeStepRef.current = step;
      setActiveStep(step);
    }
    setShowCta(v > 0.82);
    if (v > 0.9 && step === 2 && !pulsedRef.current) {
      pulsedRef.current = true;
      setPulse(true);
      window.setTimeout(() => setPulse(false), 1400);
    }
  });

  useEffect(() => {
    if (!reduceMotion) return;
    setActiveStep(2);
    setShowCta(true);
  }, [reduceMotion]);

  const step = HIW_STEPS[activeStep];

  return (
    <section id="howItWorks" ref={sectionRef} className="hiw-section">
      <div
        className="hiw-scroll-track"
        style={{ height: `calc(${CHAPTER_SCROLL_VH}vh * ${STEP_COUNT})` }}
        aria-hidden={reduceMotion ? true : undefined}
      >
        <div className="hiw-sticky-frame">
          <div className="hiw-grid">
            <aside className="hiw-left">
              <div>
                <p className="hiw-kicker">Your journey</p>
                <h2 className="hiw-title">HOW TIDL WORKS</h2>
                <p className="hiw-support">{HIW_SUPPORTING}</p>
              </div>
              <Timeline activeStep={activeStep} beamScale={beamScale} />
              <AnimatePresence>
                {showCta ? (
                  <motion.div
                    className="hiw-cta-wrap"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.55, ease: settle }}
                  >
                    <button
                      type="button"
                      className={`hiw-cta${showCta ? " is-glow" : ""}`}
                      onClick={onGetStarted}
                    >
                      Get Started
                    </button>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </aside>

            <div className="hiw-right">
              <div className="hiw-panel">
                <div className="hiw-panel-inner">
                  <div className="hiw-copy-block">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                      >
                        <WordReveal text={step.headline} active />
                        <motion.p
                          className="hiw-step-body"
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, delay: 0.18, ease: settle }}
                        >
                          {step.body}
                        </motion.p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <StepVisual
                    stepIndex={activeStep}
                    active
                    pulse={pulse}
                    reduceMotion={reduceMotion}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hiw-mobile">
        <div className="hiw-mobile-head">
          <p className="hiw-kicker">Your journey</p>
          <h2 className="hiw-title">HOW TIDL WORKS</h2>
          <p className="hiw-support">{HIW_SUPPORTING}</p>
        </div>
        {HIW_STEPS.map((s, i) => (
          <MobileChapter
            key={s.id}
            step={s}
            onGetStarted={onGetStarted}
            showCta={i === HIW_STEPS.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
```

## `src/components/home/how-it-works/how-it-works.css`

```css
/* ===== How TIDL Works — premium storytelling ===== */
.hiw-section {
  --hiw-bg: #f7f3ec;
  --hiw-bg-2: #f3ede3;
  --hiw-ink: #171310;
  --hiw-muted: #5f5954;
  --hiw-gold: #c8a45a;
  --hiw-gold-deep: #a88233;
  --hiw-gold-hover: #d6b36c;
  --hiw-border: rgba(23, 19, 16, 0.08);
  background: var(--hiw-bg);
  position: relative;
  overflow: clip;
}

.hiw-scroll-track {
  position: relative;
}

.hiw-sticky-frame {
  position: sticky;
  top: 0;
  height: 100vh;
  min-height: 640px;
  display: flex;
  align-items: center;
  padding: max(24px, env(safe-area-inset-top)) max(20px, env(safe-area-inset-right))
    max(24px, env(safe-area-inset-bottom)) max(20px, env(safe-area-inset-left));
}

.hiw-grid {
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(280px, 0.95fr) minmax(0, 1.15fr);
  gap: clamp(32px, 5vw, 72px);
  align-items: center;
}

.hiw-left {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.hiw-kicker {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--hiw-gold-deep);
}

.hiw-title {
  margin: 0;
  font-size: clamp(2rem, 4.2vw, 3.25rem);
  line-height: 1.05;
  letter-spacing: -0.03em;
  font-weight: 600;
  color: var(--hiw-ink);
}

.hiw-support {
  margin: 0;
  max-width: 34ch;
  font-size: clamp(0.95rem, 1.8vw, 1.05rem);
  line-height: 1.65;
  color: var(--hiw-muted);
}

.hiw-timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding-left: 4px;
}

.hiw-timeline-rail {
  position: absolute;
  left: 11px;
  top: 8px;
  bottom: 8px;
  width: 2px;
  border-radius: 999px;
  background: var(--hiw-border);
  overflow: hidden;
}

.hiw-timeline-beam {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transform-origin: top center;
  background: linear-gradient(180deg, var(--hiw-gold-hover), var(--hiw-gold));
  border-radius: inherit;
  box-shadow: 0 0 12px rgba(200, 164, 90, 0.45);
}

.hiw-timeline-step {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  padding-left: 2px;
  color: var(--hiw-muted);
  font-size: 0.95rem;
  transition: color 0.35s ease;
}

.hiw-timeline-step.is-active {
  color: var(--hiw-ink);
  font-weight: 600;
}

.hiw-timeline-dot {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1.5px solid var(--hiw-border);
  background: var(--hiw-bg);
  display: grid;
  place-items: center;
  flex-shrink: 0;
  z-index: 1;
}

.hiw-timeline-dot::after {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: transparent;
  transition: background 0.35s ease, transform 0.35s ease;
}

.hiw-timeline-step.is-active .hiw-timeline-dot {
  border-color: rgba(200, 164, 90, 0.55);
  box-shadow: 0 0 0 4px rgba(200, 164, 90, 0.12);
}

.hiw-timeline-step.is-active .hiw-timeline-dot::after {
  background: var(--hiw-gold);
  transform: scale(1.1);
}

.hiw-timeline-step.is-complete .hiw-timeline-dot::after {
  background: var(--hiw-gold-deep);
}

.hiw-right {
  position: relative;
  min-height: clamp(560px, 70vh, 740px);
  align-self: stretch;
  perspective: 1100px;
}

.hiw-panel {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: inherit;
  border-radius: 28px;
  border: none;
  background: linear-gradient(165deg, var(--hiw-bg) 0%, var(--hiw-bg-2) 100%);
  box-shadow:
    0 34px 90px -78px rgba(23, 19, 16, 0.55),
    0 16px 50px -36px rgba(23, 19, 16, 0.25);
  overflow: visible;
  isolation: isolate;
  padding: clamp(16px, 2.2vw, 24px);
  display: flex;
  flex-direction: column;
}

.hiw-panel-inner {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: clamp(14px, 2vw, 20px);
  flex: 1;
  min-height: 0;
}

.hiw-copy-block {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 52ch;
  flex-shrink: 0;
}

.hiw-step-headline {
  margin: 0;
  font-size: clamp(1.5rem, 2.8vw, 2rem);
  line-height: 1.12;
  letter-spacing: -0.025em;
  font-weight: 600;
  color: var(--hiw-ink);
}

.hiw-step-headline .hiw-word {
  display: inline-block;
  margin-right: 0.28em;
}

.hiw-step-body {
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.7;
  color: var(--hiw-muted);
}

.hiw-visual {
  position: relative;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 28px;
  border-radius: 0;
  background: transparent;
  overflow: visible;
}

.hiw-contour {
  display: none;
}

.hiw-image-wrap {
  position: relative;
  inset: auto;
  border-radius: 8px;
  overflow: hidden;
  will-change: transform, opacity;
  height: clamp(300px, 45vh, 430px);
}

.hiw-image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  animation: hiwImageBreath 8s ease-in-out infinite;
}

@keyframes hiwImageBreath {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.hiw-info-strip {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: start;
  padding-top: 4px;
}

.hiw-strip-item {
  padding: 0 clamp(12px, 2.1vw, 22px);
}

.hiw-strip-item:not(:last-child) {
  border-right: 1px solid var(--hiw-border);
}

.hiw-strip-icon {
  width: 22px;
  height: 22px;
  color: var(--hiw-gold);
  display: inline-block;
}

.hiw-strip-title {
  margin: 10px 0 6px;
  font-weight: 800;
  font-size: 0.98rem;
  line-height: 1.15;
  color: var(--hiw-ink);
}

.hiw-strip-word {
  display: inline-block;
}

.hiw-strip-desc {
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.5;
  color: var(--hiw-muted);
}

/* The floating card styles remain in the stylesheet for reuse;
   the current layout no longer renders FloatingCard from TSX. */

.hiw-float-card {
  position: absolute;
  z-index: 4;
  min-width: 230px;
  max-width: 300px;
  padding: 14px 16px;
  border-radius: 16px;
  border: 1px solid var(--hiw-border);
  background: rgba(247, 243, 236, 0.78);
  backdrop-filter: blur(14px) saturate(1.08);
  -webkit-backdrop-filter: blur(14px) saturate(1.08);
  transform-style: preserve-3d;
  rotate: var(--hiw-card-rot, 0deg);
  box-shadow:
    0 2px 10px rgba(23, 19, 16, 0.12),
    0 14px 28px -18px rgba(23, 19, 16, 0.28),
    0 36px 70px -52px rgba(23, 19, 16, 0.18);
  transition:
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.35s ease,
    box-shadow 0.35s ease;
  will-change: box-shadow, border-color;
}

.hiw-float-card--0 {
  top: 12%;
  right: 6%;
  --hiw-card-rot: -1.35deg;
  box-shadow:
    0 2px 10px rgba(23, 19, 16, 0.11),
    0 16px 34px -20px rgba(23, 19, 16, 0.28),
    0 40px 85px -56px rgba(23, 19, 16, 0.17);
}
.hiw-float-card--1 {
  top: 42%;
  left: 4%;
  --hiw-card-rot: 1.6deg;
  box-shadow:
    0 2px 10px rgba(23, 19, 16, 0.13),
    0 14px 30px -18px rgba(23, 19, 16, 0.31),
    0 36px 75px -52px rgba(23, 19, 16, 0.19);
}
.hiw-float-card--2 {
  bottom: 10%;
  right: 10%;
  --hiw-card-rot: -0.6deg;
  box-shadow:
    0 2px 9px rgba(23, 19, 16, 0.1),
    0 12px 26px -18px rgba(23, 19, 16, 0.26),
    0 32px 65px -48px rgba(23, 19, 16, 0.15);
}

@media (hover: hover) and (pointer: fine) {
  .hiw-float-card:hover {
    translate: 0 -4px;
    border-color: rgba(200, 164, 90, 0.55);
    box-shadow:
      0 2px 12px rgba(23, 19, 16, 0.14),
      0 16px 40px -22px rgba(200, 164, 90, 0.35),
      0 44px 95px -58px rgba(23, 19, 16, 0.2);
  }
}

.hiw-float-icon {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 1px solid rgba(200, 164, 90, 0.35);
  background: rgba(200, 164, 90, 0.1);
  color: var(--hiw-gold-deep);
  display: grid;
  place-items: center;
  margin-bottom: 10px;
}

.hiw-float-icon svg {
  width: 19px;
  height: 19px;
}

.hiw-float-title {
  margin: 0 0 4px;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  color: var(--hiw-ink);
}

.hiw-float-desc {
  margin: 0;
  font-size: 0.82rem;
  line-height: 1.45;
  color: var(--hiw-muted);
}

.hiw-cta-wrap {
  margin-top: 8px;
}

.hiw-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 48px;
  padding: 0 24px;
  border-radius: 12px;
  border: 1px solid var(--hiw-gold);
  background: var(--hiw-gold);
  color: var(--hiw-ink);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.35s ease,
    border-color 0.35s ease,
    box-shadow 0.35s ease,
    transform 0.35s ease;
}

.hiw-cta.is-glow {
  box-shadow:
    0 0 0 1px rgba(200, 164, 90, 0.25),
    0 12px 36px -12px rgba(200, 164, 90, 0.55);
}

@media (hover: hover) and (pointer: fine) {
  .hiw-cta:hover {
    background: var(--hiw-gold-hover);
    border-color: var(--hiw-gold-hover);
    transform: translateY(-2px);
  }
}

/* Mobile: stacked chapters, no scroll pin */
.hiw-mobile {
  display: none;
  padding: 72px max(20px, env(safe-area-inset-right)) 80px max(20px, env(safe-area-inset-left));
}

.hiw-mobile-head {
  margin-bottom: 40px;
}

.hiw-mobile-chapter {
  margin-bottom: 48px;
}

.hiw-mobile-chapter:last-child {
  margin-bottom: 0;
}

@media (max-width: 991px) {
  .hiw-scroll-track,
  .hiw-sticky-frame {
    display: none;
  }

  .hiw-mobile {
    display: block;
  }

  .hiw-visual {
    min-height: 0;
    gap: 14px;
  }

  .hiw-image-wrap {
    height: 260px;
    border-radius: 8px;
  }

  .hiw-info-strip {
    grid-template-columns: 1fr;
  }

  .hiw-strip-item {
    padding: 0 max(16px, env(safe-area-inset-left));
  }

  .hiw-strip-item:not(:last-child) {
    border-right: none;
    border-bottom: 1px solid var(--hiw-border);
    padding-bottom: 16px;
    margin-bottom: 16px;
  }

  .hiw-float-card {
    position: relative;
    inset: auto;
    max-width: none;
    margin-top: 12px;
  }

  .hiw-float-card--0,
  .hiw-float-card--1,
  .hiw-float-card--2 {
    top: auto;
    right: auto;
    left: auto;
    bottom: auto;
  }

  .hiw-mobile-visual {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-top: 20px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hiw-image-wrap img {
    animation: none;
  }

  /* No hover "movement" when reduced motion is enabled */
  .hiw-float-card:hover {
    translate: 0 0;
  }
}
```

