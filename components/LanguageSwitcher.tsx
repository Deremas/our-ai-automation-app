"use client";

import { APP_LANGUAGES, type AppLanguage } from "@/lib/i18n";
import { useLanguage } from "@/components/LanguageProvider";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <select
      value={lang}
      onChange={(e) => setLang(e.target.value as AppLanguage)}
      className="border border-gray-300 rounded-lg px-2 py-1 text-sm bg-white"
      aria-label="Select language"
    >
      {APP_LANGUAGES.map((l) => (
        <option key={l.code} value={l.code}>
          {l.label}
        </option>
      ))}
    </select>
  );
}
