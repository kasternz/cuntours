import { createServerFn } from "@tanstack/react-start";
import type { BookingEmailPayload } from "./email.server";

export const submitBooking = createServerFn({ method: "POST" })
  .validator((data: BookingEmailPayload) => data)
  .handler(async ({ data }) => {
    const { sendBookingEmail } = await import("./email.server");
    return sendBookingEmail(data);
  });
