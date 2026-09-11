import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { TourForm } from "@/components/admin/tour-form";
import { adminDeleteTourFn, adminSaveTourFn } from "@/lib/tours-fn";
import { getTour, useTours, type Tour } from "@/lib/tours";

export const Route = createFileRoute("/admin/tours/$slug")({ component: EditTourPage });

function EditTourPage() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const tours = useTours();
  const tour = getTour(tours, slug);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  if (!tour) {
    return (
      <div>
        <h1 className="font-display text-3xl tracking-tight">Tour no encontrado</h1>
        <p className="mt-2 text-sm text-muted">
          Puede que ya haya sido borrado, o que el listado esté desactualizado — vuelve a la lista de tours.
        </p>
      </div>
    );
  }

  async function onSave(updated: Tour) {
    setError("");
    setSaving(true);
    const sortOrder = tours.findIndex((t) => t.slug === tour!.slug);
    try {
      await adminSaveTourFn({ data: { tour: updated, sortOrder: sortOrder >= 0 ? sortOrder : undefined } });
      void navigate({ to: "/admin/tours" });
    } catch {
      setError("No se pudo guardar el tour.");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!confirm(`¿Borrar "${tour!.name.es}" permanentemente?`)) return;
    setSaving(true);
    try {
      await adminDeleteTourFn({ data: { slug: tour!.slug } });
      void navigate({ to: "/admin/tours" });
    } catch {
      setError("No se pudo borrar el tour.");
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl tracking-tight">Editar: {tour.name.es}</h1>
      <div className="mt-6">
        <TourForm initial={tour} onSave={onSave} onDelete={onDelete} saving={saving} error={error} />
      </div>
    </div>
  );
}
