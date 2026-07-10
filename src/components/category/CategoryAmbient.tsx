import { useReducedMotion } from "framer-motion";

const ORBS = [
  { className: "cat-orb cat-orb--a", delay: 0 },
  { className: "cat-orb cat-orb--b", delay: 1.4 },
  { className: "cat-orb cat-orb--c", delay: 2.2 },
] as const;

export function CategoryAmbient({ live }: { live: boolean }) {
  const reduce = useReducedMotion();

  return (
    <div className={`cat-ambient${live ? " cat-ambient--live" : ""}`} aria-hidden="true">
      <div className="cat-ambient-wash cat-ambient-wash--top" />
      <div className="cat-ambient-wash cat-ambient-wash--right" />
      <div className="cat-ambient-wash cat-ambient-wash--bottom" />
      <div className="cat-ambient-mesh" />
      <div className="cat-ambient-noise" />
      {!reduce ? (
        <>
          {ORBS.map((orb) => (
            <span key={orb.className} className={orb.className} style={{ animationDelay: `${orb.delay}s` }} />
          ))}
          <svg className="cat-ambient-paths" viewBox="0 0 1200 600" preserveAspectRatio="none">
            <path className="cat-path cat-path--1" d="M-40 120 C 220 40, 420 280, 640 180 S 980 40, 1240 140" />
            <path className="cat-path cat-path--2" d="M-40 320 C 180 420, 380 220, 620 340 S 940 480, 1240 360" />
          </svg>
        </>
      ) : null}
    </div>
  );
}
