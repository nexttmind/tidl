# TIDL Design System & Brand Style Guide

**Version:** 1.0  
**Status:** Official handoff specification for product design & generative UI tools (including Lovable)  
**Source of truth:** Production React codebase (`src/styles.css`, `src/styles/typography.css`, `src/styles/imagery.css`, `src/components/home/home.css`, `src/components/pdp/pdp.css`, `src/components/layout/site-header.css`, and adjacent product surfaces)  
**Audience:** Senior product designers, design engineers, and AI systems generating new TIDL sections  

---

## How to use this document

This is not a moodboard. It is an operating manual for making new UI that feels **native to TIDL** without cloning existing layouts.

When designing a new section:

1. Choose a **surface mode** (Light Clinical or Dark Stage).
2. Apply the **typography stack and hierarchy** exactly.
3. Use the **gold accent system** with the same restraint documented here.
4. Follow **radius, spacing, and motion tokens**.
5. Compose with the documented **patterns** (kicker + display headline + short body + CTA group).
6. Respect **What Should Never Change**.

Creative freedom applies to structure, content density, storytelling, and interaction invention. Visual DNA is fixed.

---

# 1. Brand Personality

TIDL reads as **premium clinical care with athletic confidence**.

It is not soft wellness, not purple SaaS, not newspaper-editorial, and not hospital-corporate blue. It is closer to a high-end performance lab that also happens to prescribe: precise, expensive-feeling, calm under pressure, and commercially sharp.

### Personality adjectives (ranked)

| Trait | Intensity | Notes |
|-------|-----------|-------|
| Premium | Very high | Soft dark canvases, gold as jewelry, not neon |
| Medical / clinical | High | Protocol language, measurement, vials, “physician” framing |
| Trustworthy | High | Clear hierarchy, restrained motion, readable body |
| Modern / technical | High | Helvetica discipline, monospace accents in UI chrome |
| Athletic / performance | Medium-high | Heavy display weights, tight negative tracking on heroes |
| Luxury | Medium | Depth via soft shadows and gold glows — not chrome excess |
| Minimal | Medium | Large whitespace, one job per section |
| Editorial | Low-medium | Short leads, plate headlines; not dense magazine columns |

### Emotional contract with the user

Every surface should feel like: *“This is serious medicine, presented like a flagship product.”*  
Promise clarity. Never look DIY, playful-emoji, or generic “AI landing page.”

### Why the site feels this way

- Warm near-black ink (`#171310`) instead of cool slate — human, not hospital fluorescent.
- Signature electric-warm gold (`rgb(243, 195, 0)`) used as *signal*, not decoration.
- Helvetica Neue at extreme weights (400 body / 800 display) — institutional confidence without serif sentimentality.
- Alternating light white stages and near-black `#0b0a08` bands — cinematic pacing.
- Product imagery treated as hero objects (vials/pens) with soft studio depth, not stock lifestyle clutter.

---

# 2. Visual DNA — Recognizability Rules

If a page were stripped of the word “TIDL,” these should still identify the brand:

1. **Helvetica Neue only** for marketing homepage language (no Inter, no Roboto, no Fraunces on homepage marketing*†*).
2. **Gold + Ink + White/near-black** triad — never purple-indigo systems, never terracotta-cream editorial stacks.
3. **Uppercase micro-kickers** with wide tracking (≈0.22–0.28em) in gold, often preceded by a **7px gold dot**.
4. **Display headlines** at 700–800 weight with **negative letter-spacing** (−0.02em to −0.03em).
5. **Wordmark energy**: “TIDL” is uppercase, weight 800, modest positive tracking; pathway labels inherit this voice when treated as brand objects.
6. **Dark stage canvas** exactly `#0b0a08` (or footer `#0e0e0e` / `rgb(14,14,14)`), never pure `#000` unless intentional chrome.
7. **Primary CTAs** are either (a) gold-filled pills/soft-rectangles with ink text, or (b) ink-filled pills with light text on light surfaces.
8. **Soft, large-radius containers** (18–28px common; up to 36–44px on PDP shells) with **hairline borders** at ~8–14% white or ink alpha.
9. **Motion**: short eased transitions (`cubic-bezier(0.22, 1, 0.36, 1)`), lift of ~1px, never bouncy or springy carnival.
10. **One composition per first viewport of a section** — brand/kicker, one headline, one supporting sentence, one CTA group, one dominant visual. No stat strip clutter in the hero of a band.

