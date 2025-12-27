"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/components/LanguageProvider";
import { t } from "@/lib/site-copy";
import type { AppLanguage } from "@/lib/i18n";

type CookieSection =
  | { title: string; body: string; bodyList?: never }
  | { title: string; bodyList: string[]; body?: never };

type CookieDoc = {
  title: string;
  meta: {
    effectiveDate: string;
    company: string;
    domain: string;
    downloadPdf: string;
  };
  sections: CookieSection[];
  footer: string;
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900/40 shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
      <div className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
}

export default function CookiesPage() {
  const { lang } = useLanguage();
  const L = lang as AppLanguage;

  // expects legal.cookies.<lang> structure
  const doc = t<CookieDoc>(L, "legal.cookies");

  const domain = doc.meta.domain;
  const domainHref = domain.startsWith("http") ? domain : `https://${domain}`;
  const pdfHref = `/api/cookies.pdf?lang=${encodeURIComponent(L)}`;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Header />

      <AnimatedSection className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <header className="mb-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                  {doc.title}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-400">
                  <span>{doc.meta.effectiveDate}</span>
                  <span>·</span>
                  <span>{doc.meta.company}</span>
                  <span>·</span>

                  <a
                    href={domainHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-full px-3 py-1
                               border border-gray-200 dark:border-slate-700
                               bg-gray-50 dark:bg-slate-800/60
                               text-gray-900 dark:text-white
                               hover:opacity-80 transition"
                  >
                    {domain}
                  </a>
                </div>
              </div>

              <a
                href={pdfHref}
                className="inline-flex items-center justify-center rounded-xl px-4 py-2
                           border border-gray-200 dark:border-slate-700
                           bg-white/80 dark:bg-slate-900/40
                           text-gray-900 dark:text-white font-semibold
                           hover:bg-white dark:hover:bg-slate-900/60 transition"
              >
                {doc.meta.downloadPdf}
              </a>
            </div>
          </header>

          <div className="space-y-6">
            {doc.sections.map((sec) => (
              <Section key={sec.title} title={sec.title}>
                {"bodyList" in sec && sec.bodyList ? (
                  <ul className="list-disc pl-6 space-y-2">
                    {sec.bodyList.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{sec.body}</p>
                )}
              </Section>
            ))}

            <div className="pt-6 mt-6 border-t border-gray-200 dark:border-slate-700">
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                {doc.footer}
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <Footer />
    </div>
  );
}

// "use client";

// import React from "react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import AnimatedSection from "@/components/AnimatedSection";
// import { useLanguage } from "@/components/LanguageProvider";
// import { t } from "@/lib/site-copy";
// import type { AppLanguage } from "@/lib/i18n";

// // type CookieSection = { title: string; body: string | string[] };
// type CookieSection =
//   | { title: string; body: string; bodyList?: never }
//   | { title: string; bodyList: string[]; body?: never };

// type CookieDoc = {
//   title: string;
//   meta: {
//     effectiveDate: string;
//     company: string;
//     domain: string;
//     downloadPdf: string;
//   };
//   sections: CookieSection[];
//   footer: string;
// };

// function Section({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <section className="rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900/40 shadow-sm p-6">
//       <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//         {title}
//       </h2>
//       <div className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed space-y-3">
//         {children}
//       </div>
//     </section>
//   );
// }

// export default function CookiesPage() {
//   const { lang } = useLanguage();
//   const L = lang as AppLanguage;

//   // expects legal.cookies.<lang> structure
//   const doc = t<CookieDoc>(L, "legal.cookies");

//   const domain = doc.meta.domain;
//   const domainHref = domain.startsWith("http") ? domain : `https://${domain}`;
//   const pdfHref = `/api/cookies.pdf?lang=${encodeURIComponent(L)}`;

//   return (
//     <div className="min-h-screen bg-white dark:bg-slate-900">
//       <Header />

//       <AnimatedSection className="py-24">
//         <div className="max-w-4xl mx-auto px-6">
//           <header className="mb-10">
//             <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
//               <div>
//                 <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
//                   {doc.title}
//                 </h1>

//                 <div className="mt-3 flex flex-wrap items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-400">
//                   <span>{doc.meta.effectiveDate}</span>
//                   <span>·</span>
//                   <span>{doc.meta.company}</span>
//                   <span>·</span>

//                   <a
//                     href={domainHref}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="inline-flex items-center rounded-full px-3 py-1
//                                border border-gray-200 dark:border-slate-700
//                                bg-gray-50 dark:bg-slate-800/60
//                                text-gray-900 dark:text-white
//                                hover:opacity-80 transition"
//                   >
//                     {domain}
//                   </a>
//                 </div>
//               </div>

//               <a
//                 href={pdfHref}
//                 className="inline-flex items-center justify-center rounded-xl px-4 py-2
//                            border border-gray-200 dark:border-slate-700
//                            bg-white/80 dark:bg-slate-900/40
//                            text-gray-900 dark:text-white font-semibold
//                            hover:bg-white dark:hover:bg-slate-900/60 transition"
//               >
//                 {doc.meta.downloadPdf}
//               </a>
//             </div>
//           </header>

//           <div className="space-y-6">
//             {doc.sections.map((sec) => (
//               <Section key={sec.title} title={sec.title}>
//                 {Array.isArray(sec.body) ? (
//                   <ul className="list-disc pl-6 space-y-2">
//                     {sec.body.map((line, i) => (
//                       <li key={i}>{line}</li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p>{sec.body}</p>
//                 )}
//               </Section>
//             ))}

//             <div className="pt-6 mt-6 border-t border-gray-200 dark:border-slate-700">
//               <p className="text-gray-700 dark:text-gray-300 font-medium">
//                 {doc.footer}
//               </p>
//             </div>
//           </div>
//         </div>
//       </AnimatedSection>

//       <Footer />
//     </div>
//   );
// }
