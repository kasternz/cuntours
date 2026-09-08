import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Calendar, Check, MapPin, Users } from "lucide-react";
import { useCart } from "@/lib/cart";
import { getTour } from "@/lib/tours";
import { formatDateLong, formatUsd } from "@/lib/utils";

export const Route = createFileRoute("/confirmacion")({ component: Confirmacion });

function Confirmacion() {
  const loadLast = useCart((s) => s.loadLast);
  const booking = useCart((s) => s.lastBooking);

  useEffect(() => {
    loadLast();
  }, [loadLast]);

  if (!booking) {
    return (
      <main className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="font-display text-3xl tracking-tight">No hay una reserva reciente</h1>
        <p className="mt-3 text-muted">
          Cuando confirmes un tour, el folio y los datos de recogida aparecen aquí.
        </p>
        <Link
          to="/tours"
          className="mt-6 inline-flex h-11 items-center rounded-[var(--radius-md)] bg-teal px-5 text-sm font-medium text-foam"
        >
          Ver tours
        </Link>
      </main>
    );
  }

  const tour = getTour(booking.tourSlug);

  return (
    <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <p className="text-sm font-medium uppercase tracking-[0.16em] text-teal">Compra directa</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">Reserva confirmada</h1>
      <p className="mt-3 text-base leading-relaxed text-muted">
        Folio{" "}
        <span className="font-medium tabular-nums text-ink">{booking.id}</span>. Te recogemos en el
        hotel. Revisa el correo — y guarda este folio.
      </p>

      <article className="mt-8 overflow-hidden rounded-[var(--radius-xl)] bg-bg-elevated shadow-[var(--shadow-lift)]">
        {tour ? (
          <img src={tour.image} alt="" className="h-44 w-full object-cover" />
        ) : null}
        <div className="p-6">
          <h2 className="font-display text-2xl tracking-tight">{booking.tourName}</h2>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            <Info icon={Calendar} label="Fecha" value={formatDateLong(booking.date)} />
            <Info
              icon={Users}
              label="Viajeros"
              value={`${booking.adults} adultos${booking.children ? ` · ${booking.children} niños` : ""}`}
            />
            <Info icon={MapPin} label="Recogida" value={booking.pickup} />
            <Info
              icon={Check}
              label="Pago"
              value={
                booking.payAtPickup
                  ? "Al recoger en el hotel"
                  : `Tarjeta · ${formatUsd(booking.total)}`
              }
            />
          </dl>
          <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
            <span className="text-sm text-muted">Total</span>
            <span className="font-display text-3xl tabular-nums tracking-tight">
              {formatUsd(booking.total)}
            </span>
          </div>
        </div>
      </article>

      <ol className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          { n: "01", t: "Correo", d: `Confirmación a ${booking.email || "tu correo"}.` },
          { n: "02", t: "Recogida", d: "El guía confirma hora la tarde anterior." },
          { n: "03", t: "Sale", d: "Lleva traje de baño, bloqueador y el folio." },
        ].map((s) => (
          <li key={s.n} className="rounded-[var(--radius-lg)] bg-bg-elevated p-4 shadow-[var(--shadow-border)]">
            <p className="font-display text-sm tabular-nums text-teal">{s.n}</p>
            <p className="mt-2 font-medium">{s.t}</p>
            <p className="mt-1 text-sm text-muted">{s.d}</p>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          to="/tours"
          className="inline-flex h-12 items-center rounded-[var(--radius-md)] bg-teal px-5 text-sm font-medium text-foam"
        >
          Reservar otro tour
        </Link>
        <Link
          to="/"
          className="inline-flex h-12 items-center rounded-[var(--radius-md)] px-5 text-sm font-medium text-ink shadow-[var(--shadow-border)]"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Calendar;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={18} className="mt-0.5 text-teal" />
      <div>
        <dt className="text-xs text-muted">{label}</dt>
        <dd className="text-sm text-ink">{value}</dd>
      </div>
    </div>
  );
}
