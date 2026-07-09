import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ContourMap } from "./ContourMap";
import { HIW_STEPS, HIW_SUPPORTING } from "./data";
import type { HiWCard, HiWStep } from "./data";
import "./how-it-works.css";

const STEP_COUNT = 3;
const CHAPTER_SCROLL_VH = 110;
const settle = [0.22, 1, 0.36, 1] as const;
const punch = [0.34, 1.45, 0.64, 1] as const;

function resolveStep(scrollProgress: number, currentStep: number): number {
  const segment = 1 / STEP_COUNT;
  const h = segment * 0.22;

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

function SlamHeadline({
  text,
  active,
  reduceMotion,
}: {
  text: string;
  active: boolean;
  reduceMotion: boolean;
}) {
  const words = text.split(" ");
  if (reduceMotion) {
    return (
      <h3 className="hiw-step-headline" aria-label={text}>
        {text}
      </h3>
    );
  }

  return (
    <h3 className="hiw-step-headline" aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="hiw-word"
          initial={{ opacity: 0, y: 36, scale: 0.92, filter: "blur(8px)" }}
          animate={
            active
              ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
              : { opacity: 0, y: 36, scale: 0.92, filter: "blur(8px)" }
          }
          transition={{
            duration: 0.42,
            delay: 0.08 + i * 0.055,
            ease: punch,
          }}
        >
          {word}
        </motion.span>
      ))}
    </h3>
  );
}

function FeatureChip({
  card,
  index,
  reduceMotion,
}: {
  card: HiWCard;
  index: number;
  reduceMotion: boolean;
}) {
  const { Icon, title, description } = card;

  if (reduceMotion) {
    return (
      <article className="hiw-chip">
        <div className="hiw-chip-icon" aria-hidden="true">
          <Icon />
        </div>
        <div>
          <p className="hiw-chip-title">{title}</p>
          <p className="hiw-chip-desc">{description}</p>
        </div>
      </article>
    );
  }

  return (
    <motion.article
      className="hiw-chip"
      initial={{ opacity: 0, y: 28, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.38, delay: 0.18 + index * 0.14, ease: punch }}
    >
      <motion.div
        className="hiw-chip-icon"
        aria-hidden="true"
        initial={{ scale: 0.6, rotate: -8 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.34, delay: 0.22 + index * 0.14, ease: punch }}
      >
        <Icon />
      </motion.div>
      <div>
        <p className="hiw-chip-title">{title}</p>
        <p className="hiw-chip-desc">{description}</p>
      </div>
    </motion.article>
  );
}

