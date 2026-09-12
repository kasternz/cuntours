import { createServerFn } from "@tanstack/react-start";

export const createSpeiPaymentFn = createServerFn({ method: "POST" })
  .validator((data: { amountUsd: number; bookingId: string; guestEmail: string; guestName: string }) => data)
  .handler(async ({ data }) => {
    const { createSpeiPayment } = await import("./mercadopago.server");
    return createSpeiPayment(data);
  });
