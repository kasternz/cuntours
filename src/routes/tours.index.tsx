import { createFileRoute, Link } from "@tanstack/react-router";
import { TourCard } from "@/components/tour-card";
import { tours, type Category } from "@/lib/tours";
import { cn } from "@/lib/utils";
import { useLang } from "@/i18n/context";
import { copy } from "@/i18n/copy";

type Filter = "todos" | Category | "ultimo";

type ToursSearch = {
  cat?: Filter;
};

export const Route = createFileRoute("/tours/")({
  validateSearch: (search: Record<string, unknown>): ToursSearch => {
    const cat = search.cat;
    if (cat === "acuatico" || cat === "arqueologico" || cat === "ultimo" || cat === "todos") {
      return { cat };
    }
    return {};
  },
  component: ToursPage,
});

function ToursPage() {
  const { lang } = useLang();
  const { cat } = Route.useSearch();
  const active: Filter = cat ?? "todos";
  const list = tours.filter((t) => {
    if (active === "todos") return true;
    if (active === "ultimo") return Boolean(t.lastMinute);
    return t.category === active;
  });

  const filters: { id: Filter; label: string }[] = [
    { id: "todos", label: copy.filterAll[lang] },
    { id: "acuatico", label: copy.filterWater[lang] },
    { id: "arqueologico", label: copy.filterArch[lang] },
    { id: "ultimo", label: copy.filterLastMinute[lang] },
  ];

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-sm font-medium uppercase tracking-[0.16em] text-teal">
        {copy.catalog[lang]}
      </p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">{copy.catalogTitle[lang]}</h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">{copy.catalogLead[lang]}</p>

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
        {list.length} {list.length === 1 ? copy.tourSingular[lang] : copy.tourPlural[lang]}
      </p>

      {list.length === 0 ? (
        <p className="mt-10 text-muted">{copy.noToursForFilter[lang]}</p>
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
