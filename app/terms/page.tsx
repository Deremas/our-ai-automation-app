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

export default function TermsPage() {
  const { lang } = useLanguage();
  const s = (k: string) => t<string>(lang as any, `legal.terms.sections.${k}`);

  const domain = s("metaDomain");
  const domainHref = domain.startsWith("http") ? domain : `https://${domain}`;
  const pdfHref = `/api/terms.pdf?lang=${encodeURIComponent(lang)}`;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Header />

      <AnimatedSection className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <header className="mb-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                  {t<string>(lang as any, "legal.terms.title")}
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
              <p>{s("s2b")}</p>
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
            </Section>

            <Section title={s("s9t")}>
              <p>{s("s9b")}</p>
            </Section>

            <Section title={s("s10t")}>
              <p>{s("s10b")}</p>
            </Section>

            <Section title={s("s11t")}>
              <p>{s("s11b")}</p>
            </Section>

            {/* Contact box */}
            <section className="rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900/40 shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Contact
              </h2>

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
            </section>

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

// export default function TermsPage() {
//   const { lang } = useLanguage();
//   const s = (k: string) => t<string>(lang as any, `legal.terms.sections.${k}`);

//   const domain = s("metaDomain");
//   const domainHref = domain.startsWith("http") ? domain : `https://${domain}`;
//   const pdfHref = `/api/terms.pdf?lang=${encodeURIComponent(lang)}`;

//   return (
//     <div className="min-h-screen bg-white dark:bg-slate-900">
//       <Header />

//       <AnimatedSection className="py-24">
//         <div className="max-w-4xl mx-auto px-6">
//           <header className="mb-10">
//             <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
//               <div>
//                 <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
//                   {t<string>(lang as any, "legal.terms.title")}
//                 </h1>

//                 <div className="mt-3 flex flex-wrap items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-400">
//                   <span>{s("metaDate")}</span>
//                   <span>·</span>
//                   <span>{s("metaCompany")}</span>
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
//                 {s("downloadPdf")}
//               </a>
//             </div>
//           </header>

//           <div className="space-y-6">
//             {/* These are short terms; adjust/add sections freely */}
//             <Section title={s("s1t")}>
//               <p>{s("s1b")}</p>
//             </Section>

//             <Section title={s("s2t")}>
//               <p>{s("s2b")}</p>
//             </Section>

//             <Section title={s("s3t")}>
//               <p>{s("s3b")}</p>
//             </Section>

//             <Section title={s("s4t")}>
//               <p>{s("s4b")}</p>
//             </Section>

//             {/* Contact box */}
//             <section className="rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900/40 shadow-sm p-6">
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//                 Contact
//               </h2>

//               <div className="mt-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/60 p-4">
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   {s("contactLabel")}
//                 </p>

//                 <a
//                   href="mailto:contact@luxaiautomation.com"
//                   className="mt-2 inline-flex items-center gap-2 rounded-lg px-3 py-2 font-semibold
//                              text-slate-900 dark:text-white
//                              bg-white/80 dark:bg-slate-900/40
//                              border border-gray-200 dark:border-slate-700
//                              hover:bg-white dark:hover:bg-slate-900/60
//                              hover:underline transition"
//                 >
//                   contact@luxaiautomation.com
//                   <span className="text-xs text-gray-500 dark:text-gray-400">
//                     ({s("emailCta")})
//                   </span>
//                 </a>
//               </div>
//             </section>

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

// import React from 'react';
// import Header from '../../components/Header';
// import Footer from '../../components/Footer';

// export default function TermsOfService() {
//   return (
//     <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors duration-300">
//       <Header />
//       <main className="flex-1 max-w-3xl mx-auto px-4 py-24 text-base text-gray-900 dark:text-gray-100">
//         <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
//         <section className="mb-8">
//           <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
//           <p className="mb-4">By accessing and using this website, you agree to comply with these Terms of Service. If you do not agree with any part of these terms, please do not use our website.</p>
//         </section>
//         <section className="mb-8">
//           <h2 className="text-xl font-semibold mb-2">2. Use of the Website</h2>
//           <p className="mb-4">This website is provided for informational purposes only. You agree not to use the site for any unlawful purpose or in any way that could harm the site or its users. We reserve the right to restrict or terminate your access at any time without notice.</p>
//         </section>
//         <section className="mb-8">
//           <h2 className="text-xl font-semibold mb-2">3. Intellectual Property</h2>
//           <p className="mb-4">All content on this website, including text, images, graphics, and code, is owned by the site owner or used with permission. You may not reproduce, distribute, or create derivative works from any content without prior written consent.</p>
//         </section>
//         <section className="mb-8">
//           <h2 className="text-xl font-semibold mb-2">4. Disclaimer of Warranties</h2>
//           <p className="mb-4">This website is provided "as is" without warranties of any kind, either express or implied. We do not guarantee the accuracy, completeness, or reliability of any content on the site.</p>
//         </section>
//         <section className="mb-8">
//           <h2 className="text-xl font-semibold mb-2">5. Limitation of Liability</h2>
//           <p className="mb-4">Use of this site is at your own risk. We are not liable for any direct, indirect, incidental, or consequential damages resulting from your use of the website or any content therein.</p>
//         </section>
//         <section className="mb-8">
//           <h2 className="text-xl font-semibold mb-2">6. Third-Party Links</h2>
//           <p className="mb-4">Our website may contain links to third-party websites. We are not responsible for the content or practices of those sites. Accessing third-party sites is at your own risk and subject to their terms and policies.</p>
//         </section>
//         <section className="mb-8">
//           <h2 className="text-xl font-semibold mb-2">7. Changes to Terms</h2>
//           <p className="mb-4">We reserve the right to update or change these Terms of Service at any time. Changes will be effective immediately upon posting. Your continued use of the website constitutes acceptance of the revised terms.</p>
//         </section>
//         <section className="mb-8">
//           <h2 className="text-xl font-semibold mb-2">8. Governing Law</h2>
//           <p className="mb-4">These terms are governed by and construed in accordance with the laws of the site owner's jurisdiction, without regard to its conflict of law principles.</p>
//         </section>
//         <section>
//           <p className="mb-4">If you have any questions about these Terms of Service, please contact us using the information provided on our Contact page.</p>
//         </section>
//       </main>
//       <Footer />
//     </div>
//   );
// }
