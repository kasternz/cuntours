/**
 * Flat discount codes — no expiration, no per-tour restriction, no usage
 * limit. Simple by design; add more here anytime without touching checkout.
 * Codes are matched case-insensitively.
 */
export const discountCodes: Record<string, number> = {
  CUNT10X7Q: 0.1,
  CUNT15M4R: 0.15,
  CUNT20K9Z: 0.2,
  CUNT50V2P: 0.5,
};

export function lookupDiscount(code: string): number | null {
  const pct = discountCodes[code.trim().toUpperCase()];
  return pct ?? null;
}
