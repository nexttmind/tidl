import { motion } from "framer-motion";

const CX = 200;
const CY = 260;

const RIDGES = Array.from({ length: 11 }, (_, i) => {
  const rx = 22 + i * 17;
  const ry = 30 + i * 22;
  const gapL = 0.55 + ((i * 37) % 30) / 100;
  const gapR = 0.55 + ((i * 53) % 30) / 100;
  const dropL = 0.75 + ((i * 17) % 25) / 100;
  const dropR = 0.7 + ((i * 29) % 25) / 100;
  return {
    id: `fp-${i}`,
    d:
      `M ${CX - rx} ${CY} A ${rx} ${ry} 0 0 1 ${CX + rx} ${CY} ` +
      `M ${CX - rx * gapL} ${CY + ry * dropL} A ${rx} ${ry} 0 0 0 ${CX - rx * 0.15} ${CY + ry}` +
      ` M ${CX + rx * 0.12} ${CY + ry * 0.98} A ${rx} ${ry} 0 0 0 ${CX + rx * gapR} ${CY + ry * dropR}`,
    dur: 2.2 + i * 0.14,
    delay: 0.12 + i * 0.09,
    opacity: 0.34 - i * 0.017,
  };
});

const CORE_D = (() => {
  const pts: string[] = [];
  const turns = 2.6;
  const steps = 90;
  for (let s = 0; s <= steps; s++) {
    const t = (s / steps) * Math.PI * 2 * turns;
    const r = 3 + (s / steps) * 22;
    const x = CX + Math.cos(t) * r;
    const y = CY + Math.sin(t) * r * 1.15;
    pts.push(`${s === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
})();

const PARTICLES = [
  { path: "fp-8", dur: "18s", r: 1.8, begin: "1.6s" },
  { path: "fp-10", dur: "26s", r: 1.4, begin: "2.4s" },
];

export function ContourField({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 400 520"
      className="pointer-events-none absolute left-1/2 top-1/2 h-[130%] w-[130%] max-w-none -translate-x-1/2 -translate-y-1/2 text-gold"
      aria-hidden="true"
      fill="none"
    >
      {RIDGES.map((c) => (
        <motion.path
          key={c.id}
          id={c.id}
          d={c.d}
          stroke="currentColor"
          strokeWidth={1.1}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            active
              ? {
                  pathLength: 1,
                  opacity: [0, c.opacity, c.opacity, c.opacity * 1.9, c.opacity],
                }
              : {}
          }
          transition={{
            pathLength: { duration: c.dur, delay: c.delay, ease: [0.22, 1, 0.36, 1] },
            opacity: {
              duration: 6,
              delay: c.delay,
              times: [0, 0.18, 0.6, 0.72, 1],
              repeat: Infinity,
              repeatDelay: 2.5,
            },
          }}
        />
      ))}
      <motion.path
        d={CORE_D}
        stroke="currentColor"
        strokeWidth={1.1}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={active ? { pathLength: 1, opacity: 0.4 } : {}}
        transition={{
          pathLength: { duration: 2.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.8, delay: 0.05 },
        }}
      />
      {active &&
        PARTICLES.map((p, i) => (
          <circle key={i} r={p.r} fill="currentColor" opacity={0.5}>
            <animateMotion dur={p.dur} begin={p.begin} repeatCount="indefinite" rotate="0">
              <mpath href={`#${p.path}`} />
            </animateMotion>
          </circle>
        ))}
    </svg>
  );
}
