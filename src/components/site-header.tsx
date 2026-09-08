import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { kind: "route" as const, to: "/tours" as const, label: "Tours" },
  { kind: "hash" as const, href: "/#ultimo-dia", label: "Último día" },
  { kind: "route" as const, to: "/resenas" as const, label: "Reseñas" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-baseline gap-2" onClick={() => setOpen(false)}>
          <span className="font-display text-xl tracking-tight text-ink">Cuntours</span>
          <span className="hidden text-xs text-muted sm:inline">Cancún · Riviera Maya</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) =>
            item.kind === "hash" ? (
              <a key={item.href} href={item.href} className="text-sm text-ink-soft hover:text-ink">
                {item.label}
              </a>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm text-ink-soft hover:text-ink"
                activeProps={{ className: "text-sm text-ink" }}
              >
                {item.label}
              </Link>
            ),
          )}
          <Link
            to="/tours"
            className="inline-flex h-11 items-center rounded-[var(--radius-md)] bg-teal px-4 text-sm font-medium text-foam transition-transform duration-150 ease-out hover:bg-teal-deep active:scale-[0.96]"
          >
            Reservar
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-[var(--radius-sm)] text-ink md:hidden"
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-border bg-bg px-4 py-3 md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="flex flex-col gap-1">
          {nav.map((item) =>
            item.kind === "hash" ? (
              <a
                key={item.href}
                href={item.href}
                className="flex h-11 items-center text-sm text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className="flex h-11 items-center text-sm text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ),
          )}
          <Link
            to="/tours"
            className="mt-2 inline-flex h-11 items-center justify-center rounded-[var(--radius-md)] bg-teal text-sm font-medium text-foam"
            onClick={() => setOpen(false)}
          >
            Reservar
          </Link>
        </nav>
      </div>
    </header>
  );
}
