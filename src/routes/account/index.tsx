import { createFileRoute, Link } from "@tanstack/react-router";
import { StatusTimeline } from "@/components/checkout/StatusTimeline";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { formatCurrency } from "@/lib/pricing";
import { getLatestOrderForUser } from "@/lib/order-storage";
import { useAuth } from "@/providers/auth-provider";
import { useQuizModal } from "@/providers/quiz-modal-provider";
import "@/components/quiz/quiz.css";

export const Route = createFileRoute("/account/")({
  component: AccountPage,
});

function AccountPage() {
  const mounted = useIsMounted();
  const { user, hydrated: authHydrated } = useAuth();
  const { openModal } = useQuizModal();

  if (!mounted || !authHydrated) {
    return <div className="tidl-funnel tidl-funnel-page min-h-screen" aria-hidden />;
  }

  const order = user ? getLatestOrderForUser(user.id) : null;

  if (!user) {
    return (
      <div className="tidl-funnel tidl-funnel-page flex min-h-screen items-center justify-center px-5">
        <div className="text-center">
          <h1 className="text-xl font-medium">Sign in to view your account</h1>
          <button type="button" onClick={() => openModal()} className="tidl-btn mt-6">
            Start assessment
          </button>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="tidl-funnel tidl-funnel-page flex min-h-screen items-center justify-center px-5">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-medium">Welcome, {user.firstName}</h1>
          <p className="mt-3 text-sm text-[var(--quiz-muted)]">
            You haven't started a treatment plan yet.
          </p>
          <button type="button" onClick={() => openModal()} className="tidl-btn mt-6">
            Take the assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="tidl-funnel tidl-funnel-page px-5 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-medium">Your care</h1>
          <Link to="/" className="tidl-link-muted">
            Home
          </Link>
        </div>
        <div className="tidl-card">
          <p className="text-sm text-[var(--quiz-muted)]">Order {order.orderNumber}</p>
          <h2 className="mt-1 text-lg font-medium">{order.treatmentName}</h2>
          <p className="mt-2 text-sm text-[var(--quiz-muted)]">{order.dosage}</p>
          <p className="mt-4 text-sm">
            Monthly: {formatCurrency(order.pricing.treatmentMonthly)}
          </p>
        </div>
        <div className="tidl-card mt-6">
          <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-[var(--quiz-muted-warm)]">
            Status
          </h3>
          <StatusTimeline status={order.status} />
        </div>
        {order.nextRefillDate ? (
          <p className="mt-4 text-sm text-[var(--quiz-muted)]">
            Next refill: {new Date(order.nextRefillDate).toLocaleDateString()}
          </p>
        ) : null}
      </div>
    </div>
  );
}
