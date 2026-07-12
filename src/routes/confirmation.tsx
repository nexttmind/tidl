import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { StatusTimeline } from "@/components/checkout/StatusTimeline";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { FUNNEL_NAV_LINKS } from "@/components/layout/site-nav";
import { useSiteHeaderState } from "@/hooks/useSiteHeaderState";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { usePrxEncounterStatus } from "@/hooks/use-prx-encounter-status";
import { formatCurrency } from "@/lib/pricing";
import { getRecommendedTreatment } from "@/lib/products";
import { getOrderById } from "@/lib/order-storage";
import { prxStatusLabel, prxStatusToOrderStatus } from "@/lib/prescribe-rx";
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

  const order: Order | null = mounted && orderId ? getOrderById(orderId) : null;
  const { encounter, error: statusError } = usePrxEncounterStatus(order?.prx?.encounterId ?? null);

  if (!mounted) {
    return <div className="checkout-page" aria-hidden />;
  }

  const product = order
    ? getRecommendedTreatment(order.quizSnapshot.goal, order.quizSnapshot.productSlug)
    : null;

  // Prefer the live PRX status when we have an encounter; fall back to local.
  const timelineStatus = encounter ? prxStatusToOrderStatus(encounter.status) : order?.status;
  const liveLabel = encounter ? prxStatusLabel(encounter) : null;

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

        {order.prx?.encounterNumber || order.prx?.patientNumber ? (
          <div className="checkout-card checkout-prx-ref" style={{ marginBottom: 16 }}>
            <h3 className="checkout-card-title" style={{ margin: "0 0 8px" }}>
              PrescribeRx reference
            </h3>
            <p className="checkout-card-sub" style={{ margin: "0 0 16px" }}>
              Use these numbers to find your intake in the TIDL Sandbox admin under Encounters and
              Patients.
            </p>
            <dl className="checkout-prx-ref-list">
              {order.prx.encounterNumber ? (
                <div className="checkout-prx-ref-row">
                  <dt>Encounter #</dt>
                  <dd>{order.prx.encounterNumber}</dd>
                </div>
              ) : null}
              {order.prx.patientNumber ? (
                <div className="checkout-prx-ref-row">
                  <dt>Patient #</dt>
                  <dd>{order.prx.patientNumber}</dd>
                </div>
              ) : null}
            </dl>
          </div>
        ) : null}

        <div className="checkout-card">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              margin: "0 0 16px",
            }}
          >
            <h3 className="checkout-card-title" style={{ margin: 0 }}>
              Care timeline
            </h3>
            {liveLabel ? (
              <span className="checkout-live-status" title="Live from PrescribeRx">
                <span className="checkout-live-dot" aria-hidden="true" />
                {liveLabel}
              </span>
            ) : null}
          </div>
          <StatusTimeline status={timelineStatus ?? order.status} />
          {statusError ? (
            <p className="checkout-card-sub" style={{ margin: "12px 0 0", color: "#9a3412" }}>
              Live status is temporarily unavailable — showing your last saved step.
            </p>
          ) : null}
        </div>

        <Link to="/account" className="checkout-submit" style={{ marginTop: 24, textDecoration: "none" }}>
          View account
        </Link>
      </div>
    </div>
  );
}
