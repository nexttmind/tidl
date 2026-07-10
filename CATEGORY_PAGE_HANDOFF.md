# Category / Catalog Page — Exact Code Handoff

**URL:** `/category/weight-loss` (also `/category/testosterone`, `/category/longevity`)  
**Local:** `http://localhost:8081/category/weight-loss`  
**Stack:** React + TanStack Router + CSS (`category.css` + shared `home.css` for chrome/header/footer)

Use this pack to redesign the catalog UI/UX. All page-specific source is included below.

---

## Architecture map

```
/category/$slug
  └─ src/routes/category/$slug.tsx          → route + SEO head + notFound guard
       └─ CategoryPage(slug)
            ├─ src/components/category/CategoryPage.tsx
            ├─ src/components/category/category.css   ← primary page styles
            ├─ src/components/home/home.css           ← SiteHeader / tdl-bar / footer chrome
            ├─ src/lib/categories.ts                  ← copy + structure per slug
            ├─ src/lib/product-catalog.ts             ← product cards in category
            ├─ src/lib/trust-content.ts               ← TRUST_STATS / TRUST_PILLARS
            ├─ SiteHeader / SiteFooter / useQuizModal / useSiteHeaderState
            └─ SITE_IMAGES via categories (hero, pen)
```

### Page sections (DOM order)
1. Announcement bar (`.tdl-bar` from `home.css`)
2. `SiteHeader` + **Hero** (`.cat-hero`)
3. **Trust stats** (`.cat-trust-stats`)
4. **Education** (`.cat-education`)
5. **How it works** (`.cat-how`)
6. **Pen spotlight** (`.cat-pen`) — weight-loss + longevity only
7. **Why TIDL pillars** (`.cat-pillars`)
8. **Programs / product cards** (`.cat-products`) — only if `productSlugs` non-empty
9. **Safety** (`.cat-safety`)
10. **FAQ** (`.cat-faq`)
11. **CTA band** (`.cat-cta-band`)
12. `SiteFooter`

### Weight-loss specifics
- Slug: `weight-loss`
- Product: `glp-1-weight-loss` → card + hero secondary CTA to PDP
- Has `penSpotlight`
- Quiz goal mapping: `weight-loss`

### Shared deps (not inlined here; import from app)
- `@/components/layout/SiteHeader`, `SiteFooter`
- `@/hooks/useSiteHeaderState`
- `@/providers/quiz-modal-provider` (`useQuizModal`)
- `@/lib/age-gate` (scroll lock for mobile menu)
- `@/lib/pricing` (`formatCurrency`)
- `@/lib/products` (`getGoalFromProduct`, `getProductBySlug` for price)
- `@/lib/site-assets` (`SITE_IMAGES`)
- `../home/home.css` for `.tdl-bar`, header/footer utilities

---

## FILE 1 — Route `src/routes/category/$slug.tsx`

```tsx
import { createFileRoute, notFound } from "@tanstack/react-router";
import { CategoryPage, isCategorySlug } from "@/components/category/CategoryPage";
import { getCategory } from "@/lib/categories";

export const Route = createFileRoute("/category/$slug")({
  head: ({ params }) => {
    if (!isCategorySlug(params.slug)) {
      return { meta: [{ title: "Not Found | Tidl Health" }] };
    }
    const category = getCategory(params.slug);
    return {
      meta: [
        { title: category.metaTitle },
        { name: "description", content: category.metaDescription },
        { property: "og:title", content: category.metaTitle },
        { property: "og:description", content: category.metaDescription },
        { property: "og:type", content: "website" },
      ],
    };
  },
  component: CategoryRoute,
});

function CategoryRoute() {
  const { slug } = Route.useParams();
  if (!isCategorySlug(slug)) {
    throw notFound();
  }
  return <CategoryPage slug={slug} />;
}

```

---

## FILE 2 — Page `src/components/category/CategoryPage.tsx`

