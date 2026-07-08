import { motion } from "framer-motion";

const LINES = [
  "M 20 280 C 80 220, 140 340, 200 260 S 320 180, 380 240",
  "M 30 320 C 100 260, 160 380, 230 300 S 340 220, 390 290",
  "M 40 360 C 110 300, 170 420, 240 340 S 350 260, 400 330",
  "M 50 200 C 120 140, 180 260, 250 180 S 360 100, 410 170",
  "M 60 240 C 130 180, 190 300, 260 220 S 370 140, 420 210",
];

export function ContourMap({
  active,
  pulse,
}: {
  active: boolean;
  pulse: boolean;
}) {
  return (
    <svg
      viewBox="0 0 440 440"
      className="hiw-contour"
      aria-hidden="true"
      fill="none"
    >
      {LINES.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="#C8A45A"
          strokeWidth={1}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            active
              ? {
                  pathLength: 1,
                  opacity: [0.12, 0.28, 0.18, pulse ? 0.42 : 0.22, 0.18],
                }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{
            pathLength: { duration: 1.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
            opacity: {
              duration: 5,
              delay: i * 0.15,
              repeat: Infinity,
              repeatDelay: 2.2,
              times: [0, 0.2, 0.55, 0.68, 1],
            },
          }}
        />
      ))}
      <motion.circle
        r="3"
        fill="#D6B36C"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: [0, 0.9, 0] } : {}}
        transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 3.6 }}
      >
        <animateMotion dur="8s" repeatCount="indefinite" path={LINES[2]} />
      </motion.circle>
      {pulse ? (
        <motion.circle
          cx="220"
          cy="220"
          r="120"
          stroke="#C8A45A"
          strokeWidth="1"
          initial={{ scale: 0.85, opacity: 0.5 }}
          animate={{ scale: 1.15, opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      ) : null}
    </svg>
  );
}
