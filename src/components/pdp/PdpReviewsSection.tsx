import { usePdpData } from "./PdpDataProvider";
import { TestimonialContextPhoto } from "@/components/brand/PatientAvatar";
import { Reveal } from "./pdp-ui";

function isOutcomeMetric(result: string) {
  return !/verified/i.test(result);
}

export function PdpReviewsSection() {
  const { reviews, reviewStats } = usePdpData();
  const featured = reviews.find((r) => r.featured) ?? reviews[0];
  const others = reviews.filter((r) => !r.featured);

  return (
    <section className="pdp-section pdp-section--reviews" id="reviews" data-pdp-header-theme="dark">
      <div className="pdp-section-shell pdp-section-shell--dark">
        <div className="pdp-section-inner">
          <Reveal>
            <span className="pdp-kicker pdp-kicker--light">Patient stories</span>
            <h2 className="pdp-section-title pdp-section-title--light">Real results from real patients</h2>
            <p className="pdp-section-lead pdp-section-lead--light">
              Discreet care that still feels human — from intake through delivery and beyond.
            </p>
          </Reveal>

          <div className="pdp-review-stats">
            {reviewStats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.06}>
                <div className="pdp-review-stat">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="pdp-reviews-layout">
            <Reveal className="pdp-review-featured-wrap">
              <article className="pdp-review-featured">
                <div className="pdp-review-featured-photo">
                  <TestimonialContextPhoto
                    src={featured.contextImage}
                    alt={`${featured.condition} care context`}
                  />
                  <div className="pdp-review-featured-badge">{featured.result}</div>
                </div>
                <div className="pdp-review-featured-body">
                  <div className="pdp-review-stars" aria-label="Rated 5 out of 5">
                    ★★★★★
                  </div>
                  <blockquote>{featured.quote}</blockquote>
                  <footer>
                    <strong>{featured.name}</strong>
                    <span>{featured.condition} · Verified Patient</span>
                  </footer>
                </div>
              </article>
            </Reveal>

            <div className="pdp-reviews-stack">
              {others.map((story, index) => (
                <Reveal key={story.name} delay={0.08 + index * 0.08}>
                  <article className="pdp-review-card">
                    <div className="pdp-review-card-body">
                      <div className="pdp-review-card-meta">
                        <div className="pdp-review-stars" aria-label="Rated 5 out of 5">
                          ★★★★★
                        </div>
                        {isOutcomeMetric(story.result) ? (
                          <span className="pdp-review-outcome">{story.result}</span>
                        ) : (
                          <span className="pdp-review-condition-tag">{story.condition}</span>
                        )}
                      </div>
                      <p className="pdp-review-card-quote">{story.quote}</p>
                      <footer className="pdp-review-card-footer">
                        <span className="pdp-review-verified">
                          <svg viewBox="0 0 16 16" aria-hidden="true" className="pdp-review-verified-icon">
                            <path
                              d="M6.2 11.1 3.4 8.3l-.9.9 3.7 3.7 7.4-7.4-.9-.9-6.5 6.5Z"
                              fill="currentColor"
                            />
                          </svg>
                          Verified patient
                        </span>
                        <span className="pdp-review-condition">{story.condition}</span>
                      </footer>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <p className="pdp-reviews-disclaimer pdp-reviews-disclaimer--light">
            Individual results vary. Reviews reflect personal experience.
          </p>
        </div>
      </div>
    </section>
  );
}
