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

/** Product buy-box — vial first, one clear CTA, price + trust. */
export function PdpHeroSection({ heroRef, onStart }: PdpHeroSectionProps) {
  const { slug, heroProduct, heroImage, penImage, marketing, goal } = usePdpData();
  const catalog = getCatalogProduct(slug);
  const name = catalog?.shortName ?? heroProduct.name;
  const [galleryIndex, setGalleryIndex] = useState(0);

  const headline =
    goal === "weight-loss"
      ? "Feel like you again."
      : (marketing?.emotionalHeadline ?? "Care designed around your goals.");

  const support =
    goal === "weight-loss"
      ? "Doctor-prescribed GLP-1. Pre-dosed TIDL Pen. Delivered to your door."
      : (marketing?.emotionalSub ?? "Licensed provider review · US pharmacy · TIDL Pen.");

  const gallery = [
    { src: heroImage, alt: `${name} product`, kind: "product" as const },
    { src: penImage || heroImage, alt: `${name} with TIDL Pen`, kind: "product" as const },
  ];

  const active = gallery[galleryIndex] ?? gallery[0];

  return (
    <section className="hm-hero" id="hero" ref={heroRef} data-pdp-header-theme="light">
      <div className="hm-hero-shell">
        <div className="hm-hero-media">
          <div className={`hm-hero-stage${active.kind === "product" ? " is-product" : ""}`}>
            <img
              className="hm-hero-img"
              src={active.src}
              alt={active.alt}
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <div className="hm-hero-thumbs" role="tablist" aria-label="Product images">
            {gallery.map((item, i) => (
              <button
                key={`${item.src}-${i}`}
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
          </p>
          <p className="hm-hero-price-note">
            {heroProduct.priceNote ||
              "Package price · Provider review · Prescription · TIDL Pen · Discreet delivery"}
          </p>

          <div className="hm-hero-actions">
            <button type="button" className="hm-btn hm-btn-primary" onClick={onStart}>
              Take the 5-minute quiz
            </button>
            <a className="hm-btn hm-btn-secondary" href="#how">
              See how it works
            </a>
          </div>

          <p className="hm-hero-trust">HSA &amp; FSA eligible · Prescription required</p>
        </div>
      </div>
    </section>
  );
}
