import { createFileRoute } from "@tanstack/react-router";
import { createPrxClient } from "@/lib/prescribe-rx/client";
import { handlePrxRouteError, jsonError, jsonOk } from "@/server/prx/respond";

/** Live status of a single encounter — polled by the confirmation & finish screens. */
export const Route = createFileRoute("/api/prx/encounters/$encounterId")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          const { encounterId } = params;
          if (!encounterId) return jsonError("Missing encounter id", 400);
          const prx = createPrxClient();
          const data = await prx.get(`/encounters/${encodeURIComponent(encounterId)}`);
          return jsonOk(data);
        } catch (error) {
          return handlePrxRouteError(error);
        }
      },
    },
  },
});
