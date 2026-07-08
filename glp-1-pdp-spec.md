# GLP-1 Weight Loss PDP Specification

> Product Detail Page (PDP) spec for the TIDL GLP-1 Weight Loss program.  
> Source: `public/TIDL.com Overview_08JUN26.docx`, existing homepage design system, and `src/lib/products.ts`.

---

## 1. Page purpose

The PDP is the **decision page for one product**. It is not a generic info page.

From the TIDL overview:

> *"The decision page for one product. Leads with the outcome, covers how it works, what is in it, what to expect, pricing, and safety, and carries reviews."*

**Primary goal:** Move a visitor from interest to **Take the Quiz** (medical intake + purchase path).

**Route (proposed):** `/products/glp-1-weight-loss`

**Product slug:** `glp-1-weight-loss`  
**Goal ID:** `weight-loss`

---

## 2. Product data (current codebase)

| Field | Value |
|---|---|
| Name | GLP-1 Weight Loss Program |
| Slug | `glp-1-weight-loss` |
| Description | Doctor-prescribed GLP-1 treatment with pre-dosed delivery. Personalized dosing based on your assessment. |
| Dosage | Personalized weekly dose |
| Monthly price | **$299/mo** |
| Goal | Weight loss |

Defined in: `src/lib/products.ts`

---

## 3. Brand and design rules

From `TIDL.com Overview_08JUN26.docx`:

| Rule | Application on PDP |
|---|---|
| Premium and medical | High-end telehealth feel, not discount or gray-market |
| Pen as hero object | Pre-dosed pen is the visual centerpiece |
| Benefit-led | Lead with outcomes, not clinical jargon |
| Mobile first | Layout and CTA optimized for phones |
| Trust over hype | Doctor-reviewed, prescription-only, licensed pharmacy |
| Adults only | 18+ gate already on site; PDP reinforces prescription-only |
| Social proof | Real reviews and photos on product pages |
| No em dashes | Use periods or commas in all copy |

**Tone:** Calm, legitimate, premium. Motion supports clarity, not entertainment.

---

## 4. Design tokens

From `tidl-mobile-responsive.skill.md` and `src/styles.css`:

| Token | Hex | Usage |
|---|---|---|
| Ink | `#171310` | Primary text, dark backgrounds |
| Cream | `#F7F3EC` / `#F3EDE3` | Light surfaces |
| Gold | `#C8A45A` | Primary accent |
| Gold bright | `#D6B36C` | Highlights, hovers |
| Gold deep | `#A88233` | Secondary accent |
| Muted warm | `#B9AE9E` | Secondary text |

**Typography:** `"HelveticaNowDisplay"` / `"Helvetica Now Display"`, plus Webflow utilities (`.display`, `.heading-01`, `.heading-02`, `.p2-regular`).

**Tailwind tokens:** `text-ink`, `text-ink-soft`, `text-gold`, `bg-gold`, `text-gold-deep`, etc.

Orange has been fully removed. Do not reintroduce it.

---

## 5. Animation and motion

The overview doc does not specify PDP animations. Match the **existing homepage motion language**.

### Libraries

- `framer-motion`
- `@react-spring/web`
- Scroll triggers via `IntersectionObserver` (Lenis-compatible on desktop)

### Patterns to reuse

| Pattern | Where used on home | PDP use |
|---|---|---|
| Word/letter stagger reveal | `CtaSection.tsx` | Hero headline, section titles |
| Blur + translateY entrance | `CtaSection.tsx`, `HowItWorksSection.tsx` | Body copy, feature cards |
| Pen levitation loop | TIDL Pen section (`#tdlp5`) | Hero pen image |
| Gold light blade / glow | TIDL Pen section | Behind hero pen |
| Scroll parallax | TIDL Pen float | Hero pen (light, optional on mobile) |
| Counter count-up | TIDL Pen stats | Optional stat row (100% doctor reviewed, etc.) |
| Timeline step bounce | `CtaSection.tsx` | How it works (Quiz → Review → Ship) |
| Connector line shimmer | `CtaSection.tsx` | Between timeline steps |
| Accordion expand | FAQ section | What to expect, safety FAQs |
| Button hover slide | Webflow buttons | All CTAs |

### Animation intensity by section

| Section | Level | Notes |
|---|---|---|
| Hero + pen | High | Levitation, glow, word stagger |
| Outcome block | Medium | Fade-in on scroll |
| How the pen works | Medium | Feature stagger |
| What's included | Low–medium | Icon/card stagger |
| Pricing | Minimal | Simple fade-in only |
| Safety | Minimal | Static badges |
| Reviews | Low | Card stagger |
| Sticky CTA | None | Always visible, no motion |

