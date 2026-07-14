import { Link } from "@tanstack/react-router";
import { ServicesClosing } from "./ServicesClosing";
import { SERVICES_INTRO } from "@/lib/services-content";
import { CATEGORIES, CATEGORY_SLUGS, type CategorySlug } from "@/lib/categories";
import { CATEGORY_PATHS, getCatalogProduct } from "@/lib/product-catalog";
import { formatCurrency } from "@/lib/pricing";
import { getProductBySlug } from "@/lib/products";
import {
  resolveDisplayMonthlyPrice,
  useLiveCatalog,
  type LiveProduct,
} from "@/lib/prescribe-rx/use-live-catalog";
import type { ProductSlug } from "@/types/quiz";

function ArrowRight() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.75 9H14.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 3.75L14.25 9L9 14.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type GoalProduct = {
  slug: ProductSlug;
  name: string;
  formLabel: string;
  monthly: number;
  image: string;
};

type GoalCard = {
  categorySlug: CategorySlug;
  label: string;
  image: string;
  summary: string;
  badge?: string;
  products: GoalProduct[];
  explorePath: `/category/${CategorySlug}`;
  exploreLabel: string;
};

function buildGoalCards(liveMap: Record<string, LiveProduct>): GoalCard[] {
  return CATEGORY_SLUGS.map((slug) => {
    const category = CATEGORIES[slug];
    const products: GoalProduct[] = category.productSlugs.flatMap((productSlug) => {
      const catalog = getCatalogProduct(productSlug);
      if (!catalog) return [];
      const marketing = getProductBySlug(productSlug);
      const live = liveMap[productSlug];
      const monthly = resolveDisplayMonthlyPrice(marketing?.monthlyPrice ?? 0, live?.price);
      return [
        {
          slug: productSlug,
          name: live?.name ?? catalog.shortName,
          formLabel: catalog.form === "pen" ? "TIDL Pen" : "Peptide",
          monthly,
          image: live?.image ?? catalog.image,
        },
      ];
    });

    const hasPen = products.some((p) => p.formLabel === "TIDL Pen");
    const badge =
      hasPen && products.length > 0
        ? "Includes TIDL Pen"
        : products.length > 0
          ? `${products.length} product${products.length === 1 ? "" : "s"}`
          : undefined;

    return {
      categorySlug: slug,
      label: category.navLabel,
      image: category.heroImage,
      summary: category.lead,
      badge,
      products,
      explorePath: CATEGORY_PATHS[slug],
      exploreLabel: `Explore ${category.navLabel}`,
    };
  });
}

export function ServicesSection() {
  const { map: liveMap, loading } = useLiveCatalog();
  const cards = buildGoalCards(liveMap);
  const total = cards.length;

  return (
    <section className="services container-full" id="services" data-site-header-theme="dark">
      <div className="container-fluid">
        <div className="services-content">
          <header className="services-head">
            <p className="services-intro-kicker">{SERVICES_INTRO.kicker}</p>
            <h2 data-w-id="3072fecc-9b21-d07c-8a0f-122ed0f2114c" className="services-title-02 heading-01">
              Pick your goal.
            </h2>
            <p className="services-intro-lead">
              Every care category and marketed product — names and pricing refreshed from the live
              sandbox catalog. Open a pathway or jump straight to a product.
            </p>
            {loading ? (
              <p className="services-intro-status" aria-live="polite">
                Syncing catalog…
              </p>
            ) : null}
          </header>

          <div className="service-list" style={{ ["--svc-total" as string]: String(total).padStart(2, "0") }}>
            {cards.map((card, index) => (
              <div
                key={card.categorySlug}
                data-w-id={
                  index === 0
                    ? "3072fecc-9b21-d07c-8a0f-122ed0f2114f"
                    : index === 1
                      ? "3072fecc-9b21-d07c-8a0f-122ed0f21164"
                      : undefined
                }
                className="service-item"
                style={{ ["--svc-index" as string]: String(index + 1).padStart(2, "0") }}
              >
                <div className="services-item-thumb _02">
                  <img
                    src={card.image}
                    loading="lazy"
                    sizes="(max-width: 1728px) 100vw, 1728px"
                    alt=""
                    className="service-thumb-img"
                  />
                  <div className="service-item-thumb-text">{card.label}</div>
                </div>
                <div className="service-item-body">
                  {card.badge ? <span className="service-item-badge">{card.badge}</span> : null}
                  <div className="service-item-text p2-regular">{card.summary}</div>

                  {card.products.length > 0 ? (
                    <ul className="service-item-bullets service-item-products" aria-label={`${card.label} products`}>
                      {card.products.map((product) => (
                        <li key={product.slug}>
                          <Link
                            to="/products/$slug"
                            params={{ slug: product.slug }}
                            className="service-item-product"
                          >
                            <img src={product.image} alt="" loading="lazy" />
                            <span className="service-item-product-copy">
                              <strong>{product.name}</strong>
                              <em>
                                {product.formLabel}
                                {product.monthly > 0
                                  ? ` · from ${formatCurrency(product.monthly)}/mo`
                                  : ""}
                              </em>
                            </span>
                            <span className="service-item-product-go" aria-hidden="true">
                              →
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="service-item-bullets">
                      <li>Category hub is live — products opening through the pathway.</li>
                      <li>Take the intake quiz to see if care is right for you.</li>
                    </ul>
                  )}

                  <div className="service-item-btns">
                    <Link to={card.explorePath} className="button-03 w-inline-block">
                      <div className="button-outside-wrap">
                        <div className="btn-text-outside-03">
                          <div className="btn-text-inside-03">
                            <div className="button-text-03">{card.exploreLabel}</div>
                            <div className="button-text-03">{card.exploreLabel}</div>
                          </div>
                        </div>
                        <div className="btn-icon-outside-03">
                          <div className="btn-icon-inside-03">
                            <div className="btn-icon-03 w-embed">
                              <ArrowRight />
                            </div>
                            <div className="btn-icon-03 w-embed">
                              <ArrowRight />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="button-line-02"></div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <ServicesClosing />
        </div>
      </div>
    </section>
  );
}
