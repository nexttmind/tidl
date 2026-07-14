import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  CATALOG_PRODUCTS,
  PRODUCT_PATHS,
  getCatalogProduct,
  type ProductForm,
} from "@/lib/product-catalog";
import { formatCurrency } from "@/lib/pricing";
import type { ProductSlug } from "@/types/quiz";
import { usePdpData } from "./PdpDataProvider";

const PRODUCT_ORDER = CATALOG_PRODUCTS.map((product) => product.slug);

function splitTitle(shortName: string): [string, string] {
  const ampersandIdx = shortName.indexOf(" & ");
  if (ampersandIdx > 0) {
    return [shortName.slice(0, ampersandIdx), shortName.slice(ampersandIdx + 1)];
  }

  const parts = shortName.split(" ");
  if (parts.length <= 2) {
    return [parts[0] ?? shortName, parts.slice(1).join(" ")];
  }

  const mid = Math.ceil(parts.length / 2);
  return [parts.slice(0, mid).join(" "), parts.slice(mid).join(" ")];
}

function productNeighbors(slug: ProductSlug) {
  const index = PRODUCT_ORDER.indexOf(slug);
  const total = PRODUCT_ORDER.length;
  return {
    prev: PRODUCT_ORDER[(index - 1 + total) % total],
    next: PRODUCT_ORDER[(index + 1) % total],
  };
}

function HeroAccordion({
  description,
  included,
  protocol,
}: {
  description: string;
  included: readonly string[];
  protocol: readonly { label: string; detail: string }[];
}) {
  const [openId, setOpenId] = useState<"description" | "included" | "protocol">("protocol");

  const items = [
    { id: "description" as const, label: "Description", body: description },
    {
      id: "included" as const,
      label: "What's included",
      body: included.join(" · "),
    },
    {
      id: "protocol" as const,
      label: "Protocol",
      body: protocol.map((item) => `${item.label}: ${item.detail}`).join(" "),
    },
  ];

  return (
    <div className="pdp-hero-accordion">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className={`pdp-hero-accordion-item${isOpen ? " is-open" : ""}`}>
            <button
              type="button"
              className="pdp-hero-accordion-trigger"
              aria-expanded={isOpen}
              onClick={() => setOpenId(item.id)}
            >
              <span>{item.label}</span>
              <span className="pdp-hero-accordion-icon" aria-hidden="true">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen ? <p className="pdp-hero-accordion-body">{item.body}</p> : null}
          </div>
        );
      })}
    </div>
  );
}

function SocialBubble({
  name,
  message,
  tone,
  className,
}: {
  name: string;
  message: string;
  tone: "purchase" | "like";
  className?: string;
}) {
  const initial = name.replace(/[^A-Za-z]/g, "").charAt(0).toUpperCase() || "T";

  return (
    <div className={`pdp-hero-social${className ? ` ${className}` : ""}`}>
      <span className="pdp-hero-social-avatar" aria-hidden="true">
        {initial}
      </span>
      <div className="pdp-hero-social-copy">
        <strong>{name}</strong>
        <span>{message}</span>
      </div>
      <span className={`pdp-hero-social-badge pdp-hero-social-badge--${tone}`} aria-hidden="true">
        {tone === "like" ? "♥" : "✓"}
      </span>
    </div>
  );
}

function HeroPenSocialAnimation({
  productImage,
  productAlt,
  productForm,
  socialA,
  socialB,
  floatRef,
  reduceMotion,
}: {
  productImage: string;
  productAlt: string;
  productForm: ProductForm;
  socialA?: { name: string };
  socialB?: { name: string };
  floatRef: React.RefObject<HTMLDivElement | null>;
  reduceMotion: boolean | null;
}) {
  const animatePen = productForm === "pen" && !reduceMotion;

  return (
    <>
      <div className="pdp-hero-editorial-product-parallax" ref={floatRef}>
        <div
          className={`pdp-hero-editorial-product${
            productForm === "pill"
              ? " pdp-hero-editorial-product--pill"
              : productForm === "vial"
                ? " pdp-hero-editorial-product--vial"
                : ""
          }`}
        >
          <div className="pdp-hero-editorial-product-inner">
            <motion.img
              src={productImage}
              alt={productAlt}
              className={`pdp-hero-editorial-product-img${
                productForm === "pill"
                  ? " pdp-hero-editorial-product-img--pill"
                  : productForm === "vial"
                    ? " pdp-hero-editorial-product-img--vial"
                    : ""
              }`}
              initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <span className="pdp-hero-editorial-scroll-hint" aria-hidden="true">
            <svg viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.2" />
              <path d="M10 7v6M7 11l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </span>
        </div>
      </div>

      {socialA ? (
        <div
          className={`pdp-hero-social-wrap pdp-hero-social-wrap--left${
            animatePen ? " pdp-hero-social-wrap--animated" : ""
          }`}
        >
          <SocialBubble
            className="pdp-hero-social--left"
            name={socialA.name}
            message="has just started this plan"
            tone="purchase"
          />
        </div>
      ) : null}
      {socialB ? (
        <div
          className={`pdp-hero-social-wrap pdp-hero-social-wrap--right${
            animatePen ? " pdp-hero-social-wrap--animated" : ""
          }`}
        >
          <SocialBubble
            className="pdp-hero-social--right"
            name={socialB.name}
            message="rated this treatment highly"
            tone="like"
          />
        </div>
      ) : null}
    </>
  );
}