### Accessibility

- Respect `prefers-reduced-motion`: disable loops, parallax, shimmer, and stagger
- Minimum tap target: **44px** height on all buttons
- Native touch scroll on mobile (Lenis `smoothTouch: false`)

---

## 6. Page structure (top to bottom)

### Section 1 — Hero

**Purpose:** Immediate outcome + pen hero + primary CTA.

**Layout:**
- Desktop: split — copy left, pen image right
- Mobile: single column — pen image first, then copy, then CTA

**Content:**

| Element | Copy / asset |
|---|---|
| Headline | **Lose the weight. Keep it off.** |
| Subheadline | Doctor-prescribed GLP-1, pre-dosed in the TIDL Pen. Online in 5 minutes, delivered to your door. |
| Primary CTA | **Take the quiz** (opens quiz modal with `weight-loss` / `glp-1-weight-loss` preselected) |
| Hero image | TIDL Pen (reuse pen asset from `#tdlp5` or product-specific render) |

**Animation:**
- Headline: word stagger with blur fade (`useTrail` or framer-motion)
- Pen: levitation loop + gold light blade behind image
- CTA: Webflow-style hover slide on desktop

**Background:** Dark (ink) or cream with subtle grain, consistent with pen section aesthetic.

---

### Section 2 — Outcome block

**Purpose:** Who this is for and what results to expect.

**Content:**

| Element | Copy direction |
|---|---|
| Section title | Who this is for |
| Body | Adults seeking doctor-guided weight loss who want a simple, pre-dosed routine without mixing or measuring. |
| Bullets or cards | Steady weight loss under physician supervision · Pre-dosed pen, no vials or syringes · Ongoing care and dose adjustments · Discreet delivery to your door |
| Expected results | Individual results vary. Your provider sets your dose based on your health history and progress. |

**Animation:** Section fade-in on scroll; optional card stagger.

**Design:** Light cream background, ink text, gold accent on key phrases.

---

### Section 3 — How the TIDL Pen works

**Purpose:** Explain the differentiator (pre-dosed, no mixing).

**Content:** Reuse or adapt from homepage TIDL Pen section (`#tdlp5`).

| # | Feature | Description |
|---|---|---|
| 01 | Precision dose slider | Your dose, set to your prescription. Nothing to calculate. |
| 02 | Graduated dose scale | Clear markings from 0.1 to 1.0 ml. Zero guesswork. |
| 03 | Sealed and dispensed to you | Labeled with your name by a licensed US pharmacy. |
| 04 | Cold-chain shipped | Temperature-safe, discreet packaging to your door. |

**Headline:** GLP-1, pre-dosed. **Just click.**

**Animation:**
- Pen center with levitation, blade glow, parallax
- Left/right features stagger in on scroll (`tdlp5-on` pattern)
- Optional stats row: 100% doctor reviewed · 0 vials or syringes · 5 min quiz to intake · 1 click routine

**Background:** Dark (`#0B0A08`) with grain overlay, gold/amber accents.

---

### Section 4 — What's included

**Purpose:** Set expectations for the full care package, not just the medicine.

**Content:**

| Item | Description |
|---|---|
| Licensed provider review | A doctor in your state reads your intake before prescribing |
| Personalized prescription | GLP-1 dose tailored to your assessment |
| TIDL Pen delivery | Pre-dosed pen shipped from a licensed US pharmacy |
| Cold-chain shipping | Insulated packaging when temperature-sensitive |
| Ongoing care | Message your care team anytime about treatment or progress |
| Discreet packaging | Plain outer box, nothing on the outside that reveals contents |

**Layout:** 2×3 grid on desktop, single column on mobile.

**Animation:** Icon/card stagger on scroll.

**CTA (inline):** Take the quiz

---

### Section 5 — Pricing

**Purpose:** Transparent price before checkout. No surprises.

**Content:**

| Element | Value |
|---|---|
| Price | **$299/month** |
| Subtext | Includes provider review, prescription, and pen delivery. Pricing may vary based on your treatment plan. |
| What's included line | Doctor review · Prescription · Pre-dosed pen · Ongoing care |
| Note | HSA/FSA cards accepted at checkout (per overview doc) |

**Layout:** Centered pricing card on cream background. Clean, medical, no countdown timers or fake urgency.

**Animation:** Minimal fade-in only.

**CTA:** Take the quiz

---

### Section 6 — Safety and trust

**Purpose:** Reinforce legitimacy. Counter gray-market alternatives.

**Content:**

