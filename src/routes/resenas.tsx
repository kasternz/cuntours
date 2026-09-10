import { createFileRoute, Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { CircleRating } from "@/components/traveler-rating";
import { tripAdvisor } from "@/lib/tripadvisor";

export const Route = createFileRoute("/resenas")({ component: ResenasPage });

function ResenasPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <p className="text-sm font-medium uppercase tracking-[0.16em] text-teal">Viajeros</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">
        Lo que dicen nuestros viajeros
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
        Nuestras reseñas reales viven en TripAdvisor, verificadas por ellos — no aquí en
        forma de texto, para que siempre veas la fuente original.
      </p>

      <div className="mt-10 rounded-[var(--radius-xl)] bg-bg-elevated p-8 text-center shadow-[var(--shadow-border)] sm:p-10">
        <p className="font-display text-6xl leading-none tracking-tight tabular-nums">
          {tripAdvisor.rating}
        </p>
        <div className="mt-3 flex items-center justify-center">
          <CircleRating value={tripAdvisor.rating} size={20} />
        </div>
        <p className="mt-3 text-sm text-muted">
          {tripAdvisor.reviewCount} reseñas en TripAdvisor
        </p>
        <a
          href={tripAdvisor.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex h-12 items-center gap-2 rounded-[var(--radius-md)] bg-teal px-6 text-sm font-medium text-foam transition-transform duration-150 ease-out hover:bg-teal-deep active:scale-[0.96]"
        >
          <Star size={16} className="fill-current" />
          Ver todas las reseñas en TripAdvisor
        </a>
      </div>

      <p className="mt-6 text-center text-sm text-muted">
        ¿Sales mañana?{" "}
        <Link to="/" hash="ultimo-dia" className="font-medium text-teal">
          Ofertas de último día
        </Link>
      </p>
    </main>
  );
}
