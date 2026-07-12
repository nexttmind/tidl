import { createFileRoute } from "@tanstack/react-router";
import { createPrxClient } from "@/lib/prescribe-rx/client";
import { handlePrxRouteError, jsonOk } from "@/server/prx/respond";

/** List encounters in our org tree (paginated) — powers the account/orders views. */
export const Route = createFileRoute("/api/prx/encounters")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const prx = createPrxClient();
          const url = new URL(request.url);
          const qs = url.searchParams.toString();
          const data = await prx.get(`/encounters${qs ? `?${qs}` : ""}`);
          return jsonOk(data);
        } catch (error) {
          return handlePrxRouteError(error);
        }
      },
    },
  },
});
