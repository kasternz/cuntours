import { Link } from "@tanstack/react-router";
import { TripAdvisorBadge } from "@/components/tripadvisor-badge";
import { useLang } from "@/i18n/context";
import { copy } from "@/i18n/copy";

export function SiteFooter() {
  const { lang } = useLang();
  return (
    <footer className="mt-auto border-t border-border bg-teal-deep text-foam">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <img
            src="/brand/cuntours-logo-white.png"
            alt="Cuntours"
            className="h-8 w-auto object-contain"
          />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-foam/75">
            {copy.footerBlurb[lang]}
          </p>
          <div className="mt-4">
            <TripAdvisorBadge tone="onDark" size="sm" />
          </div>
        </div>
        <div>
          <p className="text-sm font-medium">{copy.explore[lang]}</p>
          <ul className="mt-3 space-y-2 text-sm text-foam/80">
            <li>
              <Link to="/tours" className="hover:text-foam">
                {copy.allTours[lang]}
              </Link>
            </li>
            <li>
              <a href="/tours?cat=acuatico" className="hover:text-foam">
                {copy.waterActivities[lang]}
              </a>
            </li>
            <li>
              <a href="/tours?cat=arqueologico" className="hover:text-foam">
                {copy.archTours[lang]}
              </a>
            </li>
            <li>
              <Link to="/resenas" className="hover:text-foam">
                {copy.travelerReviews[lang]}
              </Link>
            </li>
            <li>
              <a href="/#ultimo-dia" className="hover:text-foam">
                {copy.lastMinuteDeals[lang]}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium">{copy.operations[lang]}</p>
          <p className="mt-3 text-sm leading-relaxed text-foam/75">
            {copy.operationsLocation[lang]}
            <br />
            {copy.operationsPickup[lang]}
            <br />
            {copy.operationsCancel[lang]}
          </p>
        </div>
      </div>
      <div className="border-t border-foam/10 px-4 py-4 text-center text-xs text-foam/55">
        {copy.footerTagline[lang]}
      </div>
    </footer>
  );
}
