# Sandbox One — TIDL ↔ PrescribeRx Integration

A simple, plain-language summary of what we built, what we send to the
PrescribeRx sandbox, what we get back, and the one thing still blocking us.

---

## 1. The short version

- The **TIDL website** is connected to the **PrescribeRx sandbox**.
- When a user finishes the **quiz + checkout**, we send their info to PRX.
- PRX creates a **Patient** and an **Encounter** (a telehealth visit).
- We can **see the patients and encounters** in the PRX sandbox admin.
- We **cannot see Orders yet** — because **no provider is assigned** to our
  org, so no one can review + prescribe.

---

## 2. What connects to what

```
TIDL website  →  Quiz  →  Checkout  →  PrescribeRx Sandbox
  (marketing)   (local)   (API call)    (Patient + Encounter)
                                              ↓
                                     Provider reviews + prescribes
                                              ↓
                                          Order created
```

- **Landing page:** no API — just marketing content.
- **Quiz:** saved locally in the browser, nothing sent to PRX yet.
- **Checkout:** this is where we call the PRX API.
- **PRX admin:** where the patient/encounter show up.

---

## 3. Our sandbox account (what we use)

| Item | Value |
|------|-------|
| PRX Org name | **TIDL Sandbox** |
| Org number | **ORG-7144184834** |
| Org type | Sales Group / Sales Organization |
| Login email | `tidl@prescribe-rx.com` |
| API base URL | `https://demo.prescribe-rx.com/api/v1` |
| API token | one **sales-org token** stored as `PRX_API_TOKEN` |

> The sandbox token **rotates every ~12 hours**. If API calls start failing
> with `401`, generate a new token and update it.

**Where the token lives (never in the browser):**

| Place | Purpose |
|-------|---------|
| `.env.local` | local development |
| `.dev.vars` | local (Wrangler) |
| Netlify env var `PRX_API_TOKEN` | live site |

---

## 4. The main API call we use

Everything runs through **one PRX endpoint** at checkout:

```
POST /telehealth/intake/unified
```

This single call creates the **patient + encounter + payment record** in one shot.

**What we send (the important fields):**

| Field | Value we send |
|-------|---------------|
| `encounter_type_slug` | `glp-1-screening` |
| `product_type_slug` | `tirzepatide` |
| `is_sandbox` | `true` |
| `patient` | name, email, date of birth, phone, gender, shipping address |
| `vitals` | height, weight |
| `answers` | quiz answers (goal, sleep, exercise, etc.) |
| `payment` | `mode: reference_captured` (we charged on our side) |
| `consents` | telehealth consent |

**What PRX sends back:**

| Field | Example |
|-------|---------|
| `encounter_id` | `019f48ee-7772-...` |
| `encounter_number` | `ENC-8980179717` |
| `patient_chart_id` | `019f48ee-775d-...` |
| `patient_number` | `PAT-2995669706` |
| `status` | `unassigned` |

We show the **Encounter #** and **Patient #** on the TIDL confirmation page
so we can match them in the PRX admin.

---

## 5. Other API routes we built (behind our site)

All PRX calls go through our own server routes (`/api/prx/*`) so the token
stays private:

| Our route | PRX endpoint | Purpose |
|-----------|--------------|---------|
| `/api/prx/health` | `/products`, `/catalog`, `/me` | connection test |
| `/api/prx/catalog` | `/catalog` | full product catalog |
| `/api/prx/products` | `/products` | product list |
| `/api/prx/me` | `/me` | who the token belongs to |
| `/api/prx/patients` | `/patients` | list patients |
| `/api/prx/orders` | `/orders` | list orders |
| `/api/prx/checkout` | `/telehealth/intake/unified` | **main checkout** |
| `/api/prx/webhooks` | — | receive PRX status updates |

