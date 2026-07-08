import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { useEffect } from "react";
import { QuizLayout } from "@/components/quiz/QuizLayout";
import { useQuiz } from "@/hooks/use-quiz";
import { GOAL_IDS, PRODUCT_SLUGS } from "@/types/quiz";

const quizSearchSchema = z.object({
  step: z.coerce.number().min(1).max(8).optional(),
  product: z.enum(PRODUCT_SLUGS).optional(),
  goal: z.enum(GOAL_IDS).optional(),
});

export const Route = createFileRoute("/quiz")({
  validateSearch: quizSearchSchema,
  component: QuizPage,
});

function QuizPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();

  const quiz = useQuiz({
    initialStep: search.step,
    initialProduct: search.product,
    initialGoal: search.goal,
    onStepChange: (step) => {
      navigate({
        to: "/quiz",
        search: { ...search, step },
        replace: true,
      });
    },
  });

  useEffect(() => {
    if (search.step && search.step !== quiz.currentStep) {
      quiz.goToStep(search.step);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.step]);

  return <QuizLayout quiz={quiz} />;
}
