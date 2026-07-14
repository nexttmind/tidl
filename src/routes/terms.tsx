import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { FUNNEL_NAV_LINKS } from "@/components/layout/site-nav";
import { useSiteHeaderState } from "@/hooks/useSiteHeaderState";
import "@/components/home/home.css";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | TIDL" },
      {
        name: "description",
        content:
          "Terms for using TIDL telehealth, quiz intake, and physician-prescribed treatment.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  const { pinned, theme, transparent } = useSiteHeaderState({ defaultTheme: "light" });

  return (
    <div data-site-header-theme="light">
      <SiteHeader
        navLinks={FUNNEL_NAV_LINKS}
        menuOpen={false}
        pinned={pinned}
        transparent={transparent}
        theme={theme}
        onToggleMenu={() => {}}
        onCloseMenu={() => {}}
      />
      <main className="legal-page">
        <div className="legal-inner">
          <p className="legal-kicker">Trust &amp; safety</p>
          <h1 className="legal-title">Terms of Service</h1>
          <p className="legal-lead">
            By using TIDL.com you agree to these terms. Treatment is prescription-only and requires a
            licensed provider review through our clinical partners.
          </p>

          <section className="legal-section">
            <h2>Telehealth and prescription care</h2>
            <p>
              Completing the quiz or checkout does not guarantee a prescription. A licensed provider
              reviews your intake and may approve, decline, or request more information. Any medical
              question is answered by a human clinician — never by a bot as a substitute for care.
            </p>
          </section>

          <section className="legal-section">
            <h2>Eligibility</h2>
            <p>
              You must be 18 or older to request treatment. You agree that the information you provide
              is accurate to the best of your knowledge.
            </p>
          </section>

          <section className="legal-section">
            <h2>Orders, shipping, and returns</h2>
            <p>
              Compounded prescription medicines generally cannot be returned once dispensed. If there
              is a fulfillment issue, support may offer a refund, reshipment, or credit as appropriate.
            </p>
          </section>

          <section className="legal-section">
            <h2>Privacy</h2>
            <p>
              See our{" "}
              <Link to="/privacy">Privacy Policy</Link> for how website and clinical data are handled.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
