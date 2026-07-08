import type { QuizController } from "@/hooks/use-quiz";
import { QuizField, QuizStepIntro } from "../QuizField";

export function StepAccount({ quiz }: { quiz: QuizController }) {
  return (
    <div>
      <QuizStepIntro
        title="Create your account"
        description="Your information is securely encrypted. A physician reviews every assessment."
      />
      <QuizField label="Email" error={quiz.errors.email}>
        <input
          type="email"
          className="tidl-input"
          value={quiz.data.email}
          onChange={(e) => quiz.updateData({ email: e.target.value })}
          autoComplete="email"
        />
      </QuizField>
      <QuizField label="Phone" error={quiz.errors.phone}>
        <input
          type="tel"
          className="tidl-input"
          value={quiz.data.phone}
          onChange={(e) => quiz.updateData({ phone: e.target.value })}
          autoComplete="tel"
        />
      </QuizField>
      <QuizField label="Password" error={quiz.errors.password} hint="At least 8 characters">
        <input
          type="password"
          className="tidl-input"
          value={quiz.data.password}
          onChange={(e) => quiz.updateData({ password: e.target.value })}
          autoComplete="new-password"
        />
      </QuizField>
    </div>
  );
}
