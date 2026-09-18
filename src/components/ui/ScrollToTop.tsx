import { useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { RouteLoader } from './RouteLoader';
import { AnalyticsBeacon } from '../AnalyticsBeacon';

export function ScrollToTopWrapper() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return (
    <>
      <RouteLoader />
      <AnalyticsBeacon />
      <Outlet />
    </>
  );
}