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

const AUTO_ADVANCE_MS: Record<number, number> = {
  1: 340,
  2: 700,
  3: 340,
  4: 340,
  5: 340,
  6: 340,
  7: 700,
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

  const isResultsStep = quiz.currentStep === 8;

  return createPortal(
    <>
      <div
        className={`quiz-modal-backdrop ${isOpen ? "is-open" : ""}`}
        onClick={closeModal}
        aria-hidden={!isOpen}
      />
      <div
        className={`quiz-modal-stage ${isOpen ? "is-open" : ""}`}
        aria-hidden={!isOpen}
      >
        <div
          className={`quiz-modal-sheet quiz-root ${isOpen ? "is-open" : ""}${
            isResultsStep ? " quiz-modal-sheet--results" : ""
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Medical intake assessment"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="quiz-modal-close-fab"
            onClick={closeModal}
            aria-label="Close assessment"
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <div className="quiz-modal-progress">
            <div className="quiz-progress-track">
              <div className="quiz-progress-fill" style={{ width: `${quiz.progress}%` }} />
            </div>
          </div>

          <div className="quiz-modal-header">
            <button
              type="button"
              className="quiz-modal-header-btn"
              onClick={quiz.canGoBack ? quiz.goBack : undefined}
              disabled={!quiz.canGoBack}
              aria-label={quiz.canGoBack ? "Go back" : undefined}
            >
              {quiz.canGoBack ? (
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M12.5 5 7.5 10l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ) : null}
            </button>
            <span className="quiz-modal-step-counter">
              {quiz.currentStep} / {quiz.totalSteps}
            </span>
            <span className="quiz-modal-header-spacer" aria-hidden="true" />
          </div>

          <div ref={contentRef} className="quiz-modal-content">
            {quiz.hydrated ? <QuizFlow quiz={quiz} hideStepLabel /> : null}
          </div>

          {isResultsStep ? (
            <div className="quiz-modal-footer">
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
            </div>
          ) : null}
        </div>
      </div>
    </>,
    document.body,
  );
}
