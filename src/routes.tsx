import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { I18nProvider, useI18n } from './i18n';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { ServicesPage } from './pages/Services';
import { WorkPage } from './pages/Work';
import { Contact } from './pages/Contact';
import { RaseedPage } from './pages/Raseed';
import { CloverPage } from './pages/Clover';

// Wrapper to detect locale from URL
function LocaleWrapper({ children }: { children: React.ReactNode }) {
  useI18n(); // Ensure i18n context is available
  
  // This runs on mount to set locale from URL
  // The actual locale is determined by the I18nProvider from localStorage/path
  
  return <>{children}</>;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <LocaleWrapper>
        <Home />
      </LocaleWrapper>
    ),
  },
  {
    path: '/about',
    element: (
      <LocaleWrapper>
        <About />
      </LocaleWrapper>
    ),
  },
  {
    path: '/services',
    element: (
      <LocaleWrapper>
        <ServicesPage />
      </LocaleWrapper>
    ),
  },
  {
    path: '/work',
    element: (
      <LocaleWrapper>
        <WorkPage />
      </LocaleWrapper>
    ),
  },
  {
    path: '/contact',
    element: (
      <LocaleWrapper>
        <Contact />
      </LocaleWrapper>
    ),
  },
  {
    path: '/raseed',
    element: (
      <LocaleWrapper>
        <RaseedPage />
      </LocaleWrapper>
    ),
  },
  {
    path: '/clover',
    element: (
      <LocaleWrapper>
        <CloverPage />
      </LocaleWrapper>
    ),
  },
  {
    path: '/en/*',
    element: <Navigate to={"/" + (window.location.pathname.startsWith('/en/') ? window.location.pathname.slice(4) : window.location.pathname)} replace />,
  },
]);

export function AppRoutes() {
  return (
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>
  );
}