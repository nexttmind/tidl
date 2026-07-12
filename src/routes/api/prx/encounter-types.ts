import { createFileRoute } from "@tanstack/react-router";
import { createPrxClient } from "@/lib/prescribe-rx/client";
import { handlePrxRouteError, jsonOk } from "@/server/prx/respond";

export const Route = createFileRoute("/api/prx/encounter-types")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const prx = createPrxClient();
          const data = await prx.get("/telehealth/encounter-types");
          return jsonOk(data);
        } catch (error) {
          return handlePrxRouteError(error);
        }
      },
    },
  },
});