```tsx
import { useCallback, useEffect, useState, type MouseEvent } from "react";
import { Link } from "@tanstack/react-router";
import { useQuizModal } from "@/providers/quiz-modal-provider";
import { lockPageScroll, unlockPageScroll } from "@/lib/age-gate";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { useSiteHeaderState } from "@/hooks/useSiteHeaderState";
import {
  getCatalogProduct,
  getCatalogPrice,
  PRODUCT_PATHS,
} from "@/lib/product-catalog";
import {
  CATEGORIES,
  CATEGORY_SLUGS,
  getCategory,
  type CategorySlug,
} from "@/lib/categories";
import { formatCurrency } from "@/lib/pricing";
import { getGoalFromProduct } from "@/lib/products";
import type { GoalId, ProductSlug } from "@/types/quiz";
import "../home/home.css";
import "./category.css";

type CategoryPageProps = {
  slug: CategorySlug;
};

const CATEGORY_GOALS: Record<CategorySlug, GoalId> = {
  "weight-loss": "weight-loss",
  testosterone: "hormonal-health",
  longevity: "longevity",
};

function CategoryFaq({
  items,
}: {
  items: readonly { id: number; q: string; a: string }[];
}) {
  return (
    <div className="cat-faq-list">
      {items.map((item) => (
        <details className="cat-faq-item" key={item.id}>
          <summary className="cat-faq-q">{item.q}</summary>
          <p className="cat-faq-a">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function CategoryPage({ slug }: CategoryPageProps) {
  const category = getCategory(slug);
  const { openModal } = useQuizModal();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { pinned: headerPinned, theme: headerTheme, transparent: headerTransparent } =
    useSiteHeaderState({ defaultTheme: "light" });

  const openQuiz = useCallback(
    (productSlug?: ProductSlug) => (e?: MouseEvent) => {
      e?.preventDefault();
      const slugToUse = productSlug ?? category.productSlugs[0] ?? "glp-1-weight-loss";
      const goal = getGoalFromProduct(slugToUse) ?? CATEGORY_GOALS[category.slug];
      openModal({ product: slugToUse, goal });
    },
    [category.productSlugs, category.slug, openModal],
  );

  useEffect(() => {
    if (!mobileNavOpen) return;
    lockPageScroll();
    return () => unlockPageScroll();
  }, [mobileNavOpen]);

  const navLinks = CATEGORY_SLUGS.map((item) => ({
    to: `/category/${item}` as const,
    label: CATEGORIES[item].navLabel,
  }));

  const products = category.productSlugs
    .map((productSlug) => getCatalogProduct(productSlug))
    .filter((item) => item !== undefined);

  return (
    <div className="cat-page">
      <div className="cat-hero-stage site-chrome-stage">
        <div className="tdl-bar" id="tdlBar">
          <div className="tdl-bar-inner">
            <span className="tdl-msg">TIDL is now a telehealth platform. Care that delivers results.</span>
            <Link to="/" className="tdl-link">
              Learn more
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="cat-hero-surface">
          <SiteHeader
            navLinks={navLinks.map((item) => ({ href: item.to, label: item.label }))}
            menuOpen={mobileNavOpen}
            pinned={headerPinned}
            transparent={headerTransparent}
            theme={headerTheme}
            onToggleMenu={() => setMobileNavOpen((open) => !open)}
            onCloseMenu={() => setMobileNavOpen(false)}
          />

          <section className="cat-hero" data-site-header-theme="light">
            <div className="cat-hero-shell">
              <div className="cat-hero-copy">
                <p className="cat-kicker">{category.kicker}</p>
                <h1 className="cat-title">{category.headline}</h1>
                <p className="cat-lead">{category.lead}</p>
                <p className="cat-lead-extended">{category.extendedLead}</p>
                <div className="cat-hero-actions">
                  <button type="button" className="cat-btn cat-btn--primary" onClick={openQuiz()}>
                    Get Started
                  </button>
                  <Link to="/products/glp-1-weight-loss" className="cat-btn cat-btn--ghost">
                    More info
                  </Link>
                </div>
              </div>
              <div className="cat-hero-visual">
                <img src={category.heroImage} alt="" loading="eager" className="cat-hero-img" />
              </div>
            </div>
          </section>
        </div>
      </div>

      <section className="cat-trust-stats" aria-label="TIDL trust signals" data-site-header-theme="light">
        <div className="cat-trust-stats-inner">
          {category.trustStats.map((stat) => (
            <div className="cat-trust-stat" key={stat.label}>
              <span className="cat-trust-stat-value">{stat.value}</span>
              <span className="cat-trust-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="cat-education" data-site-header-theme="light">
        <div className="cat-education-inner">
          <header className="cat-section-head">
            <p className="cat-kicker">Learn more</p>
            <h2 className="cat-section-title">{category.educationTitle}</h2>
          </header>
          <div className="cat-education-grid">
            {category.educationBlocks.map((block) => (
              <article className="cat-education-card" key={block.title}>
                <h3 className="cat-education-card-title">{block.title}</h3>
                <p className="cat-education-card-body">{block.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cat-how" data-site-header-theme="light">
        <div className="cat-how-inner">
          <header className="cat-section-head">
            <p className="cat-kicker">How it works</p>
            <h2 className="cat-section-title">From intake to your door</h2>
          </header>
          <ol className="cat-how-steps">
            {category.howItWorks.map((step) => (
              <li className="cat-how-step" key={step.step}>
                <span className="cat-how-step-num">{step.step}</span>
                <div className="cat-how-step-copy">
                  <h3 className="cat-how-step-label">{step.label}</h3>
                  <p className="cat-how-step-detail">{step.detail}</p>
                </div>
                <span className="cat-how-step-duration">{step.duration}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {category.penSpotlight ? (
        <section className="cat-pen" data-site-header-theme="dark">
          <div className="cat-pen-inner">
            <div className="cat-pen-copy">
              <p className="cat-kicker cat-kicker--light">{category.penSpotlight.kicker}</p>
              <h2 className="cat-pen-title">{category.penSpotlight.title}</h2>
              <p className="cat-pen-lead">{category.penSpotlight.lead}</p>
              <p className="cat-pen-trust">{category.penSpotlight.trustNote}</p>
              <Link to="/#tdlp5" className="cat-btn cat-btn--primary">
                See the pen on homepage
              </Link>
            </div>
            <div className="cat-pen-visual">
              <img src={category.penSpotlight.image} alt="" loading="lazy" className="cat-pen-img" />
            </div>
            <div className="cat-pen-features">
              {category.penSpotlight.features.map((feature) => (
                <article className="cat-pen-feature" key={feature.num}>
                  <span className="cat-pen-feature-num">{feature.num}</span>
                  <h3 className="cat-pen-feature-title">{feature.title}</h3>
                  <p className="cat-pen-feature-body">{feature.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="cat-pillars" data-site-header-theme="light">
        <div className="cat-pillars-wrap">
          <header className="cat-section-head cat-section-head--center">
            <p className="cat-kicker">Why TIDL</p>
            <h2 className="cat-section-title">Care built to earn your trust</h2>
          </header>
          <div className="cat-pillars-inner">
            {category.pillars.map((pillar, index) => (
              <article className="cat-pillar" key={pillar.title}>
                <span className="cat-pillar-num">{(index + 1).toString().padStart(2, "0")}</span>
                <h3 className="cat-pillar-title">{pillar.title}</h3>
                <p className="cat-pillar-body">{pillar.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {products.length > 0 ? (
      <section className="cat-products" id="category-products" data-site-header-theme="dark">
        <div className="cat-products-inner">
          <header className="cat-products-head">
            <p className="cat-kicker cat-kicker--light">Programs in this category</p>
            <h2 className="cat-products-title">Choose your {category.title.toLowerCase()} treatment</h2>
          </header>

          <div className="cat-product-grid">
            {products.map((product) => (
              <article className={`cat-product-card cat-product-card--${product.form}`} key={product.slug}>
                <span className={`cat-form-badge cat-form-badge--${product.form}`}>
                  {product.form === "pen" ? "TIDL Pen" : "Prescription protocol"}
                </span>
                <div className="cat-product-media">
                  <img src={product.image} alt="" loading="lazy" />
                </div>
                <h3 className="cat-product-name">{product.shortName}</h3>
                <p className="cat-product-summary">{product.summary}</p>
                <ul className="cat-product-highlights">
                  {product.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <p className="cat-product-price">
                  From {formatCurrency(getCatalogPrice(product.slug))}
                  <span>/month</span>
                </p>
                <div className="cat-product-actions">
                  <Link to={PRODUCT_PATHS[product.slug]} className="cat-btn cat-btn--primary">
                    View product page
                  </Link>
                  <button type="button" className="cat-btn cat-btn--ghost" onClick={openQuiz(product.slug)}>
                    Start intake
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      ) : null}

      <section className="cat-safety" data-site-header-theme="dark">
        <div className="cat-safety-inner">
          <header className="cat-section-head cat-section-head--center cat-section-head--light">
            <p className="cat-kicker cat-kicker--light">Safety and standards</p>
            <h2 className="cat-section-title cat-section-title--light">Real medicine. Real oversight.</h2>
          </header>
          <div className="cat-safety-grid">
            {category.trustPillars.map((pillar) => (
              <article className="cat-safety-card" key={pillar.id}>
                <span className="cat-safety-num">{pillar.num}</span>
                <h3 className="cat-safety-label">{pillar.label}</h3>
                <p className="cat-safety-detail">{pillar.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cat-faq" data-site-header-theme="light">
        <div className="cat-faq-inner">
          <header className="cat-section-head">
            <p className="cat-kicker">Common questions</p>
            <h2 className="cat-section-title">Answers before you start</h2>
          </header>
          <CategoryFaq items={category.faqItems} />
        </div>
      </section>

      <section className="cat-cta-band" data-site-header-theme="light">
        <div className="cat-cta-inner">
          <h2 className="cat-cta-title">Ready to start {category.title.toLowerCase()} care?</h2>
          <p className="cat-cta-lead">
            Take the five-minute quiz. A licensed provider reviews your plan. Treatment ships discreetly to your door.
          </p>
          <button type="button" className="cat-btn cat-btn--primary" onClick={openQuiz()}>
            {category.ctaLabel}
          </button>
        </div>
      </section>

      <div data-site-header-theme="dark">
        <SiteFooter onGetStarted={openQuiz()} />
      </div>
    </div>
  );
}

export function isCategorySlug(value: string): value is CategorySlug {
  return (CATEGORY_SLUGS as readonly string[]).includes(value);
}

```

