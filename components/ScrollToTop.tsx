"use client";

import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-[55px] right-1 z-40 p-3 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform ${
        isVisible
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-16 opacity-0 scale-0"
      } group`}
      aria-label="Scroll to top"
    >
      <div className="w-6 h-6 flex items-center justify-center">
        <i className="ri-arrow-up-line text-xl group-hover:animate-bounce-gentle"></i>
      </div>
      <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </button>
  );
}
