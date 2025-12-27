"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";

interface LenisProviderProps {
  children: ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    // ✅ iOS / touch devices: keep native scroll to avoid sticky/fixed bugs
    const isTouch =
      typeof window !== "undefined" &&
      (navigator.maxTouchPoints > 0 ||
        "ontouchstart" in window ||
        window.matchMedia("(pointer: coarse)").matches);

    // ✅ Respect reduced-motion users
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // If touch device or reduced motion -> don't enable Lenis
    if (isTouch || prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.5,
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1,
      infinite: false,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const scrollToTop = () => lenis.scrollTo(0, { duration: 1.2 });

    (window as any).lenis = lenis;
    (window as any).scrollToTop = scrollToTop;

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as any).lenis;
      delete (window as any).scrollToTop;
    };
  }, []);

  return <>{children}</>;
}
