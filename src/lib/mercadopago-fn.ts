import { createServerFn } from "@tanstack/react-start";

export const createSpeiPaymentFn = createServerFn({ method: "POST" })
  .validator((data: { amountUsd: number; bookingId: string; guestEmail: string; guestName: string }) => data)
  .handler(async ({ data }) => {
    const { createSpeiPayment } = await import("./mercadopago.server");
    return createSpeiPayment(data);
  });

export const createCardPaymentFn = createServerFn({ method: "POST" })
  .validator(
    (data: {
      amountUsd: number;
      bookingId: string;
      guestEmail: string;
      token: string;
      paymentMethodId: string;
      issuerId: string;
      installments: number;
    }) => data,
  )
  .handler(async ({ data }) => {
    const { createCardPayment } = await import("./mercadopago.server");
    return createCardPayment(data);
  });
