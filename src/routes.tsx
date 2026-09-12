import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate, useLocation } from 'react-router-dom';
import { I18nProvider, useI18n } from './i18n';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { ServicesPage } from './pages/Services';
import { WorkPage } from './pages/Work';
import { Contact } from './pages/Contact';
import { ProductsPage } from './pages/Products';
import { PrivacyPage } from './pages/Privacy';
import { TermsPage } from './pages/Terms';
import { RaseedPage } from './pages/Raseed';
import { CloverPage } from './pages/Clover';
import { ScrollToTopWrapper } from './components/ui/ScrollToTop';

// Reads locale from `/en/*` path, sets it, and redirects to the clean path.
function LocaleRedirect() {
  const { setLocale } = useI18n();
  const location = useLocation();

  useEffect(() => {
    const segments = location.pathname.split('/').filter(Boolean);
    if (segments[0] === 'en') {
      setLocale('en');
    } else {
      setLocale('ar');
    }
    const target = '/' + segments.slice(segments[0] === 'en' ? 1 : 0).join('/');
    if (location.pathname !== target) {
      window.location.replace(target);
    }
  }, [location.pathname, setLocale]);

  return null;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <ScrollToTopWrapper />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'work', element: <WorkPage /> },
      { path: 'contact', element: <Contact /> },
      { path: 'privacy', element: <PrivacyPage /> },
      { path: 'terms', element: <TermsPage /> },
      { path: 'raseed', element: <RaseedPage /> },
      { path: 'clover', element: <CloverPage /> },
    ],
  },
  {
    path: '/en/*',
    element: <LocaleRedirect />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export function AppRoutes() {
  return (
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>
  );
}