† Category pages and some sandbox blocks currently use Outfit/Fraunces. For **homepage & new marketing sections meant to match homepage DNA**, use Helvetica only. Prefer converging future work onto Helvetica for brand unity.

---

# 3. Design Tokens (Canonical)

## 3.1 Color tokens

### Core brand (always prefer these for marketing)

| Token | Value | Role |
|-------|-------|------|
| `--brand-accent` / `--gold` | `rgb(243, 195, 0)` | Primary gold — CTAs, kickers, focus signals, progress |
| `--brand-accent-bright` / `--gold-bright` | `rgb(255, 217, 46)` | Hover highlight, avatar gradient start, luminous tips |
| `--brand-accent-deep` / `--gold-deep` | `rgb(190, 152, 0)` | Muted gold text, secondary accents, safer-on-light |
| `--brand-accent-soft` | `rgba(243, 195, 0, 0.18)` | Soft wash / selection backgrounds |
| `--brand-accent-muted` | `rgba(243, 195, 0, 0.72)` | Semi-transparent gold text/icons |
| Gold alpha ladder | `0.12 / 0.16 / 0.2 / 0.28 / 0.4` | Borders, rings, glows, washes |
| Ink (absolute) | `#171310` | Primary text on light; chrome; warm near-black |
| Ink soft | `oklch(0.47 0.012 70)` / approx muted brown-gray | Secondary text in tokenized systems |
| Dark stage | `#0b0a08` | Homepage dark sections (services, pen, HIW) |
| Footer night | `rgb(14, 14, 14)` / `#0e0e0e` | Footer / some Webflow dark |
| White / cream alias | `#ffffff` | Light canvas (named “cream” in some scopes but rendered white) |
| Warm off-white text | `#f8f4ee` | Wordmark / light text on dark (nav light variant) |

### Functional / surface alphas (dark UI)

| Use | Typical value |
|-----|---------------|
| Hairline border on dark | `rgba(255,255,255,0.08)` → `0.14` on hover |
| Quiet label on dark | `rgba(255,255,255,0.38)` → `0.45` |
| Body on dark | `rgba(255,255,255,0.62)` → `0.82` for stronger copy |
| Soft surface on dark | `rgba(255,255,255,0.03)` → `0.055` gradients |
| Dark overlay for photos | `rgba(11,10,8,0.42)` |

### Functional / surface (light UI)

| Use | Typical value |
|-----|---------------|
| Muted body | `rgba(23,19,16,0.55)` → `0.62` |
| Lines | `rgba(23,19,16,0.08)` → `0.14` |
| Checkout border | `#e8e6e2` / strong `#d4d0c8` |
| Checkout muted text | `#6f6a62` / subtle `#9a948a` |
| Muted surface | `#f8f8f7` |
| Success | `#2f9b67` (checkout) |

### Gold usage doctrine

Gold is **signal**, not paint.

**Use gold for:**
- Kickers / eyebrows  
- Primary marketing CTAs on dark stages  
- Active rail markers, progress fills, dots  
- Ratings, “best seller,” trust accents  
- Soft radial washes behind specimen imagery  

**Do not use gold for:**
- Large flat background fills of entire pages  
- Body paragraph text  
- Default borders everywhere  
- Random decorative blobs  

### Auth/category variants (peripheral)

- Auth gold family is warmer: `#e8c15a`, `#c9a03a`, `#f0d48a` on night `#07080b`.  
- Sandbox gold `#c4a46a` on sand `#f4efe6`.  
- For **new homepage-adjacent marketing**, prefer core marketing gold `rgb(243,195,0)`, not auth/sandbox variants.

### Disabled / hover / active principles

| State | Pattern |
|-------|---------|
| Hover (gold primary) | Brighten gradient toward `#ffe254` / `#ffd950`; lift `translateY(-1px)`; intensify gold shadow |
| Active | Reset lift; slightly darker press (`#d6a800` end stops) |
| Disabled | Reduce opacity (~0.45–0.55); remove shadow lift; no shine animation |
| Ghost hover | Border moves toward gold (`rgba(243,195,0,0.35–0.5)`); text warms |

