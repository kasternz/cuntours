import { createFileRoute, Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { CircleRating } from "@/components/traveler-rating";
import { tripAdvisor } from "@/lib/tripadvisor";
import { useLang } from "@/i18n/context";
import { copy } from "@/i18n/copy";

export const Route = createFileRoute("/resenas")({ component: ResenasPage });

function ResenasPage() {
  const { lang } = useLang();
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <p className="text-sm font-medium uppercase tracking-[0.16em] text-teal">
        {copy.travelers[lang]}
      </p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">{copy.whatTravelersSay[lang]}</h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
        {copy.reviewsRealNote[lang]}
      </p>

      <div className="mt-10 rounded-[var(--radius-xl)] bg-bg-elevated p-8 text-center shadow-[var(--shadow-border)] sm:p-10">
        <p className="font-display text-6xl leading-none tracking-tight tabular-nums">
          {tripAdvisor.rating}
        </p>
        <div className="mt-3 flex items-center justify-center">
          <CircleRating value={tripAdvisor.rating} size={20} />
        </div>
        <p className="mt-3 text-sm text-muted">
          {tripAdvisor.reviewCount} {copy.reviewsOnTripAdvisor[lang]}
        </p>
        <a
          href={tripAdvisor.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex h-12 items-center gap-2 rounded-[var(--radius-md)] bg-teal px-6 text-sm font-medium text-foam transition-transform duration-150 ease-out hover:bg-teal-deep active:scale-[0.96]"
        >
          <Star size={16} className="fill-current" />
          {copy.seeAllOnTripAdvisor[lang]}
        </a>
      </div>

      <p className="mt-6 text-center text-sm text-muted">
        {copy.leavingTomorrow[lang]}{" "}
        <Link to="/" hash="ultimo-dia" className="font-medium text-teal">
          {copy.lastMinuteDeals[lang]}
        </Link>
      </p>
    </main>
  );
}
