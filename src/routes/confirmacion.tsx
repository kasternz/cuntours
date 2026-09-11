import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Calendar, Check, MapPin, Users } from "lucide-react";
import { useCart } from "@/lib/cart";
import { getTour, useTours } from "@/lib/tours";
import { formatDateLong, formatUsd } from "@/lib/utils";
import { bookingWhatsAppUrl } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";
import { useLang } from "@/i18n/context";
import { copy } from "@/i18n/copy";

export const Route = createFileRoute("/confirmacion")({ component: Confirmacion });

function Confirmacion() {
  const { lang } = useLang();
  const loadLast = useCart((s) => s.loadLast);
  const booking = useCart((s) => s.lastBooking);

  const tours = useTours();

  useEffect(() => {
    loadLast();
  }, [loadLast]);

  if (!booking) {
    return (
      <main className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="font-display text-3xl tracking-tight">{copy.noRecentBooking[lang]}</h1>
        <p className="mt-3 text-muted">{copy.noRecentBookingBody[lang]}</p>
        <Link
          to="/tours"
          className="mt-6 inline-flex h-11 items-center rounded-[var(--radius-md)] bg-teal px-5 text-sm font-medium text-foam"
        >
          {copy.viewTours[lang]}
        </Link>
      </main>
    );
  }

  const tour = getTour(tours, booking.tourSlug);

  return (
    <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <p className="text-sm font-medium uppercase tracking-[0.16em] text-teal">
        {copy.directPurchase[lang]}
      </p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">{copy.bookingConfirmed[lang]}</h1>
      <p className="mt-3 text-base leading-relaxed text-muted">
        {copy.folioPrefix[lang]}{" "}
        <span className="font-medium tabular-nums text-ink">{booking.id}</span>
        {copy.folioSuffix[lang]}
      </p>

      {!booking.emailSent ? (
        <a
          href={bookingWhatsAppUrl({
            bookingId: booking.id,
            tourName: tour?.name.es ?? booking.tourSlug,
            date: formatDateLong(booking.date, "es"),
            total: booking.total,
          })}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center gap-3 rounded-[var(--radius-lg)] bg-warn-soft p-4 text-sm text-ink"
        >
          <MessageCircle size={20} className="shrink-0 text-warn" />
          <span>
            {lang === "es"
              ? "No pudimos confirmar tu reserva por correo — toca aquí para avisarnos por WhatsApp y confirmarla directo."
              : "We couldn't confirm your booking by email — tap here to let us know on WhatsApp and confirm it directly."}
          </span>
        </a>
      ) : null}

      <article className="mt-8 overflow-hidden rounded-[var(--radius-xl)] bg-bg-elevated shadow-[var(--shadow-lift)]">
        {tour ? (
          <img src={tour.image} alt="" className="h-44 w-full object-cover" />
        ) : null}
        <div className="p-6">
          <h2 className="font-display text-2xl tracking-tight">{tour?.name[lang]}</h2>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            <Info icon={Calendar} label={copy.infoDate[lang]} value={formatDateLong(booking.date, lang)} />
            <Info
              icon={Users}
              label={copy.infoTravelers[lang]}
              value={`${booking.adults} ${copy.adultsWord[lang]}${booking.children ? ` · ${booking.children} ${copy.childrenWord[lang]}` : ""}`}
            />
            <Info icon={MapPin} label={copy.infoPickup[lang]} value={booking.pickup} />
            <Info
              icon={Check}
              label={copy.infoPayment[lang]}
              value={
                booking.paymentMethod === "full_card"
                  ? `${copy.paidByCard[lang]} ${formatUsd(booking.total, lang)}`
                  : booking.paymentMethod === "deposit_card"
                    ? `${copy.depositAmountLabel[lang]}: ${formatUsd(Math.round(booking.total * 0.2), lang)}`
                    : `${copy.depositViaTransfer[lang]}: ${formatUsd(Math.round(booking.total * 0.2), lang)}`
              }
            />
          </dl>
          <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
            <span className="text-sm text-muted">{copy.total[lang]}</span>
            <span className="font-display text-3xl tabular-nums tracking-tight">
              {formatUsd(booking.total, lang)}
            </span>
          </div>
          {booking.paymentMethod !== "full_card" ? (
            <p className="mt-2 text-xs text-muted">{copy.balanceDueNote[lang]}</p>
          ) : null}
        </div>
      </article>

      <ol className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          {
            n: "01",
            t: copy.step1Title[lang],
            d: `${copy.step1Body[lang]} ${booking.email || copy.step1BodyFallback[lang]}.`,
          },
          { n: "02", t: copy.step2Title[lang], d: copy.step2Body[lang] },
          { n: "03", t: copy.step3Title[lang], d: copy.step3Body[lang] },
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
          {copy.bookAnother[lang]}
        </Link>
        <Link
          to="/"
          className="inline-flex h-12 items-center rounded-[var(--radius-md)] px-5 text-sm font-medium text-ink shadow-[var(--shadow-border)]"
        >
          {copy.backHome[lang]}
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