**Health check (proof it's connected):**
`https://tidltest.netlify.app/api/prx/health` → returns `healthy: true`

---

## 6. What we successfully put INTO the sandbox

Real data created from TIDL checkout, visible in **My Patients**:

| Patient # | Name | Email | State |
|-----------|------|-------|-------|
| PAT-4445843178 | Mohamad Abbas | mohammad.hsen.abbas@gmail.com | CA |
| PAT-2995669706 | Test Tester | test.glp1...@example.com | GA |

**Encounters created (via API, Sales Org = TIDL Sandbox):**

| Encounter # | Type | Status | Source |
|-------------|------|--------|--------|
| ENC-8980179717 | GLP-1 Screening | Unassigned | API |
| ENC-8617840669 | GLP-1 Screening | Unassigned | API |

> Both show **Source: Api** and **Sales Organization: TIDL Sandbox** in Admin —
> proof the TIDL → PRX checkout pipeline works end-to-end up to the encounter.

---

## 7. What we GET from the sandbox

- **Product catalog** (~120 products) — peptides, GLP-1, TRT, etc.
  This is PRX's inventory. We do **not** copy these onto the landing page.
  The website only markets **GLP-1** for now; the provider picks the exact
  product when they prescribe.
- **Account info** (`/me`) — confirms our token = TIDL Sandbox sales org.
- **Patients / Encounters** — everything checkout created.

---

## 8. About Lab Orders (not related to our checkout)

In the sandbox we also saw rows under **Lab Orders**:

| Lab Order # | Patient | Panel | Status |
|-------------|---------|-------|--------|
| LAB-2460020239 | Mohamad Abbas (PAT-4445843178) | Male TRT Monitoring Panel | Results Received |
| LAB-6007804928 | Mohamad Abbas (PAT-4445843178) | Male TRT Monitoring Panel | Cancelled |
| LAB-6890827062 | Test Tester (PAT-2995669706) | Male TRT Monitoring Panel | Cancelled |

**Important:** Lab Orders and **Orders** are different things.
- **Lab Orders** = blood/lab panels (TRT monitoring). These came from a
  different/manual flow, **not** our GLP-1 checkout.
- **Orders** = medication/product orders — still empty (see problem below).

---

## 9. The problem (what's blocking Orders)

**Everything works up to the encounter. Orders is empty because no provider
can prescribe.**

```
✅ Checkout works
✅ Patient created
✅ Encounter created (GLP-1 Screening)
✅ Payment recorded
❌ No provider assigned to TIDL Sandbox
❌ Encounter stays "Unassigned"
❌ No prescribe step → no Order
```

**Why:** In PrescribeRx, an **Order** is only created after a **provider**:
1. Is assigned to our organization,
2. Opens and reviews the encounter,
3. **Prescribes** the medication.

Our TIDL Sandbox shows: *"No provider has been assigned to your organization yet."*

**The provider detail:**
- The providers that exist (including the verified **Doctor Feelgood**,
  NPI 1043478878, 3 state licenses) are all under **Demo Sales Org LLC**,
  **not TIDL Sandbox**.
- The "New Provider" form needs a **real 10-digit NPI** (validated live),
  **state licenses**, and **activation** — and doesn't clearly let us attach
  the provider to TIDL Sandbox.
- So linking a provider to our org is a **PRX-side setup step**.

**CONFIRMED (Jul 11):** On encounter **ENC-8617840669** (created via API,
Sales Org = TIDL Sandbox), we clicked the **"Assign Provider"** button in
Admin. The list is **empty** — it says no provider is assigned to the TIDL
sales organization. This proves the "Assign Provider" button can only pick
from providers **already attached to our org**, and none are. We **cannot**
move Doctor Feelgood from Demo Sales Org into TIDL Sandbox ourselves — only
PRX can create that link.

```
Encounter (TIDL Sandbox) → "Assign Provider" → EMPTY list
                                                 ↑
                     No provider belongs to TIDL Sandbox yet (PRX must attach one)
```

---

## 10. What we need next

1. **PRX assigns a verified provider** to **TIDL Sandbox** (ORG-7144184834)
   — ideally Doctor Feelgood (verified, multi-state).
2. Provider **reviews** our encounter (e.g. ENC-8617840669).
3. Provider **prescribes** tirzepatide/GLP-1.
4. Then an **Order** should appear under **Orders → All Orders**.

**Note on state:** the provider must be **licensed in the patient's state**
(our tests used GA and CA), or the prescribe step will fail.

### Message to send Andrew (PRX engineer)

> Hi Andrew — quick blocker on the TIDL Sandbox integration.
>
> Our checkout is working: patients and encounters are being created via the
> API and show up correctly under **TIDL Sandbox** (e.g. encounter
> **ENC-8617840669**, Source: Api). The problem is there's **no provider
> attached to the TIDL Sandbox sales org (ORG-7144184834)**, so every
> encounter stays **Unassigned**. When we click **"Assign Provider"** in
> Admin, the list is empty, and we can't move an existing provider (like
> Doctor Feelgood) into our org ourselves.
>
> Could you **attach a verified, multi-state provider to TIDL Sandbox** so we
> can assign it to incoming encounters and complete the review → prescribe
> step? Once a provider is prescribing, orders should start flowing to us.
> Thanks!

