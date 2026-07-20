# Integration & Deployment Plan

**Updated:** 21 July 2026  
**Audience:** TIDL team + stakeholder check-in on PrescribeRx end-to-end backend  
**Live demo:** https://tidltest.netlify.app  
**PRX health:** https://tidltest.netlify.app/api/prx/health  

---

## Stakeholder ask (plain English)

1. **PrescribeRx sandbox backend** — intake, patient, encounter, payment record flowing to PRX (AWS-hosted HIPAA platform).
2. **Attribution** — Google + Meta tags so we know where traffic came from.
3. **Funnel visibility** — how far someone gets (landing → quiz → checkout → order).
4. **Checkout / cards** — sandbox checkout completes with test card UI; payment recorded in PRX as external reference capture.

---

## Current status (honest)

| Area | Status | Notes |
|------|--------|-------|
| PRX API proxy (`/api/prx/*`) | ✅ Live | Token server-side only; health 200 on Netlify |
| Unified checkout → PRX | ✅ Works | `POST /telehealth/intake/unified` creates Patient + Encounter + payment |
| Medication **Order** in PRX | ❌ Blocked | No provider assigned to TIDL Sandbox org — PRX must fix |
| Real card charge (Stripe) | ❌ Not built | Sandbox uses `reference_captured` — UI only, no PAN sent to PRX |
| Google Tag Manager | 🟡 Scaffold | Loads when `VITE_GTM_ID` set in env |
| Meta Pixel | 🟡 Scaffold | Loads when `VITE_META_PIXEL_ID` set in env |
| UTM / referrer capture | ✅ Implemented | Session storage + attached to every analytics event |
| Funnel step events | ✅ Implemented | page_view, quiz_*, checkout_*, purchase |
| TIDL data layer (Overview) | ❌ Future | Separate from PRX PHI; not in this repo yet |
| Dynamic quiz → checkout bridge | ✅ This deploy | Quiz now saves state and routes to `/checkout` |

---

## Four workstreams

### 1. Attribution (Google + Meta + UTM)

**Goal:** See `utm_source`, `utm_campaign`, `gclid`, `fbclid`, and referrer on every funnel event.

**Implementation:**
- `src/lib/analytics/attribution.ts` — capture on first page load, persist in `sessionStorage`
- `src/lib/analytics/track.ts` — push to `dataLayer` (GTM) + `fbq` (Meta) when configured
- `src/components/analytics/AnalyticsBootstrap.tsx` — init tags, route page views
- Env: `VITE_GTM_ID`, `VITE_META_PIXEL_ID`

**Deploy steps:**
1. Create GTM container → paste ID in Netlify `VITE_GTM_ID`
2. Create Meta Pixel → paste ID in Netlify `VITE_META_PIXEL_ID`
3. In GTM, map custom events: `quiz_started`, `quiz_step`, `checkout_started`, `purchase`, etc.
4. Redeploy Netlify

**Verify:** Open `?utm_source=test&utm_campaign=july` → DevTools → `sessionStorage['tidl-attribution-v1']` → complete quiz → `dataLayer` events include UTMs.

---

### 2. Funnel tracking

**Goal:** Know how far each visitor gets through the funnel.

**Events (client → GTM dataLayer + Meta where mapped):**

| Event | When |
|-------|------|
| `page_view` | Route change |
| `quiz_started` | Modal opens |
| `quiz_step` | Dynamic quiz screen advance |
| `quiz_completed` | Quiz finished → checkout CTA |
| `checkout_started` | `/checkout` with valid quiz |
| `checkout_submitted` | Form submit |
| `purchase` | PRX checkout success (confirmation) |
| `checkout_failed` | PRX error |

**Optional server log:** `POST /api/funnel/event` (in-memory demo store) for debugging before TIDL data layer exists.

**Not in scope yet:** Email/SMS abandoned-cart, server-side conversion API (CAPI) — needs Meta business setup.

---

### 3. Checkout security (strip card PAN)

**Goal:** Card fields are UI-only for sandbox; never send PAN/CVC to our server or PRX.

**Implementation:**
- Client: `sanitizeCheckoutForServer()` strips `cardNumber`, `cardExpiry`, `cardCvc` before `POST /api/prx/checkout`
- Server: `stripSensitiveCheckoutFields()` in checkout route (defense in depth)
- PRX still receives `payment.mode: reference_captured` with amount + transaction id only

---

### 4. PRX provider assignment (external — PRX action)

**Goal:** Encounters move from Unassigned → Reviewed → Prescribed → **Medication Order**.

**Blocker:** Org **TIDL Sandbox** (`ORG-7144184834`) has no assignable provider in admin.

**Action:** Send `message-to-prx-provider-assignment.md` to Andrew / PrescribeRx support.

**We cannot fix this in code** — only PRX can attach a verified multi-state provider to the org.

---

## End-to-end test script (for stakeholder demo)

1. Open https://tidltest.netlify.app/?utm_source=demo&utm_medium=stakeholder
2. Start quiz (Weight loss / GLP-1)
3. Complete all screens → **Continue to checkout**
4. Checkout: prefilled test card `4111 1111 1111 1111`, fill shipping, accept terms
5. Submit → confirmation with **Encounter #** and **Patient #**
6. PRX admin → TIDL Sandbox → Encounters / Patients → match numbers (Source: Api)
7. GTM Preview / Meta Events Manager → see funnel events with UTMs

**Expected failure (known):** Medication **Orders** tab stays empty until provider assigned.

---

## Netlify env checklist

| Variable | Required | Purpose |
|----------|----------|---------|
| `PRX_API_TOKEN` | ✅ | Sandbox API (rotate ~12h) |
| `PRX_API_BASE_URL` | Optional | Defaults to demo.prescribe-rx.com |
| `PRX_WEBHOOK_SECRET` | Recommended | Webhook HMAC |
| `VITE_GTM_ID` | For attribution | GTM-XXXXXXX |
| `VITE_META_PIXEL_ID` | For attribution | Numeric pixel ID |

---

## Rollout phases

| Phase | What |
|-------|------|
| **Now (this deploy)** | Analytics scaffold, funnel events, quiz→checkout bridge, PAN stripping, docs |
| **After GTM/Pixel IDs** | Configure tags in GTM + Meta; verify attribution in ad dashboards |
| **After PRX provider** | Orders appear; enable webhooks in PRX admin → `/api/prx/webhooks` |
| **Pre-production** | Real Stripe or PRX Embed `authorize`; TIDL data layer; Meta CAPI |

---

## Reply template for stakeholder

> Yes — the end-to-end PrescribeRx sandbox backend is set up and working through checkout: quiz → checkout → unified intake creates a real Patient and Encounter in TIDL Sandbox with a payment record. You can verify at tidltest.netlify.app/api/prx/health (all green). Medication orders are waiting on PRX assigning a provider to our sandbox org. We've now added UTM capture, GTM/Meta scaffolding, and funnel events so once you send us the GTM container ID and Meta Pixel ID we can see source and step-through in analytics. Card fields are sandbox UI only — PRX records reference capture, no real charge yet.
