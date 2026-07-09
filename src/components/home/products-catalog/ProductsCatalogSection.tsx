import { useNavigate } from "@tanstack/react-router";
import type { MouseEvent } from "react";
import {
  CATALOG_PRODUCTS,
  getCatalogPrice,
  PRODUCT_PATHS,
  type CatalogProduct,
} from "@/lib/product-catalog";
import { formatCurrency } from "@/lib/pricing";
import { getCategory } from "@/lib/categories";
import { useQuizModal } from "@/providers/quiz-modal-provider";
import "./products-catalog.css";

const heroProduct = CATALOG_PRODUCTS.find((p) => p.slug === "glp-1-weight-loss")!;
const trtProduct = CATALOG_PRODUCTS.find((p) => p.slug === "trt-hormonal")!;
const longevityProduct = CATALOG_PRODUCTS.find((p) => p.slug === "longevity-peptides")!;
const performanceProduct = CATALOG_PRODUCTS.find((p) => p.slug === "performance-recovery")!;

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M5.25 12.75L12.75 5.25M12.75 5.25H6.75M12.75 5.25V11.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BentoCard({
  product,
  tone,
  layout,
}: {
  product: CatalogProduct;
  tone: "dark" | "light" | "gold";
  layout: "hero" | "compact-top" | "compact-bottom" | "wide";
}) {
  const navigate = useNavigate();
  const { closeModal } = useQuizModal();
  const category = getCategory(product.categorySlug);
  const price = getCatalogPrice(product.slug);
  const formLabel = product.form === "pen" ? "TIDL Pen" : "Prescription protocol";
  const pdpPath = PRODUCT_PATHS[product.slug];

  const goToPdp = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    closeModal();
    void navigate({ to: pdpPath, resetScroll: true });
  };

  const head = (
    <div className="pcat-bento-head">
      <div className="pcat-bento-copy">
        <p className="pcat-bento-kicker">{formLabel}</p>
        <h3 className="pcat-bento-name">{product.shortName}</h3>
        {layout === "hero" ? <p className="pcat-bento-lead">{product.headline}</p> : null}
      </div>
      <span className="pcat-bento-arrow" aria-hidden="true">
        <ArrowUpRight />
      </span>
    </div>
  );

  const visual = (
    <div className={`pcat-bento-visual pcat-bento-visual--${product.form}`}>
      <img src={product.image} alt="" loading="lazy" />
    </div>
  );

  const foot = (
    <div className="pcat-bento-foot">
      <span className="pcat-bento-pill">
        View product
        <span className="pcat-bento-price">
          {formatCurrency(price)}
          <span>/mo</span>
        </span>
      </span>
      <span className="pcat-bento-category">{category.title}</span>
    </div>
  );

  return (
    <a
      href={pdpPath}
      onClick={goToPdp}
      aria-label={`View ${product.shortName} product page`}
      className={`pcat-bento pcat-bento--${tone} pcat-bento--${layout}`}
    >
      {layout === "wide" ? (
        <>
          <div className="pcat-bento-wide-main">
            {head}
            {foot}
          </div>
          {visual}
        </>
      ) : (
        <>
          {head}
          {visual}
          {foot}
        </>
      )}
    </a>
  );
}

const BENTO_PRODUCTS: { product: CatalogProduct; tone: "dark" | "light" | "gold"; layout: "hero" | "compact-top" | "compact-bottom" | "wide" }[] = [
  { product: heroProduct, tone: "dark", layout: "hero" },
  { product: trtProduct, tone: "light", layout: "compact-top" },
  { product: longevityProduct, tone: "gold", layout: "compact-bottom" },
  { product: performanceProduct, tone: "light", layout: "wide" },
];

export function ProductsCatalogSection() {
  return (
    <section id="products" className="pcat-section" data-site-header-theme="light">
      <div className="pcat-shell">
        <header className="pcat-header">
          <p className="pcat-kicker">Our products</p>
          <h2 className="pcat-title">Four treatments. Two pens. Two protocols.</h2>
        </header>

        <div className="pcat-bento-grid">
          {BENTO_PRODUCTS.map(({ product, tone, layout }) => (
            <BentoCard key={product.slug} product={product} tone={tone} layout={layout} />
          ))}
        </div>
      </div>
    </section>
  );
}
