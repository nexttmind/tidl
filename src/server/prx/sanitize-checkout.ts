/** Strip card PAN / CVC before PRX unified intake (server-side defense in depth). */

export function stripSensitiveCheckoutFields<
  T extends { cardNumber?: string; cardExpiry?: string; cardCvc?: string },
>(checkout: T): Omit<T, "cardNumber" | "cardExpiry" | "cardCvc"> {
  const { cardNumber: _pan, cardExpiry: _exp, cardCvc: _cvc, ...safe } = checkout;
  return safe;
}