---

## 3.2 Typography tokens

```css
--font-body: "Helvetica Neue", Helvetica, Arial, ui-sans-serif, system-ui, sans-serif;
--font-display: "Helvetica Neue", Helvetica, Arial, ui-sans-serif, system-ui, sans-serif;
--font-weight-body: 400;
--font-weight-body-medium: 500;
--font-weight-heading: 700;
--font-weight-display: 800;
--font-weight-wordmark: 800;
--letter-spacing-wordmark: 0.02em;
--letter-spacing-display: -0.02em;
```

Optional UI mono (Ask TIDL chrome):  
`ui-monospace, "SF Mono", "Cascadia Code", "Segoe UI Mono", monospace`

### Hierarchy

| Level | Weight | Letter-spacing | Transform | Typical size |
|-------|--------|----------------|-----------|--------------|
| Wordmark / pathway brand labels | 800 | `0.02em` (nav centers often `0.16em`) | Uppercase | `clamp(22px, 3.2vw, 28px)` nav |
| Display hero | 800 | `-0.03em` | None | `clamp(2.5rem, 5vw, 3.5rem)` desktop |
| Section H2 | 700–800 | `-0.02em` → `-0.03em` | None | `clamp(2rem, 5vw, 3.5rem)` |
| Subsection H3 | 700 | `-0.02em` | None | ~1.5–2rem equivalent |
| Body | 400 | normal | None | `0.95rem`–`1.05rem`; leads often `max-width: 36–48ch` |
| Body medium | 500 | normal | None | Buttons / medium UI |
| Kicker / eyebrow | 600–700 (800 rare) | `0.18em`–`0.28em` | Uppercase | 10–12px / `0.68–0.72rem` |
| Caption / meta | 600 | `0.16em`–`0.22em` | Uppercase | 10–11px |
| Price | 700–800 | tight negative | None | Emphasized numerals |

### Text rhythm

- Headlines are short, punchy, often sentence-case with a period (“Pick your goal.”).
- Supporting copy is one to three lines max before CTAs.
- Kickers sit **above** headlines with a small gap (8–14px).
- On dark stages, body contrast is deliberately gray-white (~62% alpha), not pure white, to keep gold as brightest text accent.

---

## 3.3 Spacing system

### Philosophy

The project behaves like an **8pt-forward system with 4pt subdivisions**.

Evidence:
- Common paddings: 8, 12, 16, 18, 20, 22, 24, 28, 32, 40, 48, 56, 80.
- Gaps: 8, 10, 12, 14, 16, 18, 24, 40.
- Nested clamp rhythms for section padding: `clamp(28px, 4vh, 44px)`, `clamp(48px, 7vh, 80px)`.

Use **4px** for micro adjustments; **8px** as the primary rhythm; **16/24/32/40** for component internals and section breathing.

### Scales

| Token idea | Values | Usage |
|------------|--------|-------|
| Micro | 4 / 6 / 8 | Icon gaps, caption gaps |
| Component | 10 / 12 / 14 / 16 / 18 / 22 | Card padding, button horizontal padding |
| Group | 24 / 28 / 32 / 40 | Card groups, stage internal padding |
| Section | 48–120 (often clamp) | Between major homepage bands |
| Container side | ~20–30px mobile; desktop margins via `container-fluid` (~30px) | Edge gutters |

### Vertical rhythm rules

1. Section intro block (kicker → title → lead) stacks tightly (8–16px).
2. Intro to interactive stage uses a larger step (16–32px).
3. CTA groups use 10–14px between primary and secondary actions.
4. Do not create dashboard density — leave air.

---

## 3.4 Layout & containers

| Token / pattern | Value / behavior |
|-----------------|------------------|
| Marketing shell | `.container-fluid` ≈ max **1340px** (Webflow `container-lg`; some xl 1400) |
| Focused content | 1080 / 1180 / 1280 frequently for hero-ish bands |
| Narrow reading | 720–920 for section heads; body measures ~36–48ch |
| Full-bleed stage | `.container-full` — edge-to-edge background, inner content still padded |
| Grid philosophy | Explicit CSS grids for cabinets (rail / specimen / brief), not card walls of equal tiles in heroes |
| Alignment | Left-anchored editorial columns on light; centered specimen rituals on dark product stages |
| White space | Generous; first viewport of a band stays uncluttered |

