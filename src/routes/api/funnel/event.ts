import { createFileRoute } from "@tanstack/react-router";
import { getRecentFunnelEvents, recordFunnelEvent } from "@/server/funnel/event-store";
import { jsonError, jsonOk, readJsonBody } from "@/server/prx/respond";

type FunnelEventBody = {
  event?: string;
  params?: Record<string, unknown>;
  attribution?: Record<string, unknown>;
};

export const Route = createFileRoute("/api/funnel/event")({
  server: {
    handlers: {
      GET: async () => {
        return jsonOk({ events: getRecentFunnelEvents(50) });
      },
      POST: async ({ request }) => {
        try {
          const body = await readJsonBody<FunnelEventBody>(request);
          if (!body?.event?.trim()) {
            return jsonError("Missing event name", 400);
          }
          const record = recordFunnelEvent(
            body.event.trim(),
            body.params ?? {},
            body.attribution ?? {},
          );
          return jsonOk({ recorded: true, id: record.id }, { status: 201 });
        } catch {
          return jsonError("Invalid JSON body", 400);
        }
      },
    },
  },
});
