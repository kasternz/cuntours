import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, Clock, Languages, MapPin, Users } from "lucide-react";
import { useState } from "react";
import { Countdown } from "@/components/countdown";
import { Qty } from "@/components/qty";
import { ReviewCard } from "@/components/review-card";
import { CircleRating } from "@/components/traveler-rating";
import { TourCard } from "@/components/tour-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/lib/cart";
import { reviewsForTour } from "@/lib/reviews";
import {
  categoryLabel,
  getTour,
  relatedTours,
  tourPrice,
} from "@/lib/tours";
import { formatUsd, todayIso } from "@/lib/utils";

export const Route = createFileRoute("/tours/$slug")({
  component: TourDetail,
});

function TourDetail() {
  const { slug } = Route.useParams();
  const tour = getTour(slug);
  const navigate = useNavigate();
  const setDraft = useCart((s) => s.setDraft);

  const [date, setDate] = useState(() =>
    tour?.lastMinute?.departs === "hoy" ? todayIso(0) : todayIso(1),
  );
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [pickup, setPickup] = useState("");

  if (!tour) {
    return (
      <main className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl tracking-tight">Tour no encontrado</h1>
        <p className="mt-3 text-muted">Ese enlace ya no existe o cambió de nombre.</p>
        <Link to="/tours" className="mt-6 inline-flex text-sm font-medium text-teal">
          Volver al catálogo
        </Link>
      </main>
    );
  }

  const total = tourPrice(tour, adults, children);
  const tourReviews = reviewsForTour(tour.slug);
  const related = relatedTours(tour.slug);
  const minDate = tour.lastMinute?.departs === "hoy" ? todayIso(0) : todayIso(0);

  function book() {
    if (adults + children < 1) return;
    setDraft({
      tourSlug: slug,
      date,
      adults,
      children,
      pickup: pickup.trim() || "Zona hotelera Cancún",
    });
    void navigate({ to: "/checkout" });
  }

  return (
    <main>
      <div className="relative h-[46vh] min-h-72 w-full overflow-hidden sm:h-[56vh]">
        <img src={tour.image} alt={tour.name} className="size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-6xl px-4 pb-8 sm:px-6">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-foam/80">
            {categoryLabel(tour.category)}
          </p>
          <h1 className="mt-1 font-display text-4xl tracking-tight text-foam sm:text-5xl">{tour.name}</h1>
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
              {tour.rating.toFixed(1)} · {tour.reviewCount.toLocaleString("es-MX")} reseñas de
              viajeros
            </span>
          </div>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{tour.description}</p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            <Meta icon={Clock} label="Duración" value={tour.duration} />
            <Meta icon={MapPin} label="Lugar" value={tour.location} />
            <Meta icon={Users} label="Grupo" value={tour.groupSize} />
            <Meta icon={Languages} label="Idiomas" value={tour.languages} />
          </ul>

          {tour.lastMinute ? (
            <div className="mt-8 rounded-[var(--radius-lg)] bg-warn-soft p-5">
              <p className="text-sm font-medium text-warn">
                Oferta de último {tour.lastMinute.departs === "hoy" ? "día" : "aviso"}
              </p>
              <p className="mt-1 text-sm text-ink-soft">
                Quedan {tour.lastMinute.seats} asientos · −{tour.lastMinute.discountPct}% · cierra
                en <Countdown departs={tour.lastMinute.departs} />
              </p>
            </div>
          ) : null}

          <ul className="mt-8 flex flex-wrap gap-2">
            {tour.highlights.map((h) => (
              <li
                key={h}
                className="rounded-full bg-surface px-3 py-1.5 text-sm text-ink-soft"
              >
                {h}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 font-display text-2xl tracking-tight">Qué incluye</h2>
          <ul className="mt-4 space-y-2">
            {tour.includes.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-ink-soft">
                <Check size={16} className="mt-0.5 shrink-0 text-teal" />
                {item}
              </li>
            ))}
          </ul>

          <h2 className="mt-8 font-display text-2xl tracking-tight">No incluye</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
            {tour.notIncluded.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2 className="mt-8 font-display text-2xl tracking-tight">Punto de encuentro</h2>
          <p className="mt-2 text-sm text-ink-soft">{tour.meeting}</p>

          {tourReviews.length > 0 ? (
            <section className="mt-12">
              <h2 className="font-display text-2xl tracking-tight">Reseñas de este tour</h2>
              <div className="mt-5 grid gap-4">
                {tourReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </section>
          ) : null}
        </article>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[var(--radius-xl)] bg-bg-elevated p-5 shadow-[var(--shadow-lift)]">
            <div className="flex items-end justify-between gap-3">
              <div>
                {tour.originalPrice && tour.originalPrice > tour.price ? (
                  <p className="text-sm text-muted line-through">{formatUsd(tour.originalPrice)}</p>
                ) : null}
                <p className="font-display text-4xl tracking-tight">{formatUsd(tour.price)}</p>
                <p className="text-xs text-muted">por adulto · niño 60%</p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <Label htmlFor="date">Fecha</Label>
                <Input
                  id="date"
                  type="date"
                  className="mt-1.5"
                  min={minDate}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <Qty label="Adultos" value={adults} min={1} onChange={setAdults} />
              <Qty label="Niños" value={children} min={0} onChange={setChildren} />
              <div>
                <Label htmlFor="pickup">Hotel de recogida</Label>
                <Input
                  id="pickup"
                  className="mt-1.5"
                  placeholder="Ej. Grand Fiesta Americana"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm text-muted">Total</span>
              <span className="font-display text-2xl tabular-nums tracking-tight">{formatUsd(total)}</span>
            </div>

            <Button className="mt-4 w-full" size="lg" onClick={book} disabled={adults < 1}>
              Reservar ahora
            </Button>
            <p className="mt-3 text-center text-xs text-muted">
              Cancelación gratis hasta 24 h antes. Confirmación inmediata.
            </p>
          </div>
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg/95 p-3 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-1">
          <div>
            <p className="font-display text-xl tabular-nums leading-none">{formatUsd(total)}</p>
            <p className="mt-0.5 text-xs text-muted">total · {adults + children} viajeros</p>
          </div>
          <Button size="lg" onClick={book} disabled={adults < 1}>
            Reservar
          </Button>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 pb-28 sm:px-6 lg:pb-16">
        <h2 className="font-display text-2xl tracking-tight">También te puede interesar</h2>
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
