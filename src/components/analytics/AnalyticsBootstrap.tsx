import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { captureAttribution } from "@/lib/analytics/attribution";
import { getAnalyticsConfig } from "@/lib/analytics/config";
import { trackPageView } from "@/lib/analytics/track";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
  }
}

function injectGtm(gtmId: string) {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
  document.head.appendChild(script);
}

function injectMetaPixel(pixelId: string) {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const f = window as any;
  if (f.fbq) return;
  const n = function (...args: unknown[]) {
    n.callMethod ? n.callMethod(...args) : n.queue.push(args);
  } as any;
  n.queue = [];
  n.loaded = true;
  n.version = "2.0";
  window.fbq = n;
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
  window.fbq("init", pixelId);
  window.fbq("track", "PageView");
}

/**
 * Initializes attribution capture, optional GTM + Meta Pixel, and SPA page views.
 */
export function AnalyticsBootstrap() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    captureAttribution();
    const { enabled, gtmId, metaPixelId, hasGtm, hasMeta } = getAnalyticsConfig();
    if (!enabled) return;
    if (hasGtm) injectGtm(gtmId);
    if (hasMeta) injectMetaPixel(metaPixelId);
  }, []);

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  return null;
}
