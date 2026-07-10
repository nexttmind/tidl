# Ask TIDL (AI Section) — Exact Handoff Pack

Use this pack to port or extend the homepage Ask TIDL section exactly as implemented.

## Stack / dependencies
- React 19 + TypeScript
- `framer-motion` (`motion`, `useReducedMotion`)
- CSS variables used: `--font-body`, `--font-display`, `--font-weight-heading`, `--letter-spacing-display`
- Global class `heading-01` may exist from site typography

## Files
1. `src/components/home/AskTidlSection.tsx` — section component
2. `src/lib/ask-tidl-content.ts` — copy + mock Q&A
3. Styles live in `src/components/home/home.css` (Ask TIDL block + mobile override)
4. Typography hook: `.ask-h`, `.ask-kicker` use display font in `src/styles/typography.css`

## Integration (HomePage)
```tsx
import { AskTidlSection, type AskTidlSectionHandle } from './AskTidlSection';
import './home.css';

const askTidlRef = useRef<AskTidlSectionHandle>(null);

const openAskTidl = useCallback(() => {
  const target = document.getElementById('askTidl');
  if (!target) return;
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.setTimeout(() => askTidlRef.current?.focusInput(), 420);
}, []);

// render:
<AskTidlSection ref={askTidlRef} />
```
- Section id: `#askTidl`
- Header theme attribute: `data-site-header-theme="light"`
- Nav search can call `openAskTidl()`

## Design notes (current state)
- White / cream section (not black terminal)
- Sharp square panel, gold corner marks, no AI spark icons
- Ambient motion: washes, rings, beams, orbs, nodes, SVG paths
- Composer + suggestion chips + typed reply panel
- Reduced-motion respected

## Typography snippet (from typography.css)
```css
.ask-h,
.ask-kicker {
  font-family: var(--font-display) !important;
  font-weight: var(--font-weight-heading);
  letter-spacing: var(--letter-spacing-display);
  text-transform: none;
}
```

---

## FILE 1 — `src/lib/ask-tidl-content.ts`

```ts
/** Homepage Ask TIDL section copy and mock Q&A. */

export const ASK_TIDL_SECTION = {
  kicker: "TIDL Intelligence",
  titleLine1: "Ask anything.",
  titleEmphasis: "Decide faster.",
  placeholder: "Ask about treatments, eligibility, deliveryâ€¦",
  statusLabel: "Live",
  disclaimer:
    "General information only. Your provider makes every medical decision.",
} as const;

export const ASK_TIDL_PROMPTS = [
  "What is the TIDL Pen?",
  "Am I a fit for GLP-1?",
  "How does TRT work?",
  "What are peptides?",
] as const;

export const ASK_TIDL_PLACEHOLDER_QS = [
  "What is the TIDL Pen?",
  "Am I a fit for GLP-1?",
  "How fast is delivery?",
  "What are peptides?",
  "Can I use HSA or FSA?",
] as const;

export const ASK_TIDL_ANSWERS: Record<string, string> = {
  "What is the TIDL Pen?":
    "The TIDL Pen is our pre-dosed GLP-1 treatment. The dose is already measured, so there's no mixing and no guesswork. Just click and go. It's prescribed by a licensed provider and shipped from a licensed US pharmacy.",
  "Am I a fit for GLP-1?":
    "That's exactly what the quiz is for. It takes about five minutes and doubles as your medical intake. A licensed provider reviews your answers and prescribes only if it's right for you.",
  "How does TRT work?":
    "TRT restores testosterone to a healthy range under a doctor's care, which can support energy, strength, drive, and focus. Your provider personalizes the dose and monitors your progress.",
  "What are peptides?":
    "Peptides are short chains of amino acids your body already uses as signals. Peptide therapy uses specific ones, prescribed by a provider, to support goals like recovery, longevity, and metabolic health.",
};

export const ASK_TIDL_FALLBACK =
  "We can walk you through treatments, delivery, and what the intake looks like. Take the quiz to get matched with a licensed provider.";

```

---

## FILE 2 — `src/components/home/AskTidlSection.tsx`

