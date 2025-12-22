import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import ScrollToTop from "@/components/ScrollToTop";
import ChatWidget from "@/components/ChatWidget";
import Providers from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://luxaiautomation.com"), // change domain
  title: {
    default: "Lux AI Consultancy & Automation – AI Workflow & Automation",
    template: "%s | KindFlow Automation",
  },
  description:
    "Lux AI Consultancy & Automation builds AI-powered workflow automation, ERP systems, system integrations, and intelligent chatbots for modern businesses.",
  keywords: [
    "Lux AI Consultancy & Automation",
    "Lux AI Automation",
    "LuxAI Automation",
    "AI automation",
    "AI strategy",
    "AI Consultancy",
    "workflow automation",
    "business process automation",
    "AI integration",
    "ERP development",
    "ERP system",
    "Custom websites",
    "ERP systems",
    "custom ERP software",
    "system integration",
    "CRM integration",
    "API automation",
    "API integration",
    "AI API integration",
    "business automation software",
    "AI chatbot",
    "multilingual chatbot",
    "RAG chatbot",
    "admin dashboard",
    "role based access control",
    "inventory management system",
    "stock management software",
    "ecommerce automation",
  ],
  authors: [{ name: "Lux AI Consultancy & Automation" }],
  creator: "Lux AI Consultancy & Automation",
  publisher: "Lux AI Consultancy & Automation",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title:
      "Lux AI Consultancy & Automation – AI Automation & Systems integration",
    description:
      "AI automation, systems integration, ERP systems, workflow orchestration, and intelligent chatbots built for scalable businesses.",
    url: "https://luxaiautomation.com",
    siteName: "Lux AI Automation",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lux AI Consultancy & Automation",
    description:
      "AI-powered automation, systems integration, ERP systems, system integrations, and chatbots.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        
      </head>

      <body
        className="
          antialiased font-sans
          bg-white dark:bg-slate-900
          text-gray-900 dark:text-gray-100
          transition-colors duration-300
        "
      >
        <LenisProvider>
          <Providers>{children}</Providers>
        </LenisProvider>

        {/* ✅ outside Lenis so it's truly fixed */}
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] flex flex-col gap-3">
          <ScrollToTop />
          <ChatWidget />
        </div>
      </body>
    </html>
  );
}


// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import LenisProvider from "@/components/LenisProvider";
// import ScrollToTop from "@/components/ScrollToTop";
// import ChatWidget from "@/components/ChatWidget";

// const inter = Inter({
//   subsets: ["latin"],
//   display: "swap",
// });

// export const metadata: Metadata = {
//   title: "AI Automation Agency - Automate Your Business with AI",
//   description:
//     "Boost efficiency, reduce costs, and scale smarter through AI automation solutions.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" suppressHydrationWarning={true}>
//       <head>
//         {/* Favicon accent color SVG */}
//         <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
//       </head>
//       <body
//         className={`${inter.className} antialiased bg-white dark:bg-slate-900 text-gray-900 gap-2 dark:text-gray-100 transition-colors duration-300`}
//       >
//         <LenisProvider>
//           {children}
//           <ChatWidget />
//           <ScrollToTop />
//         </LenisProvider>
//       </body>
//     </html>
//   );
// }
