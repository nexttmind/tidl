# Google Stitch — TIDL Landing / Overview Prompt

Copy-paste prompt pack for **[Google Stitch](https://stitch.withgoogle.com/)** (AI design tool) to regenerate the TIDL homepage / overview landing experience.

Sources: live site tokens (`src/styles.css`, `src/components/home/home.css`, `src/components/category/category.css`), `code to Figma/` composition, `TIDL.com Overview_08JUN26.docx` / `.tmp-docx` extract, and `src/lib/site-assets.ts`.

---

## 1. Strict color system (exactly 3 colors)

Use **only** these three hex values. No other colors, tints invented as new hues, purple, teal, terracotta, or multi-hue gradients.

| Role | Hex | Source | Usage |
|------|-----|--------|--------|
| **Background / light surface** | `#FFFFFF` | `--cream` / `--cat-ivory` / `--pdp-cream` | Page background, light sections, card fills, light CTAs |
| **Text / dark surface** | `#171310` | `--ink` / `--cat-ink` / `--pdp-ink` (home.css, category.css) | Body & headline text, dark hero bands, dark CTAs, pen-stage backgrounds |
| **Accent** | `#F3C300` | `--brand-accent` / `--gold` / `rgb(243, 195, 0)` (`src/styles.css`) | Logo gold, primary buttons on dark, kickers, emphasis, wordmark |

**Opacity rule:** You may use black/white opacity *only* as alpha of `#171310` or `#FFFFFF` (e.g. muted copy at ~62% ink). Do **not** introduce a fourth solid color for muted text.

**Gradient rule:** Gradients only between these three (or their opacities). Never invent orange, cream-beige, purple, or blue.

---

## 2. Image assets (landing / overview)

CDN base (production Webflow assets used by the site):

`https://cdn.prod.website-files.com/6a484773bf274d9b9ec3f5b9`

Local / Vite: `http://localhost:3000/...` (or your Vite port) for `public/` and bundled `src/assets/` paths.

| # | Purpose | Relative path | Shareable URL |
|---|---------|---------------|---------------|
| 1 | **Hero lifestyle** (full-bleed) | CDN (see URL) | `https://cdn.prod.website-files.com/6a484773bf274d9b9ec3f5b9/6a4a44f83052977cb1646003_hf_20260705_114532_eed1607f-baf0-4f2d-9b83-39b75e08344a.png` |
| 2 | **Hero dark overlay** | CDN | `https://cdn.prod.website-files.com/6a484773bf274d9b9ec3f5b9/6a484775bf274d9b9ec3f7ba_overlay%20(2).png` |
| 3 | **TIDL logo (yellow)** | `public/TIDL_LOGO_YELLOW.png` · `code to Figma/assets/logo-yellow.png` | `http://localhost:3000/TIDL_LOGO_YELLOW.png` |
| 4 | **TIDL logo (dark)** | `public/tidl_logo.png` · `code to Figma/assets/logo.png` | `http://localhost:3000/tidl_logo.png` |
| 5 | **TIDL Pen product cutout** | `src/assets/TIDL_Pen-Rendering_WITH-LABEL.png` · `code to Figma/assets/pen.png` | Bundle / `code to Figma/assets/pen.png` (open locally for Stitch upload) |
| 6 | **Service — Weight loss** | CDN | `https://cdn.prod.website-files.com/6a484773bf274d9b9ec3f5b9/6a4a948975e49a6ca9c6b6e5_hf_20260705_172618_ea8e3be2-4637-4096-83cc-5ec995f07e09.png` |
| 7 | **Service — Testosterone** | CDN | `https://cdn.prod.website-files.com/6a484773bf274d9b9ec3f5b9/6a4a95a92a6dee9e17ed919e_hf_20260705_173015_06ec6b8c-b985-4bab-80b1-41afe144db92.png` |
| 8 | **Service — Longevity** | CDN | `https://cdn.prod.website-files.com/6a484773bf274d9b9ec3f5b9/6a4bd7ba829cdf371074ee74_hf_20260706_160923_8f107d2e-39e5-41c3-8290-18fd580d714a.png` |
| 9 | **Category — Metabolic** | `src/assets/category-metabolic-health.png` · `code to Figma/assets/service-metabolic.png` | Local asset |
| 10 | **Category — Performance** | `src/assets/category-performance.png` · `code to Figma/assets/service-performance.png` | Local asset |
| 11 | **Category — Recovery** | `src/assets/category-recovery.png` · `code to Figma/assets/service-recovery.png` | Local asset |
| 12 | **How it works — Quiz** | CDN | `https://cdn.prod.website-files.com/6a484773bf274d9b9ec3f5b9/6a4aa74cb673463b10d3ae0a_hf_20260705_182659_b144a633-d893-4de0-b45e-39e6df164b2f.png` |
| 13 | **How it works — Provider** | CDN | `https://cdn.prod.website-files.com/6a484773bf274d9b9ec3f5b9/6a4aa74d68be0cc0c1e6ff78_hf_20260705_183156_8357ac89-69ac-4055-a74d-07ea368560c8.png` |
| 14 | **How it works — Ship** | CDN | `https://cdn.prod.website-files.com/6a484773bf274d9b9ec3f5b9/6a4aa92efc42f4d1ca52f73b_hf_20260705_185141_41c69960-1413-4b75-8318-f0800323717b.png` |
| 15 | **Families / mid-CTA lifestyle** | CDN | `https://cdn.prod.website-files.com/6a484773bf274d9b9ec3f5b9/6a4bdcc786041c1c67e4f84a_hf_20260706_164258_2d8f8b0b-75a0-491a-bc5b-ce98730f9f41.png` |
| 16 | **Progress / measure** | `src/assets/families-measure-progress.png` · `code to Figma/assets/progress.png` | Local asset |
| 17 | **Testimonial portrait — woman** | `src/assets/testimonial-portrait-woman.png` · `code to Figma/assets/portrait-woman.png` | Local asset |
| 18 | **Testimonial portrait — man** | `src/assets/testimonial-portrait-man.png` · `code to Figma/assets/portrait-man.png` | Local asset |
| 19 | **Journey center / care** | CDN | `https://cdn.prod.website-files.com/6a484773bf274d9b9ec3f5b9/6a4aec42b6e5359eece02ec0_hf_20260705_222419_e9eea2f4-16e9-4829-bc36-184ebd9190fc%20(1).png` |
| 20 | **Footer decorative** | CDN | `https://cdn.prod.website-files.com/6a484773bf274d9b9ec3f5b9/6a48596ac890892ac42d3e95_ChatGPTImageJul4202603_52_14AM.png` |
| 21 | **After-life atmosphere (PDP)** | `public/pdp/AFTER.png` | `http://localhost:3000/pdp/AFTER.png` |
| 22 | **Feel again (PDP)** | `public/pdp/feel-again.png` | `http://localhost:3000/pdp/feel-again.png` |
| 23 | **Hero atmosphere (PDP)** | `public/pdp/hero-atmosphere.png` | `http://localhost:3000/pdp/hero-atmosphere.png` |
| 24 | **Patient after** | `public/pdp/patient-after.png` | `http://localhost:3000/pdp/patient-after.png` |
| 25 | **US pharmacy trust icon** | `public/pdp/icons/photo-pharmacy.png` | `http://localhost:3000/pdp/icons/photo-pharmacy.png` |

**Image count linked above: 25**

Also available: overview zip / docx at `public/overview.zip`, `public/TIDL.com Overview_08JUN26.docx`.

---

## 3. Full Stitch prompt (copy-paste ready)

```
Design a premium telehealth landing page for TIDL — a legitimate US telehealth + peptide brand. The look is medical, calm, and premium (not clinic-sterile, not gym-bro, not wellness-spa purple). The hero object of the brand is the TIDL Pen: a pre-dosed GLP-1 pen where the dose is already measured — click it, don’t calculate it.

STRICT COLOR SYSTEM — USE ONLY THESE 3 COLORS, NOTHING ELSE:
1) #FFFFFF — page background, light sections, light surfaces
2) #171310 — all text, dark bands, dark buttons, pen-stage background
3) #F3C300 — brand accent only (logo gold, primary CTAs on dark, kickers, emphasis)
Do not introduce any other colors. No purple, orange, teal, cream-beige, terracotta, blue, or multi-hue gradients. Gradients only between these three (or opacity of ink/white). Muted copy = #171310 at reduced opacity.

TYPOGRAPHY:
Helvetica Neue / Helvetica / Arial stack. Display headlines: heavy weight (700–800), tight letter-spacing (~-0.02em to -0.035em), large clamp sizes. Body: regular 400, readable. Kickers: small uppercase, wide letter-spacing, in #F3C300 on dark or #171310 on light. Brand wordmark “TIDL” is hero-level — never let a headline overpower the brand.

PRIMARY SITE GOAL (EMOTIONAL ARC — THIS IS THE BRIEF):
Make a visitor feel we understand their health goals and priorities and what matters when purchasing peptides — including but not limited to:
• Personalized care (licensed provider review, real prescription — never gray market)
• Sourcing from a US-based pharmacy (cold-chain when needed, plain packaging)
• Ease of experience through the TIDL Pen (pre-dosed, no mixing, no measuring)
Meet them emotionally at that anxious “will this be legitimate and simple?” moment first. Then, through visual design, transition them into how life feels AFTER purchasing through TIDL — clearer energy, confidence, feeling like themselves again — and show that everything they need (care, pharmacy trust, dosing ease) is met inside the TIDL experience.

COMPOSITION (one job per section; first viewport = one composition, not a dashboard):

1) ANNOUNCEMENT BAR — dark #171310, short line: “TIDL is now a telehealth platform. Care that delivers results.” Accent link in #F3C300.

2) HEADER + FULL-BLEED HERO (first viewport only: brand, one headline, one short supporting sentence, one CTA, one dominant image — no stats strips, no badges overlaid on media):
   - Yellow TIDL logo: use public/TIDL_LOGO_YELLOW.png or code to Figma/assets/logo-yellow.png (http://localhost:3000/TIDL_LOGO_YELLOW.png)
   - Nav links (Treatments, The Pen, About, Reviews, FAQ) in white/ink as appropriate
   - Headline: “The only GLP-1 that's pre-dosed for you. Click it, don't calculate it.”
   - Subhead: “Doctor-prescribed GLP-1, delivered pre-dosed to your door. Plans start at $299/mo. Online in 5 minutes.”
   - CTA: “Take the 5-Minute Quiz” (dark button #171310 on light copy area, or gold #F3C300 on dark)
   - Hero image FULL BLEED edge-to-edge (not inset card):
     https://cdn.prod.website-files.com/6a484773bf274d9b9ec3f5b9/6a4a44f83052977cb1646003_hf_20260705_114532_eed1607f-baf0-4f2d-9b83-39b75e08344a.png
   - Optional soft dark overlay ONLY using opacity of #171310 / the provided overlay asset:
     https://cdn.prod.website-files.com/6a484773bf274d9b9ec3f5b9/6a484775bf274d9b9ec3f7ba_overlay%20(2).png
   - No floating pills, stickers, or promo chips on the hero photo.

3) PICK YOUR GOAL — white background. Title: “Pick your goal.” Three goal tiles (images, not busy cards):
   Weight loss: https://cdn.prod.website-files.com/6a484773bf274d9b9ec3f5b9/6a4a948975e49a6ca9c6b6e5_hf_20260705_172618_ea8e3be2-4637-4096-83cc-5ec995f07e09.png
   Testosterone: https://cdn.prod.website-files.com/6a484773bf274d9b9ec3f5b9/6a4a95a92a6dee9e17ed919e_hf_20260705_173015_06ec6b8c-b985-4bab-80b1-41afe144db92.png
   Longevity: https://cdn.prod.website-files.com/6a484773bf274d9b9ec3f5b9/6a4bd7ba829cdf371074ee74_hf_20260706_160923_8f107d2e-39e5-41c3-8290-18fd580d714a.png
   Short benefit lines under each; text links “See Pricing & Plans →” etc. in ink.

4) THE TIDL PEN — dark #171310 band. Kicker in #F3C300: “The TIDL Pen”. Title: “GLP-1, pre-dosed. Just click.” (emphasize “Just click.” in #F3C300). Center the pen cutout (code to Figma/assets/pen.png or src/assets/TIDL_Pen-Rendering_WITH-LABEL.png) as a floating product hero — not a framed lifestyle photo. Four short features around it: Precision dose slider; Graduated dose scale; Sealed and dispensed with your name; Cold-chain shipped. Gold CTA: “See If You Qualify”.

5) HOW IT WORKS — light. Kicker “How it works”. Title: “Five minutes. Real care. Your door.” Three steps with images:
   Quiz: https://cdn.prod.website-files.com/6a484773bf274d9b9ec3f5b9/6a4aa74cb673463b10d3ae0a_hf_20260705_182659_b144a633-d893-4de0-b45e-39e6df164b2f.png
   Provider: https://cdn.prod.website-files.com/6a484773bf274d9b9ec3f5b9/6a4aa74d68be0cc0c1e6ff78_hf_20260705_183156_8357ac89-69ac-4055-a74d-07ea368560c8.png
   Ship: https://cdn.prod.website-files.com/6a484773bf274d9b9ec3f5b9/6a4aa92efc42f4d1ca52f73b_hf_20260705_185141_41c69960-1413-4b75-8318-f0800323717b.png
   Copy must reinforce: licensed provider in your state · US pharmacy · plain packaging.

6) PATIENT REVIEWS — light. Title “Patient reviews”. Use portraits:
   Woman: code to Figma/assets/portrait-woman.png (src/assets/testimonial-portrait-woman.png)
   Man: code to Figma/assets/portrait-man.png (src/assets/testimonial-portrait-man.png)
   Quotes about ease, legitimacy, feeling like themselves again. Small disclaimer.

7) AFTER-TIDL LIFE / FAMILIES BAND — emotional transition. Full-bleed lifestyle:
   https://cdn.prod.website-files.com/6a484773bf274d9b9ec3f5b9/6a4bdcc786041c1c67e4f84a_hf_20260706_164258_2d8f8b0b-75a0-491a-bc5b-ce98730f9f41.png
   Overlay copy in white/ink: “The strongest version of you is a quiz away.” Support: doctor-prescribed care, one five-minute quiz, no waiting rooms. Include progress photo (code to Figma/assets/progress.png). Optionally weave AFTER-life stills: http://localhost:3000/pdp/AFTER.png , feel-again.png, patient-after.png — to show life after TIDL (confidence, clarity), still only within the 3-color UI chrome.

8) TRUST PRIORITIES STRIP (minimal, not a card dump) — three ideas only, ink on white:
   Personalized care · US-based pharmacy · TIDL Pen ease
   Optional pharmacy still: http://localhost:3000/pdp/icons/photo-pharmacy.png

9) FAQ — light, accordion style, ink text. Topics: prescription required; who prescribes; how the pen works; discreet shipping; care team after start.

10) FINAL CTA — dark #171310. Gold kicker. Headline light/cream white. Gold button “Start my free quiz”. Emotional close: five honest minutes → licensed provider → become yourself again.

11) FOOTER — dark, yellow logo, columns Treatments / Company / Care. Optional decorative:
    https://cdn.prod.website-files.com/6a484773bf274d9b9ec3f5b9/6a48596ac890892ac42d3e95_ChatGPTImageJul4202603_52_14AM.png

MOTION (2–3 intentional only): soft hero fade-in; pen slight levitate/float; CTA hover darken/lighten within the triad.

OVERVIEW DOC ALIGNMENT (TIDL.com Overview):
Visitor lands → picks a goal → short medical intake/quiz → licensed doctor reviews & prescribes → US pharmacy ships → brand stays in touch by text/email. The pen is what separates TIDL from gray-market alternatives. Premium + trustworthy; pen as hero object. Adults 18+. Every customer sees a real doctor. Medical questions never answered by a bot.

OUTPUT: Desktop (1440) + mobile (390) landing page mockups, same structure, same 3 colors, same assets.
```

---

## 4. Constraints / do not

- Do **not** use any hex outside `#FFFFFF`, `#171310`, `#F3C300` (opacity of ink/white only for muted/overlays).
- Do **not** invent purple, indigo, orange, cream paper, terracotta, neon glow, or broadsheet newspaper layouts.
- Do **not** put stats strips, schedule chips, floating badges, or promo stickers on the hero.
- Do **not** inset the hero photo in a rounded media card — full-bleed only.
- Do **not** make the first viewport a dashboard of many competing modules.
- Do **not** promise medical outcomes; keep disclaimers where reviews appear.
- Do **not** answer medical questions with bot UI; care is human + licensed.
- Prefer real assets listed above over placeholder stock.

---

## Quick reference

| Item | Value |
|------|--------|
| Accent | `#F3C300` from `--brand-accent` in `src/styles.css` |
| Ink | `#171310` from home / category / PDP CSS |
| BG | `#FFFFFF` from cream/ivory tokens on marketing surfaces |
| Font | Helvetica Neue stack (`src/styles/typography.css`) |
| Images listed | **25** |
| Overview source | `public/TIDL.com Overview_08JUN26.docx` / `.tmp-docx` extract |
