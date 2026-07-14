import { usePdpData } from "./PdpDataProvider";
import { Reveal } from "./pdp-ui";

function isOutcomeMetric(result: string) {
  return !/verified/i.test(result);
}

function VerifiedIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="pdp-rv2-check-icon">
      <circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.35" />
      <path
        d="M5 8.5l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarRow() {
  return (
    <div className="pdp-rv2-stars" aria-label="Rated 5 out of 5 stars">
      {[...Array(5)].map((_, i) => (
        <svg key={i} viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
          <path d="M7 1.5l1.53 3.1 3.42.5-2.47 2.4.58 3.4L7 9.1 4.94 10.9l.58-3.4-2.47-2.4 3.42-.5L7 1.5Z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewAvatar({ src, size = "md" }: { src: string; size?: "md" | "sm" }) {
  return (
    <div className={`pdp-rv2-avatar pdp-rv2-avatar--${size}`}>
      <img src={src} alt="" className="pdp-rv2-avatar-img" loading="lazy" />
    </div>
  );
}

export function PdpReviewsSection() {
  const { reviews, reviewStats } = usePdpData();
  const featured = reviews.find((r) => r.featured) ?? reviews[0];
  const others = reviews.filter((r) => !r.featured);

  return (
    <section className="pdp-section pdp-section--reviews" id="reviews" data-pdp-header-theme="dark">
      <div className="pdp-reviews-stage">
        <div className="pdp-reviews-ambient" aria-hidden="true">
          <span className="pdp-reviews-pulse pdp-reviews-pulse--a" />
          <span className="pdp-reviews-pulse pdp-reviews-pulse--b" />
          <span className="pdp-reviews-pulse pdp-reviews-pulse--c" />
          <svg className="pdp-reviews-vitals" viewBox="0 0 1200 200" preserveAspectRatio="none">
            <path
              className="pdp-reviews-vitals-line"
              d="M0 100 H180 L200 100 L220 40 L240 160 L260 100 H420 L440 100 L460 55 L480 145 L500 100 H700 L720 100 L740 35 L760 165 L780 100 H960 L980 100 L1000 60 L1020 140 L1040 100 H1200"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="pdp-reviews-grid-lines" />
        </div>

        <div className="pdp-section-shell pdp-section-shell--dark pdp-reviews-shell">
          <div className="pdp-section-inner">
            <Reveal>
              <span className="pdp-kicker pdp-kicker--light">Patient stories</span>
              <h2 className="pdp-section-title pdp-section-title--light">
                Real results from real patients
              </h2>
              <p className="pdp-section-lead pdp-section-lead--light">
                Physician-guided care with outcomes patients can feel — and measure.
              </p>
            </Reveal>

            <div className="pdp-rv2-stats">
              {reviewStats.map((stat, index) => (
                <Reveal key={stat.label} delay={index * 0.06}>
                  <div className="pdp-rv2-stat">
                    <strong className="pdp-rv2-stat-val">{stat.value}</strong>
                    <span className="pdp-rv2-stat-label">{stat.label}</span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="pdp-rv2-featured-wrap">
              <article className="pdp-rv2-featured">
                <header className="pdp-rv2-card-head">
                  <ReviewAvatar src={featured.portraitImage} size="md" />
                  <div className="pdp-rv2-card-meta">
                    <div className="pdp-rv2-card-meta-top">
                      <strong>{featured.name}</strong>
                      <span className="pdp-rv2-outcome-badge">{featured.result}</span>
                    </div>
                    <StarRow />
                    <span className="pdp-rv2-card-role">
                      {featured.condition} · Verified Patient
                    </span>
                  </div>
                </header>
                <blockquote className="pdp-rv2-featured-quote">{featured.quote}</blockquote>
                <footer className="pdp-rv2-featured-footer">
                  <div className="pdp-rv2-verified">
                    <VerifiedIcon />
                    Verified patient
                  </div>
                </footer>
              </article>
            </Reveal>

            <div className="pdp-rv2-grid">
              {others.map((story, index) => (
                <Reveal key={story.name} delay={0.08 + index * 0.08} className="pdp-rv2-card-reveal">
                  <article className="pdp-rv2-card">
                    <header className="pdp-rv2-card-head">
                      <ReviewAvatar src={story.portraitImage} size="sm" />
                      <div className="pdp-rv2-card-meta">
                        <div className="pdp-rv2-card-meta-top">
                          <strong>{story.name}</strong>
                          {isOutcomeMetric(story.result) ? (
                            <span className="pdp-rv2-outcome-badge">{story.result}</span>
                          ) : (
                            <span className="pdp-rv2-cond-badge">{story.condition}</span>
                          )}
                        </div>
                        <StarRow />
                      </div>
                    </header>
                    <p className="pdp-rv2-card-quote">{story.quote}</p>
                    <footer className="pdp-rv2-card-footer">
                      <div className="pdp-rv2-verified">
                        <VerifiedIcon />
                        Verified patient
                      </div>
                      <span className="pdp-rv2-card-cond">{story.condition}</span>
                    </footer>
                  </article>
                </Reveal>
              ))}
            </div>

            <p className="pdp-reviews-disclaimer pdp-reviews-disclaimer--light">
              Individual results vary. Reviews reflect personal experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
