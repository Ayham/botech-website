import { useEffect } from 'react';

export function useParallaxDriver() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarse = window.matchMedia('(pointer: coarse)');
    const small = window.matchMedia('(max-width: 767px)');

    if (reduced.matches || coarse.matches || small.matches) return;

    const root = document.documentElement;
    let frame = 0;
    let latest = window.scrollY;

    const apply = () => {
      frame = 0;
      const y = latest;
      root.style.setProperty('--drift-slow', `${y * -0.04}px`);
      root.style.setProperty('--drift-mid', `${y * -0.07}px`);
      root.style.setProperty('--drift-fast', `${y * -0.11}px`);
    };

    const onScroll = () => {
      latest = window.scrollY;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
}

export function ParallaxDriver() {
  useParallaxDriver();
  return null;
}