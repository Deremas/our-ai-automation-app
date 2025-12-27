"use client";

import React from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import type { AppLanguage } from "@/lib/i18n";

export default function Providers({
  children,
  initialLang,
}: {
  children: React.ReactNode;
  initialLang?: AppLanguage | string;
}) {
  return (
    <LanguageProvider initialLang={initialLang}>
      <ThemeProvider>{children}</ThemeProvider>
    </LanguageProvider>
  );
}

// "use client";

// import React from "react";
// import { ThemeProvider } from "@/components/ThemeProvider";
// import { LanguageProvider } from "@/components/LanguageProvider";

// export default function Providers({ children }: { children: React.ReactNode }) {
//   return (
//     <LanguageProvider>
//       <ThemeProvider>{children}</ThemeProvider>
//     </LanguageProvider>
//   );
// }