---

## FILE 3 — Styles `src/components/category/category.css`

```css
.cat-page {
  background: #ffffff;
  color: #171310;
}

.cat-hero-stage {
  background: #171310;
}

.cat-hero-surface {
  background: #ffffff;
  border-radius: 44px 44px 0 0;
  overflow: hidden;
}

.cat-hero {
  padding: clamp(48px, 8vw, 96px) max(20px, 5%);
}

.cat-hero-shell {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: clamp(24px, 5vw, 56px);
  align-items: center;
  max-width: 1320px;
  margin: 0 auto;
}

.cat-kicker {
  margin: 0 0 10px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgb(190, 152, 0);
}

.cat-kicker--light {
  color: rgb(243, 195, 0);
}

.cat-title {
  margin: 0;
  font-size: clamp(2rem, 5vw, 3.6rem);
  line-height: 1.02;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.cat-lead {
  margin: 16px 0 0;
  max-width: 48ch;
  font-size: 1.05rem;
  line-height: 1.7;
  color: rgba(23, 19, 16, 0.66);
}

.cat-lead-extended {
  margin: 12px 0 0;
  max-width: 52ch;
  font-size: 0.98rem;
  line-height: 1.7;
  color: rgba(23, 19, 16, 0.52);
}

.cat-section-head {
  max-width: 720px;
  margin-bottom: 28px;
}

.cat-section-head--center {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.cat-section-title {
  margin: 0;
  font-size: clamp(1.6rem, 3.5vw, 2.4rem);
  line-height: 1.08;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.cat-section-title--light {
  color: #ffffff;
}

.cat-trust-stats {
  padding: 0 max(20px, 5%) 12px;
  background: #ffffff;
}

.cat-trust-stats-inner {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  max-width: 1320px;
  margin: 0 auto;
}

.cat-trust-stat {
  padding: 18px 20px;
  border-radius: 18px;
  border: 1px solid rgba(23, 19, 16, 0.08);
  background: rgba(23, 19, 16, 0.02);
  text-align: center;
}

.cat-trust-stat-value {
  display: block;
  font-size: 1.7rem;
  font-weight: 800;
  color: rgb(190, 152, 0);
}

.cat-trust-stat-label {
  display: block;
  margin-top: 4px;
  font-size: 0.82rem;
  color: rgba(23, 19, 16, 0.55);
}

.cat-education,
.cat-how,
.cat-faq {
  padding: clamp(56px, 8vw, 88px) max(20px, 5%);
  background: #ffffff;
}

.cat-education-inner,
.cat-how-inner,
.cat-faq-inner,
.cat-pillars-wrap,
.cat-safety-inner {
  max-width: 1320px;
  margin: 0 auto;
}

.cat-education-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.cat-education-card {
  padding: 24px;
  border-radius: 20px;
  border: 1px solid rgba(23, 19, 16, 0.08);
  background: #ffffff;
}

.cat-education-card-title {
  margin: 0 0 10px;
  font-size: 1.1rem;
  font-weight: 700;
}

.cat-education-card-body {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.65;
  color: rgba(23, 19, 16, 0.66);
}

.cat-how-steps {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 12px;
}

.cat-how-step {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 16px;
  align-items: start;
  padding: 20px 22px;
  border-radius: 18px;
  border: 1px solid rgba(23, 19, 16, 0.08);
  background: rgba(23, 19, 16, 0.02);
}

.cat-how-step-num {
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  color: rgb(190, 152, 0);
}

.cat-how-step-label {
  margin: 0 0 6px;
  font-size: 1.05rem;
  font-weight: 700;
}

.cat-how-step-detail {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.6;
  color: rgba(23, 19, 16, 0.62);
}

.cat-how-step-duration {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(23, 19, 16, 0.45);
  white-space: nowrap;
}

.cat-pen {
  padding: clamp(64px, 8vw, 96px) max(20px, 5%);
  background: #0b0a08;
  color: #ffffff;
}

.cat-pen-inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.9fr);
  gap: 24px 32px;
  max-width: 1320px;
  margin: 0 auto;
  align-items: center;
}

.cat-pen-title {
  margin: 0;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  line-height: 1.05;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.cat-pen-lead {
  margin: 14px 0 0;
  max-width: 48ch;
  font-size: 1rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.68);
}

.cat-pen-trust {
  margin: 12px 0 0;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.45);
}

.cat-pen-copy .cat-btn {
  margin-top: 20px;
}

.cat-pen-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 320px;
  border-radius: 24px;
  background: radial-gradient(circle at 50% 40%, rgba(243, 195, 0, 0.12), transparent 62%);
}

.cat-pen-img {
  width: min(100%, 360px);
  height: auto;
  object-fit: contain;
  display: block;
}

.cat-pen-features {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-top: 8px;
}

.cat-pen-feature {
  padding: 18px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
}

.cat-pen-feature-num {
  display: block;
  margin-bottom: 8px;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  color: rgb(243, 195, 0);
}

.cat-pen-feature-title {
  margin: 0 0 6px;
  font-size: 1rem;
  font-weight: 700;
}

.cat-pen-feature-body {
  margin: 0;
  font-size: 0.88rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.62);
}

.cat-product-highlights {
  margin: 12px 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 6px;
}

.cat-product-highlights li {
  position: relative;
  padding-left: 16px;
  font-size: 0.86rem;
  color: rgba(255, 255, 255, 0.62);
}

.cat-product-highlights li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgb(243, 195, 0);
}

.cat-safety {
  padding: clamp(56px, 8vw, 88px) max(20px, 5%);
  background: #171310;
  color: #ffffff;
}

.cat-safety-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.cat-safety-card {
  padding: 22px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
}

.cat-safety-num {
  display: block;
  margin-bottom: 8px;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  color: rgb(243, 195, 0);
}

.cat-safety-label {
  margin: 0 0 6px;
  font-size: 1.02rem;
  font-weight: 700;
}

.cat-safety-detail {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.62);
}

.cat-faq-list {
  display: grid;
  gap: 10px;
  max-width: 820px;
}

.cat-faq-item {
  border-radius: 16px;
  border: 1px solid rgba(23, 19, 16, 0.1);
  background: rgba(23, 19, 16, 0.02);
  overflow: hidden;
}

.cat-faq-q {
  padding: 18px 20px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  list-style: none;
}

.cat-faq-q::-webkit-details-marker {
  display: none;
}

.cat-faq-a {
  margin: 0;
  padding: 0 20px 18px;
  font-size: 0.95rem;
  line-height: 1.65;
  color: rgba(23, 19, 16, 0.66);
}

.cat-hero-actions,
.cat-product-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
}

.cat-hero-visual {
  border-radius: 28px;
  overflow: hidden;
  min-height: 320px;
  background: rgba(23, 19, 16, 0.04);
}

.cat-hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  min-height: 320px;
}

.cat-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 24px;
  border-radius: 999px;
  font-size: 0.92rem;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid transparent;
}

.cat-btn--primary {
  background: rgb(243, 195, 0);
  color: #171310;
  border-color: rgb(243, 195, 0);
}

.cat-btn--ghost {
  background: transparent;
  color: #171310;
  border-color: rgba(23, 19, 16, 0.16);
}

.cat-pillars {
  padding: clamp(56px, 8vw, 96px) max(20px, 5%);
  background: #ffffff;
}

.cat-pillars-inner {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  max-width: 1320px;
  margin: 0 auto;
}

.cat-pillar {
  padding: 24px;
  border-radius: 20px;
  border: 1px solid rgba(23, 19, 16, 0.08);
  background: #ffffff;
}

.cat-pillar-num {
  display: block;
  margin-bottom: 10px;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  color: rgb(190, 152, 0);
}

.cat-pillar-title {
  margin: 0 0 8px;
  font-size: 1.15rem;
  font-weight: 700;
}

.cat-pillar-body {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(23, 19, 16, 0.66);
}

.cat-products {
  padding: clamp(64px, 8vw, 104px) max(20px, 5%);
  background: #0b0a08;
  color: #ffffff;
}

.cat-products-inner {
  max-width: 1320px;
  margin: 0 auto;
}

.cat-products-title {
  margin: 0;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  line-height: 1.08;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.cat-product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 32px;
}

.cat-product-card {
  padding: 22px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
}

.cat-form-badge {
  display: inline-flex;
  margin-bottom: 14px;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.cat-form-badge--pen {
  border: 1px solid rgba(243, 195, 0, 0.4);
  color: rgb(243, 195, 0);
}

.cat-form-badge--pill {
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.8);
}

.cat-product-media {
  aspect-ratio: 4 / 3;
  border-radius: 18px;
  overflow: hidden;
  margin-bottom: 16px;
  background: #171310;
}

.cat-product-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.cat-product-card--pen .cat-product-media img {
  object-fit: contain;
  padding: 10%;
}

.cat-product-name {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
}

.cat-product-summary {
  margin: 10px 0 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.68);
}

.cat-product-price {
  margin: 14px 0 0;
  font-size: 1.05rem;
  font-weight: 700;
}

.cat-product-price span {
  font-size: 0.88rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.55);
}

.cat-cta-band {
  padding: clamp(56px, 8vw, 88px) max(20px, 5%);
  background: #ffffff;
}

.cat-cta-inner {
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
}

.cat-cta-title {
  margin: 0;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 800;
  letter-spacing: -0.03em;
}

.cat-cta-lead {
  margin: 14px 0 0;
  font-size: 1rem;
  line-height: 1.65;
  color: rgba(23, 19, 16, 0.66);
}

.cat-cta-inner .cat-btn {
  margin-top: 24px;
}

.cat-products .cat-btn--ghost {
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.22);
}

@media (max-width: 900px) {
  .cat-hero-shell,
  .cat-pillars-inner,
  .cat-education-grid,
  .cat-pen-inner,
  .cat-pen-features,
  .cat-safety-grid,
  .cat-trust-stats-inner {
    grid-template-columns: 1fr;
  }

  .cat-how-step {
    grid-template-columns: auto 1fr;
  }

  .cat-how-step-duration {
    grid-column: 2;
  }
}

@media (hover: hover) and (pointer: fine) {
  .cat-btn--primary:hover {
    filter: brightness(1.05);
  }
}

```

