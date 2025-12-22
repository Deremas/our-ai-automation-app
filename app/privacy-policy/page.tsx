"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/components/LanguageProvider";
import { t } from "@/lib/site-copy";

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

export default function PrivacyPolicyPage() {
  const { lang } = useLanguage();
  const s = (k: string) =>
    t<string>(lang as any, `legal.privacy.sections.${k}`);

  const domain = s("metaDomain");
  const domainHref = domain.startsWith("http") ? domain : `https://${domain}`;
  const pdfHref = `/api/privacy-policy.pdf?lang=${encodeURIComponent(lang)}`;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Header />

      <AnimatedSection className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <header className="mb-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                  {t<string>(lang as any, "legal.privacy.title")}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-400">
                  <span>{s("metaDate")}</span>
                  <span>·</span>
                  <span>{s("metaCompany")}</span>
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
                    aria-label={`Open ${domain}`}
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
                {s("downloadPdf")}
              </a>
            </div>
          </header>

          <div className="space-y-6">
            <Section title={s("s1t")}>
              <p>{s("s1b")}</p>
            </Section>

            <Section title={s("s2t")}>
              <p>{s("s2b1")}</p>
              <p>{s("s2b2")}</p>
            </Section>

            <Section title={s("s3t")}>
              <p>{s("s3b")}</p>
            </Section>

            <Section title={s("s4t")}>
              <p>{s("s4b")}</p>
            </Section>

            <Section title={s("s5t")}>
              <p>{s("s5b")}</p>
            </Section>

            <Section title={s("s6t")}>
              <p>{s("s6b")}</p>
            </Section>

            <Section title={s("s7t")}>
              <p>{s("s7b")}</p>
            </Section>

            <Section title={s("s8t")}>
              <p>{s("s8b")}</p>

              <div className="mt-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/60 p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {s("contactLabel")}
                </p>

                <a
                  href="mailto:contact@luxaiautomation.com"
                  className="mt-2 inline-flex items-center gap-2 rounded-lg px-3 py-2 font-semibold
                             text-slate-900 dark:text-white
                             bg-white/80 dark:bg-slate-900/40
                             border border-gray-200 dark:border-slate-700
                             hover:bg-white dark:hover:bg-slate-900/60
                             hover:underline transition"
                >
                  contact@luxaiautomation.com
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    ({s("emailCta")})
                  </span>
                </a>
              </div>
            </Section>

            <div className="pt-6 mt-6 border-t border-gray-200 dark:border-slate-700">
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                {s("end")}
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

// export default function PrivacyPolicy() {
//   const { lang } = useLanguage();

//   const s = (k: string) => t<string>(lang, `legal.privacy.sections.${k}`);

//   return (
//     <div className="min-h-screen bg-white dark:bg-slate-900">
//       <Header />

//       <AnimatedSection className="py-24">
//         <div className="max-w-4xl mx-auto px-6">
//           <header className="mb-10">
//             <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
//               {t<string>(lang, "legal.privacy.title")}
//             </h1>
//             <p className="mt-3 text-sm font-bold text-gray-600 dark:text-gray-400">
//               {s("meta")}
//             </p>
//           </header>

//           <div className="space-y-6">
//             <Section title={s("s1t")}>
//               <p>{s("s1b")}</p>
//             </Section>

//             <Section title={s("s2t")}>
//               <p>{s("s2b1")}</p>
//               <p>{s("s2b2")}</p>
//             </Section>

//             <Section title={s("s3t")}>
//               <p>{s("s3b")}</p>
//             </Section>

//             <Section title={s("s4t")}>
//               <p>{s("s4b")}</p>
//             </Section>

//             <Section title={s("s5t")}>
//               <p>{s("s5b")}</p>
//             </Section>

//             <Section title={s("s6t")}>
//               <p>{s("s6b")}</p>
//             </Section>

//             <Section title={s("s7t")}>
//               <p>{s("s7b")}</p>
//             </Section>

//             <Section title={s("s8t")}>
//               <p>{s("s8b")}</p>

//               <div className="mt-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/60 p-4">
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   {s("contactLabel")}
//                 </p>

//                 <a
//                   href="mailto:contact@luxaiautomation.com"
//                   className="mt-2 inline-flex items-center gap-2 rounded-lg px-3 py-2 font-semibold
//                  text-slate-900 dark:text-white
//                  bg-white/80 dark:bg-slate-900/40
//                  border border-gray-200 dark:border-slate-700
//                  hover:bg-white dark:hover:bg-slate-900/60
//                  hover:underline transition"
//                 >
//                   contact@luxaiautomation.com
//                   <span className="text-xs text-gray-500 dark:text-gray-400">
//                     (Email us)
//                   </span>
//                 </a>
//               </div>
//             </Section>

//             <div className="pt-6 mt-6 border-t border-gray-200 dark:border-slate-700">
//               <p className="text-gray-700 dark:text-gray-300 font-medium">
//                 {s("end")}
//               </p>
//             </div>
//           </div>
//         </div>
//       </AnimatedSection>

//       <Footer />
//     </div>
//   );
// }

// "use client";

// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import AnimatedSection from "@/components/AnimatedSection";
// import { useLanguage } from "@/components/LanguageProvider";
// import { t } from "@/lib/site-copy";

// function ChevronIcon({ open }: { open: boolean }) {
//   return (
//     <svg
//       className={`h-5 w-5 transition-transform duration-200 ${
//         open ? "rotate-180" : "rotate-0"
//       }`}
//       viewBox="0 0 20 20"
//       fill="currentColor"
//       aria-hidden="true"
//     >
//       <path
//         fillRule="evenodd"
//         d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
//         clipRule="evenodd"
//       />
//     </svg>
//   );
// }

// function AccordionItem({
//   title,
//   children,
//   defaultOpen = false,
// }: {
//   title: string;
//   children: React.ReactNode;
//   defaultOpen?: boolean;
// }) {
//   // <details> has no reliable "open" state hook without client handlers,
//   // so we implement a small controlled accordion for consistent icon rotation.
//   const [open, setOpen] = React.useState(defaultOpen);

//   return (
//     <div className="rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900/40 shadow-sm">
//       <button
//         type="button"
//         onClick={() => setOpen((v) => !v)}
//         className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
//         aria-expanded={open}
//       >
//         <span className="text-lg font-semibold text-gray-900 dark:text-white">
//           {title}
//         </span>
//         <span className="text-gray-500 dark:text-gray-300">
//           <ChevronIcon open={open} />
//         </span>
//       </button>

//       {open && (
//         <div className="px-5 pb-5 text-gray-700 dark:text-gray-300 leading-relaxed">
//           {children}
//         </div>
//       )}
//     </div>
//   );
// }

// import React from "react";

// export default function PrivacyPolicy() {
//   const { lang } = useLanguage();

//   const s = (k: string) => t<string>(lang, `legal.privacy.sections.${k}`);

//   return (
//     <div className="min-h-screen bg-white dark:bg-slate-900">
//       <Header />

//       <AnimatedSection className="py-24">
//         <div className="max-w-4xl mx-auto px-6">
//           <div className="mb-8">
//             <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
//               {t<string>(lang, "legal.privacy.title")}
//             </h1>
//             <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
//               {s("meta")}
//             </p>
//           </div>

//           <div className="space-y-4">
//             <AccordionItem title={s("s1t")} defaultOpen>
//               <p>{s("s1b")}</p>
//             </AccordionItem>

//             <AccordionItem title={s("s2t")}>
//               <p className="mb-3">{s("s2b1")}</p>
//               <ul className="list-disc pl-6 space-y-2">
//                 <li>{s("s2li1")}</li>
//                 <li>{s("s2li2")}</li>
//                 <li>{s("s2li3")}</li>
//               </ul>
//               <p className="mt-4">{s("s2b2")}</p>
//             </AccordionItem>

//             <AccordionItem title={s("s3t")}>
//               <ul className="list-disc pl-6 space-y-2">
//                 <li>{s("s3li1")}</li>
//                 <li>{s("s3li2")}</li>
//                 <li>{s("s3li3")}</li>
//               </ul>
//               <p className="mt-4">{s("s3b")}</p>
//             </AccordionItem>

//             <AccordionItem title={s("s4t")}>
//               <p className="mb-3">{s("s4b")}</p>
//               <div className="rounded-xl bg-gray-50 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700 p-4 text-sm">
//                 <p className="font-medium text-gray-900 dark:text-white">
//                   {s("s4noteTitle")}
//                 </p>
//                 <p className="mt-1">{s("s4noteBody")}</p>
//               </div>
//             </AccordionItem>

//             <AccordionItem title={s("s5t")}>
//               <p>{s("s5b")}</p>
//             </AccordionItem>

//             <AccordionItem title={s("s6t")}>
//               <p>{s("s6b")}</p>
//             </AccordionItem>

//             <AccordionItem title={s("s7t")}>
//               <p>{s("s7b")}</p>
//             </AccordionItem>

//             <AccordionItem title={s("s8t")}>
//               <p className="mb-3">{s("s8b")}</p>
//               <div className="rounded-xl bg-gray-50 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700 p-4">
//                 <p className="text-gray-900 dark:text-white font-medium">
//                   {s("contactTitle")}
//                 </p>
//                 <p className="mt-1 text-gray-700 dark:text-gray-300">
//                   {s("contactBody")}
//                 </p>
//               </div>
//             </AccordionItem>

//             <p className="pt-6 mt-6 border-t border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 font-medium">
//               {s("end")}
//             </p>
//           </div>
//         </div>
//       </AnimatedSection>

//       <Footer />
//     </div>
//   );
// }

// "use client";

// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import AnimatedSection from "@/components/AnimatedSection";
// import { useLanguage } from "@/components/LanguageProvider";
// import { t } from "@/lib/site-copy";

// export default function PrivacyPolicy() {
//   const { lang } = useLanguage();

//   const s = (k: string) => t<string>(lang, `legal.privacy.sections.${k}`);

//   return (
//     <div className="min-h-screen bg-white dark:bg-slate-900">
//       <Header />

//       <AnimatedSection className="py-24">
//         <div className="max-w-4xl mx-auto px-6">
//           <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
//             {t<string>(lang, "legal.privacy.title")}
//           </h1>

//           <div className="space-y-10 text-gray-700 dark:text-gray-300 leading-relaxed">
//             <section>
//               <h2 className="text-2xl font-semibold mb-2">{s("s1t")}</h2>
//               <p>{s("s1b")}</p>
//             </section>

//             <section>
//               <h2 className="text-2xl font-semibold mb-2">{s("s2t")}</h2>
//               <p className="mb-3">{s("s2b1")}</p>
//               <p>{s("s2b2")}</p>
//             </section>

//             <section>
//               <h2 className="text-2xl font-semibold mb-2">{s("s3t")}</h2>
//               <p>{s("s3b")}</p>
//             </section>

//             <section>
//               <h2 className="text-2xl font-semibold mb-2">{s("s4t")}</h2>
//               <p>{s("s4b")}</p>
//             </section>

//             <section>
//               <h2 className="text-2xl font-semibold mb-2">{s("s5t")}</h2>
//               <p>{s("s5b")}</p>
//             </section>

//             <section>
//               <h2 className="text-2xl font-semibold mb-2">{s("s6t")}</h2>
//               <p>{s("s6b")}</p>
//             </section>

//             <section>
//               <h2 className="text-2xl font-semibold mb-2">{s("s7t")}</h2>
//               <p>{s("s7b")}</p>
//             </section>

//             <section>
//               <h2 className="text-2xl font-semibold mb-2">{s("s8t")}</h2>
//               <p>{s("s8b")}</p>
//             </section>

//             <p className="pt-6 border-t border-gray-200 dark:border-slate-700 font-medium">
//               {s("end")}
//             </p>
//           </div>
//         </div>
//       </AnimatedSection>

//       <Footer />
//     </div>
//   );
// }

// import React from 'react';
// import Header from '../../components/Header';
// import Footer from '../../components/Footer';

// export default function PrivacyPolicy() {
//   return (
//     <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors duration-300">
//       <Header />
//       <main className="flex-1 max-w-3xl mx-auto px-4 py-24 text-base text-gray-900 dark:text-gray-100">
//         <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
//         <section className="mb-8">
//           <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
//           <p className="mb-4">Your privacy is important to us. This Privacy Policy explains how we handle your information when you use our website. We are committed to protecting your personal data and being transparent about what information we collect and how we use it.</p>
//         </section>
//         <section className="mb-8">
//           <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
//           <p className="mb-4">We do not collect, store, or share any personal information unless you contact us directly. If you use our contact form, we may collect your name, email address, and any message you provide. This information is used solely to respond to your inquiry and is never shared with third parties.</p>
//           <p className="mb-4">We do not use analytics or advertising cookies. Only essential cookies are used for site functionality, such as remembering your theme preference (light or dark mode).</p>
//         </section>
//         <section className="mb-8">
//           <h2 className="text-xl font-semibold mb-2">3. How We Use Your Information</h2>
//           <p className="mb-4">Any information you provide via our contact form is used exclusively to respond to your inquiry. We do not use your information for marketing purposes or share it with any third parties.</p>
//         </section>
//         <section className="mb-8">
//           <h2 className="text-xl font-semibold mb-2">4. Cookies</h2>
//           <p className="mb-4">We use cookies only for essential site functionality, such as saving your theme preference. We do not use cookies for tracking, analytics, or advertising. You can disable cookies in your browser settings, but some features of the site may not function properly.</p>
//         </section>
//         <section className="mb-8">
//           <h2 className="text-xl font-semibold mb-2">5. Data Security</h2>
//           <p className="mb-4">We take reasonable measures to protect any information you provide from unauthorized access, disclosure, or destruction. However, please note that no method of transmission over the Internet or electronic storage is 100% secure.</p>
//         </section>
//         <section className="mb-8">
//           <h2 className="text-xl font-semibold mb-2">6. Third-Party Links</h2>
//           <p className="mb-4">Our website may contain links to third-party sites. We are not responsible for the privacy practices or content of those sites. We encourage you to review the privacy policies of any third-party sites you visit.</p>
//         </section>
//         <section className="mb-8">
//           <h2 className="text-xl font-semibold mb-2">7. Changes to This Policy</h2>
//           <p className="mb-4">We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. Your continued use of the website after changes are made constitutes your acceptance of the new policy.</p>
//         </section>
//         <section className="mb-8">
//           <h2 className="text-xl font-semibold mb-2">8. Contact Us</h2>
//           <p className="mb-4">If you have any questions or concerns about this Privacy Policy or our data practices, please contact us using the information provided on our Contact page.</p>
//         </section>
//         <section>
//           <p className="mb-4">By using this website, you agree to this privacy policy.</p>
//         </section>
//       </main>
//       <Footer />
//     </div>
//   );
// }
