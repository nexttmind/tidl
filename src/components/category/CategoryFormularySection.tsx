import { useMemo, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { useQuizModal } from "@/providers/quiz-modal-provider";
import { formatCurrency } from "@/lib/pricing";
import { resolvePeptideOnlyImage } from "@/lib/peptide-images";
import { getCatalogProduct, getCatalogPrice } from "@/lib/product-catalog";
import { getPeptideDef } from "@/lib/peptides";
import type { CategoryDefinition } from "@/lib/categories";
import type { ProductSlug } from "@/types/quiz";
import {
  useHomeSandbox,
  type HomeFeaturedPeptide,
} from "@/lib/prescribe-rx/use-home-sandbox";
import { CATEGORY_GOAL_MAP } from "@/lib/category-recommendations";
import "./category-formulary.css";

type CategoryFormularySectionProps = {
  category: CategoryDefinition;
};

type ShelfItem = {
  slug: ProductSlug;
  name: string;
  compound: string;
  hook: string;
  description: string;
  outcomes: readonly string[];
  displayPrice: number;
  image: string;
  dosage: string;
  formLabel: string;
  popular: boolean;
};

/** Typed PDP route — GLP-1 has a dedicated path; all others use /products/$slug. */
function ProductPdpLink({
  slug,
  className,
  children,
  "aria-label": ariaLabel,
}: {
  slug: ProductSlug;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}) {
  if (slug === "glp-1-weight-loss") {
    return (
      <Link to="/products/glp-1-weight-loss" className={className} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <Link to="/products/$slug" params={{ slug }} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

function buildShelf(
  productSlugs: readonly ProductSlug[],
  featured: HomeFeaturedPeptide[],
): ShelfItem[] {
  const liveBySlug = new Map(featured.map((item) => [item.slug, item]));

  return productSlugs.flatMap((slug) => {
    const live = liveBySlug.get(slug);
    const catalog = getCatalogProduct(slug);
    const peptide = getPeptideDef(slug);
    if (!live && !catalog && !peptide) return [];

    const marketingPrice = getCatalogPrice(slug);
    const compound =
      peptide?.compound ??
      (slug === "glp-1-weight-loss" ? "Tirzepatide" : catalog?.shortName ?? slug);
    const name =
      slug === "glp-1-weight-loss"
        ? "GLP-1 Weight Loss"
        : (peptide?.productName ?? peptide?.compound ?? catalog?.shortName ?? slug);

    const formLabel =
      catalog?.form === "pen"
        ? "TIDL Pen"
        : live?.live.handBox.formLabel === "Multi-dose pen"
          ? "TIDL Pen"
          : "Peptide protocol";

    return [
      {
        slug,
        name,
        compound,
        hook:
          slug === "glp-1-weight-loss"
            ? "Steady, measurable weight loss — pen + how-to included with every plan."
            : (peptide?.hook ??
              catalog?.headline ??
              "Physician-guided treatment built for measurable results."),
        description:
          slug === "glp-1-weight-loss"
            ? (catalog?.summary ??
              "Tirzepatide mimics gut hormones that curb appetite and support significant, sustainable fat loss — prescribed only after a licensed provider review.")
            : (peptide?.summary ?? catalog?.summary ?? ""),
        outcomes: (peptide?.outcomes ?? catalog?.highlights ?? []).slice(0, 3),
        displayPrice: live?.displayPrice ?? marketingPrice,
        image: resolvePeptideOnlyImage(slug) || live?.live.image || catalog?.image || "",
        dosage: peptide?.dosage ?? "Personalized dosing",
        formLabel,
        popular: slug === "glp-1-weight-loss" || slug === "wolverine",
      },
    ];
  });
}

/**
 * Sales-first treatment shelf — each card opens its PDP.
 */
export function CategoryFormularySection({ category }: CategoryFormularySectionProps) {
  const { openModal } = useQuizModal();
  const { featured, loading } = useHomeSandbox();

  const products = useMemo(
    () => buildShelf(category.productSlugs, featured),
    [category.productSlugs, featured],
  );
  const goal = CATEGORY_GOAL_MAP[category.slug];

  return (
    <section
      className="cform"
      id="category-formulary"
      data-site-header-theme="light"
      aria-label={`${category.title} treatments`}
    >
      <div className="cform-inner">
        <header className="cform-head">
          <p className="cform-kicker">
            <span className="cform-kicker-dot" aria-hidden="true" />
            Treatments
          </p>
          <h2 className="cform-title">
            {category.productSlugs.length > 1
              ? `Choose your ${category.navLabel.toLowerCase()} protocol`
              : category.productSlugs.length === 1
                ? `${category.navLabel} protocol`
                : `${category.navLabel} care pathway`}
            <span>
              {loading
                ? "Loading your options…"
                : "Outcome-led. Physician-prescribed. Tap a treatment to see full details."}
            </span>
          </h2>
        </header>

        {products.length > 0 ? (
          <div className="cform-shelf">
            {products.map((item, index) => (
              <article
                key={item.slug}
                className={`cform-card${index === 0 ? " is-lead" : ""}${
                  item.popular ? " is-popular" : ""
                }`}
              >
                <ProductPdpLink
                  slug={item.slug}
                  className="cform-card-hit"
                  aria-label={`View ${item.name} details`}
                >
                  <div className="cform-card-media" aria-hidden="true">
                    <div className="cform-card-glow" />
                    {item.image ? (
                      <img src={item.image} alt="" className="cform-card-vial" loading="lazy" />
                    ) : null}
                    {item.popular ? <span className="cform-card-badge">Best seller</span> : null}
                  </div>

                  <div className="cform-card-copy">
                    <p className="cform-card-index">
                      <span>{item.compound}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.formLabel}</span>
                    </p>
                    <h3 className="cform-card-name">{item.name}</h3>
                    {item.displayPrice > 0 ? (
                      <p className="cform-card-price">
                        <em>From</em>
                        <b>{formatCurrency(item.displayPrice)}</b>
                        <i>/mo</i>
                      </p>
                    ) : (
                      <p className="cform-card-price">
                        <em>Pricing</em>
                        <b>After review</b>
                      </p>
                    )}
                    <p className="cform-card-hook">{item.hook}</p>
                    {item.description ? <p className="cform-card-desc">{item.description}</p> : null}

                    {item.outcomes.length > 0 ? (
                      <ul className="cform-card-outcomes">
                        {item.outcomes.map((o) => (
                          <li key={o}>
                            <Check size={14} strokeWidth={2.4} aria-hidden="true" />
                            <span>{o}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    <dl className="cform-card-facts cform-card-facts--slim">
                      <div>
                        <dt>Protocol</dt>
                        <dd>{item.dosage}</dd>
                      </div>
                      <div>
                        <dt>Included</dt>
                        <dd>Pen + how-to</dd>
                      </div>
                    </dl>
                  </div>
                </ProductPdpLink>

                <div className="cform-card-actions">
                  <ProductPdpLink slug={item.slug} className="cform-btn cform-btn--primary">
                    View details
                    <ArrowUpRight size={16} strokeWidth={2.2} aria-hidden="true" />
                  </ProductPdpLink>
                  <button
                    type="button"
                    className="cform-btn cform-btn--ghost"
                    onClick={() => openModal({ product: item.slug, goal })}
                  >
                    Start intake
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="cform-empty">
            <h3>
              {category.slug === "testosterone"
                ? "Start with a provider-guided TRT pathway"
                : `${category.title} protocols coming online`}
            </h3>
            <p>
              {category.slug === "testosterone"
                ? "Licensed review of labs and symptoms before any prescription. Begin intake now."
                : `Start the assessment — we’ll match you to the right ${category.navLabel.toLowerCase()} protocol.`}
            </p>
            <button
              type="button"
              className="cform-btn cform-btn--primary"
              onClick={() => openModal({ goal })}
            >
              {category.ctaLabel}
              <ArrowUpRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
