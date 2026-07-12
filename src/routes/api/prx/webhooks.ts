import { createFileRoute } from "@tanstack/react-router";
import { getPrxWebhookSecret } from "@/lib/prescribe-rx/env";
import { jsonError, jsonOk } from "@/server/prx/respond";
import { getRecentWebhooks, recordWebhook } from "@/server/prx/webhook-store";
import { verifyPrxWebhookSignature } from "@/server/prx/webhook-verify";

/**
 * Inbound webhook receiver for PrescribeRx.
 *
 *   POST /api/prx/webhooks   ← PRX delivers events here (must be a public URL)
 *   GET  /api/prx/webhooks   → the app reads the recently-received deliveries
 *
 * NOTE: PRX will not deliver to localhost/private IPs — point the subscription
 * (created in the PRX portal, since our sandbox token lacks `webhook:write`) at
 * a public URL / tunnel and set PRX_WEBHOOK_SECRET to that subscription's secret.
 */
export const Route = createFileRoute("/api/prx/webhooks")({
  server: {
    handlers: {
      GET: async () => {
        return jsonOk({ events: getRecentWebhooks() });
      },
      POST: async ({ request }) => {
        // Signature is computed over the raw body, so read text (not .json()).
        const rawBody = await request.text();
        const signature =
          request.headers.get("X-PrescribeRx-Signature") ??
          request.headers.get("x-prescriberx-signature");

        const secret = getPrxWebhookSecret();
        const verified = secret
          ? verifyPrxWebhookSignature(rawBody, signature, secret)
          : false;

        // Reject spoofed deliveries once a secret is configured.
        if (secret && !verified) {
          return jsonError("Invalid webhook signature", 401);
        }

        let payload: unknown = rawBody;
        try {
          payload = rawBody ? JSON.parse(rawBody) : null;
        } catch {
          /* keep raw string */
        }

        let event = request.headers.get("X-PrescribeRx-Event") ?? "unknown";
        if (payload && typeof payload === "object" && "event" in payload) {
          const maybeEvent = (payload as { event: unknown }).event;
          if (typeof maybeEvent === "string" && maybeEvent.length > 0) event = maybeEvent;
        }

        recordWebhook({
          id: crypto.randomUUID(),
          event,
          receivedAt: new Date().toISOString(),
          verified,
          payload,
        });

        // 2xx acknowledges receipt so PRX won't retry.
        return jsonOk({ received: true, event, verified });
      },
    },
  },
});
