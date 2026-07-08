import { type MouseEvent, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export const settle = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.6, delay, ease: settle }}
    >
      {children}
    </motion.div>
  );
}

type PdpButtonProps = {
  onClick: (e: MouseEvent) => void;
  label: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  href?: string;
};

export function PdpButton({
  onClick,
  label,
  variant = "primary",
  className = "",
  href = "#",
}: PdpButtonProps) {
  if (variant === "primary") {
    return (
      <a href={href} onClick={onClick} className={`button-01 button-03 w-inline-block ${className}`.trim()}>
        <div className="button-outside-01">
          <div className="button-inside">
            <div className="button-text-01">{label}</div>
            <div className="button-text-01">{label}</div>
          </div>
        </div>
      </a>
    );
  }

  if (variant === "secondary") {
    return (
      <a href={href} onClick={onClick} className={`pdp-btn-secondary ${className}`.trim()}>
        {label}
      </a>
    );
  }

  return (
    <a href={href} onClick={onClick} className={`pdp-btn-ghost ${className}`.trim()}>
      {label}
    </a>
  );
}
