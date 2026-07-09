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
import type { ProductSlug } from "@/types/quiz";
import "../home/home.css";
import "./category.css";

type CategoryPageProps = {
  slug: CategorySlug;
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
      const slugToUse = productSlug ?? category.productSlugs[0];
      const goal = getGoalFromProduct(slugToUse);
      openModal({ product: slugToUse, goal: goal ?? undefined });
    },
    [category.productSlugs, openModal],
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
                  <Link to="/#products" className="cat-btn cat-btn--ghost">
                    All products
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
