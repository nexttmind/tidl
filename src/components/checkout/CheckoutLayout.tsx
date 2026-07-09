import { useEffect, useState, type ReactNode } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { FUNNEL_NAV_LINKS } from "@/components/layout/site-nav";
import { useSiteHeaderState } from "@/hooks/useSiteHeaderState";
import { lockPageScroll, unlockPageScroll } from "@/lib/age-gate";
import "./checkout.css";

const CHECKOUT_STEPS = [
  { id: "assessment", label: "Assessment" },
  { id: "checkout", label: "Checkout" },
  { id: "review", label: "Physician review" },
] as const;

function CheckoutSteps() {
  return (
    <div className="checkout-steps" aria-label="Checkout progress">
      {CHECKOUT_STEPS.map((step, index) => {
        const isDone = index === 0;
        const isCurrent = index === 1;
        return (
          <div
            key={step.id}
            className={`checkout-step${isDone ? " is-done" : ""}${isCurrent ? " is-current" : ""}`}
          >
            <span className="checkout-step-dot" aria-hidden="true">
              {isDone ? "✓" : index + 1}
            </span>
            <span>{step.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export function CheckoutLayout({
  children,
  summary,
}: {
  children: ReactNode;
  summary: ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pinned, theme, transparent } = useSiteHeaderState({ defaultTheme: "light" });

  useEffect(() => {
    if (!menuOpen) return;
    lockPageScroll();
    return () => unlockPageScroll();
  }, [menuOpen]);

  return (
    <div className="checkout-page" data-site-header-theme="light">
      <SiteHeader
        navLinks={FUNNEL_NAV_LINKS}
        menuOpen={menuOpen}
        pinned={pinned}
        transparent={transparent}
        theme={theme}
        onToggleMenu={() => setMenuOpen((open) => !open)}
        onCloseMenu={() => setMenuOpen(false)}
      />
      <div className="checkout-shell">
        <header className="checkout-page-head">
          <p className="checkout-kicker">Secure checkout</p>
          <h1 className="checkout-title">Complete your order</h1>
          <p className="checkout-lead">
            Review shipping and payment details. Your assessment is already on file for physician review.
          </p>
          <CheckoutSteps />
        </header>

        <div className="checkout-grid">
          <main>{children}</main>
          <aside className="checkout-summary">{summary}</aside>
        </div>
      </div>
    </div>
  );
}
