import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ASK_TIDL_ANSWERS,
  ASK_TIDL_FALLBACK,
  ASK_TIDL_PLACEHOLDER_QS,
  ASK_TIDL_PROMPTS,
  ASK_TIDL_SECTION,
} from "@/lib/ask-tidl-content";

export type AskTidlSectionHandle = {
  focusInput: () => void;
};

type BotPhase = "hidden" | "up" | "down" | "done";

function AskTidlBot({
  reduce,
  play,
}: {
  reduce: boolean;
  play: boolean;
}) {
  const reactId = useId().replace(/:/g, "");
  const [phase, setPhase] = useState<BotPhase>("hidden");
  const [waving, setWaving] = useState(false);
  const playedRef = useRef(false);

  useEffect(() => {
    if (!play || playedRef.current) return;
    playedRef.current = true;

    if (reduce) {
      setPhase("up");
      setWaving(true);
      const hide = window.setTimeout(() => {
        setWaving(false);
        setPhase("down");
        window.setTimeout(() => setPhase("done"), 450);
      }, 2200);
      return () => window.clearTimeout(hide);
    }

    let upTimer: ReturnType<typeof setTimeout> | undefined;
    let waveOn: ReturnType<typeof setTimeout> | undefined;
    let waveOff: ReturnType<typeof setTimeout> | undefined;
    let downTimer: ReturnType<typeof setTimeout> | undefined;
    let doneTimer: ReturnType<typeof setTimeout> | undefined;

    // Rise from behind the panel
    upTimer = setTimeout(() => setPhase("up"), 80);
    waveOn = setTimeout(() => setWaving(true), 520);
    waveOff = setTimeout(() => setWaving(false), 2800);
    downTimer = setTimeout(() => setPhase("down"), 3200);
    doneTimer = setTimeout(() => setPhase("done"), 4200);

    return () => {
      if (upTimer) clearTimeout(upTimer);
      if (waveOn) clearTimeout(waveOn);
      if (waveOff) clearTimeout(waveOff);
      if (downTimer) clearTimeout(downTimer);
      if (doneTimer) clearTimeout(doneTimer);
    };
  }, [play, reduce]);

  const g = (name: string) => `ask-bot-${name}-${reactId}`;
  const showBubble = phase === "up";

  return (
    <div
      className={`ask-bot-wrap ask-bot-wrap--once is-${phase}${waving ? " is-waving" : ""}${
        reduce ? " is-static" : ""
      }`}
      id="askTidlBot"
      aria-hidden="true"
    >
      <div className={`ask-bot-bubble${showBubble ? " is-visible" : ""}`}>
        <p>{ASK_TIDL_SECTION.botGreeting}</p>
      </div>
      <svg viewBox="0 0 52 64" fill="none">
        <defs>
          <linearGradient id={g("head")} x1="10" y1="12" x2="42" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8A8174" />
            <stop offset="100%" stopColor="#5F574D" />
          </linearGradient>
          <linearGradient id={g("body")} x1="13" y1="36" x2="39" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFD950" />
            <stop offset="45%" stopColor="#F3C300" />
            <stop offset="100%" stopColor="#BE9800" />
          </linearGradient>
          <linearGradient id={g("arm")} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F3C300" />
            <stop offset="100%" stopColor="#BE9800" />
          </linearGradient>
          <radialGradient id={g("eye")} cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFF7CC" />
            <stop offset="55%" stopColor="#F3C300" />
            <stop offset="100%" stopColor="#BE9800" />
          </radialGradient>
          <radialGradient id={g("core")} cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#FFFDF6" />
            <stop offset="60%" stopColor="#F3C300" />
            <stop offset="100%" stopColor="#BE9800" />
          </radialGradient>
          <radialGradient id={g("tip")} cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#FFF7CC" />
            <stop offset="60%" stopColor="#F3C300" />
            <stop offset="100%" stopColor="#BE9800" />
          </radialGradient>
          <filter id={g("soft")} x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="1.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={g("drop")} x="-40%" y="-20%" width="180%" height="160%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.6" floodColor="#000000" floodOpacity="0.28" />
          </filter>
        </defs>

        <ellipse cx="26" cy="60" rx="15" ry="3" fill="#000000" opacity="0.12" />

        <g filter={`url(#${g("drop")})`}>
          <line x1="26" y1="4" x2="26" y2="12" stroke="#BE9800" strokeWidth="2" />
          <circle cx="26" cy="3.2" r="3.4" fill={`url(#${g("tip")})`} filter={`url(#${g("soft")})`} />

          <rect x="10" y="12" width="32" height="24" rx="9" fill={`url(#${g("head")})`} />
          <path
            d="M14 16c4-2 10-3 16-2"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          <rect x="13.5" y="19" width="25" height="11" rx="5.5" fill="#3F3932" opacity="0.92" />
          <circle cx="19.5" cy="24.5" r="3.6" fill={`url(#${g("eye")})`} filter={`url(#${g("soft")})`} />
          <circle cx="32.5" cy="24.5" r="3.6" fill={`url(#${g("eye")})`} filter={`url(#${g("soft")})`} />
          <circle cx="38.5" cy="30.5" r="1.4" fill="#F3C300" opacity="0.9" />

          <rect x="13" y="36" width="26" height="20" rx="8" fill={`url(#${g("body")})`} />
          <path
            d="M16 39c4-1.4 16-1.4 20 0"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="26" cy="46" r="3.6" fill={`url(#${g("core")})`} filter={`url(#${g("soft")})`} />

          <g className="ask-bot-arm ask-bot-arm--left">
            <rect x="8" y="39" width="7" height="14" rx="3.5" fill={`url(#${g("arm")})`} />
          </g>
          <g className="ask-bot-arm ask-bot-arm--right">
            <rect x="37" y="39" width="7" height="14" rx="3.5" fill={`url(#${g("arm")})`} />
          </g>
        </g>
      </svg>
    </div>
  );
}