function StepRail({
  activeStep,
  reduceMotion,
  onSelect,
}: {
  activeStep: number;
  reduceMotion: boolean;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="hiw-rail" role="tablist" aria-label="How TIDL works steps">
      {HIW_STEPS.map((step, index) => {
        const isActive = index === activeStep;
        const isComplete = index < activeStep;

        return (
          <button
            key={step.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`hiw-rail-item${isActive ? " is-active" : ""}${isComplete ? " is-complete" : ""}`}
            onClick={() => onSelect(index)}
          >
            <span className="hiw-rail-num">{(index + 1).toString().padStart(2, "0")}</span>
            <span className="hiw-rail-label">{step.timelineLabel}</span>
            {!reduceMotion && isActive ? (
              <motion.span
                className="hiw-rail-glow"
                layoutId="hiw-rail-glow"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

function StepStage({
  step,
  reduceMotion,
  pulse,
}: {
  step: HiWStep;
  reduceMotion: boolean;
  pulse: boolean;
}) {
  return (
    <div className="hiw-stage-grid">
      {pulse && !reduceMotion ? (
        <motion.div
          className="hiw-flash"
          initial={{ opacity: 0.55 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          aria-hidden="true"
        />
      ) : null}
      <div className="hiw-copy-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={`copy-${step.id}`}
            className="hiw-copy-stack"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 18 }}
            transition={{ duration: 0.35, ease: settle }}
          >
            <motion.p
              className="hiw-step-index"
              key={`idx-${step.id}`}
              initial={{ opacity: 0, scale: 0.35, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: punch }}
            >
              {(step.id + 1).toString().padStart(2, "0")}
            </motion.p>
            <SlamHeadline text={step.headline} active reduceMotion={reduceMotion} />
            <motion.p
              className="hiw-step-body"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.28, ease: settle }}
            >
              {step.body}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="hiw-visual-col">
        <div className={`hiw-frame${pulse ? " is-pulse" : ""}`}>
          <div className="hiw-frame-ring" aria-hidden="true" />
          <div className="hiw-frame-scan" aria-hidden="true" />
          <AnimatePresence mode="wait">
            {reduceMotion ? (
              <div key={`img-${step.id}`} className="hiw-frame-media">
                <img src={step.image} alt="" loading="lazy" />
              </div>
            ) : (
              <motion.div
                key={`img-${step.id}`}
                className="hiw-frame-media"
                initial={{ opacity: 0, scale: 1.12, clipPath: "inset(0 100% 0 0)" }}
                animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0% 0 0)" }}
                exit={{ opacity: 0, scale: 0.96, clipPath: "inset(0 0 0 100%)" }}
                transition={{ duration: 0.55, ease: settle }}
              >
                <img src={step.image} alt="" loading="lazy" className="hiw-frame-img" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function MobileStep({
  step,
  onGetStarted,
  showCta,
}: {
  step: HiWStep;
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
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion]);

  return (
    <article className="hiw-mobile-step" ref={ref}>
      <p className="hiw-step-index">{(step.id + 1).toString().padStart(2, "0")}</p>
      <p className="hiw-mobile-rail-label">{step.timelineLabel}</p>
      <SlamHeadline text={step.headline} active={visible} reduceMotion={reduceMotion} />
      <motion.p
        className="hiw-step-body"
        initial={{ opacity: 0, y: 12 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.2, ease: settle }}
      >
        {step.body}
      </motion.p>
      <div className="hiw-frame hiw-frame--mobile">
        <div className="hiw-frame-ring" aria-hidden="true" />
        <div className="hiw-frame-media">
          <img src={step.image} alt="" loading="lazy" className="hiw-frame-img" />
        </div>
      </div>
      <div className="hiw-chip-row">
        {step.cards.map((card, i) => (
          <FeatureChip key={card.title} card={card} index={i} reduceMotion={reduceMotion ?? false} />
        ))}
      </div>
      {showCta ? (
        <button type="button" className="hiw-cta is-glow" onClick={onGetStarted}>
          Get Started
        </button>
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

  const progressSpring = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  const beamWidth = useTransform(progressSpring, [0, 1], ["8%", "100%"]);

  const triggerPulse = () => {
    setPulse(true);
    window.setTimeout(() => setPulse(false), 900);
  };

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduceMotion) return;
    const step = resolveStep(v, activeStepRef.current);
    if (step !== activeStepRef.current) {
      activeStepRef.current = step;
      setActiveStep(step);
      triggerPulse();
    }
    setShowCta(v > 0.78);
    if (v > 0.88 && step === 2 && !pulsedRef.current) {
      pulsedRef.current = true;
      triggerPulse();
    }
  });

  useEffect(() => {
    if (!reduceMotion) return;
    setActiveStep(2);
    setShowCta(true);
  }, [reduceMotion]);

  const scrollToStep = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const trackHeight = section.offsetHeight;
    const segment = trackHeight / STEP_COUNT;
    const top = section.offsetTop + segment * index + 2;
    window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const step = HIW_STEPS[activeStep];

  return (
    <section
      id="howItWorks"
      ref={sectionRef}
      className="hiw-section"
      data-site-header-theme="dark"
    >
      <div className="hiw-bg" aria-hidden="true">
        <div className="hiw-bg-grain" />
        <div className="hiw-bg-glow hiw-bg-glow--left" />
        <div className="hiw-bg-glow hiw-bg-glow--right" />
        <ContourMap active pulse={pulse} />
      </div>

      <div
        className="hiw-scroll-track"
        style={{ height: `calc(${CHAPTER_SCROLL_VH}vh * ${STEP_COUNT})` }}
        aria-hidden={reduceMotion ? true : undefined}
      >
        <div className="hiw-sticky-frame">
          <header className="hiw-header">
            <p className="hiw-kicker">Your journey</p>
            {reduceMotion ? (
              <h2 className="hiw-title">HOW TIDL WORKS</h2>
            ) : (
              <motion.h2
                className="hiw-title"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.55, ease: punch }}
              >
                {"HOW TIDL WORKS".split(" ").map((word, i) => (
                  <motion.span
                    key={word}
                    className="hiw-title-word"
                    initial={{ opacity: 0, y: 32, rotateX: 40 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.48, delay: 0.08 + i * 0.1, ease: punch }}
                  >
                    {word}{" "}
                  </motion.span>
                ))}
              </motion.h2>
            )}
            <p className="hiw-support">{HIW_SUPPORTING}</p>
          </header>

          <StepRail
            activeStep={activeStep}
            reduceMotion={!!reduceMotion}
            onSelect={scrollToStep}
          />

          <div className="hiw-progress">
            <motion.span className="hiw-progress-beam" style={{ width: beamWidth }} />
          </div>

          <StepStage step={step} reduceMotion={!!reduceMotion} pulse={pulse} />

          <AnimatePresence mode="wait">
            <motion.div
              key={`chips-${step.id}`}
              className="hiw-chip-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {step.cards.map((card, i) => (
                <FeatureChip
                  key={card.title}
                  card={card}
                  index={i}
                  reduceMotion={!!reduceMotion}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            {showCta ? (
              <motion.div
                className="hiw-cta-wrap"
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.45, ease: punch }}
              >
                <button type="button" className="hiw-cta is-glow" onClick={onGetStarted}>
                  Get Started
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      <div className="hiw-mobile">
        <header className="hiw-mobile-head">
          <p className="hiw-kicker">Your journey</p>
          <h2 className="hiw-title">HOW TIDL WORKS</h2>
          <p className="hiw-support">{HIW_SUPPORTING}</p>
        </header>
        {HIW_STEPS.map((s, i) => (
          <MobileStep
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
