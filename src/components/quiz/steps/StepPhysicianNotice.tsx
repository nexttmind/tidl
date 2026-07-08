import type { QuizController } from "@/hooks/use-quiz";
import { QuizStepIntro } from "../QuizField";

export function StepPhysicianNotice({ quiz }: { quiz: QuizController }) {
  return (
    <div>
      <QuizStepIntro
        title="Physician review"
        description="Every TIDL assessment is reviewed by a licensed physician before any treatment is prescribed."
      />
      <div className="rounded-xl tidl-notice-box">
        <p className="font-medium">What happens next</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--quiz-muted)]">
          <li>A licensed physician reviews your full assessment.</li>
          <li>Treatment is prescribed only if clinically appropriate.</li>
          <li>Your plan ships from a licensed US pharmacy if approved.</li>
        </ul>
      </div>
      <label className="mt-5 flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          className="mt-1"
          checked={quiz.data.physicianNoticeAcknowledged}
          onChange={(e) =>
            quiz.updateData({ physicianNoticeAcknowledged: e.target.checked })
          }
        />
        <span className="text-sm">
          I understand that a physician will review my assessment and determine
          treatment eligibility.
        </span>
      </label>
      {quiz.errors.physicianNoticeAcknowledged ? (
        <p className="mt-2 text-xs text-red-600">
          {quiz.errors.physicianNoticeAcknowledged}
        </p>
      ) : null}
    </div>
  );
}
