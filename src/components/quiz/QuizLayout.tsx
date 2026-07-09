import { useEffect, useState } from "react";
import type { QuizController } from "@/hooks/use-quiz";
import { QuizFlow } from "./QuizFlow";
import "./quiz.css";

export function QuizLayout({ quiz }: { quiz: QuizController }) {
  return (
    <div className="quiz-root tidl-funnel-page">
      <div className="tidl-funnel-card">
        <div className="px-5 pt-5">
          <div className="quiz-progress-track">
            <div className="quiz-progress-fill" style={{ width: `${quiz.progress}%` }} />
          </div>
          <p className="mt-3 text-center text-sm font-semibold text-[var(--quiz-ink)]">
            {quiz.currentStep} / {quiz.totalSteps}
          </p>
        </div>
        <div className="tidl-funnel-card-inner">
          {quiz.hydrated ? <QuizFlow quiz={quiz} /> : null}
        </div>
      </div>

      <footer className="tidl-funnel-footer">
        <div className="tidl-funnel-footer-inner">
          {quiz.canGoBack ? (
            <button type="button" className="tidl-btn-outline" onClick={quiz.goBack}>
              Back
            </button>
          ) : null}
          {quiz.currentStep < 8 ? (
            <button type="button" className="tidl-btn flex-1" onClick={() => quiz.goNext()}>
              Continue
            </button>
          ) : (
            <button type="button" className="tidl-btn flex-1" onClick={() => quiz.completeAndCheckout()}>
              Continue to Checkout
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
