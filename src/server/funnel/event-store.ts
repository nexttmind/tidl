/**
 * In-memory funnel event log for demo / debugging until TIDL data layer exists.
 * Resets on cold serverless starts — not durable storage.
 */

export type FunnelEventRecord = {
  id: string;
  event: string;
  params: Record<string, unknown>;
  attribution: Record<string, unknown>;
  receivedAt: string;
};

const MAX = 200;
const records: FunnelEventRecord[] = [];

export function recordFunnelEvent(
  event: string,
  params: Record<string, unknown>,
  attribution: Record<string, unknown>,
): FunnelEventRecord {
  const record: FunnelEventRecord = {
    id: crypto.randomUUID(),
    event,
    params,
    attribution,
    receivedAt: new Date().toISOString(),
  };
  records.unshift(record);
  if (records.length > MAX) records.length = MAX;
  return record;
}

export function getRecentFunnelEvents(limit = 50): FunnelEventRecord[] {
  return records.slice(0, limit);
}
