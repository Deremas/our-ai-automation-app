"use client";

import React from "react";
import { getCookie } from "@/lib/prefsCookies";
import { CONSENT_COOKIE, parseConsent } from "@/lib/consent";

export default function CookieConsent() {
  const [open, setOpen] = React.useState(false);
  const [analytics, setAnalytics] = React.useState(false);

  React.useEffect(() => {
    const existing = parseConsent(getCookie(CONSENT_COOKIE));
    if (!existing) setOpen(true);
  }, []);

  const save = async (allowAnalytics: boolean) => {
    await fetch("/api/consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ analytics: allowAnalytics }),
    });

    setOpen(false);
    // Reload so AnalyticsLoader can run immediately
    window.location.reload();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className="mx-auto max-w-4xl m-4 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Cookies
        </h3>

        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          We use essential cookies to remember your language and theme
          preferences. With your permission, we can also enable analytics to
          improve the website.
        </p>

        <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
          <label className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200">
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
            />
            Allow analytics (optional)
          </label>

          <div className="flex gap-2">
            <button
              onClick={() => save(false)}
              className="rounded-xl px-4 py-2 border border-gray-200 dark:border-slate-700
                         text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800 transition"
            >
              Essential only
            </button>

            <button
              onClick={() => save(true)}
              className="rounded-xl px-4 py-2 bg-slate-900 dark:bg-white
                         text-white dark:text-slate-900 font-semibold hover:opacity-90 transition"
            >
              Accept all
            </button>
          </div>
        </div>

        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          Read our{" "}
          <a className="underline" href="/cookie-policy">
            Cookie Policy
          </a>
          .
        </div>
      </div>
    </div>
  );
}
