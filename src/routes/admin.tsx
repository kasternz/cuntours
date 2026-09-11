import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RedirectToSignIn, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { listBookingsFn } from "@/lib/booking-fn";
import type { BookingRow } from "@/lib/bookings.server";
import { formatUsd } from "@/lib/utils";

export const Route = createFileRoute("/admin")({ component: AdminPage });

function AdminPage() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) return null;
  if (!user) return <RedirectToSignIn />;
  return <AdminPanel />;
}

function AdminPanel() {
  const [bookings, setBookings] = useState<BookingRow[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    listBookingsFn()
      .then(setBookings)
      .catch(() => setError("No se pudieron cargar las reservas."));
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl tracking-tight">Reservas</h1>
        <UserButton />
      </div>

      {error ? <p className="mt-6 text-sm text-warn">{error}</p> : null}
      {!bookings && !error ? <p className="mt-6 text-sm text-muted">Cargando…</p> : null}
      {bookings && bookings.length === 0 ? (
        <p className="mt-6 text-sm text-muted">Todavía no hay reservas.</p>
      ) : null}

      {bookings && bookings.length > 0 ? (
        <div className="mt-6 overflow-x-auto rounded-[var(--radius-lg)] shadow-[var(--shadow-border)]">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-bg-elevated text-xs uppercase tracking-wide text-muted">
              <tr>
                {["Folio", "Tour", "Fecha", "Personas", "Tipo", "Recogida", "Cliente", "Teléfono", "Pago", "Total", "Correo", "Creada"].map(
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
                  <td className="whitespace-nowrap px-4 py-3">
                    {b.payAtPickup ? "Al recoger" : "Tarjeta"}
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
    </main>
  );
}
