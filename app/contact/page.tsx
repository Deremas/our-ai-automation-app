
'use client';

import { useEffect, useState } from 'react';
function AlertModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-8 max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Not Implemented</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">This is a template. Backend functionality is not implemented.</p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all duration-200 font-medium"
        >
          Close
        </button>
      </div>
    </div>
  );
}
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    taskDescription: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowAlert(true);
    }, 600);
  };

  const contactInfo = [
    {
      icon: 'ri-mail-line',
      title: 'Email Us',
      content: 'hello@aiautomation.com',
      description: 'Get in touch for project inquiries'
    },
    {
      icon: 'ri-phone-line',
      title: 'Call Us',
      content: '+1 (555) 123-4567',
      description: 'Mon-Fri 9AM-6PM PST'
    },
    {
      icon: 'ri-map-pin-line',
      title: 'Visit Us',
      content: 'San Francisco, CA',
      description: 'Schedule an in-person meeting'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <Header />
      <AlertModal open={showAlert} onClose={() => setShowAlert(false)} />
      
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
              Let's Automate Something Together
            </motion.h1>
            <motion.p 
              className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Ready to transform your business with AI automation? Tell us about your challenges and we'll create a custom solution
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Contact Form Section */}
      <AnimatedSection className="py-32 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <AnimatedSection>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-10">
                  Get Started with AI Automation
                </h2>
                
                <form id="contact-form" onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <AnimatedSection delay={0.1}>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-6 py-4 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-[#0e427e] focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white text-sm"
                        placeholder="John Doe"
                      />
                    </AnimatedSection>
                    
                    <AnimatedSection delay={0.2}>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-6 py-4 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-[#0e427e] focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white text-sm"
                        placeholder="john@company.com"
                      />
                    </AnimatedSection>
                  </div>

                  <AnimatedSection delay={0.3}>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      className="w-full px-6 py-4 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-[#0e427e] focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white text-sm"
                      placeholder="Your Company Inc."
                    />
                  </AnimatedSection>

                  <AnimatedSection delay={0.4}>
                    <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Task to Automate *
                    </label>
                    <textarea
                      id="taskDescription"
                      name="taskDescription"
                      value={formData.taskDescription}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      maxLength={500}
                      className="w-full px-6 py-4 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-[#0e427e] focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white text-sm resize-none"
                      placeholder="Describe the process you'd like to automate (e.g., invoice processing, customer support, data entry, etc.)"
                    />
                    <div className="text-right text-sm text-gray-500 dark:text-gray-400 mt-2">
                      {formData.taskDescription.length}/500
                    </div>
                  </AnimatedSection>

                  <AnimatedSection delay={0.5}>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#0e427e] text-white py-4 px-8 rounded-lg hover:bg-[#0f437f] transition-all duration-200 font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? 'Sending...' : 'Get Free Consultation'}
                    </motion.button>
                  </AnimatedSection>

                  {submitStatus && (
                    <AnimatedSection>
                      <div className={`p-4 rounded-lg text-center font-medium ${
                        submitStatus.includes('Thank you') 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}>
                        {submitStatus}
                      </div>
                    </AnimatedSection>
                  )}
                </form>
              </AnimatedSection>
            </div>

            <div className="space-y-10">
              <AnimatedSection delay={0.2}>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                  Get in Touch
                </h3>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <AnimatedSection key={index} delay={index * 0.1}>
                      <motion.div 
                        className="flex items-start space-x-4 p-6 bg-gray-50 dark:bg-slate-800 rounded-lg"
                        whileHover={{ scale: 1.02, y: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div 
                          className="w-12 h-12 bg-[#0e427e] dark:bg-[#f9b019] rounded-full flex items-center justify-center"
                          animate={{
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        >
                          <i className={`${info.icon} text-white text-xl`}></i>
                        </motion.div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                            {info.title}
                          </h4>
                          <p className="text-[#0e427e] dark:text-[#f9b019] font-medium mb-1">
                            {info.content}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {info.description}
                          </p>
                        </div>
                      </motion.div>
                    </AnimatedSection>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Why Choose Us?
                </h3>
                <div className="space-y-4">
                  {[
                    'Free initial consultation',
                    'Custom solutions for your needs',
                    '24/7 ongoing support',
                    'Proven track record'
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center text-gray-600 dark:text-gray-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="w-5 h-5 flex items-center justify-center mr-3">
                        <i className="ri-check-line text-[#f9b019]"></i>
                      </div>
                      {item}
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection className="py-32 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-800 dark:to-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Real results from businesses that transformed with AI automation
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "AI automation reduced our invoice processing time by 70% and eliminated errors completely. The ROI was visible within the first month.",
                author: "Sarah Johnson",
                role: "Operations Manager",
                image: "./avatars/avataaars.svg"
              },
              {
                quote: "The chatbot handles 90% of our customer inquiries automatically. Our team can now focus on strategic initiatives instead of repetitive tasks.",
                author: "Michael Chen",
                role: "CEO",
                image: "./avatars/avataaars-3.svg"
              },
              {
                quote: "Predictive analytics helped us identify market trends 3 months early. This gave us a competitive advantage that increased revenue by 25%.",
                author: "Emily Rodriguez",
                role: "VP of Operations",
                image: "./avatars/avataaars-2.svg"
              }
            ].map((testimonial, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div 
                  className="bg-white dark:bg-slate-700 rounded-xl p-8 shadow-lg"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center mb-6">
                    <img 
                      src={testimonial.image}
                      alt="Client"
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic">
                    "{testimonial.quote}"
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <Footer />
    </div>
  );
}