### Breakpoints (most used)

| Width | Intent |
|-------|--------|
| 640 | Small tablet refinements |
| 768 | Mobile ↔ desktop header/hero shift |
| 900 | Cabinet / complex 3-column collapses |
| 960 | Checkout / auth grids |
| 992 | Secondary desktop |
| 1100 | Wide polish |

Design mobile-first for touch (min 44px controls), then expand composition.

---

## 3.5 Border radius tokens

| Scale | Values | Use |
|-------|--------|-----|
| Base shadcn | `--radius: 0.625rem` (10px) ± sm/md/xl ladder | App UI primitives |
| Soft rect UI | **14px** | Compact primary buttons in cabinets, small controls |
| Card | **18–20px** | Product cards, trust tiles, story cards |
| Panel | **24px** | Stage shells, drawers, closing panels |
| Large shells | **28 / 30 / 36 / 42 / 44px** | Ask panel, PDP shells, category surfaces |
| Pill | **999px** / **50px** | Kickers pills, chip filters, classic Webflow `.button-01` |
| Circle | **50%** | Dots, avatars, composer send |

**When to choose**
- Interactive marketing CTA on homepage hero legacy: pill (`999px`/`50px`).
- Dense product cabinet CTA: soft rectangle `14px`.
- Cards containing multiple text rows: `18–20px`.
- Section “glass plate” containing a whole module: `24px+`.

---

## 3.6 Shadows, blur, depth

### Shadow tokens

| Token | Value | Intent |
|-------|-------|--------|
| `--shadow-card` | `0 24px 60px -24px oklch(0.3 0.03 80 / 0.28)` | Soft elevated card |
| `--shadow-image` | `0 40px 90px -30px oklch(0.28 0.03 80 / 0.4)` | Hero imagery |
| Header light | `0 8px 24px rgba(23,19,16,0.04)` | Barely-there pin |
| Header dark | `0 8px 24px rgba(0,0,0,0.18)` | Dark pin |
| Gold CTA | `0 12px 24px -10px rgba(243,195,0,0.5)` (+ inset highlights) | Brand button glow |
| Dark card | `0 26px 60px -28px rgba(0,0,0,0.95)` | Specimen / dark tiles |

### Depth philosophy

Depth is **atmospheric**, not skeuomorphic:

1. Near-black stages with subtle gold radials behind products.  
2. Hairline borders + inset top highlight (`inset 0 1px 0 rgba(255,255,255,0.06)`) on dark cards.  
3. Drop shadows under products, not hard underlines.  
4. Header uses `backdrop-filter: blur(14px)` when pinned.  
5. Avoid stacking multiple competing blurs on scroll-heavy sections (performance rule already applied to Ask panel: solid surface preferred over constant backdrop-filter).

### Glass

Glass is allowed when interaction needs a frosted plate (header, ghosts, some PDP secondaries):

- Typical: `backdrop-filter: blur(8–14px)`; category can go higher (12–22px).  
- Fill with translucent white/ink, not heavy frost everywhere.  
- On dark homepage cabinets, prefer **tinted translucency without heavy blur** for scroll performance.

---

## 3.7 Motion tokens

### Primary easing

`cubic-bezier(0.22, 1, 0.36, 1)` — default for hover, panel, opacity, transform.

### Secondary easings

| Curve | Use |
|-------|-----|
| `cubic-bezier(0.645, 0.045, 0.355, 1)` | Legacy Webflow dual-line button text slide (0.4s) |
| `cubic-bezier(0.2, 0.6, 0.2, 1)` | Soft ticker / announcement |
| `cubic-bezier(0.2, 0.8, 0.2, 1)` | Accordion expand |

### Durations

| Speed | Values | Use |
|-------|--------|-----|
| Fast UI | 0.18–0.3s | Progress fills, micro hovers |
| Standard | 0.32–0.4s | Header, buttons, cards |
| Emphasis | 0.45–0.55s | Larger panel transitions |
| Choreography | 0.75–0.85s | Rare entrance sequences |

### Interaction vocabulary

