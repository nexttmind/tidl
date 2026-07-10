import { useCallback, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CATEGORIES,
  CATEGORY_SLUGS,
  type CategoryDefinition,
  type CategorySlug,
} from "@/lib/categories";
import {
  getCategoryRecommendation,
  type CategoryRecommendation,
} from "@/lib/category-recommendations";
import type { ProductSlug } from "@/types/quiz";
import { catReveal, catSpring, catStagger } from "./category-motion";

type SearchSuggestion = {
  label: string;
  query: string;
};

const SUGGESTIONS: Record<CategorySlug, SearchSuggestion[]> = {
  "weight-loss": [
    { label: "TIDL Pen", query: "What is the TIDL Pen?" },
    { label: "Am I eligible?", query: "Am I a fit for GLP-1?" },
    { label: "Programs", query: "GLP-1 weight loss program" },
    { label: "Pricing", query: "pricing and cost" },
    { label: "Safety", query: "is this safe with a real doctor" },
  ],
  "metabolic-health": [
    { label: "Metabolic care", query: "metabolic health protocol" },
    { label: "GLP-1 fit", query: "Am I a fit for GLP-1?" },
    { label: "Programs", query: "metabolic health program" },
    { label: "Safety", query: "is this safe with a real doctor" },
  ],
  testosterone: [
    { label: "How TRT works", query: "How does TRT work?" },
    { label: "Eligibility", query: "Am I a fit for GLP-1?" },
    { label: "Programs", query: "testosterone program" },
    { label: "Safety", query: "is this safe with a real doctor" },
  ],
  longevity: [
    { label: "Peptides", query: "What are peptides?" },
    { label: "Longevity care", query: "longevity protocol" },
    { label: "Programs", query: "longevity program" },
    { label: "Safety", query: "is this safe with a real doctor" },
  ],
  performance: [
    { label: "Performance care", query: "performance protocol" },
    { label: "Peptides", query: "What are peptides?" },
    { label: "Programs", query: "performance program" },
    { label: "Safety", query: "is this safe with a real doctor" },
  ],
  recovery: [
    { label: "Recovery care", query: "recovery protocol" },
    { label: "Peptides", query: "What are peptides?" },
    { label: "Programs", query: "recovery program" },
    { label: "Safety", query: "is this safe with a real doctor" },
  ],
};

type CategoryHeroProps = {
  category: CategoryDefinition;
  slug: CategorySlug;
  onGetStarted: () => void;
  onStartRecommended: (productSlug?: ProductSlug) => void;
};

