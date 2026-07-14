import { Link } from "@tanstack/react-router";
import { CATEGORIES, CATEGORY_SLUGS } from "@/lib/categories";
import { CATEGORY_PATHS, getCatalogProduct } from "@/lib/product-catalog";
import { formatCurrency } from "@/lib/pricing";
import { getProductBySlug } from "@/lib/products";
import "./browse-directory.css";

/**
 * Landing-page directory: all 6 category hubs + direct PDP links.
 * Easy scan path when Services only features a few cards.
 */
export function BrowseDirectorySection() {
  return (
    <section className="browse-dir" id="browse" data-site-header-theme="light">
      <div className="browse-dir-inner">
        <header className="browse-dir-head">
          <p className="browse-dir-kicker">Shop treatments</p>
          <h2 className="browse-dir-title">All categories &amp; products</h2>
          <p className="browse-dir-lead">
            Jump straight to a care category, or open any product page. Every path can lead into the
            physician intake quiz.
          </p>
        </header>

        <div className="browse-dir-cats" role="navigation" aria-label="Treatment categories">
          {CATEGORY_SLUGS.map((slug) => (
            <Link key={slug} to={CATEGORY_PATHS[slug]} className="browse-dir-chip">
              {CATEGORIES[slug].navLabel}
            </Link>
          ))}
        </div>

        <div className="browse-dir-grid">
          {CATEGORY_SLUGS.map((slug) => {
            const category = CATEGORIES[slug];
            const products = category.productSlugs
              .map((productSlug) => getCatalogProduct(productSlug))
              .filter((item): item is NonNullable<typeof item> => item != null);

            return (
              <article key={slug} className="browse-dir-card">
                <div className="browse-dir-card-top">
                  <img
                    src={category.heroImage}
                    alt=""
                    loading="lazy"
                    className="browse-dir-card-img"
                  />
                  <div className="browse-dir-card-copy">
                    <p className="browse-dir-card-kicker">{category.kicker}</p>
                    <h3 className="browse-dir-card-title">{category.title}</h3>
                    <p className="browse-dir-card-lead">{category.lead}</p>
                    <Link to={CATEGORY_PATHS[slug]} className="browse-dir-card-link">
                      Open category
                    </Link>
                  </div>
                </div>

                {products.length > 0 ? (
                  <ul className="browse-dir-products">
                    {products.map((product) => {
                      const monthly = getProductBySlug(product.slug)?.monthlyPrice ?? 0;
                      return (
                        <li key={product.slug}>
                          <Link
                            to="/products/$slug"
                            params={{ slug: product.slug }}
                            className="browse-dir-product"
                          >
                            <img src={product.image} alt="" loading="lazy" />
                            <span className="browse-dir-product-copy">
                              <strong>{product.shortName}</strong>
                              <em>
                                {product.form === "pen" ? "TIDL Pen" : "Peptide"}
                                {monthly > 0 ? ` · from ${formatCurrency(monthly)}/mo` : ""}
                              </em>
                            </span>
                            <span className="browse-dir-product-go" aria-hidden="true">
                              →
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="browse-dir-empty">
                    Category hub is live — products launching soon.{" "}
                    <Link to={CATEGORY_PATHS[slug]}>View pathway</Link>
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
