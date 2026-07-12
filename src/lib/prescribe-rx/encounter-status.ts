import type { OrderStatus } from "@/types/order";

/**
 * The lifecycle status of a PRX encounter as returned by GET /encounters/{id}.
 * Sandbox observed values include `pending_provider_review`; the full set spans
 * intake → review → prescribed → completed (plus cancelled).
 */
export type PrxEncounter = {
  id: string;
  encounter_number: string;
  status: string;
  status_label?: string;
  reason_for_visit?: string | null;
  chief_complaint?: string | null;
  is_sandbox?: boolean;
  order_id?: string | null;
  assigned_at?: string | null;
  started_at?: string | null;
  prescribed_at?: string | null;
  completed_at?: string | null;
  cancelled_at?: string | null;
  created_at?: string;
  updated_at?: string;
  encounter_type?: { id: string; name?: string; slug?: string } | null;
  patient?: Record<string, unknown> | null;
  prescriptions?: unknown[];
};

export type PrxEncounterResponse = { data: PrxEncounter };

/** Laravel-style paginator envelope returned by GET /encounters. */
export type PrxPaginated<T> = {
  data: T[];
  total: number;
  current_page: number;
  last_page: number;
  per_page: number;
};

export type PrxEncountersResponse = { data: PrxPaginated<PrxEncounter> };

/**
 * Collapse the many PRX encounter/order states into the 5-step timeline the UI
 * renders. Anything pre-prescription maps to physician review; a shipped/
 * delivered fulfillment (surfaced via order status) advances past that.
 */
export function prxStatusToOrderStatus(status: string | undefined | null): OrderStatus {
  switch ((status ?? "").toLowerCase()) {
    case "prescribed":
    case "provider_signed":
      return "prescription_approved";
    case "order_placed":
    case "order_paid":
    case "fulfillment_processing":
    case "pharmacy_preparing":
      return "pharmacy_preparing";
    case "shipped":
    case "fulfillment_shipped":
      return "shipped";
    case "delivered":
    case "fulfillment_delivered":
    case "completed":
      return "delivered";
    default:
      // pending_intake, unassigned, pending_provider_review, provider_in_progress, …
      return "physician_review";
  }
}

/** Human label with a sensible fallback derived from the raw status token. */
export function prxStatusLabel(encounter: Pick<PrxEncounter, "status" | "status_label">): string {
  if (encounter.status_label) return encounter.status_label;
  return (encounter.status ?? "")
    .split("_")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
