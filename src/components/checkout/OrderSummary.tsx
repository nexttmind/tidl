import { calculateOrderPricing, formatCurrency } from "@/lib/pricing";
import { getRecommendedTreatment } from "@/lib/products";
import type { QuizFormData } from "@/types/quiz";
import "../quiz/quiz.css";

export function OrderSummary({ quizData }: { quizData: QuizFormData }) {
  const product = getRecommendedTreatment(quizData.goal, quizData.productSlug);
  const pricing = calculateOrderPricing(product);

  return (
    <div className="tidl-card">
      <h3 className="text-lg font-medium">Order summary</h3>
      <p className="mt-1 text-sm text-[var(--quiz-muted)]">{product.name}</p>
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Monthly treatment</span>
          <span>{formatCurrency(pricing.treatmentMonthly)}</span>
        </div>
        <div className="flex justify-between">
          <span>Physician consultation</span>
          <span>{formatCurrency(pricing.consultationFee)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{pricing.shipping === 0 ? "Free" : formatCurrency(pricing.shipping)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>{formatCurrency(pricing.tax)}</span>
        </div>
        <div className="flex justify-between border-t border-[var(--quiz-border)] pt-3 font-medium">
          <span>Due today</span>
          <span>{formatCurrency(pricing.total)}</span>
        </div>
      </div>
      <p className="mt-4 text-xs text-[var(--quiz-muted-warm)]">
        A physician reviews every assessment. Treatment eligibility is determined by
        your doctor.
      </p>
    </div>
  );
}
