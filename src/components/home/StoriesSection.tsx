import { useCallback, useState } from "react";
import { TESTIMONIALS } from "@/lib/testimonials";

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      className="stories-arrow-ico"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      style={direction === "left" ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        d="M2.5 7h9M7.5 3.5L11 7l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StoriesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = TESTIMONIALS.length;

  const goPrev = useCallback(() => {
    setActiveIndex((index) => (index - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setActiveIndex((index) => (index + 1) % total);
  }, [total]);

  return (
    <section className="stories-03 container-full" id="stories" data-site-header-theme="light">
      <div className="container-fluid for-works">
        <div className="stories-content-03">
          <h2 className="stories-title-03 heading-01">Real patients. Measurable results.</h2>

          <div className="stories-slider-03 stories-slider-react">
            <div className="stories-slider-viewport">
              <div
                className="stories-slides-track"
                style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}
              >
                {TESTIMONIALS.map((story, index) => (
                  <div className="stories-slide-02 stories-slide-react" key={story.name}>
                    <article className="stories-item-03" aria-hidden={index !== activeIndex}>
                      <div className="stories-item-thumb-03">
                        <img
                          src={story.contextImage}
                          loading="lazy"
                          alt=""
                          className={`stories-item-thumb-img${index === 1 ? " _02" : ""}`}
                        />
                      </div>
                      <div className="stories-info-03">
                        <div className="stories-item-head-03">
                          <div className="stories-item-text-03 heading-03">{story.quote}</div>
                        </div>
                        <div className="stories-item-info-02">
                          <div className="stories-item-info-title-02 heading-05">{story.name}</div>
                          <div className="stories-item-info-text-02 p2-regular">{story.role}</div>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>

            <div className="stories-slider-nav">
              <button
                type="button"
                className="stories-arrow left"
                aria-label="Previous patient story"
                onClick={goPrev}
              >
                <ArrowIcon direction="left" />
              </button>
              <button
                type="button"
                className="stories-arrow right"
                aria-label="Next patient story"
                onClick={goNext}
              >
                <ArrowIcon direction="right" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
