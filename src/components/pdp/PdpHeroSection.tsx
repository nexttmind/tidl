import { useState, type MouseEvent } from "react";
import { getCatalogProduct } from "@/lib/product-catalog";
import { formatCurrency } from "@/lib/pricing";
import { usePdpData } from "./PdpDataProvider";

type PdpHeroSectionProps = {
  heroRef: React.RefObject<HTMLElement | null>;
  onStart: (e: MouseEvent) => void;
};

function StarRow({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span className="hm-hero-stars" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < full ? "is-on" : ""}>
          ★
        </span>
      ))}
    </span>
  );
}

/** Wellness buy-box — product + goal headline, stars, one-package price, CTA. */
export function PdpHeroSection({ heroRef, onStart }: PdpHeroSectionProps) {
  const { slug, heroProduct, heroImage, penImage, marketing, goal } = usePdpData();
  const catalog = getCatalogProduct(slug);
  const name = catalog?.shortName ?? heroProduct.name;
  const [galleryIndex, setGalleryIndex] = useState(0);

  const headline =
    goal === "weight-loss"
      ? "Feel like you again."
      : marketing?.emotionalHeadline ?? "Care designed around your goals.";

  const support =
    goal === "weight-loss"
      ? "Doctor-prescribed. US pharmacy. TIDL Pen included."
      : marketing?.emotionalSub ?? "Licensed provider review · US pharmacy · TIDL Pen.";

  const gallery = [
    { src: heroImage, alt: `${name} product` },
    { src: penImage || heroImage, alt: `${name} with TIDL Pen` },
    { src: "/pdp/patient-aspire.png", alt: "Care that fits real life" },
  ];

  return (
    <section className="hm-hero" id="hero" ref={heroRef} data-pdp-header-theme="light">
      <div className="hm-hero-shell">
        <div className="hm-hero-media">
          <div className="hm-hero-stage">
            <img
              className="hm-hero-img"
              src={gallery[galleryIndex]?.src}
              alt={gallery[galleryIndex]?.alt}
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <div className="hm-hero-thumbs" role="tablist" aria-label="Product images">
            {gallery.map((item, i) => (
              <button
                key={item.src + i}
                type="button"
                role="tab"
                aria-selected={galleryIndex === i}
                className={`hm-hero-thumb${galleryIndex === i ? " is-active" : ""}`}
                onClick={() => setGalleryIndex(i)}
              >
                <img src={item.src} alt="" />
              </button>
            ))}
          </div>
        </div>

        <div className="hm-hero-buy">
          <span className="hm-badge">HSA &amp; FSA eligible</span>
          <p className="hm-hero-product-name">{name}</p>
          <h1 className="hm-hero-title">{headline}</h1>
          <p className="hm-hero-lead">{support}</p>

          <div className="hm-hero-rating">
            <strong>{heroProduct.rating}</strong>
            <StarRow rating={heroProduct.rating} />
            <span>{heroProduct.reviewCount} reviews</span>
          </div>

          <p className="hm-hero-price">
            {formatCurrency(heroProduct.startingPrice)}
            <span>one package</span>
          </p>
          <p className="hm-hero-price-note">{heroProduct.priceNote}</p>

          <div className="hm-hero-actions">
            <button type="button" className="hm-btn hm-btn-primary" onClick={onStart}>
              {heroProduct.ctaLabel || "Get started"}
            </button>
            <button type="button" className="hm-btn hm-btn-secondary" onClick={onStart}>
              See if I&apos;m eligible
            </button>
          </div>

          <a className="hm-safety-link" href="#why-tidl">
            US pharmacies · Safety info
          </a>
        </div>
      </div>
    </section>
  );
}
