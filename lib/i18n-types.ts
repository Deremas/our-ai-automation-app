import type { AppLanguage } from "./i18n";
export type Lang = AppLanguage;

export function normalizeLang(input?: string | null): Lang {
  const v = (input || "en").toLowerCase();
  if (v === "fr" || v === "de" || v === "lb" || v === "en") return v;
  return "en";
}
