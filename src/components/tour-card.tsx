import { Link } from "@tanstack/react-router";
import { Clock, MapPin } from "lucide-react";
import type { Tour } from "@/lib/tours";
import { categoryLabel } from "@/lib/tours";
import { formatUsd } from "@/lib/utils";
import { CircleRating } from "./traveler-rating";
import { useLang } from "@/i18n/context";
import { copy } from "@/i18n/copy";

export function TourCard({ tour, featured }: { tour: Tour; featured?: boolean }) {
  const { lang } = useLang();
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] bg-bg-elevated shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-200 ease-out hover:shadow-[var(--shadow-lift)]">
      <Link to="/tours/$slug" params={{ slug: tour.slug }} className="flex h-full flex-col">
        <div className="relative aspect-[3/2] overflow-hidden">
          <img
            src={tour.image}
            alt={tour.name[lang]}
            className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-bg/92 px-2.5 py-1 text-xs font-medium text-ink">
              {categoryLabel(tour.category, lang)}
            </span>
            {tour.lastMinute ? (
              <span className="rounded-full bg-warn px-2.5 py-1 text-xs font-medium text-bg-elevated">
                {copy.navLastMinute[lang]} ·{" "}
                {tour.lastMinute.departs === "hoy" ? copy.todayBadge[lang] : copy.tomorrowBadge[lang]}{" "}
                · −{tour.lastMinute.discountPct}%
              </span>
            ) : null}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
          <div>
            <h3 className="font-display text-xl leading-snug tracking-tight text-ink">
              {tour.name[lang]}
            </h3>
            <p className="mt-1 text-sm text-muted">{tour.tagline[lang]}</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CircleRating value={tour.rating} size={12} />
            <span className="tabular-nums text-ink-soft">{tour.rating.toFixed(1)}</span>
            <span className="text-muted">
              ({tour.reviewCount.toLocaleString(lang === "es" ? "es-MX" : "en-US")})
            </span>
          </div>
          <div className="mt-auto flex items-end justify-between gap-3 pt-1">
            <div className="flex flex-col gap-1 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5">
                <Clock size={13} /> {tour.duration[lang]}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={13} /> {tour.location[lang]}
              </span>
            </div>
            <div className="text-right">
              {tour.originalPrice && tour.originalPrice > tour.price ? (
                <p className="text-xs text-muted line-through">{formatUsd(tour.originalPrice)}</p>
              ) : null}
              <p className="font-display text-2xl leading-none tracking-tight text-ink">
                {formatUsd(tour.price)}
              </p>
              <p className="mt-0.5 text-xs text-muted">{copy.perAdult[lang]}</p>
            </div>
          </div>
          {featured ? (
            <span className="mt-1 inline-flex h-11 items-center justify-center rounded-[var(--radius-sm)] bg-teal text-sm font-medium text-foam">
              {copy.bookNow[lang]}
            </span>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
