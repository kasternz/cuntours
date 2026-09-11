/**
 * Where booking notifications land. Update this if the sales inbox changes —
 * nothing else in the codebase needs to change.
 */
export const bookingNotifications = {
  to: "ventas@cuntours.com",
  // Resend requires a verified sending domain to send "from" your own
  // address. Until cuntours.com is verified in Resend, this falls back to
  // Resend's shared test sender so booking emails work immediately.
  // Once verified, change this to e.g. "Cuntours <reservas@cuntours.com>".
  from: "Cuntours Reservas <onboarding@resend.dev>",
  // Business WhatsApp number, digits only with country code, no "+" or
  // spaces (wa.me format). Shown as a fallback if the email notification
  // fails, so a paid booking never silently goes unnoticed.
  whatsapp: "529843221219",
};
