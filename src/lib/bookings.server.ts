import { getSql } from "./db";
import type { BookingEmailPayload } from "./email.server";

export type BookingRow = BookingEmailPayload & {
  emailSent: boolean;
  createdAt: string;
  paymentStatus: "pending" | "confirmed";
  paymentNote?: string;
};

/** Writes a booking to the database. Called BEFORE the notification email is
 * attempted — this is what makes a booking durable even if email fails. */
export async function saveBooking(payload: BookingEmailPayload, emailSent: boolean) {
  const sql = await getSql();
  await sql`
    insert into bookings (
      id, tour_slug, tour_name, date, adults, children, tour_type, pickup,
      pickup_time, dietary, mobility, notes, guest_name, guest_email,
      guest_phone, pay_at_pickup, payment_intent_id, total, email_sent,
      payment_method, deposit_amount, balance_due, discount_code, discount_pct,
      mercadopago_payment_id, payment_status
    ) values (
      ${payload.bookingId}, ${payload.tourSlug}, ${payload.tourName}, ${payload.date},
      ${payload.adults}, ${payload.children}, ${payload.tourType}, ${payload.pickup},
      ${payload.pickupTime}, ${payload.dietary}, ${payload.mobility}, ${payload.notes},
      ${payload.guestName}, ${payload.guestEmail}, ${payload.guestPhone},
      false, ${payload.paymentIntentId ?? null}, ${payload.total}, ${emailSent},
      ${payload.paymentMethod}, ${payload.depositAmount ?? null}, ${payload.balanceDue ?? null},
      ${payload.discountCode ?? null}, ${payload.discountPct ?? null},
      ${payload.mercadopagoPaymentId ?? null},
      ${payload.paymentMethod === "deposit_transfer" ? "pending" : "confirmed"}
    )
    on conflict (id) do nothing
  `;
}

/** Marks a booking's email as sent after a delayed/retry success. */
export async function markBookingEmailSent(bookingId: string) {
  const sql = await getSql();
  await sql`update bookings set email_sent = true where id = ${bookingId}`;
}

/** Called from the MercadoPago webhook once a SPEI transfer is confirmed
 * authoritative (re-fetched from MercadoPago's API, never trusted from the
 * webhook body alone). Returns the booking's tour name for the follow-up
 * email, or null if no matching pending booking was found. */
export async function confirmTransferPayment(
  mercadopagoPaymentId: string,
): Promise<{ bookingId: string; tourName: string; guestEmail: string; guestName: string; depositAmount: number } | null> {
  const sql = await getSql();
  const rows = await sql<{
    id: string;
    tour_name: string;
    guest_email: string;
    guest_name: string;
    deposit_amount: string | null;
  }>`
    update bookings
    set payment_status = 'confirmed'
    where mercadopago_payment_id = ${mercadopagoPaymentId} and payment_status = 'pending'
    returning id, tour_name, guest_email, guest_name, deposit_amount
  `;
  const row = rows[0];
  return row
    ? {
        bookingId: row.id,
        tourName: row.tour_name,
        guestEmail: row.guest_email,
        guestName: row.guest_name,
        depositAmount: row.deposit_amount ? Number(row.deposit_amount) : 0,
      }
    : null;
}

/** Admin-only manual override: mark a still-pending booking as paid, e.g.
 * when a transfer was confirmed by phone/bank statement instead of the
 * automatic webhook. Only touches rows that are actually still pending. */
export async function manuallyConfirmPayment(bookingId: string, note: string) {
  const sql = await getSql();
  const rows = await sql<{
    id: string;
    tour_name: string;
    guest_email: string;
    guest_name: string;
    deposit_amount: string | null;
  }>`
    update bookings
    set payment_status = 'confirmed', payment_note = ${note || null}
    where id = ${bookingId} and payment_status = 'pending'
    returning id, tour_name, guest_email, guest_name, deposit_amount
  `;
  const row = rows[0];
  return row
    ? {
        bookingId: row.id,
        tourName: row.tour_name,
        guestEmail: row.guest_email,
        guestName: row.guest_name,
        depositAmount: row.deposit_amount ? Number(row.deposit_amount) : 0,
      }
    : null;
}

/** Most recent bookings first, for the admin panel. Requires an authenticated caller. */
export async function listBookings(limit = 100): Promise<BookingRow[]> {
  const sql = await getSql();
  const rows = await sql<{
    id: string;
    tour_slug: string;
    tour_name: string;
    date: string;
    adults: number;
    children: number;
    tour_type: "compartido" | "privado";
    pickup: string;
    pickup_time: string;
    dietary: string;
    mobility: string;
    notes: string;
    guest_name: string;
    guest_email: string;
    guest_phone: string;
    payment_intent_id: string | null;
    total: number;
    email_sent: boolean;
    created_at: string;
    payment_method: "deposit_transfer" | "deposit_card" | "full_card";
    deposit_amount: string | null;
    balance_due: string | null;
    discount_code: string | null;
    discount_pct: string | null;
    mercadopago_payment_id: string | null;
    payment_status: string;
    payment_note: string | null;
  }>`select * from bookings order by created_at desc limit ${limit}`;

  return rows.map((r) => ({
    bookingId: r.id,
    tourSlug: r.tour_slug,
    tourName: r.tour_name,
    date: r.date,
    adults: r.adults,
    children: r.children,
    tourType: r.tour_type,
    pickup: r.pickup,
    pickupTime: r.pickup_time,
    dietary: r.dietary,
    mobility: r.mobility,
    notes: r.notes,
    guestName: r.guest_name,
    guestEmail: r.guest_email,
    guestPhone: r.guest_phone,
    paymentMethod: r.payment_method,
    depositAmount: r.deposit_amount ? Number(r.deposit_amount) : undefined,
    balanceDue: r.balance_due ? Number(r.balance_due) : undefined,
    discountCode: r.discount_code ?? undefined,
    discountPct: r.discount_pct ? Number(r.discount_pct) : undefined,
    mercadopagoPaymentId: r.mercadopago_payment_id ?? undefined,
    paymentStatus: r.payment_status as "pending" | "confirmed",
    paymentNote: r.payment_note ?? undefined,
    paymentIntentId: r.payment_intent_id ?? undefined,
    total: Number(r.total),
    emailSent: r.email_sent,
    createdAt: r.created_at,
  }));
}
