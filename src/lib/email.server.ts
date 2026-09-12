import { Resend } from "resend";
import { bookingNotifications } from "./notifications";

/** The real "ticket" the customer keeps — sent once payment is confirmed
 * (immediately for card, or from the webhook/manual button for SPEI).
 * Everything they need for the day of the tour, in their own language. */
export async function sendCustomerReceiptEmail(input: {
  bookingId: string;
  tourName: string;
  guestEmail: string;
  guestName: string;
  date: string;
  adults: number;
  children: number;
  tourType: "compartido" | "privado";
  pickup: string;
  pickupTime: string;
  total: number;
  depositAmount?: number;
  balanceDue?: number;
  lang?: "es" | "en";
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !input.guestEmail) return;
  const resend = new Resend(apiKey);
  const es = input.lang !== "en";

  const people = input.children
    ? es
      ? `${input.adults} adultos, ${input.children} niños`
      : `${input.adults} adults, ${input.children} children`
    : es
      ? `${input.adults} adultos`
      : `${input.adults} adults`;

  const paymentLine = input.balanceDue
    ? es
      ? `Depósito pagado: $${input.depositAmount} USD — Saldo a pagar en el tour: $${input.balanceDue} USD`
      : `Deposit paid: $${input.depositAmount} USD — Balance due at the tour: $${input.balanceDue} USD`
    : es
      ? `Pagado completo: $${input.total} USD`
      : `Paid in full: $${input.total} USD`;

  const rows: [string, string][] = [
    [es ? "Folio" : "Confirmation code", input.bookingId],
    [es ? "Tour" : "Tour", input.tourName],
    [es ? "Fecha" : "Date", input.date],
    [es ? "Viajeros" : "Travelers", people],
    [es ? "Tipo" : "Type", input.tourType === "privado" ? (es ? "Privado" : "Private") : es ? "Compartido" : "Shared"],
    [es ? "Recogida" : "Pickup", input.pickup],
    [es ? "Hora de recogida" : "Pickup time", input.pickupTime || (es ? "Por confirmar" : "To be confirmed")],
    [es ? "Pago" : "Payment", paymentLine],
  ];

  const subject = es
    ? `Tu boleto — ${input.bookingId} — ${input.tourName}`
    : `Your ticket — ${input.bookingId} — ${input.tourName}`;

  const greeting = es
    ? `Hola ${input.guestName}, tu reserva está confirmada. Guarda este correo — es tu boleto para el tour.`
    : `Hi ${input.guestName}, your booking is confirmed. Keep this email — it's your ticket for the tour.`;

  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#5b6b70;font-size:13px;white-space:nowrap;">${label}</td><td style="padding:6px 0;font-size:14px;color:#132026;font-weight:500;">${value}</td></tr>`,
    )
    .join("");

  const html = `<div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;">
    <h2 style="color:#0D6E6A;">${es ? "Tu boleto" : "Your ticket"}</h2>
    <p style="color:#132026;font-size:14px;">${greeting}</p>
    <table style="border-collapse:collapse;width:100%;margin-top:12px;">${htmlRows}</table>
  </div>`;

  const text = [greeting, "", ...rows.map(([label, value]) => `${label}: ${value}`)].join("\n");

  try {
    await resend.emails.send({
      from: bookingNotifications.from,
      to: input.guestEmail,
      subject,
      html,
      text,
    });
  } catch (err) {
    console.error("[email] sendCustomerReceiptEmail failed:", err);
  }
}

/** Sent when MercadoPago's webhook confirms a pending SPEI transfer arrived. */
export async function sendDepositConfirmedEmail(bookingId: string, tourName: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;
  const resend = new Resend(apiKey);
  try {
    await resend.emails.send({
      from: bookingNotifications.from,
      to: bookingNotifications.to,
      subject: `Depósito confirmado — ${bookingId} — ${tourName}`,
      html: `<p>El depósito por transferencia SPEI de la reserva <strong>${bookingId}</strong> (${tourName}) ya llegó — confirmado automáticamente por MercadoPago.</p>`,
      text: `El depósito por transferencia SPEI de la reserva ${bookingId} (${tourName}) ya llegó — confirmado automáticamente por MercadoPago.`,
    });
  } catch (err) {
    console.error("[email] sendDepositConfirmedEmail failed:", err);
  }
}

export type BookingEmailPayload = {
  bookingId: string;
  tourSlug: string;
  tourName: string;
  date: string;
  adults: number;
  children: number;
  tourType: "compartido" | "privado";
  pickup: string;
  pickupTime: string;
  dietary: string;
  mobility: string;
  notes: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  paymentMethod: "deposit_transfer" | "deposit_card" | "full_card";
  depositAmount?: number;
  balanceDue?: number;
  discountCode?: string;
  discountPct?: number;
  paymentIntentId?: string;
  mercadopagoPaymentId?: string;
  lang?: "es" | "en";
  total: number;
};

