"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/components/LanguageProvider";
import { t } from "@/lib/site-copy";
import { Boxes, LayoutGrid, ShoppingCart, Monitor } from "lucide-react";
import { motion } from "framer-motion";

type RawHowItHelps = { h1?: unknown; h2?: unknown; h3?: unknown };
type RawRecommended = {
  r1?: unknown;
  r2?: unknown;
  r3?: unknown;
  r4?: unknown;
};

type RawService = {
  title?: unknown;
  description?: unknown;
  benefits?: unknown;
  f1?: unknown;
  f2?: unknown;
  f3?: unknown;
  f4?: unknown;
  imageAlt?: unknown;

  whatItIs?: unknown;
  howItHelps?: unknown;
  recommendedAddOns?: unknown;
};

type Service = {
  title: string;
  description: string;
  benefits: string;
  features: string[];
  imageAlt: string;

  whatItIs?: string;
  howItHelps?: string[];
  recommendedAddOns?: string[];
};

function toServiceArray(x: unknown): Service[] {
  if (!x || typeof x !== "object" || Array.isArray(x)) return [];
  const items = Object.values(x) as RawService[];

  return items
    .filter((s) => s && typeof s === "object")
    .map((s) => {
      const title = typeof s.title === "string" ? s.title : "";
      const description =
        typeof s.description === "string" ? s.description : "";
      const benefits = typeof s.benefits === "string" ? s.benefits : "";
      const imageAlt = typeof s.imageAlt === "string" ? s.imageAlt : title;

      // keep your existing title/description/benefits/f1..f4 to replace it easy
      const features = [s.f1, s.f2, s.f3, s.f4].filter(
        (f): f is string => typeof f === "string" && f.trim().length > 0
      );

      const whatItIs =
        typeof s.whatItIs === "string" && s.whatItIs.trim().length > 0
          ? s.whatItIs
          : undefined;

      let howItHelps: string[] | undefined;
      if (
        s.howItHelps &&
        typeof s.howItHelps === "object" &&
        !Array.isArray(s.howItHelps)
      ) {
        const h = s.howItHelps as RawHowItHelps;
        const list = [h.h1, h.h2, h.h3].filter(
          (v): v is string => typeof v === "string" && v.trim().length > 0
        );
        if (list.length) howItHelps = list;
      }

      let recommendedAddOns: string[] | undefined;
      if (
        s.recommendedAddOns &&
        typeof s.recommendedAddOns === "object" &&
        !Array.isArray(s.recommendedAddOns)
      ) {
        const r = s.recommendedAddOns as RawRecommended;
        const list = [r.r1, r.r2, r.r3, r.r4].filter(
          (v): v is string => typeof v === "string" && v.trim().length > 0
        );
        if (list.length) recommendedAddOns = list;
      }

      return {
        title,
        description,
        benefits,
        features,
        imageAlt,
        whatItIs,
        howItHelps,
        recommendedAddOns,
      };
    })
    .filter((s) => s.title.length > 0 && s.description.length > 0);
}

function safeLabel(value: string, fallback: string) {
  // If translation is missing, t() returns the key itself (e.g. "services.modal.whatItIsLabel")
  // This prevents those keys from showing in UI.
  if (!value) return fallback;
  if (value.includes(".") && value.startsWith("services.")) return fallback;
  return value;
}