- Hover lift: `translateY(-1px)` or subtle scale ≤1.02.  
- Shine sweeps on premium gold CTAs / product rows (diagonal gradient mask, ~2s loop, restrained).  
- Scroll-linked progress for pathway cabinets.  
- Always honor `prefers-reduced-motion: reduce` (disable loops/pulses).

---

## 3.8 Opacity & borders

| Role | Recommendation |
|------|----------------|
| Dark hairline | `1px solid rgba(255,255,255,0.08)` |
| Dark hover border | `rgba(255,255,255,0.14)` or gold `rgba(243,195,0,0.35–0.5)` |
| Light hairline | `rgba(23,19,16,0.08–0.1)` |
| Focus ring | Gold soft ring `0 0 0 4px rgba(243,195,0,0.16)` on dots; visible focus for a11y |

---

## 3.9 Z-index scale

| Layer | Range |
|-------|-------|
| Local content | 0–8 |
| Sticky within section | ~2–5 |
| Site header pinned | 50 |
| Nav wrap | 90–100 |
| Mobile drawer stack | 10000–10050 |

Do not invent competing 9999 layers for section chrome.

---

# 4. Color System in Context

## Light Clinical mode

- Background: `#ffffff`  
- Text: `#171310`  
- Muted: `rgba(23,19,16,0.55–0.62)`  
- Accent: gold kickers + gold or ink CTAs  
- Used for: FAQ, Ask TIDL (white), checkout, many PDP surfaces, light stories  

## Dark Stage mode

- Background: `#0b0a08`  
- Optional gold radial washes  
- Text: white hierarchy with alpha  
- Accent: gold is brightest chroma  
- Used for: Pick your goal / services cabinet, TDL pen band, How-it-works, some footers  

## Alternation rule

Homepage cadence is intentional: **dark product theater → light conversation/FAQ → dark again**. New sections should declare which mode they inhabit and keep token sets pure (do not mix ivory sand fills into `#0b0a08` stages).

---

# 5. Components

## 5.1 Buttons

### A. Legacy marketing pill — `.button-01` / `.button-03`

- Radius: ~50px / pill  
- Padding: ~16×40  
- Min-height: ≥44px (touch)  
- Weight: 500–800 depending on surface  
- `.button-03` uses brand gold (`--secondary` remapped to marketing gold)  
- Hover: internal dual-line text slide (Webflow inheritance)  
- Use for classic homepage hero / family CTAs  

### B. Cabinet primary — gold soft-rect

- Radius: **14px**  
- Min-height: **50px**  
- Typography: uppercase-ish compact (`~0.82rem`, weight **800**, LS `0.04em`)  
- Fill: linear gold gradient `#ffe254 → #f3c300 → #d6a800`  
- Text: `#171310`  
- Shadow: gold ambient + inset highlight  
- Optional shine pseudo-element  
- Hover: brighter gradient + lift  
- Active: press down  

### C. Ghost / secondary on dark

- Transparent / `rgba(255,255,255,0.03)`  
- Border `rgba(255,255,255,0.14)`  
- Text warm off-white  
- Hover: gold-tinted border/bg  

### D. Composer / icon circular

- 56px circle  
- Gold gradient  
- White glyph  
- Soft gold shadow  

### E. Checkout submit

- Full-width pill  
- Ink fill, white text  
- Min-height 52px  
- Hover opacity ~0.94  
- Active scale 0.99  

**Rules:** One dominant CTA per group. Secondary is quieter. Never place two equal-weight gold buttons side by side without hierarchy.

---

## 5.2 Cards

### Dark product / protocol card

- Padding ≈ 11–16px  
- Radius 18px  
- Border `rgba(255,255,255,0.1)`  
- Background: soft white alpha gradient + tiny gold terminus  
- Inset highlight + soft drop shadow  
- Hover: border goldward, slight lift, stronger shadow  
- Content grid often `thumb | copy` with 12px gap  

### Light trust / story card

- Radius 18–20px  
- Softer ink shadows  
- More padding (16–24)  
- Photography sits in framed media with gold wash overlays from imagery system  

### Elevation

Cards sit *just above* the stage — shadows are large and soft, never hard Material 2dp stacks.

---

## 5.3 Kickers, badges, chips

### Canonical kicker recipe

