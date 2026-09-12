/**
 * Flat discount codes — no expiration, no per-tour restriction, no usage
 * limit. Simple by design; add more here anytime without touching checkout.
 * Codes are matched case-insensitively.
 */
export const discountCodes: Record<string, number> = {
  CUN10: 0.1,
  CUN15: 0.15,
  CUN20: 0.2,
  CUN50: 0.5,
};

export function lookupDiscount(code: string): number | null {
  const pct = discountCodes[code.trim().toUpperCase()];
  return pct ?? null;
}
