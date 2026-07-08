import type { QuizController } from "@/hooks/use-quiz";
import { EATING_HABITS, EXERCISE_LEVELS, SLEEP_LEVELS } from "@/types/quiz";
import { QuizField, QuizSegmentedControl, QuizStepIntro } from "../QuizField";

export function StepLifestyle({ quiz }: { quiz: QuizController }) {
  return (
    <div>
      <QuizStepIntro title="Your lifestyle" description="Helps your doctor personalize your plan." />
      <QuizField label="Exercise level" error={quiz.errors.exercise}>
        <QuizSegmentedControl
          value={quiz.data.exercise}
          options={[
            { value: "sedentary" as const, label: "Sedentary" },
            { value: "light" as const, label: "Light (1-2 days/week)" },
            { value: "moderate" as const, label: "Moderate (3-4 days/week)" },
            { value: "active" as const, label: "Active (5+ days/week)" },
          ]}
          onChange={(exercise) => quiz.updateData({ exercise })}
        />
      </QuizField>
      <QuizField label="Sleep quality" error={quiz.errors.sleep}>
        <QuizSegmentedControl
          value={quiz.data.sleep}
          options={SLEEP_LEVELS.map((s) => ({
            value: s,
            label: s.charAt(0).toUpperCase() + s.slice(1),
          }))}
          onChange={(sleep) => quiz.updateData({ sleep })}
        />
      </QuizField>
      <QuizField label="Eating habits" error={quiz.errors.eatingHabits}>
        <QuizSegmentedControl
          value={quiz.data.eatingHabits}
          options={[
            { value: "inconsistent" as const, label: "Inconsistent" },
            { value: "balanced" as const, label: "Balanced" },
            { value: "high-protein" as const, label: "High protein" },
            { value: "restricted" as const, label: "Restricted / dieting" },
          ]}
          onChange={(eatingHabits) => quiz.updateData({ eatingHabits })}
        />
      </QuizField>
    </div>
  );
}
