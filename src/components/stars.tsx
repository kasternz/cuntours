import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({
  value,
  size = 14,
  className,
}: {
  value: number;
  size?: number;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-label={`${value} de 5`}>
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i + 1 <= Math.round(value);
        return (
          <Star
            key={i}
            width={size}
            height={size}
            strokeWidth={1.6}
            className={filled ? "fill-teal text-teal" : "text-border"}
          />
        );
      })}
    </span>
  );
}

export function RatingBubble({ value }: { value: number }) {
  const pct = Math.round((value / 5) * 100);
  return (
    <span
      className="inline-flex h-9 min-w-9 items-center justify-center rounded-[var(--radius-sm)] bg-teal px-2 font-medium tabular-nums text-foam"
      aria-label={`Calificación ${value} de 5`}
    >
      {value.toFixed(1)}
      <span className="sr-only"> ({pct}%)</span>
    </span>
  );
}
