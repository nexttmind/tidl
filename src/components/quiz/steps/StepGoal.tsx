import type { QuizController } from "@/hooks/use-quiz";
import { GOAL_IDS, GOAL_LABELS } from "@/types/quiz";
import { QuizOptionCard, QuizStepIntro } from "../QuizField";

export function StepGoal({ quiz }: { quiz: QuizController }) {
  return (
    <div>
      <QuizStepIntro
        title="What is your primary goal?"
        description="We'll match you with a physician-reviewed treatment plan."
      />
      <div className="grid gap-2">
        {GOAL_IDS.map((goal) => (
          <QuizOptionCard
            key={goal}
            selected={quiz.data.goal === goal}
            onClick={() => quiz.updateData({ goal })}
          >
            <span className="font-medium">{GOAL_LABELS[goal]}</span>
          </QuizOptionCard>
        ))}
      </div>
      {quiz.errors.goal ? (
        <p className="mt-2 text-xs text-red-600">{quiz.errors.goal}</p>
      ) : null}
    </div>
  );
}
