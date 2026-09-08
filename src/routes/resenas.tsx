import { createFileRoute, Link } from "@tanstack/react-router";
import { ReviewCard } from "@/components/review-card";
import { TravelerRating } from "@/components/traveler-rating";
import { averageRating, ratingDistribution, reviews } from "@/lib/reviews";
import { totalReviewCount } from "@/lib/tours";

export const Route = createFileRoute("/resenas")({ component: ResenasPage });

function ResenasPage() {
  const avg = averageRating();
  const dist = ratingDistribution();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-sm font-medium uppercase tracking-[0.16em] text-teal">Viajeros</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">
        Reseñas de la Riviera Maya
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
        Opiniones de parejas, familias y viajeros solos que recorrieron Cancún, Tulum,
        Chichén Itzá y el arrecife — al estilo de las reseñas de TripAdvisor de la zona.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,300px)_1fr]">
        <div>
          <TravelerRating average={avg} count={totalReviewCount()} distribution={dist} />
          <p className="mt-6 text-sm text-muted">
            ¿Sales mañana?{" "}
            <Link to="/" hash="ultimo-dia" className="font-medium text-teal">
              Ofertas de último día
            </Link>
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </main>
  );
}
