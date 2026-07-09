import {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { TESTIMONIALS } from "@/lib/testimonials";

/* ─── auto-play interval in ms ─── */
const INTERVAL = 4500;

function StarRating() {
  return (
    <div className="tst-stars" aria-label="5 out of 5 stars">
      {[...Array(5)].map((_, i) => (
        <svg key={i} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M8 1.5l1.75 3.54 3.9.57-2.82 2.75.67 3.88L8 10.35l-3.5 1.84.67-3.88L2.35 5.6l3.9-.57L8 1.5Z" />
        </svg>
      ))}
    </div>
  );
}

function QuoteMarkIcon() {
  return (
    <svg className="tst-card-quotemark" viewBox="0 0 40 30" fill="none" aria-hidden="true">
      <path
        d="M0 30V18C0 8.04 5.32 1.92 15.96 0l1.68 3C12.56 4.56 9.72 7.8 9 13H15V30H0ZM22 30V18C22 8.04 27.32 1.92 37.96 0l1.68 3C34.56 4.56 31.72 7.8 31 13H37V30H22Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* animated ring on active dot ─── SVG */
function ProgressRing({ progress }: { progress: number }) {
  const r = 10;
  const circ = 2 * Math.PI * r;
  return (
    <svg
      className="tst-dot-ring"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        cx="12" cy="12" r={r}
        fill="none"
        stroke="rgba(243,195,0,0.22)"
        strokeWidth="2"
      />
      <circle
        cx="12" cy="12" r={r}
        fill="none"
        stroke="rgb(243,195,0)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={circ - circ * progress}
        style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
      />
    </svg>
  );
}

/* ─── data ─── */
const ALL_STORIES = [
  ...TESTIMONIALS,
  {
    name: "Marcus T.",
    quote:
      "The pen made this feel manageable from day one. No mixing, no confusion — just my dose, ready to go. I've lost weight steadily without feeling like I'm running a science experiment.",
    condition: "GLP-1 Weight Loss",
    result: "−12 lbs",
    role: "Verified Patient",
    contextImage: TESTIMONIALS[1].contextImage,
  },
  {
    name: "Elena V.",
    quote:
      "What I appreciated most was how medical it felt without being clinical. A real provider reviewed my intake, the pharmacy shipped discreetly, and messaging the care team actually gets a response.",
    condition: "GLP-1 Care",
    result: "4 months in",
    role: "Verified Patient",
    contextImage: TESTIMONIALS[2].contextImage,
  },
];
const TOTAL = ALL_STORIES.length;

export function StoriesSection() {
  const trackRef   = useRef<HTMLDivElement>(null);
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef   = useRef<number>(Date.now());
  const pausedRef  = useRef(false);

  const [activeIdx, setActiveIdx]   = useState(0);
  const [progress, setProgress]     = useState(0);   // 0–1 ring fill
  const [entering, setEntering]     = useState(false); // triggers text anim

  /* ─── scroll track to index ─── */
  const scrollToIdx = useCallback((idx: number) => {
    const clamped = ((idx % TOTAL) + TOTAL) % TOTAL;
    setActiveIdx(clamped);
    setEntering(true);
    setTimeout(() => setEntering(false), 60);

    const track = trackRef.current;
    if (!track) return;
    const card = track.children[clamped] as HTMLElement;
    if (card) {
      track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
    }
  }, []);

  /* ─── auto-play timer ─── */
  const restartTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    startRef.current = Date.now();
    setProgress(0);

    timerRef.current = setInterval(() => {
      if (pausedRef.current) return;
      const elapsed = Date.now() - startRef.current;
      const p = Math.min(elapsed / INTERVAL, 1);
      setProgress(p);
      if (p >= 1) {
        setActiveIdx(prev => {
          const next = (prev + 1) % TOTAL;
          // scroll without resetting timer inside state setter
          requestAnimationFrame(() => {
            const track = trackRef.current;
            if (!track) return;
            const card = track.children[next] as HTMLElement;
            if (card) track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
          });
          return next;
        });
        setEntering(true);
        setTimeout(() => setEntering(false), 60);
        startRef.current = Date.now();
        setProgress(0);
      }
    }, 30);
  }, []);

  useEffect(() => {
    restartTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [restartTimer]);

  /* ─── pause on hover ─── */
  const handleMouseEnter = () => { pausedRef.current = true; };
  const handleMouseLeave = () => {
    pausedRef.current = false;
    startRef.current = Date.now() - progress * INTERVAL; // resume from where we left off
  };

  /* ─── manual nav: restart timer ─── */
  const handleNav = (idx: number) => {
    scrollToIdx(idx);
    restartTimer();
  };

  /* ─── detect scroll from touch ─── */
  const handleTrackScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = (track.children[0] as HTMLElement)?.offsetWidth ?? 1;
    const idx = Math.round(track.scrollLeft / (cardWidth + 24));
    const clamped = Math.max(0, Math.min(TOTAL - 1, idx));
    if (clamped !== activeIdx) {
      setActiveIdx(clamped);
      restartTimer();
    }
  };

  return (
    <section
      className="tst-sec"
      id="stories"
      data-site-header-theme="light"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="tst-inner">

        {/* ── Animated header ── */}
        <div className="tst-head">
          <div className="tst-eyebrow">Patient stories</div>
          <h2 className="tst-title">
            Real patients.<br />Measurable results.
          </h2>
          <p className="tst-lead">
            Thousands of patients, one licensed care team. Here's what they're saying.
          </p>
        </div>

        {/* ── Social proof bar ── */}
        <div className="tst-proof-bar">
          <div className="tst-proof-item">
            <span className="tst-proof-val">4.9</span>
            <span className="tst-proof-label">Average rating</span>
            <StarRating />
          </div>
          <div className="tst-proof-divider" aria-hidden="true" />
          <div className="tst-proof-item">
            <span className="tst-proof-val">2,400+</span>
            <span className="tst-proof-label">Verified patients</span>
          </div>
          <div className="tst-proof-divider" aria-hidden="true" />
          <div className="tst-proof-item">
            <span className="tst-proof-val">92%</span>
            <span className="tst-proof-label">See results in 90 days</span>
          </div>
        </div>

        {/* ── Carousel ── */}
        <div className="tst-carousel-wrap">
          <div
            className="tst-track"
            ref={trackRef}
            onScroll={handleTrackScroll}
          >
            {ALL_STORIES.map((story, index) => {
              const isActive = index === activeIdx;
              return (
                <article
                  className={`tst-card${isActive ? " tst-card--active" : ""}`}
                  key={`${story.name}-${index}`}
                  onClick={() => handleNav(index)}
                >
                  {/* Photo */}
                  <div className="tst-card-photo-wrap">
                    <img
                      src={story.contextImage}
                      alt=""
                      className="tst-card-photo"
                      loading="lazy"
                    />
                    <div className="tst-card-badge">{story.result}</div>
                    {/* shimmer overlay on active */}
                    {isActive && <div className="tst-card-shimmer" aria-hidden="true" />}
                  </div>

                  {/* Body */}
                  <div className={`tst-card-body${isActive ? " tst-card-body--active" : ""}`}>
                    <QuoteMarkIcon />
                    <StarRating />
                    <blockquote
                      className={`tst-card-quote${isActive && entering ? " tst-text-enter" : ""}`}
                    >
                      {story.quote}
                    </blockquote>
                    <footer className="tst-card-footer">
                      <div className="tst-card-author">
                        <strong>{story.name}</strong>
                        <span>{story.condition}</span>
                      </div>
                      <div className="tst-card-verified">
                        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.35" />
                          <path
                            d="M5 8.5l2 2 4-4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Verified patient
                      </div>
                    </footer>
                  </div>
                </article>
              );
            })}
          </div>

          {/* ── Nav: arrows + progress dots ── */}
          <div className="tst-nav">
            <button
              className="tst-arrow"
              aria-label="Previous testimonial"
              onClick={() => handleNav(activeIdx - 1)}
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 12L6 8l4-4" />
              </svg>
            </button>

            <div className="tst-dots" role="tablist">
              {ALL_STORIES.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === activeIdx}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`tst-dot${i === activeIdx ? " tst-dot--active" : ""}`}
                  onClick={() => handleNav(i)}
                >
                  {i === activeIdx && <ProgressRing progress={progress} />}
                </button>
              ))}
            </div>

            <button
              className="tst-arrow"
              aria-label="Next testimonial"
              onClick={() => handleNav(activeIdx + 1)}
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 4l4 4-4 4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