---

## 11. Login / Signup — do they use the API?

**Short answer: not right now, and not needed for the demo.**

| Part | How it works today | Uses PRX API? |
|------|--------------------|---------------|
| `/auth` page (Sign in / Join) | **Design only** — the button shows a toast: *"authentication wiring comes next."* Nothing is saved. | ❌ No |
| Account creation at checkout | `registerFromQuiz()` saves the user in the **browser (localStorage)** | ❌ No |
| Staying logged in | Session stored in the browser (`tidl-session-v1`) | ❌ No |

**Important detail:** even though TIDL login is local, PrescribeRx **does**
create its own user during checkout. The unified intake response includes a
`user_id`, e.g.:

```
"user_id": "019f48ee-774c-728f-8340-85092b1a4a8c"
```

So each checkout already makes a PRX user — TIDL just doesn't log into it yet.

**Where do you see login/signup users?**

| Account created by | Where it lives | Where to see it |
|--------------------|----------------|------------------|
| TIDL signup / checkout | Browser localStorage | Only in that browser (TIDL `/account` page) |
| PRX user (from checkout) | PrescribeRx | Tied to the Patient in **My Patients** (TIDL Sandbox) |

So a "TIDL account" is **not** visible in the PRX admin as a login — you see
the **Patient** record instead. There is no separate users list from TIDL in
the sandbox.

**For a real patient portal later (optional):**
PRX offers `POST /auth/login`, which returns a user token so a patient could
log into TIDL and pull their own chart, encounters, and orders from PRX.
Not needed for the sandbox demo.

---

## 12. How the provider reviews notes and prescribes

This is the step that turns an **Encounter** into an **Order**. Good news:
**it does NOT need a new page on the TIDL website.** It all happens inside the
**PrescribeRx provider portal**, which PRX already provides.

### 12.1 Where the provider works (no TIDL page needed)

| Question | Answer |
|----------|--------|
| Does TIDL build a provider page? | **No.** The provider uses PrescribeRx's own portal. |
| Where does the provider log in? | The PRX provider portal (same platform, provider login). |
| What does TIDL do? | Just send the patient + encounter (already done at checkout). |
| What does TIDL get back? | An **Order** (via webhook / the `/orders` route) once prescribed. |

So the split is:
- **TIDL** = collect the patient, quiz answers, payment → create the encounter.
- **PrescribeRx portal** = where the provider reviews and prescribes.
- **TIDL** = receives the resulting order status back (patient portal / webhook).

### 12.2 What the provider sees and does

When a provider is assigned to **TIDL Sandbox**, they log into the PRX portal
and see our encounters in their queue. For each one:

```
1. Open the encounter (e.g. ENC-8980179717)
2. Review the PATIENT NOTES we already sent:
      - vitals (height, weight, BMI)
      - quiz answers (goal, health history, medications, allergies)
      - consents (telehealth consent)
      - shipping state (to confirm they're licensed there)
3. Decide: approve, deny, or ask for more info
4. If approved → PRESCRIBE the medication (e.g. tirzepatide)
      - pick the product + dosage from the PRX catalog
      - sign the prescription
5. PRX creates an ORDER → sends it to the pharmacy
```

> All the "patient notes" the provider reads are the exact fields we send in
> the unified intake (`vitals`, `answers`, `consents`). That's why collecting
> them correctly at checkout matters — it becomes the provider's chart.

### 12.3 How the provider gets identified / verified

A provider can't just prescribe — PrescribeRx verifies them first. This is
**handled on the PRX side**, not by TIDL. Identification includes:

| Requirement | What it is | Who provides it |
|-------------|-----------|-----------------|
| **NPI number** | 10-digit National Provider Identifier, validated live against the NPI Registry | The provider |
| **State licenses** | Proof they can practice in each patient's state | The provider |
| **DEA number** | Needed for controlled substances (optional for many GLP-1) | The provider |
| **Designation** | Physician / NP / PA, etc. | The provider |
| **Identity/account** | Name, email, phone → PRX provider login | PRX creates it |
| **Activation** | Status stays **PENDING** until PRX activates | **PRX admin** |

So a provider becomes "usable" only when: NPI validated → licenses added →
profile complete → **activated** by PRX → **assigned to TIDL Sandbox**.

