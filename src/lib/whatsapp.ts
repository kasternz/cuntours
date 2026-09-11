import { bookingNotifications } from "./notifications";

export function bookingWhatsAppUrl(input: {
  bookingId: string;
  tourName: string;
  date: string;
  total: number;
}) {
  const text =
    `Hola, mi reserva ${input.bookingId} (${input.tourName}, ${input.date}, ` +
    `$${input.total} USD) no recibió confirmación por correo. ¿Pueden confirmarla?`;
  return `https://wa.me/${bookingNotifications.whatsapp}?text=${encodeURIComponent(text)}`;
}
