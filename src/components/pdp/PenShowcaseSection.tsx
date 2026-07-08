import { useEffect, useRef, useState } from "react";
import { PEN_IMAGE } from "./data/glp1-pdp-data";

export function PenShowcaseSection() {
  const [penVisible, setPenVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [counters, setCounters] = useState({ c0: 0, c1: 0, c2: 0, c3: 0 });
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const penGridRef = useRef<HTMLDivElement>(null);
  const penStatsRef = useRef<HTMLDivElement>(null);
  const penStageRef = useRef<HTMLDivElement>(null);
  const penFloatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gridEl = penGridRef.current;
    const statsEl = penStatsRef.current;
    if (!gridEl || !statsEl) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPenVisible(true);
      setStatsVisible(true);
      setCounters({ c0: 100, c1: 0, c2: 5, c3: 1 });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (entry.target === gridEl) setPenVisible(true);
          if (entry.target === statsEl) setStatsVisible(true);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.25 },
    );

    io.observe(gridEl);
    io.observe(statsEl);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!statsVisible) return;
    const targets = [100, 0, 5, 1];
    const dur = 1100;
    const t0 = performance.now();
    let rafId: number;

    function step(now: number) {
      const k = Math.min(1, (now - t0) / dur);
      const ease = 1 - Math.pow(1 - k, 3);
      setCounters({
        c0: Math.round(targets[0] * ease),
        c1: 0,
        c2: Math.round(targets[2] * ease),
        c3: Math.round(targets[3] * ease),
      });
      if (k < 1) rafId = requestAnimationFrame(step);
    }

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [statsVisible]);

  useEffect(() => {
    const float = penFloatRef.current;
    const stage = penStageRef.current;
    if (!float || !stage) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const r = stage.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / (vh / 2)));
        float.style.transform = `translateY(${p * -18}px)`;
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isVideoOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsVideoOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isVideoOpen]);

  return (
    <>
      <section className="tdlp5-sec" id="how-pen-works">
        <div className="tdlp5-head">
          <div className="tdlp5-kick">The TIDL Pen</div>
          <h2 className="tdlp5-h2">
            GLP-1, pre-dosed.
            <br />
            <em>Just click.</em>
          </h2>
        </div>

        <div className={`tdlp5-grid${penVisible ? " tdlp5-on" : ""}`} ref={penGridRef}>
          <div className="tdlp5-col left">
            <div className="tdlp5-feat">
              <div className="tdlp5-fnum">01</div>
              <div className="tdlp5-flab">Precision dose slider</div>
              <div className="tdlp5-fsub">Your dose, set to your prescription. Nothing to calculate.</div>
            </div>
            <div className="tdlp5-feat">
              <div className="tdlp5-fnum">02</div>
              <div className="tdlp5-flab">Graduated dose scale</div>
              <div className="tdlp5-fsub">Clear markings from 0.1 to 1.0{"\u2006"}ml. Zero guesswork.</div>
            </div>
          </div>

          <div className="tdlp5-center" ref={penStageRef}>
            <div className="tdlp5-blade" />
            <div className="tdlp5-blade core" />
            <div className="tdlp5-aura" />
            <div className="tdlp5-shadow" />
            <div className="tdlp5-imgwrap" ref={penFloatRef}>
              <div className="tdlp5-levit">
                <img className="tdlp5-img" src={PEN_IMAGE} alt="The TIDL Pen" />
                <button
                  type="button"
                  className="tdlp5-play"
                  aria-label="Play how to use the pen video"
                  onClick={() => setIsVideoOpen(true)}
                >
                  <span className="tdlp5-play-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8.5 6.8a1 1 0 0 1 1.5-.86l8.2 5.2a1 1 0 0 1 0 1.72l-8.2 5.2A1 1 0 0 1 8.5 17.2V6.8Z" />
                    </svg>
                  </span>
                  <span className="tdlp5-play-label">See how to use the pen</span>
                </button>
              </div>
            </div>
          </div>

          <div className="tdlp5-col right">
            <div className="tdlp5-feat">
              <div className="tdlp5-fnum">03</div>
              <div className="tdlp5-flab">Sealed and dispensed to you</div>
              <div className="tdlp5-fsub">Labeled with your name by a licensed US pharmacy.</div>
            </div>
            <div className="tdlp5-feat">
              <div className="tdlp5-fnum">04</div>
              <div className="tdlp5-flab">Cold-chain shipped</div>
              <div className="tdlp5-fsub">Temperature-safe, discreet packaging to your door.</div>
            </div>
          </div>
        </div>

        <div className={`tdlp5-stats${statsVisible ? " tdlp5-on" : ""}`} ref={penStatsRef}>
          <div className="tdlp5-stat">
            <div className="tdlp5-snum">
              <span>{counters.c0}</span>
              <em>%</em>
            </div>
            <div className="tdlp5-stag">Doctor reviewed</div>
            <div className="tdlp5-ssub">Every intake read and prescribed by a licensed provider.</div>
          </div>
          <div className="tdlp5-stat">
            <div className="tdlp5-snum">
              <span>{counters.c1}</span>
            </div>
            <div className="tdlp5-stag">Vials or syringes</div>
            <div className="tdlp5-ssub">The pen replaces the kit. No mixing, nothing to assemble.</div>
          </div>
          <div className="tdlp5-stat">
            <div className="tdlp5-snum">
              <span>{counters.c2}</span>
              <em>min</em>
            </div>
            <div className="tdlp5-stag">Quiz to intake</div>
            <div className="tdlp5-ssub">One short quiz doubles as your full medical intake.</div>
          </div>
          <div className="tdlp5-stat">
            <div className="tdlp5-snum">
              <span>{counters.c3}</span>
              <em>click</em>
            </div>
            <div className="tdlp5-stag">That's the routine</div>
            <div className="tdlp5-ssub">Pre-dosed and ready. Click, done, back to your day.</div>
          </div>
        </div>

        <div className="tdlp5-grain" />
      </section>

      {isVideoOpen && (
        <div
          className="tdlp5-video-modal"
          role="dialog"
          aria-modal="true"
          aria-label="How to use the TIDL Pen video"
          onClick={() => setIsVideoOpen(false)}
        >
          <div className="tdlp5-video-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="tdlp5-video-close"
              aria-label="Close video"
              onClick={() => setIsVideoOpen(false)}
            >
              ×
            </button>
            <iframe
              src="https://www.youtube.com/embed/q-ktd4nEi3w?autoplay=1&rel=0"
              title="How to use the TIDL Pen"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