| Badge / point | Copy |
|---|---|
| Licensed provider | Every intake reviewed by a doctor licensed in your state |
| US pharmacy | Filled by a licensed US pharmacy, not an overseas supplier |
| Prescription only | You cannot buy this off a shelf. A real prescription is required. |
| Adults 18+ | Prescription-only treatment for adults |
| No algorithm prescribing | A human provider makes every medical decision |
| Secure checkout | Encrypted payment, clear policies |

**Layout:** Icon grid or horizontal trust bar. Muted cream or white background.

**Animation:** None or very subtle fade-in.

**Links:** Privacy policy, terms (footer links).

---

### Section 7 — Reviews / customer proof

**Purpose:** Social proof. "Proof from real people matters more than almost anywhere" (overview doc).

**Content:**

| Element | Direction |
|---|---|
| Section title | Real results from real patients |
| Review cards | 3-card grid (match homepage `#stories` pattern, not a carousel) |
| Each card | Quote, first name + last initial, optional photo, star rating |
| Disclaimer | Individual results vary. Reviews reflect personal experience. |

**Layout:**
- Desktop: 3 columns
- Mobile: single column stack (no carousel)

**Animation:** Card stagger fade-in on scroll.

**Note:** Use real approved reviews only. Claims cleared with counsel per overview rules.

---

### Section 8 — Sticky CTA (end of page)

**Purpose:** Persistent conversion path, especially on mobile.

**Behavior:**

| Viewport | Behavior |
|---|---|
| Mobile | Fixed bottom bar after user scrolls past hero. Full-width button. |
| Desktop | Optional floating bar or repeat CTA block before footer. |

**Content:**

| Element | Copy |
|---|---|
| Label | Ready to start? |
| Button | **Take the quiz** or **Get started** |
| Subtext (optional) | 5-minute intake · Doctor-reviewed · Discreet delivery |

**Interaction:**
- Tap opens quiz modal with `productSlug: "glp-1-weight-loss"` and `goal: "weight-loss"`
- No animation on the sticky bar itself
- Safe-area padding for notched devices (`env(safe-area-inset-bottom)`)
- z-index above page content, below quiz modal and age gate

**End of page flow:**

```
[Sticky CTA bar]
      ↓
[Site footer — same as homepage]
  · Treatments links
  · Company links
  · Newsletter signup
  · Social icons
  · © Copyright
```

---

## 7. User journey from PDP

```
PDP (this page)
  → Take the quiz (modal or /quiz?product=glp-1-weight-loss)
    → Quiz steps (goal pre-filled: weight loss)
      → Recommendation step (GLP-1 Weight Loss Program)
        → Checkout (/checkout)
          → Confirmation (/confirmation)
            → Account (/account)
```

**Entry paths to PDP:**
- Home → Services → Weight loss → PDP
- Category page (Weight Loss hub) → PDP
- AI search recommendation → PDP or direct to quiz
- Direct URL / SEO

**Exit without purchase:**
- Site remembers quiz progress (overview: email/text re-engagement)
- PDP sticky CTA remains available on return visit

---

## 8. Mobile layout summary

| Section | Mobile pattern |
|---|---|
| Hero | Pen image top, copy below, full-width CTA |
| Outcome | Single column cards |
| Pen features | Pen image first (`order: -1`), features stack below |
| What's included | Single column |
| Pricing | Centered card, full width |
| Safety | 2-column grid or stacked icons |
| Reviews | Single column, 3 cards stacked |
| Sticky CTA | Fixed bottom bar, 44px+ tap target |

Breakpoints: align with `479px`, `767px`, `992px` (Webflow) or Tailwind `sm`/`md`/`lg` for new sections.

---

## 9. Wireframe (ASCII)