function paymentLabel(b: BookingEmailPayload) {
  const cardRef = b.paymentIntentId
    ? `Stripe: ${b.paymentIntentId}`
    : b.mercadopagoPaymentId
      ? `MercadoPago: ${b.mercadopagoPaymentId}`
      : "—";
  if (b.paymentMethod === "full_card") {
    return `Pago completo con tarjeta (${cardRef})`;
  }
  if (b.paymentMethod === "deposit_card") {
    return `Depósito 20% con tarjeta — $${b.depositAmount} USD pagado (${cardRef}), saldo $${b.balanceDue} USD pendiente`;
  }
  return `Depósito 20% por transferencia SPEI — $${b.depositAmount} USD (MercadoPago: ${b.mercadopagoPaymentId ?? "—"}, se confirma solo cuando llegue la transferencia), saldo $${b.balanceDue} USD pendiente`;
}

function row(label: string, value: string) {
  if (!value) return "";
  return `<tr><td style="padding:4px 12px 4px 0;color:#5b6b70;font-size:13px;white-space:nowrap;">${label}</td><td style="padding:4px 0;font-size:14px;color:#132026;">${value}</td></tr>`;
}

function buildHtml(b: BookingEmailPayload) {
  const people =
    b.children > 0 ? `${b.adults} adultos, ${b.children} niños` : `${b.adults} adultos`;
  const rows = [
    row("Folio", b.bookingId),
    row("Tour", b.tourName),
    row("Fecha", b.date),
    row("Personas", people),
    row("Tipo", b.tourType === "privado" ? "Tour privado" : "Tour compartido"),
    row("Recogida", b.pickup),
    row("Hora preferida", b.pickupTime),
    row("Restricción alimenticia", b.dietary),
    row("Movilidad especial", b.mobility),
    row("Notas", b.notes),
    row("Nombre", b.guestName),
    row("Teléfono", b.guestPhone),
    row("Correo", b.guestEmail),
    row("Pago", paymentLabel(b)),
    row("Descuento", b.discountCode ? `${b.discountCode} (-${Math.round((b.discountPct ?? 0) * 100)}%)` : ""),
    row("Total", `$${b.total} USD`),
  ].join("");

  return `<div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;">
    <h2 style="color:#0D6E6A;">Nueva reserva — ${b.bookingId}</h2>
    <table style="border-collapse:collapse;width:100%;">${rows}</table>
  </div>`;
}

function buildText(b: BookingEmailPayload) {
  const people =
    b.children > 0 ? `${b.adults} adultos, ${b.children} niños` : `${b.adults} adultos`;
  return [
    `Nueva reserva — ${b.bookingId}`,
    `Tour: ${b.tourName}`,
    `Fecha: ${b.date}`,
    `Personas: ${people}`,
    `Tipo: ${b.tourType === "privado" ? "Tour privado" : "Tour compartido"}`,
    `Recogida: ${b.pickup}`,
    b.pickupTime ? `Hora preferida: ${b.pickupTime}` : "",
    b.dietary ? `Restricción alimenticia: ${b.dietary}` : "",
    b.mobility ? `Movilidad especial: ${b.mobility}` : "",
    b.notes ? `Notas: ${b.notes}` : "",
    `Nombre: ${b.guestName}`,
    `Teléfono: ${b.guestPhone}`,
    `Correo: ${b.guestEmail}`,
    `Pago: ${paymentLabel(b)}`,
    b.discountCode ? `Descuento: ${b.discountCode} (-${Math.round((b.discountPct ?? 0) * 100)}%)` : "",
    `Total: $${b.total} USD`,
  ]
    .filter(Boolean)
    .join("\n");
}

/**
 * Sends the booking notification to the sales inbox, retrying briefly on
 * transient failures (network blips, Resend rate limits) before giving up.
 * Server-only — call from a createServerFn handler, never from client code.
 */
export async function sendBookingEmail(payload: BookingEmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[email] RESEND_API_KEY not set — booking email not sent.");
    return { sent: false, reason: "missing_api_key" as const };
  }

  const resend = new Resend(apiKey);
  const attempts = 3;
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const result = await resend.emails.send({
        from: bookingNotifications.from,
        to: bookingNotifications.to,
        replyTo: payload.guestEmail || undefined,
        subject: `Nueva reserva ${payload.bookingId} — ${payload.tourName}`,
        html: buildHtml(payload),
        text: buildText(payload),
      });
      if (!result.error) return { sent: true as const };
      lastError = result.error;
    } catch (err) {
      lastError = err;
    }
    console.error(`[email] attempt ${attempt}/${attempts} failed:`, lastError);
    if (attempt < attempts) {
      await new Promise((r) => setTimeout(r, attempt * 800));
    }
  }

  console.error("[email] all attempts failed, giving up:", lastError);
  return { sent: false, reason: "send_failed" as const };
}