```
[optional 7px gold dot + 4px soft gold ring]
UPPERCASE LABEL
font: Helvetica
size: 10–12px
weight: 600–700
letter-spacing: 0.22–0.28em
color: rgb(243,195,0) on dark OR deep gold on light
```

### Badges / pills

- Pill radius  
- High contrast gold → ink or dark translucent plates  
- Short labels (“Best seller”, pathway indices)  

### Chips (category navigation)

- Soft pill / rounded rect  
- Quiet fill until active  
- Active uses gold border/fill at low alpha  

---

## 5.4 Forms & inputs

- Light surfaces: white / `#f8f8f7`, borders `#e8e6e2`  
- Radius 14–18px in checkout  
- Labels: small, tracked, sometimes uppercase  
- Focus: ink/gold ring discipline; keep calm  
- Errors: near field, not only toast  

---

## 5.5 Navigation

- Centered **TIDL** wordmark is a hero brand signal in the header.  
- Transparent over heroes → frosted pinned bar (`blur(14px)`).  
- Dark/light themes swap ink/white wordmark.  
- Drawer: white plate, 24px left radii, restrained shadow.  

---

## 5.6 Pricing

- “FROM” as quiet uppercase meta  
- Price numerals heavy  
- “/mo” muted  
- Prefer currency formatting consistency from product data  

---

## 5.7 Feature lists / steps / stats

- Prefer vertical protocols over dense icon grids.  
- Stats appear as quiet plates — not neon KPI dashboards.  
- Numbered pathways use wordmark-like labels, not playful badge bubbles.  

---

## 5.8 Imagery

From `imagery.css`:

- Frames may carry a subtle gold→ink wash overlay.  
- Patient avatars: gold gradient disc, ink initials, weight 800.  
- Photos: slight desaturation (`saturate(0.94) contrast(1.03)`).  
- Product vials: centered, object-fit contain, soft drop shadows; avoid aggressive CSS masks that clip labels.  

---

## 5.9 Icons

- Prefer simple geometric / line icons.  
- Size: often 16–20px inline; larger for empty states.  
- Color: inherit ink/muted or gold for active.  
- Stroke should feel thin-modern, not chunky comic.  
- Spacing from labels: 8–10px.  
- No emoji as iconography in marketing UI.  

---

# 6. Motion System (Expanded)

| Interaction | Spec |
|-------------|------|
| Button hover | 0.3–0.4s ease-out premium curve; lift 1px; color/shadow |
| Card hover | Border + shadow 0.3s; optional translate |
| Section enter | Prefer opacity/transform Y small distances; avoid blur-filter animations on scroll |
| Progress | Linear-ish 0.18s width/height updates; glowing tip |
| Looping shine | ~2s infinite on premium elements only; pause offscreen when possible |
| Reduced motion | Kill infinite animations; keep instant state changes |

---

# 7. Reusable UI Patterns

## Pattern A — Section Opening

`Kicker (gold) → Display headline → One supporting sentence → CTA group`

Use at the start of every major band.

## Pattern B — Dark Product Theater

Near-black stage + specimen object + right rail brief + primary gold CTA.

Use for treatment discovery, pen showcases, protocol storytelling.

## Pattern C — Light Conversational Band

White canvas + ink type + subdued cards + Ask/FAQ energy.

Use for education, chat, trust Q&A.

## Pattern D — Dual CTA

Primary gold/ink button + quiet text/ghost “Start assessment” secondary.

## Pattern E — Pathway progress

Segmented or continuous gold progress with stop dots lighting as milestones are reached.

## Pattern F — Protocol card row

Thumbnail vial + uppercase meta (“Peptide protocol”) + name + FROM price.

**Why they work:** They repeat a recognizable grammar so users always know where to look (signal → claim → proof → action).

**Reuse when:** Introducing a new care story, pricing module, or interactive chooser.  
**Avoid when:** Building dense admin tables (use quieter app chrome).

---

# 8. What Should Never Change

These are non-negotiable for brand continuity:

