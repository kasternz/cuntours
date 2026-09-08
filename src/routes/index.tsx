import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Clock, Shield, Waves } from "lucide-react";
import { TourCard } from "@/components/tour-card";
import { ReviewCard } from "@/components/review-card";
import { TravelerRating, CircleRating } from "@/components/traveler-rating";
import { Countdown } from "@/components/countdown";
import { FaqList } from "@/components/faq-list";
import { lastMinuteTours, tours, categoryLabel, totalReviewCount } from "@/lib/tours";
import { averageRating, ratingDistribution, reviews, ratingLabel } from "@/lib/reviews";
import { formatUsd } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const flash = lastMinuteTours();
  const avg = averageRating();
  const dist = ratingDistribution();
  const featured = tours.filter((t) => !t.lastMinute).slice(0, 6);
  const published = totalReviewCount();

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
            Tours de último día, compra directa.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-foam/85 sm:text-lg">
            Catamarán, cenotes, Chichén Itzá y Tulum. Operadora local: eliges,
            pagas aquí y mañana estás en el agua o frente a la pirámide.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#ultimo-dia"
              className="inline-flex h-12 items-center rounded-[var(--radius-md)] bg-bg px-5 text-sm font-medium text-ink transition-transform duration-150 ease-out hover:bg-bg-elevated active:scale-[0.96]"
            >
              Ofertas de hoy
            </a>
            <Link
              to="/tours"
              className="inline-flex h-12 items-center gap-2 rounded-[var(--radius-md)] px-5 text-sm font-medium text-foam ring-1 ring-foam/35 transition-transform duration-150 ease-out hover:bg-foam/10 active:scale-[0.96]"
            >
              Ver catálogo
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4 text-sm text-foam/85">
            <span className="inline-flex items-center gap-3">
              <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-[var(--radius-sm)] bg-teal px-2 font-medium tabular-nums text-foam">
                {avg.toFixed(1)}
              </span>
              <span>
                <span className="flex items-center gap-2">
                  <CircleRating value={avg} size={12} tone="onDark" />
                  <span className="font-medium text-foam">{ratingLabel(avg)}</span>
                </span>
                <span className="mt-0.5 block text-foam/70">
                  {published.toLocaleString("es-MX")} reseñas de viajeros · Riviera Maya
                </span>
              </span>
            </span>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-bg-elevated">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-5 sm:grid-cols-3 sm:px-6">
          {[
            { icon: Clock, t: "Último día", d: "Asientos que salen hoy o mañana" },
            { icon: Shield, t: "Compra directa", d: "Sin marketplace. Confirmación al instante" },
            { icon: Waves, t: "Mar y ruinas", d: "Acuáticos y arqueológicos, un solo operador" },
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
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-teal">Último día</p>
            <h2 className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">
              Sale hoy. Quedan asientos.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Precio de cierre para salidas con lugares libres. El reloj corre hasta las 18:00.
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {flash.map((tour) => (
            <article
              key={tour.slug}
              className="flex flex-col overflow-hidden rounded-[var(--radius-lg)] bg-bg-elevated shadow-[var(--shadow-border)]"
            >
              <Link to="/tours/$slug" params={{ slug: tour.slug }} className="block">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={tour.image} alt={tour.name} className="size-full object-cover" />
                  <span className="absolute left-3 top-3 rounded-full bg-warn px-2.5 py-1 text-xs font-medium text-bg-elevated">
                    −{tour.lastMinute?.discountPct}% ·{" "}
                    {tour.lastMinute?.departs === "hoy" ? "Hoy" : "Mañana"}
                  </span>
                </div>
              </Link>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <p className="text-xs uppercase tracking-wider text-muted">
                  {categoryLabel(tour.category)}
                </p>
                <h3 className="font-display text-2xl leading-snug tracking-tight">{tour.name}</h3>
                <p className="text-sm text-muted">
                  Quedan {tour.lastMinute?.seats} asientos · cierra en{" "}
                  <Countdown departs={tour.lastMinute!.departs} />
                </p>
                <div className="mt-auto flex items-end justify-between pt-2">
                  <div>
                    <p className="text-xs text-muted line-through">
                      {formatUsd(tour.originalPrice ?? tour.price)}
                    </p>
                    <p className="font-display text-3xl tracking-tight">{formatUsd(tour.price)}</p>
                  </div>
                  <Link
                    to="/tours/$slug"
                    params={{ slug: tour.slug }}
                    className="inline-flex h-11 items-center rounded-[var(--radius-md)] bg-teal px-4 text-sm font-medium text-foam transition-transform duration-150 ease-out hover:bg-teal-deep active:scale-[0.96]"
                  >
                    Comprar
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
              <p className="text-sm uppercase tracking-[0.16em] text-foam/80">Agua</p>
              <h2 className="mt-1 font-display text-3xl tracking-tight">Actividades acuáticas</h2>
              <p className="mt-2 max-w-sm text-sm text-foam/80">
                Catamarán, arrecife, tiburón ballena, cenotes y Cozumel.
              </p>
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
              <p className="text-sm uppercase tracking-[0.16em] text-foam/80">Piedra</p>
              <h2 className="mt-1 font-display text-3xl tracking-tight">Tours arqueológicos</h2>
              <p className="mt-2 max-w-sm text-sm text-foam/80">
                Chichén Itzá, Tulum, Cobá y Ek Balam con guía certificado.
              </p>
            </div>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">El catálogo</h2>
          <Link to="/tours" className="inline-flex items-center gap-1 text-sm font-medium text-teal">
            Ver todos <ArrowRight size={14} />
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
          <h2 className="font-display text-3xl tracking-tight">Tres pasos, sin WhatsApp eterno</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { n: "01", t: "Elige", d: "Acuático o arqueológico. Filtra por último día si sales mañana." },
              { n: "02", t: "Compra", d: "Fecha, hotel de recogida y pago aquí. Confirmación al instante." },
              { n: "03", t: "Sale", d: "Te recogemos. Guía certificado. Cancelación gratis 24 h antes." },
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
        <div className="grid gap-10 lg:grid-cols-[minmax(0,300px)_1fr]">
          <div>
            <TravelerRating average={avg} count={published} distribution={dist} />
            <Link
              to="/resenas"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal"
            >
              Ver todas las reseñas <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {reviews.slice(0, 6).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <h2 className="font-display text-3xl tracking-tight">Preguntas de último minuto</h2>
        <div className="mt-8">
          <FaqList />
        </div>
      </section>

      <section className="bg-ink text-foam">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="font-display text-3xl tracking-tight">¿Llegaste ayer y no tienes plan?</h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-foam/75">
              Las ofertas de último día se liberan cada mañana. Recogida en hotel incluida.
            </p>
            <ul className="mt-4 space-y-1.5 text-sm text-foam/80">
              {["Guía certificado INAH / marina", "Grupos chicos", "Cancelación 24 h"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check size={16} className="text-lagoon" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <a
            href="#ultimo-dia"
            className="inline-flex h-12 items-center rounded-[var(--radius-md)] bg-foam px-6 text-sm font-medium text-ink transition-transform duration-150 ease-out hover:bg-bg active:scale-[0.96]"
          >
            Ver salidas de hoy
          </a>
        </div>
      </section>
    </main>
  );
}