### 12.4 The state-license rule (important)

The provider must be **licensed in the patient's state**. Our test patients
were in **CA** and **GA**, so the assigned provider must hold CA/GA licenses or
the prescribe step fails. This is the most common reason a valid encounter
still can't be prescribed.

### 12.5 What happens after they prescribe (back to TIDL)

```
Provider prescribes (in PRX portal)
        ↓
PRX creates an Order
        ↓
PRX sends a webhook → /api/prx/webhooks
        ↓
TIDL updates order status
        ↓
Patient sees it on the TIDL patient portal ("Prescribed / Shipped")
```

So the loop closes automatically — **no manual TIDL page for the provider**,
just the webhook + the patient portal to display the result.

### 12.6 Summary of the provider question

| Your question | Answer |
|---------------|--------|
| How does the provider review notes? | In the **PRX provider portal**, reading the vitals/answers/consents we sent. |
| Does it need a new page on TIDL? | **No** — PRX already has the provider portal. |
| How does the provider get identified? | NPI + state licenses + DEA + activation, all verified **on the PRX side**. |
| How does the prescription reach TIDL? | Via **webhook** → shown on the patient portal. |

---

## 12b. Peptide products — PDP pages wired to the sandbox catalog

The **peptides are the real products** (the pen is just a delivery device shipped
with orders). We pulled the live sandbox catalog and built **10 peptide PDP
pages** at `/products/<slug>`, plus the flagship GLP-1 page.

**The 10 peptides now live on the site:**

| Product | Category | PRX encounter | Route |
|---------|----------|---------------|-------|
| Retatrutide | Weight loss | `glp-1-screening` | `/products/retatrutide` |
| BPC-157 | Recovery | `peptide-assessment` | `/products/bpc-157` |
| TB-500 | Recovery | `peptide-assessment` | `/products/tb-500` |
| Wolverine (BPC-157/TB-500) | Recovery | `peptide-assessment` | `/products/wolverine` |
| CJC-1295 / Ipamorelin | Performance | `peptide-assessment` | `/products/cjc-1295-ipamorelin` |
| Tesamorelin | Performance | `peptide-assessment` | `/products/tesamorelin` |
| MOTS-C | Metabolic | `peptide-assessment` | `/products/mots-c` |
| NAD+ | Longevity | `peptide-assessment` | `/products/nad-plus` |
| GHK-Cu | Longevity | `peptide-assessment` | `/products/ghk-cu` |
| Sermorelin | Longevity | `peptide-assessment` | `/products/sermorelin` |

- Data source: `src/lib/peptides.ts` (single file — edit copy/price/mapping here).
- Category pages (`/category/*`) now list their peptides.
- The **home page stays marketing** (the pen); peptides live on PDPs only.

**Sandbox facts we confirmed pulling the catalog:**
- The catalog has **120 products** (real peptide names), scoped to **TIDL Sandbox**.
- **Prices are placeholders** (~$10 for almost everything in sandbox), so PDPs use
  our own marketing prices for now; real prices can come live from `/catalog` later.
- Image URLs from the catalog are **signed and expire in ~1 hour**, so PDPs use
  our own site images instead of the catalog image links.

### Two checkout caveats for peptides (need PRX to confirm)

These do **not** affect the GLP-1 flow (which works), but peptide **checkout**
has two open items:

1. **`product_type_slug` is a best guess.** The catalog only exposes a
   `product_type_id` (UUID), not a slug. We mapped each peptide to a sensible
   slug (e.g. `bpc-157`) that's **env-overridable**, but PRX should confirm the
   exact slugs so peptide orders attach to the right product.
2. **`peptide-assessment` requires an ID photo (`id_front`).** The peptide
   encounter's required fields include a government ID upload, which our current
   checkout doesn't collect. Until we add ID upload (or PRX relaxes it for
   sandbox), peptide checkout may be rejected. GLP-1 screening does **not**
   require this.

> Bottom line: the peptide **PDP marketing pages are fully live**; peptide
> **checkout** needs PRX to confirm product slugs and clarify the ID-photo rule.

---

## 13. Summary in one line

**TIDL checkout → `POST /telehealth/intake/unified` → Patient + Encounter in
TIDL Sandbox (works). The provider reviews and prescribes inside PrescribeRx's
own portal (no TIDL page needed); once PRX assigns a verified provider, an
Order is created and sent back to TIDL.**
