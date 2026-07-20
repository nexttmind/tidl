/** Funnel event names — also used as GTM dataLayer `event` values. */

export const ANALYTICS_EVENTS = {
  pageView: "page_view",
  quizStarted: "quiz_started",
  quizStep: "quiz_step",
  quizCompleted: "quiz_completed",
  checkoutStarted: "checkout_started",
  checkoutSubmitted: "checkout_submitted",
  purchase: "purchase",
  checkoutFailed: "checkout_failed",
} as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];
