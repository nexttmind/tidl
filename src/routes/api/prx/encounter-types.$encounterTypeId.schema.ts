import { createFileRoute } from "@tanstack/react-router";
import { createPrxClient } from "@/lib/prescribe-rx/client";
import { handlePrxRouteError, jsonError, jsonOk } from "@/server/prx/respond";

export const Route = createFileRoute("/api/prx/encounter-types/$encounterTypeId/schema")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          const { encounterTypeId } = params;
          if (!encounterTypeId) {
            return jsonError("Missing encounter type id", 400);
          }

          const prx = createPrxClient();
          const data = await prx.get(
            `/telehealth/encounter-types/${encodeURIComponent(encounterTypeId)}/schema`,
          );
          return jsonOk(data);
        } catch (error) {
          return handlePrxRouteError(error);
        }
      },
    },
  },
});
