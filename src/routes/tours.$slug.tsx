import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, Clock, Languages, MapPin, Users } from "lucide-react";
import { useState } from "react";
import { Countdown } from "@/components/countdown";
import { PickupSelect } from "@/components/pickup-select";
import { PlaceMap } from "@/components/place-map";
import { TourItinerary } from "@/components/tour-itinerary";
import { Qty } from "@/components/qty";
import { CircleRating } from "@/components/traveler-rating";
import { TourCard } from "@/components/tour-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/lib/cart";
import {
  categoryLabel,
  getTour,
  minPrivateDate,
  privateTourPrice,
  relatedTours,
  tourPrice,
} from "@/lib/tours";
import { formatUsd, todayIso } from "@/lib/utils";
import { useLang } from "@/i18n/context";
import { copy } from "@/i18n/copy";

export const Route = createFileRoute("/tours/$slug")({
  component: TourDetail,
});

function TourDetail() {
  const { lang } = useLang();
  const { slug } = Route.useParams();
  const tour = getTour(slug);
  const navigate = useNavigate();
  const setDraft = useCart((s) => s.setDraft);
  const guest = useCart((s) => s.guest);
  const patchGuest = useCart((s) => s.patchGuest);

  const [date, setDate] = useState(() =>
    tour?.lastMinute?.departs === "hoy" ? todayIso(0) : todayIso(1),
  );
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [pickup, setPickup] = useState("");
  const [error, setError] = useState("");

  if (!tour) {
    return (
      <main className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl tracking-tight">{copy.tourNotFound[lang]}</h1>
        <p className="mt-3 text-muted">{copy.tourNotFoundBody[lang]}</p>
        <Link to="/tours" className="mt-6 inline-flex text-sm font-medium text-teal">
          {copy.backToCatalog[lang]}
        </Link>
      </main>
    );
  }

  const isPrivate = guest.tourType === "privado";
  const total = isPrivate
    ? privateTourPrice(tour, adults, children)
    : tourPrice(tour, adults, children);
  const related = relatedTours(tour.slug);
  const sharedMinDate = tour.lastMinute?.departs === "hoy" ? todayIso(0) : todayIso(0);
  const minDate = isPrivate ? minPrivateDate(tour) : sharedMinDate;
  const underMinGuarantee =
    isPrivate && adults + children < tour.private.unitCapacity;

  function book() {
    setError("");
    if (adults + children < 1) return;
    if (isPrivate && date < minPrivateDate(tour!)) {
      setError(
        `${copy.privateAdvanceNotice[lang]} ${tour!.private.minAdvanceDays} ${copy.privateAdvanceDaysWord[lang]}`,
      );
      return;
    }
    if (isPrivate) patchGuest({ paymentMethod: "full_card" });
    setDraft({
      tourSlug: slug,
      date,
      adults,
      children,
      pickup: pickup.trim() || (lang === "es" ? "Zona hotelera Cancún" : "Cancún hotel zone"),
    });
    void navigate({ to: "/checkout" });
  }

  return (
    <main>
      <div className="relative h-[46vh] min-h-72 w-full overflow-hidden sm:h-[56vh]">
        <img src={tour.image} alt={tour.name[lang]} className="size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-6xl px-4 pb-8 sm:px-6">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-foam/80">
            {categoryLabel(tour.category, lang)}
          </p>
          <h1 className="mt-1 font-display text-4xl tracking-tight text-foam sm:text-5xl">
            {tour.name[lang]}
          </h1>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <article>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-[var(--radius-sm)] bg-teal px-2 font-medium tabular-nums text-foam">
              {tour.rating.toFixed(1)}
            </span>
            <CircleRating value={tour.rating} />
            <span className="text-sm text-muted">
              {tour.rating.toFixed(1)} ·{" "}
              {tour.reviewCount.toLocaleString(lang === "es" ? "es-MX" : "en-US")}{" "}
              {copy.travelerReviewsShort[lang]}
            </span>
          </div>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            {tour.description[lang]}
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            <Meta icon={Clock} label={copy.metaDuration[lang]} value={tour.duration[lang]} />
            <Meta icon={MapPin} label={copy.metaLocation[lang]} value={tour.location[lang]} />
            <Meta icon={Users} label={copy.metaGroup[lang]} value={tour.groupSize[lang]} />
            <Meta icon={Languages} label={copy.metaLanguages[lang]} value={tour.languages[lang]} />
          </ul>

          {tour.lastMinute ? (
            <div className="mt-8 rounded-[var(--radius-lg)] bg-warn-soft p-5">
              <p className="text-sm font-medium text-warn">
                {tour.lastMinute.departs === "hoy" ? copy.dealToday[lang] : copy.dealTomorrow[lang]}
              </p>
              <p className="mt-1 text-sm text-ink-soft">
                {copy.seatsLeftPrefix[lang] ? `${copy.seatsLeftPrefix[lang]} ` : ""}
                {tour.lastMinute.seats} {copy.seatsWord[lang]} · −{tour.lastMinute.discountPct}% ·{" "}
                {copy.closesIn[lang]} <Countdown departs={tour.lastMinute.departs} />
              </p>
            </div>
          ) : null}

          <ul className="mt-8 flex flex-wrap gap-2">
            {tour.highlights.map((h) => (
              <li
                key={h.es}
                className="rounded-full bg-surface px-3 py-1.5 text-sm text-ink-soft"
              >
                {h[lang]}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 font-display text-2xl tracking-tight">{copy.whatsIncluded[lang]}</h2>
          <ul className="mt-4 space-y-2">
            {tour.includes.map((item) => (
              <li key={item.es} className="flex items-start gap-2 text-sm text-ink-soft">
                <Check size={16} className="mt-0.5 shrink-0 text-teal" />
                {item[lang]}
              </li>
            ))}
          </ul>

          <h2 className="mt-8 font-display text-2xl tracking-tight">{copy.notIncludedTitle[lang]}</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
            {tour.notIncluded.map((item) => (
              <li key={item.es}>{item[lang]}</li>
            ))}
          </ul>

          <h2 className="mt-8 font-display text-2xl tracking-tight">
            {lang === "es" ? "Itinerario" : "Itinerary"}
          </h2>
          <div className="mt-4">
            <TourItinerary stops={tour.stops} />
          </div>

          <h2 className="mt-8 font-display text-2xl tracking-tight">{copy.meetingPoint[lang]}</h2>
          <p className="mt-2 text-sm text-ink-soft">{tour.meeting[lang]}</p>
          <div className="mt-3">
            <PlaceMap query={tour.meetingQuery} />
          </div>
        </article>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[var(--radius-xl)] bg-bg-elevated p-5 shadow-[var(--shadow-lift)]">
            <div className="flex items-end justify-between gap-3">
              <div>
                {!isPrivate && tour.originalPrice && tour.originalPrice > tour.price ? (
                  <p className="text-sm text-muted line-through">{formatUsd(tour.originalPrice, lang)}</p>
                ) : null}
                <p className="font-display text-4xl tracking-tight">
                  {isPrivate ? formatUsd(total, lang) : formatUsd(tour.price, lang)}
                </p>
                <p className="text-xs text-muted">
                  {isPrivate ? copy.perAdult[lang] : copy.perAdultChild[lang]}
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
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
                          : "bg-surface text-ink-soft"
                      }`}
                    >
                      {t === "compartido" ? copy.sharedTour[lang] : copy.privateTour[lang]}
                    </button>
                  ))}
                </div>
                {isPrivate ? (
                  <p className="mt-2 text-xs text-muted">{copy.privateOnlyCard[lang]}</p>
                ) : null}
              </div>
              <div>
                <Label htmlFor="date">{copy.dateLabel[lang]}</Label>
                <Input
                  id="date"
                  type="date"
                  className="mt-1.5"
                  min={minDate}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                {isPrivate ? (
                  <p className="mt-1.5 text-xs text-muted">
                    {copy.privateAdvanceNotice[lang]} {tour.private.minAdvanceDays}{" "}
                    {copy.privateAdvanceDaysWord[lang]}
                  </p>
                ) : null}
              </div>
              <Qty label={copy.adults[lang]} value={adults} min={1} onChange={setAdults} />
              <Qty label={copy.children[lang]} value={children} min={0} onChange={setChildren} />
              <div>
                <Label htmlFor="pickup">{copy.pickupHotelLabel[lang]}</Label>
                <div className="mt-1.5">
                  <PickupSelect value={pickup} onChange={setPickup} />
                </div>
                {pickup ? (
                  <div className="mt-2">
                    <PlaceMap query={`${pickup}, Cancún, México`} className="h-36 w-full rounded-[var(--radius-md)] border-0" />
                  </div>
                ) : null}
              </div>
            </div>

            {underMinGuarantee ? (
              <p className="mt-4 rounded-[var(--radius-md)] bg-warn-soft p-3 text-xs text-ink">
                {copy.privateMinNote[lang]}
              </p>
            ) : null}

            <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm text-muted">{copy.total[lang]}</span>
              <span className="font-display text-2xl tabular-nums tracking-tight">
                {formatUsd(total, lang)}
              </span>
            </div>

            {error ? <p className="mt-2 text-sm text-warn">{error}</p> : null}

            <Button className="mt-4 w-full" size="lg" onClick={book} disabled={adults < 1}>
              {copy.bookNow[lang]}
            </Button>
            <p className="mt-3 text-center text-xs text-muted">{copy.cancelNote[lang]}</p>
          </div>
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg/95 p-3 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-1">
          <div>
            <p className="font-display text-xl tabular-nums leading-none">{formatUsd(total, lang)}</p>
            <p className="mt-0.5 text-xs text-muted">
              {copy.totalPrefix[lang]} {adults + children} {copy.travelersWord[lang]}
            </p>
          </div>
          <Button size="lg" onClick={book} disabled={adults < 1}>
            {copy.book[lang]}
          </Button>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 pb-28 sm:px-6 lg:pb-16">
        <h2 className="font-display text-2xl tracking-tight">{copy.alsoLike[lang]}</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((t) => (
            <TourCard key={t.slug} tour={t} />
          ))}
        </div>
      </section>
    </main>
  );
}

function Meta({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <li className="flex items-start gap-3 rounded-[var(--radius-md)] bg-bg-elevated p-3 shadow-[var(--shadow-border)]">
      <Icon size={18} className="mt-0.5 text-teal" />
      <div>
        <p className="text-xs text-muted">{label}</p>
        <p className="text-sm text-ink">{value}</p>
      </div>
    </li>
  );
}
