import { Minus, Plus } from "lucide-react";

export function Qty({
  label,
  value,
  min = 0,
  max = 12,
  onChange,
}: {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm text-ink-soft">{label}</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-[var(--radius-sm)] bg-surface text-ink transition-transform duration-150 ease-out active:scale-[0.96] disabled:opacity-40"
          aria-label={`Menos ${label}`}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
        >
          <Minus size={16} />
        </button>
        <span className="w-6 text-center tabular-nums text-ink">{value}</span>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-[var(--radius-sm)] bg-surface text-ink transition-transform duration-150 ease-out active:scale-[0.96] disabled:opacity-40"
          aria-label={`Más ${label}`}
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
