import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { CheckoutLayout } from "@/components/checkout/CheckoutLayout";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import "@/components/checkout/checkout.css";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/track";
import { isQuizComplete, readQuizState } from "@/lib/quiz-storage";
import { useQuizModal } from "@/providers/quiz-modal-provider";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const mounted = useIsMounted();
  const { openModal } = useQuizModal();

  useEffect(() => {
    if (!mounted) return;
    const stored = readQuizState();
    if (isQuizComplete() && stored) {
      trackEvent(ANALYTICS_EVENTS.checkoutStarted, {
        goal: stored.data.goal ?? undefined,
        product_slug: stored.data.productSlug ?? undefined,
      });
    }
  }, [mounted]);

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
