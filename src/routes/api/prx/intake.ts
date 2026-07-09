import { createFileRoute } from "@tanstack/react-router";
import type { QuizFormData } from "@/types/quiz";
import { handlePrxRouteError, jsonError, jsonOk, readJsonBody } from "@/server/prx/respond";

type IntakeBody = {
  quiz: QuizFormData;
  step?: number;
};

/**
 * Quiz progress stays in localStorage during the funnel.
 * PRX submission happens once at checkout via POST /api/prx/checkout
 * (POST /telehealth/intake/unified).
 */
export const Route = createFileRoute("/api/prx/intake")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await readJsonBody<IntakeBody>(request);
          if (!body?.quiz) {
            return jsonError("Missing quiz payload", 400);
          }

          return jsonOk({
            skipped: true,
            reason: "deferred_to_checkout",
            step: body.step ?? null,
          });
        } catch (error) {
          return handlePrxRouteError(error);
        }
      },
    },
  },
});
