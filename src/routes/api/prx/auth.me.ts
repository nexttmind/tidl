import { createFileRoute } from "@tanstack/react-router";
import { createPrxClient } from "@/lib/prescribe-rx/client";
import { handlePrxRouteError, jsonOk } from "@/server/prx/respond";

/** Identity + abilities of the connected PRX token (GET /auth/me). */
export const Route = createFileRoute("/api/prx/auth/me")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const prx = createPrxClient();
          const data = await prx.get("/auth/me");
          return jsonOk(data);
        } catch (error) {
          return handlePrxRouteError(error);
        }
      },
    },
  },
});
