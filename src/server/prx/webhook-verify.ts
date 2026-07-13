import { createHmac, timingSafeEqual } from "node:crypto";

/** Header names PRX (or a proxy) may use to carry the signature. */
export const PRX_SIGNATURE_HEADERS = [
  "X-PrescribeRx-Signature",
  "x-prescriberx-signature",
  "x-prx-signature",
  "x-hub-signature-256",
] as const;

/** Constant-time string compare that tolerates unequal lengths. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(Buffer.from(a), Buffer.from(b));
  } catch {
    return false;
  }
}

/**
 * Verify a PrescribeRx webhook delivery.
 *
 * The signature header carries an HMAC-SHA256 of the *raw* request body keyed by
 * the subscription signing secret, optionally prefixed with `sha256=`. We hash
 * the raw bytes (not re-serialized JSON) and accept either the hex or base64
 * encoding of the digest, since PRX/proxies differ on which they send.
 */
export function verifyPrxWebhookSignature(
  rawBody: string,
  signatureHeader: string | null,
  secret: string,
): boolean {
  if (!signatureHeader || !secret) return false;

  const provided = signatureHeader.replace(/^sha256=/i, "").trim();
  const digest = createHmac("sha256", secret).update(rawBody, "utf8").digest();

  return safeEqual(provided, digest.toString("hex")) || safeEqual(provided, digest.toString("base64"));
}

/** Pick the signature from whichever supported header a delivery used. */
export function readPrxSignatureHeader(headers: Headers): string | null {
  for (const name of PRX_SIGNATURE_HEADERS) {
    const value = headers.get(name);
    if (value) return value;
  }
  return null;
}
