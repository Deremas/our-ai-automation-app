
import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors duration-300">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-24 text-base text-gray-900 dark:text-gray-100">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <p className="mb-4">By accessing and using this website, you agree to comply with these Terms of Service. If you do not agree with any part of these terms, please do not use our website.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">2. Use of the Website</h2>
          <p className="mb-4">This website is provided for informational purposes only. You agree not to use the site for any unlawful purpose or in any way that could harm the site or its users. We reserve the right to restrict or terminate your access at any time without notice.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">3. Intellectual Property</h2>
          <p className="mb-4">All content on this website, including text, images, graphics, and code, is owned by the site owner or used with permission. You may not reproduce, distribute, or create derivative works from any content without prior written consent.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">4. Disclaimer of Warranties</h2>
          <p className="mb-4">This website is provided "as is" without warranties of any kind, either express or implied. We do not guarantee the accuracy, completeness, or reliability of any content on the site.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">5. Limitation of Liability</h2>
          <p className="mb-4">Use of this site is at your own risk. We are not liable for any direct, indirect, incidental, or consequential damages resulting from your use of the website or any content therein.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">6. Third-Party Links</h2>
          <p className="mb-4">Our website may contain links to third-party websites. We are not responsible for the content or practices of those sites. Accessing third-party sites is at your own risk and subject to their terms and policies.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">7. Changes to Terms</h2>
          <p className="mb-4">We reserve the right to update or change these Terms of Service at any time. Changes will be effective immediately upon posting. Your continued use of the website constitutes acceptance of the revised terms.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">8. Governing Law</h2>
          <p className="mb-4">These terms are governed by and construed in accordance with the laws of the site owner's jurisdiction, without regard to its conflict of law principles.</p>
        </section>
        <section>
          <p className="mb-4">If you have any questions about these Terms of Service, please contact us using the information provided on our Contact page.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