1. Marketing typeface: **Helvetica Neue stack**.  
2. Brand gold: **`rgb(243, 195, 0)`** as primary accent (with bright/deep companions).  
3. Ink: **`#171310`** as warm near-black.  
4. Dark marketing canvas: **`#0b0a08`**.  
5. Wordmark treatment: uppercase, ultra-bold, tracked.  
6. Kicker language: uppercase + wide tracking + gold.  
7. Display tracking: slightly negative on large headlines.  
8. Restraint: gold is accent, not wallpaper.  
9. Touch targets ≥ 44px on primary actions.  
10. No purple-gradient “AI SaaS” look, no terracotta-cream editorial cliché, no emoji UI.  
11. Prefer soft large radii and soft shadows over hard 4px boxes.  
12. Section openings stay sparse — one idea at a time.  

---

# 9. Anti-Patterns (Do Not Ship)

- Inter / Roboto / system-ui-only heroes on marketing pages.  
- Purple-to-indigo gradients as brand identity.  
- Pure black `#000` large fields next to gold (prefer `#0b0a08`).  
- Centered long paragraphs over 70ch.  
- Multiple competing gold glows and shadows.  
- Heavy backdrop-filter on scrolljacking sections.  
- Clipping product photography with aggressive radial masks.  
- Stat strip + promo badges + schedule chips in a hero first viewport.  
- Using auth sand/gold tokens on homepage dark stages casually.  

---

# 10. Implementation Checklist for a New Section (Lovable / Designers)

- [ ] Declare Light Clinical vs Dark Stage.  
- [ ] Helvetica Neue for all marketing text.  
- [ ] Gold kicker with correct tracking.  
- [ ] Headline weight 700–800, negative tracking.  
- [ ] Body 400, muted correctly for surface.  
- [ ] CTA hierarchy clear; radii match context (pill vs 14px cabinet).  
- [ ] Spacing on 4/8 rhythm; section padding via clamp where helpful.  
- [ ] Borders at low alpha; shadows soft and large.  
- [ ] Motion uses primary cubic-bezier; respects reduced motion.  
- [ ] Imagery graded subtly; products fully visible.  
- [ ] Feels premium-clinical-athletic without copying an existing section’s layout.  

---

# 11. Quick Token Paste (for tools)

```css
:root {
  /* Brand */
  --tidl-gold: rgb(243, 195, 0);
  --tidl-gold-bright: rgb(255, 217, 46);
  --tidl-gold-deep: rgb(190, 152, 0);
  --tidl-gold-soft: rgba(243, 195, 0, 0.18);
  --tidl-ink: #171310;
  --tidl-stage: #0b0a08;
  --tidl-white: #ffffff;
  --tidl-text-on-dark: rgba(255, 255, 255, 0.82);
  --tidl-muted-on-dark: rgba(255, 255, 255, 0.45);
  --tidl-muted-on-light: rgba(23, 19, 16, 0.62);
  --tidl-line-on-dark: rgba(255, 255, 255, 0.08);
  --tidl-line-on-light: rgba(23, 19, 16, 0.1);

  /* Type */
  --tidl-font: "Helvetica Neue", Helvetica, Arial, ui-sans-serif, system-ui, sans-serif;
  --tidl-weight-body: 400;
  --tidl-weight-heading: 700;
  --tidl-weight-display: 800;
  --tidl-tracking-display: -0.02em;
  --tidl-tracking-kicker: 0.24em;

  /* Shape */
  --tidl-radius-btn: 14px;
  --tidl-radius-card: 18px;
  --tidl-radius-panel: 24px;
  --tidl-radius-pill: 999px;

  /* Motion */
  --tidl-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --tidl-duration: 0.35s;

  /* Shadow */
  --tidl-shadow-card: 0 24px 60px -24px rgba(48, 40, 30, 0.28);
  --tidl-shadow-gold: 0 12px 24px -10px rgba(243, 195, 0, 0.5);
}
```

---

# 12. Source Map (for engineers)

| Concern | Primary files |
|---------|---------------|
| Global tokens | `src/styles.css` |
| Typography binding | `src/styles/typography.css` |
| Imagery grade | `src/styles/imagery.css` |
| Header | `src/components/layout/site-header.css` |
| Homepage marketing | `src/components/home/home.css` |
| PDP | `src/components/pdp/pdp.css` |
| Checkout | `src/components/checkout/checkout.css` |
| Wordmark component | `src/components/brand/TidlWordmark.tsx` |

---

**End of official TIDL Design System documentation.**  
Treat deviations as intentional experiments only if they still pass the Visual DNA and What Should Never Change tests.
