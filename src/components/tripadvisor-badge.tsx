import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { tripAdvisor } from "@/lib/tripadvisor";

/**
 * Links out to the real Cuntours TripAdvisor profile. Never pair this with
 * invented review text — the whole point is that every number here is real
 * and verifiable by clicking through.
 */
export function TripAdvisorBadge({
  size = "md",
  tone = "default",
  className,
}: {
  size?: "sm" | "md";
  tone?: "default" | "onDark";
  className?: string;
}) {
  const text = tone === "onDark" ? "text-foam" : "text-ink";
  const sub = tone === "onDark" ? "text-foam/70" : "text-muted";
  const star = tone === "onDark" ? "text-foam" : "text-teal";

  return (
    <a
      href={tripAdvisor.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 rounded-[var(--radius-md)] transition-opacity hover:opacity-80",
        size === "sm" ? "text-xs" : "text-sm",
        className,
      )}
    >
      <Star size={size === "sm" ? 14 : 16} className={cn(star, "fill-current")} />
      <span className={cn("font-medium tabular-nums", text)}>{tripAdvisor.rating}</span>
      <span className={sub}>
        · {tripAdvisor.reviewCount} reseñas en TripAdvisor
      </span>
    </a>
  );
}
