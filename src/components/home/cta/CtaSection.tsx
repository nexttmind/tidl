import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { animated, useSpring, useTrail } from "@react-spring/web";
import heroImage from "@/assets/tidl-hero.jpg";
import { ContourField } from "./ContourField";
import { DeliveryIcon, IntakeIcon, QuizIcon, ReviewIcon, SecureIcon } from "./icons";

const T = {
  headline: 0.35,
  body: 0.95,
  step1Icon: 1.1,
  step1Label: 1.5,
  line1: 1.6,
  step2Icon: 2.45,
  step2Label: 2.85,
  line2: 2.95,
  step3Icon: 3.8,
  step3Label: 4.2,
  shimmer: 4.55,
  cta: 4.45,
  trust: 4.75,
  image: 1.5,
  card: 2.95,
};

const settle = [0.22, 1, 0.36, 1] as const;

function Headline({ active }: { active: boolean }) {
  const words = "Your next chapter starts with one smart step.".split(" ");
  const trail = useTrail(words.length, {
    from: { opacity: 0, y: 22, blur: 10 },
    to: active ? { opacity: 1, y: 0, blur: 0 } : { opacity: 0, y: 22, blur: 10 },
    config: { mass: 1, tension: 210, friction: 22 },
    delay: T.headline * 1000,
  });

  return (
    <h2 className="text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[2.75rem] md:text-[3.2rem] lg:text-[3.4rem]">
      {trail.map((style, i) => (
        <animated.span
          key={i}
          className="inline-block will-change-transform"
          style={{
            opacity: style.opacity,
            transform: style.y.to((v) => `translateY(${v}px)`),
            filter: style.blur.to((v) => `blur(${v}px)`),
          }}
        >
          {words[i]}
          {i < words.length - 1 ? "\u00A0" : ""}
        </animated.span>
      ))}
    </h2>
  );
}

const PHRASES = [
  "Take the five-minute quiz.",
  "A licensed provider reviews your plan.",
  "Your treatment is prepared and shipped discreetly to your door.",
];

function BodyCopy({ active }: { active: boolean }) {
  return (
    <p className="max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
      {PHRASES.map((phrase, i) => (
        <motion.span
          key={phrase}
          className="inline"
          initial={{ opacity: 0, y: 8 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: T.body + i * 0.18, ease: settle }}
        >
          {phrase}{" "}
        </motion.span>
      ))}
    </p>
  );
}

function TimelineStep({
  active,
  iconDelay,
  labelDelay,
  number,
  label,
  children,
}: {
  active: boolean;
  iconDelay: number;
  labelDelay: number;
  number: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <motion.span
          className="absolute inset-0 rounded-full border border-gold"
          initial={{ opacity: 0, scale: 1 }}
          animate={active ? { opacity: [0, 0.45, 0], scale: [1, 1.9, 2.1] } : {}}
          transition={{ duration: 0.9, delay: iconDelay + 0.35, ease: "easeOut" }}
        />
        <motion.div
          className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/60 bg-card text-gold-deep will-change-transform"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={active ? { opacity: 1, scale: [0.6, 1.22, 1] } : {}}
          transition={{
            opacity: { duration: 0.2, delay: iconDelay },
            scale: { duration: 0.45, delay: iconDelay, times: [0, 0.6, 1], ease: "easeOut" },
          }}
        >
          <div className="h-8 w-8">{children}</div>
        </motion.div>
      </div>
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={active ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: labelDelay, ease: settle }}
      >
        <div className="text-xl font-bold text-gold-deep">{number}</div>
        <div className="mt-0.5 text-sm text-ink-soft">{label}</div>
      </motion.div>
    </div>
  );
}

