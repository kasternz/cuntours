import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart, type PaymentMethod } from "@/lib/cart";
import { getTour, privateTourPrice, tourPrice, useTours } from "@/lib/tours";
import { formatDateLong, formatUsd } from "@/lib/utils";
import { useLang } from "@/i18n/context";
import { copy } from "@/i18n/copy";
import { submitBooking } from "@/lib/booking-fn";
import { StripePaymentSection } from "@/components/stripe-payment-form";
import { SpeiTransferSection } from "@/components/spei-transfer-section";
import { lookupDiscount } from "@/lib/discounts";

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
  const [depositSubMethod, setDepositSubMethod] = useState<"deposit_transfer" | "deposit_card">(
    "deposit_card",
  );
  const [discountInput, setDiscountInput] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; pct: number } | null>(null);
  const [discountError, setDiscountError] = useState("");

  const tours = useTours();
  const tour = draft ? getTour(tours, draft.tourSlug) : undefined;
  const isPrivate = guest.tourType === "privado";
  const subtotal = useMemo(() => {
    if (!tour || !draft) return 0;
    return isPrivate
      ? privateTourPrice(tour, draft.adults, draft.children)
      : tourPrice(tour, draft.adults, draft.children);
  }, [tour, draft, isPrivate]);
  const total = appliedDiscount
    ? Math.round(subtotal * (1 - appliedDiscount.pct))
    : subtotal;
  const depositAmount = Math.round(total * 0.2);
  const balanceDue = total - depositAmount;

  function applyDiscount() {
    setDiscountError("");
    const pct = lookupDiscount(discountInput);
    if (pct === null) {
      setDiscountError(lang === "es" ? "Código no válido." : "Invalid code.");
      return;
    }
    setAppliedDiscount({ code: discountInput.trim().toUpperCase(), pct });
  }

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

  async function finishBooking(
    paymentMethod: PaymentMethod,
    paymentIntentId?: string,
    mercadopagoPaymentId?: string,
  ) {
    const isFull = paymentMethod === "full_card";
    let result: { saved: boolean; sent: boolean };
    try {
      result = await submitBooking({
        data: {
          bookingId,
          tourSlug: tour!.slug,
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
          paymentMethod,
          depositAmount: isFull ? undefined : depositAmount,
          discountCode: appliedDiscount?.code,
          discountPct: appliedDiscount?.pct,
          balanceDue: isFull ? undefined : balanceDue,
          total,
          paymentIntentId,
          mercadopagoPaymentId,
        },
      });
    } catch {
      setError(copy.errGeneric[lang]);
      return;
    }

    // Only a real database failure blocks the booking — a payment already
    // happened (if paying by card), so the booking record must never be lost
    // just because the notification email had trouble. If the email failed
    // but the booking saved, we proceed and show a WhatsApp fallback on the
    // confirmation page instead of stranding the customer here.
    if (!result.saved) {
      setError(copy.errGeneric[lang]);
      return;
    }

    patchGuest({ paymentMethod });
    const booking = confirm(total, bookingId, result.sent);
    if (!booking) {
      setError(copy.errGeneric[lang]);
      return;
    }
    void navigate({ to: "/confirmacion" });
  }

  return (
    <main className="mx-auto grid w-full max-w-5xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-8">
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
            <p className="mt-1.5 flex h-11 items-center rounded-[var(--radius-md)] bg-bg-elevated px-4 text-sm shadow-[var(--shadow-border)]">
              {isPrivate ? copy.privateTour[lang] : copy.sharedTour[lang]}
            </p>
            <Link
              to="/tours/$slug"
              params={{ slug: tour.slug }}
              className="mt-1.5 inline-block text-xs text-teal"
            >
              {copy.changeTour[lang]}
            </Link>
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

          {isPrivate ? (
            <>
              <p className="text-sm text-muted">{copy.privateOnlyCard[lang]}</p>
              <StripePaymentSection
                amountUsd={total}
                bookingId={bookingId}
                tourName={tour.name.es}
                guestEmail={guest.email}
                canSubmit={validateGuest}
                onPaid={(paymentIntentId) => finishBooking("full_card", paymentIntentId)}
              />
            </>
          ) : (
            <>
              <div className="grid gap-2">
                <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-[var(--radius-md)] bg-bg-elevated px-4 shadow-[var(--shadow-border)]">
                  <input
                    type="radio"
                    name="paymentPlan"
                    checked={guest.paymentMethod !== "full_card"}
                    onChange={() => patchGuest({ paymentMethod: depositSubMethod })}
                    className="accent-teal"
                  />
                  <span className="text-sm">
                    {copy.depositOption[lang]} — {formatUsd(depositAmount, lang)}
                  </span>
                </label>
                <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-[var(--radius-md)] bg-bg-elevated px-4 shadow-[var(--shadow-border)]">
                  <input
                    type="radio"
                    name="paymentPlan"
                    checked={guest.paymentMethod === "full_card"}
                    onChange={() => patchGuest({ paymentMethod: "full_card" })}
                    className="accent-teal"
                  />
                  <span className="text-sm">{copy.fullCardOption[lang]}</span>
                </label>
              </div>

              {guest.paymentMethod !== "full_card" ? (
                <div className="space-y-3 rounded-[var(--radius-lg)] bg-bg-elevated p-4 shadow-[var(--shadow-border)]">
                  <p className="text-sm font-medium">{copy.depositMethodLabel[lang]}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {(["deposit_card", "deposit_transfer"] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => {
                          setDepositSubMethod(m);
                          patchGuest({ paymentMethod: m });
                        }}
                        className={`h-11 rounded-[var(--radius-md)] text-sm font-medium transition-colors ${
                          guest.paymentMethod === m ? "bg-teal text-foam" : "bg-surface text-ink-soft"
                        }`}
                      >
                        {m === "deposit_card" ? copy.depositViaCard[lang] : copy.depositViaTransfer[lang]}
                      </button>
                    ))}
                  </div>

                  {guest.paymentMethod === "deposit_card" ? (
                    <StripePaymentSection
                      amountUsd={depositAmount}
                      bookingId={bookingId}
                      tourName={tour.name.es}
                      guestEmail={guest.email}
                      canSubmit={validateGuest}
                      onPaid={(paymentIntentId) => finishBooking("deposit_card", paymentIntentId)}
                    />
                  ) : (
                    <SpeiTransferSection
                      amountUsd={depositAmount}
                      bookingId={bookingId}
                      guestEmail={guest.email}
                      guestName={guest.name}
                      canSubmit={validateGuest}
                      onConfirmed={(mpId) => finishBooking("deposit_transfer", undefined, mpId)}
                    />
                  )}
                </div>
              ) : (
                <StripePaymentSection
                  amountUsd={total}
                  bookingId={bookingId}
                  tourName={tour.name.es}
                  guestEmail={guest.email}
                  canSubmit={validateGuest}
                  onPaid={(paymentIntentId) => finishBooking("full_card", paymentIntentId)}
                />
              )}
            </>
          )}
        </fieldset>

        {error && (isPrivate || guest.paymentMethod !== "deposit_transfer") ? (
          <p className="text-sm text-warn">{error}</p>
        ) : null}
      </div>

      <aside className="h-fit rounded-[var(--radius-xl)] bg-bg-elevated p-5 shadow-[var(--shadow-border)] lg:sticky lg:top-24">
        <img
          src={tour.image}
          alt=""
          className="h-36 w-full rounded-[var(--radius-md)] object-cover"
        />
        <h2 className="mt-4 font-display text-xl tracking-tight">{tour.name[lang]}</h2>
        <dl className="mt-3 space-y-2 text-sm">
          <Row k={copy.dateLabel[lang]} v={formatDateLong(draft.date, lang)} />
          {!isPrivate ? (
            <>
              <Row
                k={`${draft.adults} ${copy.adultsWord[lang]} × ${formatUsd(tour.price, lang)}`}
                v={formatUsd(tour.price * draft.adults, lang)}
              />
              {draft.children ? (
                <Row
                  k={`${draft.children} ${copy.childrenWord[lang]} × ${formatUsd(Math.round(tour.price * 0.6), lang)}`}
                  v={formatUsd(Math.round(tour.price * 0.6) * draft.children, lang)}
                />
              ) : null}
            </>
          ) : (
            <Row
              k={copy.rowTravelers[lang]}
              v={`${draft.adults} ${copy.adultsWord[lang]}${draft.children ? `, ${draft.children} ${copy.childrenWord[lang]}` : ""}`}
            />
          )}
          <Row k={copy.rowPickup[lang]} v={draft.pickup} />
        </dl>

        <div className="mt-4 border-t border-border pt-4">
          {appliedDiscount ? (
            <div className="flex items-center justify-between rounded-[var(--radius-sm)] bg-warn-soft px-3 py-2 text-sm">
              <span className="text-ink">
                {copy.discountApplied[lang]}: {appliedDiscount.code} (−{Math.round(appliedDiscount.pct * 100)}%)
              </span>
              <button
                type="button"
                className="text-xs font-medium text-teal"
                onClick={() => {
                  setAppliedDiscount(null);
                  setDiscountInput("");
                }}
              >
                {copy.removeCode[lang]}
              </button>
            </div>
          ) : (
            <div>
              <Label htmlFor="discount">{copy.discountCodeLabel[lang]}</Label>
              <div className="mt-1.5 flex gap-2">
                <Input
                  id="discount"
                  value={discountInput}
                  onChange={(e) => setDiscountInput(e.target.value)}
                  className="uppercase"
                />
                <Button type="button" variant="outline" onClick={applyDiscount}>
                  {copy.applyCode[lang]}
                </Button>
              </div>
              {discountError ? <p className="mt-1 text-xs text-warn">{discountError}</p> : null}
            </div>
          )}
        </div>

        <div className="mt-4 border-t border-border pt-4">
          {appliedDiscount ? (
            <div className="flex items-center justify-between text-sm text-muted">
              <span>{copy.total[lang]}</span>
              <span className="line-through">{formatUsd(subtotal, lang)}</span>
            </div>
          ) : null}
          {!isPrivate && guest.paymentMethod !== "full_card" ? (
            <>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">{copy.depositAmountLabel[lang]}</span>
                <span className="font-medium tabular-nums">{formatUsd(depositAmount, lang)}</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-sm">
                <span className="text-muted">{copy.balanceDueLabel[lang]}</span>
                <span className="tabular-nums">{formatUsd(balanceDue, lang)}</span>
              </div>
              <p className="mt-2 text-xs text-muted">{copy.balanceDueNote[lang]}</p>
            </>
          ) : null}
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
            <span className="text-sm text-muted">{copy.total[lang]}</span>
            <span className="font-display text-2xl tabular-nums">{formatUsd(total, lang)}</span>
          </div>
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
