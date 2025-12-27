"use client";

import React from "react";
import Link from "next/link";
import { getCookie } from "@/lib/prefsCookies";
import { CONSENT_COOKIE, parseConsent } from "@/lib/consent";
import type { AppLanguage } from "@/lib/i18n";

const isAppLanguage = (v: any): v is AppLanguage =>
  v === "en" || v === "fr" || v === "de" || v === "lb";

function readGlobalLang(): AppLanguage {
  // 1) cookie first (if you already set it)
  const c = getCookie("lang");
  if (isAppLanguage(c)) return c;

  // 2) html lang (your early script + LanguageProvider set this)
  const htmlLang = document.documentElement.getAttribute("lang");
  if (isAppLanguage(htmlLang)) return htmlLang;

  return "en";
}

export default function CookieConsent() {
  const [open, setOpen] = React.useState(false);
  const [analytics, setAnalytics] = React.useState(false);

  // ✅ get initial lang immediately
  const [L, setL] = React.useState<AppLanguage>(() => {
    if (typeof window === "undefined") return "en";
    return readGlobalLang();
  });

  const T = React.useMemo(() => {
    const copy: Record<
      AppLanguage,
      {
        title: string;
        desc: string;
        allowAnalytics: string;
        essentialsOnly: string;
        savePreferences: string;
        readOur: string;
        cookiePolicy: string;
      }
    > = {
      en: {
        title: "Cookies",
        desc: "We use cookies to remember your preferences (language and theme). You can choose whether to allow optional analytics to help us improve the website. The site still works if you choose “Essentials only”.",
        allowAnalytics: "Allow analytics (optional)",
        essentialsOnly: "Essentials only",
        savePreferences: "Save preferences",
        readOur: "Read our",
        cookiePolicy: "Cookie Policy",
      },
      fr: {
        title: "Cookies",
        desc: "Nous utilisons des cookies pour mémoriser vos préférences (langue et thème). Vous pouvez choisir d’autoriser des statistiques optionnelles afin de nous aider à améliorer le site. Le site reste utilisable même si vous choisissez « Essentiels uniquement ».",
        allowAnalytics: "Autoriser les statistiques (optionnel)",
        essentialsOnly: "Essentiels uniquement",
        savePreferences: "Enregistrer les préférences",
        readOur: "Lire notre",
        cookiePolicy: "Politique relative aux cookies",
      },
      de: {
        title: "Cookies",
        desc: "Wir verwenden Cookies, um Ihre Einstellungen zu speichern (Sprache und Design). Sie können wählen, ob Sie optionale Analysen zulassen möchten, um uns bei der Verbesserung der Website zu helfen. Die Website funktioniert auch, wenn Sie „Nur notwendige Cookies“ wählen.",
        allowAnalytics: "Analysen erlauben (optional)",
        essentialsOnly: "Nur notwendige Cookies",
        savePreferences: "Einstellungen speichern",
        readOur: "Lesen Sie unsere",
        cookiePolicy: "Cookie-Richtlinie",
      },
      lb: {
        title: "Cookies",
        desc: "Mir benotzen Cookies fir Är Preferenzen ze späicheren (Sprooch a Design). Dir kënnt wielen, ob Dir optional Analysen zouléisst, fir eis ze hëllefen d’Websäit ze verbesseren. D’Websäit funktionéiert och, wann Dir „Nëmmen néideg Cookies“ wielt.",
        allowAnalytics: "Analysen erlaben (optional)",
        essentialsOnly: "Nëmmen néideg Cookies",
        savePreferences: "Preferenze späicheren",
        readOur: "Liest eis",
        cookiePolicy: "Cookie-Politik",
      },
    };

    return copy[L] ?? copy.en;
  }, [L]);

  // ✅ Open banner if consent missing
  React.useEffect(() => {
    const existing = parseConsent(getCookie(CONSENT_COOKIE));
    if (!existing) setOpen(true);
  }, []);

  // ✅ keep language synced with global lang changes:
  // - <html lang="..."> changes (MutationObserver)
  // - optional custom event: language:updated
  React.useEffect(() => {
    const sync = () => setL(readGlobalLang());

    // 1) custom event (recommended)
    window.addEventListener("language:updated", sync);

    // 2) observe html lang attribute changes (this fixes first-visit switching)
    const html = document.documentElement;
    const obs = new MutationObserver(() => sync());
    obs.observe(html, { attributes: true, attributeFilter: ["lang"] });

    return () => {
      window.removeEventListener("language:updated", sync);
      obs.disconnect();
    };
  }, []);

  // ✅ when banner opens, re-read lang once (just in case)
  React.useEffect(() => {
    if (open) setL(readGlobalLang());
  }, [open]);

  const save = async (allowAnalytics: boolean) => {
    await fetch("/api/consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ analytics: allowAnalytics }),
    });

    setOpen(false);
    window.dispatchEvent(new Event("consent:updated"));
  };

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[9999]">
      <div className="mx-auto max-w-4xl m-4 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {T.title}
        </h3>

        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          {T.desc}
        </p>

        <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
          <label className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200">
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 dark:border-slate-600"
              aria-label={T.allowAnalytics}
            />
            {T.allowAnalytics}
          </label>

          <div className="flex gap-2">
            <button
              onClick={() => save(false)}
              className="rounded-xl px-4 py-2 border border-gray-200 dark:border-slate-700
                         text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800 transition"
            >
              {T.essentialsOnly}
            </button>

            <button
              onClick={() => save(analytics)}
              className="rounded-xl px-4 py-2 bg-slate-900 dark:bg-white
                         text-white dark:text-slate-900 font-semibold hover:opacity-90 transition"
            >
              {T.savePreferences}
            </button>
          </div>
        </div>

        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          {T.readOur}{" "}
          <Link className="underline" href="/cookies">
            {T.cookiePolicy}
          </Link>
          .
        </div>
      </div>
    </div>
  );
}

