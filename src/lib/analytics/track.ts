import { readAttribution, type AttributionSnapshot } from "./attribution";
import { getAnalyticsConfig } from "./config";
import { ANALYTICS_EVENTS, type AnalyticsEventName } from "./events";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
  }
}

export type TrackParams = Record<string, string | number | boolean | null | undefined>;

function pushDataLayer(event: AnalyticsEventName, params: TrackParams, attribution: AttributionSnapshot) {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event,
    ...attribution,
    ...params,
    event_timestamp: new Date().toISOString(),
  });
}

function pushMeta(event: AnalyticsEventName, params: TrackParams) {
  if (typeof window.fbq !== "function") return;

  switch (event) {
    case ANALYTICS_EVENTS.quizStarted:
      window.fbq("track", "Lead", params);
      break;
    case ANALYTICS_EVENTS.checkoutStarted:
      window.fbq("track", "InitiateCheckout", params);
      break;
    case ANALYTICS_EVENTS.purchase:
      window.fbq("track", "Purchase", params);
      break;
    default:
      window.fbq("trackCustom", event, params);
  }
}

/** Fire-and-forget server log for demo funnels (optional). */
function pushServerEvent(event: AnalyticsEventName, params: TrackParams, attribution: AttributionSnapshot) {
  if (typeof fetch === "undefined") return;
  void fetch("/api/funnel/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, params, attribution }),
    keepalive: true,
  }).catch(() => {
    /* non-blocking */
  });
}

export function trackEvent(event: AnalyticsEventName, params: TrackParams = {}) {
  if (typeof window === "undefined") return;

  const { enabled } = getAnalyticsConfig();
  if (!enabled) return;

  const attribution = readAttribution();
  pushDataLayer(event, params, attribution);
  pushMeta(event, params);
  pushServerEvent(event, params, attribution);
}

export function trackPageView(path: string, title?: string) {
  trackEvent(ANALYTICS_EVENTS.pageView, {
    page_path: path,
    page_title: title ?? document.title,
  });
}
