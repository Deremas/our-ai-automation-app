"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useLanguage } from "@/components/LanguageProvider";
import { APP_LANGUAGES, type AppLanguage } from "@/lib/i18n";
import { getCookie, setPrefCookie, THEME_COOKIE } from "@/lib/prefsCookies";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang } = useLanguage();

  // const toggleTheme = () => {
  //   const newTheme = !isDark;
  //   setIsDark(newTheme);

  //   if (newTheme) {
  //     document.documentElement.classList.add("dark");
  //     localStorage.setItem("theme", "dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //     localStorage.setItem("theme", "light");
  //   }
  // };

  // ✅ Single source of truth: DOM + localStorage
  // const applyTheme = (mode: "dark" | "light") => {
  //   const root = document.documentElement;
  //   const isDarkMode = mode === "dark";

  //   root.classList.toggle("dark", isDarkMode);
  //   localStorage.setItem("theme", mode);
  //   setIsDark(isDarkMode);
  // };

  // useEffect(() => {
  //   const root = document.documentElement;

  //   const getPreferred = () => {
  //     const saved = localStorage.getItem("theme") as "dark" | "light" | null;
  //     if (saved === "dark" || saved === "light") return saved;

  //     const prefersDark = window.matchMedia(
  //       "(prefers-color-scheme: dark)"
  //     ).matches;
  //     return prefersDark ? "dark" : "light";
  //   };

  //   // ✅ initialize from saved/system immediately
  //   applyTheme(getPreferred());

  //   // ✅ if system theme changes AND user didn't explicitly choose
  //   const mq = window.matchMedia("(prefers-color-scheme: dark)");
  //   const onSystemChange = () => {
  //     const saved = localStorage.getItem("theme");
  //     // only follow system if user hasn't forced a value
  //     if (saved !== "dark" && saved !== "light") {
  //       applyTheme(mq.matches ? "dark" : "light");
  //     }
  //   };

  //   // ✅ if localStorage theme changes from other tabs/components
  //   const onStorage = (e: StorageEvent) => {
  //     if (
  //       e.key === "theme" &&
  //       (e.newValue === "dark" || e.newValue === "light")
  //     ) {
  //       applyTheme(e.newValue);
  //     }
  //   };

  //   // ✅ if someone toggles class externally, keep state synced (rare but helps)
  //   const obs = new MutationObserver(() => {
  //     const domIsDark = root.classList.contains("dark");
  //     setIsDark(domIsDark);
  //   });
  //   obs.observe(root, { attributes: true, attributeFilter: ["class"] });

  //   mq.addEventListener?.("change", onSystemChange);
  //   window.addEventListener("storage", onStorage);

  //   return () => {
  //     mq.removeEventListener?.("change", onSystemChange);
  //     window.removeEventListener("storage", onStorage);
  //     obs.disconnect();
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const toggleTheme = () => {
  //   // ✅ read actual DOM at click time (never stale)
  //   const domIsDark = document.documentElement.classList.contains("dark");
  //   applyTheme(domIsDark ? "light" : "dark");
  // };

  // ✅ Single source of truth: DOM + cookie (no localStorage)
  const applyTheme = (mode: "dark" | "light", persist = true) => {
    const root = document.documentElement;
    const isDarkMode = mode === "dark";

    root.classList.toggle("dark", isDarkMode);
    setIsDark(isDarkMode);

    if (persist) setPrefCookie(THEME_COOKIE, mode);
  };

  useEffect(() => {
    const root = document.documentElement;

    const getPreferred = () => {
      const saved = getCookie(THEME_COOKIE) as "dark" | "light" | null;
      if (saved === "dark" || saved === "light") return saved;

      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      return prefersDark ? "dark" : "light";
    };

    // ✅ initialize from cookie/system
    applyTheme(getPreferred(), false);

    // ✅ follow system theme ONLY if user hasn't explicitly chosen a cookie yet
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      const saved = getCookie(THEME_COOKIE);
      if (saved !== "dark" && saved !== "light") {
        applyTheme(mq.matches ? "dark" : "light", false);
      }
    };

    // ✅ if someone toggles class externally, keep state synced
    const obs = new MutationObserver(() => {
      setIsDark(root.classList.contains("dark"));
    });
    obs.observe(root, { attributes: true, attributeFilter: ["class"] });

    mq.addEventListener?.("change", onSystemChange);

    return () => {
      mq.removeEventListener?.("change", onSystemChange);
      obs.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleTheme = () => {
    const domIsDark = document.documentElement.classList.contains("dark");
    applyTheme(domIsDark ? "light" : "dark", true);
  };

  const T = useMemo(() => {
    const nav = {
      en: {
        home: "Home",
        about: "About",
        services: "Services",
        how: "How It Works",
        contact: "Contact",
        started: "Get Started",
      },
      fr: {
        home: "Accueil",
        about: "À propos",
        services: "Services",
        how: "Comment ça marche",
        contact: "Contact",
        started: "Démarrer",
      },
      de: {
        home: "Start",
        about: "Über uns",
        services: "Leistungen",
        how: "So funktioniert’s",
        contact: "Kontakt",
        started: "Loslegen",
      },
      lb: {
        home: "Heem",
        about: "Iwwer eis",
        services: "Servicer",
        how: "Wéi et funktionéiert",
        contact: "Kontakt",
        started: "Starten",
      },
    } satisfies Record<AppLanguage, any>;

    return nav[lang];
  }, [lang]);

  const navigation = useMemo(
    () => [
      { name: T.home, href: "/" },
      { name: T.about, href: "/about" },
      { name: T.services, href: "/services" },
      { name: T.how, href: "/how-it-works" },
      { name: T.contact, href: "/contact" },
    ],
    [T]
  );

  const isActive = (href: string) => pathname === href;

  // lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header
        className="
          sticky top-0 left-0 w-full z-[2147483000]
          backdrop-blur-md bg-white/70 dark:bg-slate-900/70
          border-b border-gray-200 dark:border-slate-800
          shadow-lg transition-colors duration-500
        "
        style={{
          WebkitBackdropFilter: "blur(12px)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 w-full gap-2">
            <Link href="/" className="flex items-center gap-2 min-w-0">
              <span
                className="
                  flex items-center justify-center h-10 w-10 rounded-lg border-2
                  border-primary-500 bg-primary-100 text-primary-600
                  dark:bg-yellow-400/10 dark:border-accent-400 dark:text-accent-500
                  font-bold text-lg transition-all duration-200 shrink-0
                "
                aria-label="Lux AI"
                title="Lux AI Consultancy & Automation"
              >
                AI
              </span>

              <span
                className="
                  hidden md:inline
                  font-bold text-primary-600 dark:text-accent-600
                  text-base lg:text-lg whitespace-nowrap
                "
                title="Lux AI Consultancy & Automation"
              >
                Lux AI Consultancy & Automation
              </span>
            </Link>

            <nav className="hidden lg:flex flex-1 items-center justify-center min-w-0">
              <div className="flex items-center gap-6 xl:gap-8 min-w-0">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      relative font-medium whitespace-nowrap
                      text-sm xl:text-base leading-[1] py-0
                      transition-colors duration-200 hover:text-primary-500 dark:hover:text-accent-500
                      ${
                        isActive(item.href)
                          ? "text-primary-500 dark:text-accent-500"
                          : "text-gray-700 dark:text-gray-300"
                      }
                    `}
                  >
                    {item.name}
                    {isActive(item.href) && (
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent-500 rounded-full" />
                    )}
                  </Link>
                ))}
              </div>
            </nav>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <Select
                value={lang}
                onValueChange={(v) => setLang(v as AppLanguage)}
              >
                <SelectTrigger
                  className="
                    h-9 rounded-lg border border-gray-200 dark:border-slate-700
                    bg-white dark:bg-slate-800 text-sm
                    w-[6.25rem] sm:w-[8.25rem] lg:w-[7.5rem] xl:w-[160px]
                  "
                >
                  <SelectValue placeholder="Language" />
                </SelectTrigger>

                <SelectContent
                  className="z-[2147483500] max-h-56 overflow-auto w-[var(--radix-select-trigger-width)] max-w-[calc(100vw-1.5rem)]"
                  position="popper"
                  sideOffset={8}
                  align="start"
                  avoidCollisions
                  collisionPadding={12}
                >
                  {APP_LANGUAGES.map((l) => (
                    <SelectItem key={l.code} value={l.code}>
                      {l.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <button
                onClick={toggleTheme}
                className="
                  p-2 rounded-lg bg-gray-100 dark:bg-slate-800
                  hover:bg-gray-200 dark:hover:bg-slate-700
                  transition-all duration-300 shrink-0
                "
                aria-label="Toggle theme"
                type="button"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i
                    className={`ri-${
                      isDark ? "sun" : "moon"
                    }-line text-gray-600 dark:text-gray-300`}
                  />
                </div>
              </button>

              <Link
                href="/contact"
                className="
                  hidden lg:inline-flex items-center
                  px-3 xl:px-4 py-2 text-sm xl:text-base
                  bg-primary-500 text-white rounded-lg
                  hover:bg-primary-600 transition-all duration-300 font-medium whitespace-nowrap
                "
              >
                {T.started}
              </Link>

              <button
                onClick={() => setIsMenuOpen((v) => !v)}
                className={`
                  lg:hidden p-2 rounded-lg
                  hover:bg-gray-100 dark:hover:bg-slate-800
                  transition-all duration-300 shrink-0
                  ${isMenuOpen ? "bg-gray-200 dark:bg-slate-700" : ""}
                `}
                aria-label="Toggle menu"
                type="button"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i
                    className={`ri-${
                      isMenuOpen ? "close" : "menu"
                    }-line text-gray-600 dark:text-gray-300`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ✅ IMPORTANT: overlay is OUTSIDE header now → covers full page everywhere */}
      <div
        className={`lg:hidden fixed inset-0 z-[2147483647] transition-opacity duration-200 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* full-screen click catcher */}
        <button
          type="button"
          aria-label="Close menu"
          className="absolute inset-0 bg-black/30"
          onClick={() => setIsMenuOpen(false)}
        />

        <div className="absolute top-16 left-0 right-0 p-3">
          <div
            onClick={(e) => e.stopPropagation()}
            className={`
              mx-auto w-full max-w-[calc(100vw-1.5rem)]
              rounded-2xl border border-gray-200 dark:border-slate-800
              bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-2xl
              transform transition-transform duration-200
              ${
                isMenuOpen
                  ? "translate-y-0 scale-100"
                  : "-translate-y-2 scale-95"
              }
            `}
            style={{
              WebkitBackdropFilter: "blur(12px)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="max-h-[75vh] overflow-auto py-4">
              <nav className="flex flex-col gap-2 px-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 font-medium transition-colors duration-200 hover:text-primary-500 dark:hover:text-accent-500 ${
                      isActive(item.href)
                        ? "text-primary-500 dark:text-accent-500 bg-primary-100 dark:bg-slate-800 rounded-lg"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                <Link
                  href="/contact"
                  className="
                    mx-1 mt-2 inline-flex items-center justify-center
                    px-4 py-2 bg-primary-500 text-white rounded-lg
                    hover:bg-primary-600 transition-colors duration-200 font-medium whitespace-nowrap
                  "
                  onClick={() => setIsMenuOpen(false)}
                >
                  {T.started}
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// "use client";

// import { useState, useEffect, useMemo } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// import { useLanguage } from "@/components/LanguageProvider";
// import { APP_LANGUAGES, type AppLanguage } from "@/lib/i18n";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";

// export default function Header() {
//   const [isDark, setIsDark] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const pathname = usePathname();
//   const { lang, setLang } = useLanguage();

//   useEffect(() => {
//     document.body.classList.add(
//       "transition-colors",
//       "duration-500",
//       "bg-white",
//       "dark:bg-slate-900",
//       "text-gray-900",
//       "dark:text-gray-100"
//     );

//     const savedTheme = localStorage.getItem("theme");
//     const systemPrefersDark = window.matchMedia(
//       "(prefers-color-scheme: dark)"
//     ).matches;

//     if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
//       setIsDark(true);
//       document.documentElement.classList.add("dark");
//     } else {
//       setIsDark(false);
//       document.documentElement.classList.remove("dark");
//     }
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = !isDark;
//     setIsDark(newTheme);

//     document.documentElement.classList.add("transition-colors", "duration-500");
//     if (newTheme) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }

//     setTimeout(() => {
//       document.documentElement.classList.remove(
//         "transition-colors",
//         "duration-500"
//       );
//     }, 600);
//   };

//   const T = useMemo(() => {
//     const nav = {
//       en: {
//         home: "Home",
//         about: "About",
//         services: "Services",
//         how: "How It Works",
//         contact: "Contact",
//         started: "Get Started",
//       },
//       fr: {
//         home: "Accueil",
//         about: "À propos",
//         services: "Services",
//         how: "Comment ça marche",
//         contact: "Contact",
//         started: "Démarrer",
//       },
//       de: {
//         home: "Start",
//         about: "Über uns",
//         services: "Leistungen",
//         how: "So funktioniert’s",
//         contact: "Kontakt",
//         started: "Loslegen",
//       },
//       lb: {
//         home: "Heem",
//         about: "Iwwer eis",
//         services: "Servicer",
//         how: "Wéi et funktionéiert",
//         contact: "Kontakt",
//         started: "Starten",
//       },
//     } satisfies Record<AppLanguage, any>;

//     return nav[lang];
//   }, [lang]);

//   const navigation = useMemo(
//     () => [
//       { name: T.home, href: "/" },
//       { name: T.about, href: "/about" },
//       { name: T.services, href: "/services" },
//       { name: T.how, href: "/how-it-works" },
//       { name: T.contact, href: "/contact" },
//     ],
//     [T]
//   );

//   const isActive = (href: string) => pathname === href;

//   useEffect(() => {
//     document.body.style.overflow = isMenuOpen ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isMenuOpen]);

//   useEffect(() => {
//     setIsMenuOpen(false);
//   }, [pathname]);

//   useEffect(() => {
//     const onKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "Escape") setIsMenuOpen(false);
//     };
//     window.addEventListener("keydown", onKeyDown);
//     return () => window.removeEventListener("keydown", onKeyDown);
//   }, []);

//   return (
//     <header
//       className="sticky top-0 left-0 w-full z-[4010] backdrop-blur-md bg-white/70 dark:bg-slate-900/70
//                  border-b border-gray-200 dark:border-slate-800 shadow-lg transition-colors duration-500"
//       style={{
//         WebkitBackdropFilter: "blur(12px)",
//         backdropFilter: "blur(12px)",
//       }}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header row */}
//         <div className="flex items-center h-16 w-full min-w-0 gap-3">
//           {/* Brand */}
//           <Link
//             href="/"
//             className="flex items-center gap-2 group min-w-0 shrink-0"
//           >
//             <span
//               className="flex items-center justify-center h-10 w-10 rounded-lg border-2
//                          border-primary-500 bg-primary-100 text-primary-600
//                          dark:bg-yellow-400/10 dark:border-accent-400 dark:text-accent-500
//                          font-bold text-lg transition-all duration-200
//                          group-hover:bg-primary-200 group-hover:dark:bg-yellow-400/20 shrink-0"
//             >
//               AI
//             </span>

//             {/* ✅ Keep visible, but constrain & truncate aggressively on lg (Nest Hub) */}
//             <span
//               className="
//                 font-bold text-primary-600 dark:text-accent-600 transition-colors duration-200
//                 text-base sm:text-lg lg:text-lg
//                  min-w-0
//                 max-w-[180px] sm:max-w-[240px] lg:max-w-[220px] xl:max-w-none
//               "
//               title="Lux AI Consultancy & Automation"
//             >
//               Lux AI Consultancy & Automation
//             </span>
//           </Link>

//           {/* ✅ Desktop nav still visible on lg+, but made compact & no-wrap to prevent mess */}
//           <nav className="hidden lg:flex flex-1 items-center justify-center min-w-0 leading-none">
//   <div className="flex items-center gap-6 xl:gap-8 min-w-0 leading-none">
//               {navigation.map((item) => (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className={`
//     relative font-medium whitespace-nowrap
//     text-sm xl:text-base
//     leading-none               /* 🔹 tighter vertical height */
//     py-1                       /* 🔹 control vertical padding */
//     transition-colors duration-200 hover:text-primary-500 dark:hover:text-accent-500
//     ${
//       isActive(item.href)
//         ? "text-primary-500 dark:text-accent-500"
//         : "text-gray-700 dark:text-gray-300"
//     }
//   `}
//                 >
//                   {item.name}
//                   {isActive(item.href) && (
//                     <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent-500 rounded-full" />
//                   )}
//                 </Link>
//               ))}
//             </div>
//           </nav>

//           {/* Right controls (ALWAYS visible) */}
//           <div className="flex items-center gap-2 sm:gap-3 shrink-0">
//             {/* ✅ Language always visible; compact at lg to fit Nest Hub */}
//             <div className="min-w-0">
//               <Select
//                 value={lang}
//                 onValueChange={(v) => setLang(v as AppLanguage)}
//               >
//                 <SelectTrigger
//                   className="
//                     h-9 rounded-lg border border-gray-200 dark:border-slate-700
//                     bg-white dark:bg-slate-800 text-sm min-w-0
//                     w-[7rem] sm:w-[9.5rem] lg:w-[7.5rem] xl:w-[160px]
//                   "
//                 >
//                   <SelectValue placeholder="Language" />
//                 </SelectTrigger>

//                 <SelectContent
//                   className="z-[99999] max-h-56 overflow-auto w-[var(--radix-select-trigger-width)] max-w-[calc(100vw-2rem)]"
//                   position="popper"
//                   sideOffset={8}
//                   align="start"
//                   avoidCollisions
//                   collisionPadding={12}
//                 >
//                   {APP_LANGUAGES.map((l) => (
//                     <SelectItem key={l.code} value={l.code}>
//                       {l.label}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Theme toggle */}
//             <button
//               onClick={toggleTheme}
//               className="relative p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700
//                          transition-all duration-500 hover:scale-105 group"
//               aria-label="Toggle theme"
//               type="button"
//             >
//               <div className="w-5 h-5 flex items-center justify-center relative overflow-hidden">
//                 <i
//                   className={`ri-sun-line absolute transition-all duration-500 text-gray-600 dark:text-gray-300 ${
//                     isDark
//                       ? "opacity-100 rotate-0 scale-100"
//                       : "opacity-0 rotate-180 scale-0"
//                   }`}
//                 />
//                 <i
//                   className={`ri-moon-line absolute transition-all duration-500 text-gray-600 dark:text-gray-300 ${
//                     !isDark
//                       ? "opacity-100 rotate-0 scale-100"
//                       : "opacity-0 -rotate-180 scale-0"
//                   }`}
//                 />
//               </div>
//               <div className="absolute inset-0 rounded-lg bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//             </button>

//             {/* ✅ CTA stays visible on lg+, but compact on Nest Hub */}
//             <Link
//               href="/contact"
//               className="
//                 hidden lg:inline-flex items-center
//                 px-3 xl:px-4 py-2
//                 text-sm xl:text-base
//                 bg-primary-500 text-white rounded-lg
//                 hover:bg-primary-600 hover:scale-105 transition-all duration-300 font-medium whitespace-nowrap
//               "
//             >
//               {T.started}
//             </Link>

//             {/* Hamburger (only < lg) */}
//             <button
//               onClick={() => setIsMenuOpen((v) => !v)}
//               className={`lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-300 ${
//                 isMenuOpen ? "scale-110 bg-gray-200 dark:bg-slate-700" : ""
//               }`}
//               aria-label="Toggle menu"
//               type="button"
//             >
//               <div
//                 className={`w-5 h-5 flex items-center justify-center transition-all duration-300 ${
//                   isMenuOpen ? "rotate-90 scale-110" : ""
//                 }`}
//               >
//                 <i
//                   className={`ri-${
//                     isMenuOpen ? "close" : "menu"
//                   }-line text-gray-600 dark:text-gray-300`}
//                 />
//               </div>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu overlay */}
//       <div
//         className={`lg:hidden fixed inset-0 z-[6000] transition-opacity duration-200 ${
//           isMenuOpen
//             ? "opacity-100 pointer-events-auto"
//             : "opacity-0 pointer-events-none"
//         }`}
//       >
//         <div
//           className="absolute inset-0 bg-black/30"
//           onClick={() => setIsMenuOpen(false)}
//         />

//         <div className="absolute top-16 inset-x-0 p-3">
//           <div
//             className={`mx-auto w-full max-w-sm rounded-2xl border border-gray-200 dark:border-slate-800
//                         bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-2xl
//                         transform transition-transform duration-200 ${
//                           isMenuOpen
//                             ? "translate-y-0 scale-100"
//                             : "-translate-y-2 scale-95"
//                         }`}
//             style={{
//               WebkitBackdropFilter: "blur(12px)",
//               backdropFilter: "blur(12px)",
//             }}
//           >
//             <div className="max-h-[75vh] overflow-auto py-4">
//               <nav className="flex flex-col gap-2 px-2">
//                 {navigation.map((item) => (
//                   <Link
//                     key={item.name}
//                     href={item.href}
//                     className={`px-3 py-2 font-medium transition-colors duration-200 hover:text-primary-500 dark:hover:text-accent-500 ${
//                       isActive(item.href)
//                         ? "text-primary-500 dark:text-accent-500 bg-primary-100 dark:bg-slate-800 rounded-lg"
//                         : "text-gray-700 dark:text-gray-300"
//                     }`}
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     {item.name}
//                   </Link>
//                 ))}

//                 <Link
//                   href="/contact"
//                   className="mx-1 mt-2 inline-flex items-center justify-center px-4 py-2 bg-primary-500 text-white rounded-lg
//                              hover:bg-primary-600 transition-colors duration-200 font-medium whitespace-nowrap"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   {T.started}
//                 </Link>
//               </nav>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// "use client";

// import { useState, useEffect, useMemo } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// import { useLanguage } from "@/components/LanguageProvider";
// import { APP_LANGUAGES, type AppLanguage } from "@/lib/i18n";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";

// export default function Header() {
//   const [isDark, setIsDark] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const pathname = usePathname();

//   const { lang, setLang } = useLanguage();

//   useEffect(() => {
//     document.body.classList.add(
//       "transition-colors",
//       "duration-500",
//       "bg-white",
//       "dark:bg-slate-900",
//       "text-gray-900",
//       "dark:text-gray-100"
//     );

//     const savedTheme = localStorage.getItem("theme");
//     const systemPrefersDark = window.matchMedia(
//       "(prefers-color-scheme: dark)"
//     ).matches;

//     if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
//       setIsDark(true);
//       document.documentElement.classList.add("dark");
//     } else {
//       setIsDark(false);
//       document.documentElement.classList.remove("dark");
//     }
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = !isDark;
//     setIsDark(newTheme);

//     document.documentElement.classList.add("transition-colors", "duration-500");
//     if (newTheme) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }

//     setTimeout(() => {
//       document.documentElement.classList.remove(
//         "transition-colors",
//         "duration-500"
//       );
//     }, 600);
//   };

//   // ✅ Translations for header UI
//   const T = useMemo(() => {
//     const nav = {
//       en: {
//         home: "Home",
//         about: "About",
//         services: "Services",
//         how: "How It Works",
//         contact: "Contact",
//         started: "Get Started",
//       },
//       fr: {
//         home: "Accueil",
//         about: "À propos",
//         services: "Services",
//         how: "Comment ça marche",
//         contact: "Contact",
//         started: "Démarrer",
//       },
//       de: {
//         home: "Start",
//         about: "Über uns",
//         services: "Leistungen",
//         how: "So funktioniert’s",
//         contact: "Kontakt",
//         started: "Loslegen",
//       },
//       lb: {
//         home: "Heem",
//         about: "Iwwer eis",
//         services: "Servicer",
//         how: "Wéi et funktionéiert",
//         contact: "Kontakt",
//         started: "Starten",
//       },
//     } satisfies Record<AppLanguage, any>;

//     return nav[lang];
//   }, [lang]);

//   const navigation = useMemo(
//     () => [
//       { name: T.home, href: "/" },
//       { name: T.about, href: "/about" },
//       { name: T.services, href: "/services" },
//       { name: T.how, href: "/how-it-works" },
//       { name: T.contact, href: "/contact" },
//     ],
//     [T]
//   );

//   const isActive = (href: string) => pathname === href;

//   // ✅ Lock scroll when mobile menu is open
//   useEffect(() => {
//     document.body.style.overflow = isMenuOpen ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isMenuOpen]);

//   // ✅ Close menu on route change
//   useEffect(() => {
//     setIsMenuOpen(false);
//   }, [pathname]);

//   // ✅ ESC closes menu
//   useEffect(() => {
//     const onKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "Escape") setIsMenuOpen(false);
//     };
//     window.addEventListener("keydown", onKeyDown);
//     return () => window.removeEventListener("keydown", onKeyDown);
//   }, []);

//   return (
//     <header
//       className="sticky top-0 left-0 w-full z-[4010] backdrop-blur-md bg-white/70 dark:bg-slate-900/70
//                  border-b border-gray-200 dark:border-slate-800 shadow-lg transition-colors duration-500"
//       style={{
//         WebkitBackdropFilter: "blur(12px)",
//         backdropFilter: "blur(12px)",
//       }}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* ✅ Header row */}
//         <div className="flex items-center justify-between h-20 w-full min-w-0 gap-3">
//           {/* ✅ Brand */}
//           <Link href="/" className="flex items-center gap-2 group min-w-0 h-auto">
//             <span
//               className="flex items-center justify-center h-14 w-14 rounded-lg border-2
//                          border-primary-500 bg-primary-100 text-primary-600
//                          dark:bg-yellow-400/10 dark:border-accent-400 dark:text-accent-500
//                          font-bold text-lg transition-all duration-200
//                          group-hover:bg-primary-200 group-hover:dark:bg-yellow-400/20 shrink-0"
//             >
//               AI
//             </span>

//             {/* ✅ Hide title on small/medium screens (when hamburger exists) */}
//             <span
//               className="hidden lg:block font-bold text-primary-600 dark:text-accent-600 transition-colors duration-200
//                          text-lg xl:text-xl min-w-0"
//               title="Lux AI Consultancy & Automation"
//             >
//               Lux AI Consultancy & Automation
//             </span>
//           </Link>

//           {/* ✅ Desktop nav (only lg+) */}
//           <nav className="hidden lg:flex items-center gap-5 min-w-0">
//             {navigation.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className={`relative font-medium transition-colors duration-200 hover:text-primary-500 dark:hover:text-accent-500 ${
//                   isActive(item.href)
//                     ? "text-primary-500 dark:text-accent-500"
//                     : "text-gray-700 dark:text-gray-300"
//                 }`}
//               >
//                 {item.name}
//                 {isActive(item.href) && (
//                   <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent-500 rounded-full" />
//                 )}
//               </Link>
//             ))}
//           </nav>

//           {/* ✅ Right controls (ALWAYS visible, never moved into menu) */}
//           <div className="flex items-center gap-2 sm:gap-3 shrink-0">
//             {/* ✅ Language switcher ALWAYS visible (shrinks to fit) */}
//             <div className="min-w-0">
//               <Select
//                 value={lang}
//                 onValueChange={(v) => setLang(v as AppLanguage)}
//               >
//                 <SelectTrigger
//                   className="h-9 w-[7rem] sm:w-[160px] lg:w-[160px] min-w-0 rounded-lg
//                              border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
//                 >
//                   <SelectValue placeholder="Language" />
//                 </SelectTrigger>

//                 <SelectContent
//                   className="z-[99999] max-h-56 overflow-auto w-[var(--radix-select-trigger-width)] max-w-[calc(100vw-2rem)]"
//                   position="popper"
//                   sideOffset={8}
//                   align="start"
//                   avoidCollisions
//                   collisionPadding={12}
//                 >
//                   {APP_LANGUAGES.map((l) => (
//                     <SelectItem key={l.code} value={l.code}>
//                       {l.label}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Theme toggle (ALWAYS visible) */}
//             <button
//               onClick={toggleTheme}
//               className="relative p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700
//                          transition-all duration-500 hover:scale-105 group"
//               aria-label="Toggle theme"
//               type="button"
//             >
//               <div className="w-5 h-5 flex items-center justify-center relative overflow-hidden">
//                 <i
//                   className={`ri-sun-line absolute transition-all duration-500 text-gray-600 dark:text-gray-300 ${
//                     isDark
//                       ? "opacity-100 rotate-0 scale-100"
//                       : "opacity-0 rotate-180 scale-0"
//                   }`}
//                 />
//                 <i
//                   className={`ri-moon-line absolute transition-all duration-500 text-gray-600 dark:text-gray-300 ${
//                     !isDark
//                       ? "opacity-100 rotate-0 scale-100"
//                       : "opacity-0 -rotate-180 scale-0"
//                   }`}
//                 />
//               </div>
//               <div className="absolute inset-0 rounded-lg bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//             </button>

//             {/* CTA (desktop only) */}
//             <Link
//               href="/contact"
//               className="hidden lg:inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg
//                          hover:bg-primary-600 hover:scale-105 transition-all duration-300 font-medium whitespace-nowrap"
//             >
//               {T.started}
//             </Link>

//             {/* Hamburger (small/medium only) */}
//             <button
//               onClick={() => setIsMenuOpen((v) => !v)}
//               className={`lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-300 ${
//                 isMenuOpen ? "scale-110 bg-gray-200 dark:bg-slate-700" : ""
//               }`}
//               aria-label="Toggle menu"
//               type="button"
//             >
//               <div
//                 className={`w-5 h-5 flex items-center justify-center transition-all duration-300 ${
//                   isMenuOpen ? "rotate-90 scale-110" : ""
//                 }`}
//               >
//                 <i
//                   className={`ri-${
//                     isMenuOpen ? "close" : "menu"
//                   }-line text-gray-600 dark:text-gray-300`}
//                 />
//               </div>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ✅ Mobile menu overlay (ONLY nav + mobile CTA; language/theme stay in header row) */}
//       <div
//         className={`lg:hidden fixed inset-0 z-[6000] transition-opacity duration-200 ${
//           isMenuOpen
//             ? "opacity-100 pointer-events-auto"
//             : "opacity-0 pointer-events-none"
//         }`}
//       >
//         {/* Backdrop */}
//         <div
//           className="absolute inset-0 bg-black/30"
//           onClick={() => setIsMenuOpen(false)}
//         />

//         {/* Panel */}
//         <div className="absolute top-16 inset-x-0 p-3">
//           <div
//             className={`mx-auto w-full max-w-sm rounded-2xl border border-gray-200 dark:border-slate-800
//                         bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-2xl
//                         transform transition-transform duration-200 ${
//                           isMenuOpen
//                             ? "translate-y-0 scale-100"
//                             : "-translate-y-2 scale-95"
//                         }`}
//             style={{
//               WebkitBackdropFilter: "blur(12px)",
//               backdropFilter: "blur(12px)",
//             }}
//           >
//             <div className="max-h-[75vh] overflow-auto py-4">
//               <nav className="flex flex-col gap-2 px-2">
//                 {navigation.map((item) => (
//                   <Link
//                     key={item.name}
//                     href={item.href}
//                     className={`px-3 py-2 font-medium transition-colors duration-200 hover:text-primary-500 dark:hover:text-accent-500 ${
//                       isActive(item.href)
//                         ? "text-primary-500 dark:text-accent-500 bg-primary-100 dark:bg-slate-800 rounded-lg"
//                         : "text-gray-700 dark:text-gray-300"
//                     }`}
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     {item.name}
//                   </Link>
//                 ))}

//                 <Link
//                   href="/contact"
//                   className="mx-1 mt-2 inline-flex items-center justify-center px-4 py-2 bg-primary-500 text-white rounded-lg
//                              hover:bg-primary-600 transition-colors duration-200 font-medium whitespace-nowrap"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   {T.started}
//                 </Link>
//               </nav>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// "use client";

// import { useState, useEffect, useMemo } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// import { useLanguage } from "@/components/LanguageProvider";
// import { APP_LANGUAGES, type AppLanguage } from "@/lib/i18n";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";

// export default function Header() {
//   const [isDark, setIsDark] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const pathname = usePathname();

//   const { lang, setLang } = useLanguage();

//   useEffect(() => {
//     document.body.classList.add(
//       "transition-colors",
//       "duration-500",
//       "bg-white",
//       "dark:bg-slate-900",
//       "text-gray-900",
//       "dark:text-gray-100"
//     );

//     const savedTheme = localStorage.getItem("theme");
//     const systemPrefersDark = window.matchMedia(
//       "(prefers-color-scheme: dark)"
//     ).matches;

//     if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
//       setIsDark(true);
//       document.documentElement.classList.add("dark");
//     } else {
//       setIsDark(false);
//       document.documentElement.classList.remove("dark");
//     }
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = !isDark;
//     setIsDark(newTheme);

//     document.documentElement.classList.add("transition-colors", "duration-500");
//     if (newTheme) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }

//     setTimeout(() => {
//       document.documentElement.classList.remove(
//         "transition-colors",
//         "duration-500"
//       );
//     }, 600);
//   };

//   // ✅ Translations for header UI
//   const T = useMemo(() => {
//     const nav = {
//       en: {
//         home: "Home",
//         about: "About",
//         services: "Services",
//         how: "How It Works",
//         contact: "Contact",
//         started: "Get Started",
//       },
//       fr: {
//         home: "Accueil",
//         about: "À propos",
//         services: "Services",
//         how: "Comment ça marche",
//         contact: "Contact",
//         started: "Démarrer",
//       },
//       de: {
//         home: "Start",
//         about: "Über uns",
//         services: "Leistungen",
//         how: "So funktioniert’s",
//         contact: "Kontakt",
//         started: "Loslegen",
//       },
//       lb: {
//         home: "Heem",
//         about: "Iwwer eis",
//         services: "Servicer",
//         how: "Wéi et funktionéiert",
//         contact: "Kontakt",
//         started: "Starten",
//       },
//     } satisfies Record<AppLanguage, any>;

//     return nav[lang];
//   }, [lang]);

//   const navigation = useMemo(
//     () => [
//       { name: T.home, href: "/" },
//       { name: T.about, href: "/about" },
//       { name: T.services, href: "/services" },
//       { name: T.how, href: "/how-it-works" },
//       { name: T.contact, href: "/contact" },
//     ],
//     [T]
//   );

//   const isActive = (href: string) => pathname === href;

//   // ✅ Lock scroll when mobile menu is open
//   useEffect(() => {
//     document.body.style.overflow = isMenuOpen ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isMenuOpen]);

//   // ✅ Close menu on route change
//   useEffect(() => {
//     setIsMenuOpen(false);
//   }, [pathname]);

//   // ✅ ESC closes menu
//   useEffect(() => {
//     const onKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "Escape") setIsMenuOpen(false);
//     };
//     window.addEventListener("keydown", onKeyDown);
//     return () => window.removeEventListener("keydown", onKeyDown);
//   }, []);

//   return (
//     <header
//       className="sticky top-0 left-0 w-full z-[4010] backdrop-blur-md bg-white/70 dark:bg-slate-900/70
//                  border-b border-gray-200 dark:border-slate-800 shadow-lg transition-colors duration-500"
//       style={{
//         WebkitBackdropFilter: "blur(12px)",
//         backdropFilter: "blur(12px)",
//       }}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* ✅ Header row */}
//         <div className="flex items-center justify-between h-16 w-full min-w-0">
//           {/* ✅ Brand */}
//           <Link href="/" className="flex items-center gap-2 group min-w-0">
//             <span
//               className="flex items-center justify-center h-10 w-10 rounded-lg border-2
//                          border-primary-500 bg-primary-100 text-primary-600
//                          dark:bg-yellow-400/10 dark:border-accent-400 dark:text-accent-500
//                          font-bold text-lg transition-all duration-200
//                          group-hover:bg-primary-200 group-hover:dark:bg-yellow-400/20 shrink-0"
//             >
//               AI
//             </span>

//             {/* Critical: allow shrink + prevent overflow */}
//             <span
//               className="font-bold text-primary-600 dark:text-accent-600 transition-colors duration-200
//                          text-base sm:text-lg lg:text-xl
//                          truncate min-w-0"
//               title="Lux AI Consultancy & Automation"
//             >
//               Lux AI Consultancy & Automation
//             </span>
//           </Link>

//           {/* ✅ Desktop nav (starts at lg to avoid iPad mini / Nest Hub overflow) */}
//           <nav className="hidden lg:flex items-center gap-6 min-w-0">
//             {navigation.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className={`relative font-medium transition-colors duration-200 hover:text-primary-500 dark:hover:text-accent-500 ${
//                   isActive(item.href)
//                     ? "text-primary-500 dark:text-accent-500"
//                     : "text-gray-700 dark:text-gray-300"
//                 }`}
//               >
//                 {item.name}
//                 {isActive(item.href) && (
//                   <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent-500 rounded-full" />
//                 )}
//               </Link>
//             ))}
//           </nav>

//           {/* ✅ Right controls */}
//           <div className="flex items-center gap-3 shrink-0">
//             {/* ✅ Language switcher (desktop only) */}
//             <div className="hidden lg:block">
//               <Select
//                 value={lang}
//                 onValueChange={(v) => setLang(v as AppLanguage)}
//               >
//                 <SelectTrigger className="h-9 w-[160px] rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm">
//                   <SelectValue placeholder="Select language" />
//                 </SelectTrigger>

//                 <SelectContent
//                   // lock width to trigger + clamp to viewport
//                   className="z-[99999] max-h-56 overflow-auto w-[var(--radix-select-trigger-width)] max-w-[calc(100vw-2rem)]"
//                   position="popper"
//                   sideOffset={8}
//                   align="start"
//                   avoidCollisions
//                   collisionPadding={12}
//                 >
//                   {APP_LANGUAGES.map((l) => (
//                     <SelectItem key={l.code} value={l.code}>
//                       {l.label}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Theme toggle */}
//             <button
//               onClick={toggleTheme}
//               className="relative p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700
//                          transition-all duration-500 hover:scale-105 group"
//               aria-label="Toggle theme"
//               type="button"
//             >
//               <div className="w-5 h-5 flex items-center justify-center relative overflow-hidden">
//                 <i
//                   className={`ri-sun-line absolute transition-all duration-500 text-gray-600 dark:text-gray-300 ${
//                     isDark
//                       ? "opacity-100 rotate-0 scale-100"
//                       : "opacity-0 rotate-180 scale-0"
//                   }`}
//                 />
//                 <i
//                   className={`ri-moon-line absolute transition-all duration-500 text-gray-600 dark:text-gray-300 ${
//                     !isDark
//                       ? "opacity-100 rotate-0 scale-100"
//                       : "opacity-0 -rotate-180 scale-0"
//                   }`}
//                 />
//               </div>
//               <div className="absolute inset-0 rounded-lg bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//             </button>

//             {/* CTA (desktop only) */}
//             <Link
//               href="/contact"
//               className="hidden lg:inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg
//                          hover:bg-primary-600 hover:scale-105 transition-all duration-300 font-medium whitespace-nowrap"
//             >
//               {T.started}
//             </Link>

//             {/* Hamburger (shown until lg) */}
//             <button
//               onClick={() => setIsMenuOpen((v) => !v)}
//               className={`lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-300 ${
//                 isMenuOpen ? "scale-110 bg-gray-200 dark:bg-slate-700" : ""
//               }`}
//               aria-label="Toggle menu"
//               type="button"
//             >
//               <div
//                 className={`w-5 h-5 flex items-center justify-center transition-all duration-300 ${
//                   isMenuOpen ? "rotate-90 scale-110" : ""
//                 }`}
//               >
//                 <i
//                   className={`ri-${
//                     isMenuOpen ? "close" : "menu"
//                   }-line text-gray-600 dark:text-gray-300`}
//                 />
//               </div>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ✅ Mobile menu overlay (covers all small/medium widths) */}
//       <div
//         className={`lg:hidden fixed inset-0 z-[6000] transition-opacity duration-200 ${
//           isMenuOpen
//             ? "opacity-100 pointer-events-auto"
//             : "opacity-0 pointer-events-none"
//         }`}
//       >
//         {/* Backdrop */}
//         <div
//           className="absolute inset-0 bg-black/30"
//           onClick={() => setIsMenuOpen(false)}
//         />

//         {/* Panel */}
//         <div className="absolute top-16 inset-x-0 p-3">
//           <div
//             className={`mx-auto w-full max-w-sm rounded-2xl border border-gray-200 dark:border-slate-800
//                         bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-2xl
//                         transform transition-transform duration-200 ${
//                           isMenuOpen
//                             ? "translate-y-0 scale-100"
//                             : "-translate-y-2 scale-95"
//                         }`}
//             style={{
//               WebkitBackdropFilter: "blur(12px)",
//               backdropFilter: "blur(12px)",
//             }}
//           >
//             {/* internal scroll so it never overflows screen */}
//             <div className="max-h-[75vh] overflow-auto py-4">
//               {/* Language switcher (mobile) */}
//               <div className="px-3 pb-3">
//                 <Select
//                   value={lang}
//                   onValueChange={(v) => setLang(v as AppLanguage)}
//                 >
//                   <SelectTrigger className="w-full h-10 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm">
//                     <SelectValue placeholder="Select language" />
//                   </SelectTrigger>

//                   <SelectContent
//                     className="z-[99999] max-h-56 overflow-auto w-[var(--radix-select-trigger-width)] max-w-[calc(100vw-2rem)]"
//                     position="popper"
//                     sideOffset={8}
//                     align="start"
//                     avoidCollisions
//                     collisionPadding={12}
//                   >
//                     {APP_LANGUAGES.map((l) => (
//                       <SelectItem key={l.code} value={l.code}>
//                         {l.label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <nav className="flex flex-col gap-2 px-2">
//                 {navigation.map((item) => (
//                   <Link
//                     key={item.name}
//                     href={item.href}
//                     className={`px-3 py-2 font-medium transition-colors duration-200 hover:text-primary-500 dark:hover:text-accent-500 ${
//                       isActive(item.href)
//                         ? "text-primary-500 dark:text-accent-500 bg-primary-100 dark:bg-slate-800 rounded-lg"
//                         : "text-gray-700 dark:text-gray-300"
//                     }`}
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     {item.name}
//                   </Link>
//                 ))}

//                 <Link
//                   href="/contact"
//                   className="mx-1 mt-2 inline-flex items-center justify-center px-4 py-2 bg-primary-500 text-white rounded-lg
//                              hover:bg-primary-600 transition-colors duration-200 font-medium whitespace-nowrap"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   {T.started}
//                 </Link>
//               </nav>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// "use client";

// import { useState, useEffect, useMemo } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// import { useLanguage } from "@/components/LanguageProvider";
// import { APP_LANGUAGES, type AppLanguage } from "@/lib/i18n";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";

// export default function Header() {
//   const [isDark, setIsDark] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const pathname = usePathname();

//   const { lang, setLang } = useLanguage();

//   useEffect(() => {
//     document.body.classList.add(
//       "transition-colors",
//       "duration-500",
//       "bg-white",
//       "dark:bg-slate-900",
//       "text-gray-900",
//       "dark:text-gray-100"
//     );

//     const savedTheme = localStorage.getItem("theme");
//     const systemPrefersDark = window.matchMedia(
//       "(prefers-color-scheme: dark)"
//     ).matches;

//     if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
//       setIsDark(true);
//       document.documentElement.classList.add("dark");
//     } else {
//       setIsDark(false);
//       document.documentElement.classList.remove("dark");
//     }
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = !isDark;
//     setIsDark(newTheme);

//     document.documentElement.classList.add("transition-colors", "duration-500");
//     if (newTheme) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }

//     setTimeout(() => {
//       document.documentElement.classList.remove(
//         "transition-colors",
//         "duration-500"
//       );
//     }, 600);
//   };

//   // ✅ Translations for header UI
//   const T = useMemo(() => {
//     const nav = {
//       en: {
//         home: "Home",
//         about: "About",
//         services: "Services",
//         how: "How It Works",
//         contact: "Contact",
//         started: "Get Started",
//       },
//       fr: {
//         home: "Accueil",
//         about: "À propos",
//         services: "Services",
//         how: "Comment ça marche",
//         contact: "Contact",
//         started: "Démarrer",
//       },
//       de: {
//         home: "Start",
//         about: "Über uns",
//         services: "Leistungen",
//         how: "So funktioniert’s",
//         contact: "Kontakt",
//         started: "Loslegen",
//       },
//       lb: {
//         home: "Heem",
//         about: "Iwwer eis",
//         services: "Servicer",
//         how: "Wéi et funktionéiert",
//         contact: "Kontakt",
//         started: "Starten",
//       },
//     } satisfies Record<AppLanguage, any>;

//     return nav[lang];
//   }, [lang]);

//   const navigation = useMemo(
//     () => [
//       { name: T.home, href: "/" },
//       { name: T.about, href: "/about" },
//       { name: T.services, href: "/services" },
//       { name: T.how, href: "/how-it-works" },
//       { name: T.contact, href: "/contact" },
//     ],
//     [T]
//   );

//   const isActive = (href: string) => pathname === href;

//   useEffect(() => {
//     document.body.style.overflow = isMenuOpen ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isMenuOpen]);

//   return (
//     <header
//       className={`sticky top-0 left-0 w-full z-[4010] backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-gray-200 dark:border-slate-800 shadow-lg transition-colors duration-500
//         //* ${isMenuOpen ? "fixed" : ""} */
//         `}
//       style={{
//         WebkitBackdropFilter: "blur(12px)",
//         backdropFilter: "blur(12px)",
//       }}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16 w-full transition-all duration-500">
//           <Link href="/" className="flex items-center space-x-2 group min-w-0">
//             <span
//               className="flex items-center justify-center h-10 w-10 rounded-lg border-2
//                 border-primary-500 bg-primary-100 text-primary-600
//                 dark:bg-yellow-400/10 dark:border-accent-400 dark:text-accent-500
//                 font-bold text-lg transition-all duration-200
//                 group-hover:bg-primary-200 group-hover:dark:bg-yellow-400/20"
//             >
//               AI
//             </span>
//             <span
//               className="text-xl font-bold
//                 text-primary-600
//                 dark:text-accent-600
//                 transition-colors duration-200 break-words"
//             >
//               Lux AI Consultancy & Automation
//             </span>
//           </Link>

//           {/* ✅ Desktop nav */}
//           <nav className="hidden md:flex items-center space-x-8">
//             {navigation.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className={`relative font-medium transition-colors duration-200 hover:text-primary-500 dark:hover:text-accent-500 ${
//                   isActive(item.href)
//                     ? "text-primary-500 dark:text-accent-500"
//                     : "text-gray-700 dark:text-gray-300"
//                 }`}
//               >
//                 {item.name}
//                 {isActive(item.href) && (
//                   <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent-500 rounded-full"></span>
//                 )}
//               </Link>
//             ))}
//           </nav>

//           <div className="flex items-center space-x-4">
//             {/* ✅ Language switcher (desktop) */}
//             <div className="hidden md:block">
//               <select
//                 value={lang}
//                 onChange={(e) => setLang(e.target.value as AppLanguage)}
//                 className="h-9 px-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-gray-700 dark:text-gray-200"
//                 aria-label="Select language"
//               >
//                 {APP_LANGUAGES.map((l) => (
//                   <option key={l.code} value={l.code}>
//                     {l.label}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <button
//               onClick={toggleTheme}
//               className="relative p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-500 hover:scale-105 group"
//               aria-label="Toggle theme"
//             >
//               <div className="w-5 h-5 flex items-center justify-center relative overflow-hidden">
//                 <i
//                   className={`ri-sun-line absolute transition-all duration-500 text-gray-600 dark:text-gray-300 ${
//                     isDark
//                       ? "opacity-100 rotate-0 scale-100"
//                       : "opacity-0 rotate-180 scale-0"
//                   }`}
//                 ></i>
//                 <i
//                   className={`ri-moon-line absolute transition-all duration-500 text-gray-600 dark:text-gray-300 ${
//                     !isDark
//                       ? "opacity-100 rotate-0 scale-100"
//                       : "opacity-0 -rotate-180 scale-0"
//                   }`}
//                 ></i>
//               </div>
//               <div className="absolute inset-0 rounded-lg bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//             </button>

//             <Link
//               href="/contact"
//               className="hidden md:inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 hover:scale-105 transition-all duration-300 font-medium whitespace-nowrap"
//             >
//               {T.started}
//             </Link>

//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className={`md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-500 ${
//                 isMenuOpen ? "scale-110 bg-gray-200 dark:bg-slate-700" : ""
//               }`}
//               aria-label="Toggle menu"
//               type="button"
//             >
//               <div
//                 className={`w-5 h-5 flex items-center justify-center transition-all duration-500 ${
//                   isMenuOpen ? "rotate-90 scale-110" : ""
//                 }`}
//               >
//                 <i
//                   className={`ri-${
//                     isMenuOpen ? "close" : "menu"
//                   }-line text-gray-600 dark:text-gray-300 transition-all duration-500`}
//                 ></i>
//               </div>
//             </button>
//           </div>
//         </div>

//         {/* ✅ Mobile menu */}
//         {/* <div
//           className={`md:hidden overflow-hidden transition-all duration-500 ${
//             isMenuOpen
//               ? "max-h-[520px] opacity-100 scale-100"
//               : "max-h-0 opacity-0 scale-95"
//           }`}
//           style={{ willChange: "max-height, opacity, transform" }}
//         >
//           <div className="py-4 border-t border-gray-200 dark:border-slate-700">

//             <div className="px-3 pb-3">
//               <select
//                 value={lang}
//                 onChange={(e) => setLang(e.target.value as AppLanguage)}
//                 className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-gray-700 dark:text-gray-200"
//                 aria-label="Select language"
//               >
//                 {APP_LANGUAGES.map((l) => (
//                   <option key={l.code} value={l.code}>
//                     {l.label}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <nav className="flex flex-col space-y-2">
//               {navigation.map((item) => (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className={`px-3 py-2 font-medium transition-colors duration-300 hover:text-primary-500 dark:hover:text-accent-500 ${
//                     isActive(item.href)
//                       ? "text-primary-500 dark:text-accent-500 bg-primary-100 dark:bg-slate-800 rounded-lg"
//                       : "text-gray-700 dark:text-gray-300"
//                   }`}
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   {item.name}
//                 </Link>
//               ))}

//               <Link
//                 href="/contact"
//                 className="mx-3 mt-2 inline-flex items-center justify-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-300 font-medium whitespace-nowrap"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 {T.started}
//               </Link>
//             </nav>
//           </div>
//         </div> */}
//         {/* ✅ Mobile menu (FIXED overlay — will NOT push content) */}
//         <div
//           className={`md:hidden fixed inset-x-0 top-16 z-[5000] transition-all duration-300 ${
//             isMenuOpen
//               ? "opacity-100 pointer-events-auto"
//               : "opacity-0 pointer-events-none"
//           }`}
//         >
//           {/* Backdrop */}
//           <div
//             className={`fixed inset-0 top-16 bg-black/30 transition-opacity duration-300 ${
//               isMenuOpen ? "opacity-100" : "opacity-0"
//             }`}
//             onClick={() => setIsMenuOpen(false)}
//           />

//           {/* Panel */}
//           <div
//             className={`relative mx-4 mt-3 rounded-2xl border border-gray-200 dark:border-slate-800
//     bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-2xl
//     transform transition-transform duration-300 ${
//       isMenuOpen ? "translate-y-0 scale-100" : "-translate-y-2 scale-95"
//     }`}
//             style={{
//               WebkitBackdropFilter: "blur(12px)",
//               backdropFilter: "blur(12px)",
//             }}
//           >
//             <div className="py-4">
//               {/* Language switcher (mobile) */}
//               <div className="px-3 pb-3">
//                 {/* <select
//                   value={lang}
//                   onChange={(e) => setLang(e.target.value as AppLanguage)}
//                   className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-gray-700 dark:text-gray-200"
//                   aria-label="Select language"
//                 >
//                   {APP_LANGUAGES.map((l) => (
//                     <option key={l.code} value={l.code}>
//                       {l.label}
//                     </option>
//                   ))}
//                 </select> */}
//                 <Select
//                   value={lang}
//                   onValueChange={(v) => setLang(v as AppLanguage)}
//                 >
//                   <SelectTrigger className="w-full h-10 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm">
//                     <SelectValue placeholder="Select language" />
//                   </SelectTrigger>

//                   <SelectContent
//                     className="max-h-56 overflow-auto z-[99999]"
//                     position="popper"
//                     sideOffset={8}
//                     align="start"
//                     avoidCollisions
//                     collisionPadding={12}
//                   >
//                     {APP_LANGUAGES.map((l) => (
//                       <SelectItem key={l.code} value={l.code}>
//                         {l.label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <nav className="flex flex-col space-y-2 px-2">
//                 {navigation.map((item) => (
//                   <Link
//                     key={item.name}
//                     href={item.href}
//                     className={`px-3 py-2 font-medium transition-colors duration-300 hover:text-primary-500 dark:hover:text-accent-500 ${
//                       isActive(item.href)
//                         ? "text-primary-500 dark:text-accent-500 bg-primary-100 dark:bg-slate-800 rounded-lg"
//                         : "text-gray-700 dark:text-gray-300"
//                     }`}
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     {item.name}
//                   </Link>
//                 ))}

//                 <Link
//                   href="/contact"
//                   className="mx-1 mt-2 inline-flex items-center justify-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-300 font-medium whitespace-nowrap"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   {T.started}
//                 </Link>
//               </nav>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export default function Header() {
//   const [isDark, setIsDark] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const pathname = usePathname();

//   useEffect(() => {
//     // Add smooth transition to body for theme changes
//     document.body.classList.add(
//       "transition-colors",
//       "duration-500",
//       "bg-white",
//       "dark:bg-slate-900",
//       "text-gray-900",
//       "dark:text-gray-100"
//     );
//     // Check for saved theme preference or default to system preference
//     const savedTheme = localStorage.getItem("theme");
//     const systemPrefersDark = window.matchMedia(
//       "(prefers-color-scheme: dark)"
//     ).matches;
//     if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
//       setIsDark(true);
//       document.documentElement.classList.add("dark");
//     } else {
//       setIsDark(false);
//       document.documentElement.classList.remove("dark");
//     }
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = !isDark;
//     setIsDark(newTheme);
//     // Add a class to animate background and text color on the html element
//     document.documentElement.classList.add("transition-colors", "duration-500");
//     if (newTheme) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//     // Remove the transition class after animation
//     setTimeout(() => {
//       document.documentElement.classList.remove(
//         "transition-colors",
//         "duration-500"
//       );
//     }, 600);
//   };

//   const navigation = [
//     { name: "Home", href: "/" },
//     { name: "About", href: "/about" },
//     { name: "Services", href: "/services" },
//     { name: "How It Works", href: "/how-it-works" },
//     { name: "Contact", href: "/contact" },
//   ];

//   const isActive = (href: string) => {
//     return pathname === href;
//   };

//   return (
//     <header
//       className={`sticky top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-gray-200 dark:border-slate-800 shadow-lg transition-colors duration-500 ${
//         isMenuOpen ? "fixed" : ""
//       }`}
//       style={{
//         WebkitBackdropFilter: "blur(12px)",
//         backdropFilter: "blur(12px)",
//       }}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16 w-full transition-all duration-500">
//           <Link href="/" className="flex items-center space-x-2 group">
//             <span
//               className="flex items-center justify-center h-10 w-10 rounded-lg border-2
//                 border-primary-500 bg-primary-100 text-primary-600
//                 dark:bg-yellow-400/10 dark:border-accent-400 dark:text-accent-500
//                 font-bold text-lg transition-all duration-200
//                 group-hover:bg-primary-200 group-hover:dark:bg-yellow-400/20"
//             >
//               AI
//             </span>
//             <span
//               className="text-xl font-bold
//                 text-primary-600
//                 dark:text-accent-600
//                 transition-colors duration-200"
//             >
//               KindFlow Automation
//             </span>
//           </Link>

//           <nav className="hidden md:flex items-center space-x-8">
//             {navigation.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className={`relative font-medium transition-colors duration-200 hover:text-primary-500 dark:hover:text-accent-500 ${
//                   isActive(item.href)
//                     ? "text-primary-500 dark:text-accent-500"
//                     : "text-gray-700 dark:text-gray-300"
//                 }`}
//               >
//                 {item.name}
//                 {isActive(item.href) && (
//                   <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent-500 rounded-full"></span>
//                 )}
//               </Link>
//             ))}
//           </nav>

//           <div className="flex items-center space-x-4">
//             <button
//               onClick={toggleTheme}
//               className="relative p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-500 hover:scale-105 group"
//               aria-label="Toggle theme"
//             >
//               <div className="w-5 h-5 flex items-center justify-center relative overflow-hidden">
//                 <i
//                   className={`ri-sun-line absolute transition-all duration-500 text-gray-600 dark:text-gray-300 ${
//                     isDark
//                       ? "opacity-100 rotate-0 scale-100"
//                       : "opacity-0 rotate-180 scale-0"
//                   }`}
//                 ></i>
//                 <i
//                   className={`ri-moon-line absolute transition-all duration-500 text-gray-600 dark:text-gray-300 ${
//                     !isDark
//                       ? "opacity-100 rotate-0 scale-100"
//                       : "opacity-0 -rotate-180 scale-0"
//                   }`}
//                 ></i>
//               </div>
//               <div className="absolute inset-0 rounded-lg bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//             </button>

//             <Link
//               href="/contact"
//               className="hidden md:inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 hover:scale-105 transition-all duration-300 font-medium whitespace-nowrap"
//             >
//               Get Started
//             </Link>

//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className={`md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-500 ${
//                 isMenuOpen ? "scale-110 bg-gray-200 dark:bg-slate-700" : ""
//               }`}
//               aria-label="Toggle menu"
//             >
//               <div
//                 className={`w-5 h-5 flex items-center justify-center transition-all duration-500 ${
//                   isMenuOpen ? "rotate-90 scale-110" : ""
//                 }`}
//               >
//                 <i
//                   className={`ri-${
//                     isMenuOpen ? "close" : "menu"
//                   }-line text-gray-600 dark:text-gray-300 transition-all duration-500`}
//                 ></i>
//               </div>
//             </button>
//           </div>
//         </div>

//         <div
//           className={`md:hidden overflow-hidden transition-all duration-500 ${
//             isMenuOpen
//               ? "max-h-96 opacity-100 scale-100"
//               : "max-h-0 opacity-0 scale-95"
//           }`}
//           style={{ willChange: "max-height, opacity, transform" }}
//         >
//           <div className="py-4 border-t border-gray-200 dark:border-slate-700">
//             <nav className="flex flex-col space-y-2">
//               {navigation.map((item) => (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className={`px-3 py-2 font-medium transition-colors duration-300 hover:text-primary-500 dark:hover:text-accent-500 ${
//                     isActive(item.href)
//                       ? "text-primary-500 dark:text-accent-500 bg-primary-100 dark:bg-slate-800 rounded-lg"
//                       : "text-gray-700 dark:text-gray-300"
//                   }`}
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   {item.name}
//                 </Link>
//               ))}
//               <Link
//                 href="/contact"
//                 className="mx-3 mt-2 inline-flex items-center justify-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-300 font-medium whitespace-nowrap"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Get Started
//               </Link>
//             </nav>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
