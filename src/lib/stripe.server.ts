import Stripe from "stripe";

let cached: Stripe | null = null;

function stripeClient() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!cached) cached = new Stripe(key);
  return cached;
}

/**
 * Creates a PaymentIntent for a booking total and returns the client secret
 * the browser needs to confirm payment via Stripe's Payment Element. Server-only.
 */
export async function createBookingPaymentIntent(input: {
  amountUsd: number;
  bookingId: string;
  tourName: string;
  guestEmail: string;
}) {
  const stripe = stripeClient();
  if (!stripe) {
    return { ok: false as const, reason: "missing_api_key" as const };
  }
  try {
    const intent = await stripe.paymentIntents.create({
      amount: Math.round(input.amountUsd * 100),
      currency: "usd",
      receipt_email: input.guestEmail || undefined,
      description: `Cuntours ${input.bookingId} — ${input.tourName}`,
      metadata: { bookingId: input.bookingId, tourName: input.tourName },
      automatic_payment_methods: { enabled: true },
    });
    return { ok: true as const, clientSecret: intent.client_secret!, paymentIntentId: intent.id };
  } catch (err) {
    console.error("[stripe] createBookingPaymentIntent failed:", err);
    return { ok: false as const, reason: "stripe_error" as const };
  }
}

/** Confirms a PaymentIntent actually succeeded before we trust the booking. Server-only. */
export async function verifyBookingPayment(paymentIntentId: string) {
  const stripe = stripeClient();
  if (!stripe) return { ok: false as const, reason: "missing_api_key" as const };
  try {
    const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return { ok: intent.status === "succeeded", status: intent.status };
  } catch (err) {
    console.error("[stripe] verifyBookingPayment failed:", err);
    return { ok: false as const, reason: "stripe_error" as const };
  }
}
