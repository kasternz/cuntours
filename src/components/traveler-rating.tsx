import { cn } from "@/lib/utils";
import { ratingLabel } from "@/lib/reviews";

export function CircleRating({
  value,
  size = 16,
  className,
  tone = "default",
}: {
  value: number;
  size?: number;
  className?: string;
  tone?: "default" | "onDark";
}) {
  const empty = tone === "onDark" ? "bg-foam/30" : "bg-surface";
  const filled = tone === "onDark" ? "bg-foam" : "bg-teal";
  return (
    <span
      className={cn("inline-flex items-center gap-0.5", className)}
      aria-label={`${value} de 5`}
    >
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.min(1, Math.max(0, value - i));
        return (
          <span
            key={i}
            className={cn("relative inline-block overflow-hidden rounded-full", empty)}
            style={{ width: size, height: size }}
          >
            <span className={cn("absolute inset-y-0 left-0", filled)} style={{ width: `${fill * 100}%` }} />
          </span>
        );
      })}
    </span>
  );
}

export function TravelerRating({
  average,
  count,
  distribution,
}: {
  average: number;
  count: number;
  distribution: { stars: number; count: number }[];
}) {
  const total = Math.max(1, distribution.reduce((s, d) => s + d.count, 0));
  return (
    <div className="rounded-[var(--radius-xl)] bg-bg-elevated p-6 shadow-[var(--shadow-border)]">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-teal">
        Calificación de viajeros
      </p>
      <div className="mt-4 flex items-end gap-3">
        <p className="font-display text-5xl leading-none tracking-tight tabular-nums">
          {average.toFixed(1)}
        </p>
        <div className="pb-1">
          <p className="text-sm font-medium text-ink">{ratingLabel(average)}</p>
          <CircleRating value={average} size={14} />
        </div>
      </div>
      <p className="mt-3 text-sm text-muted">
        {count.toLocaleString("es-MX")} reseñas de Cancún y la Riviera Maya
      </p>
      <ul className="mt-5 space-y-2">
        {distribution.map((row) => (
          <li key={row.stars} className="flex items-center gap-3 text-sm">
            <span className="w-4 tabular-nums text-muted">{row.stars}</span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface">
              <span
                className="block h-full rounded-full bg-teal"
                style={{ width: `${(row.count / total) * 100}%` }}
              />
            </span>
            <span className="w-6 tabular-nums text-muted">{row.count}</span>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-xs leading-relaxed text-muted">
        Opiniones de viajeros al estilo de las plataformas de reseñas de la Riviera Maya
        (TripAdvisor y similares). No es un widget oficial.
      </p>
    </div>
  );
}
