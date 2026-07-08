import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
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

function WordReveal({
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
  reduceMotion,
  imagePlateX,
  imagePlateY,
  infoPlateX,
  infoPlateY,
}: {
  stepIndex: number;
  reduceMotion: boolean;
  imagePlateX: MotionValue<number> | number;
  imagePlateY: MotionValue<number> | number;
  infoPlateX: MotionValue<number> | number;
  infoPlateY: MotionValue<number> | number;
}) {
  const step = HIW_STEPS[stepIndex];
  const variants = imageVariants(step.imageMotion);
  const stepKey = step.id;

  return (
    <div className="hiw-stack-right">
      {/* Container 2 — Hero image */}
      <div className="hiw-image-layer">
        <motion.div
          className="hiw-paper-plate hiw-paper-plate--image"
          aria-hidden="true"
          style={{
            x: reduceMotion ? 0 : imagePlateX,
            y: reduceMotion ? 0 : imagePlateY,
          }}
        />

        <div className="hiw-image-float" aria-hidden={reduceMotion ? undefined : true}>
          {reduceMotion ? (
            <div key={`img-${stepKey}`} className="hiw-image-card">
              <img src={step.image} alt="" loading="lazy" />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${stepKey}`}
                className="hiw-image-card"
                initial={variants.initial}
                animate={variants.animate}
                exit={variants.exit}
                transition={{ duration: 0.6, ease: settle }}
              >
                <img src={step.image} alt="" loading="lazy" />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Container 3 — Minimal information panel */}
      <div className="hiw-info-layer">
        <motion.div
          className="hiw-paper-plate hiw-paper-plate--info"
          aria-hidden="true"
          style={{
            x: reduceMotion ? 0 : infoPlateX,
            y: reduceMotion ? 0 : infoPlateY,
          }}
        />

        <AnimatePresence mode="wait">
          {reduceMotion ? (
            <div key={`info-${stepKey}`} className="hiw-info-panel">
              {step.cards.map((card) => (
                <div key={card.title} className="hiw-info-row">
                  <div className="hiw-info-icon" aria-hidden="true">
                    <card.Icon />
                  </div>
                  <div className="hiw-info-text">
                    <p className="hiw-info-title">{card.title}</p>
                    <p className="hiw-info-desc">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              key={`info-${stepKey}`}
              className="hiw-info-panel"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.35, ease: settle }}
            >
              {step.cards.map((card, i) => {
                const rowDelay = i * 0.12;
                const iconDelay = rowDelay + 0.02;
                const titleDelay = rowDelay + 0.08;
                const descDelay = rowDelay + 0.14;

                return (
                  <motion.div
                    key={card.title}
                    className="hiw-info-row"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.26, delay: rowDelay, ease: settle }}
                  >
                    <motion.div
                      className="hiw-info-icon"
                      aria-hidden="true"
                      initial={{ opacity: 0, y: 8, scale: 0.985 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.24, delay: iconDelay, ease: settle }}
                    >
                      <card.Icon />
                    </motion.div>

                    <div className="hiw-info-text">
                      <motion.p
                        className="hiw-info-title"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.22, delay: titleDelay, ease: settle }}
                      >
                        {card.title}
                      </motion.p>
                      <motion.p
                        className="hiw-info-desc"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.22, delay: descDelay, ease: settle }}
                      >
                        {card.description}
                      </motion.p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Container 4 — Scroll indicator */}
      <AnimatePresence mode="wait">
        {reduceMotion ? (
          <div key={`scroll-${stepKey}`} className="hiw-scroll-indicator">
            <span className="hiw-scroll-text">Scroll to continue</span>
            <span className="hiw-scroll-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 5v13" />
                <path d="M7 14l5 5 5-5" />
              </svg>
            </span>
          </div>
        ) : (
          <motion.div
            key={`scroll-${stepKey}`}
            className="hiw-scroll-indicator"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.35, ease: settle, delay: 0.04 }}
          >
            <span className="hiw-scroll-text">Scroll to continue</span>
            <span className="hiw-scroll-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 5v13" />
                <path d="M7 14l5 5 5-5" />
              </svg>
            </span>
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
      <WordReveal text={step.headline} active={visible} reduceMotion={reduceMotion} />
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
          reduceMotion={reduceMotion}
          imagePlateX={0}
          imagePlateY={0}
          infoPlateX={0}
          infoPlateY={0}
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
  const textPlateX = useTransform(scrollYProgress, [0, 1], [-2, 0]);
  const textPlateY = useTransform(scrollYProgress, [0, 1], [4, 0]);
  const imagePlateX = useTransform(scrollYProgress, [0, 1], [-2, 0]);
  const imagePlateY = useTransform(scrollYProgress, [0, 1], [5, 0]);
  const infoPlateX = useTransform(scrollYProgress, [0, 1], [-1, 0]);
  const infoPlateY = useTransform(scrollYProgress, [0, 1], [3, 0]);

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
                    <div className="hiw-copy-block hiw-text-layer">
                      <motion.div
                        className="hiw-paper-plate hiw-paper-plate--text"
                        aria-hidden="true"
                        style={{
                          x: reduceMotion ? 0 : textPlateX,
                          y: reduceMotion ? 0 : textPlateY,
                        }}
                      />
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step.id}
                          className="hiw-text-foreground"
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.4, ease: settle }}
                      >
                          <motion.p
                            className="hiw-step-label"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, delay: 0.05, ease: settle }}
                          >
                            {`STEP ${(step.id + 1).toString().padStart(2, "0")}`}
                          </motion.p>
                          <WordReveal
                            text={step.headline}
                            active
                            reduceMotion={reduceMotion}
                          />
                        <motion.p
                          className="hiw-step-body"
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, delay: 0.2, ease: settle }}
                        >
                          {step.body}
                        </motion.p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <StepVisual
                    stepIndex={activeStep}
                    reduceMotion={reduceMotion}
                      imagePlateX={imagePlateX}
                      imagePlateY={imagePlateY}
                      infoPlateX={infoPlateX}
                      infoPlateY={infoPlateY}
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
