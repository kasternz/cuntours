/**
 * Receives MercadoPago's payment notifications. Never trusts the webhook
 * body for the actual status — always re-fetches the payment from
 * MercadoPago's own API first, since that's the only authoritative source.
 * This is what turns a SPEI deposit into "confirmed" without anyone at
 * Cuntours having to check a bank statement.
 */
interface WebhookEvent {
  url: URL;
  req: Request;
}

export default async function mercadopagoWebhookMiddleware(
  event: WebhookEvent,
  next: () => unknown | Promise<unknown>,
): Promise<unknown> {
  if (event.url.pathname !== "/api/mercadopago-webhook") return next();

  try {
    const body = (await event.req.json().catch(() => null)) as { data?: { id?: string } } | null;
    const paymentId = body?.data?.id ?? event.url.searchParams.get("id") ?? event.url.searchParams.get("data.id");

    if (!paymentId) {
      return new Response("ignored", { status: 200 });
    }

    const { getPaymentStatus } = await import("../../src/lib/mercadopago.server");
    const status = await getPaymentStatus(String(paymentId));

    if (status?.status === "approved" && status.externalReference) {
      const { confirmTransferPayment } = await import("../../src/lib/bookings.server");
      const confirmed = await confirmTransferPayment(String(paymentId));
      if (confirmed) {
        const { sendDepositConfirmedEmail, sendCustomerReceiptEmail } = await import(
          "../../src/lib/email.server"
        );
        await sendDepositConfirmedEmail(confirmed.bookingId, confirmed.tourName);
        await sendCustomerReceiptEmail({
          bookingId: confirmed.bookingId,
          tourName: confirmed.tourName,
          guestEmail: confirmed.guestEmail,
          guestName: confirmed.guestName,
          amountPaid: confirmed.depositAmount,
        });
      }
    }

    return new Response("ok", { status: 200 });
  } catch (err) {
    console.error("[mercadopago-webhook] failed:", err);
    // Always 200 — MercadoPago retries aggressively on non-200, and a bug on
    // our side shouldn't cause a retry storm. Errors are logged above.
    return new Response("error", { status: 200 });
  }
}
