
import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors duration-300">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-24 text-base text-gray-900 dark:text-gray-100">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
          <p className="mb-4">Your privacy is important to us. This Privacy Policy explains how we handle your information when you use our website. We are committed to protecting your personal data and being transparent about what information we collect and how we use it.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
          <p className="mb-4">We do not collect, store, or share any personal information unless you contact us directly. If you use our contact form, we may collect your name, email address, and any message you provide. This information is used solely to respond to your inquiry and is never shared with third parties.</p>
          <p className="mb-4">We do not use analytics or advertising cookies. Only essential cookies are used for site functionality, such as remembering your theme preference (light or dark mode).</p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">3. How We Use Your Information</h2>
          <p className="mb-4">Any information you provide via our contact form is used exclusively to respond to your inquiry. We do not use your information for marketing purposes or share it with any third parties.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">4. Cookies</h2>
          <p className="mb-4">We use cookies only for essential site functionality, such as saving your theme preference. We do not use cookies for tracking, analytics, or advertising. You can disable cookies in your browser settings, but some features of the site may not function properly.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">5. Data Security</h2>
          <p className="mb-4">We take reasonable measures to protect any information you provide from unauthorized access, disclosure, or destruction. However, please note that no method of transmission over the Internet or electronic storage is 100% secure.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">6. Third-Party Links</h2>
          <p className="mb-4">Our website may contain links to third-party sites. We are not responsible for the privacy practices or content of those sites. We encourage you to review the privacy policies of any third-party sites you visit.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">7. Changes to This Policy</h2>
          <p className="mb-4">We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. Your continued use of the website after changes are made constitutes your acceptance of the new policy.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">8. Contact Us</h2>
          <p className="mb-4">If you have any questions or concerns about this Privacy Policy or our data practices, please contact us using the information provided on our Contact page.</p>
        </section>
        <section>
          <p className="mb-4">By using this website, you agree to this privacy policy.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
