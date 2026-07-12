# Last Edit — Sandbox Integration

This document summarizes the work done to connect the TIDL website to the
PrescribeRx sandbox beyond the assessment/intake flow. Everything below is
implemented, type-checks cleanly, and was verified against the live sandbox and
the running dev server.

Priorities were implemented top-to-bottom: **P1 Webhooks → P2 Live status →
P3 Account/Auth → P4 Consents → P5 Catalog data layer.**

---

## P1 — Webhooks

A receiver that PrescribeRx can deliver events to, with signature verification.

**New files**

- `src/server/prx/webhook-verify.ts` — verifies the `X-PrescribeRx-Signature`
  header as an HMAC-SHA256 over the **raw** request body (timing-safe compare).
- `src/server/prx/webhook-store.ts` — in-memory ring buffer (last 50 deliveries)
  so the app can observe live events without a database.
- `src/routes/api/prx/webhooks.ts`
  - `POST /api/prx/webhooks` — receives events, verifies the signature (when a
    secret is set), records the delivery, and returns `2xx` to acknowledge.
  - `GET /api/prx/webhooks` — returns recently-received deliveries to the app.
- `src/routes/api/prx/webhooks.event-types.ts` — `GET /api/prx/webhooks/event-types`
  read-only passthrough of the event catalog (Encounters, Orders, Fulfillment,
  Labs, Prescriptions, Subscriptions, Patients, Appointments).

**Edited**

- `src/lib/prescribe-rx/env.ts` — added `getPrxWebhookSecret()` (reads
  `PRX_WEBHOOK_SECRET`).
- `.env.local` — added a documented placeholder for `PRX_WEBHOOK_SECRET`.

**Important limitation**

- Creating the webhook **subscription** via API returns `403` — our sandbox
  token lacks the `webhook:*` ability. The subscription must be created in the
  **PRX portal**, pointed at a **public URL** (PRX will not deliver to
  localhost/private IPs), with its signing secret set as `PRX_WEBHOOK_SECRET`.
  The receiver is ready and waiting.

---

## P2 — Live encounter status (highest testable value)

Real-time review/prescribe status polled from the sandbox and shown in the UI.

**New files**

- `src/lib/prescribe-rx/encounter-status.ts` — `PrxEncounter` types, the
  `PrxPaginated` envelope, `prxStatusToOrderStatus()` (collapses PRX states into
  the 5-step timeline) and `prxStatusLabel()`.
- `src/routes/api/prx/encounters.ts` — `GET /api/prx/encounters` (paginated list).
- `src/routes/api/prx/encounters.$encounterId.ts` — `GET /api/prx/encounters/{id}`
  (single encounter status).
  - Correction: the working path is `/encounters/{id}`; the `/telehealth/encounters/{id}`
    variant returns 404.
- `src/hooks/use-prx-encounter-status.ts` — polls every 15s, pauses when the tab
  is hidden, and stops on terminal states (completed/delivered/cancelled).

**Edited**

- `src/routes/confirmation.tsx` — polls the linked encounter and shows a live
  status badge + a live-driven care timeline (falls back to local status if the
  live call fails).
- `src/components/quiz/dynamic/DynamicQuiz.tsx` — finish screen now shows a live
  status row after the intake is submitted.
- `src/components/checkout/checkout.css` — `.checkout-live-status` + pulsing
  `.checkout-live-dot` styles.
- `src/components/quiz/dynamic/dynamic-quiz.css` — `.dq-live-status` / `.dq-live-dot`
  styles.

---

## P3 — Account + real PrescribeRx data

**New files**

- `src/routes/api/prx/auth.me.ts` — `GET /api/prx/auth/me` (connected token
  identity + abilities).
- `src/components/account/PrxActivityCard.tsx` — a "Care activity" card that
  pulls **real encounters** from the sandbox (`GET /encounters`) and shows each
  one's live status.

**Edited**

- `src/routes/account/index.tsx` — the account timeline now reflects live PRX
  status when an encounter is linked, and renders the new `PrxActivityCard`.
- `src/components/account/account.css` — styles for the live tag, activity list,
  and per-item status.

**Important limitation**

- Real **patient login** / `GET /me/patient/dashboard` returns 404 with our
  sales-org token (it needs a patient-scoped token). So the account view is
  driven by the org's real encounters/orders rather than a patient session.

---

## P4 — Structured consents

**Edited**

- `src/server/prx/mappers.ts` — checkout now records a telehealth consent on
  either the assessment notice **or** the checkout terms acceptance.
- `src/server/prx/schema-intake.ts` — the dynamic-quiz intake now attaches a
  telehealth consent on submit (opt-out via an option flag).

---

## P5 — Catalog data layer (landing wiring deferred)

**Edited**

- `src/lib/prescribe-rx/browse-api.ts` — added `fetchPrxCatalogProducts()` which
  returns normalized products (resolved `price`: consumer → retail → base, plus
  image, sku, rx flag) from the 120-product catalog.

**Decision**

- Landing wiring is intentionally deferred. The entire catalog is peptides (e.g.
  "5 AMINO 1MQ - 10 mg") with time-limited image URLs, and the instruction was to
  **not** put peptides on the landing yet. The data layer is ready to power the
  per-peptide PDPs when needed.

---

## Client fetchers & exports

**Edited**

- `src/lib/prescribe-rx/browse-api.ts` — added client fetchers:
  `fetchPrxEncounter`, `fetchPrxEncounters`, `fetchPrxOrders`, `fetchPrxOrder`,
  `fetchPrxAuthMe`, `fetchPrxRecentWebhooks`, `fetchPrxWebhookEventTypes`,
  `fetchPrxCatalogProducts`.
- `src/lib/prescribe-rx/index.ts` — re-exported all new fetchers, status
  helpers, and types.

---

## New API endpoints (summary)

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/api/prx/webhooks` | Receive + verify PRX webhook deliveries |
| GET | `/api/prx/webhooks` | Read recently-received deliveries |
| GET | `/api/prx/webhooks/event-types` | Event catalog passthrough |
| GET | `/api/prx/encounters` | List encounters (paginated) |
| GET | `/api/prx/encounters/{id}` | Single encounter live status |
| GET | `/api/prx/auth/me` | Connected token identity + abilities |

---

## Verification

- `npx tsc --noEmit` — all new/changed files are clean (remaining errors are
  pre-existing `/category/*` link-path mismatches, unrelated to this work).
- Live sandbox checks (dev server on `:8081`):
  - `/api/prx/webhooks` → `{ events: [] }`
  - `/api/prx/webhooks/event-types` → full catalog
  - `/api/prx/encounters` → 6 real encounters
  - `/api/prx/encounters/{id}` → `pending_provider_review` / "Pending Provider Review"
  - `/api/prx/auth/me` → connected "TIDL Sandbox" identity
- Route smoke test: `/`, `/confirmation`, `/account` all return 200.

---

## Environment

Add to `.env.local` once a subscription exists in the PRX portal:

```
PRX_WEBHOOK_SECRET=<subscription signing secret>
```

When set, `POST /api/prx/webhooks` rejects deliveries with an invalid signature.
