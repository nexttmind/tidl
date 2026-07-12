# Login Flow — Accounts & Patient Portal

Plain-language plan for TIDL login, signup, and a **patient portal** page that
only works when a user is logged in — and how it connects to PrescribeRx.

---

## 1. The idea in one line

**TIDL handles the login. PrescribeRx holds the medical data. We link the two
by the patient's email / `patient_chart_id`, and show their treatment status on
a protected Patient Portal page.**

---

## 2. The pages involved

| Page | Who can see it | Purpose |
|------|----------------|---------|
| `/auth` (Sign in / Join) | Everyone | Log in or create an account |
| `/account` (Patient Portal) | **Logged-in users only** | See their orders, encounter status, treatment |
| Everything else (landing, quiz, PDP) | Everyone | Public marketing + funnel |

The **Patient Portal** is the new "protected" page. If you're not logged in,
you get sent to `/auth`.

---

## 3. Who owns what

| Thing | Owned by | Why |
|-------|----------|-----|
| Login + password | **TIDL** | PRX isn't built to be our website login |
| Patient chart, encounters, orders | **PrescribeRx** | It's the medical system |
| The link between them | **TIDL** stores `patient_chart_id` on the account | So we can fetch that patient's data |

---

## 4. Signup logic (create account)

```
User fills signup form: first name, last name, email, password
        ↓
TIDL server:
   - checks email isn't already used
   - hashes the password (never store plain text)
   - creates a TIDL account
   - starts a login session
        ↓
Account exists — but no PRX patient yet
(the PRX patient is created later, at checkout)
```

**Note:** signup alone does **not** call PrescribeRx. PRX only gets involved
once the person completes checkout (the medical intake).

---

## 5. Checkout logic (links TIDL account to PRX)

This already works today — we just add the "save the link" step.

```
User completes quiz + checkout
        ↓
TIDL → POST /telehealth/intake/unified (PRX)
        ↓
PRX returns: patient_chart_id, encounter_number, user_id
        ↓
TIDL saves patient_chart_id ON the logged-in account
        ↓
Now: TIDL account  ↔  PRX patient  (linked)
```

**Important rule:** use the **same email** at signup and checkout, or match on
email — otherwise the link can't be made.

---

## 6. Login logic (sign in)

```
User enters email + password
        ↓
TIDL server verifies the password (against the hashed value)
        ↓
If correct → start a session (secure cookie / token)
        ↓
Redirect to /account (Patient Portal)
```

If the password is wrong → show an error, no session.

---

## 7. Patient Portal logic (protected page)

```
User opens /account
        ↓
Is there a valid session?
     ├─ No  → redirect to /auth (must log in)
     └─ Yes → continue
        ↓
Does the account have a linked patient_chart_id?
     ├─ No  → show "No treatment yet — take the quiz"
     └─ Yes → TIDL server calls PRX (with sales-org token):
                 GET /patients/{chart_id}
                 GET /encounters?patient_chart_id={chart_id}
                 GET /orders (filtered to this patient)
        ↓
Show on the portal:
   - Patient name
   - Encounter status (e.g. "Physician review", "Prescribed")
   - Orders (once they exist)
   - Shipping / next refill
```

**The PRX token never goes to the browser** — the portal page asks the TIDL
server, and the server talks to PRX.

---

## 8. What the patient sees on the portal

| Section | Source |
|---------|--------|
| Welcome / name | TIDL account + PRX patient |
| Treatment / product | From the encounter |
| Status timeline | PRX encounter status (review → prescribed → shipped) |
| Orders | PRX orders (after a provider prescribes) |
| Next refill / shipping | PRX order data |

> Until a provider prescribes, the portal shows "In physician review" and no
> order yet — same as the current sandbox situation.

---

## 9. Session & security rules

1. **Hash passwords** — never store plain text (current localStorage version
   stores plain text; must change for real accounts).
2. **Session** — use a secure, HTTP-only cookie or signed token, not plain
   localStorage, so it can't be tampered with.
3. **PRX token stays server-side** — all PRX calls go through `/api/prx/*`.
4. **Only fetch the logged-in user's patient** — never expose other patients.
5. **Protect `/account`** — no session = redirect to `/auth`.

---

## 10. What needs to be built

| Step | What | Status |
|------|------|--------|
| 1 | Real account store (database or auth service, not localStorage) | ⬜ To do |
| 2 | Password hashing + secure sessions | ⬜ To do |
| 3 | Signup + login server routes | ⬜ To do |
| 4 | Save `patient_chart_id` on account at checkout | ⬜ To do |
| 5 | Protect `/account` (redirect if not logged in) | ⬜ To do |
| 6 | Server routes to fetch patient encounters/orders from PRX | ⬜ To do |
| 7 | Build the Patient Portal UI | ⬜ To do (basic page exists) |

---

## 11. Current state (for honesty)

Right now:
- `/auth` is **design-only** (button shows a toast, nothing saved).
- Accounts are created in **browser localStorage** at checkout.
- `/account` reads **localStorage**, not PRX.
- Passwords are stored in plain text (not safe for production).

So this document is the **plan** to turn that into a real, secure login +
patient portal connected to PrescribeRx.

---

## 12. Decisions needed before building

1. **Where to store accounts?** (options: a database, or an auth service like
   Supabase / Clerk / Auth0)
2. **Do patients log in before or after checkout?** (affects how we link them)
3. **Should login also work via Google/Apple?** (the buttons exist but are
   design-only)

---

## 13. One-line summary

**Signup/login live on TIDL (with a real DB + hashed passwords). At checkout we
save the PRX `patient_chart_id` on the account. The Patient Portal (`/account`)
is login-protected and pulls that patient's encounters and orders from
PrescribeRx through our server — the API token never touches the browser.**