---

## FILE 4 — Category copy/data `src/lib/categories.ts`

```ts
import type { ProductSlug } from "@/types/quiz";
import { SITE_IMAGES } from "@/lib/site-assets";
import { TRUST_PILLARS, TRUST_STATS } from "@/lib/trust-content";

export const CATEGORY_SLUGS = ["weight-loss", "testosterone", "longevity"] as const;
export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export type CategoryEducationBlock = {
  title: string;
  body: string;
};

export type CategoryTimelineStep = {
  step: string;
  label: string;
  detail: string;
  duration: string;
};

export type CategoryFaqItem = {
  id: number;
  q: string;
  a: string;
};

export type CategoryPenSpotlight = {
  kicker: string;
  title: string;
  lead: string;
  image: string;
  features: readonly { num: string; title: string; body: string }[];
  trustNote: string;
};

export type CategoryDefinition = {
  slug: CategorySlug;
  navLabel: string;
  title: string;
  kicker: string;
  headline: string;
  lead: string;
  extendedLead: string;
  heroImage: string;
  productSlugs: ProductSlug[];
  pillars: readonly { title: string; body: string }[];
  educationTitle: string;
  educationBlocks: readonly CategoryEducationBlock[];
  howItWorks: readonly CategoryTimelineStep[];
  penSpotlight?: CategoryPenSpotlight;
  faqItems: readonly CategoryFaqItem[];
  ctaLabel: string;
  metaTitle: string;
  metaDescription: string;
  trustStats: typeof TRUST_STATS;
  trustPillars: typeof TRUST_PILLARS;
};

export const CATEGORIES: Record<CategorySlug, CategoryDefinition> = {
  "weight-loss": {
    slug: "weight-loss",
    navLabel: "Weight loss",
    title: "Weight Loss",
    kicker: "Clinical weight care",
    headline: "How to lose weight and keep it off.",
    lead:
      "Doctor-prescribed GLP-1 treatment built for steady, measurable progress. No crash diets, no waiting rooms, no guesswork.",
    extendedLead:
      "GLP-1 medications work with your body's natural signals to reduce appetite and support sustainable weight loss. At TIDL, every plan is physician-guided: a licensed provider reviews your full health history, prescribes only when appropriate, and ships your dose pre-set in the TIDL Pen so you never mix or measure at home.",
    heroImage: SITE_IMAGES.services.weightLoss,
    productSlugs: ["glp-1-weight-loss"],
    pillars: [
      {
        title: "Physician-guided GLP-1",
        body: "Licensed providers review your intake, medical history, and goals before anything is prescribed.",
      },
      {
        title: "Pre-dosed TIDL Pen",
        body: "Your dose is set in the pen at the pharmacy. Click and go. No vials, syringes, or kitchen-table chemistry.",
      },
      {
        title: "Progress you can track",
        body: "Consistent care and support week after week. Message your team and adjust as your body responds.",
      },
      {
        title: "Steady, not extreme",
        body: "Built for real life, not crash cycles. The goal is weight you keep off, not a number you rebound from.",
      },
      {
        title: "Transparent pricing",
        body: "One monthly plan covers provider review, prescription, and delivery. No hidden clinic fees.",
      },
      {
        title: "Discreet from day one",
        body: "Plain outer packaging, secure messaging, and care that respects your privacy.",
      },
    ],
    educationTitle: "What GLP-1 care looks like with TIDL",
    educationBlocks: [
      {
        title: "What is GLP-1?",
        body: "GLP-1 receptor agonists are FDA-approved medications that help regulate appetite and blood sugar. They are prescribed when a licensed provider determines they are medically appropriate for you. TIDL connects you with that provider review entirely online.",
      },
      {
        title: "Why the TIDL Pen matters",
        body: "Weight-loss GLP-1 ships in our pre-dosed pen. Your prescription dose is set before delivery, with a graduated scale and precision slider so there is never guesswork. One weekly injection, no mixing, no measuring.",
      },
      {
        title: "What to expect over time",
        body: "Most members start with a gradual dose schedule as their body adjusts. Your provider monitors progress, answers questions, and updates your plan. You are never alone between check-ins: message your care team anytime.",
      },
    ],
    howItWorks: [
      {
        step: "01",
        label: "Take the intake",
        detail: "Five-minute health quiz on your phone. It doubles as your medical intake for provider review.",
        duration: "~5 min",
      },
      {
        step: "02",
        label: "Doctor review",
        detail: "A licensed provider in your state reads your full history before prescribing GLP-1.",
        duration: "Same day",
      },
      {
        step: "03",
        label: "Pen prepared",
        detail: "Your GLP-1 dose is set in the pre-dosed TIDL Pen. No mixing, no assembly.",
        duration: "Personalized",
      },
      {
        step: "04",
        label: "Discreet delivery",
        detail: "Shipped from a licensed US pharmacy in plain packaging with cold-chain when required.",
        duration: "2â€“5 days",
      },
      {
        step: "05",
        label: "Ongoing support",
        detail: "Track progress, message your care team, and reorder with one tap when you are ready.",
        duration: "Always on",
      },
    ],
    penSpotlight: {
      kicker: "The TIDL Pen",
      title: "GLP-1, pre-dosed. Just click.",
      lead:
        "Your weekly dose is set to your prescription before the pen leaves the pharmacy. A precision slider, graduated scale, and pre-filled cartridge mean you never handle vials or syringes at home.",
      image: SITE_IMAGES.pen,
      features: [
        {
          num: "01",
          title: "Precision dose slider",
          body: "Your dose, set to your prescription. Nothing to calculate.",
        },
        {
          num: "02",
          title: "Graduated dose scale",
          body: "Clear markings from 0.1 to 1.0 ml. Zero guesswork.",
        },
        {
          num: "03",
          title: "Pre-filled, tiny needle",
          body: "One click per weekly injection. No vials or assembly.",
        },
        {
          num: "04",
          title: "Cold-chain delivery",
          body: "Insulated packaging keeps medication in range from pharmacy to door.",
        },
      ],
      trustNote: "Prescription required. Individual results vary.",
    },
    faqItems: [
      {
        id: 1,
        q: "Is TIDL legitimate and safe?",
        a: "Yes. TIDL is a telehealth platform connecting you with licensed medical providers. Every treatment is prescribed by a doctor in your state and filled by a licensed US pharmacy.",
      },
      {
        id: 2,
        q: "How does the TIDL Pen work?",
        a: "Your dose is set to your prescription with a clear graduated scale. No vials, no syringes, nothing to mix. One weekly injection, then you are done.",
      },
      {
        id: 3,
        q: "Do I need a prescription for GLP-1?",
        a: "Yes. Every TIDL treatment is prescription-only. Your intake doubles as your medical review, and a licensed provider writes the prescription only when medically appropriate.",
      },
      {
        id: 4,
        q: "Is shipping discreet?",
        a: "Completely. Treatment arrives in plain, unbranded outer packaging with nothing on the box that reveals what is inside.",
      },
      {
        id: 5,
        q: "Can I talk to my care team after I start?",
        a: "Anytime. Message your care team about treatment, side effects, or progress. A real person answers.",
      },
    ],
    ctaLabel: "Explore GLP-1 program",
    metaTitle: "Weight Loss | Tidl Health",
    metaDescription:
      "Learn how TIDL helps you lose weight with doctor-prescribed GLP-1, the pre-dosed pen, and ongoing telehealth care.",
    trustStats: TRUST_STATS,
    trustPillars: TRUST_PILLARS,
  },
  testosterone: {
    slug: "testosterone",
    navLabel: "Testosterone",
    title: "Testosterone",
    kicker: "Hormonal performance",
    headline: "Restore energy, strength, and focus.",
    lead:
      "TRT built around your labs and your life. Licensed providers, personalized protocols, and discreet delivery from US pharmacies.",
    extendedLead:
      "Low testosterone can affect energy, mood, strength, and focus. TIDL testosterone therapy starts with your symptoms and lab work, reviewed by a licensed provider who builds a protocol around how you actually feel, not a one-size-fits-all chart.",
    heroImage: SITE_IMAGES.services.testosterone,
    productSlugs: [],
    pillars: [
      {
        title: "Lab-guided protocols",
        body: "Treatment matched to your levels and how you feel day to day, not generic templates.",
      },
      {
        title: "Licensed medical review",
        body: "Every intake read by a doctor licensed in your state before prescribing.",
      },
      {
        title: "Ongoing telehealth care",
        body: "Adjust your plan with your care team as your body responds and labs evolve.",
      },
      {
        title: "Symptom-first approach",
        body: "Energy, drive, sleep, and recovery matter as much as the number on a lab report.",
      },
      {
        title: "US pharmacy fulfillment",
        body: "Medication dispensed by licensed pharmacies and shipped discreetly to your door.",
      },
      {
        title: "Clear, consistent care",
        body: "Message your provider, schedule follow-ups, and reorder without clinic waiting rooms.",
      },
    ],
    educationTitle: "Understanding testosterone therapy with TIDL",
    educationBlocks: [
      {
        title: "Who TRT is for",
        body: "Testosterone replacement therapy is for men with clinically low testosterone confirmed through labs and symptoms. A licensed provider evaluates both before recommending treatment. TIDL is not a shortcut around medical review.",
      },
      {
        title: "How your protocol is built",
        body: "Your provider reviews your intake, health history, and lab results to determine whether TRT is appropriate and at what dose. Plans evolve with follow-up labs and how you report feeling over time.",
      },
      {
        title: "What ongoing care looks like",
        body: "TRT is not set-and-forget. Your care team monitors progress, answers questions about injections or side effects, and adjusts dosing when needed. Everything happens through secure telehealth.",
      },
    ],
    howItWorks: [
      {
        step: "01",
        label: "Share your symptoms",
        detail: "Complete the intake covering energy, mood, strength, sleep, and health history.",
        duration: "~5 min",
      },
      {
        step: "02",
        label: "Lab review",
        detail: "Your provider reviews labs and symptoms together before prescribing TRT.",
        duration: "Provider-led",
      },
      {
        step: "03",
        label: "Personalized Rx",
        detail: "Dose and delivery format matched to your levels, lifestyle, and goals.",
        duration: "Tailored",
      },
      {
        step: "04",
        label: "Discreet delivery",
        detail: "Shipped from a licensed US pharmacy in plain, unbranded packaging.",
        duration: "2â€“5 days",
      },
      {
        step: "05",
        label: "Monitor and adjust",
        detail: "Follow-up labs and messaging with your care team keep your plan on track.",
        duration: "Ongoing",
      },
    ],
    faqItems: [
      {
        id: 1,
        q: "Is TIDL testosterone therapy legitimate?",
        a: "Yes. Every TRT plan is prescribed by a licensed provider in your state and filled by a licensed US pharmacy after medical review.",
      },
      {
        id: 2,
        q: "Do I need blood work?",
        a: "Labs are central to safe TRT. Your provider will guide you on what is needed based on your intake and whether you have recent results.",
      },
      {
        id: 3,
        q: "Who reviews and prescribes my treatment?",
        a: "A licensed medical provider in your state reads your full intake before anything is prescribed. They reach out if they have questions.",
      },
      {
        id: 4,
        q: "Is shipping discreet?",
        a: "Yes. Plain outer packaging with no branding that reveals what is inside.",
      },
      {
        id: 5,
        q: "Can I pause or change my plan?",
        a: "You are in control. Talk to your provider before stopping treatment, since some protocols should not end abruptly.",
      },
    ],
    ctaLabel: "Explore TRT program",
    metaTitle: "Testosterone Therapy | Tidl Health",
    metaDescription:
      "Learn how TIDL testosterone therapy supports energy, strength, and hormonal health with licensed provider care.",
    trustStats: TRUST_STATS,
    trustPillars: TRUST_PILLARS,
  },
  longevity: {
    slug: "longevity",
    navLabel: "Longevity",
    title: "Longevity",
    kicker: "Recovery and longevity",
    headline: "Stay sharp, recover faster, age on your terms.",
    lead:
      "Peptide and metabolic protocols under physician supervision. Built for sleep, recovery, and long-term performance.",
    extendedLead:
      "Longevity care at TIDL is physician-supervised, not supplement-store guesswork. Whether you need recovery support after training or metabolic protocols for long-term health, a licensed provider reviews your goals and prescribes only when appropriate.",
    heroImage: SITE_IMAGES.services.longevity,
    productSlugs: [],
    pillars: [
      {
        title: "Peptide protocols",
        body: "Physician-supervised plans for recovery, sleep, and metabolic health tailored to your goals.",
      },
      {
        title: "Performance support",
        body: "Programs for athletes and high performers who want measurable recovery between sessions.",
      },
      {
        title: "Discreet ongoing care",
        body: "Message your care team, reorder, and adjust without clinic visits or long hold times.",
      },
      {
        title: "Pen or prescription format",
        body: "Select peptide treatments use the pre-dosed TIDL Pen. Others ship as physician-directed protocols.",
      },
      {
        title: "Evidence-guided plans",
        body: "Protocols built on clinical guidance, not trending ingredients with no medical oversight.",
      },
      {
        title: "Private, end to end",
        body: "Secure intake, discreet shipping, and confidential messaging with your care team.",
      },
    ],
    educationTitle: "Longevity and recovery care, done right",
    educationBlocks: [
      {
        title: "What are peptides?",
        body: "Peptides are short chains of amino acids your body already uses as signals. Peptide therapy uses specific compounds, prescribed by a provider, to support goals like recovery, sleep quality, and metabolic health.",
      },
      {
        title: "Pen vs. prescription protocol",
        body: "Some longevity treatments ship in the pre-dosed TIDL Pen for a simple weekly routine. Others arrive as physician-directed prescription protocols. Your provider recommends the format that fits your plan.",
      },
      {
        title: "Built for the long run",
        body: "Recovery and longevity are not one-time purchases. Your care team monitors how you respond, answers questions, and adjusts your protocol as your training load or health goals change.",
      },
    ],
    howItWorks: [
      {
        step: "01",
        label: "Define your goals",
        detail: "Recovery, sleep, metabolic health, or performance. Your intake captures what you want to improve.",
        duration: "~5 min",
      },
      {
        step: "02",
        label: "Provider review",
        detail: "A licensed doctor evaluates whether peptide or metabolic therapy is right for you.",
        duration: "Same day",
      },
      {
        step: "03",
        label: "Protocol set",
        detail: "Pen or prescription format chosen for your treatment. Dose set to your plan.",
        duration: "Personalized",
      },
      {
        step: "04",
        label: "Discreet delivery",
        detail: "Shipped from a licensed US pharmacy with cold-chain packaging when required.",
        duration: "2â€“5 days",
      },
      {
        step: "05",
        label: "Iterate with your team",
        detail: "Message your care team, track recovery, and refine your protocol over time.",
        duration: "Ongoing",
      },
    ],
    penSpotlight: {
      kicker: "TIDL Pen for peptides",
      title: "Recovery protocols, pre-dosed.",
      lead:
        "Select longevity peptide treatments ship in the TIDL Pen. Your dose is set before delivery so your weekly routine stays simple and consistent.",
      image: SITE_IMAGES.pen,
      features: [
        {
          num: "01",
          title: "Physician-set dose",
          body: "Your provider determines the dose. The pen is prepared to match.",
        },
        {
          num: "02",
          title: "Simple weekly routine",
          body: "No mixing or measuring. One consistent injection schedule.",
        },
        {
          num: "03",
          title: "Travel-ready format",
          body: "Compact pen design fits real life, including training and travel.",
        },
        {
          num: "04",
          title: "Cold-chain delivery",
          body: "Insulated packaging protects temperature-sensitive compounds in transit.",
        },
      ],
      trustNote: "Prescription required. Not all longevity treatments use the pen.",
    },
    faqItems: [
      {
        id: 1,
        q: "Are TIDL peptide programs legitimate?",
        a: "Yes. Peptide and metabolic protocols are prescribed only after a licensed provider reviews your intake and determines treatment is medically appropriate.",
      },
      {
        id: 2,
        q: "Do all longevity treatments use the TIDL Pen?",
        a: "No. Some protocols use the pre-dosed pen; others ship as prescription treatments. Your provider recommends the right format for your plan.",
      },
      {
        id: 3,
        q: "Who supervises my protocol?",
        a: "A licensed medical provider in your state reviews your intake, prescribes when appropriate, and remains available for follow-up through telehealth.",
      },
      {
        id: 4,
        q: "Is shipping discreet?",
        a: "Yes. Plain outer packaging with no indication of contents on the box.",
      },
      {
        id: 5,
        q: "Can I adjust my protocol over time?",
        a: "Absolutely. Message your care team as your training, sleep, or recovery needs change.",
      },
    ],
    ctaLabel: "Explore longevity programs",
    metaTitle: "Longevity & Recovery | Tidl Health",
    metaDescription:
      "Learn how TIDL longevity and performance programs support recovery, sleep, and metabolic health.",
    trustStats: TRUST_STATS,
    trustPillars: TRUST_PILLARS,
  },
};

export function getCategory(slug: CategorySlug): CategoryDefinition {
  return CATEGORIES[slug];
}

```

