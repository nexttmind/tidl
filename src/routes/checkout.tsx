import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { CheckoutLayout } from "@/components/checkout/CheckoutLayout";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { FunnelPageShell } from "@/components/layout/FunnelPageShell";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { isQuizComplete, readQuizState } from "@/lib/quiz-storage";
import { useQuizModal } from "@/providers/quiz-modal-provider";
import "@/components/quiz/quiz.css";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const mounted = useIsMounted();
  const { openModal } = useQuizModal();

  if (!mounted) {
    return (
      <FunnelPageShell className="min-h-screen">
        <div aria-hidden />
      </FunnelPageShell>
    );
  }

  const stored = readQuizState();
  const complete = isQuizComplete();

  if (!complete || !stored) {
    return (
      <FunnelPageShell className="flex min-h-screen items-center justify-center px-5">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-medium">Complete your assessment first</h1>
          <p className="mt-3 text-sm text-[var(--quiz-muted)]">
            A physician-reviewed treatment plan is created after you finish all 8 steps
            of the medical intake.
          </p>
          <button type="button" onClick={() => openModal()} className="tidl-btn mt-6">
            Start assessment
          </button>
          <p className="mt-4 text-sm">
            or{" "}
            <Link to="/quiz" className="text-[var(--quiz-bronze)] underline">
              continue on full page
            </Link>
          </p>
        </div>
      </FunnelPageShell>
    );
  }

  return (
    <CheckoutLayout summary={<OrderSummary quizData={stored.data} />}>
      <CheckoutForm />
    </CheckoutLayout>
  );
}
