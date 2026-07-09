import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { TidlWordmark } from "@/components/brand/TidlWordmark";
import type { SiteHeaderTheme } from "@/hooks/useSiteHeaderState";

export type SiteNavLink = {
  label: string;
  href?: string;
  to?: string;
};

type SiteHeaderProps = {
  navLinks: SiteNavLink[];
  menuOpen: boolean;
  pinned: boolean;
  transparent: boolean;
  theme: SiteHeaderTheme;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  menuItems?: SiteNavLink[];
};

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M7 4.5 11.5 9 7 13.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DrawerLink({
  link,
  onClose,
}: {
  link: SiteNavLink;
  onClose: () => void;
}) {
  const content = (
    <>
      <span>{link.label}</span>
      <ChevronIcon />
    </>
  );

  if (link.to) {
    return (
      <Link to={link.to} className="site-header-drawer-link" onClick={onClose}>
        {content}
      </Link>
    );
  }

  return (
    <a href={link.href ?? "#"} className="site-header-drawer-link" onClick={onClose}>
      {content}
    </a>
  );
}

export function SiteHeader({
  navLinks,
  menuOpen,
  pinned,
  transparent,
  theme,
  onToggleMenu,
  onCloseMenu,
  menuItems,
}: SiteHeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const [spacerHeight, setSpacerHeight] = useState(0);
  const drawerItems = menuItems ?? navLinks;

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const syncHeight = () => {
      const height = header.offsetHeight;
      setSpacerHeight(height);
      document.documentElement.style.setProperty("--site-header-height", `${height}px`);
      document.documentElement.style.setProperty("--pdp-header-height", `${height}px`);
    };
    syncHeight();

    const observer = new ResizeObserver(syncHeight);
    observer.observe(header);
    window.addEventListener("resize", syncHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncHeight);
    };
  }, [pinned]);

  const headerClass = [
    "site-header",
    transparent && "is-transparent",
    pinned && "is-pinned",
    pinned && "is-scrolled",
    `is-${theme}`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="site-header-wrap">
      <header className={headerClass} id="navbar" ref={headerRef}>
        <div className="site-header-bar">
          <Link to="/" className="site-header-brand" aria-label="TIDL home">
            <img src="/tidl_logo.png" alt="" className="site-header-logo-mark" loading="eager" />
            <TidlWordmark variant="dark" className="site-header-wordmark" />
          </Link>

          <button
            type="button"
            className="site-header-menu-btn"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={onToggleMenu}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        <button
          type="button"
          className={`site-header-backdrop${menuOpen ? " is-open" : ""}`}
          aria-label="Close menu"
          onClick={onCloseMenu}
        />

        <aside className={`site-header-drawer${menuOpen ? " is-open" : ""}`} aria-hidden={!menuOpen}>
          <div className="site-header-drawer-head">
            <span className="site-header-drawer-title">Menu</span>
            <button
              type="button"
              className="site-header-drawer-close"
              aria-label="Close menu"
              onClick={onCloseMenu}
            >
              <CloseIcon />
            </button>
          </div>

          <p className="site-header-drawer-kicker">Explore</p>

          <nav className="site-header-drawer-nav" aria-label="Page sections">
            {drawerItems.map((link) => (
              <DrawerLink key={link.label} link={link} onClose={onCloseMenu} />
            ))}
          </nav>
        </aside>
      </header>

      {pinned && <div className="site-header-spacer" style={{ height: spacerHeight }} aria-hidden="true" />}
    </div>
  );
}
