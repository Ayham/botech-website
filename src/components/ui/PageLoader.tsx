import { useEffect, useState } from 'react';
import { siteConfig } from '../../config/site';

type Phase = 'visible' | 'leaving' | 'done';

const shouldSkip =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let loaderLaunched = false;

export function PageLoader() {
  const started = !shouldSkip && !loaderLaunched;

  const [phase, setPhase] = useState<Phase>(() => {
    if (!started) return 'done';
    loaderLaunched = true;
    return 'visible';
  });

  useEffect(() => {
    if (!started) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const hideTimer = window.setTimeout(() => setPhase('leaving'), 1450);
    const doneTimer = window.setTimeout(() => {
      document.body.style.overflow = previousOverflow;
      setPhase('done');
    }, 2150);

    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(doneTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [started]);

  if (phase === 'done') return null;

  return (
    <div
      className={`page-loader ${phase === 'leaving' ? 'page-loader--leaving' : ''}`}
      role="status"
      aria-label={`${siteConfig.name} loading`}
    >
      <span className="sr-only">{siteConfig.name}</span>
      <div className="flex flex-col items-center justify-center">
        <div className="loader-stage">
          <div className="loader-ring loader-ring--outer" />
          <div className="loader-ring loader-ring--inner" />
          <div className="loader-orbit-dot loader-orbit-dot--1" />
          <div className="loader-orbit-dot loader-orbit-dot--2" />
          <img src={siteConfig.logo} alt="" className="loader-logo" width="72" height="72" />
        </div>
        <p className="loader-name">Blue Orbit Technologies</p>
        <p className="loader-tag">BOTech</p>
      </div>
    </div>
  );
}