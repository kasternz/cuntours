import { cn } from "@/lib/utils";

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