function scrollToTarget(target: string) {
  const el = document.getElementById(target);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function applyRecommendationAction(rec: CategoryRecommendation) {
  if (rec.action === "bundle" || rec.action === "product") scrollToTarget("category-products");
  else if (rec.action === "safety") scrollToTarget("cat-safety");
  else if (rec.action === "faq") scrollToTarget("cat-faq");
}

export function CategoryHero({
  category,
  slug,
  onGetStarted,
  onStartRecommended,
}: CategoryHeroProps) {
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [recommendation, setRecommendation] = useState<CategoryRecommendation | null>(null);

  const runSearch = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) {
        onGetStarted();
        return;
      }
      const rec = getCategoryRecommendation(trimmed, slug);
      setRecommendation(rec);
      applyRecommendationAction(rec);
    },
    [onGetStarted, slug],
  );

  const reveal = reduce ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } } : catReveal;

  return (
    <section className="cat-hero" data-site-header-theme="light">
      <motion.div
        className="cat-hero-inner"
        initial="hidden"
        animate="show"
        variants={catStagger}
      >
        <motion.nav className="cat-filter-nav" aria-label="Care categories" variants={reveal}>
          {CATEGORY_SLUGS.map((item) => {
            const active = item === slug;
            return (
              <Link
                key={item}
                to={`/category/${item}`}
                className={`cat-filter-pill${active ? " cat-filter-pill--active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {active ? (
                  <motion.span
                    layoutId="cat-filter-active"
                    className="cat-filter-pill-glow"
                    transition={catSpring}
                  />
                ) : null}
                <span className="cat-filter-pill-label">{CATEGORIES[item].navLabel}</span>
              </Link>
            );
          })}
        </motion.nav>

        <motion.p className="cat-kicker" variants={reveal}>
          <span className="cat-kicker-dot" aria-hidden="true" />
          {category.kicker}
        </motion.p>

        <motion.h1 className="cat-editorial-title" variants={reveal}>
          Designed for results.
          <br />
          <em>Enhanced by intelligence.</em>
        </motion.h1>

        <motion.p className="cat-editorial-lead" variants={reveal}>
          {category.lead}
        </motion.p>

        <motion.div className="cat-search-stage" variants={reveal}>
          <div className="cat-search-panel">
            <div className="cat-search-panel-mesh" aria-hidden="true" />
            <div className="cat-search-panel-top">
              <div className="cat-search-brand">
                <span className="cat-search-brand-name">✦ Explore {category.title}</span>
                <span className="cat-search-brand-meta">AI-curated clinical recommendations</span>
              </div>
              <span className="cat-search-live">
                <span className="cat-search-live-dot" aria-hidden="true" />
                Live
              </span>
            </div>

            <div className="cat-search-panel-main">
              <div
                className={`cat-search-composer${focused ? " focus" : ""}${query.trim() ? " filled" : ""}`}
              >
                <input
                  className="cat-search-input"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") runSearch(query);
                  }}
                  placeholder={`Ask about ${category.title.toLowerCase()} care…`}
                  aria-label={`Ask about ${category.title} programs`}
                />
                <motion.button
                  type="button"
                  className="cat-search-go"
                  aria-label="Get recommendation"
                  onClick={() => runSearch(query)}
                  whileHover={reduce ? undefined : { scale: 1.04, y: -1 }}
                  whileTap={reduce ? undefined : { scale: 0.97 }}
                  transition={catSpring}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h12M13 7l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.button>
              </div>

              <div className="cat-suggest-row">
                <span className="cat-suggest-label">Try</span>
                <div className="cat-suggest-pills">
                  {SUGGESTIONS[slug].map((item) => (
                    <motion.button
                      key={item.label}
                      type="button"
                      className="cat-suggest-pill"
                      onClick={() => {
                        setQuery(item.query);
                        runSearch(item.query);
                      }}
                      whileHover={reduce ? undefined : { y: -3, scale: 1.02 }}
                      whileTap={reduce ? undefined : { scale: 0.98 }}
                      transition={catSpring}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {recommendation ? (
                  <motion.div
                    key={recommendation.query}
                    className="cat-recommend"
                    initial={reduce ? false : { opacity: 0, y: 12, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={reduce ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="cat-recommend-kicker">Recommended for you</p>
                    <p className="cat-recommend-answer">{recommendation.answer}</p>
                    <div className="cat-recommend-product">
                      <div>
                        <p className="cat-recommend-product-label">Matched protocol</p>
                        <p className="cat-recommend-product-name">{recommendation.productName}</p>
                      </div>
                      <div className="cat-recommend-actions">
                        <motion.button
                          type="button"
                          className="cat-btn cat-btn--primary"
                          onClick={() => onStartRecommended(recommendation.productSlug)}
                          whileHover={reduce ? undefined : { scale: 1.02 }}
                          whileTap={reduce ? undefined : { scale: 0.98 }}
                          transition={catSpring}
                        >
                          Start intake
                        </motion.button>
                        <Link to={recommendation.productPath} className="cat-btn cat-btn--ghost">
                          View product
                        </Link>
                      </div>
                    </div>
                    <p className="cat-recommend-disclaimer">
                      General information only. Your provider makes every medical decision.
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <motion.div className="cat-hero-actions" variants={reveal}>
          <motion.button
            type="button"
            className="cat-btn cat-btn--primary"
            onClick={onGetStarted}
            whileHover={reduce ? undefined : { scale: 1.02, y: -2 }}
            whileTap={reduce ? undefined : { scale: 0.98 }}
            transition={catSpring}
          >
            Get started
          </motion.button>
          <button
            type="button"
            className="cat-btn cat-btn--ghost"
            onClick={() => scrollToTarget("category-products")}
          >
            View programs
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        className="cat-hero-visual"
        initial={reduce ? false : { opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="cat-hero-visual-glow" aria-hidden="true" />
        <motion.img
          src={category.heroImage}
          alt=""
          loading="eager"
          className="cat-hero-img"
          animate={reduce ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
