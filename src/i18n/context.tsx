import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { copy, type Lang } from "./copy";

type I18nValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
};

const I18nContext = createContext<I18nValue | null>(null);
const STORAGE_KEY = "cuntours-lang";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "es" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const toggle = useCallback(
    () => setLangState((current) => (current === "es" ? "en" : "es")),
    [],
  );

  const value = useMemo(() => ({ lang, setLang, toggle }), [lang, setLang, toggle]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useLang() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useLang must be used inside I18nProvider");
  return ctx;
}

export function useCopy() {
  const { lang } = useLang();
  return { lang, copy, t: (dict: { es: string; en: string }) => dict[lang] };
}

/** Reads a { es, en } (or plain string) value for the current language. */
export function tx<T extends string>(dict: { es: T; en: T } | T, lang: Lang): T {
  if (typeof dict === "string") return dict;
  return dict[lang];
}
