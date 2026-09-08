import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/lib/cart";
import { getTour, tourPrice } from "@/lib/tours";
import { formatDateLong, formatUsd } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

export function CheckoutPage() {
  const navigate = useNavigate();
  const draft = useCart((s) => s.draft);
  const guest = useCart((s) => s.guest);
  const patchGuest = useCart((s) => s.patchGuest);
  const confirm = useCart((s) => s.confirm);
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const tour = draft ? getTour(draft.tourSlug) : undefined;
  const total = useMemo(() => {
    if (!tour || !draft) return 0;
    return tourPrice(tour, draft.adults, draft.children);
  }, [tour, draft]);

  if (!draft || !tour) {
    return (
      <main className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="font-display text-3xl tracking-tight">No hay reserva en curso</h1>
        <p className="mt-3 text-muted">Elige un tour y pulsa Reservar ahora para comprar directo.</p>
        <Link
          to="/tours"
          className="mt-6 inline-flex h-11 items-center rounded-[var(--radius-md)] bg-teal px-5 text-sm font-medium text-foam"
        >
          Ver tours
        </Link>
      </main>
    );
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!guest.name.trim() || !guest.email.trim() || !guest.phone.trim()) {
      setError("Nombre, correo y teléfono son obligatorios.");
      return;
    }
    if (!guest.email.includes("@")) {
      setError("Revisa el correo.");
      return;
    }
    if (!guest.payAtPickup) {
      const digits = card.replace(/\s/g, "");
      if (digits.length < 15) {
        setError("Número de tarjeta incompleto.");
        return;
      }
      if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        setError("Vencimiento en formato MM/AA.");
        return;
      }
      if (cvc.length < 3) {
        setError("CVC incompleto.");
        return;
      }
    }
    setSubmitting(true);
    const booking = confirm();
    if (!booking) {
      setSubmitting(false);
      setError("No se pudo confirmar. Intenta de nuevo.");
      return;
    }
    void navigate({ to: "/confirmacion" });
  }

  return (
    <main className="mx-auto grid w-full max-w-5xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <form onSubmit={onSubmit} className="space-y-8">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-teal">Compra directa</p>
          <h1 className="mt-2 font-display text-4xl tracking-tight">Datos de la reserva</h1>
        </div>

        <fieldset className="space-y-4">
          <legend className="font-display text-xl tracking-tight">Viajero principal</legend>
          <div>
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              className="mt-1.5"
              autoComplete="name"
              value={guest.name}
              onChange={(e) => patchGuest({ name: e.target.value })}
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="email">Correo</Label>
              <Input
                id="email"
                type="email"
                className="mt-1.5"
                autoComplete="email"
                value={guest.email}
                onChange={(e) => patchGuest({ email: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Teléfono / WhatsApp</Label>
              <Input
                id="phone"
                type="tel"
                className="mt-1.5"
                autoComplete="tel"
                value={guest.phone}
                onChange={(e) => patchGuest({ phone: e.target.value })}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="notes">Notas (alergias, silla de ruedas, habitación)</Label>
            <Input
              id="notes"
              className="mt-1.5"
              value={guest.notes}
              onChange={(e) => patchGuest({ notes: e.target.value })}
            />
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="font-display text-xl tracking-tight">Pago</legend>
          <div className="grid gap-2">
            <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-[var(--radius-md)] bg-bg-elevated px-4 shadow-[var(--shadow-border)]">
              <input
                type="radio"
                name="pay"
                checked={guest.payAtPickup}
                onChange={() => patchGuest({ payAtPickup: true })}
                className="accent-teal"
              />
              <span className="text-sm">Pagar al recoger en el hotel</span>
            </label>
            <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-[var(--radius-md)] bg-bg-elevated px-4 shadow-[var(--shadow-border)]">
              <input
                type="radio"
                name="pay"
                checked={!guest.payAtPickup}
                onChange={() => patchGuest({ payAtPickup: false })}
                className="accent-teal"
              />
              <span className="text-sm">Pagar ahora con tarjeta</span>
            </label>
          </div>

          {!guest.payAtPickup ? (
            <div className="space-y-4 rounded-[var(--radius-lg)] bg-bg-elevated p-4 shadow-[var(--shadow-border)]">
              <div>
                <Label htmlFor="card">Número de tarjeta</Label>
                <Input
                  id="card"
                  className="mt-1.5"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  placeholder="4242 4242 4242 4242"
                  value={card}
                  onChange={(e) => setCard(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="exp">Vence</Label>
                  <Input
                    id="exp"
                    className="mt-1.5"
                    placeholder="MM/AA"
                    autoComplete="cc-exp"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    className="mt-1.5"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                  />
                </div>
              </div>
              <p className="text-xs text-muted">
                En esta reserva de muestra el cargo no se procesa con un banco real.
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted">
              El conductor confirma el pago en efectivo o tarjeta al recoger. Sin cargo hoy.
            </p>
          )}
        </fieldset>

        {error ? <p className="text-sm text-warn">{error}</p> : null}

        <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={submitting}>
          {submitting ? "Confirmando…" : `Confirmar · ${formatUsd(total)}`}
        </Button>
      </form>

      <aside className="h-fit rounded-[var(--radius-xl)] bg-bg-elevated p-5 shadow-[var(--shadow-border)] lg:sticky lg:top-24">
        <img
          src={tour.image}
          alt=""
          className="h-36 w-full rounded-[var(--radius-md)] object-cover"
        />
        <h2 className="mt-4 font-display text-xl tracking-tight">{tour.name}</h2>
        <dl className="mt-3 space-y-2 text-sm">
          <Row k="Fecha" v={formatDateLong(draft.date)} />
          <Row k="Viajeros" v={`${draft.adults} adultos${draft.children ? `, ${draft.children} niños` : ""}`} />
          <Row k="Recogida" v={draft.pickup} />
        </dl>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <span className="text-sm text-muted">Total</span>
          <span className="font-display text-2xl tabular-nums">{formatUsd(total)}</span>
        </div>
        <Link
          to="/tours/$slug"
          params={{ slug: tour.slug }}
          className="mt-4 inline-block text-sm text-teal"
        >
          Cambiar tour
        </Link>
      </aside>
    </main>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted">{k}</dt>
      <dd className="text-right text-ink">{v}</dd>
    </div>
  );
}
