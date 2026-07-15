import { useCallback, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
  className?: string;
  showLabels?: boolean;
  showHint?: boolean;
};

/**
 * Draggable “zipper” before/after comparison.
 * Drag left to reveal the after photo, right to reveal before.
 */
export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "Before",
  afterLabel = "After",
  caption,
  className,
  showLabels = true,
  showHint = true,
}: BeforeAfterSliderProps) {
  const [pos, setPos] = useState(50);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(98, Math.max(2, next)));
  }, []);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    setFromClientX(e.clientX);
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  };

  return (
    <figure className={`pdp-ba-slider${className ? ` ${className}` : ""}`}>
      <div
        ref={trackRef}
        className="pdp-ba-slider-track"
        role="slider"
        aria-label="Before and after comparison"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(2, p - 4));
          if (e.key === "ArrowRight") setPos((p) => Math.min(98, p + 4));
        }}
      >
        <img src={afterSrc} alt="" className="pdp-ba-slider-img pdp-ba-slider-img--after" draggable={false} />
        <div
          className="pdp-ba-slider-before-clip"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <img src={beforeSrc} alt="" className="pdp-ba-slider-img pdp-ba-slider-img--before" draggable={false} />
        </div>

        <div className="pdp-ba-slider-handle" style={{ left: `${pos}%` }} aria-hidden="true">
          <span className="pdp-ba-slider-line" />
          <span className="pdp-ba-slider-knob">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M8 6 3 12l5 6M16 6l5 6-5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        {showLabels ? (
          <>
            <span className="pdp-ba-slider-tag pdp-ba-slider-tag--before">{beforeLabel}</span>
            <span className="pdp-ba-slider-tag pdp-ba-slider-tag--after">{afterLabel}</span>
          </>
        ) : null}
      </div>
      {caption ? <figcaption className="pdp-ba-slider-caption">{caption}</figcaption> : null}
      {showHint ? (
        <p className="pdp-ba-slider-hint">Drag to compare · Individual results vary</p>
      ) : null}
    </figure>
  );
}