// "use client";

// import React from "react";
// import Link from "next/link";
// import { getCookie } from "@/lib/prefsCookies";
// import { CONSENT_COOKIE, parseConsent } from "@/lib/consent";
// import type { AppLanguage } from "@/lib/i18n";

// const isAppLanguage = (v: any): v is AppLanguage =>
//   v === "en" || v === "fr" || v === "de" || v === "lb";

// function getInitialLang(): AppLanguage {
//   // ✅ cookie first (matches your app behavior)
//   const c = getCookie("lang"); // LANG_COOKIE is "lang"
//   if (isAppLanguage(c)) return c;

//   // ✅ fallback to html lang (your early script sets it)
//   const htmlLang = document.documentElement.getAttribute("lang");
//   if (isAppLanguage(htmlLang)) return htmlLang;

//   return "en";
// }

// export default function CookieConsent() {
//   const [open, setOpen] = React.useState(false);
//   const [analytics, setAnalytics] = React.useState(false);

//   // ✅ compute lang BEFORE first paint using cookie/html lang
//   const [L, setL] = React.useState<AppLanguage>(() => {
//     if (typeof window === "undefined") return "en";
//     return getInitialLang();
//   });

//   const T = React.useMemo(() => {
//     const copy: Record<
//       AppLanguage,
//       {
//         title: string;
//         desc: string;
//         allowAnalytics: string;
//         essentialsOnly: string;
//         savePreferences: string;
//         readOur: string;
//         cookiePolicy: string;
//       }
//     > = {
//       en: {
//         title: "Cookies",
//         desc: "We use cookies to remember your preferences (language and theme). You can choose whether to allow optional analytics to help us improve the website. The site still works if you choose “Essentials only”.",
//         allowAnalytics: "Allow analytics (optional)",
//         essentialsOnly: "Essentials only",
//         savePreferences: "Save preferences",
//         readOur: "Read our",
//         cookiePolicy: "Cookie Policy",
//       },
//       fr: {
//         title: "Cookies",
//         desc: "Nous utilisons des cookies pour mémoriser vos préférences (langue et thème). Vous pouvez choisir d’autoriser des statistiques optionnelles afin de nous aider à améliorer le site. Le site reste utilisable même si vous choisissez « Essentiels uniquement ».",
//         allowAnalytics: "Autoriser les statistiques (optionnel)",
//         essentialsOnly: "Essentiels uniquement",
//         savePreferences: "Enregistrer les préférences",
//         readOur: "Lire notre",
//         cookiePolicy: "Politique relative aux cookies",
//       },
//       de: {
//         title: "Cookies",
//         desc: "Wir verwenden Cookies, um Ihre Einstellungen zu speichern (Sprache und Design). Sie können wählen, ob Sie optionale Analysen zulassen möchten, um uns bei der Verbesserung der Website zu helfen. Die Website funktioniert auch, wenn Sie „Nur notwendige Cookies“ wählen.",
//         allowAnalytics: "Analysen erlauben (optional)",
//         essentialsOnly: "Nur notwendige Cookies",
//         savePreferences: "Einstellungen speichern",
//         readOur: "Lesen Sie unsere",
//         cookiePolicy: "Cookie-Richtlinie",
//       },
//       lb: {
//         title: "Cookies",
//         desc: "Mir benotzen Cookies fir Är Preferenzen ze späicheren (Sprooch a Design). Dir kënnt wielen, ob Dir optional Analysen zouléisst, fir eis ze hëllefen d’Websäit ze verbesseren. D’Websäit funktionéiert och, wann Dir „Nëmmen néideg Cookies“ wielt.",
//         allowAnalytics: "Analysen erlaben (optional)",
//         essentialsOnly: "Nëmmen néideg Cookies",
//         savePreferences: "Preferenze späicheren",
//         readOur: "Liest eis",
//         cookiePolicy: "Cookie-Politik",
//       },
//     };