```
┌─────────────────────────────────────────┐
│  NAVBAR                    [Get started]│
├─────────────────────────────────────────┤
│                                         │
│  Lose the weight.          ┌─────────┐  │
│  Keep it off.              │  PEN    │  │  HERO (dark/cream)
│                            │ (float) │  │
│  Doctor-prescribed GLP-1…  └─────────┘  │
│  [ Take the quiz ]                      │
│                                         │
├─────────────────────────────────────────┤
│  WHO THIS IS FOR                        │  OUTCOME (cream)
│  · Steady weight loss                   │
│  · Pre-dosed pen                        │
│  · Ongoing care                         │
├─────────────────────────────────────────┤
│  GLP-1, pre-dosed. Just click.          │  PEN (dark)
│  [features]  [PEN]  [features]          │
│  100% · 0 vials · 5 min · 1 click       │
├─────────────────────────────────────────┤
│  WHAT'S INCLUDED                        │  INCLUDED (light)
│  [icon] Provider  [icon] Prescription   │
│  [icon] Pen       [icon] Shipping       │
│  [icon] Care      [icon] Discreet       │
├─────────────────────────────────────────┤
│  $299 / month                           │  PRICING (cream)
│  Doctor · Rx · Pen · Care               │
│  [ Take the quiz ]                      │
├─────────────────────────────────────────┤
│  SAFETY & TRUST                         │  TRUST (light)
│  Licensed · US pharmacy · Rx only · 18+  │
├─────────────────────────────────────────┤
│  REAL RESULTS                           │  REVIEWS (cream)
│  [card] [card] [card]                   │
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────┐    │
│  │  Take the quiz          [sticky]│    │  STICKY CTA (mobile)
│  └─────────────────────────────────┘    │
├─────────────────────────────────────────┤
│  FOOTER                                 │
└─────────────────────────────────────────┘
```

---

## 10. Components to reuse from codebase

| Component / section | Path | Reuse on PDP |
|---|---|---|
| TIDL Pen section | `HomePage.tsx` + `home.css` (`#tdlp5`) | Section 3 (How pen works) |
| CTA timeline | `src/components/home/cta/CtaSection.tsx` | Optional mini "How it works" strip |
| Testimonials grid | `HomePage.tsx` (`#stories`) | Section 7 (Reviews) |
| FAQ accordion | `HomePage.tsx` (`#faq`) | Optional "What to expect" expandables |
| Quiz modal | `src/providers/quiz-modal-provider.tsx` | All CTAs |
| Product data | `src/lib/products.ts` | Pricing, slug, description |
| Button styles | Webflow `.button-01`, `.button-03` | All CTAs |
| Navbar + footer | `HomePage.tsx` | Page shell |

---

## 11. Copy guidelines

- Lead with **outcomes**, not mechanism of action
- Say **"Take the quiz"** on PDP CTAs (matches navbar and homepage)
- Never promise specific weight loss amounts without counsel approval
- Use **"licensed provider"** not "doctor" unless clinically accurate in context
- No em dashes anywhere
- Prescription-only and 18+ messaging should appear at least once above the fold and once near pricing

---

## 12. SEO and metadata (proposed)

| Field | Value |
|---|---|
| Title | GLP-1 Weight Loss Program \| Tidl Health |
| Description | Doctor-prescribed GLP-1 weight loss with the pre-dosed TIDL Pen. Take a 5-minute quiz, get reviewed by a licensed provider, and receive discreet delivery. |
| Canonical | `/products/glp-1-weight-loss` |
| OG image | Pen hero image |

Built for Google ranking and AI answer citation per overview doc.

---

## 13. Implementation checklist

- [ ] Create route: `src/routes/products/glp-1-weight-loss.tsx` (or dynamic `products/$slug.tsx`)
- [ ] Build `ProductPage` shell (navbar, footer, sticky CTA)
- [ ] Hero section with pen animation
- [ ] Outcome block
- [ ] Pen features section (extract from `HomePage` or shared component)
- [ ] What's included grid
- [ ] Pricing card wired to `products.ts`
- [ ] Safety/trust bar
- [ ] Reviews grid (placeholder or CMS-backed)
- [ ] Sticky CTA with quiz modal integration
- [ ] Mobile responsive pass per `tidl-mobile-responsive.skill.md`
- [ ] `prefers-reduced-motion` support
- [ ] Page meta in TanStack Router `head()`
- [ ] Link from homepage Weight Loss service card → PDP

---

## 14. Out of scope for PDP v1

Per overview doc timeline ("Now, by July"):

- AI search on PDP (site-wide feature, not page-specific)
- Post-ship pen how-to video (sent by text, not embedded on PDP)
- Patient portal content
- B2B clinic portal
- Personalized dosing calculator
- Live chat / text concierge UI

---

## 15. References

| Document / file | Purpose |
|---|---|
| `public/TIDL.com Overview_08JUN26.docx` | Business rules, page types, user journeys |
| `tidl-mobile-responsive.skill.md` | Breakpoints, tokens, section patterns |
| `how-tidl-works-section.md` | How It Works scroll section spec |
| `src/lib/products.ts` | Product slug, price, description |
| `src/components/home/cta/CtaSection.tsx` | Reference mobile-first Tailwind + animation pattern |
| `src/components/home/home.css` | Pen section styles (`tdlp5-*`) |

---

*Last updated: July 2026 · Product: GLP-1 Weight Loss · Slug: `glp-1-weight-loss`*
