import { useEffect, useRef, useState } from "react";
import type { QuizController } from "@/hooks/use-quiz";
import { STEP_LABELS } from "@/types/quiz";
import { StepAboutYou } from "./steps/StepAboutYou";
import { StepAccount } from "./steps/StepAccount";
import { StepGoal } from "./steps/StepGoal";
import { StepHealthHistory } from "./steps/StepHealthHistory";
import { StepLifestyle } from "./steps/StepLifestyle";
import { StepPhysicianNotice } from "./steps/StepPhysicianNotice";
import { StepRecommendation } from "./steps/StepRecommendation";
import { StepTreatmentHistory } from "./steps/StepTreatmentHistory";

function StepContent({ quiz }: { quiz: QuizController }) {
  switch (quiz.currentStep) {
    case 1:
      return <StepGoal quiz={quiz} />;
    case 2:
      return <StepAboutYou quiz={quiz} />;
    case 3:
      return <StepHealthHistory quiz={quiz} />;
    case 4:
      return <StepLifestyle quiz={quiz} />;
    case 5:
      return <StepTreatmentHistory quiz={quiz} />;
    case 6:
      return <StepPhysicianNotice quiz={quiz} />;
    case 7:
      return <StepAccount quiz={quiz} />;
    case 8:
      return <StepRecommendation quiz={quiz} />;
    default:
      return null;
  }
}

export function QuizFlow({ quiz }: { quiz: QuizController }) {
  const [phase, setPhase] = useState<"entering" | "exiting" | "idle">("idle");
  const [displayStep, setDisplayStep] = useState(quiz.currentStep);
  const prevStep = useRef(quiz.currentStep);

  useEffect(() => {
    if (quiz.currentStep === prevStep.current) return;
    setPhase("exiting");
    const t = setTimeout(() => {
      setDisplayStep(quiz.currentStep);
      setPhase("entering");
      prevStep.current = quiz.currentStep;
      const t2 = setTimeout(() => setPhase("idle"), 180);
      return () => clearTimeout(t2);
    }, 120);
    return () => clearTimeout(t);
  }, [quiz.currentStep]);

  return (
    <div>
      <p className="mb-4 text-xs uppercase tracking-widest text-[var(--quiz-muted)]">
        Step {displayStep} of {quiz.totalSteps} · {STEP_LABELS[displayStep]}
      </p>
      <div
        className={`quiz-step ${
          phase === "exiting" ? "is-exiting" : phase === "entering" ? "is-entering" : ""
        }`}
      >
        <StepContent quiz={{ ...quiz, currentStep: displayStep }} />
      </div>
    </div>
  );
}
