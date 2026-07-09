import type { QuizController } from "@/hooks/use-quiz";
import type { HealthConditionId } from "@/types/quiz";
import { HEALTH_CONDITION_IDS } from "@/types/quiz";
import { QuizOptionCard, QuizStepIntro, QuizYesNo } from "../QuizField";

const CONDITION_LABELS: Record<HealthConditionId, string> = {
  diabetes: "Diabetes or prediabetes",
  "heart-disease": "Heart disease",
  thyroid: "Thyroid condition",
  "liver-kidney": "Liver or kidney disease",
  cancer: "Cancer (current or past 5 years)",
  "eating-disorder": "Eating disorder",
  none: "None of the above",
};

export function StepHealthHistory({ quiz }: { quiz: QuizController }) {
  const toggleCondition = (id: HealthConditionId) => {
    const current = quiz.data.healthConditions;
    if (id === "none") {
      quiz.updateData({ healthConditions: ["none"] });
      return;
    }
    const withoutNone = current.filter((c) => c !== "none");
    if (withoutNone.includes(id)) {
      quiz.updateData({ healthConditions: withoutNone.filter((c) => c !== id) });
    } else {
      quiz.updateData({ healthConditions: [...withoutNone, id] });
    }
  };

  return (
    <div>
      <QuizStepIntro
        title="Your health history"
        description="Select all that apply. Your physician uses this to ensure safe treatment."
      />
      <div className="mb-4 grid gap-2">
        {HEALTH_CONDITION_IDS.map((id) => (
          <QuizOptionCard
            key={id}
            selected={quiz.data.healthConditions.includes(id)}
            onClick={() => toggleCondition(id)}
          >
            {CONDITION_LABELS[id]}
          </QuizOptionCard>
        ))}
      </div>
      {quiz.errors.healthConditions ? (
        <p className="mb-3 text-xs text-red-600">{quiz.errors.healthConditions}</p>
      ) : null}
      <QuizYesNo
        label="Are you currently taking any medications?"
        value={quiz.data.takingMedications}
        onChange={(v) => quiz.updateData({ takingMedications: v })}
        error={quiz.errors.takingMedications}
      />
      <QuizYesNo
        label="Do you have any medication allergies?"
        value={quiz.data.hasAllergies}
        onChange={(v) => quiz.updateData({ hasAllergies: v })}
        error={quiz.errors.hasAllergies}
      />
    </div>
  );
}
