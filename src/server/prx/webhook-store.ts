/**
 * Tiny in-memory ring buffer of the most-recent webhook deliveries.
 *
 * This is deliberately ephemeral (survives only until the server restarts) —
 * it exists so the app can *observe* live PRX events (encounter.prescribed,
 * order.placed, fulfillment.shipped, …) during a demo without a database. A
 * production build would persist these and fan them out to the right patient.
 */

export type PrxWebhookRecord = {
  id: string;
  event: string;
  receivedAt: string;
  verified: boolean;
  /** Parsed JSON payload when the body was JSON, otherwise the raw string. */
  payload: unknown;
};

const MAX_RECORDS = 50;
const records: PrxWebhookRecord[] = [];

export function recordWebhook(record: PrxWebhookRecord): void {
  records.unshift(record);
  if (records.length > MAX_RECORDS) records.length = MAX_RECORDS;
}

export function getRecentWebhooks(limit = MAX_RECORDS): PrxWebhookRecord[] {
  return records.slice(0, limit);
}

/** Latest delivery for a given event name (e.g. the most recent shipment). */
export function getLatestWebhookByEvent(event: string): PrxWebhookRecord | undefined {
  return records.find((r) => r.event === event);
}
