import { Link } from "@tanstack/react-router";
import { ServicesClosing } from "./ServicesClosing";
import { SERVICE_CARDS, SERVICES_INTRO } from "@/lib/services-content";
import { TRUST_PILLARS } from "@/lib/trust-content";

function ArrowRight() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.75 9H14.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 3.75L14.25 9L9 14.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ServicesSection() {
  return (
    <section className="services container-full" id="services" data-site-header-theme="dark">
      <div className="container-fluid">
        <div className="services-content">
          <header className="services-head">
            <p className="services-intro-kicker">{SERVICES_INTRO.kicker}</p>
            <h2 data-w-id="3072fecc-9b21-d07c-8a0f-122ed0f2114c" className="services-title-02 heading-01">
              Pick your goal.
            </h2>
            <p className="services-intro-lead">{SERVICES_INTRO.lead}</p>
          </header>

          <div className="service-list">
            {SERVICE_CARDS.map((card, index) => (
              <div
                key={card.categorySlug}
                data-w-id={
                  index === 0
                    ? "3072fecc-9b21-d07c-8a0f-122ed0f2114f"
                    : index === 1
                      ? "3072fecc-9b21-d07c-8a0f-122ed0f21164"
                      : "3072fecc-9b21-d07c-8a0f-122ed0f21179"
                }
                id={index === 2 ? "w-node-_3072fecc-9b21-d07c-8a0f-122ed0f21179-9ec3f5ff" : undefined}
                className="service-item"
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
                  <ul className="service-item-bullets">
                    {card.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <div className="service-item-btns">
                    <Link to={card.explorePath} className="button-03 w-inline-block">
                      <div className="button-outside-wrap">
                        <div className="btn-text-outside-03">
                          <div className="btn-text-inside-03">
                            <div className="button-text-03">Explore</div>
                            <div className="button-text-03">Explore</div>
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

          <div className="services-trust-pillars">
            {TRUST_PILLARS.map((pillar) => (
              <article className="services-trust-pillar" key={pillar.id}>
                <span className="services-trust-pillar-num">{pillar.num}</span>
                <h3 className="services-trust-pillar-label">{pillar.label}</h3>
                <p className="services-trust-pillar-detail">{pillar.detail}</p>
              </article>
            ))}
          </div>

          <ServicesClosing />
        </div>
      </div>
    </section>
  );
}
