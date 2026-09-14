import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { siteConfig } from '../../config/site';

export function RouteLoader() {
  const location = useLocation();
  const previousKey = useRef<string>(location.key);
  const firstRender = useRef(true);

  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      previousKey.current = location.key;
      return;
    }

    if (previousKey.current === location.key) return;
    previousKey.current = location.key;

    setFadingOut(false);
    setVisible(true);
    setProgress(10);

    const t1 = setTimeout(() => setProgress(40), 120);
    const t2 = setTimeout(() => setProgress(70), 280);
    const t3 = setTimeout(() => setProgress(92), 450);
    const t4 = setTimeout(() => {
      setProgress(100);
      setFadingOut(true);
    }, 700);
    const t5 = setTimeout(() => {
      setVisible(false);
      setProgress(0);
      setFadingOut(false);
    }, 1050);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [location.key]);

  if (!visible) return null;

  return (
    <>
      <div className="route-progress-bar">
        <div
          className="route-progress-bar__fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div
        className={`route-loader-overlay ${fadingOut ? 'route-loader-overlay--fade-out' : ''}`}
        role="status"
        aria-label="Loading page"
      >
        <div className="route-loader-content">
          <div className="route-loader-spinner">
            <div className="route-loader-ring route-loader-ring--outer" />
            <div className="route-loader-ring route-loader-ring--inner" />
            <img
              src={siteConfig.logo}
              alt=""
              className="route-loader-logo"
              width="40"
              height="40"
            />
          </div>
          <p className="route-loader-text">{siteConfig.shortName}</p>
        </div>
      </div>
    </>
  );
}