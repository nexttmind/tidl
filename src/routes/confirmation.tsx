import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { StatusTimeline } from "@/components/checkout/StatusTimeline";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { formatCurrency } from "@/lib/pricing";
import { getOrderById } from "@/lib/order-storage";
import type { Order } from "@/types/order";
import "@/components/quiz/quiz.css";

const confirmationSearchSchema = z.object({
  orderId: z.string().optional(),
});

export const Route = createFileRoute("/confirmation")({
  validateSearch: confirmationSearchSchema,
  component: ConfirmationPage,
});

function ConfirmationPage() {
  const mounted = useIsMounted();
  const { orderId } = Route.useSearch();

  if (!mounted) {
    return <div className="tidl-funnel tidl-funnel-page min-h-screen" aria-hidden />;
  }

  const order: Order | null = orderId ? getOrderById(orderId) : null;

  if (!order) {
    return (
      <div className="tidl-funnel tidl-funnel-page flex min-h-screen items-center justify-center px-5">
        <div className="text-center">
          <h1 className="text-xl font-medium">Order not found</h1>
          <Link to="/" className="mt-4 inline-block text-sm text-[var(--quiz-bronze)] underline">
            Return home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="tidl-funnel tidl-funnel-page px-5 py-12">
      <div className="mx-auto max-w-lg">
        <h1 className="text-2xl font-medium tracking-tight">
          Thank you. Your physician review has begun.
        </h1>
        <p className="mt-3 text-sm text-[var(--quiz-muted)]">
          Order <strong>{order.orderNumber}</strong> · {formatCurrency(order.pricing.total)}
        </p>
        <div className="tidl-card mt-8">
          <h2 className="font-medium">{order.treatmentName}</h2>
          <p className="mt-2 text-sm text-[var(--quiz-muted)]">{order.treatmentDescription}</p>
        </div>
        <div className="tidl-card mt-6">
          <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-[var(--quiz-muted-warm)]">
            Care timeline
          </h3>
          <StatusTimeline status={order.status} />
        </div>
        <Link to="/account" className="tidl-btn mt-8 inline-flex w-auto px-8">
          View account
        </Link>
      </div>
    </div>
  );
}
