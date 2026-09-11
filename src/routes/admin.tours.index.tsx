import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { getToursFn, adminDeleteTourFn } from "@/lib/tours-fn";
import type { Tour } from "@/lib/tours";
import { formatUsd } from "@/lib/utils";

export const Route = createFileRoute("/admin/tours/")({ component: ToursListPage });

function ToursListPage() {
  const [tours, setTours] = useState<Tour[] | null>(null);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  function load() {
    getToursFn()
      .then(setTours)
      .catch(() => setError("No se pudieron cargar los tours."));
  }

  useEffect(load, []);

  async function onDelete(slug: string, name: string) {
    if (!confirm(`¿Borrar "${name}" permanentemente? Esto no se puede deshacer.`)) return;
    setDeleting(slug);
    try {
      await adminDeleteTourFn({ data: { slug } });
      load();
    } catch {
      setError("No se pudo borrar el tour.");
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl tracking-tight">Tours</h1>
        <Link
          to="/admin/tours/new"
          className="inline-flex h-11 items-center gap-2 rounded-[var(--radius-md)] bg-teal px-4 text-sm font-medium text-foam"
        >
          <Plus size={16} /> Nuevo tour
        </Link>
      </div>

      {error ? <p className="mt-6 text-sm text-warn">{error}</p> : null}
      {!tours && !error ? <p className="mt-6 text-sm text-muted">Cargando…</p> : null}

      {tours ? (
        <div className="mt-6 grid gap-3">
          {tours.map((t) => (
            <div
              key={t.slug}
              className="flex items-center gap-4 rounded-[var(--radius-lg)] bg-bg-elevated p-3 shadow-[var(--shadow-border)]"
            >
              <img
                src={t.image || "/images/coba.jpg"}
                alt=""
                className="h-16 w-24 shrink-0 rounded-[var(--radius-sm)] object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{t.name.es}</p>
                <p className="text-xs text-muted">
                  {t.slug} · {formatUsd(t.price)} · {t.category === "acuatico" ? "Acuático" : "Arqueológico"}
                </p>
              </div>
              <Link
                to="/admin/tours/$slug"
                params={{ slug: t.slug }}
                className="shrink-0 text-sm font-medium text-teal"
              >
                Editar
              </Link>
              <button
                type="button"
                onClick={() => onDelete(t.slug, t.name.es)}
                disabled={deleting === t.slug}
                className="shrink-0 text-warn disabled:opacity-50"
                aria-label={`Borrar ${t.name.es}`}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
