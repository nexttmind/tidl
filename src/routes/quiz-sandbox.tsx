import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { DynamicQuiz } from "@/components/quiz/dynamic/DynamicQuiz";

const searchSchema = z.object({
  type: z.string().optional(),
});

export const Route = createFileRoute("/quiz-sandbox")({
  validateSearch: searchSchema,
  component: QuizSandboxPage,
});

function QuizSandboxPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  return <DynamicQuiz initialSlug={search.type} onClose={() => navigate({ to: "/" })} />;
}
