"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { useLanguage } from "@/components/LanguageProvider";
import { t } from "@/lib/site-copy";

type StepKey = "s1" | "s2" | "s3";
type FeatureKey = "f1" | "f2" | "f3" | "f4";
type FaqKey = "q1" | "q2" | "q3";

// Hide missing translations (when t() returns the key itself)
function safeText(v: string) {
  if (!v) return "";
  if (
    v.includes(".") &&
    (v.startsWith("howItWorks.") ||
      v.startsWith("home.") ||
      v.startsWith("services."))
  )
    return "";
  return v;
}

export default function HowItWorksPage() {
  const { lang } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => setIsVisible(true), []);

  const steps = useMemo(() => {
    const keys: StepKey[] = ["s1", "s2", "s3"];
    const icons = {
      s1: "ri-search-eye-line",
      s2: "ri-git-merge-line",
      s3: "ri-line-chart-line",
    } as const;

    const images = {
      s1: "./images/build-process.jpg",
      s2: "./images/workflow-automation.png",
      s3: "./images/analytics.png",
    } as const;

    return keys.map((k, idx) => ({
      id: idx + 1,
      title: safeText(t<string>(lang, `howItWorks.steps.${k}.title`)),
      description: safeText(
        t<string>(lang, `howItWorks.steps.${k}.description`)
      ),
      details: [
        safeText(t<string>(lang, `howItWorks.steps.${k}.d1`)),
        safeText(t<string>(lang, `howItWorks.steps.${k}.d2`)),
        safeText(t<string>(lang, `howItWorks.steps.${k}.d3`)),
        safeText(t<string>(lang, `howItWorks.steps.${k}.d4`)),
      ].filter((x) => x.trim().length > 0),
      icon: icons[k],
      image: images[k],
      imageAlt:
        safeText(t<string>(lang, `howItWorks.steps.${k}.imageAlt`)) ||
        "How it works step",
    }));
  }, [lang]);

  const features = useMemo(() => {
    const keys: FeatureKey[] = ["f1", "f2", "f3", "f4"];
    const icons = {
      f1: "ri-time-line",
      f2: "ri-shield-check-line",
      f3: "ri-customer-service-2-line",
      f4: "ri-trophy-line",
    } as const;

    return keys.map((k) => ({
      icon: icons[k],
      title: safeText(t<string>(lang, `howItWorks.features.${k}.title`)),
      description: safeText(
        t<string>(lang, `howItWorks.features.${k}.description`)
      ),
    }));
  }, [lang]);

  const faqs = useMemo(() => {
    const keys: FaqKey[] = ["q1", "q2", "q3"];
    return keys
      .map((k) => ({
        question: safeText(t<string>(lang, `howItWorks.faqs.${k}.q`)),
        answer: safeText(t<string>(lang, `howItWorks.faqs.${k}.a`)),
      }))
      .filter((f) => f.question.trim() && f.answer.trim());
  }, [lang]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <Header />

      {/* Hero */}
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
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
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
              {t<string>(lang, "howItWorks.hero.title")}
            </motion.h1>

            <motion.p
              className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              animate={
                heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
              }
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {t<string>(lang, "howItWorks.hero.subtitle")}
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Process */}
      <AnimatedSection className="py-32 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t<string>(lang, "howItWorks.process.title")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t<string>(lang, "howItWorks.process.subtitle")}
            </p>
          </AnimatedSection>

          <div className="space-y-32">
            {steps.map((step, index) => (
              <AnimatedSection
                key={step.id}
                delay={index * 0.3}
                className="grid md:grid-cols-2 gap-16 items-center"
              >
                {/* Text */}
                <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
                  <div className="flex items-center mb-8">
                    <motion.div
                      className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mr-6"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <span className="text-white font-bold text-xl">
                        {step.id}
                      </span>
                    </motion.div>

                    <motion.div
                      className="w-20 h-20 bg-primary-600 dark:bg-accent-500 rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <i className={`${step.icon} text-white text-3xl`} />
                    </motion.div>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                    {step.title}
                  </h3>

                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="space-y-4">
                    {step.details.map((detail, detailIndex) => (
                      <motion.div
                        key={detailIndex}
                        className="flex items-center text-gray-600 dark:text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={
                          isVisible
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: -20 }
                        }
                        transition={{
                          duration: 0.45,
                          delay: detailIndex * 0.08,
                        }}
                      >
                        <div className="w-5 h-5 flex items-center justify-center mr-3">
                          <i className="ri-check-line text-primary-600 dark:text-accent-500" />
                        </div>
                        {detail}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Image */}
                <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
                  <motion.img
                    src={step.image}
                    alt={step.imageAlt}
                    className="rounded-xl shadow-2xl w-full h-auto object-cover"
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    transition={{ duration: 0.25 }}
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Why it works */}
      <AnimatedSection className="py-32 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-800 dark:to-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t<string>(lang, "howItWorks.features.title")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t<string>(lang, "howItWorks.features.subtitle")}
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <AnimatedSection
                key={index}
                delay={index * 0.15}
                direction="scale"
              >
                <motion.div
                  className="bg-white dark:bg-slate-700 rounded-xl p-8 text-center shadow-lg h-full flex flex-col"
                  whileHover={{
                    scale: 1.05,
                    y: -10,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  }}
                  transition={{ duration: 0.25 }}
                >
                  <motion.div
                    className="w-20 h-20 bg-primary-600 dark:bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <i className={`${feature.icon} text-white text-3xl`} />
                  </motion.div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* FAQ */}
      <AnimatedSection className="py-32 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t<string>(lang, "howItWorks.faqs.title")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t<string>(lang, "howItWorks.faqs.subtitle")}
            </p>
          </AnimatedSection>

          <FaqAccordion faqs={faqs} />
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection className="py-32 bg-gradient-to-r from-[#0e427e] to-[#0f437f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <AnimatedSection direction="scale">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                {t<string>(lang, "howItWorks.cta.title")}
              </h2>
              <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                {t<string>(lang, "howItWorks.cta.subtitle")}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-10 py-5 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 whitespace-nowrap"
                >
                  {t<string>(lang, "howItWorks.cta.primary")}
                  <div className="ml-2 w-5 h-5 flex items-center justify-center">
                    <i className="ri-arrow-right-line" />
                  </div>
                </Link>

                <Link
                  href="/services"
                  className="inline-flex items-center justify-center px-10 py-5 border-2 border-white text-white rounded-lg hover:bg-white hover:text-primary-600 dark:hover:text-accent-500 transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 whitespace-nowrap"
                >
                  {t<string>(lang, "howItWorks.cta.secondary")}
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      <Footer />
    </div>
  );
}

      function FaqAccordion({
        faqs,
      }: {
        faqs: { question: string; answer: string }[];
      }) {
        const [openIndex, setOpenIndex] = useState<number | null>(null);

        return (
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={index}
                  className="bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Header */}
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                      {faq.question}
                    </span>

                    <motion.span
                      className="shrink-0 w-9 h-9 rounded-lg bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 flex items-center justify-center"
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <i className="ri-arrow-down-s-line text-gray-700 dark:text-gray-200 text-xl" />
                    </motion.span>
                  </button>

                  {/* Content */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="px-6 overflow-hidden"
                  >
                    <div className="pb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        );
      }
