const STORAGE_KEY = "tidl-attribution-v1";

const TRACKED_QUERY_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "msclkid",
] as const;

export type AttributionSnapshot = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  msclkid?: string;
  referrer?: string;
  landing_path?: string;
  captured_at: string;
};

function readFromUrl(search: string): Partial<AttributionSnapshot> {
  const params = new URLSearchParams(search);
  const out: Partial<AttributionSnapshot> = {};
  for (const key of TRACKED_QUERY_KEYS) {
    const value = params.get(key)?.trim();
    if (value) out[key] = value;
  }
  return out;
}

/** Capture UTMs + referrer once per session (first touch in tab). */
export function captureAttribution(): AttributionSnapshot {
  if (typeof window === "undefined") {
    return { captured_at: new Date().toISOString() };
  }

  try {
    const existing = sessionStorage.getItem(STORAGE_KEY);
    if (existing) return JSON.parse(existing) as AttributionSnapshot;
  } catch {
    /* ignore corrupt storage */
  }

  const fromUrl = readFromUrl(window.location.search);
  const referrer = document.referrer?.trim() || undefined;
  const snapshot: AttributionSnapshot = {
    ...fromUrl,
    referrer: referrer && !referrer.includes(window.location.host) ? referrer : undefined,
    landing_path: `${window.location.pathname}${window.location.search}`,
    captured_at: new Date().toISOString(),
  };

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    /* quota / private mode */
  }

  return snapshot;
}

export function readAttribution(): AttributionSnapshot {
  if (typeof window === "undefined") {
    return { captured_at: new Date().toISOString() };
  }
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as AttributionSnapshot;
  } catch {
    /* ignore */
  }
  return captureAttribution();
}
