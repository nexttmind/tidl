import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Verify a PrescribeRx webhook delivery.
 *
 * Every delivery carries `X-PrescribeRx-Signature: sha256=<hex>` where <hex> is
 * the lowercase HMAC-SHA256 of the *raw* request body keyed by the subscription
 * signing secret. We must hash the raw bytes (not re-serialized JSON) and strip
 * the `sha256=` prefix before comparing. See Webhooks guide.
 */
export function verifyPrxWebhookSignature(
  rawBody: string,
  signatureHeader: string | null,
  secret: string,
): boolean {
  if (!signatureHeader || !secret) return false;

  const provided = signatureHeader.startsWith("sha256=")
    ? signatureHeader.slice(7)
    : signatureHeader;

  const expected = createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");

  // Length guard — timingSafeEqual throws on mismatched lengths.
  if (provided.length !== expected.length) return false;

  try {
    return timingSafeEqual(Buffer.from(provided, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}
