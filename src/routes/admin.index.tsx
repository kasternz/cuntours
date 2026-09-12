import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { listBookingsFn, adminMarkPaidFn } from "@/lib/booking-fn";
import type { BookingRow } from "@/lib/bookings.server";
import { formatUsd } from "@/lib/utils";

export const Route = createFileRoute("/admin/")({ component: BookingsPage });

const POLL_MS = 15000;

function paymentDetail(b: BookingRow): string {
  const processor = b.paymentIntentId ? "Stripe" : b.mercadopagoPaymentId ? "MercadoPago" : "";
  if (b.paymentMethod === "full_card") return `Completo${processor ? ` (${processor})` : ""}`;
  if (b.paymentMethod === "deposit_card") return `Depósito${processor ? ` (${processor})` : ""}`;
  return "Depósito (transferencia SPEI)";
}

function BookingsPage() {
  const [bookings, setBookings] = useState<BookingRow[] | null>(null);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [markingPaid, setMarkingPaid] = useState<string | null>(null);

  const load = useCallback(() => {
    listBookingsFn()
      .then((res) => {
        if (res.authorized) {
          setBookings(res.bookings);
          setLastUpdated(new Date());
          setError("");
        }
      })
      .catch(() => setError("No se pudieron cargar las reservas."));
  }, []);

  useEffect(() => {
    load();
    // Real-time-ish: re-poll while the panel is open, so a SPEI transfer that
    // confirms via webhook shows up here without anyone reloading the page.
    const interval = setInterval(load, POLL_MS);
    return () => clearInterval(interval);
  }, [load]);

  async function markPaid(bookingId: string) {
    setMarkingPaid(bookingId);
    try {
      await adminMarkPaidFn({ data: { bookingId } });
      load();
    } catch {
      setError("No se pudo marcar como pagado.");
    } finally {
      setMarkingPaid(null);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="font-display text-3xl tracking-tight">Reservas</h1>
        {lastUpdated ? (
          <p className="text-xs text-muted">
            Actualizado {lastUpdated.toLocaleTimeString("es-MX")} · se actualiza solo cada 15s
          </p>
        ) : null}
      </div>

      {error ? <p className="mt-6 text-sm text-warn">{error}</p> : null}
      {!bookings && !error ? <p className="mt-6 text-sm text-muted">Cargando…</p> : null}
      {bookings && bookings.length === 0 ? (
        <p className="mt-6 text-sm text-muted">Todavía no hay reservas.</p>
      ) : null}

      {bookings && bookings.length > 0 ? (
        <div className="mt-6 overflow-x-auto rounded-[var(--radius-lg)] shadow-[var(--shadow-border)]">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead className="bg-bg-elevated text-xs uppercase tracking-wide text-muted">
              <tr>
                {["Folio", "Tour", "Fecha", "Personas", "Tipo", "Recogida", "Cliente", "Teléfono", "Pago", "Estado", "Total", "Correo", "Creada"].map(
                  (h) => (
                    <th key={h} className="whitespace-nowrap px-4 py-3 font-medium">
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {bookings.map((b) => (
                <tr key={b.bookingId} className="bg-bg">
                  <td className="whitespace-nowrap px-4 py-3 font-medium">{b.bookingId}</td>
                  <td className="whitespace-nowrap px-4 py-3">{b.tourName}</td>
                  <td className="whitespace-nowrap px-4 py-3">{b.date}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {b.adults}A{b.children ? ` · ${b.children}N` : ""}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {b.tourType === "privado" ? "Privado" : "Compartido"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">{b.pickup}</td>
                  <td className="whitespace-nowrap px-4 py-3">{b.guestName}</td>
                  <td className="whitespace-nowrap px-4 py-3">{b.guestPhone}</td>
                  <td className="whitespace-nowrap px-4 py-3">{paymentDetail(b)}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <div className="flex items-center gap-2">
                      {b.paymentStatus === "pending" ? (
                        <span className="rounded-full bg-warn-soft px-2 py-0.5 text-xs font-medium text-warn">
                          Pendiente
                        </span>
                      ) : (
                        <span className="rounded-full bg-teal/10 px-2 py-0.5 text-xs font-medium text-teal">
                          Confirmado
                        </span>
                      )}
                      {b.paymentStatus === "pending" ? (
                        <button
                          type="button"
                          onClick={() => markPaid(b.bookingId)}
                          disabled={markingPaid === b.bookingId}
                          className="text-xs font-medium text-teal underline-offset-2 hover:underline disabled:opacity-50"
                        >
                          {markingPaid === b.bookingId ? "Marcando…" : "Marcar pagado"}
                        </button>
                      ) : null}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">{formatUsd(b.total)}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {b.emailSent ? (
                      <span className="text-teal">Enviado</span>
                    ) : (
                      <span className="text-warn">Falló</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-muted">
                    {new Date(b.createdAt).toLocaleString("es-MX")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
