import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { TourForm } from "@/components/admin/tour-form";
import { adminSaveTourFn } from "@/lib/tours-fn";
import { blankTour } from "@/lib/tours";

export const Route = createFileRoute("/admin/tours/new")({ component: NewTourPage });

function NewTourPage() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function onSave(tour: ReturnType<typeof blankTour>) {
    setError("");
    if (!tour.slug.trim()) {
      setError("Falta el slug.");
      return;
    }
    setSaving(true);
    try {
      await adminSaveTourFn({ data: { tour } });
      void navigate({ to: "/admin/tours" });
    } catch {
      setError("No se pudo crear el tour.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl tracking-tight">Nuevo tour</h1>
      <div className="mt-6">
        <TourForm initial={blankTour()} onSave={onSave} saving={saving} error={error} />
      </div>
    </div>
  );
}
