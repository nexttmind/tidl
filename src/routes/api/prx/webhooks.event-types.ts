import { createFileRoute } from "@tanstack/react-router";
import { createPrxClient } from "@/lib/prescribe-rx/client";
import { handlePrxRouteError, jsonOk } from "@/server/prx/respond";

/** Read-only passthrough of the webhook event catalog PRX can send us. */
export const Route = createFileRoute("/api/prx/webhooks/event-types")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const prx = createPrxClient();
          const data = await prx.get("/webhooks/event-types");
          return jsonOk(data);
        } catch (error) {
          return handlePrxRouteError(error);
        }
      },
    },
  },
});
