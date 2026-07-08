import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "@tanstack/react-router";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { useQuiz } from "@/hooks/use-quiz";
import { lockPageScroll, unlockPageScroll } from "@/lib/age-gate";
import { isQuizStepValid } from "@/lib/quiz-schema";
import { useQuizModal } from "@/providers/quiz-modal-provider";
import { QuizFlow } from "./QuizFlow";
import "./quiz.css";

const TEXT_STEPS = new Set([2, 7]);
const AUTO_ADVANCE_MS: Record<number, number> = {
  1: 340,
  3: 340,
  4: 340,
  5: 340,
  6: 340,
};

export function QuizModal() {
  const mounted = useIsMounted();
  const navigate = useNavigate();
  const { isOpen, closeModal, options } = useQuizModal();
  const quiz = useQuiz({
    noNavigation: true,
    initialProduct: options.product,
    initialGoal: options.goal,
  });
  const contentRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!mounted || !isOpen) return;
    quiz.resetQuiz();
    if (options.product || options.goal) {
      quiz.updateData({
        productSlug: options.product ?? null,
        goal: options.goal ?? quiz.data.goal,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, isOpen]);

  useEffect(() => {
    if (!mounted) return;
    if (isOpen) lockPageScroll();
    else unlockPageScroll();
    return () => unlockPageScroll();
  }, [mounted, isOpen]);

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [quiz.currentStep]);

  useEffect(() => {
    if (!mounted || !isOpen || quiz.currentStep >= 8) return;
    const delay = AUTO_ADVANCE_MS[quiz.currentStep];
    if (!delay) return;
    if (!isQuizStepValid(quiz.currentStep, quiz.data)) return;

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (isQuizStepValid(quiz.currentStep, quiz.data)) {
        quiz.goNext();
      }
    }, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [mounted, isOpen, quiz, quiz.currentStep, quiz.data]);

  if (!mounted) return null;

  return createPortal(
    <>
      <div
        className={`quiz-modal-backdrop ${isOpen ? "is-open" : ""}`}
        onClick={closeModal}
        aria-hidden={!isOpen}
      />
      <div
        className={`quiz-modal-sheet quiz-root ${isOpen ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Medical intake assessment"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[var(--quiz-border)] bg-[var(--quiz-surface)] px-5 py-4">
          <button
            type="button"
            className="text-sm text-[var(--quiz-muted)]"
            onClick={quiz.canGoBack ? quiz.goBack : closeModal}
          >
            {quiz.canGoBack ? "Back" : "Close"}
          </button>
          <span className="text-sm font-medium">Medical intake</span>
          <span className="w-10" />
        </div>
        <div className="px-5 py-3">
          <div className="quiz-progress-track">
            <div className="quiz-progress-fill" style={{ width: `${quiz.progress}%` }} />
          </div>
        </div>
        <div ref={contentRef} className="quiz-modal-content">
          {quiz.hydrated ? <QuizFlow quiz={quiz} /> : null}
        </div>
        <div className="border-t border-[var(--quiz-border)] bg-[var(--quiz-surface)] px-5 py-4">
          {quiz.currentStep === 8 ? (
            <button
              type="button"
              className="tidl-btn"
              onClick={() => {
                quiz.completeAndCheckout();
                closeModal();
                navigate({ to: "/checkout" });
              }}
            >
              Get my plan →
            </button>
          ) : TEXT_STEPS.has(quiz.currentStep) ? (
            <button type="button" className="tidl-btn" onClick={() => quiz.goNext()}>
              Continue
            </button>
          ) : (
            <p className="text-center text-xs text-[var(--quiz-muted-warm)]">
              Select an option to continue
            </p>
          )}
        </div>
      </div>
    </>,
    document.body,
  );
}
