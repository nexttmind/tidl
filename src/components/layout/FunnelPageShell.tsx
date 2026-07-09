import { useEffect, useState, type ReactNode } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { FUNNEL_NAV_LINKS } from "@/components/layout/site-nav";
import { useSiteHeaderState } from "@/hooks/useSiteHeaderState";
import { lockPageScroll, unlockPageScroll } from "@/lib/age-gate";

type FunnelPageShellProps = {
  children: ReactNode;
  className?: string;
};

export function FunnelPageShell({ children, className = "" }: FunnelPageShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pinned, theme, transparent } = useSiteHeaderState({ defaultTheme: "light" });

  useEffect(() => {
    if (!menuOpen) return;
    lockPageScroll();
    return () => unlockPageScroll();
  }, [menuOpen]);

  return (
    <div
      className={["tidl-funnel tidl-funnel-page", className].filter(Boolean).join(" ")}
      data-site-header-theme="light"
    >
      <SiteHeader
        navLinks={FUNNEL_NAV_LINKS}
        menuOpen={menuOpen}
        pinned={pinned}
        transparent={transparent}
        theme={theme}
        onToggleMenu={() => setMenuOpen((open) => !open)}
        onCloseMenu={() => setMenuOpen(false)}
      />
      {children}
    </div>
  );
}
