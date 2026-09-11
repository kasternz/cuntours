import { createServerFn } from "@tanstack/react-start";

export const createPaymentIntent = createServerFn({ method: "POST" })
  .validator((data: { amountUsd: number; bookingId: string; tourName: string; guestEmail: string }) => data)
  .handler(async ({ data }) => {
    const { createBookingPaymentIntent } = await import("./stripe.server");
    return createBookingPaymentIntent(data);
  });

export const verifyPaymentIntent = createServerFn({ method: "POST" })
  .validator((data: { paymentIntentId: string }) => data)
  .handler(async ({ data }) => {
    const { verifyBookingPayment } = await import("./stripe.server");
    return verifyBookingPayment(data.paymentIntentId);
  });
