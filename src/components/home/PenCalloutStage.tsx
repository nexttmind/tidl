import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, forwardRef } from "react";
import { Link } from "@tanstack/react-router";
import { SITE_IMAGES } from "@/lib/site-assets";

type PenFeature = {
  id: string;
  num: string;
  label: string;
  sub: string;
  side: "left" | "right";
  /** Pin position on the pen image (percent) */
  pin: { top: string; left: string };
};

const PEN_FEATURES: PenFeature[] = [
  {
    id: "slider",
    num: "01",
    label: "Precision dose slider",
    sub: "Your dose, set to your prescription. Nothing to calculate.",
    side: "left",
    pin: { top: "18%", left: "51%" },
  },
  {
    id: "scale",
    num: "02",
    label: "Graduated dose scale",
    sub: "Clear markings from 0.1 to 1.0\u2006ml. Zero guesswork.",
    side: "left",
    pin: { top: "30%", left: "63%" },
  },
  {
    id: "sealed",
    num: "03",
    label: "Sealed and dispensed to you",
    sub: "Labeled with your name by a licensed US pharmacy.",
    side: "right",
    pin: { top: "55%", left: "46%" },
  },
  {
    id: "ship",
    num: "04",
    label: "Cold-chain shipped",
    sub: "Temperature-safe, discreet packaging to your door.",
    side: "right",
    pin: { top: "82%", left: "35%" },
  },
];

type LeaderPath = {
  id: string;
  d: string;
};

function buildElbow(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  side: "left" | "right",
): string {
  const midX = side === "left" ? fromX + (toX - fromX) * 0.55 : fromX - (fromX - toX) * 0.55;
  return `M ${fromX} ${fromY} L ${midX} ${fromY} L ${toX} ${toY}`;
}

export const PenCalloutStage = forwardRef<
  HTMLDivElement,
  {
    visible: boolean;
    videoEmbedUrl?: string;
    onPlayVideo: () => void;
  }
>(function PenCalloutStage({ visible, videoEmbedUrl, onPlayVideo }, ref) {
  const diagramRef = useRef<HTMLDivElement>(null);
  const penFrameRef = useRef<HTMLDivElement>(null);
  const featRefs = useRef<Record<string, HTMLElement | null>>({});
  const pinRefs = useRef<Record<string, HTMLElement | null>>({});
  const [paths, setPaths] = useState<LeaderPath[]>([]);
  const [board, setBoard] = useState({ w: 0, h: 0 });
  const reactId = useId().replace(/:/g, "");

  const setDiagramRef = useCallback(
    (node: HTMLDivElement | null) => {
      diagramRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  const measure = useCallback(() => {
    const diagram = diagramRef.current;
    if (!diagram) return;

    const dRect = diagram.getBoundingClientRect();
    if (dRect.width < 8 || dRect.height < 8) return;

    setBoard({ w: dRect.width, h: dRect.height });

    const next: LeaderPath[] = [];

    for (const feat of PEN_FEATURES) {
      const featEl = featRefs.current[feat.id];
      const pinEl = pinRefs.current[feat.id];
      if (!featEl || !pinEl) continue;

      const f = featEl.getBoundingClientRect();
      const p = pinEl.getBoundingClientRect();

      const fromX = feat.side === "left" ? f.right - dRect.left : f.left - dRect.left;
      const fromY = f.top - dRect.top + Math.min(28, f.height * 0.28);
      const toX = p.left - dRect.left + p.width / 2;
      const toY = p.top - dRect.top + p.height / 2;

      next.push({
        id: feat.id,
        d: buildElbow(fromX, fromY, toX, toY, feat.side),
      });
    }

    setPaths(next);
  }, []);

  useLayoutEffect(() => {
    measure();
    if (!visible) return;
    const t1 = window.setTimeout(measure, 60);
    const t2 = window.setTimeout(measure, 420);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [measure, visible]);

  useEffect(() => {
    const diagram = diagramRef.current;
    if (!diagram) return;

    const ro = new ResizeObserver(() => measure());
    ro.observe(diagram);
    if (penFrameRef.current) ro.observe(penFrameRef.current);

    window.addEventListener("resize", measure);
    const fonts = document.fonts;
    fonts?.ready?.then(() => measure()).catch(() => undefined);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const left = PEN_FEATURES.filter((f) => f.side === "left");
  const right = PEN_FEATURES.filter((f) => f.side === "right");

  return (
    <div
      ref={setDiagramRef}
      className={`tdlp5-diagram${visible ? " tdlp5-on" : ""}`}
      id="tdlp5Grid"
    >
      <svg
        className="tdlp5-leaders"
        aria-hidden="true"
        viewBox={board.w > 0 ? `0 0 ${board.w} ${board.h}` : "0 0 1 1"}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`tdlp5-lead-grad-${reactId}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(243,195,0,0.15)" />
            <stop offset="55%" stopColor="rgba(243,195,0,0.75)" />
            <stop offset="100%" stopColor="rgba(243,195,0,0.95)" />
          </linearGradient>
        </defs>
        {paths.map((path, i) => (
          <path
            key={path.id}
            className="tdlp5-leader-path"
            d={path.d}
            vectorEffect="non-scaling-stroke"
            style={{ transitionDelay: `${0.12 + i * 0.08}s` }}
          />
        ))}
      </svg>

      <div className="tdlp5-col left">
        {left.map((feat, i) => (
          <article
            key={feat.id}
            className="tdlp5-feat"
            style={{ transitionDelay: visible ? `${0.1 + i * 0.12}s` : undefined }}
            ref={(el) => {
              featRefs.current[feat.id] = el;
            }}
          >
            <div className="tdlp5-fnum">{feat.num}</div>
            <div className="tdlp5-flab">{feat.label}</div>
            <div className="tdlp5-fsub">{feat.sub}</div>
          </article>
        ))}
      </div>

      <div className="tdlp5-center" id="tdlp5Stage">
        <div className="tdlp5-more tdlp5-more--stage">
          <Link to="/products/glp-1-weight-loss" className="tdlp5-more-wrap tdlp5-more-wrap--btn">
            <span className="tdlp5-more-link">More info</span>
            <span className="tdlp5-more-line" aria-hidden="true" />
          </Link>
        </div>

        <div className="tdlp5-shadow" />

        <div className="tdlp5-imgwrap" ref={penFrameRef}>
          <div className="tdlp5-pen-frame">
            <img className="tdlp5-img" src={SITE_IMAGES.pen} alt="The TIDL Pen" />
            {PEN_FEATURES.map((feat) => (
              <span
                key={feat.id}
                className={`tdlp5-pin tdlp5-pin--${feat.id}`}
                style={{ top: feat.pin.top, left: feat.pin.left }}
                ref={(el) => {
                  pinRefs.current[feat.id] = el;
                }}
                aria-hidden="true"
              />
            ))}
          </div>

          {videoEmbedUrl ? (
            <button
              type="button"
              className="tdlp5-play"
              aria-label="Play how to use the pen video"
              onClick={onPlayVideo}
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

      <div className="tdlp5-col right">
        {right.map((feat, i) => (
          <article
            key={feat.id}
            className="tdlp5-feat"
            style={{ transitionDelay: visible ? `${0.28 + i * 0.12}s` : undefined }}
            ref={(el) => {
              featRefs.current[feat.id] = el;
            }}
          >
            <div className="tdlp5-fnum">{feat.num}</div>
            <div className="tdlp5-flab">{feat.label}</div>
            <div className="tdlp5-fsub">{feat.sub}</div>
          </article>
        ))}
      </div>
    </div>
  );
});
