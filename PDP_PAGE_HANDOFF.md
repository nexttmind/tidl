# PDP (Product Page) — How We Built It

**For:** TIDL Product Manager
**Page:** GLP-1 Weight Loss product page
**URL:** `/products/glp-1-weight-loss`
**Stack:** React + TanStack Router, CSS (`pdp.css` + shared `home.css` for header/footer), Framer Motion for animation

---

## The short version

The PDP is built as **one scrolling story**, not a spec sheet. A visitor lands on a confident, editorial hero, then scrolls through a narrative that answers — in order — *"Is this for me? → How does it work? → What's the device? → What do I get? → What does it cost? → Can I trust it? → Do others love it? → Ready? → Any questions?"*

Every section is **content-driven** from a single data file, so the same page template can power future products (testosterone, longevity, etc.) just by swapping the content. Motion is used to guide attention and feel premium — never for decoration — and everything degrades gracefully for reduced-motion and mobile.

---

## How the page is assembled

- **Content** lives in one place: `src/components/pdp/data/glp1-pdp-content.ts` (headlines, phrases, timeline steps, safety pillars, reviews, FAQ). Change copy here — no code edits needed.
- **Layout** is composed in `src/components/pdp/ProductPdpPage.tsx`, which stacks the sections in order.
- **Styling** is in `src/components/pdp/pdp.css`.
- A **sticky "Get started" bar** appears once the hero scrolls out of view, so the primary action is always one tap away.
- Persistent chrome: the announcement bar, top navigation (anchors to each section), and footer.

---

## Section-by-section (top → bottom)

### 1. Hero — "the confident first impression"
*File: `PdpHeroSection.tsx`*

The first screen. It carries the product name (with the **TIDL** mark), the **starting price (`/mo`)**, a one-line promise, a primary **CTA**, and a star rating with review count.

- The **product/pen render** sits center-stage with a soft animated backdrop (arch, orbs, hand-drawn swirls) and gently drifts on scroll (parallax) for a premium, living feel.
- Small **social proof bubbles** ("*[name] just started this plan*", "*rated this treatment highly*") animate in around the product — subtle momentum without being loud.
- A side panel has an **accordion** (Description / What's included / Protocol) plus prev/next arrows to browse other products.
- **Intent:** communicate legitimacy, price, and desirability within the first 3 seconds.

### 2. Who this is for — "self-qualification"
*File: `PdpOutcomeSection.tsx`*

A large-type list of outcome phrases (e.g. *"Doctor-guided weight loss," "Simple pre-dosed routine"*). Each line slides and sharpens into focus as you scroll.

- **Intent:** let the right person immediately see themselves in the product, and quietly filter out the wrong fit.

### 3. Your care path — "how it works, made simple"
*File: `PdpVerticalTimeline.tsx`*

A vertical timeline of **five clear steps** from intake to delivery, with a progress rail that fills as you scroll. Steps alternate left/right on desktop.

- **Intent:** remove the biggest objection — *"telehealth sounds complicated"* — by showing a fast, legitimate, on-your-terms process.

### 4. The Pen — "the hero device moment"
*File: `PenShowcaseSection.tsx`* *(only shows for pen-based products)*

A dramatic dark section that spotlights the **pre-dosed TIDL Pen**, floating with light "blades" and an aura, flanked by feature call-outs. Includes an optional **"See how to use the pen" video**.

- **Intent:** make the device feel modern and effortless ("no mixing, no measuring") and turn it into a differentiator.

### 5. What's included — "the full care package"
*File: `PdpIncludedSection.tsx`*

Shows everything the program includes: provider review, personalized prescription, the pre-dosed pen, discreet delivery, and ongoing care.

- **Desktop:** bold full-bleed typography lines that fade/shift as you scroll — an editorial, high-end treatment.
- **Mobile (redesigned):** a **connected checklist of cards** — a gold step-dot rail runs down the left, each item is a clean card with a numbered chip (01–05), title, and a plain-language detail; the pen card is highlighted in gold with the pen render. This reads far better on a phone than the giant desktop type did.
- **Intent:** justify the price by making the value tangible — *"more than medicine."*

### 6. Pricing — "the clear ask"
*File: inline in `ProductPdpPage.tsx` (`#pricing`)*

Monthly price, what's included as quick chips (Doctor review · Prescription · Pen · Ongoing care), the **"Choose this plan"** CTA, and a note that **HSA/FSA cards are accepted**.

- **Intent:** no surprises — one honest, self-contained pricing block.

### 7. Safety & trust — "built like a real medical brand"
*File: `PdpSafetySection.tsx`*

Numbered trust pillars around a central product visual, reinforcing **licensed providers, US pharmacies, prescription-only, private care**.

- **Intent:** counter the "gray-market" perception and establish medical legitimacy.

### 8. Patient stories — "social proof that feels human"
*File: `PdpReviewsSection.tsx`*

A dark, premium reviews block: headline **stats row**, one **featured testimonial** (photo + result badge + quote), then a grid/scroll of additional **verified-patient** cards. Includes a results-vary disclaimer.

- **Intent:** convert with real, credible outcomes right before the final ask.

### 9. Final CTA band — "ready when you are"
*File: `PdpCtaBand.tsx`*

A focused closing banner: *"Feel like you again. Start today."* with the intake CTA and the reassurance line (5-min intake · doctor-reviewed · discreet delivery).

### 10. FAQ — "handle the last objections"
*File: `PdpFaqSection.tsx`*

Expandable Q&A with a link to the full FAQ.

- **Intent:** clear remaining doubts without pulling focus from the CTA.

### 11. Footer + sticky CTA
Standard site footer, plus the **sticky "Ready to start?" bar** that follows the user after the hero so conversion is always reachable.

---

## Design & UX principles we followed

- **One narrative, top to bottom.** Each section answers the next natural question a buyer has.
- **Motion with a job.** Scroll reveals, parallax, and the timeline fill guide the eye and add premium feel — all disabled under "reduce motion," and tuned so nothing blocks reading.
- **Content-driven & reusable.** One data file feeds the whole page, so new products reuse the template.
- **Mobile is designed, not shrunk.** Where the desktop treatment doesn't fit a phone (e.g. "What's included"), we built a dedicated mobile layout instead of scaling type down.
- **Trust first.** Pricing is transparent, safety is explicit, and reviews are clearly labeled "verified" with a results-vary disclaimer.
- **Conversion always in reach.** Primary CTA in the hero, at pricing, in the CTA band, and in the persistent sticky bar.

---

## Recent changes worth noting
- **"What's included" reverted** to the editorial big-typography desktop version (from a previously pulled variant), per direction.
- **New mobile design for "What's included"** — the connected gold checklist cards described in section 5.

---

## Where to change things (quick reference)
| I want to change… | Edit this |
|---|---|
| Any copy, prices phrasing, timeline steps, FAQ, reviews | `src/components/pdp/data/glp1-pdp-content.ts` |
| Section order / which sections show | `src/components/pdp/ProductPdpPage.tsx` |
| Look & feel / spacing / colors | `src/components/pdp/pdp.css` |
| A specific section's behavior | its file in `src/components/pdp/` (see headings above) |
