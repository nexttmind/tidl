import type { QuizController } from "@/hooks/use-quiz";
import { GOAL_HERO_BULLETS, INCLUDED_ITEMS, RECOMMENDATION_TIMELINE } from "@/lib/quiz-recommendation";
import { calculateOrderPricing, formatCurrency } from "@/lib/pricing";
import { getRecommendedTreatment } from "@/lib/products";
import type { GoalId } from "@/types/quiz";

function IncludedIcon({ id }: { id: string }) {
  const paths: Record<string, string> = {
    package: "M6 7h12v10H6V7zm2 2v6h8V9H8z",
    stethoscope: "M9 4a3 3 0 1 1 6 0v3h1a2 2 0 0 1 2 2v1h-2v-1h-2v6a3 3 0 1 1-2 0V9H9V8h1V4z",
    truck: "M3 8h9v7H3V8zm10 1h2l2 3v4h-4V9zm-1 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-9 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
    shield: "M12 3l7 3v6c0 4.2-2.8 6.6-7 9-4.2-2.4-7-4.8-7-9V6l7-3z",
    clock: "M12 7v5l3 2",
  };

  return (
    <span className="quiz-rec-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d={paths[id] ?? paths.package} />
      </svg>
    </span>
  );
}

export function StepRecommendation({ quiz }: { quiz: QuizController }) {
  const product = getRecommendedTreatment(quiz.data.goal, quiz.data.productSlug);
  const pricing = calculateOrderPricing(product);
  const goal = (quiz.data.goal ?? product.goal) as GoalId;
  const bullets = GOAL_HERO_BULLETS[goal] ?? GOAL_HERO_BULLETS["weight-loss"];

  return (
    <div className="quiz-recommendation">
      <section className="quiz-rec-hero">
        <p className="quiz-rec-kicker">Your match</p>
        <h2 className="quiz-rec-hero-title">You&apos;re in the right hands</h2>
        <ul className="quiz-rec-hero-list">
          {bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="quiz-rec-product">
        <div className="quiz-rec-product-visual">
          <img src={product.image} alt="" loading="lazy" />
        </div>
        <div className="quiz-rec-product-copy">
          <div className="quiz-rec-product-head">
            <div>
              <p className="quiz-rec-brand">{product.brandName}</p>
              <h3 className="quiz-rec-product-name">{product.name}</h3>
              <p className="quiz-rec-product-tag">{product.tag}</p>
            </div>
            <span className="quiz-rec-rx">Rx</span>
          </div>
          <p className="quiz-rec-product-desc">{product.description}</p>
          <p className="quiz-rec-product-price">
            {formatCurrency(product.monthlyPrice)}
            <span>/month</span>
          </p>
        </div>
      </section>

      <section className="quiz-rec-block">
        <h4 className="quiz-rec-block-title">What&apos;s included</h4>
        <div className="quiz-rec-included">
          {INCLUDED_ITEMS.map((item) => (
            <div className="quiz-rec-included-item" key={item.id}>
              <IncludedIcon id={item.id} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="quiz-rec-block">
        <h4 className="quiz-rec-block-title">What to expect</h4>
        <ul className="quiz-rec-outcomes">
          {product.outcomes.map((outcome) => (
            <li key={outcome}>{outcome}</li>
          ))}
        </ul>
      </section>

      <section className="quiz-rec-block">
        <h4 className="quiz-rec-block-title">What happens next</h4>
        <ol className="quiz-rec-timeline">
          {RECOMMENDATION_TIMELINE.map((step, index) => (
            <li key={step.title}>
              <span className="quiz-rec-timeline-num">{index + 1}</span>
              <div>
                <strong>{step.title}</strong>
                <p>{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="quiz-rec-pricing">
        <div className="quiz-rec-pricing-row">
          <span>Monthly treatment</span>
          <span>{formatCurrency(pricing.treatmentMonthly)}</span>
        </div>
        <div className="quiz-rec-pricing-row">
          <span>Physician consultation</span>
          <span>{formatCurrency(pricing.consultationFee)}</span>
        </div>
        <div className="quiz-rec-pricing-row quiz-rec-pricing-row--total">
          <span>Due today (est.)</span>
          <span>{formatCurrency(pricing.total)}</span>
        </div>
      </div>

      <p className="quiz-rec-disclaimer">
        Treatment eligibility is determined by your physician. This recommendation is not a
        prescription or guarantee of approval.
      </p>
    </div>
  );
}