```tsx
import {
  forwardRef,
  useCallback,
  useEffect,
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

const ORBS = [
  { className: "ask-orb ask-orb--a", delay: 0 },
  { className: "ask-orb ask-orb--b", delay: 1.2 },
  { className: "ask-orb ask-orb--c", delay: 2.4 },
  { className: "ask-orb ask-orb--d", delay: 0.6 },
  { className: "ask-orb ask-orb--e", delay: 1.8 },
] as const;

const NODES = Array.from({ length: 14 }, (_, i) => i);

function AskAmbient({ reduce }: { reduce: boolean }) {
  return (
    <div className="ask-ambient" aria-hidden="true">
      <div className="ask-ambient-wash ask-ambient-wash--top" />
      <div className="ask-ambient-wash ask-ambient-wash--right" />
      <div className="ask-ambient-wash ask-ambient-wash--bottom" />
      <div className="ask-ambient-mesh" />
      <div className="ask-ambient-ring ask-ambient-ring--tl" />
      <div className="ask-ambient-ring ask-ambient-ring--br" />

      {!reduce ? (
        <>
          <div className="ask-ambient-beam ask-ambient-beam--top" />
          <div className="ask-ambient-beam ask-ambient-beam--right" />
          <div className="ask-ambient-rise" />
          {ORBS.map((orb) => (
            <span key={orb.className} className={orb.className} style={{ animationDelay: `${orb.delay}s` }} />
          ))}
          <div className="ask-ambient-nodes">
            {NODES.map((i) => (
              <span key={i} className={`ask-node ask-node--${i + 1}`} />
            ))}
          </div>
          <svg className="ask-ambient-paths" viewBox="0 0 1200 800" preserveAspectRatio="none">
            <path className="ask-path ask-path--1" d="M-40 180 C 220 40, 420 320, 640 210 S 980 40, 1240 160" />
            <path className="ask-path ask-path--2" d="M-40 420 C 180 520, 380 280, 620 390 S 940 560, 1240 430" />
            <path className="ask-path ask-path--3" d="M-40 640 C 260 560, 480 720, 720 610 S 1020 500, 1240 680" />
          </svg>
        </>
      ) : null}
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
    }, 720);
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
      className={`ask-tidl-wrap${inView ? " ask-tidl-wrap--live" : ""}`}
      data-site-header-theme="light"
      id="askTidl"
    >
      <AskAmbient reduce={!!reduceMotion} />

      <div className="ask-tidl">
        <motion.header
          className="ask-tidl-head"
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: reduceMotion ? 0 : 0.1 } },
          }}
        >
          <motion.p className="ask-kicker" variants={reveal}>
            <span className="ask-kicker-dot" aria-hidden="true" />
            {ASK_TIDL_SECTION.kicker}
          </motion.p>
          <motion.h2 className="ask-h heading-01" variants={reveal}>
            {ASK_TIDL_SECTION.titleLine1}
            <br />
            <em>{ASK_TIDL_SECTION.titleEmphasis}</em>
          </motion.h2>
        </motion.header>

        <motion.div
          className="ask-tidl-stage"
          initial={reduceMotion ? false : { opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.75, delay: reduceMotion ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="ask-panel">
            <span className="ask-panel-edge ask-panel-edge--tl" aria-hidden="true" />
            <span className="ask-panel-edge ask-panel-edge--tr" aria-hidden="true" />
            <span className="ask-panel-edge ask-panel-edge--bl" aria-hidden="true" />
            <span className="ask-panel-edge ask-panel-edge--br" aria-hidden="true" />
            <div className="ask-panel-sheen" aria-hidden="true" />
            <div className="ask-panel-scan" aria-hidden="true" />

            <div className="ask-panel-top">
              <div className="ask-panel-brand">
                <span className="ask-panel-brand-name">Ask TIDL</span>
                <span className="ask-panel-brand-rule" aria-hidden="true" />
                <span className="ask-panel-brand-meta">Clinical knowledge</span>
              </div>
              <div className="ask-panel-live" aria-live="polite">
                <span className="ask-panel-live-dot" aria-hidden="true" />
                {ASK_TIDL_SECTION.statusLabel}
              </div>
            </div>

            <div className="ask-panel-main">
              <div className={`ask-composer${askFocused ? " focus" : ""}${askInput.trim() ? " filled" : ""}`}>
                <input
                  ref={askInputRef}
                  className="ask-composer-input"
                  id="askIn"
                  type="text"
                  aria-label="Ask TIDL anything"
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
                  Ask
                </button>
              </div>

              <div className="ask-suggest" aria-label="Suggested questions">
                <span className="ask-suggest-label">Try</span>
                <div className="ask-suggest-list">
                  {ASK_TIDL_PROMPTS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      className={`ask-suggest-item${activeQuestion === q ? " active" : ""}`}
                      onClick={() => {
                        setAskInput(q);
                        handleAsk(q);
                      }}
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
                {activeQuestion ? (
                  <div className="ask-reply-q">
                    <span className="ask-reply-tag">You asked</span>
                    <p>{activeQuestion}</p>
                  </div>
                ) : null}
                <div className={`ask-reply-progress${askThinking ? " on" : ""}`} aria-hidden="true" />
                <div className="ask-reply-body">
                  <span className="ask-reply-tag">TIDL</span>
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

```