type PdpHeroSectionProps = {
  heroRef: React.RefObject<HTMLElement | null>;
  onStart: (e: MouseEvent) => void;
};

export function PdpHeroSection({ heroRef, onStart }: PdpHeroSectionProps) {
  const reduceMotion = useReducedMotion();
  const { slug, heroProduct, heroImage, penImage, productForm, includedPhrases, reviews } =
    usePdpData();
  const catalog = getCatalogProduct(slug);
  const productImage = productForm === "pen" ? penImage : heroImage;
  const productAlt = catalog
    ? `${catalog.shortName} by TIDL`
    : `${heroProduct.name} prescription protocol`;

  const [titleLine1, titleLine2] = splitTitle(catalog?.shortName ?? heroProduct.name);
  const { prev, next } = productNeighbors(slug);

  const stageRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);

  const socialA = reviews[0];
  const socialB = reviews[1] ?? reviews[0];

  useEffect(() => {
    const float = floatRef.current;
    const stage = stageRef.current;
    if (!float || !stage || reduceMotion) return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = stage.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const progress = Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - vh / 2) / (vh / 2)));
        float.style.transform = `translateY(${progress * -14}px)`;
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [reduceMotion]);

  return (
    <section
      className="pdp-hero pdp-hero--editorial"
      id="hero"
      ref={heroRef}
      data-pdp-header-theme="light"
    >
      <div className="pdp-hero-shell">
        <div className="pdp-hero-editorial">
          <motion.div
            className="pdp-hero-editorial-copy"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="pdp-hero-editorial-kicker">{heroProduct.descriptor}</p>

            <h1 className="pdp-hero-editorial-title">
              <span className="pdp-hero-editorial-title-row">
                <span className="pdp-hero-editorial-accent-ring">TIDL</span>
                <span>{titleLine1}</span>
              </span>
              {titleLine2 ? (
                <span className="pdp-hero-editorial-title-row pdp-hero-editorial-title-row--second">
                  <span>{titleLine2}</span>
                  <span className="pdp-hero-editorial-bolt" aria-hidden="true">
                    <svg viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="9" fill="currentColor" />
                      <path
                        d="M11.2 5.5 8.4 10.2h2.4l-1.2 4.3 3.6-5.2H10.6L11.2 5.5Z"
                        fill="#171310"
                      />
                    </svg>
                  </span>
                </span>
              ) : null}
            </h1>

            <p className="pdp-hero-editorial-price">
              {formatCurrency(heroProduct.startingPrice)}
              <span>/mo</span>
            </p>

            <p className="pdp-hero-editorial-lead">{catalog?.summary ?? heroProduct.summary}</p>

            <div className="pdp-hero-editorial-actions">
              <button type="button" className="pdp-hero-editorial-cta" onClick={onStart}>
                <span className="pdp-hero-editorial-cta-icon" aria-hidden="true">
                  ✓
                </span>
                {heroProduct.ctaLabel}
              </button>
              <span className="pdp-hero-editorial-rating" aria-label={`${heroProduct.rating} out of 5 stars`}>
                <span>{heroProduct.rating}</span>
                <small>{heroProduct.reviewCount} reviews</small>
              </span>
            </div>
          </motion.div>

          <div
            className={`pdp-hero-editorial-stage${
              productForm === "pen" && !reduceMotion ? " pdp-hero-editorial-stage--animated" : ""
            }`}
            ref={stageRef}
          >
            <div className="pdp-hero-editorial-arch" aria-hidden="true" />
            <div className="pdp-hero-editorial-orb pdp-hero-editorial-orb--a" aria-hidden="true" />
            <div className="pdp-hero-editorial-orb pdp-hero-editorial-orb--b" aria-hidden="true" />
            <svg className="pdp-hero-editorial-swirl" viewBox="0 0 200 320" aria-hidden="true">
              <path
                d="M102 18c-42 18-58 62-34 92 20 24 58 18 72-8 10-18 4-42-18-52"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <path
                d="M88 250c28-10 46-34 38-58-8-24-36-34-58-20-18 12-22 38-6 54"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>

            <HeroPenSocialAnimation
              productImage={productImage}
              productAlt={productAlt}
              productForm={productForm}
              socialA={socialA}
              socialB={socialB}
              floatRef={floatRef}
              reduceMotion={reduceMotion}
            />
          </div>

          <motion.aside
            className="pdp-hero-editorial-side"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pdp-hero-editorial-nav">
              <Link
                to={PRODUCT_PATHS[prev]}
                className="pdp-hero-editorial-nav-btn"
                aria-label="Previous product"
              >
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M12.5 5 7.5 10l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </Link>
              <Link
                to={PRODUCT_PATHS[next]}
                className="pdp-hero-editorial-nav-btn"
                aria-label="Next product"
              >
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M7.5 5 12.5 10l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </Link>
            </div>

            <HeroAccordion
              description={heroProduct.summary}
              included={includedPhrases}
              protocol={heroProduct.specs}
            />

            <p className="pdp-hero-editorial-note">{heroProduct.trustNote}</p>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
