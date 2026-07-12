import type {
  PrxEncounterTypeSchemaResponse,
  PrxEncounterTypesResponse,
} from "./encounter-schema";
import type {
  PrxEncounter,
  PrxEncounterResponse,
  PrxEncountersResponse,
} from "./encounter-status";

type ApiSuccess<T> = { ok: true; data: T };
type ApiFailure = { ok: false; error: string; details?: unknown };

async function parseApiResponse<T>(response: Response): Promise<T> {
  const payload = (await response.json()) as ApiSuccess<T> | ApiFailure;
  if (!response.ok || !payload.ok) {
    const details =
      !payload.ok && payload.details && typeof payload.details === "object"
        ? (payload.details as { message?: unknown }).message
        : undefined;
    const message =
      !payload.ok
        ? typeof details === "string" && details.length > 0
          ? details
          : payload.error
        : `Request failed (${response.status})`;
    throw new Error(message);
  }
  return payload.data;
}

export async function fetchPrxHealth() {
  const response = await fetch("/api/prx/health");
  return parseApiResponse<{
    configured: boolean;
    baseUrl: string;
    checks: Record<string, { status: number; ok: boolean }>;
  }>(response);
}

export async function fetchPrxProducts() {
  const response = await fetch("/api/prx/products");
  return parseApiResponse<unknown>(response);
}

export async function fetchPrxCatalog() {
  const response = await fetch("/api/prx/catalog");
  return parseApiResponse<unknown>(response);
}

export type PrxCatalogPricing = {
  retail_price?: number;
  wholesale_price?: number;
  consumer_price?: number;
  price?: number;
  price_type?: string;
};

export type PrxCatalogProduct = {
  id: string;
  name: string;
  sku: string | null;
  description: string | null;
  shortDescription: string | null;
  imageUrl: string | null;
  rxRequired: boolean;
  isActive: boolean;
  productClassId: string | null;
  productTypeId: string | null;
  pricing: PrxCatalogPricing;
  /** Customer-facing price in dollars (consumer → retail → base price). */
  price: number | null;
};

type RawCatalogProduct = {
  id: string;
  name: string;
  sku?: string | null;
  description?: string | null;
  short_description?: string | null;
  image_url?: string | null;
  rx_required?: boolean;
  is_active?: boolean;
  product_class_id?: string | null;
  product_type_id?: string | null;
  pricing?: PrxCatalogPricing;
};

function normalizeCatalogProduct(raw: RawCatalogProduct): PrxCatalogProduct {
  const pricing = raw.pricing ?? {};
  const price =
    pricing.consumer_price ?? pricing.retail_price ?? pricing.price ?? null;
  return {
    id: raw.id,
    name: raw.name,
    sku: raw.sku ?? null,
    description: raw.description ?? null,
    shortDescription: raw.short_description ?? null,
    imageUrl: raw.image_url ?? null,
    rxRequired: Boolean(raw.rx_required),
    isActive: raw.is_active !== false,
    productClassId: raw.product_class_id ?? null,
    productTypeId: raw.product_type_id ?? null,
    pricing,
    price,
  };
}

/**
 * Normalized, customer-facing catalog products from the sandbox.
 * This is the data layer for future product/PDP pages — each item carries a
 * resolved `price` (consumer → retail → base) and a (time-limited) image URL.
 */
export async function fetchPrxCatalogProducts(): Promise<PrxCatalogProduct[]> {
  const raw = await fetchPrxCatalog();
  // Envelope: { success, data: { scope, products, packages }, meta }
  const container =
    raw && typeof raw === "object" && "data" in raw
      ? (raw as { data?: { products?: RawCatalogProduct[] } }).data
      : undefined;
  const products = container?.products ?? [];
  return products.filter((p) => p && p.id && p.name).map(normalizeCatalogProduct);
}

export type PrxCheckoutRequest = {
  quiz: import("@/types/quiz").QuizFormData;
  checkout: import("@/types/order").CheckoutFormData;
  product: {
    slug: string;
    name: string;
    monthlyPrice: number;
    dosage: string;
    goal: import("@/types/quiz").GoalId | null;
  };
};

export type PrxCheckoutResult = {
  intake: unknown;
  path: string;
  encounterId?: string;
  encounterNumber?: string;
  patientNumber?: string;
  patientChartId?: string;
  orderId?: string;
  idempotencyKey: string;
};

