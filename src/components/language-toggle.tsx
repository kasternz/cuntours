import { useLang } from "@/i18n/context";
import { cn } from "@/lib/utils";

export function LanguageToggle({ tone = "default" }: { tone?: "default" | "onDark" }) {
  const { lang, setLang } = useLang();
  const ring = tone === "onDark" ? "ring-foam/25" : "ring-border";
  const base =
    tone === "onDark"
      ? "text-foam/60 data-active:text-foam data-active:bg-foam/15"
      : "text-muted data-active:text-ink data-active:bg-surface";

  return (
    <div
      className={cn("inline-flex h-8 items-center rounded-[var(--radius-sm)] p-0.5 ring-1", ring)}
      role="group"
      aria-label="Language"
    >
      {(["es", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          data-active={lang === code ? true : undefined}
          onClick={() => setLang(code)}
          className={cn(
            "h-7 min-w-8 rounded-[5px] px-1.5 text-xs font-semibold uppercase tracking-[0.1em] transition-colors duration-150",
            base,
          )}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
