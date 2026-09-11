import type { TourStop } from "@/lib/tours";
import { useLang } from "@/i18n/context";

export function TourItinerary({ stops }: { stops: TourStop[] }) {
  const { lang } = useLang();
  if (!stops.length) return null;

  return (
    <ol className="relative">
      {stops.map((stop, i) => {
        const isLast = i === stops.length - 1;
        return (
          <li key={stop.name.es} className="relative flex gap-4 pb-8 last:pb-0">
            {!isLast ? (
              <span className="absolute left-[15px] top-8 h-[calc(100%-1.5rem)] w-px bg-border" />
            ) : null}
            <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-teal text-sm font-medium text-foam">
              {i + 1}
            </span>
            <div className="pt-0.5">
              <p className="font-medium text-ink">{stop.name[lang]}</p>
              <p className="mt-1 text-sm text-muted">{stop.description[lang]}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