export const AskTidlSection = forwardRef<AskTidlSectionHandle>(function AskTidlSection(_, ref) {
  const reduceMotion = useReducedMotion();
  const [askInput, setAskInput] = useState("");
  const [askFocused, setAskFocused] = useState(false);
  const [askPlaceholder, setAskPlaceholder] = useState("");
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [askThinking, setAskThinking] = useState(false);
  const [askDisplayed, setAskDisplayed] = useState("");
  const [inView, setInView] = useState(false);

  const askInputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const ansTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ansTyperRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useImperativeHandle(ref, () => ({
    focusInput: () => askInputRef.current?.focus(),
  }));

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setAskPlaceholder(ASK_TIDL_SECTION.placeholder);
      return;
    }

    let qi = 0;
    let ci = 0;
    let del = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    function type() {
      const q = ASK_TIDL_PLACEHOLDER_QS[qi];
      setAskPlaceholder(q.slice(0, ci));
      if (!del) {
        ci++;
        if (ci > q.length) {
          del = true;
          timeoutId = setTimeout(type, 1700);
          return;
        }
      } else {
        ci--;
        if (ci < 0) {
          del = false;
          ci = 0;
          qi = (qi + 1) % ASK_TIDL_PLACEHOLDER_QS.length;
        }
      }
      timeoutId = setTimeout(type, del ? 24 : 44);
    }

    timeoutId = setTimeout(type, 44);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    return () => {
      if (ansTimerRef.current) clearTimeout(ansTimerRef.current);
      if (ansTyperRef.current) clearInterval(ansTyperRef.current);
    };
  }, []);

  const handleAsk = useCallback((q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;

    setAskInput(trimmed);
    setActiveQuestion(trimmed);
    setAskThinking(true);
    setAskDisplayed("");

    if (ansTimerRef.current) clearTimeout(ansTimerRef.current);
    if (ansTyperRef.current) clearInterval(ansTyperRef.current);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const full = ASK_TIDL_ANSWERS[trimmed] || ASK_TIDL_FALLBACK;

    ansTimerRef.current = setTimeout(() => {
      setAskThinking(false);
      if (reduce) {
        setAskDisplayed(full);
        return;
      }

      let i = 0;
      ansTyperRef.current = setInterval(() => {
        i++;
        setAskDisplayed(full.slice(0, i));
        if (i >= full.length && ansTyperRef.current) clearInterval(ansTyperRef.current);
      }, 12);
    }, 520);
  }, []);

  const reveal = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 28 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
        },
      };

  return (
    <section
      ref={sectionRef}
      className={`ask-tidl-wrap ask-tidl-wrap--home${inView ? " ask-tidl-wrap--live" : ""}`}
      data-site-header-theme="light"
      id="askTidl"
    >
      <div className="ask-tidl">
        <motion.header
          className="ask-tidl-head"
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: reduceMotion ? 0 : 0.08 } },
          }}
        >
          <motion.h2 className="ask-h heading-01" variants={reveal}>
            {ASK_TIDL_SECTION.title}
          </motion.h2>
          <motion.p className="ask-sub" variants={reveal}>
            {ASK_TIDL_SECTION.subtitle}
          </motion.p>
        </motion.header>

        <motion.div
          className="ask-tidl-stage"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.65, delay: reduceMotion ? 0 : 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          <AskTidlBot reduce={!!reduceMotion} play={inView} />

          <div className="ask-panel">
            <div className="ask-panel-main">
              <div className={`ask-composer${askFocused ? " focus" : ""}${askInput.trim() ? " filled" : ""}`}>
                <input
                  ref={askInputRef}
                  className="ask-composer-input"
                  id="askIn"
                  type="text"
                  aria-label="Ask TIDL"
                  placeholder={askPlaceholder}
                  value={askInput}
                  onChange={(e) => setAskInput(e.target.value)}
                  onFocus={() => setAskFocused(true)}
                  onBlur={() => setAskFocused(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAsk(askInput);
                  }}
                />
                <button
                  type="button"
                  className="ask-composer-go"
                  aria-label="Submit question"
                  onClick={() => handleAsk(askInput)}
                >
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M5 12h12M13 7l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="ask-suggest" aria-label="Suggested questions">
                <div className="ask-suggest-list">
                  {ASK_TIDL_PROMPTS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      className={`ask-suggest-item${activeQuestion === q ? " active" : ""}`}
                      onClick={() => handleAsk(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              <div
                className={`ask-reply${activeQuestion ? " open" : ""}`}
                aria-live="polite"
                aria-hidden={!activeQuestion}
              >
                <div className={`ask-reply-progress${askThinking ? " on" : ""}`} aria-hidden="true" />
                <div className="ask-reply-body">
                  <span className="ask-reply-tag">{ASK_TIDL_SECTION.replyUs}</span>
                  <p className={`ask-reply-text${askDisplayed || askThinking ? " on" : ""}`}>
                    {askDisplayed}
                    {askThinking ? <span className="ask-cursor" aria-hidden="true" /> : null}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <p className="ask-note">{ASK_TIDL_SECTION.disclaimer}</p>
      </div>
    </section>
  );
});
