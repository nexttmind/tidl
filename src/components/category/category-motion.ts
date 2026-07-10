export const catSpring = { type: "spring" as const, stiffness: 280, damping: 26 };

/** No CSS filter here — blur on hidden items causes blank layout gaps. */
export const catReveal = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const catStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export const catCardHover = {
  rest: { y: 0, scale: 1 },
  hover: { y: -8, scale: 1.01, transition: catSpring },
};
