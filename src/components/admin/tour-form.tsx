import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { Tour, Localized, TourStop } from "@/lib/tours";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "./image-upload";

function LocalizedInput({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: Localized;
  onChange: (v: Localized) => void;
  multiline?: boolean;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-1.5 grid gap-2 sm:grid-cols-2">
        {multiline ? (
          <>
            <textarea
              className="min-h-20 rounded-[var(--radius-md)] border border-border bg-bg p-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-teal"
              placeholder="Español"
              value={value.es}
              onChange={(e) => onChange({ ...value, es: e.target.value })}
            />
            <textarea
              className="min-h-20 rounded-[var(--radius-md)] border border-border bg-bg p-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-teal"
              placeholder="English"
              value={value.en}
              onChange={(e) => onChange({ ...value, en: e.target.value })}
            />
          </>
        ) : (
          <>
            <Input
              placeholder="Español"
              value={value.es}
              onChange={(e) => onChange({ ...value, es: e.target.value })}
            />
            <Input
              placeholder="English"
              value={value.en}
              onChange={(e) => onChange({ ...value, en: e.target.value })}
            />
          </>
        )}
      </div>
    </div>
  );
}

function LocalizedListEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: Localized[];
  onChange: (items: Localized[]) => void;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-1.5 space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <Input
              placeholder="Español"
              value={item.es}
              onChange={(e) => {
                const next = [...items];
                next[i] = { ...item, es: e.target.value };
                onChange(next);
              }}
            />
            <Input
              placeholder="English"
              value={item.en}
              onChange={(e) => {
                const next = [...items];
                next[i] = { ...item, en: e.target.value };
                onChange(next);
              }}
            />
            <button
              type="button"
              onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              className="shrink-0 text-warn"
              aria-label="Quitar"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...items, { es: "", en: "" }])}
          className="flex h-9 items-center gap-1.5 text-sm text-teal"
        >
          <Plus size={14} /> Agregar
        </button>
      </div>
    </div>
  );
}

