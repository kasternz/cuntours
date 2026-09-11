import { Resend } from "resend";
import { bookingNotifications } from "./notifications";

export type BookingEmailPayload = {
  bookingId: string;
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
  payAtPickup: boolean;
  paymentIntentId?: string;
  total: number;
};

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
    row("Pago", b.payAtPickup ? "Al recoger en el hotel" : `Tarjeta pagada (Stripe: ${b.paymentIntentId ?? "—"})`),
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
    `Pago: ${b.payAtPickup ? "Al recoger en el hotel" : `Tarjeta pagada (Stripe: ${b.paymentIntentId ?? "—"})`}`,
    `Total: $${b.total} USD`,
  ]
    .filter(Boolean)
    .join("\n");
}

/**
 * Sends the booking notification to the sales inbox. Server-only — call from
 * a createServerFn handler, never from client code.
 */
export async function sendBookingEmail(payload: BookingEmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[email] RESEND_API_KEY not set — booking email not sent.");
    return { sent: false, reason: "missing_api_key" as const };
  }

  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from: bookingNotifications.from,
    to: bookingNotifications.to,
    replyTo: payload.guestEmail || undefined,
    subject: `Nueva reserva ${payload.bookingId} — ${payload.tourName}`,
    html: buildHtml(payload),
    text: buildText(payload),
  });

  if (result.error) {
    console.error("[email] Resend error:", result.error);
    return { sent: false, reason: "send_failed" as const };
  }
  return { sent: true as const };
}
