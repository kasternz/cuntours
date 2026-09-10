import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/i18n/context";
import { copy } from "@/i18n/copy";

export function FaqList() {
  const { lang } = useLang();
  const [open, setOpen] = useState<number | null>(0);

  const faqs = [
    { q: copy.faq1q[lang], a: copy.faq1a[lang] },
    { q: copy.faq2q[lang], a: copy.faq2a[lang] },
    { q: copy.faq3q[lang], a: copy.faq3a[lang] },
    { q: copy.faq4q[lang], a: copy.faq4a[lang] },
    { q: copy.faq5q[lang], a: copy.faq5a[lang] },
  ];

  return (
    <ul className="divide-y divide-border rounded-[var(--radius-lg)] bg-bg-elevated shadow-[var(--shadow-border)]">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q}>
            <button
              type="button"
              className="flex min-h-12 w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="font-medium text-ink">{item.q}</span>
              <ChevronDown
                size={18}
                className={cn(
                  "shrink-0 text-muted transition-transform duration-200 ease-out",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            {isOpen ? (
              <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{item.a}</p>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