function StopsEditor({
  stops,
  onChange,
}: {
  stops: TourStop[];
  onChange: (stops: TourStop[]) => void;
}) {
  return (
    <div>
      <Label>Itinerario (paradas)</Label>
      <div className="mt-1.5 space-y-3">
        {stops.map((stop, i) => (
          <div key={i} className="space-y-2 rounded-[var(--radius-md)] bg-bg p-3 shadow-[var(--shadow-border)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted">Parada {i + 1}</span>
              <button
                type="button"
                onClick={() => onChange(stops.filter((_, idx) => idx !== i))}
                className="text-warn"
                aria-label="Quitar parada"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <Input
                placeholder="Nombre (es)"
                value={stop.name.es}
                onChange={(e) => {
                  const next = [...stops];
                  next[i] = { ...stop, name: { ...stop.name, es: e.target.value } };
                  onChange(next);
                }}
              />
              <Input
                placeholder="Name (en)"
                value={stop.name.en}
                onChange={(e) => {
                  const next = [...stops];
                  next[i] = { ...stop, name: { ...stop.name, en: e.target.value } };
                  onChange(next);
                }}
              />
              <Input
                placeholder="Descripción (es)"
                value={stop.description.es}
                onChange={(e) => {
                  const next = [...stops];
                  next[i] = { ...stop, description: { ...stop.description, es: e.target.value } };
                  onChange(next);
                }}
              />
              <Input
                placeholder="Description (en)"
                value={stop.description.en}
                onChange={(e) => {
                  const next = [...stops];
                  next[i] = { ...stop, description: { ...stop.description, en: e.target.value } };
                  onChange(next);
                }}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            onChange([...stops, { name: { es: "", en: "" }, description: { es: "", en: "" } }])
          }
          className="flex h-9 items-center gap-1.5 text-sm text-teal"
        >
          <Plus size={14} /> Agregar parada
        </button>
      </div>
    </div>
  );
}

export function TourForm({
  initial,
  onSave,
  onDelete,
  saving,
  error,
}: {
  initial: Tour;
  onSave: (tour: Tour) => void;
  onDelete?: () => void;
  saving: boolean;
  error: string;
}) {
  const [tour, setTour] = useState<Tour>(initial);
  const isNew = !initial.slug;

  function patch(p: Partial<Tour>) {
    setTour((t) => ({ ...t, ...p }));
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(tour);
      }}
      className="space-y-8"
    >
      <fieldset className="space-y-4">
        <legend className="font-display text-xl tracking-tight">Básico</legend>
        <div>
          <Label>Slug (parte de la URL, sin espacios)</Label>
          <Input
            className="mt-1.5"
            value={tour.slug}
            disabled={!isNew}
            placeholder="ej. tour-nuevo-cancun"
            onChange={(e) =>
              patch({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, "-") })
            }
            required
          />
          {!isNew ? <p className="mt-1 text-xs text-muted">No se puede cambiar una vez creado.</p> : null}
        </div>
        <LocalizedInput label="Nombre" value={tour.name} onChange={(v) => patch({ name: v })} />
        <LocalizedInput label="Tagline" value={tour.tagline} onChange={(v) => patch({ tagline: v })} />
        <div>
          <Label>Categoría</Label>
          <div className="mt-1.5 grid grid-cols-2 gap-2">
            {(["acuatico", "arqueologico"] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => patch({ category: c })}
                className={`h-11 rounded-[var(--radius-md)] text-sm font-medium ${
                  tour.category === c ? "bg-teal text-foam" : "bg-surface text-ink-soft"
                }`}
              >
                {c === "acuatico" ? "Acuático" : "Arqueológico"}
              </button>
            ))}
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-display text-xl tracking-tight">Descripción</legend>
        <LocalizedInput
          label="Descripción larga"
          value={tour.description}
          onChange={(v) => patch({ description: v })}
          multiline
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <LocalizedInput label="Duración" value={tour.duration} onChange={(v) => patch({ duration: v })} />
          <LocalizedInput label="Ubicación" value={tour.location} onChange={(v) => patch({ location: v })} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <LocalizedInput label="Tamaño de grupo" value={tour.groupSize} onChange={(v) => patch({ groupSize: v })} />
          <LocalizedInput label="Idiomas" value={tour.languages} onChange={(v) => patch({ languages: v })} />
        </div>
        <LocalizedInput
          label="Restricciones (edad, salud, etc.)"
          value={tour.restrictions}
          onChange={(v) => patch({ restrictions: v })}
          multiline
        />
        <LocalizedInput
          label="Costo adicional en el sitio (dejar vacío si no aplica)"
          value={tour.extraTax}
          onChange={(v) => patch({ extraTax: v })}
          multiline
        />
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-display text-xl tracking-tight">Punto de encuentro</legend>
        <LocalizedInput label="Texto de recogida" value={tour.meeting} onChange={(v) => patch({ meeting: v })} />
        <div>
          <Label>Búsqueda para el mapa</Label>
          <Input
            className="mt-1.5"
            placeholder="Ej. Zona Arqueológica de Tulum, México"
            value={tour.meetingQuery}
            onChange={(e) => patch({ meetingQuery: e.target.value })}
          />
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-display text-xl tracking-tight">Itinerario</legend>
        <div className="mt-4">
          <StopsEditor stops={tour.stops} onChange={(stops) => patch({ stops })} />
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-display text-xl tracking-tight">Precio y reseñas</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Precio compartido (USD)</Label>
            <Input
              className="mt-1.5"
              type="number"
              min={0}
              value={tour.price}
              onChange={(e) => patch({ price: Number(e.target.value) })}
            />
          </div>
          <div>
            <Label>Precio tachado (opcional)</Label>
            <Input
              className="mt-1.5"
              type="number"
              min={0}
              value={tour.originalPrice ?? ""}
              onChange={(e) =>
                patch({ originalPrice: e.target.value ? Number(e.target.value) : undefined })
              }
            />
          </div>
          <div>
            <Label>Calificación (0-5)</Label>
            <Input
              className="mt-1.5"
              type="number"
              min={0}
              max={5}
              step={0.1}
              value={tour.rating}
              onChange={(e) => patch({ rating: Number(e.target.value) })}
            />
          </div>
          <div>
            <Label>Número de reseñas</Label>
            <Input
              className="mt-1.5"
              type="number"
              min={0}
              value={tour.reviewCount}
              onChange={(e) => patch({ reviewCount: Number(e.target.value) })}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-display text-xl tracking-tight">Oferta de último día (opcional)</legend>
        <label className="flex h-11 items-center gap-3">
          <input
            type="checkbox"
            checked={!!tour.lastMinute}
            onChange={(e) =>
              patch({
                lastMinute: e.target.checked
                  ? { seats: 5, discountPct: 20, departs: "hoy" }
                  : undefined,
              })
            }
            className="accent-teal"
          />
          <span className="text-sm">Activar oferta de último día para este tour</span>
        </label>
        {tour.lastMinute ? (
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label>Asientos</Label>
              <Input
                className="mt-1.5"
                type="number"
                min={1}
                value={tour.lastMinute.seats}
                onChange={(e) =>
                  patch({ lastMinute: { ...tour.lastMinute!, seats: Number(e.target.value) } })
                }
              />
            </div>
            <div>
              <Label>Descuento %</Label>
              <Input
                className="mt-1.5"
                type="number"
                min={0}
                max={90}
                value={tour.lastMinute.discountPct}
                onChange={(e) =>
                  patch({ lastMinute: { ...tour.lastMinute!, discountPct: Number(e.target.value) } })
                }
              />
            </div>
            <div>
              <Label>Sale</Label>
              <div className="mt-1.5 grid grid-cols-2 gap-2">
                {(["hoy", "manana"] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => patch({ lastMinute: { ...tour.lastMinute!, departs: d } })}
                    className={`h-11 rounded-[var(--radius-md)] text-sm font-medium ${
                      tour.lastMinute!.departs === d ? "bg-teal text-foam" : "bg-surface text-ink-soft"
                    }`}
                  >
                    {d === "hoy" ? "Hoy" : "Mañana"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-display text-xl tracking-tight">Tour privado</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Precio por persona (privado)</Label>
            <Input
              className="mt-1.5"
              type="number"
              min={0}
              value={tour.private.pricePerPerson}
              onChange={(e) => patch({ private: { ...tour.private, pricePerPerson: Number(e.target.value) } })}
            />
          </div>
          <div>
            <Label>Capacidad de la unidad (van/bote)</Label>
            <Input
              className="mt-1.5"
              type="number"
              min={1}
              value={tour.private.unitCapacity}
              onChange={(e) => patch({ private: { ...tour.private, unitCapacity: Number(e.target.value) } })}
            />
          </div>
          <div>
            <Label>Mínimo de personas garantizadas</Label>
            <Input
              className="mt-1.5"
              type="number"
              min={1}
              value={tour.private.minGuaranteePeople}
              onChange={(e) =>
                patch({ private: { ...tour.private, minGuaranteePeople: Number(e.target.value) } })
              }
            />
          </div>
          <div>
            <Label>Monto mínimo garantizado (USD)</Label>
            <Input
              className="mt-1.5"
              type="number"
              min={0}
              value={tour.private.minGuaranteeAmount}
              onChange={(e) =>
                patch({ private: { ...tour.private, minGuaranteeAmount: Number(e.target.value) } })
              }
            />
          </div>
          <div>
            <Label>Recargo por no llenar (0–1, ej. 0.25 = 25%)</Label>
            <Input
              className="mt-1.5"
              type="number"
              min={0}
              max={1}
              step={0.05}
              value={tour.private.underfillSurchargePct}
              onChange={(e) =>
                patch({ private: { ...tour.private, underfillSurchargePct: Number(e.target.value) } })
              }
            />
          </div>
          <div>
            <Label>Días mínimos de anticipación</Label>
            <Input
              className="mt-1.5"
              type="number"
              min={0}
              value={tour.private.minAdvanceDays}
              onChange={(e) =>
                patch({ private: { ...tour.private, minAdvanceDays: Number(e.target.value) } })
              }
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-display text-xl tracking-tight">Incluye / no incluye / destacados</legend>
        <LocalizedListEditor label="Qué incluye" items={tour.includes} onChange={(v) => patch({ includes: v })} />
        <LocalizedListEditor
          label="No incluye"
          items={tour.notIncluded}
          onChange={(v) => patch({ notIncluded: v })}
        />
        <LocalizedListEditor
          label="Destacados (pills)"
          items={tour.highlights}
          onChange={(v) => patch({ highlights: v })}
        />
      </fieldset>

      <fieldset>
        <legend className="font-display text-xl tracking-tight">Foto</legend>
        <div className="mt-4">
          <ImageUpload value={tour.image} onChange={(url) => patch({ image: url })} />
        </div>
      </fieldset>

      {error ? <p className="text-sm text-warn">{error}</p> : null}

      <div className="flex items-center gap-3">
        <Button type="submit" size="lg" disabled={saving}>
          {saving ? "Guardando…" : isNew ? "Crear tour" : "Guardar cambios"}
        </Button>
        {onDelete ? (
          <Button type="button" variant="warn" onClick={onDelete} disabled={saving}>
            Borrar tour
          </Button>
        ) : null}
      </div>
    </form>
  );
}