---

## FILE 3 — Ask TIDL CSS (from `home.css`)

```css
/* ===== Ask TIDL â€” white premium intelligence power section ===== */
.ask-tidl-wrap {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(ellipse 70% 48% at 50% -8%, rgba(243, 195, 0, 0.1) 0%, transparent 58%),
    radial-gradient(ellipse 42% 36% at 100% 28%, rgba(200, 164, 90, 0.08) 0%, transparent 62%),
    radial-gradient(ellipse 48% 40% at 0% 88%, rgba(243, 195, 0, 0.07) 0%, transparent 60%),
    linear-gradient(180deg, #ffffff 0%, #fbfaf7 48%, #ffffff 100%);
  scroll-margin-top: max(88px, env(safe-area-inset-top));
  --ask-gold: rgb(243, 195, 0);
  --ask-gold-soft: rgba(243, 195, 0, 0.16);
  --ask-ink: #171310;
  --ask-mut: rgba(23, 19, 16, 0.55);
  --ask-line: rgba(23, 19, 16, 0.08);
  --ask-line-strong: rgba(23, 19, 16, 0.14);
  --ask-surface: rgba(255, 255, 255, 0.82);
  --ask-sans: var(--font-body);
  --ask-mono: ui-monospace, "SF Mono", "Cascadia Code", "Segoe UI Mono", monospace;
}

.ask-ambient {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.ask-ambient-wash {
  position: absolute;
  filter: blur(48px);
  opacity: 0.55;
}

.ask-ambient-wash--top {
  top: -18%;
  left: 18%;
  width: 64%;
  height: 42%;
  background: radial-gradient(ellipse at center, rgba(243, 195, 0, 0.22) 0%, transparent 70%);
  animation: askWashDrift 14s ease-in-out infinite;
}

.ask-ambient-wash--right {
  top: 18%;
  right: -12%;
  width: 42%;
  height: 52%;
  background: radial-gradient(ellipse at center, rgba(200, 164, 90, 0.18) 0%, transparent 72%);
  animation: askWashDrift 18s ease-in-out infinite reverse;
}

.ask-ambient-wash--bottom {
  bottom: -16%;
  left: 8%;
  width: 56%;
  height: 40%;
  background: radial-gradient(ellipse at center, rgba(243, 195, 0, 0.14) 0%, transparent 70%);
  animation: askWashDrift 16s ease-in-out infinite;
}

.ask-ambient-mesh {
  position: absolute;
  inset: 0;
  opacity: 0.45;
  background-image:
    linear-gradient(rgba(23, 19, 16, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(23, 19, 16, 0.035) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(ellipse 72% 58% at 50% 42%, #000 18%, transparent 78%);
}

.ask-ambient-ring {
  position: absolute;
  border: 1px solid rgba(243, 195, 0, 0.18);
  border-radius: 50%;
  opacity: 0;
}

.ask-tidl-wrap--live .ask-ambient-ring {
  opacity: 1;
  animation: askRingPulse 7.5s ease-out infinite;
}

.ask-ambient-ring--tl {
  top: -12%;
  left: -8%;
  width: min(48vw, 520px);
  height: min(48vw, 520px);
}

.ask-ambient-ring--br {
  right: -10%;
  bottom: -14%;
  width: min(52vw, 580px);
  height: min(52vw, 580px);
  animation-delay: 2.4s;
}

.ask-ambient-beam {
  position: absolute;
  opacity: 0;
}

.ask-tidl-wrap--live .ask-ambient-beam {
  opacity: 1;
}

.ask-ambient-beam--top {
  top: 0;
  left: 50%;
  width: min(72vw, 760px);
  height: 1px;
  transform: translateX(-50%);
  background: linear-gradient(90deg, transparent, rgba(243, 195, 0, 0.55), transparent);
  box-shadow: 0 0 28px 2px rgba(243, 195, 0, 0.22);
  animation: askBeamBreathe 5.5s ease-in-out infinite;
}

.ask-ambient-beam--right {
  top: 12%;
  right: 0;
  width: 1px;
  height: 56%;
  background: linear-gradient(180deg, transparent, rgba(243, 195, 0, 0.42), transparent);
  box-shadow: 0 0 24px 2px rgba(243, 195, 0, 0.16);
  animation: askBeamBreathe 6.5s ease-in-out infinite 0.8s;
}

.ask-ambient-rise {
  position: absolute;
  inset: auto 0 -20% 0;
  height: 46%;
  background: linear-gradient(0deg, rgba(243, 195, 0, 0.07), transparent 70%);
  animation: askRise 9s ease-in-out infinite;
}

.ask-orb {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #fff7cc, var(--ask-gold) 55%, transparent 72%);
  box-shadow: 0 0 18px rgba(243, 195, 0, 0.45);
  opacity: 0;
  animation: askOrbFloat 11s ease-in-out infinite;
}

.ask-tidl-wrap--live .ask-orb {
  opacity: 0.85;
}

.ask-orb--a { top: 12%; left: 14%; animation-duration: 12s; }
.ask-orb--b { top: 22%; right: 16%; width: 6px; height: 6px; animation-duration: 14s; }
.ask-orb--c { bottom: 24%; left: 10%; width: 10px; height: 10px; animation-duration: 13s; }
.ask-orb--d { top: 48%; right: 8%; animation-duration: 15s; }
.ask-orb--e { bottom: 14%; right: 28%; width: 5px; height: 5px; animation-duration: 10s; }

.ask-ambient-nodes {
  position: absolute;
  inset: 0;
}

.ask-node {
  position: absolute;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(243, 195, 0, 0.55);
  box-shadow: 0 0 10px rgba(243, 195, 0, 0.35);
  animation: askNodeBlink 4.8s ease-in-out infinite;
}

.ask-node--1 { top: 10%; left: 22%; animation-delay: 0.2s; }
.ask-node--2 { top: 16%; left: 68%; animation-delay: 0.8s; }
.ask-node--3 { top: 28%; left: 8%; animation-delay: 1.4s; }
.ask-node--4 { top: 34%; right: 12%; animation-delay: 0.5s; }
.ask-node--5 { top: 46%; left: 18%; animation-delay: 1.1s; }
.ask-node--6 { top: 52%; right: 22%; animation-delay: 1.7s; }
.ask-node--7 { top: 62%; left: 42%; animation-delay: 0.3s; }
.ask-node--8 { top: 68%; right: 38%; animation-delay: 1.9s; }
.ask-node--9 { bottom: 22%; left: 14%; animation-delay: 0.9s; }
.ask-node--10 { bottom: 18%; right: 16%; animation-delay: 1.3s; }
.ask-node--11 { bottom: 30%; left: 56%; animation-delay: 0.6s; }
.ask-node--12 { top: 20%; left: 46%; animation-delay: 2.1s; }
.ask-node--13 { top: 74%; left: 28%; animation-delay: 1.5s; }
.ask-node--14 { top: 40%; left: 78%; animation-delay: 0.4s; }

.ask-ambient-paths {
  position: absolute;
  inset: 8% 0 12%;
  width: 100%;
  height: 80%;
  opacity: 0.35;
}

.ask-path {
  fill: none;
  stroke: rgba(243, 195, 0, 0.35);
  stroke-width: 1.1;
  stroke-dasharray: 8 14;
  animation: askPathFlow 18s linear infinite;
}

.ask-path--2 {
  stroke: rgba(200, 164, 90, 0.28);
  animation-duration: 22s;
  animation-direction: reverse;
}

.ask-path--3 {
  stroke: rgba(243, 195, 0, 0.22);
  animation-duration: 26s;
}

@keyframes askWashDrift {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(2%, 3%, 0) scale(1.06); }
}

@keyframes askRingPulse {
  0% { transform: scale(0.92); opacity: 0; }
  18% { opacity: 0.55; }
  70% { opacity: 0.12; }
  100% { transform: scale(1.12); opacity: 0; }
}

@keyframes askBeamBreathe {
  0%, 100% { opacity: 0.35; filter: blur(0); }
  50% { opacity: 0.9; filter: blur(0.4px); }
}

@keyframes askRise {
  0%, 100% { transform: translateY(8%); opacity: 0.45; }
  50% { transform: translateY(0); opacity: 0.85; }
}

@keyframes askOrbFloat {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(12px, -28px, 0); }
}

@keyframes askNodeBlink {
  0%, 100% { opacity: 0.2; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.25); }
}

@keyframes askPathFlow {
  to { stroke-dashoffset: -220; }
}

.ask-tidl {
  position: relative;
  z-index: 2;
  max-width: 1080px;
  margin: 0 auto;
  padding: clamp(96px, 11vw, 136px) max(24px, 4vw) clamp(84px, 9vw, 112px);
  font-family: var(--ask-sans);
}

.ask-tidl-head {
  text-align: center;
  max-width: 720px;
  margin: 0 auto clamp(48px, 5.5vw, 68px);
}

.ask-kicker {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 16px;
  font-family: var(--ask-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: rgba(138, 109, 40, 0.9);
}

.ask-kicker-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--ask-gold);
  box-shadow: 0 0 0 4px rgba(243, 195, 0, 0.16);
  animation: askNodeBlink 2.4s ease-in-out infinite;
}

.ask-h.heading-01 {
  margin: 0 0 18px;
  font-size: clamp(2.15rem, 5.2vw, 3.55rem);
  font-weight: 800;
  line-height: 1.02;
  letter-spacing: -0.038em;
  color: var(--ask-ink);
}

.ask-h.heading-01 em {
  font-style: normal;
  background: linear-gradient(120deg, #8a6d28 0%, var(--ask-gold) 45%, #c8a45a 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.ask-tidl-stage {
  display: grid;
  max-width: 920px;
  margin: 0 auto;
  width: 100%;
}

.ask-panel {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  border: 1.5px solid rgba(23, 19, 16, 0.14);
  border-radius: 0;
  background: #ffffff;
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.9) inset,
    0 40px 100px -56px rgba(23, 19, 16, 0.38);
}

.ask-panel::before {
  content: "";
  position: absolute;
  inset: 8px;
  z-index: 1;
  pointer-events: none;
  border: 1px solid rgba(23, 19, 16, 0.05);
}

.ask-panel-edge {
  position: absolute;
  width: 22px;
  height: 22px;
  z-index: 5;
  pointer-events: none;
}

.ask-panel-edge::before,
.ask-panel-edge::after {
  content: "";
  position: absolute;
  background: var(--ask-gold);
}

.ask-panel-edge--tl { top: -1px; left: -1px; }
.ask-panel-edge--tl::before { top: 0; left: 0; width: 22px; height: 2px; }
.ask-panel-edge--tl::after { top: 0; left: 0; width: 2px; height: 22px; }

.ask-panel-edge--tr { top: -1px; right: -1px; }
.ask-panel-edge--tr::before { top: 0; right: 0; width: 22px; height: 2px; }
.ask-panel-edge--tr::after { top: 0; right: 0; width: 2px; height: 22px; }

.ask-panel-edge--bl { bottom: -1px; left: -1px; }
.ask-panel-edge--bl::before { bottom: 0; left: 0; width: 22px; height: 2px; }
.ask-panel-edge--bl::after { bottom: 0; left: 0; width: 2px; height: 22px; }

.ask-panel-edge--br { bottom: -1px; right: -1px; }
.ask-panel-edge--br::before { bottom: 0; right: 0; width: 22px; height: 2px; }
.ask-panel-edge--br::after { bottom: 0; right: 0; width: 2px; height: 22px; }

.ask-panel-sheen {
  position: absolute;
  inset: 0 auto auto 0;
  width: 100%;
  height: 1px;
  z-index: 3;
  pointer-events: none;
  background: linear-gradient(90deg, transparent 4%, rgba(243, 195, 0, 0.55) 50%, transparent 96%);
}

.ask-panel-scan {
  position: absolute;
  left: 0;
  right: 0;
  top: -36%;
  height: 34%;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(180deg, transparent, rgba(243, 195, 0, 0.05), transparent);
  opacity: 0;
}

.ask-tidl-wrap--live .ask-panel-scan {
  animation: askScan 8s ease-in-out infinite;
}

@keyframes askScan {
  0% { transform: translateY(0); opacity: 0; }
  12% { opacity: 0.65; }
  55% { opacity: 0.2; }
  100% { transform: translateY(340%); opacity: 0; }
}

.ask-panel-top {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px clamp(22px, 3.2vw, 32px);
  border-bottom: 1.5px solid rgba(23, 19, 16, 0.08);
  background: linear-gradient(180deg, rgba(252, 250, 246, 0.9) 0%, rgba(255, 255, 255, 0.55) 100%);
}

.ask-panel-brand {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}

.ask-panel-brand-name {
  font-family: var(--ask-mono);
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--ask-ink);
}

.ask-panel-brand-rule {
  width: 28px;
  height: 1px;
  background: rgba(243, 195, 0, 0.7);
  flex: 0 0 auto;
}

.ask-panel-brand-meta {
  font-size: 0.82rem;
  letter-spacing: -0.01em;
  color: rgba(23, 19, 16, 0.42);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ask-panel-live {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1.5px solid rgba(23, 19, 16, 0.12);
  background: #fff;
  font-family: var(--ask-mono);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(23, 19, 16, 0.62);
}

.ask-panel-live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--ask-gold);
  box-shadow: 0 0 0 3px rgba(243, 195, 0, 0.18);
  animation: askNodeBlink 2s ease-in-out infinite;
}

.ask-panel-main {
  position: relative;
  z-index: 2;
  padding: clamp(26px, 3.6vw, 36px) clamp(22px, 3.2vw, 32px) clamp(26px, 3.4vw, 34px);
}

.ask-composer {
  display: flex;
  align-items: stretch;
  border: 1.5px solid rgba(23, 19, 16, 0.12);
  background: #fbfaf7;
  transition:
    border-color 0.25s ease,
    background 0.25s ease,
    box-shadow 0.25s ease;
}

.ask-composer.focus,
.ask-composer.filled {
  background: #ffffff;
  border-color: rgba(23, 19, 16, 0.2);
}

.ask-composer.focus {
  border-color: rgba(243, 195, 0, 0.75);
  box-shadow: 0 0 0 3px rgba(243, 195, 0, 0.1);
}

.ask-composer-input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  font-family: var(--ask-sans);
  font-size: clamp(1.08rem, 2.1vw, 1.32rem);
  letter-spacing: -0.025em;
  color: var(--ask-ink);
  padding: 20px 22px;
}

.ask-composer-input::placeholder {
  color: rgba(23, 19, 16, 0.3);
}

.ask-composer-go {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 108px;
  margin: 0;
  border: 0;
  border-left: 1.5px solid rgba(23, 19, 16, 0.1);
  padding: 0 28px;
  cursor: pointer;
  background: var(--ask-ink);
  color: #f7f3ec;
  font-family: var(--ask-mono);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transition:
    background 0.22s ease,
    color 0.22s ease;
}

.ask-composer-go:hover {
  background: var(--ask-gold);
  color: var(--ask-ink);
}

.ask-suggest {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-top: 22px;
  padding-top: 20px;
  border-top: 1px solid rgba(23, 19, 16, 0.08);
}

.ask-suggest-label {
  flex: 0 0 auto;
  margin-top: 10px;
  font-family: var(--ask-mono);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(23, 19, 16, 0.32);
}

.ask-suggest-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  min-width: 0;
}

.ask-suggest-item {
  position: relative;
  font-family: var(--ask-sans);
  font-size: 0.88rem;
  line-height: 1.3;
  letter-spacing: -0.015em;
  color: rgba(23, 19, 16, 0.62);
  background: transparent;
  border: 1.5px solid rgba(23, 19, 16, 0.1);
  border-radius: 0;
  padding: 10px 14px;
  cursor: pointer;
  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;
}

.ask-suggest-item:hover,
.ask-suggest-item.active {
  color: var(--ask-ink);
  border-color: rgba(23, 19, 16, 0.28);
  background: rgba(23, 19, 16, 0.03);
}

.ask-suggest-item.active {
  border-color: rgba(243, 195, 0, 0.65);
  background: rgba(243, 195, 0, 0.08);
}

.ask-reply {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition:
    max-height 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.35s ease,
    margin-top 0.35s ease;
  margin-top: 0;
}

.ask-reply.open {
  max-height: 480px;
  opacity: 1;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1.5px solid rgba(23, 19, 16, 0.08);
}

.ask-reply-tag {
  display: inline-block;
  margin-bottom: 8px;
  font-family: var(--ask-mono);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #8a6d28;
}

.ask-reply-q {
  margin-bottom: 18px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(23, 19, 16, 0.06);
}

.ask-reply-q p {
  margin: 0;
  font-size: 1.02rem;
  font-weight: 650;
  letter-spacing: -0.02em;
  color: var(--ask-ink);
}

.ask-reply-progress {
  height: 1.5px;
  margin-bottom: 16px;
  background: rgba(23, 19, 16, 0.06);
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.ask-reply-progress.on {
  opacity: 1;
}

.ask-reply-progress.on::after {
  content: "";
  display: block;
  width: 28%;
  height: 100%;
  background: linear-gradient(90deg, transparent, var(--ask-gold), transparent);
  animation: askThinkSweep 0.9s linear infinite;
}

@keyframes askThinkSweep {
  0% { transform: translateX(-120%); }
  100% { transform: translateX(420%); }
}

.ask-reply-body {
  padding: 0 0 0 16px;
  border-left: 2px solid var(--ask-gold);
}

.ask-reply-text {
  margin: 0;
  font-size: 1.02rem;
  line-height: 1.78;
  color: rgba(23, 19, 16, 0.84);
  display: none;
  white-space: pre-wrap;
}

.ask-reply-text.on {
  display: block;
}

.ask-cursor {
  display: inline-block;
  width: 2px;
  height: 1em;
  margin-left: 2px;
  vertical-align: text-bottom;
  background: var(--ask-gold);
  animation: askCursorBlink 0.9s step-end infinite;
}

@keyframes askCursorBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.ask-note {
  margin: clamp(24px, 3vw, 32px) auto 0;
  max-width: 58ch;
  text-align: center;
  font-family: var(--ask-mono);
  font-size: 0.64rem;
  line-height: 1.6;
  color: rgba(23, 19, 16, 0.34);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

@media (prefers-reduced-motion: reduce) {
  .ask-ambient-wash,
  .ask-ambient-ring,
  .ask-ambient-beam,
  .ask-ambient-rise,
  .ask-orb,
  .ask-node,
  .ask-path,
  .ask-panel-scan,
  .ask-kicker-dot,
  .ask-panel-live-dot,
  .ask-reply-progress.on::after,
  .ask-cursor {
    animation: none !important;
  }

  .ask-orb,
  .ask-ambient-beam,
  .ask-ambient-ring {
    opacity: 0.35;
  }
}

/* Mobile overrides (also in home.css) */
@media (max-width: 600px) {
  .ask-tidl {
    padding: 72px max(16px, env(safe-area-inset-left)) 64px max(16px, env(safe-area-inset-right));
  }

  .ask-h.heading-01 {
    font-size: clamp(1.85rem, 7.4vw, 2.35rem);
  }

  .ask-panel::before {
    inset: 6px;
  }

  .ask-panel-top {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 18px 18px;
  }

  .ask-panel-brand {
    flex-wrap: wrap;
    gap: 10px;
  }

  .ask-panel-brand-rule {
    display: none;
  }

  .ask-panel-brand-meta {
    width: 100%;
    white-space: normal;
  }

  .ask-panel-main {
    padding: 18px;
  }

  .ask-composer {
    flex-direction: column;
  }

  .ask-composer-input {
    font-size: 1.02rem;
    padding: 16px 16px;
  }

  .ask-composer-go {
    border-left: 0;
    border-top: 1.5px solid rgba(23, 19, 16, 0.1);
    min-height: 50px;
    min-width: 0;
    width: 100%;
    padding: 14px 16px;
  }

  .ask-suggest {
    flex-direction: column;
    gap: 10px;
  }

  .ask-suggest-label {
    margin-top: 0;
  }

  .ask-suggest-item {
    font-size: 0.82rem;
    padding: 9px 12px;
  }

  .ask-panel-edge {
    width: 16px;
    height: 16px;
  }

  .ask-panel-edge--tl::before,
  .ask-panel-edge--tr::before,
  .ask-panel-edge--bl::before,
  .ask-panel-edge--br::before {
    width: 16px;
  }

  .ask-panel-edge--tl::after,
  .ask-panel-edge--tr::after,
  .ask-panel-edge--bl::after,
  .ask-panel-edge--br::after {
    height: 16px;
  }

  .ask-ambient-paths,
  .ask-orb--d,
  .ask-orb--e {
    display: none;
  }
}
```
