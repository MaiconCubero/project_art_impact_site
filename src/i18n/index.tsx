import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import en, { type Dict } from "./locales/en";
import ptBR from "./locales/pt-BR";
import es from "./locales/es";
import fr from "./locales/fr";
import de from "./locales/de";
import ja from "./locales/ja";
import zhCN from "./locales/zh-CN";

export const LOCALES = [
  { code: "en", label: "English" },
  { code: "pt-BR", label: "Português (Brasil)" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "ja", label: "日本語" },
  { code: "zh-CN", label: "简体中文" },
] as const;

export type Locale = (typeof LOCALES)[number]["code"];

const dictionaries: Record<Locale, Dict> = { en, "pt-BR": ptBR, es, fr, de, ja, "zh-CN": zhCN };
const STORAGE_KEY = "pai.locale";

type Ctx = { locale: Locale; t: Dict; setLocale: (l: Locale) => void };
const I18nContext = createContext<Ctx>({ locale: "en", t: en, setLocale: () => {} });

const isLocale = (v: string | null): v is Locale => !!v && v in dictionaries;

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(saved)) setLocaleState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  }, []);

  return (
    <I18nContext.Provider value={{ locale, t: dictionaries[locale], setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);
