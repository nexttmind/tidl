import type { QuizController } from "@/hooks/use-quiz";
import { SEX_OPTIONS } from "@/types/quiz";
import { QuizField, QuizSegmentedControl, QuizStepIntro } from "../QuizField";

export function StepAboutYou({ quiz }: { quiz: QuizController }) {
  return (
    <div>
      <QuizStepIntro
        title="Tell us about yourself"
        description="This helps your physician determine safe, effective dosing."
      />
      <QuizField label="Age" error={quiz.errors.age}>
        <input
          type="number"
          className="tidl-input"
          value={quiz.data.age ?? ""}
          onChange={(e) =>
            quiz.updateData({ age: e.target.value ? Number(e.target.value) : null })
          }
          min={18}
          max={120}
        />
      </QuizField>
      <QuizField label="Sex assigned at birth" error={quiz.errors.sex}>
        <QuizSegmentedControl
          value={quiz.data.sex}
          options={SEX_OPTIONS.map((s) => ({
            value: s,
            label: s.charAt(0).toUpperCase() + s.slice(1),
          }))}
          onChange={(sex) => quiz.updateData({ sex })}
        />
      </QuizField>
      <div className="grid grid-cols-2 gap-3">
        <QuizField label="Height (ft)" error={quiz.errors.heightFeet}>
          <input
            type="number"
            className="tidl-input"
            value={quiz.data.heightFeet ?? ""}
            onChange={(e) =>
              quiz.updateData({
                heightFeet: e.target.value ? Number(e.target.value) : null,
              })
            }
            min={3}
            max={8}
          />
        </QuizField>
        <QuizField label="Inches" error={quiz.errors.heightInches}>
          <input
            type="number"
            className="tidl-input"
            value={quiz.data.heightInches ?? ""}
            onChange={(e) =>
              quiz.updateData({
                heightInches: e.target.value ? Number(e.target.value) : null,
              })
            }
            min={0}
            max={11}
          />
        </QuizField>
      </div>
      <QuizField label="Weight (lbs)" error={quiz.errors.weightLbs}>
        <input
          type="number"
          className="tidl-input"
          value={quiz.data.weightLbs ?? ""}
          onChange={(e) =>
            quiz.updateData({ weightLbs: e.target.value ? Number(e.target.value) : null })
          }
          min={50}
          max={700}
        />
      </QuizField>
    </div>
  );
}
