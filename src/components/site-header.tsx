import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/i18n/context";
import { copy } from "@/i18n/copy";
import { LanguageToggle } from "@/components/language-toggle";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { lang } = useLang();

  const nav = [
    { kind: "route" as const, to: "/tours" as const, label: copy.navTours[lang] },
    { kind: "hash" as const, href: "/#ultimo-dia", label: copy.navLastMinute[lang] },
    { kind: "route" as const, to: "/resenas" as const, label: copy.navReviews[lang] },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img
            src="/brand/cuntours-logo.png"
            alt="Cuntours"
            className="h-9 w-auto object-contain sm:h-10"
          />
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
          <LanguageToggle />
          <Link
            to="/tours"
            className="inline-flex h-11 items-center rounded-[var(--radius-md)] bg-teal px-4 text-sm font-medium text-foam transition-transform duration-150 ease-out hover:bg-teal-deep active:scale-[0.96]"
          >
            {copy.book[lang]}
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-[var(--radius-sm)] text-ink"
            aria-expanded={open}
            aria-label={open ? copy.closeMenu[lang] : copy.openMenu[lang]}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
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
            {copy.book[lang]}
          </Link>
        </nav>
      </div>
    </header>
  );
}
