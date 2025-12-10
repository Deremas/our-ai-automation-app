
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function HowItWorksPage() {
  const [isVisible, setIsVisible] = useState(false);
  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const steps = [
    {
      id: 1,
      title: 'Analyze Your Workflow',
      description: 'We conduct a comprehensive analysis of your current processes to identify automation opportunities and pain points.',
      details: [
        'Process mapping and documentation',
        'Bottleneck identification',
        'ROI assessment',
        'Custom solution design'
      ],
      icon: 'ri-search-eye-line',
      image: './images/analyze.jpg'
    },
    {
      id: 2,
      title: 'Deploy AI Models',
      description: 'Our team implements and configures AI solutions tailored to your specific business needs and requirements.',
      details: [
        'Custom AI model development',
        'Integration with existing systems',
        'Testing and validation',
        'Staff training and onboarding'
      ],
      icon: 'ri-robot-line',
      image: './images/deploy.jpg'
    },
    {
      id: 3,
      title: 'Monitor & Optimize',
      description: 'We continuously monitor performance and optimize your AI systems to ensure maximum efficiency and ROI.',
      details: [
        'Real-time performance monitoring',
        'Continuous improvement cycles',
        'Regular updates and maintenance',
        'Ongoing support and optimization'
      ],
      icon: 'ri-line-chart-line',
      image: './images/monitor.jpg'
    }
  ];

  const features = [
    {
      icon: 'ri-time-line',
      title: 'Quick Setup',
      description: 'Get started in just 2-3 weeks with our streamlined implementation process'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Secure Implementation',
      description: 'Enterprise-grade security measures protect your data throughout the process'
    },
    {
      icon: 'ri-customer-service-line',
      title: 'Dedicated Support',
      description: 'Personal account manager and 24/7 technical support for peace of mind'
    },
    {
      icon: 'ri-trophy-line',
      title: 'Proven Results',
      description: 'Track record of delivering measurable improvements and ROI'
    }
  ];

  const faqs = [
    {
      question: 'How long does the implementation process take?',
      answer: 'Typically 2-6 weeks depending on complexity. Simple automations can be deployed in 2-3 weeks, while complex enterprise solutions may take 4-6 weeks.'
    },
    {
      question: 'Do you provide training for our team?',
      answer: 'Yes, comprehensive training is included with every implementation. We provide hands-on training sessions and documentation to ensure your team can effectively use and maintain the AI solutions.'
    },
    {
      question: 'What kind of ongoing support do you provide?',
      answer: 'We offer 24/7 technical support, regular system updates, performance monitoring, and continuous optimization to ensure your AI solutions deliver maximum value.'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <Header />

      <motion.div
        ref={heroRef}
        className="relative py-32 bg-gradient-to-br from-[#0e427e] to-[#0f437f] overflow-hidden"
        style={{
          backgroundImage: `url('./images/page-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-[#0e427e]/80"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
            transition={{ duration: 1.2 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-8"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              How It Works
            </motion.h1>
            <motion.p
              className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Our proven 3-step process transforms your business operations with AI automation solutions
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Process Steps */}
      <AnimatedSection className="py-32 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Simple, Effective Process
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We've refined our approach to deliver consistent results across all projects
            </p>
          </AnimatedSection>

          <div className="space-y-32">
            {steps.map((step, index) => (
              <AnimatedSection
                key={step.id}
                delay={index * 0.3}
                className={`grid md:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="flex items-center mb-8">
                    <motion.div
                      className="w-16 h-16 bg-[#f9b019] rounded-full flex items-center justify-center mr-6"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <span className="text-white font-bold text-xl">{step.id}</span>
                    </motion.div>
                    <motion.div
                      className="w-20 h-20 bg-[#0e427e] dark:bg-[#f9b019] rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <i className={`${step.icon} text-white text-3xl`}></i>
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
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: detailIndex * 0.1 }}
                      >
                        <div className="w-5 h-5 flex items-center justify-center mr-3">
                          <i className="ri-check-line text-[#f9b019]"></i>
                        </div>
                        {detail}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <motion.img
                    src={step.image}
                    alt={step.title}
                    className="rounded-xl shadow-2xl w-full h-auto object-cover"
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Features Section */}
      <AnimatedSection className="py-32 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-800 dark:to-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Why Our Process Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Built on years of experience and hundreds of successful implementations
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
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-20 h-20 bg-[#0e427e] dark:bg-[#f9b019] rounded-full flex items-center justify-center mx-auto mb-6"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <i className={`${feature.icon} text-white text-3xl`}></i>
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

      {/* FAQ Section */}
      <AnimatedSection className="py-32 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Common questions about our implementation process
            </p>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div
                  className="bg-gray-50 dark:bg-slate-800 rounded-xl p-8"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-32 bg-gradient-to-r from-[#0e427e] to-[#0f437f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <AnimatedSection direction="scale">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                Let's start with a free automation audit to identify your biggest opportunities
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-10 py-5 bg-[#f9b019] text-white rounded-lg hover:bg-yellow-500 transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 whitespace-nowrap"
                >
                  Get Free Audit
                  <div className="ml-2 w-5 h-5 flex items-center justify-center">
                    <i className="ri-arrow-right-line"></i>
                  </div>
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center px-10 py-5 border-2 border-white text-white rounded-lg hover:bg-white hover:text-[#0e427e] transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 whitespace-nowrap"
                >
                  View Our Services
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
