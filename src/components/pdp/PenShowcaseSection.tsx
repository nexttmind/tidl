import { useEffect, useRef, useState } from "react";
import { usePdpData } from "./PdpDataProvider";

export function PenShowcaseSection() {
  const { penImage, penShowcase } = usePdpData();

  const [penVisible, setPenVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [counters, setCounters] = useState<[number, number, number, number]>([0, 0, 0, 0]);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const penGridRef = useRef<HTMLDivElement>(null);
  const penStatsRef = useRef<HTMLDivElement>(null);
  const penStageRef = useRef<HTMLDivElement>(null);
  const penFloatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!penShowcase) return;
    const gridEl = penGridRef.current;
    const statsEl = penStatsRef.current;
    if (!gridEl || !statsEl) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPenVisible(true);
      setStatsVisible(true);
      setCounters(penShowcase.stats.map((stat) => stat.target) as [number, number, number, number]);
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
  }, [penShowcase]);

  useEffect(() => {
    if (!penShowcase || !statsVisible) return;
    const targets = penShowcase.stats.map((stat) => stat.target);
    const dur = 1100;
    const t0 = performance.now();
    let rafId: number;

    function step(now: number) {
      const k = Math.min(1, (now - t0) / dur);
      const ease = 1 - Math.pow(1 - k, 3);
      setCounters(
        targets.map((target) => Math.round(target * ease)) as [number, number, number, number],
      );
      if (k < 1) rafId = requestAnimationFrame(step);
    }

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [penShowcase, statsVisible]);

  useEffect(() => {
    const float = penFloatRef.current;
    const stage = penStageRef.current;
    if (!float || !stage || !penShowcase) return;

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
  }, [penShowcase]);

  useEffect(() => {
    if (!isVideoOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsVideoOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isVideoOpen]);

  if (!penShowcase) return null;

  const showVideo = Boolean(penShowcase.videoEmbedUrl);

  return (
    <>
      <section className="tdlp5-sec" id="how-pen-works" data-pdp-header-theme="dark">
        <div className="tdlp5-head">
          <div className="tdlp5-kick">{penShowcase.kicker}</div>
          <h2 className="tdlp5-h2">
            {penShowcase.headlineLine1}
            <br />
            <em>{penShowcase.headlineEmphasis}</em>
          </h2>
        </div>

        <div className={`tdlp5-grid${penVisible ? " tdlp5-on" : ""}`} ref={penGridRef}>
          <div className="tdlp5-col left">
            {penShowcase.leftFeatures.map((feature) => (
              <div className="tdlp5-feat" key={feature.num}>
                <div className="tdlp5-fnum">{feature.num}</div>
                <div className="tdlp5-flab">{feature.label}</div>
                <div className="tdlp5-fsub">{feature.sub}</div>
              </div>
            ))}
          </div>

          <div className="tdlp5-center" ref={penStageRef}>
            <div className="tdlp5-blade" />
            <div className="tdlp5-blade core" />
            <div className="tdlp5-aura" />
            <div className="tdlp5-shadow" />
            <div className="tdlp5-imgwrap" ref={penFloatRef}>
              <div className="tdlp5-levit">
                <img className="tdlp5-img" src={penImage} alt={penShowcase.penAlt} />
                {showVideo ? (
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
                ) : null}
              </div>
            </div>
          </div>

          <div className="tdlp5-col right">
            {penShowcase.rightFeatures.map((feature) => (
              <div className="tdlp5-feat" key={feature.num}>
                <div className="tdlp5-fnum">{feature.num}</div>
                <div className="tdlp5-flab">{feature.label}</div>
                <div className="tdlp5-fsub">{feature.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={`tdlp5-stats${statsVisible ? " tdlp5-on" : ""}`} ref={penStatsRef}>
          {penShowcase.stats.map((stat, index) => (
            <div className="tdlp5-stat" key={stat.tag}>
              <div className="tdlp5-snum">
                <span>{counters[index]}</span>
                {stat.suffix ? <em>{stat.suffix}</em> : null}
              </div>
              <div className="tdlp5-stag">{stat.tag}</div>
              <div className="tdlp5-ssub">{stat.sub}</div>
            </div>
          ))}
        </div>

        <div className="tdlp5-grain" />
      </section>

      {isVideoOpen && penShowcase.videoEmbedUrl ? (
        <div
          className="tdlp5-video-modal"
          role="dialog"
          aria-modal="true"
          aria-label={penShowcase.videoTitle ?? "How to use the TIDL Pen video"}
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
              src={penShowcase.videoEmbedUrl}
              title={penShowcase.videoTitle ?? "How to use the TIDL Pen"}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
