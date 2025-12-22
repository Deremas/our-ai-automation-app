"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DEFAULT_LANG, LANG_STORAGE_KEY, type AppLanguage } from "@/lib/i18n";
import { getCookie, setPrefCookie, LANG_COOKIE } from "@/lib/prefsCookies";


type LangCtx = {
  lang: AppLanguage;
  setLang: (l: AppLanguage) => void;
};

const LanguageContext = createContext<LangCtx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<AppLanguage>(DEFAULT_LANG);

  // Load once
  // useEffect(() => {
  //   try {
  //     const saved = localStorage.getItem(LANG_STORAGE_KEY);
  //     if (
  //       saved === "en" ||
  //       saved === "fr" ||
  //       saved === "de" ||
  //       saved === "lb"
  //     ) {
  //       setLangState(saved);
  //     }
  //   } catch {}
  // }, []);

useEffect(() => {
  try {
    // 1) cookie first (best for subdomains & server-friendly)
    const cookieLang = getCookie(LANG_COOKIE);
    if (
      cookieLang === "en" ||
      cookieLang === "fr" ||
      cookieLang === "de" ||
      cookieLang === "lb"
    ) {
      setLangState(cookieLang);
      return;
    }

    // 2) fallback to localStorage (optional)
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === "en" || saved === "fr" || saved === "de" || saved === "lb") {
      setLangState(saved);
    }
  } catch {}
}, []);


  // Persist
  // const setLang = (l: AppLanguage) => {
  //   setLangState(l);
  //   try {
  //     localStorage.setItem(LANG_STORAGE_KEY, l);
  //   } catch {}
  // };

const setLang = (l: AppLanguage) => {
  setLangState(l);

  try {
    localStorage.setItem(LANG_STORAGE_KEY, l);
  } catch {}

  // ✅ persist as essential cookie
  setPrefCookie(LANG_COOKIE, l);
    document.documentElement.setAttribute("lang", l);
};


  const value = useMemo(() => ({ lang, setLang }), [lang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx)
    throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
