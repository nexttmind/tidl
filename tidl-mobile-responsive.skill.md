# TIDL Mobile Responsive — Cursor Skill

> Drop this file in the repo (e.g. `.cursor/rules/tidl-mobile-responsive.md` or reference it directly in a Cursor chat) so Cursor has full context before touching any responsive CSS/JSX.

## 0. How to use this skill
When asked to "make the site mobile responsive" or to fix a specific section:
1. Read this file fully before editing anything.
2. Read the actual source files listed in §9 relevant to the section being touched — do not guess at current CSS from this doc alone, it may drift from the live code.
3. Follow the breakpoint scale in §2 for all new rules. Do not invent new breakpoints.
4. Work section-by-section in the phased order in §8. Do not touch sections marked "do not change" in §7.
5. After each section, run `npm run build` and confirm it passes before moving on.
6. Never introduce em dashes in any copy you touch or add.

---

## 1. Project context

- **Repo path:** `tidl-main`
- **Stack:** React 19 + Vite 8 + TanStack Start/Router
- **Homepage:** Webflow-exported HTML/CSS + custom `home.css`, new sections in Tailwind v4 + framer-motion + `@react-spring/web`
- **Scroll:** Lenis (`smoothTouch: false` — mobile uses native touch scroll, don't change this)
- **Webflow JS:** jQuery + Webflow IX2, reinitialized ~1.2s after hydration (scroll animations) — be careful, React re-renders can fight this
- **Entry route:** `/` → `src/components/home/HomePage.tsx`
- **Global providers:** Age gate, Quiz modal, Auth (`src/routes/__root.tsx`)
- **Viewport meta:** `width=device-width, initial-scale=1` (already set, don't touch)

### Stylesheet load order (highest priority last)
1. `src/styles.css` — Tailwind + design tokens
2. Webflow CDN shared CSS (external)
3. `public/webflow.css` — local overrides (orange → gold migration)
4. `src/components/home/home.css` — imported in `HomePage.tsx`, **highest priority on homepage**

**Known risk:** `home.css` desktop rules (Services + Stories grids especially) have no `@media` guards, so they silently override Webflow's mobile breakpoints. Any fix for those two sections must add explicit mobile guards in `home.css`, not rely on Webflow's own mobile CSS to "win."

---

## 2. Breakpoint strategy (standardize on this — mobile-first)

Do not add new arbitrary breakpoints. Use only these, mobile-first (`min-width` preferred; use `max-width` only when overriding an existing desktop-only rule that can't easily be flipped):

| Name | Width | Maps roughly to |
|---|---|---|
| base | 0–479px | phones portrait |
| sm | 480px | large phones / phone landscape |
| md | 768px | tablets |
| lg | 992px or 1024px | small laptops / tablet landscape |

Align with Webflow's existing breakpoints (`991px`, `767px`, `479px`) wherever a section is still Webflow-driven, so you're not fighting the legacy CSS. For net-new Tailwind sections (like CTA), Tailwind's own `sm:640px` / `lg:1024px` is fine — don't try to force those into the custom scale.

Legacy breakpoints currently scattered through `home.css` (`560px, 600px, 767px, 960px, 992px, 1024px`) should be consolidated toward this table as sections are touched — don't do a blanket find/replace across the whole file in one pass, just clean up the section you're working on.

---

## 3. Design tokens (do not change values, just reference)

| Token | Hex | Usage |
|---|---|---|
| Ink | `#171310` | primary text, dark backgrounds |
| Cream | `#F7F3EC` / `#F3EDE3` | light surfaces |
| Gold | `#C8A45A` | primary accent |
| Gold bright | `#D6B36C` | highlights, hovers |
| Gold deep | `#A88233` | secondary accent |
| Muted warm | `#B9AE9E` | secondary text |

Tailwind tokens live in `src/styles.css` (`text-gold`, `bg-gold`, `text-ink`, `text-ink-soft`, etc.). Orange has been fully removed — never reintroduce it.

Typography: `"HelveticaNowDisplay"` / `"Helvetica Now Display"` primary, plus Webflow utility classes (`.display`, `.heading-01`, `.heading-02`, `.p2-regular`, `.paragraph-2`).

**Copy rule:** no em dashes (—) anywhere in user-facing copy. Use periods or commas instead.

---

## 4. Section order (locked — do not reorder, add, or remove)

1. Announcement bar — `#tdlBar`
2. Navbar + mobile menu — `#navbar`
3. Hero — `.hero-01`
4. Services ("Pick your goal") — `#services`
5. Services closing statement — `ServicesClosing.tsx`
6. TIDL Pen — `#tdlp5`
7. Testimonials (3-card grid) — `#stories`
8. Journey — `#journey`
9. Families — `#families`
10. How TIDL Works — `#howItWorks`
11. Ask TIDL — `#askTidl`
12. FAQ — `#faq`
13. Final CTA — `cta/CtaSection.tsx`
14. Footer

**Never re-add:** Journal section, standalone pen video section (video is a modal on the pen image now), testimonials carousel (replaced by always-visible 3-card grid).

---

## 5. Per-section mobile spec

### A. Announcement bar (`.tdl-bar`)
- Already has `@media (max-width: 600px)` rules (smaller text, tighter padding).
- Status: mostly fine. Only touch if something regresses elsewhere.

### B. Navbar (`.navbar-wrap`)
- Desktop links live in `.navbar-info-left`, hidden on mobile by Webflow.
- Hamburger: `.nav-toggle-btn-wrap` → opens `.menu-wrap._02.open`, controlled by React `mobileNavOpen` state.
- Header CTA "Get Started" opens the quiz modal — **do not change this label**.
- **To verify/fix:** z-index stacking above other fixed elements (announcement bar, quiz sheet), safe-area padding on notch devices, and scroll lock on `<body>` while the mobile menu is open.

### C. Hero (`.hero-01`, `.hero-content-01`)
- Copy locked: "Lose the weight. Keep it off. Feel like you again." + sub + Get Started CTA.
- Background via `.service-v1-bg` + `.service-v1-overlay`.
- Current desktop-only override at `min-width: 1024px`: `min-height: 100vh`, flex-centered, `transform: translateY(-16vh)` on `.hero-content-01`. This only applies at 1024px+, so mobile currently gets bare Webflow defaults.
- **To do:** audit and add explicit mobile rules for heading size, vertical centering, CTA tap target (min 44px height), and background image crop/position so the subject isn't cut off on tall narrow screens.

### D. Services / "Pick your goal" (`#services`) — **P0, high priority**
Current problem in `home.css`:
```css
.service-list { grid-template-columns: repeat(3, 1fr); }
.service-item { min-height: 640px; }
```
No mobile `@media` guard at all, so 3 columns + 640px min-height renders on phones as-is (crushed or overflowing).

**Fix:**
- Add mobile-first override: base layout = single column, `min-height` reduced to something like `auto` or a much smaller fixed value (verify against actual card content).
- At `md` (768px) consider 2 columns if content allows; keep 3 columns only at `lg`+.
- Cards have a hover light-sweep effect and animated gold `::before`/`::after` pseudo-elements on the title — these are hover-oriented. On touch devices, either trigger the sweep on tap/focus or drop it gracefully (`@media (hover: hover)` guard) rather than leaving a dead hover-only effect.
- Consider whether horizontal scroll-snap or an accordion is a better mobile pattern than a tall single-column stack — decide based on number of cards and content length once you've read the actual JSX/CSS.

### E. Services closing (`ServicesClosing.tsx`)
- Scroll-triggered framer-motion: kicker letter reveal, phrase stagger, shimmer on "Real medicine."
- Gold frame corners + orbit glow + rule line, no mobile-specific CSS currently.
- **Risks to fix:** `letter-spacing: 0.28em` on the kicker may wrap awkwardly on narrow screens — consider reducing tracking or font size at `base`/`sm`. The `clamp(28px, 3.4vw, 46px)` headline may still run large on small screens — check actual rendered size at 360–390px width and tighten the clamp minimum/vw factor if needed.
- Respect `prefers-reduced-motion` (already partially handled — verify it fully disables the shimmer/stagger, not just shortens it).

### F. TIDL Pen (`.tdlp5-sec`)
- Already has responsive rules: `max-width: 960px` (single column, pen image first via `order: -1`), `max-width: 560px` (stats single column).
- Play button on pen image opens a YouTube modal (`.tdlp5-video-modal`).
- Parallax on pen float via scroll listener (kept light on mobile — leave as is).
- Counter animation on stats via IntersectionObserver.
- **To verify:** section padding (`128px 5%` may be excessive on phones), play button tap target size (44px min), modal internal padding (`36px` may be tight combined with safe-area on small phones — pull in a bit and add `env(safe-area-inset-*)` if the modal is fixed/full-bleed).

### G. Testimonials / Stories (`.stories-grid`) — **P0, high priority**
Current problem:
```css
.stories-grid { grid-template-columns: repeat(3, 1fr); }
```
No mobile breakpoint.

**Fix:** 1 column at `base`, optionally 2 columns at `md` (768px), 3 columns only at `lg`+. Keep the always-visible 3-card grid pattern — **do not reintroduce a carousel**.

### H. Journey (`.journey`) — **P1, high priority, needs new design**
- Desktop-only (`min-width: 992px`): sticky scroll (`height: 180vh`), spinning circle, absolutely-positioned ticker, centered arrows.
- Ticker is explicitly hidden below 767px (`.tidl-ticker { display: none; }`) with **no replacement**, so mobile currently falls back to a broken/empty Webflow layout.
- **This section needs an actual mobile redesign, not just CSS patches:**
  - Simplify to a vertical stack: title → supporting text → CTA.
  - Either replace the ticker with a static summary/ring graphic, or build a lightweight mobile-only version (no sticky scroll, no 180vh height hack).
  - Confirm with whoever owns content/design intent before inventing new copy — flag this as a decision point rather than silently fabricating a mobile ticker equivalent.

### I. Families (`.families`)
- Webflow layout + spacing fixes already in `home.css` (`.families-head`, `.paragraph-2`, `.families-btns`).
- Background image via `.families-bg`.
- No explicit mobile overrides yet.
- **To do:** audit card stacking order, background image scaling/cropping on narrow viewports, and CTA button spacing/wrap.

### J. How TIDL Works (`.works`) — **do not add custom overrides**
- 3 steps, each `.works-item._03-first` with thumbnail + info panel.
- Uses **original Webflow layout** — custom border/shadow overrides were deliberately reverted. Keep it that way.
- **To do:** only verify Webflow's own mobile rules are still working (nothing to build here); check that image overlays don't overflow on narrow screens. If something's broken, prefer fixing within Webflow's existing mobile classes rather than adding new custom CSS.

### K. Ask TIDL (`.ask-tidl`)
- Input + suggestion chips + mock AI-answer typewriter effect.
- Already has `@media (max-width: 600px)`: reduced padding, hidden chip dots.
- **To verify:** on-screen keyboard overlap with the input/CTA on real mobile browsers, and chip wrapping behavior with longer chip labels.

### L. FAQ (`.tdlfaq-sec`)
- Tab filters + accordion.
- Already has `@media (max-width: 600px)`: padding adjustments.
- **To do:** tab row needs either horizontal scroll (with a subtle fade/scroll-shadow affordance) or wrapping onto multiple lines on narrow screens — pick one pattern and apply consistently.

### M. Final CTA (`CtaSection.tsx`) — **reference pattern, mostly done**
- Already the most mobile-responsive section (Tailwind mobile-first).
- Grid: 1 column mobile → `lg:grid-cols-[1.05fr_1fr]`.
- Image first on mobile (`order-1`), copy second (`order-2`).
- **Only issue:** horizontal timeline steps may be cramped below ~400px viewport width — check on iPhone SE (375px) specifically and consider allowing horizontal scroll or reducing step count visually (e.g. smaller connector dots) at the narrowest breakpoint.
- Uses IntersectionObserver (Lenis-compatible, don't change), infinite loop animation on connector lines (respect `prefers-reduced-motion`).

### N. Footer (`.footer`)
- Text wordmark "TIDL" (`.footer-logo-wordmark`) — **not an image, keep it that way**.
- 4 link columns.
- **To do:** stack columns on mobile, verify link tap targets are at least 44px tall with adequate spacing between them.

---

## 6. JavaScript / interaction constraints (don't break these)

| Feature | Implementation | Mobile note |
|---|---|---|
| Lenis smooth scroll | always on for desktop wheel | `smoothTouch: false` — mobile already uses native scroll, don't change |
| Webflow IX2 | reinit ~1.2s post-load | test scroll animations on mobile after any React re-render changes |
| Quiz modal | bottom sheet, `max-height: 92dvh` | already mobile-first, leave as reference |
| Pen video modal | fixed overlay, 16:9 iframe | add smaller padding on phones |
| Ask TIDL | mock responses from `ANSWERS` map | no real API, don't add one |
| FAQ | React state accordion | fine as-is |
| ServicesClosing | framer-motion + IntersectionObserver | must respect `prefers-reduced-motion` |
| Ticker (Journey) | `requestAnimationFrame` loop | hidden below 767px — see §5H, needs real fix not just hiding |

`useIsMobile` hook exists at `src/hooks/use-mobile.tsx` (breakpoint 768px) but is **currently unused on the homepage** — consider whether any JSX-level conditional rendering (e.g. simplified Journey markup) should use this hook rather than pure CSS hiding, since some sections (Journey especially) may need different DOM, not just different styles.

---

## 7. Hard constraints — do not change

- Section order (§4).
- Gold palette — no orange anywhere.
- How TIDL Works — Webflow original styling, no custom border/shadow overrides.
- Footer — text wordmark, not an image.
- No em dashes in any copy.
- Testimonials — keep the 3-card grid; do not bring back the carousel.
- Pen video — keep the modal-on-image pattern, not a standalone section.
- Header CTA copy stays "Get Started".
- `npm run build` must pass after every change.

---

## 8. Phased rollout

**P0 (do first):**
- Services grid (§5D)
- Stories/Testimonials grid (§5G)
- Hero (§5C)
- Navbar (§5B)

**P1 (do second):**
- Journey redesign (§5H) — needs design decision, flag before building
- Families (§5I)
- How TIDL Works audit only, no rebuild (§5J)

**P2 (polish pass):**
- TIDL Pen padding/modal tweaks (§5F)
- Ask TIDL keyboard/chip checks (§5K)
- FAQ tab row (§5L)
- Final CTA timeline tightening (§5M)
- Footer column stacking (§5N)
- Funnel pages (§10 below), safe-area insets across all fixed/modal elements

---

## 9. Key files to actually read before editing

```
src/components/home/HomePage.tsx          # all sections, state, effects
src/components/home/home.css              # custom homepage styles (~1629 lines)
src/components/home/ServicesClosing.tsx    # animated closing block
src/components/home/cta/CtaSection.tsx     # reference for good mobile patterns
src/components/home/cta/ContourField.tsx
public/webflow.css                         # Webflow overrides
src/styles.css                             # Tailwind tokens
src/routes/__root.tsx                      # CSS load order, Webflow scripts
src/hooks/use-mobile.tsx
src/components/quiz/quiz.css
src/components/quiz/QuizModal.tsx
```

---

## 10. Funnel pages (secondary, in scope for P2)

| Route | Layout | Status |
|---|---|---|
| `/quiz` | `QuizLayout.tsx` | fixed bottom footer, `max-w-2xl`, OK |
| `/checkout` | `CheckoutLayout.tsx` | stacks until `lg` (1024px) |
| `/confirmation` | simple page | basic responsive |
| `/account` | simple page | basic responsive |
| Quiz modal (global) | bottom sheet portal | mobile-first, one rule at 640px in `quiz.css` |

---

## 11. Test matrix

Test every touched section against:

| Device | Width |
|---|---|
| iPhone SE | 375px |
| iPhone 14 | 390px |
| Android (generic) | 360px |
| iPad (portrait) | 768px |
| iPad (landscape) | 1024px |

Also check:
- `prefers-reduced-motion: reduce` disables/simplifies framer-motion and ticker/parallax effects.
- Safe-area insets (`env(safe-area-inset-*)`) on fixed elements: announcement bar, quiz bottom sheet, video modal, mobile nav.
- No horizontal overflow anywhere (common culprits: wide letter-spacing text, animated pseudo-elements, the CTA timeline).
- `npm run build` passes.

---

## 12. Implementation notes

- Prefer extending `home.css` with mobile-first `@media (min-width: ...)` rules for Webflow-descended sections, since that's where the specificity war is happening (§1 risk). Only migrate a section to Tailwind if it's a near-total rebuild (Journey is the likely candidate given §5H).
- `CtaSection.tsx` is the reference for "what good mobile-first looks like here" — match its patterns (order utilities, mobile-first grid, IntersectionObserver usage) when rebuilding Journey or Services.
- Don't do a repo-wide breakpoint find/replace in one shot — clean up breakpoints section-by-section as you touch each one, to keep diffs reviewable and avoid regressions in sections not yet audited.