function ConnectingLine({ active, delay }: { active: boolean; delay: number }) {
  return (
    <div className="relative mt-8 h-px flex-1 self-start overflow-hidden">
      <motion.div
        className="absolute inset-0 origin-left bg-gold will-change-transform"
        initial={{ scaleX: 0 }}
        animate={active ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.div
        className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-transparent via-gold-bright/95 to-transparent"
        initial={{ x: "-120%", opacity: 0 }}
        animate={active ? { x: ["-120%", "240%"], opacity: [0, 0.95, 0] } : {}}
        transition={{
          duration: 1.8,
          delay: delay + 0.85,
          ease: "linear",
          repeat: Infinity,
          repeatDelay: 0.35,
        }}
      />
    </div>
  );
}

const CARD_ROWS = [
  { icon: IntakeIcon, title: "5 min intake", sub: "Quick, private and easy." },
  { icon: ReviewIcon, title: "Licensed providers", sub: "Reviewed by medical experts." },
  { icon: DeliveryIcon, title: "Discreet shipping", sub: "Delivered to your door." },
];

function InfoCard({ active }: { active: boolean }) {
  const spring = useSpring({
    from: { opacity: 0, y: 40, scale: 0.96 },
    to: active ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.96 },
    config: { mass: 1.2, tension: 170, friction: 22 },
    delay: T.card * 1000,
  });

  return (
    <animated.div
      className="absolute right-2 top-full w-56 -translate-y-4 rounded-2xl border border-ink/[0.08] bg-card p-4 will-change-transform sm:right-4 sm:w-64 sm:p-5 lg:-right-10 lg:top-1/2 lg:-translate-y-1/2"
      style={{
        boxShadow: "var(--shadow-card)",
        opacity: spring.opacity,
        transform: spring.y.to((y) => `translateY(calc(-1rem + ${y}px)) scale(${spring.scale.get()})`),
      }}
    >
      <div className="flex flex-col gap-5">
        {CARD_ROWS.map((row, i) => (
          <motion.div
            key={row.title}
            className="flex items-start gap-3.5 rounded-lg transition-colors duration-300 hover:bg-secondary"
            initial={{ opacity: 0, y: 12 }}
            animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: T.card + 0.25 + i * 0.08, ease: settle }}
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold-deep">
              <row.icon className="h-6 w-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-ink">{row.title}</div>
              <div className="mt-0.5 text-[13px] leading-snug text-ink-soft">{row.sub}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </animated.div>
  );
}

export function CtaSection({ onGetStarted }: { onGetStarted?: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  // Native IO is more reliable with Lenis smooth scroll than framer useInView.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setActive(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      {
        threshold: [0.15, 0.25, 0.35],
        rootMargin: "0px 0px -12% 0px",
      },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} id="cta-section" className="relative overflow-hidden bg-background">
      <div className="mx-auto grid min-h-[85vh] max-w-7xl grid-cols-1 items-center gap-12 px-5 py-16 sm:gap-16 sm:px-8 sm:py-24 lg:grid-cols-[1.05fr_1fr] lg:px-12">
        <div className="order-2 flex max-w-xl flex-col gap-6 sm:gap-8 lg:order-1">
          <Headline active={active} />
          <BodyCopy active={active} />

          <div className="mt-2 flex items-start gap-1.5 sm:gap-2">
            <TimelineStep active={active} iconDelay={T.step1Icon} labelDelay={T.step1Label} number="01" label="Quiz (5 min)">
              <QuizIcon className="h-full w-full" />
            </TimelineStep>
            <ConnectingLine active={active} delay={T.line1} />
            <TimelineStep active={active} iconDelay={T.step2Icon} labelDelay={T.step2Label} number="02" label="Licensed Review">
              <ReviewIcon className="h-full w-full" />
            </TimelineStep>
            <ConnectingLine active={active} delay={T.line2} />
            <TimelineStep active={active} iconDelay={T.step3Icon} labelDelay={T.step3Label} number="03" label="Discreet Delivery">
              <DeliveryIcon className="h-full w-full" />
            </TimelineStep>
          </div>

          <div className="pointer-events-none relative -mt-8 h-0 overflow-visible">
            <motion.div
              className="absolute -top-24 h-24 w-20 bg-gradient-to-r from-transparent via-gold-bright/15 to-transparent will-change-transform"
              initial={{ x: -80, opacity: 0 }}
              animate={active ? { x: 560, opacity: [0, 1, 1, 0] } : {}}
              transition={{ duration: 1.1, delay: T.shimmer, ease: "easeInOut" }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={active ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: T.cta, ease: settle }}
          >
            <button
              type="button"
              onClick={onGetStarted}
              className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gold px-6 py-3.5 text-base font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-bright hover:shadow-[0_10px_24px_-8px_rgba(243,195,0,0.5)] sm:w-auto sm:gap-4 sm:px-10 sm:py-4 sm:text-lg"
            >
              Get Started
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M4 12h15M13 6l6 6-6 6" />
              </svg>
            </button>
          </motion.div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-ink-soft sm:gap-8 sm:text-sm">
            {["Secure intake", "Licensed medical team", "Private delivery"].map((item, i) => (
              <motion.span
                key={item}
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={active ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: T.trust + i * 0.12 }}
              >
                <SecureIcon className="h-4 w-4 text-gold-deep" />
                {item}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="relative order-1 mx-auto w-full max-w-md pb-32 sm:pb-40 lg:order-2 lg:mx-0 lg:pb-0">
          <ContourField active={active} />
          <motion.div
            className="relative will-change-transform"
            initial={{ opacity: 0, x: 100, scale: 0.96, rotate: 1.5 }}
            animate={active ? { opacity: 1, x: 0, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 1.2, delay: T.image, ease: settle }}
          >
            <motion.div
              animate={active ? { y: [0, -6, 0] } : {}}
              transition={{ duration: 9, delay: T.image + 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={heroImage}
                alt="Man in athletic wear at golden hour, looking ahead with confidence"
                width={960}
                height={1280}
                className="aspect-[3/4] w-full max-w-md rounded-[1.5rem] object-cover sm:rounded-[2rem]"
                style={{ boxShadow: "var(--shadow-image)" }}
              />
            </motion.div>
            <InfoCard active={active} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
