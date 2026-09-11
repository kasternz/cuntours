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
import { submitBooking } from "@/lib/booking-fn";
import { StripePaymentSection } from "@/components/stripe-payment-form";

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
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const tour = draft ? getTour(draft.tourSlug) : undefined;
  const total = useMemo(() => {
    if (!tour || !draft) return 0;
    return tourPrice(tour, draft.adults, draft.children);
  }, [tour, draft]);

  // One stable folio for this checkout session — used in the Stripe payment
  // intent, the sales email, and the final confirmed booking, so all three
  // always agree on the same reference number.
  const bookingId = useMemo(
    () => `CT-${Math.floor(10000 + Math.random() * 90000)}`,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [draft?.tourSlug],
  );

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

  function validateGuest(): string | null {
    if (!guest.name.trim() || !guest.email.trim() || !guest.phone.trim()) {
      return copy.errRequired[lang];
    }
    if (!guest.email.includes("@")) {
      return copy.errEmail[lang];
    }
    return null;
  }

  async function finishBooking(paymentIntentId?: string) {
    setSubmitting(true);
    try {
      const result = await submitBooking({
        data: {
          bookingId,
          tourName: tour!.name.es,
          date: formatDateLong(draft!.date, "es"),
          adults: draft!.adults,
          children: draft!.children,
          tourType: guest.tourType,
          pickup: draft!.pickup,
          pickupTime: guest.pickupTime,
          dietary: guest.dietary,
          mobility: guest.mobility,
          notes: guest.notes,
          guestName: guest.name,
          guestEmail: guest.email,
          guestPhone: guest.phone,
          payAtPickup: !paymentIntentId,
          total,
          paymentIntentId,
        },
      });
      if (!result.sent) {
        setSubmitting(false);
        setError(copy.errEmailSend[lang]);
        return;
      }
    } catch {
      setSubmitting(false);
      setError(copy.errEmailSend[lang]);
      return;
    }

    const booking = confirm(bookingId);
    if (!booking) {
      setSubmitting(false);
      setError(copy.errGeneric[lang]);
      return;
    }
    void navigate({ to: "/confirmacion" });
  }

  async function onPayAtPickupSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const guestError = validateGuest();
    if (guestError) {
      setError(guestError);
      return;
    }
    await finishBooking();
  }

  return (
    <main className="mx-auto grid w-full max-w-5xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <form onSubmit={onPayAtPickupSubmit} className="space-y-8">
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
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="font-display text-xl tracking-tight">
            {lang === "es" ? "Detalles para coordinar" : "Details to coordinate"}
          </legend>
          <div>
            <Label>{copy.tourTypeLabel[lang]}</Label>
            <div className="mt-1.5 grid grid-cols-2 gap-2">
              {(["compartido", "privado"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => patchGuest({ tourType: t })}
                  className={`h-11 rounded-[var(--radius-md)] text-sm font-medium transition-colors ${
                    guest.tourType === t
                      ? "bg-teal text-foam"
                      : "bg-bg-elevated text-ink-soft shadow-[var(--shadow-border)]"
                  }`}
                >
                  {t === "compartido" ? copy.sharedTour[lang] : copy.privateTour[lang]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="pickupTime">
              {copy.pickupTimeLabel[lang]}{" "}
              <span className="text-muted">({copy.optional[lang]})</span>
            </Label>
            <Input
              id="pickupTime"
              type="time"
              className="mt-1.5"
              value={guest.pickupTime}
              onChange={(e) => patchGuest({ pickupTime: e.target.value })}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="dietary">
                {copy.dietaryLabel[lang]}{" "}
                <span className="text-muted">({copy.optional[lang]})</span>
              </Label>
              <Input
                id="dietary"
                className="mt-1.5"
                placeholder={copy.dietaryPlaceholder[lang]}
                value={guest.dietary}
                onChange={(e) => patchGuest({ dietary: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="mobility">
                {copy.mobilityLabel[lang]}{" "}
                <span className="text-muted">({copy.optional[lang]})</span>
              </Label>
              <Input
                id="mobility"
                className="mt-1.5"
                placeholder={copy.mobilityPlaceholder[lang]}
                value={guest.mobility}
                onChange={(e) => patchGuest({ mobility: e.target.value })}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="notes">
              {copy.notesLabel[lang]} <span className="text-muted">({copy.optional[lang]})</span>
            </Label>
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

          {guest.payAtPickup ? (
            <p className="text-sm text-muted">{copy.payAtPickupNote[lang]}</p>
          ) : (
            <StripePaymentSection
              amountUsd={total}
              bookingId={bookingId}
              tourName={tour.name.es}
              guestEmail={guest.email}
              canSubmit={validateGuest}
              onPaid={(paymentIntentId) => finishBooking(paymentIntentId)}
            />
          )}
        </fieldset>

        {error ? <p className="text-sm text-warn">{error}</p> : null}

        {guest.payAtPickup ? (
          <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={submitting}>
            {submitting ? copy.sendingBooking[lang] : `${copy.confirmButton[lang]} ${formatUsd(total, lang)}`}
          </Button>
        ) : null}
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
          <span className="font-display text-2xl tabular-nums">{formatUsd(total, lang)}</span>
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
