/** Client-side analytics IDs — safe to expose via VITE_* (no secrets). */

export function getAnalyticsConfig() {
  const gtmId = import.meta.env.VITE_GTM_ID?.trim() ?? "";
  const metaPixelId = import.meta.env.VITE_META_PIXEL_ID?.trim() ?? "";
  const debug = import.meta.env.VITE_ANALYTICS_DEBUG === "true";

  return {
    gtmId,
    metaPixelId,
    /** Load tags in production, or when debug flag is on in dev. */
    enabled: import.meta.env.PROD || debug,
    hasGtm: gtmId.length > 0,
    hasMeta: metaPixelId.length > 0,
  };
}
