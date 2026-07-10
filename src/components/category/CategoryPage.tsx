import { useCallback, useEffect, useState, type MouseEvent } from "react";
import { Link } from "@tanstack/react-router";
import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useQuizModal } from "@/providers/quiz-modal-provider";
import { lockPageScroll, unlockPageScroll } from "@/lib/age-gate";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { useSiteHeaderState } from "@/hooks/useSiteHeaderState";
import { getCatalogProduct, getCatalogPrice } from "@/lib/product-catalog";
import {
  CATEGORIES,
  CATEGORY_SLUGS,
  getCategory,
  type CategorySlug,
} from "@/lib/categories";
import { CATEGORY_GOAL_MAP } from "@/lib/category-recommendations";
import { getGoalFromProduct } from "@/lib/products";
import type { GoalId, ProductSlug } from "@/types/quiz";
import { CategoryAmbient } from "./CategoryAmbient";
import { CategoryHero } from "./CategoryHero";
import { CategoryPenProgram } from "./CategoryPenProgram";
import { CategoryProductCard } from "./CategoryProductCard";
import { catReveal, catSpring, catStagger } from "./category-motion";
import "../home/home.css";
import "./category.css";

type CategoryPageProps = {
  slug: CategorySlug;
};

const CATEGORY_GOALS: Record<CategorySlug, GoalId> = CATEGORY_GOAL_MAP;

function CategoryFaq({
  items,
}: {
  items: readonly { id: number; q: string; a: string }[];
}) {
  const reduce = useReducedMotion();
  const reveal = reduce ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } } : catReveal;

  return (
    <motion.div
      className="cat-faq-list"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      variants={catStagger}
    >
      {items.map((item) => (
        <motion.details className="cat-faq-item" key={item.id} variants={reveal}>
          <summary className="cat-faq-q">{item.q}</summary>
          <p className="cat-faq-a">{item.a}</p>
        </motion.details>
      ))}
    </motion.div>
  );
}

