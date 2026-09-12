import { MercadoPagoConfig, Payment } from "mercadopago";

function client() {
  const token = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!token) return null;
  return new Payment(new MercadoPagoConfig({ accessToken: token }));
}

/**
 * MercadoPago Mexico charges in MXN regardless of how the site displays
 * prices (USD). Fetches a live rate so this doesn't quietly drift out of
 * date; falls back to a recent approximate rate only if the lookup fails,
 * so a payment is never blocked by an exchange-rate API being down.
 */
async function usdToMxn(amountUsd: number): Promise<number> {
  const FALLBACK_RATE = 17;
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    if (!res.ok) throw new Error(`rate lookup failed: ${res.status}`);
    const data = (await res.json()) as { rates?: Record<string, number> };
    const rate = data.rates?.MXN;
    if (!rate || rate <= 0) throw new Error("no MXN rate in response");
    return Math.round(amountUsd * rate * 100) / 100;
  } catch (err) {
    console.error("[mercadopago] live exchange rate lookup failed, using fallback:", err);
    return Math.round(amountUsd * FALLBACK_RATE * 100) / 100;
  }
}

/**
 * Creates a real SPEI transfer request. MercadoPago returns a dynamic CLABE
 * (via transaction_details) the customer transfers to from their own bank
 * app — no manual WhatsApp receipt needed. Status starts "pending" and
 * MercadoPago notifies our webhook once the transfer actually arrives.
 */
export async function createSpeiPayment(input: {
  amountUsd: number;
  bookingId: string;
  guestEmail: string;
  guestName: string;
}) {
  const payment = client();
  if (!payment) return { ok: false as const, reason: "missing_token" as const };

  const [firstName, ...rest] = input.guestName.trim().split(" ");
  const amountMxn = await usdToMxn(input.amountUsd);

  try {
    const result = await payment.create({
      body: {
        transaction_amount: amountMxn,
        description: `Cuntours ${input.bookingId} — depósito`,
        payment_method_id: "clabe",
        external_reference: input.bookingId,
        notification_url: `${process.env.BETTER_AUTH_URL ?? ""}/api/mercadopago-webhook`,
        payer: {
          entity_type: "individual",
          email: input.guestEmail,
          first_name: firstName || "Cliente",
          last_name: rest.join(" ") || "Cuntours",
        },
      },
    });

    return {
      ok: true as const,
      paymentId: String(result.id),
      status: result.status,
      amountMxn,
      ticketUrl: result.transaction_details?.external_resource_url ?? null,
      financialInstitution: result.transaction_details?.financial_institution ?? null,
      reference: result.transaction_details?.bank_transfer_id ?? result.transaction_details?.verification_code ?? null,
    };
  } catch (err) {
    console.error("[mercadopago] createSpeiPayment failed:", err);
    return { ok: false as const, reason: "mp_error" as const };
  }
}

/** Re-fetches a payment directly from MercadoPago — the authoritative check
 * before trusting any webhook notification. */
export async function getPaymentStatus(paymentId: string) {
  const payment = client();
  if (!payment) return null;
  try {
    const result = await payment.get({ id: paymentId });
    return { status: result.status, externalReference: result.external_reference ?? null };
  } catch (err) {
    console.error("[mercadopago] getPaymentStatus failed:", err);
    return null;
  }
}
