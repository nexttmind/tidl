import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import "../quiz/quiz.css";

export function CheckoutLayout({
  children,
  summary,
}: {
  children: ReactNode;
  summary: ReactNode;
}) {
  return (
    <div className="tidl-funnel tidl-funnel-page">
      <header className="tidl-header px-5 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link to="/" className="tidl-link-muted">
            ← TIDL Health
          </Link>
          <span className="text-sm font-medium">Checkout</span>
          <span className="w-10" />
        </div>
      </header>
      <div className="mx-auto grid max-w-5xl gap-8 px-5 py-8 lg:grid-cols-[1fr_360px]">
        <div>{children}</div>
        <div className="lg:sticky lg:top-8 lg:self-start">{summary}</div>
      </div>
    </div>
  );
}
