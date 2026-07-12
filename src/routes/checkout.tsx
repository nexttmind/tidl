import { createFileRoute } from "@tanstack/react-router";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { CheckoutLayout } from "@/components/checkout/CheckoutLayout";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import "@/components/checkout/checkout.css";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { isQuizComplete, readQuizState } from "@/lib/quiz-storage";
import { useQuizModal } from "@/providers/quiz-modal-provider";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const mounted = useIsMounted();
  const { openModal } = useQuizModal();

  if (!mounted) {
    return <div className="checkout-page" aria-hidden />;
  }

  const stored = readQuizState();
  const complete = isQuizComplete();

  if (!complete || !stored) {
    return (
      <div className="checkout-page" data-site-header-theme="light">
        <div className="checkout-gate">
          <div className="checkout-gate-card">
            <h1 className="checkout-gate-title">Complete your assessment first</h1>
            <p className="checkout-gate-lead">
              A physician-reviewed treatment plan is created after you finish all 8 steps of the medical intake.
            </p>
            <button type="button" onClick={() => openModal()} className="checkout-submit" style={{ marginTop: 24 }}>
              Start assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <CheckoutLayout summary={<OrderSummary quizData={stored.data} />}>
      <CheckoutForm />
    </CheckoutLayout>
  );
}
