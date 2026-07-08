import type { QuizController } from "@/hooks/use-quiz";
import { calculateOrderPricing, formatCurrency } from "@/lib/pricing";
import { getRecommendedTreatment } from "@/lib/products";
import { QuizStepIntro } from "../QuizField";

export function StepRecommendation({ quiz }: { quiz: QuizController }) {
  const product = getRecommendedTreatment(quiz.data.goal, quiz.data.productSlug);
  const pricing = calculateOrderPricing(product);

  return (
    <div>
      <QuizStepIntro
        title="Your recommended treatment"
        description="Based on your assessment. A physician will confirm eligibility."
      />
      <div className="tidl-card">
        <p className="text-lg font-medium">{product.name}</p>
        <p className="mt-2 text-sm text-[var(--quiz-muted)]">{product.description}</p>
        <p className="mt-3 text-sm">
          <span className="text-[var(--quiz-muted)]">Dosage: </span>
          {product.dosage}
        </p>
        <div className="mt-5 border-t border-[var(--quiz-border)] pt-4">
          <div className="flex justify-between text-sm">
            <span>Monthly treatment</span>
            <span>{formatCurrency(pricing.treatmentMonthly)}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span>Physician consultation</span>
            <span>{formatCurrency(pricing.consultationFee)}</span>
          </div>
          <div className="mt-4 flex justify-between font-medium">
            <span>Due today</span>
            <span>{formatCurrency(pricing.total)}</span>
          </div>
        </div>
      </div>
      <p className="quiz-trust mt-4">
        Treatment eligibility is determined by your doctor.
      </p>
    </div>
  );
}