//     return copy[L] ?? copy.en;
//   }, [L]);

//   React.useEffect(() => {
//     // keep language synced if user changes cookie later
//     const sync = () => {
//       const c = getCookie("lang");
//       if (isAppLanguage(c)) setL(c);
//     };

//     window.addEventListener("language:updated", sync);
//     return () => window.removeEventListener("language:updated", sync);
//   }, []);

//   React.useEffect(() => {
//     const existing = parseConsent(getCookie(CONSENT_COOKIE));
//     if (!existing) setOpen(true);
//   }, []);

//   const save = async (allowAnalytics: boolean) => {
//     await fetch("/api/consent", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ analytics: allowAnalytics }),
//     });

//     setOpen(false);
//     window.dispatchEvent(new Event("consent:updated"));
//   };

//   if (!open) return null;

//   return (
//     <div className="fixed inset-x-0 bottom-0 z-[9999]">
//       <div className="mx-auto max-w-4xl m-4 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg p-5">
//         <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//           {T.title}
//         </h3>

//         <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
//           {T.desc}
//         </p>

//         <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
//           <label className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200">
//             <input
//               type="checkbox"
//               checked={analytics}
//               onChange={(e) => setAnalytics(e.target.checked)}
//               className="h-4 w-4 rounded border-gray-300 dark:border-slate-600"
//               aria-label={T.allowAnalytics}
//             />
//             {T.allowAnalytics}
//           </label>

//           <div className="flex gap-2">
//             <button
//               onClick={() => save(false)}
//               className="rounded-xl px-4 py-2 border border-gray-200 dark:border-slate-700
//                          text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800 transition"
//             >
//               {T.essentialsOnly}
//             </button>

//             <button
//               onClick={() => save(analytics)}
//               className="rounded-xl px-4 py-2 bg-slate-900 dark:bg-white
//                          text-white dark:text-slate-900 font-semibold hover:opacity-90 transition"
//             >
//               {T.savePreferences}
//             </button>
//           </div>
//         </div>

//         <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
//           {T.readOur}{" "}
//           <Link className="underline" href="/cookies">
//             {T.cookiePolicy}
//           </Link>
//           .
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import React from "react";
// import Link from "next/link";
// import { getCookie } from "@/lib/prefsCookies";
// import { CONSENT_COOKIE, parseConsent } from "@/lib/consent";
// import { useLanguage } from "@/components/LanguageProvider";
// import type { AppLanguage } from "@/lib/i18n";

// export default function CookieConsent() {
//   const { lang } = useLanguage();
//   const L = (lang as AppLanguage) || "en";

//   const [open, setOpen] = React.useState(false);
//   const [analytics, setAnalytics] = React.useState(false);

