import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Clock, Shield, Waves } from "lucide-react";
import { Star } from "lucide-react";
import { TourCard } from "@/components/tour-card";
import { CircleRating } from "@/components/traveler-rating";
import { Countdown } from "@/components/countdown";
import { FaqList } from "@/components/faq-list";
import { lastMinuteTours, categoryLabel, useTours } from "@/lib/tours";
import { tripAdvisor } from "@/lib/tripadvisor";
import { formatUsd } from "@/lib/utils";
import { useLang } from "@/i18n/context";
import { copy } from "@/i18n/copy";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { lang } = useLang();
  const tours = useTours();
  const flash = lastMinuteTours(tours);
  const featured = tours.filter((t) => !t.lastMinute).slice(0, 6);

  return (
    <main>
      <section className="relative min-h-[78vh] overflow-hidden">
        <img
          src="/images/hero-riviera.jpg"
          alt="Costa de la Riviera Maya vista desde el aire"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-foam/80">
            Cancún · Riviera Maya
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-foam sm:text-6xl">
            {copy.heroTitle[lang]}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-foam/85 sm:text-lg">
            {copy.heroLead[lang]}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#ultimo-dia"
              className="inline-flex h-12 items-center rounded-[var(--radius-md)] bg-bg px-5 text-sm font-medium text-ink transition-transform duration-150 ease-out hover:bg-bg-elevated active:scale-[0.96]"
            >
              {copy.todaysDeals[lang]}
            </a>
            <Link
              to="/tours"
              className="inline-flex h-12 items-center gap-2 rounded-[var(--radius-md)] px-5 text-sm font-medium text-foam ring-1 ring-foam/35 transition-transform duration-150 ease-out hover:bg-foam/10 active:scale-[0.96]"
            >
              {copy.viewCatalog[lang]}
              <ArrowRight size={16} />
            </Link>
          </div>
          <a
            href={tripAdvisor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 text-sm text-foam/85 transition-opacity hover:opacity-80"
          >
            <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-[var(--radius-sm)] bg-teal px-2 font-medium tabular-nums text-foam">
              {tripAdvisor.rating}
            </span>
            <span>
              <span className="flex items-center gap-2">
                <Star size={14} className="fill-current text-foam" />
                <span className="font-medium text-foam">TripAdvisor</span>
              </span>
              <span className="mt-0.5 block text-foam/70">
                {tripAdvisor.reviewCount} {copy.reviewsOnTripAdvisor[lang]}
              </span>
            </span>
          </a>
        </div>
      </section>

      <section className="border-b border-border bg-bg-elevated">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-5 sm:grid-cols-3 sm:px-6">
          {[
            { icon: Clock, t: copy.featLastMinuteT[lang], d: copy.featLastMinuteD[lang] },
            { icon: Shield, t: copy.featDirectT[lang], d: copy.featDirectD[lang] },
            { icon: Waves, t: copy.featSeaT[lang], d: copy.featSeaD[lang] },
          ].map((item) => (
            <div key={item.t} className="flex items-start gap-3">
              <item.icon className="mt-0.5 size-5 text-teal" strokeWidth={1.7} />
              <div>
                <p className="text-sm font-medium text-ink">{item.t}</p>
                <p className="text-sm text-muted">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="ultimo-dia" className="scroll-mt-24 mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-teal">
              {copy.lastMinuteEyebrow[lang]}
            </p>
            <h2 className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">
              {copy.lastMinuteTitle[lang]}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">{copy.lastMinuteLead[lang]}</p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {flash.map((tour) => (
            <article
              key={tour.slug}
              className="flex flex-col overflow-hidden rounded-[var(--radius-lg)] bg-bg-elevated shadow-[var(--shadow-border)]"
            >
              <Link to="/tours/$slug" params={{ slug: tour.slug }} className="block">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={tour.image} alt={tour.name[lang]} className="size-full object-cover" />
                  <span className="absolute left-3 top-3 rounded-full bg-warn px-2.5 py-1 text-xs font-medium text-bg-elevated">
                    −{tour.lastMinute?.discountPct}% ·{" "}
                    {tour.lastMinute?.departs === "hoy" ? copy.todayBadge[lang] : copy.tomorrowBadge[lang]}
                  </span>
                </div>
              </Link>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <p className="text-xs uppercase tracking-wider text-muted">
                  {categoryLabel(tour.category, lang)}
                </p>
                <h3 className="font-display text-2xl leading-snug tracking-tight">{tour.name[lang]}</h3>
                <p className="text-sm text-muted">
                  {copy.seatsLeftPrefix[lang] ? `${copy.seatsLeftPrefix[lang]} ` : ""}
                  {tour.lastMinute?.seats} {copy.seatsWord[lang]} · {copy.closesIn[lang]}{" "}
                  <Countdown departs={tour.lastMinute!.departs} />
                </p>
                <div className="mt-auto flex items-end justify-between pt-2">
                  <div>
                    <p className="text-xs text-muted line-through">
                      {formatUsd(tour.originalPrice ?? tour.price, lang)}
                    </p>
                    <p className="font-display text-3xl tracking-tight">{formatUsd(tour.price, lang)}</p>
                  </div>
                  <Link
                    to="/tours/$slug"
                    params={{ slug: tour.slug }}
                    className="inline-flex h-11 items-center rounded-[var(--radius-md)] bg-teal px-4 text-sm font-medium text-foam transition-transform duration-150 ease-out hover:bg-teal-deep active:scale-[0.96]"
                  >
                    {copy.buy[lang]}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-teal-deep text-foam">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-2">
          <Link
            to="/tours"
            search={{ cat: "acuatico" }}
            className="group relative min-h-64 overflow-hidden rounded-[var(--radius-xl)]"
          >
            <img
              src="/images/cenotes.jpg"
              alt="Cenote en la selva de Quintana Roo"
              className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-ink/45" />
            <div className="relative flex h-full min-h-64 flex-col justify-end p-7">
              <p className="text-sm uppercase tracking-[0.16em] text-foam/80">{copy.waterEyebrow[lang]}</p>
              <h2 className="mt-1 font-display text-3xl tracking-tight">{copy.waterTitle[lang]}</h2>
              <p className="mt-2 max-w-sm text-sm text-foam/80">{copy.waterDesc[lang]}</p>
            </div>
          </Link>
          <Link
            to="/tours"
            search={{ cat: "arqueologico" }}
            className="group relative min-h-64 overflow-hidden rounded-[var(--radius-xl)]"
          >
            <img
              src="/images/chichen-itza.jpg"
              alt="Pirámide de Chichén Itzá al amanecer"
              className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-ink/45" />
            <div className="relative flex h-full min-h-64 flex-col justify-end p-7">
              <p className="text-sm uppercase tracking-[0.16em] text-foam/80">{copy.stoneEyebrow[lang]}</p>
              <h2 className="mt-1 font-display text-3xl tracking-tight">{copy.stoneTitle[lang]}</h2>
              <p className="mt-2 max-w-sm text-sm text-foam/80">{copy.stoneDesc[lang]}</p>
            </div>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">{copy.theCatalog[lang]}</h2>
          <Link to="/tours" className="inline-flex items-center gap-1 text-sm font-medium text-teal">
            {copy.viewAll[lang]} <ArrowRight size={14} />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-bg-elevated">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl tracking-tight">{copy.threeStepsTitle[lang]}</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { n: "01", t: copy.step1[lang], d: copy.step1D[lang] },
              { n: "02", t: copy.step2[lang], d: copy.step2D[lang] },
              { n: "03", t: copy.step3[lang], d: copy.step3D[lang] },
            ].map((step) => (
              <li key={step.n} className="rounded-[var(--radius-lg)] bg-bg p-6 shadow-[var(--shadow-border)]">
                <p className="font-display text-sm tabular-nums text-teal">{step.n}</p>
                <h3 className="mt-3 font-display text-2xl tracking-tight">{step.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="resenas" className="scroll-mt-24 mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-teal">
          {copy.travelers[lang]}
        </p>
        <h2 className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">
          {copy.whatTravelersSay[lang]}
        </h2>
        <div className="mt-8 flex flex-col items-center gap-4 rounded-[var(--radius-xl)] bg-bg-elevated p-8 text-center shadow-[var(--shadow-border)] sm:p-10">
          <p className="font-display text-6xl leading-none tracking-tight tabular-nums">
            {tripAdvisor.rating}
          </p>
          <CircleRating value={tripAdvisor.rating} size={20} />
          <p className="text-sm text-muted">
            {tripAdvisor.reviewCount} {copy.reviewsOnTripAdvisor[lang]}
          </p>
          <a
            href={tripAdvisor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-[var(--radius-md)] bg-teal px-6 text-sm font-medium text-foam transition-transform duration-150 ease-out hover:bg-teal-deep active:scale-[0.96]"
          >
            <Star size={16} className="fill-current" />
            {copy.seeAllOnTripAdvisor[lang]}
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <h2 className="font-display text-3xl tracking-tight">{copy.faqTitle[lang]}</h2>
        <div className="mt-8">
          <FaqList />
        </div>
      </section>

      <section className="bg-ink text-foam">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="font-display text-3xl tracking-tight">{copy.finalCtaTitle[lang]}</h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-foam/75">
              {copy.finalCtaBody[lang]}
            </p>
            <ul className="mt-4 space-y-1.5 text-sm text-foam/80">
              {[copy.finalCtaBullet1[lang], copy.finalCtaBullet2[lang], copy.finalCtaBullet3[lang]].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Check size={16} className="text-lagoon" /> {t}
                  </li>
                ),
              )}
            </ul>
          </div>
          <a
            href="#ultimo-dia"
            className="inline-flex h-12 items-center rounded-[var(--radius-md)] bg-foam px-6 text-sm font-medium text-ink transition-transform duration-150 ease-out hover:bg-bg active:scale-[0.96]"
          >
            {copy.finalCtaButton[lang]}
          </a>
        </div>
      </section>
    </main>
  );
}
