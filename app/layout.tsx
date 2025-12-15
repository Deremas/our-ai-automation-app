import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import ScrollToTop from "@/components/ScrollToTop";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
  metadataBase: new URL("https://kindflowautomation.com"), // change domain
  title: {
    default: "KindFlow Automation – AI Workflow & Automation",
    template: "%s | KindFlow Automation",
  },
  description:
    "KindFlow Automation builds AI-powered workflow automation, ERP systems, system integrations, and intelligent chatbots for modern businesses.",
  keywords: [
    "KindFlow Automation",
    "AI automation",
    "workflow automation",
    "business process automation",
    "AI integration",
    "ERP development",
    "custom ERP software",
    "system integration",
    "CRM integration",
    "API automation",
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
  authors: [{ name: "KindFlow Automation" }],
  creator: "KindFlow Automation",
  publisher: "KindFlow Automation",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "KindFlow Automation – AI Automation & ERP Systems",
    description:
      "AI automation, ERP systems, workflow orchestration, and intelligent chatbots built for scalable businesses.",
    url: "https://kindflowautomation.com",
    siteName: "KindFlow Automation",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KindFlow Automation",
    description:
      "AI-powered automation, ERP systems, system integrations, and chatbots.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>

      <body
        className="
          antialiased
          bg-white
          dark:bg-slate-900
          text-gray-900
          dark:text-gray-100
          transition-colors
          duration-300
          font-sans
        "
      >
        <LenisProvider>
          {children}
          <ChatWidget />
          <ScrollToTop />
        </LenisProvider>
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
