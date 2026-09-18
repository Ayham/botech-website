import { lazy, Suspense, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom';
import { I18nProvider, useI18n } from './i18n';
import { SiteContentProvider } from './hooks/useSite';
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
import { NotFound } from './pages/NotFound';
import DeleteAccount from './pages/DeleteAccount';
import { ScrollToTopWrapper } from './components/ui/ScrollToTop';
import { PageLoader } from './components/ui/PageLoader';

const AdminLayout = lazy(() => import('./admin/layout/AdminLayout').then((m) => ({ default: m.AdminLayout })));
const AuthGuard = lazy(() => import('./admin/layout/AuthGuard').then((m) => ({ default: m.AuthGuard })));
const LoginPage = lazy(() => import('./admin/pages/LoginPage').then((m) => ({ default: m.LoginPage })));
const AdminDashboard = lazy(() => import('./admin/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })));
const AdminAnalytics = lazy(() => import('./admin/pages/AnalyticsPage').then((m) => ({ default: m.AnalyticsPage })));
const AdminConnections = lazy(() => import('./admin/pages/ConnectionsPage').then((m) => ({ default: m.ConnectionsPage })));
const AdminActivity = lazy(() => import('./admin/pages/ActivityPage').then((m) => ({ default: m.ActivityPage })));
const AdminCrm = lazy(() => import('./admin/pages/CRMPage').then((m) => ({ default: m.CRMPage })));
const AdminInvoices = lazy(() => import('./admin/pages/InvoicesPage').then((m) => ({ default: m.InvoicesPage })));
const AdminPayments = lazy(() => import('./admin/pages/PaymentsPage').then((m) => ({ default: m.PaymentsPage })));
const AdminRaseed = lazy(() => import('./admin/pages/RaseedPage').then((m) => ({ default: m.RaseedPage })));
const AdminClover = lazy(() => import('./admin/pages/CloverPage').then((m) => ({ default: m.CloverPage })));
const AdminUsers = lazy(() => import('./admin/pages/AdminUsersPage').then((m) => ({ default: m.AdminUsersPage })));
const AdminSettings = lazy(() => import('./admin/pages/SettingsPage').then((m) => ({ default: m.SettingsPage })));

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

function PageFallback() {
  const { dir } = useI18n();
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir={dir}>
      <div className="w-10 h-10 border-4 border-gray-200 border-t-primary-600 rounded-full animate-spin" />
    </div>
  );
}

function AdminGate() {
  const location = useLocation();
  const isLoginPage = location.pathname.replace(/\/+$/, '') === '/admin/login';
  return (
    <Suspense fallback={<PageFallback />}>
      {isLoginPage ? (
        <LoginPage />
      ) : (
        <AuthGuard>
          <AdminLayout />
        </AuthGuard>
      )}
    </Suspense>
  );
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
      { path: 'delete-account', element: <DeleteAccount /> },
    ],
  },
  {
    path: '/en/*',
    element: <LocaleRedirect />,
  },
  {
    path: '/admin',
    element: <AdminGate />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'analytics', element: <AdminAnalytics /> },
      { path: 'connections', element: <AdminConnections /> },
      { path: 'activity', element: <AdminActivity /> },
      { path: 'crm', element: <AdminCrm /> },
      { path: 'invoices', element: <AdminInvoices /> },
      { path: 'payments', element: <AdminPayments /> },
      { path: 'raseed', element: <AdminRaseed /> },
      { path: 'clover', element: <AdminClover /> },
      { path: 'admin-users', element: <AdminUsers /> },
      { path: 'settings', element: <AdminSettings /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export function AppRoutes() {
  return (
    <SiteContentProvider>
      <I18nProvider>
        <PageLoader />
        <RouterProvider router={router} />
      </I18nProvider>
    </SiteContentProvider>
  );
}