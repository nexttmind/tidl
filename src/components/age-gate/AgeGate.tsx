import { useEffect, useRef } from "react";
import { confirmAgeGate } from "@/lib/age-gate";
import "../quiz/quiz.css";

export function AgeGate({ onConfirmed }: { onConfirmed: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    overlay.style.opacity = "0";
    requestAnimationFrame(() => {
      overlay.style.transition = "opacity 0.4s ease";
      overlay.style.opacity = "1";
    });
  }, []);

  const handleConfirm = () => {
    confirmAgeGate();
    const overlay = overlayRef.current;
    if (overlay) {
      overlay.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      overlay.style.opacity = "0";
      overlay.style.transform = "translateY(-16px)";
      setTimeout(onConfirmed, 280);
    } else {
      onConfirmed();
    }
  };

  return (
    <div
      ref={overlayRef}
      className="tidl-funnel fixed inset-0 z-[200] flex items-center justify-center px-5"
      style={{ background: "rgba(2, 2, 2, 0.72)" }}
    >
      <div className="max-w-md rounded-2xl bg-[var(--quiz-surface)] p-8 text-center shadow-xl">
        <h2 className="text-2xl font-medium tracking-tight text-[var(--quiz-ink)]">
          Are you 18 or older?
        </h2>
        <p className="mt-3 text-sm text-[var(--quiz-muted)]">
          TIDL provides physician-prescribed treatments for adults. You must be 18 or
          older to continue.
        </p>
        <button type="button" onClick={handleConfirm} className="tidl-btn mt-6">
          Yes, I am 18 or older
        </button>
        <a href="https://www.google.com" className="mt-3 block text-xs text-[var(--quiz-muted-warm)]">
          No, take me away
        </a>
      </div>
    </div>
  );
}
