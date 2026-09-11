import { Link, useRouterState } from "@tanstack/react-router";
import { lastMinuteTours, useTours } from "@/lib/tours";
import { Countdown } from "./countdown";
import { useLang } from "@/i18n/context";
import { copy } from "@/i18n/copy";

export function LastMinuteStrip() {
  const { lang } = useLang();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const tours = useTours();
  const flash = lastMinuteTours(tours);
  if (!flash.length) return null;
  if (pathname.startsWith("/checkout") || pathname.startsWith("/confirmacion")) return null;

  const soonest = flash.find((t) => t.lastMinute?.departs === "hoy") ?? flash[0];
  const seats = flash.reduce((s, t) => s + (t.lastMinute?.seats ?? 0), 0);

  return (
    <div className="bg-teal-deep text-foam">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-sm sm:px-6">
        <p className="min-w-0">
          <span className="font-medium">{copy.lastMinuteEyebrow[lang]}.</span>{" "}
          <span className="text-foam/80">
            {seats} {copy.seatsWord[lang]} · {copy.closesIn[lang]}{" "}
            <Countdown departs={soonest.lastMinute!.departs} />
          </span>
        </p>
        <Link
          to="/"
          hash="ultimo-dia"
          className="shrink-0 font-medium text-foam underline-offset-4 hover:underline"
        >
          {copy.seeDeals[lang]}
        </Link>
      </div>
    </div>
  );
}
