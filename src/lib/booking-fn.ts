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
    const { sendBookingEmail, sendCustomerReceiptEmail } = await import("./email.server");
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

    // Card payments are approved synchronously (Stripe/MercadoPago already
    // confirmed before this ran) — send the customer their receipt right
    // away. SPEI transfers get theirs later, from the webhook, once the
    // money actually arrives.
    if (data.paymentMethod !== "deposit_transfer") {
      void sendCustomerReceiptEmail({
        bookingId: data.bookingId,
        tourName: data.tourName,
        guestEmail: data.guestEmail,
        guestName: data.guestName,
        amountPaid: data.paymentMethod === "deposit_card" ? (data.depositAmount ?? data.total) : data.total,
      });
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

/** Admin-only: manually mark a still-pending booking as paid (e.g. confirmed
 * by phone or bank statement instead of the automatic webhook), and send the
 * same receipt the automatic path would have sent. */
export const adminMarkPaidFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { bookingId: string; note: string }) => data)
  .handler(async ({ data }) => {
    const { getSessionUser } = await import("./auth/verify.server");
    const { isAllowedAdminEmail } = await import("./auth/admin-allowlist.server");
    const user = await getSessionUser();
    if (!isAllowedAdminEmail(user?.email)) {
      return { ok: false as const, reason: "not_authorized" as const };
    }
    const { manuallyConfirmPayment } = await import("./bookings.server");
    const confirmed = await manuallyConfirmPayment(data.bookingId, data.note);
    if (!confirmed) {
      return { ok: false as const, reason: "not_found_or_already_paid" as const };
    }
    const { sendCustomerReceiptEmail } = await import("./email.server");
    void sendCustomerReceiptEmail({
      bookingId: confirmed.bookingId,
      tourName: confirmed.tourName,
      guestEmail: confirmed.guestEmail,
      guestName: confirmed.guestName,
      amountPaid: confirmed.depositAmount,
    });
    return { ok: true as const };
  });
