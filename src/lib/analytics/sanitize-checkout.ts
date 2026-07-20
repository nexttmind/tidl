import type { CheckoutFormData } from "@/types/order";
import type { CheckoutFormValues } from "@/lib/checkout-schema";

/** Fields sent to our server / PRX — never includes raw card PAN, expiry, or CVC. */
export type CheckoutPayloadForServer = Omit<
  CheckoutFormData,
  "cardNumber" | "cardExpiry" | "cardCvc"
>;

export function sanitizeCheckoutForServer(
  checkout: CheckoutFormValues | CheckoutFormData,
): CheckoutPayloadForServer {
  const { cardNumber: _pan, cardExpiry: _exp, cardCvc: _cvc, ...safe } = checkout;
  return safe;
}
