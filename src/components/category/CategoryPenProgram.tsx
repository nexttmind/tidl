import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  motion,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import type { CatalogProduct } from "@/lib/product-catalog";
import { PRODUCT_PATHS } from "@/lib/product-catalog";
import type { CategoryTimelineStep } from "@/lib/categories";
import { formatCurrency } from "@/lib/pricing";
import type { ProductSlug } from "@/types/quiz";
import { catSpring } from "./category-motion";

type CategoryPenProgramProps = {
  product: CatalogProduct;
  price: number;
  workflow: readonly CategoryTimelineStep[];
  onStartIntake: (slug: ProductSlug) => void;
};

function curvedPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): string {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const cx = x1 + dx * 0.45;
  const cy = y1 + dy * 0.15 - Math.abs(dx) * 0.08;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

function pathsEqual(a: string[], b: string[]) {
  if (a.length !== b.length) return false;
  return a.every((value, index) => value === b[index]);
}

export function CategoryPenProgram({
  product,
  price,
  workflow,
  onStartIntake,
}: CategoryPenProgramProps) {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const inView = useInView(stageRef, { once: true, margin: "-12%" });

  const [paths, setPaths] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(-1);
  const [cardsShown, setCardsShown] = useState(reduce ? workflow.length : 0);
  const [penVisible, setPenVisible] = useState(!!reduce);
  const lineDoneRef = useRef<Set<number>>(new Set());

  const steps = useMemo(() => workflow.slice(0, 5), [workflow]);
  const stepCount = steps.length;

  const measurePaths = useCallback(() => {
    const stage = stageRef.current;
    const hub = hubRef.current;
    if (!stage || !hub) return;

    const stageRect = stage.getBoundingClientRect();
    const hubRect = hub.getBoundingClientRect();
    const cx = hubRect.left + hubRect.width / 2 - stageRect.left;
    const cy = hubRect.top + hubRect.height * 0.42 - stageRect.top;

    const next = Array.from({ length: stepCount }, (_, i) => {
      const node = nodeRefs.current[i];
      if (!node) return "";
      const r = node.getBoundingClientRect();
      const nx = Math.round(r.left + r.width / 2 - stageRect.left);
      const ny = Math.round(r.top + r.height / 2 - stageRect.top);
      return curvedPath(
        Math.round(cx),
        Math.round(cy),
        nx,
        ny,
      );
    });

    setPaths((prev) => (pathsEqual(prev, next) ? prev : next));
  }, [stepCount]);

  useEffect(() => {
    measurePaths();
    const stage = stageRef.current;
    if (!stage) return;

    const ro = new ResizeObserver(() => measurePaths());
    ro.observe(stage);
    window.addEventListener("resize", measurePaths);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measurePaths);
    };
  }, [measurePaths]);

  useEffect(() => {
    // Remeasure after cards/pen become visible and change layout.
    const id = window.requestAnimationFrame(() => measurePaths());
    return () => window.cancelAnimationFrame(id);
  }, [measurePaths, cardsShown, penVisible]);

  useEffect(() => {
    if (!inView || reduce) return;
    const penTimer = window.setTimeout(() => setPenVisible(true), 200);
    const lineTimer = window.setTimeout(() => setLineIndex(0), 900);
    return () => {
      window.clearTimeout(penTimer);
      window.clearTimeout(lineTimer);
    };
  }, [inView, reduce]);

  const onLineComplete = useCallback(
    (i: number) => {
      if (reduce || lineIndex !== i || lineDoneRef.current.has(i)) return;
      lineDoneRef.current.add(i);
      setCardsShown((n) => Math.max(n, i + 1));
      if (i < steps.length - 1) {
        window.setTimeout(() => setLineIndex(i + 1), 320);
      }
    },
    [lineIndex, reduce, steps.length],
  );

  return (
    <div className="cat-pen-program">
      <div className="cat-pen-program-stage" ref={stageRef}>
        <svg className="cat-pen-program-svg" aria-hidden="true">
          <defs>
            <linearGradient id="cat-pen-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(243, 195, 0, 0.2)" />
              <stop offset="45%" stopColor="rgba(243, 195, 0, 0.95)" />
              <stop offset="100%" stopColor="rgba(200, 164, 90, 0.55)" />
            </linearGradient>
            <filter id="cat-pen-line-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {paths.map((d, i) =>
            d ? (
              <motion.path
                key={steps[i].step}
                d={d}
                className="cat-pen-program-line"
                filter="url(#cat-pen-line-glow)"
                initial={{ pathLength: reduce ? 1 : 0, opacity: 0 }}
                animate={{
                  pathLength: reduce ? 1 : i < lineIndex || lineIndex === i ? 1 : 0,
                  opacity: reduce ? 0.75 : i <= lineIndex ? 1 : 0,
                }}
                transition={{
                  pathLength: {
                    duration: reduce ? 0 : 0.95,
                    ease: [0.22, 1, 0.36, 1],
                  },
                  opacity: { duration: 0.35 },
                }}
                onAnimationComplete={() => {
                  if (!reduce && lineIndex === i) onLineComplete(i);
                }}
              />
            ) : null,
          )}
        </svg>

        <motion.div
          className="cat-pen-program-hub"
          ref={hubRef}
          initial={reduce ? false : { opacity: 0, scale: 0.92, y: 16 }}
          animate={
            penVisible
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.92, y: 16 }
          }
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="cat-pen-program-hub-glow" aria-hidden="true" />
          <div className="cat-pen-program-hub-ring" aria-hidden="true" />
          <motion.img
            src={product.image}
            alt=""
            className="cat-pen-program-img"
            animate={reduce ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="cat-pen-program-badge">TIDL Pen</span>
        </motion.div>

        <div className="cat-pen-program-nodes">
          {steps.map((step, i) => (
            <div
              key={step.step}
              className={`cat-pen-program-node cat-pen-program-node--${i}`}
              ref={(el) => {
                nodeRefs.current[i] = el;
              }}
            >
              <AnimatePresence>
                {(reduce || cardsShown > i) && (
                  <motion.article
                    className="cat-pen-program-card"
                    initial={reduce ? false : { opacity: 0, scale: 0.94, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="cat-pen-program-card-step">{step.step}</span>
                    <h3 className="cat-pen-program-card-title">{step.label}</h3>
                    <p className="cat-pen-program-card-body">{step.detail}</p>
                    <span className="cat-pen-program-card-duration">{step.duration}</span>
                  </motion.article>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <motion.footer
        className="cat-pen-program-footer"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={
          cardsShown >= steps.length
            ? { opacity: 1, y: 0 }
            : reduce
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 20 }
        }
        transition={{ duration: 0.6, delay: reduce ? 0 : 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="cat-pen-program-footer-copy">
          <p className="cat-product-eyebrow">{product.headline}</p>
          <h3 className="cat-pen-program-footer-title">{product.shortName}</h3>
          <p className="cat-pen-program-footer-summary">{product.summary}</p>
          <p className="cat-product-price">
            From {formatCurrency(price)}
            <span>/month</span>
          </p>
        </div>
        <div className="cat-pen-program-footer-actions">
          <Link to={PRODUCT_PATHS[product.slug]} className="cat-btn cat-btn--primary">
            View program
          </Link>
          <motion.button
            type="button"
            className="cat-btn cat-btn--ghost"
            onClick={() => onStartIntake(product.slug)}
            whileHover={reduce ? undefined : { scale: 1.02 }}
            whileTap={reduce ? undefined : { scale: 0.98 }}
            transition={catSpring}
          >
            Start intake
          </motion.button>
        </div>
      </motion.footer>
    </div>
  );
}
