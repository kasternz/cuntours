import { Link } from "@tanstack/react-router";
import type { Review } from "@/lib/reviews";
import { getTour } from "@/lib/tours";
import { initials } from "@/lib/utils";
import { CircleRating } from "./traveler-rating";

export function ReviewCard({ review }: { review: Review }) {
  const tour = getTour(review.tourSlug);
  return (
    <article className="flex h-full flex-col rounded-[var(--radius-lg)] bg-bg-elevated p-5 shadow-[var(--shadow-border)]">
      <div className="flex items-start gap-3">
        <span
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-foam text-sm font-medium text-teal-deep"
          aria-hidden
        >
          {initials(review.author)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-ink">{review.author}</p>
          <p className="text-xs text-muted">
            {review.origin} · {review.date}
          </p>
        </div>
        <span className="rounded-full bg-surface px-2.5 py-1 text-xs text-ink-soft">
          {review.travelerType}
        </span>
      </div>
      <div className="mt-3">
        <CircleRating value={review.rating} size={13} />
      </div>
      <h3 className="mt-3 font-display text-lg leading-snug tracking-tight text-ink">{review.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{review.body}</p>
      {tour ? (
        <Link
          to="/tours/$slug"
          params={{ slug: tour.slug }}
          className="mt-4 text-sm font-medium text-teal hover:text-teal-deep"
        >
          {tour.name}
        </Link>
      ) : null}
    </article>
  );
}