---

## FILE 5 — Catalog products `src/lib/product-catalog.ts`

```ts
import { SITE_IMAGES } from "@/lib/site-assets";
import { getProductBySlug } from "@/lib/products";
import type { ProductSlug } from "@/types/quiz";
import type { CategorySlug } from "@/lib/categories";

export type ProductForm = "pen" | "pill";

export type CatalogProduct = {
  slug: ProductSlug;
  categorySlug: CategorySlug;
  form: ProductForm;
  shortName: string;
  headline: string;
  summary: string;
  image: string;
  highlights: readonly string[];
};

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    slug: "glp-1-weight-loss",
    categorySlug: "weight-loss",
    form: "pen",
    shortName: "GLP-1 Weight Loss",
    headline: "Lose weight. Keep it off. Pre-dosed pen.",
    summary:
      "Doctor-prescribed GLP-1 in the TIDL Pen. Your dose is set to your prescription. No mixing, no guesswork.",
    image: SITE_IMAGES.products.penPrimary,
    highlights: ["TIDL Pen delivery", "Licensed provider review", "Discreet shipping"],
  },
];

export function getCatalogProduct(slug: ProductSlug): CatalogProduct | undefined {
  return CATALOG_PRODUCTS.find((p) => p.slug === slug);
}

export function getCatalogProductsByCategory(categorySlug: CategorySlug): CatalogProduct[] {
  return CATALOG_PRODUCTS.filter((p) => p.categorySlug === categorySlug);
}

export function getCatalogPrice(slug: ProductSlug): number {
  return getProductBySlug(slug)?.monthlyPrice ?? 0;
}

export const PRODUCT_PATHS: Record<ProductSlug, `/products/${ProductSlug}`> = {
  "glp-1-weight-loss": "/products/glp-1-weight-loss",
};

export const CATEGORY_PATHS: Record<CategorySlug, `/category/${CategorySlug}`> = {
  "weight-loss": "/category/weight-loss",
  testosterone: "/category/testosterone",
  longevity: "/category/longevity",
};

```