//   const T = React.useMemo(() => {
//     const copy: Record<
//       AppLanguage,
//       {
//         title: string;
//         desc: string;
//         allowAnalytics: string;
//         essentialsOnly: string;
//         savePreferences: string;
//         readOur: string;
//         cookiePolicy: string;
//       }
//     > = {
//       en: {
//         title: "Cookies",
//         desc: "We use cookies to remember your preferences (language and theme). You can choose whether to allow optional analytics to help us improve the website. The site still works if you choose “Essentials only”.",
//         allowAnalytics: "Allow analytics (optional)",
//         essentialsOnly: "Essentials only",
//         savePreferences: "Save preferences",
//         readOur: "Read our",
//         cookiePolicy: "Cookie Policy",
//       },
//       fr: {
//         title: "Cookies",
//         desc: "Nous utilisons des cookies pour mémoriser vos préférences (langue et thème). Vous pouvez choisir d’autoriser des statistiques optionnelles afin de nous aider à améliorer le site. Le site reste utilisable même si vous choisissez « Essentiels uniquement ».",
//         allowAnalytics: "Autoriser les statistiques (optionnel)",
//         essentialsOnly: "Essentiels uniquement",
//         savePreferences: "Enregistrer les préférences",
//         readOur: "Lire notre",
//         cookiePolicy: "Politique relative aux cookies",
//       },
//       de: {
//         title: "Cookies",
//         desc: "Wir verwenden Cookies, um Ihre Einstellungen zu speichern (Sprache und Design). Sie können wählen, ob Sie optionale Analysen zulassen möchten, um uns bei der Verbesserung der Website zu helfen. Die Website funktioniert auch, wenn Sie „Nur notwendige Cookies“ wählen.",
//         allowAnalytics: "Analysen erlauben (optional)",
//         essentialsOnly: "Nur notwendige Cookies",
//         savePreferences: "Einstellungen speichern",
//         readOur: "Lesen Sie unsere",
//         cookiePolicy: "Cookie-Richtlinie",
//       },
//       lb: {
//         title: "Cookies",
//         desc: "Mir benotzen Cookies fir Är Preferenzen ze späicheren (Sprooch a Design). Dir kënnt wielen, ob Dir optional Analysen zouléisst, fir eis ze hëllefen d’Websäit ze verbesseren. D’Websäit funktionéiert och, wann Dir „Nëmmen néideg Cookies“ wielt.",
//         allowAnalytics: "Analysen erlaben (optional)",
//         essentialsOnly: "Nëmmen néideg Cookies",
//         savePreferences: "Preferenze späicheren",
//         readOur: "Liest eis",
//         cookiePolicy: "Cookie-Politik",
//       },
//     };

//     return copy[L] ?? copy.en;
//   }, [L]);

//   React.useEffect(() => {
//     const existing = parseConsent(getCookie(CONSENT_COOKIE));
//     if (!existing) setOpen(true);
//   }, []);

//   const save = async (allowAnalytics: boolean) => {
//     await fetch("/api/consent", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ analytics: allowAnalytics }),
//     });

//     setOpen(false);

//     // ✅ Notify loaders without full reload
//     window.dispatchEvent(new Event("consent:updated"));
//   };

//   if (!open) return null;

//   return (
//     <div className="fixed inset-x-0 bottom-0 z-[9999]">
//       <div className="mx-auto max-w-4xl m-4 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg p-5">
//         <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//           {T.title}
//         </h3>

//         <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
//           {T.desc}
//         </p>

//         <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
//           <label className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200">
//             <input
//               type="checkbox"
//               checked={analytics}
//               onChange={(e) => setAnalytics(e.target.checked)}
//               className="h-4 w-4 rounded border-gray-300 dark:border-slate-600"
//               aria-label={T.allowAnalytics}
//             />
//             {T.allowAnalytics}
//           </label>

//           <div className="flex gap-2">
//             <button
//               onClick={() => save(false)}
//               className="rounded-xl px-4 py-2 border border-gray-200 dark:border-slate-700
//                          text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800 transition"
//             >
//               {T.essentialsOnly}
//             </button>

//             <button
//               onClick={() => save(analytics)}
//               className="rounded-xl px-4 py-2 bg-slate-900 dark:bg-white
//                          text-white dark:text-slate-900 font-semibold hover:opacity-90 transition"
//             >
//               {T.savePreferences}
//             </button>
//           </div>
//         </div>

//         <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
//           {T.readOur}{" "}
//           <Link className="underline" href="/cookies">
//             {T.cookiePolicy}
//           </Link>
//           .
//         </div>
//       </div>
//     </div>
//   );
// }
