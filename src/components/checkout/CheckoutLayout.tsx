import { useEffect, useState, type ReactNode } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { FUNNEL_NAV_LINKS } from "@/components/layout/site-nav";
import { useSiteHeaderState } from "@/hooks/useSiteHeaderState";
import { lockPageScroll, unlockPageScroll } from "@/lib/age-gate";
import "../quiz/quiz.css";

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
    <div className="tidl-funnel tidl-funnel-page" data-site-header-theme="light">
      <SiteHeader
        navLinks={FUNNEL_NAV_LINKS}
        menuOpen={menuOpen}
        pinned={pinned}
        transparent={transparent}
        theme={theme}
        onToggleMenu={() => setMenuOpen((open) => !open)}
        onCloseMenu={() => setMenuOpen(false)}
      />
      <div className="mx-auto grid max-w-5xl gap-8 px-5 py-8 lg:grid-cols-[1fr_360px]">
        <div>{children}</div>
        <div className="lg:sticky lg:top-8 lg:self-start">{summary}</div>
      </div>
    </div>
  );
}