---

## FILE 6 — Trust signals `src/lib/trust-content.ts`

```ts
/** Shared trust signals used across services, categories, and PDPs. */

export const TRUST_STATS = [
  { value: "4.9", label: "Average rating" },
  { value: "12k+", label: "Patients served" },
  { value: "50", label: "States covered" },
] as const;

export const TRUST_PILLARS = [
  {
    id: "provider",
    num: "01",
    label: "Licensed providers",
    detail: "Every intake reviewed by a doctor licensed in your state.",
  },
  {
    id: "pharmacy",
    num: "02",
    label: "US pharmacies",
    detail: "Medication dispensed by licensed US-based pharmacies only.",
  },
  {
    id: "rx",
    num: "03",
    label: "Prescription only",
    detail: "No off-the-shelf shortcuts. Treatment when medically appropriate.",
  },
  {
    id: "private",
    num: "04",
    label: "Private by design",
    detail: "Discreet packaging, confidential care, and secure messaging.",
  },
] as const;

export const CARE_JOURNEY_STEPS = [
  {
    step: "01",
    label: "Complete your intake",
    detail: "Answer health questions on your phone. It doubles as your medical intake.",
    duration: "~5 minutes",
  },
  {
    step: "02",
    label: "Provider review",
    detail: "A licensed doctor in your state reviews your history before prescribing.",
    duration: "Same day",
  },
  {
    step: "03",
    label: "Personalized plan",
    detail: "Your dose and delivery format are set to your prescription and goals.",
    duration: "Tailored",
  },
  {
    step: "04",
    label: "Discreet delivery",
    detail: "Shipped from a licensed US pharmacy in plain packaging, cold-chain when needed.",
    duration: "2â€“5 days",
  },
  {
    step: "05",
    label: "Ongoing care",
    detail: "Message your care team, adjust your plan, and reorder when you are ready.",
    duration: "Always on",
  },
] as const;

export const PEN_SPOTLIGHT = {
  kicker: "The TIDL Pen",
  title: "Pre-dosed. Precise. No guesswork.",
  lead:
    "GLP-1 and select peptide treatments ship in the TIDL Pen. Your dose is set to your prescription before it leaves the pharmacy. No vials, no syringes, nothing to mix.",
  image: "", // filled at import site to avoid circular deps
  features: [
    {
      num: "01",
      title: "Precision dose slider",
      body: "Your dose is set to your prescription. Nothing to calculate at home.",
    },
    {
      num: "02",
      title: "Graduated dose scale",
      body: "Clear markings from 0.1 to 1.0 ml so you always know what you are taking.",
    },
    {
      num: "03",
      title: "Pre-filled, tiny needle",
      body: "One weekly routine. Click, inject, done. No assembly required.",
    },
    {
      num: "04",
      title: "Cold-chain when needed",
      body: "Temperature-sensitive treatments ship in insulated packaging door to door.",
    },
  ],
  trustNote: "Prescription required. Individual results vary.",
} as const;

```

---

## UI/UX redesign focus (suggested)

When improving `/category/weight-loss`, prioritize:

| Area | Classes | Notes |
|------|---------|-------|
| Hero | `.cat-hero*` | First viewport composition, CTAs, visual crop |
| Trust strip | `.cat-trust-stats*` | Often generic; may need rethink |
| Education cards | `.cat-education*` | Dense card grid |
| How-it-works | `.cat-how*` | Timeline list |
| Pen block | `.cat-pen*` | Dark band; pen image sizing |
| Pillars | `.cat-pillar*` | 3-col cards |
| Product catalog | `.cat-product*` | Primary "catalog" feel |
| Safety | `.cat-safety*` | Dark trust grid |
| FAQ / CTA | `.cat-faq*`, `.cat-cta*` | Conversion close |

Keep existing quiz handoff (`openQuiz` / `openModal`) and route slug API intact unless the redesign requires new IA.

---

## Source paths (quick copy)

- `src/routes/category/$slug.tsx`
- `src/components/category/CategoryPage.tsx`
- `src/components/category/category.css`
- `src/lib/categories.ts`
- `src/lib/product-catalog.ts`
- `src/lib/trust-content.ts`
