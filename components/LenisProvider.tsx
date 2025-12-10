
'use client';

import { useEffect, ReactNode } from 'react';
import Lenis from 'lenis';

interface LenisProviderProps {
  children: ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08, // Smoother interpolation
      duration: 1.5, // Slightly longer duration for smoother feel
      smoothWheel: true,
      wheelMultiplier: 0.8, // Reduced for more controlled scrolling
      touchMultiplier: 1.5, // Better touch experience
      infinite: false,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Add scroll-to-top functionality
    const scrollToTop = () => {
      lenis.scrollTo(0, { duration: 1.5 });
    };

    // Expose lenis globally for other components to use
    (window as any).lenis = lenis;
    (window as any).scrollToTop = scrollToTop;

    return () => {
      lenis.destroy();
      delete (window as any).lenis;
      delete (window as any).scrollToTop;
    };
  }, []);

  return <>{children}</>;
}