export async function submitPrxCheckout(body: PrxCheckoutRequest, idempotencyKey: string) {
  const response = await fetch("/api/prx/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify(body),
  });
  return parseApiResponse<PrxCheckoutResult>(response);
}

/** List the encounter types available to our tenant (each carries its own intake schema). */
export async function fetchPrxEncounterTypes() {
  const response = await fetch("/api/prx/encounter-types");
  return parseApiResponse<PrxEncounterTypesResponse>(response);
}

/**
 * Fetch the full intake schema (steps + fields + options) for an encounter type.
 * This is the source of truth for the dynamic quiz — render from `steps`/`fields`
 * and submit answers keyed by each field's `slug`.
 */
export async function fetchPrxEncounterTypeSchema(encounterTypeId: string) {
  const response = await fetch(
    `/api/prx/encounter-types/${encodeURIComponent(encounterTypeId)}/schema`,
  );
  return parseApiResponse<PrxEncounterTypeSchemaResponse>(response);
}

export type PrxDynamicIntakeResult = {
  intake: unknown;
  encounterId?: string;
  encounterNumber?: string;
  patientNumber?: string;
  patientChartId?: string;
  idempotencyKey: string;
};

/** Submit the dynamic quiz's slug-keyed answers → creates a PRX patient + encounter. */
export async function submitPrxDynamicIntake(
  encounterTypeId: string,
  answers: Record<string, unknown>,
) {
  const response = await fetch("/api/prx/intake-dynamic", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": crypto.randomUUID(),
    },
    body: JSON.stringify({ encounterTypeId, answers }),
  });
  return parseApiResponse<PrxDynamicIntakeResult>(response);
}

/** Live status of a single encounter (GET /encounters/{id}). */
export async function fetchPrxEncounter(encounterId: string) {
  const response = await fetch(`/api/prx/encounters/${encodeURIComponent(encounterId)}`);
  const data = await parseApiResponse<PrxEncounterResponse>(response);
  return data.data;
}

/** List encounters in our org tree (paginated). */
export async function fetchPrxEncounters(params?: Record<string, string | number>) {
  const qs = params
    ? `?${new URLSearchParams(
        Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])),
      ).toString()}`
    : "";
  const response = await fetch(`/api/prx/encounters${qs}`);
  const data = await parseApiResponse<PrxEncountersResponse>(response);
  return data.data;
}

/** Orders in our org tree (GET /orders). Shape is passthrough from PRX. */
export async function fetchPrxOrders() {
  const response = await fetch("/api/prx/orders");
  return parseApiResponse<unknown>(response);
}

export async function fetchPrxOrder(orderId: string) {
  const response = await fetch(`/api/prx/orders/${encodeURIComponent(orderId)}`);
  return parseApiResponse<unknown>(response);
}

export type PrxAuthMe = {
  user: {
    id: string;
    name: string;
    email: string;
    first_name: string;
    last_name: string;
    user_type: string;
    user_type_label: string;
    patient_chart_id: string | null;
  };
  abilities: string[];
};

/** Identity + abilities of the connected PRX token. */
export async function fetchPrxAuthMe() {
  const response = await fetch("/api/prx/auth/me");
  const data = await parseApiResponse<{ data?: PrxAuthMe } | PrxAuthMe>(response);
  return (data && typeof data === "object" && "data" in data ? data.data : data) as PrxAuthMe;
}

export type PrxWebhookRecord = {
  id: string;
  event: string;
  receivedAt: string;
  verified: boolean;
  payload: unknown;
};

/** Recently-received webhook deliveries observed by our receiver. */
export async function fetchPrxRecentWebhooks() {
  const response = await fetch("/api/prx/webhooks");
  const data = await parseApiResponse<{ events: PrxWebhookRecord[] }>(response);
  return data.events;
}

/** The catalog of event types PRX can deliver. */
export async function fetchPrxWebhookEventTypes() {
  const response = await fetch("/api/prx/webhooks/event-types");
  return parseApiResponse<unknown>(response);
}

export type { PrxEncounter };

export async function savePrxIntake(quiz: import("@/types/quiz").QuizFormData, step: number) {
  const response = await fetch("/api/prx/intake", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quiz, step }),
  });
  return parseApiResponse<unknown>(response);
}
