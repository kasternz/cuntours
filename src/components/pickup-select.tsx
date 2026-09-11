import { useState } from "react";
import { Input } from "@/components/ui/input";
import { pickupPoints, pickupZoneLabel, type PickupZone } from "@/lib/pickup-points";
import { useLang } from "@/i18n/context";

const ZONES: PickupZone[] = ["CUN", "RM", "TULUM", "PA"];
const OTHER = "__other__";

export function PickupSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const { lang } = useLang();
  const [mode, setMode] = useState<"list" | "other">(value && !pickupPoints.some((p) => p.name === value) ? "other" : "list");

  return (
    <div className="space-y-2">
      <select
        className="flex h-11 w-full rounded-[var(--radius-md)] border border-border bg-bg px-3 text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-teal"
        value={mode === "other" ? OTHER : value}
        onChange={(e) => {
          if (e.target.value === OTHER) {
            setMode("other");
            onChange("");
          } else {
            setMode("list");
            onChange(e.target.value);
          }
        }}
      >
        <option value="" disabled>
          {lang === "es" ? "Selecciona tu hotel…" : "Select your hotel…"}
        </option>
        {ZONES.map((zone) => (
          <optgroup key={zone} label={pickupZoneLabel[zone][lang]}>
            {pickupPoints
              .filter((p) => p.zone === zone)
              .map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name}
                </option>
              ))}
          </optgroup>
        ))}
        <option value={OTHER}>
          {lang === "es" ? "Otro / no está en la lista" : "Other / not listed"}
        </option>
      </select>

      {mode === "other" ? (
        <Input
          autoFocus
          placeholder={
            lang === "es" ? "Escribe el nombre de tu hotel o Airbnb" : "Type your hotel or Airbnb name"
          }
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : null}
    </div>
  );
}
