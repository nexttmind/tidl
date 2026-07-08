import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function QuizStepIntro({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-medium tracking-tight">{title}</h2>
      {description ? (
        <p className="mt-2 text-sm text-[var(--quiz-muted)]">{description}</p>
      ) : null}
      <p className="quiz-trust mt-3">A physician reviews every assessment.</p>
    </div>
  );
}

export function QuizField({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="mb-4 block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {hint ? <span className="mb-2 block text-xs text-[var(--quiz-muted)]">{hint}</span> : null}
      {children}
      {error ? <span className="mt-1 block text-xs text-red-600">{error}</span> : null}
    </label>
  );
}

export function QuizOptionCard({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={cn("quiz-option-card w-full", selected && "is-selected")}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function QuizSegmentedControl<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T | null;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="grid gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={cn("quiz-segment w-full text-left", value === opt.value && "is-selected")}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function QuizYesNo({
  value,
  onChange,
  label,
}: {
  value: boolean | null;
  onChange: (value: boolean) => void;
  label: string;
}) {
  return (
    <div className="mb-4">
      <p className="mb-2 text-sm font-medium">{label}</p>
      <div className="flex gap-2">
        <button
          type="button"
          className={cn("quiz-yesno-btn", value === true && "is-selected")}
          onClick={() => onChange(true)}
        >
          Yes
        </button>
        <button
          type="button"
          className={cn("quiz-yesno-btn", value === false && "is-selected")}
          onClick={() => onChange(false)}
        >
          No
        </button>
      </div>
    </div>
  );
}