export default function ServicesPage() {
  const { lang } = useLanguage();

  const servicesListRaw = t<unknown>(lang, "services.list");
  const servicesAll = toServiceArray(servicesListRaw);

  // ✅ Keep AI Strategy & Consulting as 3rd item for ALL langs
  // Now the list is: s1,s2,s3,s4,s5,s6 (strategy is s5, digital is s6)
  // desired order: s1, s2, s5, s3, s4, s6
  const order = [4, 0, 1, 2, 3, 5];
  const services = order.map((i) => servicesAll[i]).filter(Boolean);

  const platformDefs = [
    { key: "erp", Icon: Boxes },
    { key: "customApps", Icon: LayoutGrid },
    { key: "ecommerce", Icon: ShoppingCart },
    { key: "websites", Icon: Monitor },
  ] as const;

  const platforms = platformDefs.map((p) => ({
    key: p.key,
    title: t<string>(lang, `services.platforms.${p.key}.title`),
    desc: t<string>(lang, `services.platforms.${p.key}.desc`),
    Icon: p.Icon,
    points: [
      t<string>(lang, `services.platforms.${p.key}.points.p1`),
      t<string>(lang, `services.platforms.${p.key}.points.p2`),
      t<string>(lang, `services.platforms.${p.key}.points.p3`),
    ].filter(Boolean),
  }));

  // const platforms = platformDefs.map((p) => ({
  //   key: p.key,
  //   title: t<string>(lang, `home.platforms.${p.key}.title`),
  //   desc: t<string>(lang, `home.platforms.${p.key}.desc`),
  //   Icon: p.Icon,
  // }));

  const whatItIsLabel = safeLabel(
    t<string>(lang, "services.modal.whatItIsLabel"),
    "What it is:"
  );
  const coreFeaturesLabel = safeLabel(
    t<string>(lang, "services.modal.coreFeaturesLabel"),
    "Core features:"
  );
  const addOnsLabel = safeLabel(
    t<string>(lang, "services.modal.recommendedAddOnsLabel"),
    "Recommended add-ons"
  );
  const impactLabel = safeLabel(
    t<string>(lang, "services.modal.impactLabel"),
    "Impact"
  );

  const recommendedStartingPointLabel = safeLabel(
    t<string>(lang, "services.recommendedStartingPoint"),
    "Recommended starting point"
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Header />

      {/* Hero */}
      <section className="py-32 bg-gradient-to-br from-primary-500 to-primary-600 text-white text-center">
        <h1 className="text-5xl font-bold mb-6">
          {t<string>(lang, "services.hero.title")}
        </h1>
        <p className="text-xl max-w-3xl mx-auto">
          {t<string>(lang, "services.hero.subtitle")}
        </p>
      </section>

      {/* Services */}
      <AnimatedSection className="py-32">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 px-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="bg-gray-50 dark:bg-slate-800 p-8 rounded-xl shadow-lg"
            >
              {/* Strategy badge (3rd card) */}
              {i === 0 && (
                // <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-600 dark:bg-slate-700 dark:text-white">
                <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-600 dark:bg-slate-700 dark:text-accent-500">
                  <i className="ri-star-fill text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.9)]" />

                  {recommendedStartingPointLabel}
                </div>
              )}

              {/* <h3 className="text-2xl font-bold mb-3 text-primary-500"> */}
              <h3 className="text-2xl font-bold mb-3 text-primary-600 dark:text-accent-500">
                {service.title}
              </h3>

              <p className="mb-4 text-gray-600 dark:text-gray-300">
                {service.description}
              </p>

              {!!service.whatItIs && (
                <p className="mb-4 text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {whatItIsLabel}{" "}
                  </span>
                  {service.whatItIs}
                </p>
              )}

              {!!service.howItHelps?.length && (
                <ul className="mb-4 space-y-2">
                  {service.howItHelps.map((h, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <i className="ri-check-line text-accent-500" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {service.features.length > 0 && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {coreFeaturesLabel}{" "}
                  </span>
                  {service.features.join(" • ")}
                </p>
              )}

              {!!service.recommendedAddOns?.length && (
                <details className="mb-4">
                  {/* <summary className="cursor-pointer text-sm font-semibold text-primary-500"> */}
                  <summary className="cursor-pointer text-sm font-semibold text-primary-600 dark:text-accent-500">
                    {addOnsLabel}
                  </summary>
                  <ul className="mt-3 space-y-2">
                    {service.recommendedAddOns.map((r, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <i className="ri-add-circle-line text-accent-500" />
                        <span className="text-gray-600 dark:text-gray-300">
                          {r}
                        </span>
                      </li>
                    ))}
                  </ul>
                </details>
              )}

              <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                  {impactLabel}
                </p>
                {/* <p className="font-medium">{service.benefits}</p> */}
                <p className="font-medium text-gray-800 dark:text-slate-100">
                  {service.benefits}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Platforms We Build */}
        <AnimatedSection className="mt-16" delay={0.2}>
          <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-8 border border-gray-200 dark:border-slate-700">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t(lang, "services.platformsBlock.title")}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {t(lang, "services.platformsBlock.subtitle")}
              </p>
            </div>

            {/* What you get bullets (service-like) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {["b1", "b2", "b3"].map((k) => (
                <div
                  key={k}
                  className="flex items-center gap-3 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 p-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-slate-700 flex items-center justify-center shrink-0">
                    {/* <i className="ri-check-line text-primary-600 dark:text-white text-lg" /> */}
                    <i className="ri-check-line text-primary-600 dark:text-accent-500 text-lg" />
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                    {t(lang, `services.platformsBlock.bullets.${k}`)}
                  </p>
                </div>
              ))}
            </div>

            {/* Platform cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* {platforms.map((p) => (
                <div
                  key={p.key}
                  className="group bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700 transition-all duration-200 hover:shadow-md"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-slate-700 flex items-center justify-center mb-4 transition-colors group-hover:bg-primary-100 dark:group-hover:bg-slate-600">
                    <p.Icon className="w-6 h-6 text-primary-600 dark:text-white" />
                  </div>

                  <p className="font-semibold text-gray-900 dark:text-white">
                    {p.title}
                  </p>

                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {p.desc}
                  </p>

                  {!!p.points?.length && (
                    <ul className="mt-4 space-y-2">
                      {p.points.map((x, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <i className="ri-arrow-right-s-line text-accent-500 mt-0.5" />
                          <span className="text-sm text-gray-700 dark:text-gray-200">
                            {x}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))} */}
              {platforms.map((p) => (
                <motion.div
                  key={p.key}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    boxShadow: "0 22px 45px -18px rgba(0,0,0,0.25)",
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="group bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700 transition-all duration-200 hover:shadow-md"
                >
                  <motion.div
                    whileHover={{ rotate: 6, scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 300, damping: 16 }}
                    className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-slate-700 flex items-center justify-center mb-4 transition-colors group-hover:bg-primary-100 dark:group-hover:bg-slate-600"
                  >
                    {/* <p.Icon className="w-6 h-6 text-primary-600 dark:text-white" /> */}
                    <p.Icon className="w-6 h-6 text-primary-600 dark:text-accent-500" />
                  </motion.div>

                  <p className="font-semibold text-gray-900 dark:text-white">
                    {p.title}
                  </p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {p.desc}
                  </p>

                  {!!p.points?.length && (
                    <ul className="mt-4 space-y-2">
                      {p.points.map((x, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <i className="ri-arrow-right-s-line text-accent-500 mt-0.5" />
                          <span className="text-sm text-gray-700 dark:text-gray-200">
                            {x}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* CTA */}
        <div className="mt-16 flex justify-center gap-4 px-6">
          <Link
            href="/contact"
            className="px-8 py-4 bg-primary-500 text-white rounded-lg font-semibold"
          >
            {t<string>(lang, "services.cta.primary")}
          </Link>
          <Link
            href="/how-it-works"
            // className="px-8 py-4 border border-primary-500 text-primary-500 rounded-lg font-semibold"
            className="
  px-8 py-4 rounded-lg font-semibold
  border border-primary-500 text-primary-600
  dark:border-accent-500 dark:text-accent-500
"
          >
            {t<string>(lang, "services.cta.secondary")}
          </Link>
        </div>
      </AnimatedSection>

      <Footer />
    </div>
  );
}

// "use client";

// import Link from "next/link";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import AnimatedSection from "@/components/AnimatedSection";
// import { useLanguage } from "@/components/LanguageProvider";
// import { t } from "@/lib/site-copy";

// type RawService = {
//   title?: unknown;
//   description?: unknown;
//   benefits?: unknown;
//   f1?: unknown;
//   f2?: unknown;
//   f3?: unknown;
//   f4?: unknown;
//   imageAlt?: unknown;
// };

// type Service = {
//   title: string;
//   description: string;
//   benefits: string;
//   features: string[];
//   imageAlt: string;
// };

// function toServiceArray(x: unknown): Service[] {
//   if (!x || typeof x !== "object" || Array.isArray(x)) return [];

//   const items = Object.values(x) as RawService[];

//   return items
//     .filter((s) => s && typeof s === "object")
//     .map((s) => {
//       const title = typeof s.title === "string" ? s.title : "";
//       const description =
//         typeof s.description === "string" ? s.description : "";
//       const benefits = typeof s.benefits === "string" ? s.benefits : "";
//       const imageAlt = typeof s.imageAlt === "string" ? s.imageAlt : title;

//       const features = [s.f1, s.f2, s.f3, s.f4].filter(
//         (f): f is string => typeof f === "string" && f.trim().length > 0
//       );

//       return { title, description, benefits, features, imageAlt };
//     })
//     .filter((s) => s.title.length > 0 && s.description.length > 0);
// }

// export default function ServicesPage() {
//   const { lang } = useLanguage();

//   const servicesListRaw = t<unknown>(lang, "services.list");
//   const services = toServiceArray(servicesListRaw);

//   return (
//     <div className="min-h-screen bg-white dark:bg-slate-900">
//       <Header />

//       {/* Hero */}
//       <section className="py-32 bg-gradient-to-br from-primary-500 to-primary-600 text-white text-center">
//         <h1 className="text-5xl font-bold mb-6">
//           {t<string>(lang, "services.hero.title")}
//         </h1>
//         <p className="text-xl max-w-3xl mx-auto">
//           {t<string>(lang, "services.hero.subtitle")}
//         </p>
//       </section>

//       {/* Services */}
//       <AnimatedSection className="py-32">
//         <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 px-6">
//           {services.map((service, i) => (
//             <div
//               key={i}
//               className="bg-gray-50 dark:bg-slate-800 p-8 rounded-xl shadow-lg"
//             >
//               <h3 className="text-2xl font-bold mb-4 text-primary-500">
//                 {service.title}
//               </h3>
//               <p className="mb-4 text-gray-600 dark:text-gray-300">
//                 {service.description}
//               </p>

//               {service.features.length > 0 && (
//                 <ul className="mb-4 space-y-2">
//                   {service.features.map((f, j) => (
//                     <li key={j} className="flex items-center gap-2">
//                       <i className="ri-check-line text-accent-500" />
//                       {f}
//                     </li>
//                   ))}
//                 </ul>
//               )}

//               <p className="font-medium">{service.benefits}</p>
//             </div>
//           ))}
//         </div>

//         {/* CTA */}
//         <div className="mt-16 flex justify-center gap-4 px-6">
//           <Link
//             href="/contact"
//             className="px-8 py-4 bg-primary-500 text-white rounded-lg font-semibold"
//           >
//             {t<string>(lang, "services.cta.primary")}
//           </Link>
//           <Link
//             href="/how-it-works"
//             className="px-8 py-4 border border-primary-500 text-primary-500 rounded-lg font-semibold"
//           >
//             {t<string>(lang, "services.cta.secondary")}
//           </Link>
//         </div>
//       </AnimatedSection>

//       <Footer />
//     </div>
//   );
// }
