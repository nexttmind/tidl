import type { QuizController } from "@/hooks/use-quiz";
import { QuizStepIntro, QuizYesNo } from "../QuizField";

export function StepTreatmentHistory({ quiz }: { quiz: QuizController }) {
  return (
    <div>
      <QuizStepIntro
        title="Treatment history"
        description="Tell us about any prior treatments you've tried."
      />
      <QuizYesNo
        label="Have you used GLP-1 medications before?"
        value={quiz.data.usedGlp1Before}
        onChange={(v) => quiz.updateData({ usedGlp1Before: v })}
      />
      <QuizYesNo
        label="Have you tried other prescription weight-loss medications?"
        value={quiz.data.previousWeightLossMeds}
        onChange={(v) => quiz.updateData({ previousWeightLossMeds: v })}
      />
    </div>
  );
}
