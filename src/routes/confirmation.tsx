import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { StatusTimeline } from "@/components/checkout/StatusTimeline";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { FUNNEL_NAV_LINKS } from "@/components/layout/site-nav";
import { useSiteHeaderState } from "@/hooks/useSiteHeaderState";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { formatCurrency } from "@/lib/pricing";
import { getRecommendedTreatment } from "@/lib/products";
import { getOrderById } from "@/lib/order-storage";
import type { Order } from "@/types/order";
import "@/components/checkout/checkout.css";

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
  const { pinned, theme, transparent } = useSiteHeaderState({ defaultTheme: "light" });

  if (!mounted) {
    return <div className="checkout-page" aria-hidden />;
  }

  const order: Order | null = orderId ? getOrderById(orderId) : null;
  const product = order
    ? getRecommendedTreatment(order.quizSnapshot.goal, order.quizSnapshot.productSlug)
    : null;

  if (!order) {
    return (
      <div className="checkout-page" data-site-header-theme="light">
        <div className="checkout-gate">
          <div className="checkout-gate-card">
            <h1 className="checkout-gate-title">Order not found</h1>
            <Link to="/" className="checkout-gate-link" style={{ display: "inline-block", marginTop: 16 }}>
              Return home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page" data-site-header-theme="light">
      <SiteHeader
        navLinks={FUNNEL_NAV_LINKS}
        menuOpen={false}
        pinned={pinned}
        transparent={transparent}
        theme={theme}
        onToggleMenu={() => {}}
        onCloseMenu={() => {}}
      />
      <div className="checkout-shell" style={{ maxWidth: 640 }}>
        <header className="checkout-page-head">
          <p className="checkout-kicker">Order confirmed</p>
          <h1 className="checkout-title">Thank you. Your physician review has begun.</h1>
          <p className="checkout-lead">
            Order <strong>{order.orderNumber}</strong> · {formatCurrency(order.pricing.total)}
          </p>
        </header>

        <div className="checkout-card" style={{ marginBottom: 16 }}>
          <div className="checkout-product-card" style={{ margin: 0, background: "#fff" }}>
            <div className="checkout-product-visual">
              <img src={product?.image ?? ""} alt="" loading="lazy" />
            </div>
            <div className="checkout-product-copy">
              <h2 className="checkout-product-name">{order.treatmentName}</h2>
              <p className="checkout-product-tag" style={{ margin: 0 }}>
                {order.treatmentDescription}
              </p>
            </div>
          </div>
        </div>

        <div className="checkout-card">
          <h3 className="checkout-card-title" style={{ margin: "0 0 16px" }}>
            Care timeline
          </h3>
          <StatusTimeline status={order.status} />
        </div>

        <Link to="/account" className="checkout-submit" style={{ marginTop: 24, textDecoration: "none" }}>
          View account
        </Link>
      </div>
    </div>
  );
}
