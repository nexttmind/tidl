# Sandbox — Full Connection Plan (after the meeting with Thomas)

Plain notes on what Thomas actually said, the corrected product idea, and what
"connect the whole site to the sandbox" means. Numbered so it is easy to follow.

---

## 1. What Thomas actually said (the big picture)

1. The **whole website** should be connected to the sandbox — **not only** the
   quiz, checkout, and patient details (which is all we connected so far).
2. His main points were:
   - **Peptides:** each peptide must have its **own PDP page**.
   - **The quiz questions** should come from the **sandbox / API** — not be
     written by us by hand.
3. So the website is the **front**, and the sandbox is the **source** for the
   products we market and for the intake questions.

---

## 2. The peptides (corrected product idea — important)

1. **The peptides are the main product.** Not the pen.
2. The **pen is a delivery method — a "gift" that comes with the peptide.** Its
   job is only *how to use the peptide*: you take the pen, load it, inject. That
   is it. So the pen is a **how-to-use** thing, not the thing we sell.
3. **We do NOT market all ~120 products.** Thomas has a **list of the specific
   peptides we are allowed to market.** We only build pages for that list, not
   the whole catalog.
4. On the site:
   - The **home page and all pages feature the peptides** as the main event.
   - Each marketed peptide has **its own PDP page** — info, price, what it does
     and what it does not do — with the pen shown inside it as the delivery /
     how-to-use method.

> Note: our current PDP is built around the pen. It needs to be reframed to be
> **per-peptide**, with the pen as the delivery method inside the page.

**Open question for us:** get the exact list of peptides Thomas wants to market
(and where that list lives — a sandbox field, a package, or a list he sends us).

---

## 3. The quiz questions come from the sandbox (new, important)

1. Thomas said the **quiz / intake questions should live on the sandbox (the
   API)** — so we must **pull them from PrescribeRx**, not hardcode our own.
2. In PrescribeRx, the intake questions belong to the **encounter type** (for
   example a weight-management / GLP-1 screening type). The likely source is
   `GET /telehealth/encounter-types` (and the per-type question fields).
3. So the plan for the quiz becomes:
   - Read the encounter type + its questions from the API.
   - Render those questions in the TIDL quiz UI.
   - Send the answers back in the unified intake (as we already do).
4. This keeps our quiz always in sync with what the doctor actually needs.

**Open question for us:** confirm the exact endpoint/shape that returns the
intake questions per encounter type.

---

## 4. What we already have today

1. Quiz → checkout → one call (`/telehealth/intake/unified`) → creates the
   Patient, Encounter, and payment record. This works.
2. One **sales-org token**, kept on the server, with our own `/api/prx/...`
   routes.
3. A webhook receiver ready for status updates.

So today only the **single GLP-1 checkout path** is wired, and the quiz
questions are **hardcoded** (which is what needs to change per section 3).

---

## 5. The full sandbox scope (what "whole site connected" can include)

From the admin screens and the API. Each is either something the **website
shows** or something that **runs behind it**.

### 5.1 Website-facing

1. **Products & Pricing** (`GET /catalog`, `GET /products`) — the marketed
   peptides + prices for the home, category, and per-peptide PDP pages.
2. **Packages** (`GET /packages`) — bundles / offers.
3. **Subscriptions** — the recurring plans inside packages.
4. **Coupon Codes** — discounts at checkout.
5. **Orders** (`GET /orders`) — order + payment + shipping status on the
   confirmation and account pages.
6. **Telehealth / Encounters** — the visit status.
7. **Appointments / Lab Orders** — for peptides that need a visit or labs first.

### 5.2 Behind the site

1. **Providers** — review + prescribe inside the PRX portal (no TIDL page).
2. **Billing / Commission** — statements, refunds, sales-org back office.
3. **Webhooks** — real-time updates (section 7).
4. **Intake Embeds / Onboarding Links / Integrations** — alternative PRX-hosted
   flows and org setup.

---

## 6. How payment works (ties to the two stages)

1. **At launch:** the charge is recorded on PRX as **`reference_captured`** — it
   already happened, PRX just records it for the receipt + status.
2. **Post-launch:** TIDL charges on its **own gateway (Stripe)**, then records
   the transaction to PRX, so PRX still shows "Paid", prepares the order, and
   ships.
3. For peptides: at intake we send the **product type** (e.g. `tirzepatide`),
   and the **provider picks the exact SKU + dose** when prescribing.

---

## 7. Real-time updates (webhooks)

1. The sandbox fires **27 events** across encounters, orders, fulfillment,
   labs, prescriptions, subscriptions, patients, and appointments.
2. We subscribe to the ones we care about (order placed/paid, shipped,
   delivered, prescribed, subscription renewed/failed) so the account updates
   itself instead of polling.

---

## 8. What this changes on the site

1. **Home + category pages:** feature the **marketed peptides** (from the
   sandbox) as the main product, with prices.
2. **PDP:** one page **per peptide**, pulled from the sandbox — info, price,
   what it does / does not do — with the pen as the delivery / how-to-use part.
3. **Quiz:** questions pulled from the **sandbox encounter type**, not hardcoded.
4. **Checkout:** supports packages + subscriptions + coupons.
5. **Account / confirmation:** real orders + status, updated by webhooks.

---

## 9. What we need to figure out next

1. Get the **list of peptides** Thomas wants to market (and where it lives).
2. Confirm the **API source for the quiz questions** (encounter-type questions).
3. Read the live products + encounter-type data from the sandbox to see the real
   shape before building.

---

## 10. One line

The whole site connects to the sandbox. The peptides are the product (the pen is
just how you take them), each marketed peptide gets its own PDP, and the quiz
questions come from the sandbox API — not hardcoded.
