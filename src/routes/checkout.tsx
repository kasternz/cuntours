import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/lib/cart";
import { getTour, tourPrice } from "@/lib/tours";
import { formatDateLong, formatUsd } from "@/lib/utils";
import { useLang } from "@/i18n/context";
import { copy } from "@/i18n/copy";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

export function CheckoutPage() {
  const { lang } = useLang();
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
        <h1 className="font-display text-3xl tracking-tight">{copy.noBookingInProgress[lang]}</h1>
        <p className="mt-3 text-muted">{copy.noBookingBody[lang]}</p>
        <Link
          to="/tours"
          className="mt-6 inline-flex h-11 items-center rounded-[var(--radius-md)] bg-teal px-5 text-sm font-medium text-foam"
        >
          {copy.viewTours[lang]}
        </Link>
      </main>
    );
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!guest.name.trim() || !guest.email.trim() || !guest.phone.trim()) {
      setError(copy.errRequired[lang]);
      return;
    }
    if (!guest.email.includes("@")) {
      setError(copy.errEmail[lang]);
      return;
    }
    if (!guest.payAtPickup) {
      const digits = card.replace(/\s/g, "");
      if (digits.length < 15) {
        setError(copy.errCard[lang]);
        return;
      }
      if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        setError(copy.errExpiry[lang]);
        return;
      }
      if (cvc.length < 3) {
        setError(copy.errCvc[lang]);
        return;
      }
    }
    setSubmitting(true);
    const booking = confirm();
    if (!booking) {
      setSubmitting(false);
      setError(copy.errGeneric[lang]);
      return;
    }
    void navigate({ to: "/confirmacion" });
  }

  return (
    <main className="mx-auto grid w-full max-w-5xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <form onSubmit={onSubmit} className="space-y-8">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-teal">
            {copy.directPurchase[lang]}
          </p>
          <h1 className="mt-2 font-display text-4xl tracking-tight">{copy.bookingDetails[lang]}</h1>
        </div>

        <fieldset className="space-y-4">
          <legend className="font-display text-xl tracking-tight">{copy.leadTraveler[lang]}</legend>
          <div>
            <Label htmlFor="name">{copy.fullName[lang]}</Label>
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
              <Label htmlFor="email">{copy.email[lang]}</Label>
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
              <Label htmlFor="phone">{copy.phoneWhatsapp[lang]}</Label>
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
            <Label htmlFor="notes">{copy.notesLabel[lang]}</Label>
            <Input
              id="notes"
              className="mt-1.5"
              value={guest.notes}
              onChange={(e) => patchGuest({ notes: e.target.value })}
            />
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="font-display text-xl tracking-tight">{copy.payment[lang]}</legend>
          <div className="grid gap-2">
            <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-[var(--radius-md)] bg-bg-elevated px-4 shadow-[var(--shadow-border)]">
              <input
                type="radio"
                name="pay"
                checked={guest.payAtPickup}
                onChange={() => patchGuest({ payAtPickup: true })}
                className="accent-teal"
              />
              <span className="text-sm">{copy.payAtPickup[lang]}</span>
            </label>
            <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-[var(--radius-md)] bg-bg-elevated px-4 shadow-[var(--shadow-border)]">
              <input
                type="radio"
                name="pay"
                checked={!guest.payAtPickup}
                onChange={() => patchGuest({ payAtPickup: false })}
                className="accent-teal"
              />
              <span className="text-sm">{copy.payNowCard[lang]}</span>
            </label>
          </div>

          {!guest.payAtPickup ? (
            <div className="space-y-4 rounded-[var(--radius-lg)] bg-bg-elevated p-4 shadow-[var(--shadow-border)]">
              <div>
                <Label htmlFor="card">{copy.cardNumber[lang]}</Label>
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
                  <Label htmlFor="exp">{copy.expires[lang]}</Label>
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
                  <Label htmlFor="cvc">{copy.cvc[lang]}</Label>
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
              <p className="text-xs text-muted">{copy.sampleCardNote[lang]}</p>
            </div>
          ) : (
            <p className="text-sm text-muted">{copy.payAtPickupNote[lang]}</p>
          )}
        </fieldset>

        {error ? <p className="text-sm text-warn">{error}</p> : null}

        <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={submitting}>
          {submitting ? copy.confirming[lang] : `${copy.confirmButton[lang]} ${formatUsd(total)}`}
        </Button>
      </form>

      <aside className="h-fit rounded-[var(--radius-xl)] bg-bg-elevated p-5 shadow-[var(--shadow-border)] lg:sticky lg:top-24">
        <img
          src={tour.image}
          alt=""
          className="h-36 w-full rounded-[var(--radius-md)] object-cover"
        />
        <h2 className="mt-4 font-display text-xl tracking-tight">{tour.name[lang]}</h2>
        <dl className="mt-3 space-y-2 text-sm">
          <Row k={copy.dateLabel[lang]} v={formatDateLong(draft.date, lang)} />
          <Row
            k={copy.rowTravelers[lang]}
            v={`${draft.adults} ${copy.adultsWord[lang]}${draft.children ? `, ${draft.children} ${copy.childrenWord[lang]}` : ""}`}
          />
          <Row k={copy.rowPickup[lang]} v={draft.pickup} />
        </dl>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <span className="text-sm text-muted">{copy.total[lang]}</span>
          <span className="font-display text-2xl tabular-nums">{formatUsd(total)}</span>
        </div>
        <Link
          to="/tours/$slug"
          params={{ slug: tour.slug }}
          className="mt-4 inline-block text-sm text-teal"
        >
          {copy.changeTour[lang]}
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
