import type { ReactNode } from "react";
import type { QuizController } from "@/hooks/use-quiz";
import { Link } from "@tanstack/react-router";
import { QuizFlow } from "./QuizFlow";
import "./quiz.css";

export function QuizLayout({
  quiz,
  children,
}: {
  quiz: QuizController;
  children?: ReactNode;
}) {
  return (
    <div className="quiz-root tidl-funnel-page">
      <header className="tidl-header px-5 py-4">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link to="/" className="tidl-link-muted">
            ← Back
          </Link>
          <span className="text-sm font-medium">Medical intake</span>
          <span className="w-10" />
        </div>
      </header>
      <div className="mx-auto max-w-2xl px-5 py-4">
        <div className="quiz-progress-track">
          <div className="quiz-progress-fill" style={{ width: `${quiz.progress}%` }} />
        </div>
      </div>
      <main className="quiz-layout-card">
        {quiz.hydrated ? <QuizFlow quiz={quiz} /> : null}
        {children}
      </main>
      <footer className="fixed inset-x-0 bottom-0 border-t border-[var(--quiz-border)] bg-[var(--quiz-surface)] px-5 py-4">
        <div className="mx-auto flex max-w-2xl gap-3">
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
