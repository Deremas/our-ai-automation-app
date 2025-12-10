"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: statsRef, inView: statsInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <Header />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800"
      >
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-10"></div>

        <motion.div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -100 }}
              animate={
                heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }
              }
              transition={{ duration: 1, delay: 0.2 }}
            >
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
                initial={{ opacity: 0, y: 50 }}
                animate={
                  heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Automate Your
                </motion.span>
                <motion.span
                  className="block text-primary-500 dark:text-accent-500"
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  Business with
                </motion.span>
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  AI-Powered Solutions
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={
                  heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                Boost efficiency, reduce costs, and scale smarter through AI.
                Transform your workflows with intelligent automation that works
                24/7.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={
                  heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 whitespace-nowrap group"
                >
                  Get a Free Automation Audit
                  <div className="w-5 h-5 ml-2 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                    <i className="ri-arrow-right-line"></i>
                  </div>
                </Link>

                <Link
                  href="/how-it-works"
                  className="inline-flex items-center justify-center px-8 py-4 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 whitespace-nowrap group"
                >
                  Learn How It Works
                  <div className="w-5 h-5 ml-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <i className="ri-play-circle-line"></i>
                  </div>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={
                heroInView
                  ? { opacity: 1, x: 0, scale: 1 }
                  : { opacity: 0, x: 100, scale: 0.8 }
              }
              transition={{ duration: 1.2, delay: 0.6 }}
            >
              <motion.img
                src="/images/hero.jpg"
                alt="AI Automation Illustration"
                className="w-full h-auto max-w-lg mx-auto rounded-2xl shadow-2xl object-cover"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -top-4 -left-4 w-72 h-72 bg-primary-500 rounded-full opacity-10"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-4 -right-4 w-96 h-96 bg-accent-500 rounded-full opacity-10"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-32 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              {
                icon: "ri-robot-line",
                number: "10+",
                label: "Businesses Automated",
                color: "bg-primary-500",
              },
              {
                icon: "ri-flashlight-line",
                number: "95%",
                label: "Workflow Accuracy",
                color: "bg-accent-500",
              },
              {
                icon: "ri-time-line",
                number: "24/7",
                label: "Automated Operations",
                color: "bg-primary-500",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="space-y-6"
                initial={{ opacity: 0, y: 100 }}
                animate={
                  statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }
                }
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
              >
                <motion.div
                  className={`w-20 h-20 ${stat.color} rounded-full flex items-center justify-center mx-auto`}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <i className={`${stat.icon} text-white text-3xl`}></i>
                </motion.div>
                <motion.h3
                  className="text-4xl font-bold text-primary-500 dark:text-accent-500"
                  initial={{ scale: 0 }}
                  animate={statsInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                >
                  {stat.number}
                </motion.h3>
                <p className="text-gray-600 dark:text-gray-300 font-medium text-lg">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <AnimatedSection className="py-32 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-800 dark:to-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20" delay={0.2}>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Trusted by Forward-Thinking Companies
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join leading businesses that have transformed their operations
              with our AI automation solutions.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {[
              { name: "TechCorp", logo: "ri-building-line" },
              { name: "InnovateLabs", logo: "ri-flask-line" },
              { name: "DataFlow", logo: "ri-database-line" },
              { name: "CloudSync", logo: "ri-cloud-line" },
              { name: "SmartOps", logo: "ri-settings-line" },
              { name: "FutureAI", logo: "ri-robot-line" },
            ].map((client, index) => (
              <AnimatedSection
                key={index}
                delay={index * 0.1}
                direction="scale"
                className="group cursor-pointer"
              >
                <motion.div
                  className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 text-center"
                  whileHover={{
                    scale: 1.05,
                    y: -10,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-500 transition-colors duration-300">
                    <i
                      className={`${client.logo} text-gray-600 dark:text-gray-300 group-hover:text-white text-2xl`}
                    ></i>
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {client.name}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Services Preview */}
      <AnimatedSection className="py-32 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Transform Your Business Operations
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From workflow automation to intelligent chatbots, we deliver AI
              solutions that drive real results.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "AI Workflow Automation",
                description: "Streamline repetitive tasks and processes",
                icon: "ri-flow-chart",
                color: "bg-blue-500",
              },
              {
                title: "AI-Powered Chatbots",
                description: "Intelligent customer service automation",
                icon: "ri-robot-line",
                color: "bg-yellow-500",
              },
              {
                title: "Process Optimization",
                description: "Analyze and improve business workflows",
                icon: "ri-settings-3-line",
                color: "bg-green-500",
              },
              {
                title: "Predictive Analytics",
                description: "Data-driven insights for better decisions",
                icon: "ri-bar-chart-line",
                color: "bg-purple-500",
              },
            ].map((service, index) => (
              <AnimatedSection key={index} delay={index * 0.1} direction="up">
                <motion.div
                  className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-8 shadow-lg transition-all duration-300 h-full flex flex-col"
                  whileHover={{
                    scale: 1.05,
                    y: -10,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className={`w-16 h-16 ${service.color} rounded-xl flex items-center justify-center mb-6`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <i className={`${service.icon} text-white text-2xl`}></i>
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {service.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-16" delay={0.6}>
            <Link
              href="/services"
              className="inline-flex items-center px-8 py-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 whitespace-nowrap group"
            >
              View All Services
              <div className="w-5 h-5 ml-2 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                <i className="ri-arrow-right-line"></i>
              </div>
            </Link>
          </AnimatedSection>
        </div>
      </AnimatedSection>

      {/* Team Section */}
      <AnimatedSection className="py-32 bg-gray-100 dark:bg-slate-700 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The people behind our AI automation solutions — dedicated to
              transforming workflows and unlocking business efficiency.
            </p>
          </AnimatedSection>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Molla Sisay",
                role: "AI Automation Strategist",
                quote:
                  "I help businesses simplify complex processes and design automation systems that enhance efficiency and reduce bottlenecks.",
                image: "/avatars/avataaars-3.svg",
                tags: [
                  "Process Automation",
                  "Workflow Design",
                  "System Analysis",
                ],
                linkedin: "#",
                twitter: "#",
                email: "mailto:molla@example.com",
              },
              {
                name: "Fikremariam Mekonnen",
                role: "AI & Integrations Engineer",
                quote:
                  "I specialize in building scalable integrations and automation systems that work reliably in real business environments.",
                image: "/avatars/avataaars-3.svg",
                tags: [
                  "API Integrations",
                  "Automation Engineering",
                  "AI Systems",
                ],
                linkedin: "#",
                twitter: "#",
                email: "mailto:fikremariam@example.com",
              },
              {
                name: "Dereje Masresha",
                role: "Full-Stack & AI Solutions Developer",
                quote:
                  "My work focuses on building intelligent automation tools and seamless user experiences powered by AI.",
                image: "/avatars/avataaars-3.svg",
                tags: ["Full-Stack Dev", "AI Chatbots", "Automation Platforms"],
                linkedin: "https://linkedin.com/in/derejemasresha",
                twitter: "#",
                email: "mailto:derejemasresha27@gmail.com",
              },
            ].map((member, index) => (
              <AnimatedSection key={index} delay={index * 0.2} direction="up">
                <motion.div
                  className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-xl border border-gray-200 dark:border-slate-700 h-full flex flex-col"
                  whileHover={{
                    scale: 1.05,
                    y: -10,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Avatar + Name + Role */}
                  <div className="flex items-center mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {member.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                    "{member.quote}"
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {member.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-accent-50 text-accent-600 
                  dark:bg-slate-800 dark:text-accent-300 border border-accent-100 dark:border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Social Icons */}
                  <div className="mt-auto flex items-center gap-4">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      className="text-gray-600 dark:text-gray-300 hover:text-accent-500 
                dark:hover:text-accent-400 text-lg transition"
                    >
                      <i className="ri-linkedin-box-fill"></i>
                    </a>

                    <a
                      href={member.twitter}
                      target="_blank"
                      className="text-gray-600 dark:text-gray-300 hover:text-accent-500 
                dark:hover:text-accent-400 text-lg transition"
                    >
                      <i className="ri-twitter-x-fill"></i>
                    </a>

                    <a
                      href={member.email}
                      className="text-gray-600 dark:text-gray-300 hover:text-accent-500 
                dark:hover:text-accent-400 text-lg transition"
                    >
                      <i className="ri-mail-fill"></i>
                    </a>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection className="py-32 bg-gray-50 dark:bg-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Real results from businesses that have transformed their
              operations with AI automation.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "AI automation reduced our email response time by 70% and freed up our team to focus on strategic initiatives.",
                author: "Sarah Johnson",
                role: "CEO, TechCorp",
                image: "/avatars/avataaars.svg",
              },
              {
                quote:
                  "The workflow automation saved us 15 hours per week on invoice processing. ROI was immediate and truly impressive.",
                author: "Michael Chen",
                role: "Operations Manager, InnovateLabs",
                image: "/avatars/avataaars-3.svg",
              },
              {
                quote:
                  "Our AI chatbot now handles 80% of customer queries instantly. Customer satisfaction has never been higher, all time high.",
                author: "Lisa Rodriguez",
                role: "Customer Success Director, DataFlow",
                image: "/avatars/avataaars-2.svg",
              },
            ].map((testimonial, index) => (
              <AnimatedSection key={index} delay={index * 0.2} direction="up">
                <motion.div
                  className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-xl border border-gray-200 dark:border-slate-700 h-full flex flex-col"
                  whileHover={{
                    scale: 1.05,
                    y: -10,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-5 h-5 flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 + index * 0.2 }}
                      >
                        <i className="ri-star-fill text-accent-500"></i>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 italic text-lg">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-32 bg-gradient-to-r from-[#0e427e] to-[#0f437f] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection direction="scale">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to Automate Your Business?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
              Join the businesses already saving time and money with AI
              automation. Get your free consultation today.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-10 py-5 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 whitespace-nowrap group"
            >
              Start Your Automation Journey
              <div className="w-5 h-5 ml-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <i className="ri-rocket-line"></i>
              </div>
            </Link>
          </AnimatedSection>
        </div>
      </AnimatedSection>

      <Footer />
    </div>
  );
}
