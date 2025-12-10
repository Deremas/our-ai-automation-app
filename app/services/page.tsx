
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ServicesPage() {
  const [isVisible, setIsVisible] = useState(false);
  type Service = {
    id: number;
    title: string;
    description: string;
    icon: string;
    features: string[];
    benefits: string;
    image: string;
  };
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      id: 1,
      title: 'AI Workflow Automation',
      description: 'Streamline your business processes with intelligent automation that learns and adapts to your workflow patterns.',
      icon: 'ri-robot-line',
      features: ['Process Mining', 'Automated Decision Making', 'Workflow Optimization', 'Real-time Monitoring'],
      benefits: 'Reduce manual work by 80% and increase accuracy by 95%',
      image: './images/workflow1.jpg'
    },
    {
      id: 2,
      title: 'AI-Powered Chatbots',
      description: 'Deploy intelligent conversational agents that provide 24/7 customer support with human-like interactions.',
      icon: 'ri-chat-3-line',
      features: ['Natural Language Processing', 'Multi-language Support', 'Integration Ready', 'Learning Capabilities'],
      benefits: 'Handle 90% of customer inquiries instantly and improve satisfaction rates',
      image: './images/workflow2.jpg'
    },
    {
      id: 3,
      title: 'Process Optimization',
      description: 'Analyze and enhance your existing processes using AI-driven insights and recommendations.',
      icon: 'ri-settings-3-line',
      features: ['Performance Analytics', 'Bottleneck Detection', 'Resource Allocation', 'Continuous Improvement'],
      benefits: 'Optimize efficiency by 60% and reduce operational costs significantly',
      image: './images/workflow3.jpg'
    },
    {
      id: 4,
      title: 'Predictive Analytics',
      description: 'Leverage machine learning to forecast trends, identify opportunities, and make data-driven decisions.',
      icon: 'ri-line-chart-line',
      features: ['Trend Forecasting', 'Risk Assessment', 'Market Analysis', 'Strategic Planning'],
      benefits: 'Increase forecast accuracy by 85% and identify opportunities 3 months earlier',
      image: './images/workflow4.jpg'
    }
  ];

  // ...existing code...
  const ServiceModal = ({ service, onClose }: { service: Service | null; onClose: () => void }) => {
    if (!service) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {service.title}
              </h3>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors duration-200"
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-close-line text-gray-500"></i>
                </div>
              </button>
            </div>

            <img 
              src={service.image}
              alt={service.title}
              className="w-full h-48 object-cover rounded-lg mb-6"
            />

            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
              {service.description}
            </p>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Key Features
              </h4>
              <ul className="space-y-2">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                    <div className="w-5 h-5 flex items-center justify-center mr-3">
                      <i className="ri-check-line text-accent-500"></i>
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-primary-500/10 dark:bg-accent-500/10 rounded-lg p-4 mb-6">
              <h4 className="text-lg font-semibold text-primary-500 dark:text-accent-500 mb-2">
                Expected Benefits
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                {service.benefits}
              </p>
            </div>

            <div className="flex gap-4">
              <Link 
                href="/contact"
                className="flex-1 bg-primary-500 text-white py-3 px-6 rounded-lg hover:bg-primary-600 transition-colors duration-300 text-center font-medium whitespace-nowrap"
              >
                Get Started
              </Link>
              <button 
                onClick={onClose}
                className="flex-1 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-200 font-medium whitespace-nowrap"
              >
                Close
              </button>
            </div>
          </div>
        </div>
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <Header />

      {/* Hero Section */}
      <AnimatedSection className="relative py-32 bg-gradient-to-br from-primary-500 to-primary-600 overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: "url('./images/page-bg.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0
          }}
        />
        <div className="absolute inset-0 bg-primary-500/80" style={{ zIndex: 1 }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{ zIndex: 2 }}>
          <motion.div className={`transition-all duration-1000 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our AI Services
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Comprehensive AI automation solutions designed to transform your business operations and drive unprecedented growth
            </p>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Services Grid Section */}
      <AnimatedSection className="py-32 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <AnimatedSection key={service.id} delay={index * 0.15}>
                <div 
                  className={`group bg-gray-50 dark:bg-slate-800 rounded-xl p-8 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 200}ms` }}
                  onClick={() => setSelectedService(service)}
                >
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary-500 dark:bg-accent-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <i className={`${service.icon} text-white text-xl`}></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center text-primary-500 dark:text-accent-500 font-medium group-hover:text-accent-500 dark:group-hover:text-white transition-colors duration-200">
                    <span>Learn More</span>
                    <div className="w-5 h-5 flex items-center justify-center ml-2 group-hover:translate-x-1 transition-transform duration-200">
                      <i className="ri-arrow-right-line"></i>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Why Choose Section */}
      <AnimatedSection className="py-32 bg-gray-50 dark:bg-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our AI Solutions?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We combine cutting-edge technology with human expertise to deliver results that matter
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection delay={0}>
              <div className="text-center transition-all duration-1000">
                <div className="w-16 h-16 bg-primary-500 dark:bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-speed-line text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Fast Implementation
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Deploy AI solutions in weeks, not months, with our proven methodology
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="text-center transition-all duration-1000">
                <div className="w-16 h-16 bg-primary-500 dark:bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-shield-check-line text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Secure & Reliable
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Enterprise-grade security with 99.9% uptime guarantee
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <div className="text-center transition-all duration-1000">
                <div className="w-16 h-16 bg-primary-500 dark:bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-customer-service-line text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  24/7 Support
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Dedicated support team available around the clock
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-32 bg-primary-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's discuss how our AI solutions can transform your business operations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-all duration-300 font-medium text-lg hover:scale-105 whitespace-nowrap group"
              >
                Get Free Consultation
                <div className="w-5 h-5 ml-2 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                  <i className="ri-arrow-right-line"></i>
                </div>
              </Link>
              <Link 
                href="/how-it-works"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-primary-500 transition-all duration-300 font-medium text-lg hover:scale-105 whitespace-nowrap group"
              >
                Learn How It Works
                <div className="w-5 h-5 ml-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <i className="ri-play-circle-line"></i>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <Footer />
      <ServiceModal 
        service={selectedService} 
        onClose={() => setSelectedService(null)} 
      />
    </div>
  );
}
