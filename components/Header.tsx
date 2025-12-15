"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Add smooth transition to body for theme changes
    document.body.classList.add(
      "transition-colors",
      "duration-500",
      "bg-white",
      "dark:bg-slate-900",
      "text-gray-900",
      "dark:text-gray-100"
    );
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    // Add a class to animate background and text color on the html element
    document.documentElement.classList.add("transition-colors", "duration-500");
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    // Remove the transition class after animation
    setTimeout(() => {
      document.documentElement.classList.remove(
        "transition-colors",
        "duration-500"
      );
    }, 600);
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <header
      className={`sticky top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-gray-200 dark:border-slate-800 shadow-lg transition-colors duration-500 ${
        isMenuOpen ? "fixed" : ""
      }`}
      style={{
        WebkitBackdropFilter: "blur(12px)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 w-full transition-all duration-500">
          <Link href="/" className="flex items-center space-x-2 group">
            <span
              className="flex items-center justify-center h-10 w-10 rounded-lg border-2 
                border-primary-500 bg-primary-100 text-primary-600
                dark:bg-yellow-400/10 dark:border-accent-400 dark:text-accent-500
                font-bold text-lg transition-all duration-200 
                group-hover:bg-primary-200 group-hover:dark:bg-yellow-400/20"
            >
              AI
            </span>
            <span
              className="text-xl font-bold 
                text-primary-600
                dark:text-accent-600
                transition-colors duration-200"
            >
              KindFlow Automation
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative font-medium transition-colors duration-200 hover:text-primary-500 dark:hover:text-accent-500 ${
                  isActive(item.href)
                    ? "text-primary-500 dark:text-accent-500"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent-500 rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="relative p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-500 hover:scale-105 group"
              aria-label="Toggle theme"
            >
              <div className="w-5 h-5 flex items-center justify-center relative overflow-hidden">
                <i
                  className={`ri-sun-line absolute transition-all duration-500 text-gray-600 dark:text-gray-300 ${
                    isDark
                      ? "opacity-100 rotate-0 scale-100"
                      : "opacity-0 rotate-180 scale-0"
                  }`}
                ></i>
                <i
                  className={`ri-moon-line absolute transition-all duration-500 text-gray-600 dark:text-gray-300 ${
                    !isDark
                      ? "opacity-100 rotate-0 scale-100"
                      : "opacity-0 -rotate-180 scale-0"
                  }`}
                ></i>
              </div>
              <div className="absolute inset-0 rounded-lg bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>

            <Link
              href="/contact"
              className="hidden md:inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 hover:scale-105 transition-all duration-300 font-medium whitespace-nowrap"
            >
              Get Started
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-500 ${
                isMenuOpen ? "scale-110 bg-gray-200 dark:bg-slate-700" : ""
              }`}
              aria-label="Toggle menu"
            >
              <div
                className={`w-5 h-5 flex items-center justify-center transition-all duration-500 ${
                  isMenuOpen ? "rotate-90 scale-110" : ""
                }`}
              >
                <i
                  className={`ri-${
                    isMenuOpen ? "close" : "menu"
                  }-line text-gray-600 dark:text-gray-300 transition-all duration-500`}
                ></i>
              </div>
            </button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMenuOpen
              ? "max-h-96 opacity-100 scale-100"
              : "max-h-0 opacity-0 scale-95"
          }`}
          style={{ willChange: "max-height, opacity, transform" }}
        >
          <div className="py-4 border-t border-gray-200 dark:border-slate-700">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 font-medium transition-colors duration-300 hover:text-primary-500 dark:hover:text-accent-500 ${
                    isActive(item.href)
                      ? "text-primary-500 dark:text-accent-500 bg-primary-100 dark:bg-slate-800 rounded-lg"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mx-3 mt-2 inline-flex items-center justify-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-300 font-medium whitespace-nowrap"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
