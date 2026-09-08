import { createFileRoute, Link } from "@tanstack/react-router";
import { TourCard } from "@/components/tour-card";
import { tours, type Category } from "@/lib/tours";
import { cn } from "@/lib/utils";

type Filter = "todos" | Category | "ultimo";

type ToursSearch = {
  cat?: Filter;
};

export const Route = createFileRoute("/tours")({
  validateSearch: (search: Record<string, unknown>): ToursSearch => {
    const cat = search.cat;
    if (cat === "acuatico" || cat === "arqueologico" || cat === "ultimo" || cat === "todos") {
      return { cat };
    }
    return {};
  },
  component: ToursPage,
});

const filters: { id: Filter; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "acuatico", label: "Acuáticos" },
  { id: "arqueologico", label: "Arqueológicos" },
  { id: "ultimo", label: "Último día" },
];

function ToursPage() {
  const { cat } = Route.useSearch();
  const active: Filter = cat ?? "todos";
  const list = tours.filter((t) => {
    if (active === "todos") return true;
    if (active === "ultimo") return Boolean(t.lastMinute);
    return t.category === active;
  });

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-sm font-medium uppercase tracking-[0.16em] text-teal">Catálogo</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">Tours en Cancún y Riviera Maya</h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
        Compra directa. Recogida en hotel. Elige agua o piedra — o quédate con lo que sale hoy.
      </p>

      <div className="mt-8 flex gap-2 overflow-x-auto pb-1">
        {filters.map((f) => (
          <Link
            key={f.id}
            to="/tours"
            search={f.id === "todos" ? {} : { cat: f.id }}
            className={cn(
              "inline-flex h-11 shrink-0 items-center rounded-full px-4 text-sm font-medium transition-colors duration-150",
              active === f.id ? "bg-teal text-foam" : "bg-surface text-ink-soft hover:text-ink",
            )}
          >
            {f.label}
          </Link>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted">
        {list.length} {list.length === 1 ? "tour" : "tours"}
      </p>

      {list.length === 0 ? (
        <p className="mt-10 text-muted">No hay tours en este filtro.</p>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>
      )}
    </main>
  );
}
