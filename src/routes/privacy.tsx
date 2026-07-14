import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { FUNNEL_NAV_LINKS } from "@/components/layout/site-nav";
import { useSiteHeaderState } from "@/hooks/useSiteHeaderState";
import "@/components/home/home.css";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | TIDL" },
      {
        name: "description",
        content:
          "How TIDL handles personal information, health information in PrescribeRx, and marketing data.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
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
          <p className="legal-kicker">Trust &amp; privacy</p>
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-lead">
            TIDL is built as a legitimate medical brand. Private health information used for
            prescriptions stays inside PrescribeRx. Marketing and account data on this site is
            handled separately.
          </p>

          <section className="legal-section">
            <h2>What we collect on the website</h2>
            <p>
              Contact details you enter during intake or newsletter signup, quiz answers needed to
              recommend a pathway, shipping and payment information at checkout, and basic device or
              analytics signals used to keep the site working.
            </p>
          </section>

          <section className="legal-section">
            <h2>Health information</h2>
            <p>
              Medical intake answers, vitals, and prescriptions are processed through PrescribeRx, the
              clinical platform behind TIDL care. Those records are not sent to advertising platforms.
            </p>
          </section>

          <section className="legal-section">
            <h2>How we use information</h2>
            <p>
              To complete your physician review, fulfill pharmacy shipping, send order updates, and
              improve the site experience. Adults only — TIDL treatments are for people 18 and over.
            </p>
          </section>

          <section className="legal-section">
            <h2>Questions</h2>
            <p>
              For privacy requests related to your TIDL account or order, contact support through your{" "}
              <Link to="/account">account</Link> after checkout, or reply to a care message once your
              encounter is open.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
