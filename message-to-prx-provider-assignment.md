# Request: Assign provider to TIDL Sandbox

**To:** Andrew / PrescribeRx support  
**From:** TIDL engineering  
**Org:** TIDL Sandbox — `ORG-7144184834`  
**Date:** 21 July 2026  

---

## What we need

Please **assign a verified, multi-state telehealth provider** to the **TIDL Sandbox** sales organization so encounters can move from **Unassigned** → **Reviewed** → **Prescribed** → **Medication Order**.

## What already works

Our site (https://tidltest.netlify.app) successfully submits checkout via:

`POST /telehealth/intake/unified`

This creates:

- ✅ Patient (visible in PRX admin, Source: Api)
- ✅ Encounter (e.g. ENC-8980179717, ENC-8617840669)
- ✅ Payment record (`reference_captured`, sandbox)

Example patients: `PAT-4445843178`, `PAT-2995669706`.

## What is blocked

When we open **Assign Provider** on a TIDL Sandbox encounter, the provider list is **empty**.

Verified providers under other orgs (e.g. Demo Sales Org / Doctor Feelgood) cannot be selected for TIDL Sandbox from our side.

**Result:** Encounters stay **Unassigned**. The **Orders** tab never receives medication orders — only Patients and Encounters populate.

## Ask

1. Attach at least one **verified multi-state provider** (licensed for patient states such as CA, GA, NY) to **TIDL Sandbox** (`ORG-7144184834`).
2. Confirm whether we should use a specific provider NPI for demo reviews.
3. Confirm webhook subscription can point to:  
   `https://tidltest.netlify.app/api/prx/webhooks`  
   (API subscription creation returned 403 for our token — OK to configure in admin?)

## Why this matters

Stakeholders need to demo the **full** clinical pipeline — not just intake — including provider review, prescribe, and pharmacy order creation.

Thank you.
