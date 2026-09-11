/**
 * Second layer of protection beyond the setup-code-gated signup: even a
 * signed-in account only sees the bookings table if its email matches
 * ADMIN_EMAIL exactly. No ADMIN_EMAIL configured = nobody gets in (fail closed).
 * Supports a comma-separated list if you ever want more than one admin.
 */
export function isAllowedAdminEmail(email: string | null | undefined): boolean {
  const raw = process.env.ADMIN_EMAIL;
  if (!raw || !email) return false;
  const allowed = raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return allowed.includes(email.toLowerCase());
}
