import { getSql } from "./db";
import type { BookingEmailPayload } from "./email.server";

export type BookingRow = BookingEmailPayload & {
  emailSent: boolean;
  createdAt: string;
};

/** Writes a booking to the database. Called BEFORE the notification email is
 * attempted — this is what makes a booking durable even if email fails. */
export async function saveBooking(payload: BookingEmailPayload, emailSent: boolean) {
  const sql = await getSql();
  await sql`
    insert into bookings (
      id, tour_slug, tour_name, date, adults, children, tour_type, pickup,
      pickup_time, dietary, mobility, notes, guest_name, guest_email,
      guest_phone, pay_at_pickup, payment_intent_id, total, email_sent
    ) values (
      ${payload.bookingId}, ${payload.tourSlug}, ${payload.tourName}, ${payload.date},
      ${payload.adults}, ${payload.children}, ${payload.tourType}, ${payload.pickup},
      ${payload.pickupTime}, ${payload.dietary}, ${payload.mobility}, ${payload.notes},
      ${payload.guestName}, ${payload.guestEmail}, ${payload.guestPhone},
      ${payload.payAtPickup}, ${payload.paymentIntentId ?? null}, ${payload.total}, ${emailSent}
    )
    on conflict (id) do nothing
  `;
}

/** Marks a booking's email as sent after a delayed/retry success. */
export async function markBookingEmailSent(bookingId: string) {
  const sql = await getSql();
  await sql`update bookings set email_sent = true where id = ${bookingId}`;
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
    pay_at_pickup: boolean;
    payment_intent_id: string | null;
    total: number;
    email_sent: boolean;
    created_at: string;
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
    payAtPickup: r.pay_at_pickup,
    paymentIntentId: r.payment_intent_id ?? undefined,
    total: Number(r.total),
    emailSent: r.email_sent,
    createdAt: r.created_at,
  }));
}
