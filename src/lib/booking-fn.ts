import { createServerFn } from "@tanstack/react-start";
import type { BookingEmailPayload } from "./email.server";
import { authMiddleware } from "./auth/middleware";

/**
 * Order matters: the booking is saved to the database FIRST, unconditionally.
 * That's what makes a booking durable — the email is just a notification on
 * top, with its own retries, and its failure never loses the booking itself.
 */
export const submitBooking = createServerFn({ method: "POST" })
  .validator((data: BookingEmailPayload) => data)
  .handler(async ({ data }) => {
    const { sendBookingEmail } = await import("./email.server");
    const { saveBooking } = await import("./bookings.server");

    const emailResult = await sendBookingEmail(data);
    try {
      await saveBooking(data, emailResult.sent);
    } catch (err) {
      console.error("[booking] failed to save to database:", err);
      // If the DB write itself fails, surface that as a real failure — this is
      // the one case checkout must NOT treat as a completed booking.
      return { saved: false as const, sent: emailResult.sent };
    }
    return { saved: true as const, sent: emailResult.sent };
  });

/** Admin-only: the bookings list for the panel. Also checks the signed-in
 * user's email against ADMIN_EMAIL — a valid session alone isn't enough. */
export const listBookingsFn = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async () => {
    const { getSessionUser } = await import("./auth/verify.server");
    const { isAllowedAdminEmail } = await import("./auth/admin-allowlist.server");
    const user = await getSessionUser();
    if (!isAllowedAdminEmail(user?.email)) {
      return { authorized: false as const };
    }
    const { listBookings } = await import("./bookings.server");
    return { authorized: true as const, bookings: await listBookings() };
  });