function SectionHead({
  kicker,
  title,
  light,
  center,
  lead,
}: {
  kicker: string;
  title: string;
  light?: boolean;
  center?: boolean;
  lead?: string;
}) {
  const reduce = useReducedMotion();
  const reveal = reduce ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } } : catReveal;

  return (
    <motion.header
      className={`cat-section-head${center ? " cat-section-head--center" : ""}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={catStagger}
    >
      <motion.p className={`cat-kicker${light ? " cat-kicker--light" : ""}`} variants={reveal}>
        <span className="cat-kicker-dot" aria-hidden="true" />
        {kicker}
      </motion.p>
      <motion.h2
        className={`cat-section-title${light ? " cat-section-title--light" : ""}`}
        variants={reveal}
      >
        {title}
      </motion.h2>
      {lead ? (
        <motion.p
          className={`cat-section-lead${light ? " cat-section-lead--light" : ""}`}
          variants={reveal}
        >
          {lead}
        </motion.p>
      ) : null}
    </motion.header>
  );
}

export function CategoryPage({ slug }: CategoryPageProps) {
  const category = getCategory(slug);
  const { openModal } = useQuizModal();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [heroLive, setHeroLive] = useState(false);
  const reduce = useReducedMotion();
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

  useEffect(() => {
    const t = window.setTimeout(() => setHeroLive(true), 120);
    return () => window.clearTimeout(t);
  }, [slug]);

  const navLinks = CATEGORY_SLUGS.map((item) => ({
    to: `/category/${item}` as const,
    label: CATEGORIES[item].navLabel,
  }));

  const products = category.productSlugs
    .map((productSlug) => getCatalogProduct(productSlug))
    .filter((item) => item !== undefined);

  const hasPenProgram = products.some((product) => product.form === "pen");

  const reveal = reduce ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } } : catReveal;

  return (
    <MotionConfig transition={catSpring}>
      <LayoutGroup>
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
              <CategoryAmbient live={heroLive} />

              <SiteHeader
                navLinks={navLinks.map((item) => ({ href: item.to, label: item.label }))}
                menuOpen={mobileNavOpen}
                pinned={headerPinned}
                transparent={headerTransparent}
                theme={headerTheme}
                onToggleMenu={() => setMobileNavOpen((open) => !open)}
                onCloseMenu={() => setMobileNavOpen(false)}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={slug}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                >
                  <CategoryHero
                    category={category}
                    slug={slug}
                    onGetStarted={() => openQuiz()()}
                    onStartRecommended={(productSlug) => openQuiz(productSlug)()}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <section className="cat-trust-stats" aria-label="TIDL trust signals" data-site-header-theme="light">
            <motion.div
              className="cat-trust-stats-inner"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={catStagger}
            >
              {category.trustStats.map((stat) => (
                <motion.div className="cat-trust-stat" key={stat.label} variants={reveal}>
                  <span className="cat-trust-stat-value">{stat.value}</span>
                  <span className="cat-trust-stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </section>

          <section className="cat-education" id="cat-education" data-site-header-theme="light">
            <div className="cat-education-inner">
              <SectionHead
                kicker="Clinical clarity"
                title={category.educationTitle}
                lead="The essentials, written so you can decide with confidence—not guesswork."
              />
              <motion.div
                className="cat-edu-list"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "0px 0px -8% 0px", amount: 0.05 }}
                variants={catStagger}
              >
                {category.educationBlocks.map((block) => (
                  <motion.article className="cat-edu-row" key={block.title} variants={reveal}>
                    <div className="cat-edu-copy">
                      <h3 className="cat-edu-title">{block.title}</h3>
                      <p className="cat-edu-body">{block.body}</p>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </section>

          {!hasPenProgram ? (
            <section className="cat-how" id="cat-how" data-site-header-theme="light">
              <div className="cat-how-inner">
                <SectionHead
                  kicker="Your path"
                  title="From intake to your door"
                  lead="Five precise steps. One physician-guided experience. No waiting rooms."
                />
                <motion.ol
                  className="cat-how-rail"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "0px 0px -8% 0px", amount: 0.05 }}
                  variants={catStagger}
                >
                  {category.howItWorks.map((step) => (
                    <motion.li className="cat-how-row" key={step.step} variants={reveal}>
                      <span className="cat-how-row-num" aria-hidden="true">
                        {step.step}
                      </span>
                      <div className="cat-how-row-copy">
                        <div className="cat-how-row-top">
                          <h3 className="cat-how-row-title">{step.label}</h3>
                          <span className="cat-how-row-duration">{step.duration}</span>
                        </div>
                        <p className="cat-how-row-body">{step.detail}</p>
                      </div>
                    </motion.li>
                  ))}
                </motion.ol>
              </div>
            </section>
          ) : null}

          {category.penSpotlight ? (
            <section className="cat-pen" id="cat-pen" data-site-header-theme="dark">
              <div className="cat-pen-inner">
                <motion.div
                  className="cat-pen-copy"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={catStagger}
                >
                  <motion.p className="cat-kicker cat-kicker--light" variants={reveal}>
                    {category.penSpotlight.kicker}
                  </motion.p>
                  <motion.h2 className="cat-pen-title" variants={reveal}>
                    {category.penSpotlight.title}
                  </motion.h2>
                  <motion.p className="cat-pen-lead" variants={reveal}>
                    {category.penSpotlight.lead}
                  </motion.p>
                  <motion.p className="cat-pen-trust" variants={reveal}>
                    {category.penSpotlight.trustNote}
                  </motion.p>
                  <motion.div variants={reveal}>
                    <Link to="/#tdlp5" className="cat-btn cat-btn--primary">
                      See the pen on homepage
                    </Link>
                  </motion.div>
                </motion.div>
                <motion.div
                  className="cat-pen-visual"
                  initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img src={category.penSpotlight.image} alt="" loading="lazy" className="cat-pen-img" />
                </motion.div>
                <motion.div
                  className="cat-pen-specs"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "0px 0px -8% 0px", amount: 0.05 }}
                  variants={catStagger}
                >
                  {category.penSpotlight.features.map((feature, index) => (
                    <motion.div className="cat-pen-spec" key={feature.num} variants={reveal}>
                      {index > 0 ? <span className="cat-pen-spec-divider" aria-hidden="true" /> : null}
                      <h3 className="cat-pen-spec-title">{feature.title}</h3>
                      <p className="cat-pen-spec-body">{feature.body}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>
          ) : null}

          <section className="cat-pillars" data-site-header-theme="light">
            <div className="cat-pillars-wrap">
              <SectionHead kicker="Why TIDL" title="Care built to earn your trust" center />
              <motion.div
                className="cat-pillars-inner"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-8%" }}
                variants={catStagger}
              >
                {category.pillars.map((pillar) => (
                  <motion.article className="cat-pillar" key={pillar.title} variants={reveal}>
                    <h3 className="cat-pillar-title">{pillar.title}</h3>
                    <p className="cat-pillar-body">{pillar.body}</p>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </section>

          <section className="cat-products" id="category-products" data-site-header-theme="light">
            <div className="cat-products-inner">
              <SectionHead
                kicker="Programs in this category"
                title={`Choose your ${category.title.toLowerCase()} treatment`}
              />

              {products.length > 0 ? (
                <div className="cat-product-showcase">
                  {products.map((product, index) =>
                    product.form === "pen" ? (
                      <CategoryPenProgram
                        key={product.slug}
                        product={product}
                        price={getCatalogPrice(product.slug)}
                        workflow={category.howItWorks}
                        onStartIntake={(productSlug) => openQuiz(productSlug)()}
                      />
                    ) : (
                      <CategoryProductCard
                        key={product.slug}
                        product={product}
                        price={getCatalogPrice(product.slug)}
                        index={index}
                        onStartIntake={(productSlug) => openQuiz(productSlug)()}
                      />
                    ),
                  )}
                </div>
              ) : (
                <motion.div
                  className="cat-empty"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={catStagger}
                >
                  <motion.div className="cat-empty-orb" aria-hidden="true" variants={reveal} />
                  <motion.h3 className="cat-empty-title" variants={reveal}>
                    Programs launching soon
                  </motion.h3>
                  <motion.p className="cat-empty-lead" variants={reveal}>
                    {category.title} care is being prepared with the same physician oversight and discreet
                    delivery you expect from TIDL. Start your intake now—we will match you when your program is live.
                  </motion.p>
                  <motion.div className="cat-empty-suggestions" variants={reveal}>
                    {["Take the intake quiz", "Ask TIDL a question", "Explore how it works"].map((label) => (
                      <span key={label} className="cat-suggest-pill cat-suggest-pill--static">
                        {label}
                      </span>
                    ))}
                  </motion.div>
                  <motion.button
                    type="button"
                    className="cat-btn cat-btn--primary"
                    onClick={openQuiz()}
                    variants={reveal}
                    whileHover={reduce ? undefined : { scale: 1.02 }}
                    whileTap={reduce ? undefined : { scale: 0.98 }}
                  >
                    {category.ctaLabel}
                  </motion.button>
                </motion.div>
              )}
            </div>
          </section>

          <section className="cat-safety" id="cat-safety" data-site-header-theme="dark">
            <div className="cat-safety-inner">
              <SectionHead
                kicker="Safety and standards"
                title="Real medicine. Real oversight."
                lead="Every claim is backed by licensed care—not marketing theater."
                light
                center
              />
              <motion.div
                className="cat-safety-band"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "0px 0px -8% 0px", amount: 0.05 }}
                variants={catStagger}
              >
                {category.trustPillars.map((pillar, index) => (
                  <motion.div className="cat-safety-item" key={pillar.id} variants={reveal}>
                    {index > 0 ? <span className="cat-safety-divider" aria-hidden="true" /> : null}
                    <h3 className="cat-safety-item-title">{pillar.label}</h3>
                    <p className="cat-safety-item-body">{pillar.detail}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          <section className="cat-faq" id="cat-faq" data-site-header-theme="light">
            <div className="cat-faq-inner">
              <SectionHead kicker="Common questions" title="Answers before you start" />
              <CategoryFaq items={category.faqItems} />
            </div>
          </section>

          <section className="cat-cta-band" data-site-header-theme="light">
            <motion.div
              className="cat-cta-inner"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={catStagger}
            >
              <motion.h2 className="cat-cta-title" variants={reveal}>
                Ready to start {category.title.toLowerCase()} care?
              </motion.h2>
              <motion.p className="cat-cta-lead" variants={reveal}>
                Take the five-minute quiz. A licensed provider reviews your plan. Treatment ships discreetly to your door.
              </motion.p>
              <motion.button
                type="button"
                className="cat-btn cat-btn--primary"
                onClick={openQuiz()}
                variants={reveal}
                whileHover={reduce ? undefined : { scale: 1.02, y: -2 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
              >
                {category.ctaLabel}
              </motion.button>
            </motion.div>
          </section>

          <div data-site-header-theme="dark">
            <SiteFooter onGetStarted={openQuiz()} />
          </div>
        </div>
      </LayoutGroup>
    </MotionConfig>
  );
}

export function isCategorySlug(value: string): value is CategorySlug {
  return (CATEGORY_SLUGS as readonly string[]).includes(value);
}
