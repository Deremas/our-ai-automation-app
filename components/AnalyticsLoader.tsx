"use client";

import React from "react";
import { getCookie } from "@/lib/prefsCookies";
import { CONSENT_COOKIE, parseConsent } from "@/lib/consent";

export default function AnalyticsLoader() {
  React.useEffect(() => {
    const consent = parseConsent(getCookie(CONSENT_COOKIE));
    if (!consent?.analytics) return;

    // TODO: Replace with your analytics provider script
    // Example placeholder:
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://example-analytics.com/script.js";
    document.head.appendChild(s);
  }, []);

  return null;
}
