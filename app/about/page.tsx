"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { useLanguage } from "@/components/LanguageProvider";
import { t } from "@/lib/site-copy";

type Stat = { number: string; label: string };
type TimelineItem = { year: string; title: string; description: string };

export default function AboutPage() {
  const { lang } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => setIsVisible(true), []);

  const stats: Stat[] = [
    {
      number: "10+",
      label: t<string>(lang, "about.stats.businessesAutomated"),
    },
    // { number: "1M+", label: t<string>(lang, "about.stats.tasksProcessed") },
    { number: "95%", label: t<string>(lang, "about.stats.workflowAccuracy") },
    { number: "24/7", label: t<string>(lang, "about.stats.supportAvailable") },
  ];

  const timeline: TimelineItem[] = [
    "foundation",
    "research",
    "building",
    "next",
  ].map((step) => ({
    year: t<string>(lang, `about.timeline.${step}.label`), // shown as the “year” line
    title: t<string>(lang, `about.timeline.${step}.title`),
    description: t<string>(lang, `about.timeline.${step}.description`),
  }));


  const tags: string[] = ["tag1", "tag2", "tag3"].map((k) =>
    t<string>(lang, `about.vision.tags.${k}`)
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <Header />

      {/* ✅ Only the page content gets overflow-x-hidden (keeps sticky header working) */}
      <div className="overflow-x-hidden">
        <motion.div
          ref={heroRef}
          className="relative py-32 bg-gradient-to-br from-[#0e427e] to-[#0f437f] overflow-hidden"
          style={{
            backgroundImage: `url('./images/page-bg.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[#0e427e]/80" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={
                heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }
              }
              transition={{ duration: 1.2 }}
            >
              <motion.h1
                className="text-5xl md:text-7xl font-bold text-white mb-8"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={
                  heroInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.5 }
                }
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {t<string>(lang, "about.hero.title")}
              </motion.h1>

              <motion.p
                className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 50 }}
                animate={
                  heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {t<string>(lang, "about.hero.subtitle")}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <AnimatedSection className="py-32 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-slate-800 dark:to-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <AnimatedSection
                  key={index}
                  delay={index * 0.1}
                  direction="scale"
                >
                  <motion.div
                    className="bg-white dark:bg-slate-700 rounded-xl p-8 shadow-lg text-center"
                    whileHover={{
                      scale: 1.05,
                      y: -10,
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="text-4xl md:text-5xl font-bold text-[#0e427e] dark:text-[#f9b019] mb-3"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-gray-600 dark:text-gray-300 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Vision Section */}
        <AnimatedSection className="py-32 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <AnimatedSection direction="left">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
                  {t<string>(lang, "about.vision.title")}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  {t<string>(lang, "about.vision.p1")}
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  {t<string>(lang, "about.vision.p2")}
                </p>
                <div className="flex flex-wrap gap-4">
                  {tags.map((tag, index) => (
                    <motion.span
                      key={index}
                      className="px-6 py-3 bg-[#0e427e] text-white rounded-full text-sm font-medium"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection direction="right" delay={0.3}>
                <motion.img
                  src="./images/about.jpg"
                  alt={t<string>(lang, "about.vision.imageAlt")}
                  className="rounded-xl shadow-2xl w-full h-auto object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatedSection>
            </div>
          </div>
        </AnimatedSection>

        {/* Timeline Section */}
        <AnimatedSection className="py-32 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-800 dark:to-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {t<string>(lang, "about.journey.title")}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {t<string>(lang, "about.journey.subtitle")}
              </p>
            </AnimatedSection>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#0e427e] dark:bg-[#f9b019] rounded-full" />

              {timeline.map((item, index) => (
                <AnimatedSection
                  key={index}
                  delay={index * 0.2}
                  direction="up"
                  className="relative mb-16"
                >
                  <div
                    className={`flex items-center relative ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className="flex-1 md:w-1/2 z-10">
                      <motion.div
                        className={`bg-white dark:bg-slate-700 rounded-xl p-8 shadow-lg mx-4 ${
                          index % 2 === 0
                            ? "md:mr-8 md:ml-0"
                            : "md:ml-8 md:mr-0"
                        }`}
                        whileHover={{
                          scale: 1.05,
                          y: -10,
                          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="text-[#f9b019] font-bold text-xl mb-3">
                          {item.year}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {item.description}
                        </p>
                      </motion.div>
                    </div>

                    <motion.div
                      className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#f9b019] rounded-full border-4 border-white dark:border-slate-700 z-0"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                    />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection className="py-32 bg-gradient-to-r from-[#0e427e] to-[#0f437f] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection direction="scale">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                {t<string>(lang, "about.cta.title")}
              </h2>
              <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                {t<string>(lang, "about.cta.subtitle")}
              </p>
              <motion.a
                href="/contact"
                className="inline-flex items-center px-10 py-5 bg-[#f9b019] text-white rounded-lg hover:bg-yellow-500 transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl whitespace-nowrap"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {t<string>(lang, "about.cta.button")}
                <div className="ml-2 w-5 h-5 flex items-center justify-center">
                  <i className="ri-arrow-right-line" />
                </div>
              </motion.a>
            </AnimatedSection>
          </div>
        </AnimatedSection>

        <Footer />
      </div>
    </div>
  );
}
