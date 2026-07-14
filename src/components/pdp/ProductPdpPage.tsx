import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { Link } from "@tanstack/react-router";
import { useQuizModal } from "@/providers/quiz-modal-provider";
import { getProductBySlug } from "@/lib/products";
import { formatCurrency } from "@/lib/pricing";
import { lockPageScroll, unlockPageScroll } from "@/lib/age-gate";
import type { ProductSlug } from "@/types/quiz";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { useSiteHeaderState } from "@/hooks/useSiteHeaderState";
import { useLiveCatalog, resolveDisplayMonthlyPrice } from "@/lib/prescribe-rx/use-live-catalog";
import { mergeSandboxIntoPdp } from "@/lib/prescribe-rx/merge-sandbox-pdp";
import { getPdpContent } from "./data/pdp-data-registry";
import { PdpDataProvider } from "./PdpDataProvider";
import { PdpHeroSection } from "./PdpHeroSection";
import { PdpMotivationMarquee } from "./PdpMotivationMarquee";
import { PdpTransformationSection } from "./PdpTransformationSection";
import { PdpVerticalTimeline } from "./PdpVerticalTimeline";
import { PdpReviewsSection } from "./PdpReviewsSection";
import { PdpSafetySection } from "./PdpSafetySection";
import { PdpCtaBand } from "./PdpCtaBand";
import { PdpFaqSection } from "./PdpFaqSection";
import { PdpOutcomeSection } from "./PdpOutcomeSection";
import { PdpIncludedSection } from "./PdpIncludedSection";
import { PdpBeforeAfterSection } from "./PdpBeforeAfterSection";
import { PdpButton, Reveal } from "./pdp-ui";
import "../home/home.css";
import "./pdp.css";
import "./pdp-redesign.css";

type ProductPdpPageProps = {
  slug: ProductSlug;
};

function ProductPdpPageInner({ slug }: ProductPdpPageProps) {
  const basePdp = getPdpContent(slug);
  const baseProduct = getProductBySlug(slug)!;
  const { map: liveCatalog } = useLiveCatalog();
  const live = liveCatalog[slug];

  // Overlay vial image (+ useful long description when present). Keep curated name/price/copy.
  const pdp = mergeSandboxIntoPdp(basePdp, live);

  const product = {
    ...baseProduct,
    name: basePdp.heroProduct.name,
    monthlyPrice: resolveDisplayMonthlyPrice(baseProduct.monthlyPrice, live?.price),
    image: pdp.heroImage,
    description: pdp.heroProduct.summary,
    dosage: baseProduct.dosage,
  };

  const { openModal } = useQuizModal();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { pinned: headerPinned, theme: headerTheme, transparent: headerTransparent } =
    useSiteHeaderState({ defaultTheme: "light" });

  const openQuiz = useCallback(
    (e?: MouseEvent) => {
      e?.preventDefault();
      openModal({ product: slug, goal: pdp.goal });
    },
    [openModal, pdp.goal, slug],
  );

  useEffect(() => {
    if (!mobileNavOpen) return;
    lockPageScroll();
    return () => unlockPageScroll();
  }, [mobileNavOpen]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const io = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" },
    );

    io.observe(hero);
    return () => io.disconnect();
  }, []);

  const navLinks = [
    { href: "#hero", label: "Product" },
    { href: "#transform", label: "Your story" },
    { href: "#life-shift", label: "Before / After" },
    { href: "#journey", label: "Your path" },
    { href: "#included", label: "What's included" },
    { href: "#pricing", label: "Pricing" },
    { href: "#reviews", label: "Reviews" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <PdpDataProvider data={pdp}>
      <div className="pdp-page">
        <div className="pdp-hero-stage site-chrome-stage">
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

          <div className="pdp-hero-surface">
            <SiteHeader
              navLinks={navLinks}
              menuItems={[
                { href: "#outcome", label: "Who it's for" },
                ...navLinks,
                { href: "#pricing", label: "Pricing" },
              ]}
              menuOpen={mobileNavOpen}
              pinned={headerPinned}
              transparent={headerTransparent}
              theme={headerTheme}
              onToggleMenu={() => setMobileNavOpen((open) => !open)}
              onCloseMenu={() => setMobileNavOpen(false)}
            />

            <PdpHeroSection heroRef={heroRef} onStart={openQuiz} />
          </div>
        </div>

        <PdpMotivationMarquee />

        <PdpTransformationSection onStart={openQuiz} />

        <PdpBeforeAfterSection onStart={openQuiz} />

        <PdpOutcomeSection />

        <PdpVerticalTimeline />

        <PdpIncludedSection />

        <section className="pdp-section pdp-pricing-v2" id="pricing" data-pdp-header-theme="light">
          <div className="pdp-section-shell">
            <div className="pdp-section-inner">
              <Reveal>
                <div className="pdp-pricing">
                  <span className="pdp-kicker">Simple pricing</span>
                  <h2 className="pdp-pricing-title">{product.name}</h2>
                  <p className="pdp-price">{formatCurrency(product.monthlyPrice)}<span>/month</span></p>
                  <p className="pdp-price-sub">{product.description}</p>
                  <p className="pdp-price-dosage">{product.dosage}</p>
                  <p className="pdp-price-sub">
                    Includes provider review, prescription, TIDL Pen + how-to, and discreet delivery. Pricing may vary based on your treatment plan.
                  </p>
                  <div className="pdp-price-includes">
                    <span>Doctor review</span>
                    <span>Prescription</span>
                    <span>TIDL Pen + how-to</span>
                    <span>Personalized plan</span>
                    <span>Ongoing care</span>
                  </div>
                  <PdpButton label="Choose this plan" onClick={openQuiz} />
                  <p className="pdp-note" style={{ marginTop: 18, marginBottom: 0 }}>
                    HSA and FSA cards accepted at checkout.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <PdpSafetySection />

        <PdpReviewsSection />

        <PdpCtaBand onStart={openQuiz} />

        <PdpFaqSection />

        <div className="pdp-footer-zone" data-pdp-header-theme="dark">
          <SiteFooter onGetStarted={openQuiz} />
        </div>

        <div
          className={`pdp-sticky-cta${stickyVisible ? " visible" : ""}`}
          aria-hidden={!stickyVisible}
        >
          {stickyVisible ? (
          <div className="pdp-sticky-inner">
            <div className="pdp-sticky-copy">
              <strong>Ready to start?</strong>
              <span>5-minute intake · Doctor-reviewed · Discreet delivery</span>
            </div>
            <PdpButton className="pdp-sticky-btn" label="Get started" onClick={openQuiz} />
          </div>
          ) : null}
        </div>
      </div>
    </PdpDataProvider>
  );
}

export default function ProductPdpPage({ slug }: ProductPdpPageProps) {
  return <ProductPdpPageInner slug={slug} />;
}

export function Glp1PdpPage() {
  return <ProductPdpPage slug="glp-1-weight-loss" />;
}
