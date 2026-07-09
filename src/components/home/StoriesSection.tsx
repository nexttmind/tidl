import { useState, useRef } from "react";
import { TESTIMONIALS } from "@/lib/testimonials";

function StarRating() {
  return (
    <div className="tst-stars" aria-label="5 out of 5 stars">
      {[...Array(5)].map((_, i) => (
        <svg key={i} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M8 1.5l1.75 3.54 3.9.57-2.82 2.75.67 3.88L8 10.35l-3.5 1.84.67-3.88L2.35 5.6l3.9-.57L8 1.5Z" />
        </svg>
      ))}
    </div>
  );
}

function QuoteMarkIcon() {
  return (
    <svg className="tst-card-quotemark" viewBox="0 0 40 30" fill="none" aria-hidden="true">
      <path
        d="M0 30V18C0 8.04 5.32 1.92 15.96 0l1.68 3C12.56 4.56 9.72 7.8 9 13H15V30H0ZM22 30V18C22 8.04 27.32 1.92 37.96 0l1.68 3C34.56 4.56 31.72 7.8 31 13H37V30H22Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Extend with more testimonials for carousel visual richness
const ALL_STORIES = [
  ...TESTIMONIALS,
  {
    name: "Marcus T.",
    quote:
      "The pen made this feel manageable from day one. No mixing, no confusion — just my dose, ready to go. I've lost weight steadily without feeling like I'm running a science experiment.",
    condition: "GLP-1 Weight Loss",
    result: "−12 lbs",
    role: "Verified Patient",
    contextImage: TESTIMONIALS[1].contextImage,
  },
  {
    name: "Elena V.",
    quote:
      "What I appreciated most was how medical it felt without being clinical. A real provider reviewed my intake, the pharmacy shipped discreetly, and messaging the care team actually gets a response.",
    condition: "GLP-1 Care",
    result: "4 months in",
    role: "Verified Patient",
    contextImage: TESTIMONIALS[2].contextImage,
  },
];

export function StoriesSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const total = ALL_STORIES.length;

  const scrollToIdx = (idx: number) => {
    const clamped = Math.max(0, Math.min(total - 1, idx));
    setActiveIdx(clamped);
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[clamped] as HTMLElement;
    if (card) {
      track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
    }
  };

  const handleTrackScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const scrollLeft = track.scrollLeft;
    const cardWidth = (track.children[0] as HTMLElement)?.offsetWidth ?? 1;
    const gap = 24;
    const idx = Math.round(scrollLeft / (cardWidth + gap));
    setActiveIdx(Math.max(0, Math.min(total - 1, idx)));
  };

  return (
    <section className="tst-sec" id="stories" data-site-header-theme="light">
      <div className="tst-inner">
        {/* Header */}
        <div className="tst-head">
          <div className="tst-eyebrow">Patient stories</div>
          <h2 className="tst-title">Real patients.<br />Measurable results.</h2>
          <p className="tst-lead">
            Thousands of patients, one licensed care team. Here's what they're saying.
          </p>
        </div>

        {/* Aggregate social proof bar */}
        <div className="tst-proof-bar">
          <div className="tst-proof-item">
            <span className="tst-proof-val">4.9</span>
            <span className="tst-proof-label">Average rating</span>
            <StarRating />
          </div>
          <div className="tst-proof-divider" aria-hidden="true" />
          <div className="tst-proof-item">
            <span className="tst-proof-val">2,400+</span>
            <span className="tst-proof-label">Verified patients</span>
          </div>
          <div className="tst-proof-divider" aria-hidden="true" />
          <div className="tst-proof-item">
            <span className="tst-proof-val">92%</span>
            <span className="tst-proof-label">See results in 90 days</span>
          </div>
        </div>

        {/* Carousel track */}
        <div className="tst-carousel-wrap">
          <div
            className="tst-track"
            ref={trackRef}
            onScroll={handleTrackScroll}
          >
            {ALL_STORIES.map((story, index) => (
              <article
                className={`tst-card${index === activeIdx ? " tst-card--active" : ""}`}
                key={`${story.name}-${index}`}
              >
                {/* Photo */}
                <div className="tst-card-photo-wrap">
                  <img
                    src={story.contextImage}
                    alt=""
                    className="tst-card-photo"
                    loading="lazy"
                  />
                  <div className="tst-card-badge">{story.result}</div>
                </div>

                {/* Body */}
                <div className="tst-card-body">
                  <QuoteMarkIcon />
                  <StarRating />
                  <blockquote className="tst-card-quote">
                    {story.quote}
                  </blockquote>
                  <footer className="tst-card-footer">
                    <div className="tst-card-author">
                      <strong>{story.name}</strong>
                      <span>{story.condition}</span>
                    </div>
                    <div className="tst-card-verified">
                      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.35" />
                        <path
                          d="M5 8.5l2 2 4-4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Verified patient
                    </div>
                  </footer>
                </div>
              </article>
            ))}
          </div>

          {/* Navigation arrows */}
          <div className="tst-nav">
            <button
              className="tst-arrow"
              aria-label="Previous testimonial"
              onClick={() => scrollToIdx(activeIdx - 1)}
              disabled={activeIdx === 0}
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 12L6 8l4-4" />
              </svg>
            </button>

            {/* Dots */}
            <div className="tst-dots" role="tablist">
              {ALL_STORIES.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === activeIdx}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`tst-dot${i === activeIdx ? " tst-dot--active" : ""}`}
                  onClick={() => scrollToIdx(i)}
                />
              ))}
            </div>

            <button
              className="tst-arrow"
              aria-label="Next testimonial"
              onClick={() => scrollToIdx(activeIdx + 1)}
              disabled={activeIdx === total - 1}
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 4l4 4-4 4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
