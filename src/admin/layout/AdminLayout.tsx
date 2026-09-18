import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useI18n } from '@/i18n';
import { useAdminTranslations } from '../i18n';
import { siteConfig } from '@/config/site';
import {
  IconDashboard,
  IconUsers,
  IconInvoice,
  IconCreditCard,
  IconPhone,
  IconStore,
  IconPlug,
  IconActivity,
  IconUsersGroup,
  IconSettings,
  IconLogout,
  IconMenu,
  IconX,
  IconChevronDown,
  IconTrendUp,
} from '../components/Icons';

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  end?: boolean;
}

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { loading, user } = useAdminAuth();
  const { dir } = useI18n();

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir={dir}>
        <div className="w-10 h-10 border-4 border-gray-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir={dir}>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 start-0 z-50 w-64 bg-white border-e border-gray-200 flex flex-col transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : dir === 'rtl' ? 'translate-x-full' : '-translate-x-full'
        }`}
      >
        <SideNav onNavigate={() => setSidebarOpen(false)} />
      </aside>

      <div className="lg:ps-64">
        <Topbar toggleSidebar={() => setSidebarOpen((v) => !v)} sidebarOpen={sidebarOpen} />
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function SideNav({ onNavigate }: { onNavigate?: () => void }) {
  const t = useAdminTranslations();

  const groups: { title: string; items: NavItem[] }[] = [
    {
      title: t.sidebar.overview,
      items: [{ path: '/admin', label: t.sidebar.dashboard, icon: IconDashboard, end: true }],
    },
    {
      title: t.sidebar.business,
      items: [
        { path: '/admin/crm', label: t.sidebar.crm, icon: IconUsers },
        { path: '/admin/invoices', label: t.sidebar.invoices, icon: IconInvoice },
        { path: '/admin/payments', label: t.sidebar.payments, icon: IconCreditCard },
      ],
    },
    {
      title: t.sidebar.products,
      items: [
        { path: '/admin/raseed', label: t.sidebar.raseed, icon: IconPhone },
        { path: '/admin/clover', label: t.sidebar.clover, icon: IconStore },
      ],
    },
    {
      title: t.sidebar.infrastructure,
      items: [
        { path: '/admin/connections', label: t.sidebar.connections, icon: IconPlug },
        { path: '/admin/activity', label: t.sidebar.activity, icon: IconActivity },
      ],
    },
    {
      title: t.sidebar.overview,
      items: [{ path: '/admin/analytics', label: t.analytics.title, icon: IconTrendUp }],
    },
    {
      title: t.sidebar.administration,
      items: [
        { path: '/admin/admin-users', label: t.sidebar.adminUsers, icon: IconUsersGroup },
        { path: '/admin/settings', label: t.sidebar.settings, icon: IconSettings },
      ],
    },
  ];

  return (
    <nav className="flex-1 space-y-6 px-3 py-5 overflow-y-auto">
      {groups.map((group, i) => (
        <div key={i}>
          <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
            {group.title}
          </p>
          <div className="space-y-1">
            {group.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}

function Topbar({ toggleSidebar, sidebarOpen }: { toggleSidebar: () => void; sidebarOpen: boolean }) {
  const t = useAdminTranslations();
  const { user, logout } = useAdminAuth();
  const { locale, toggleLocale } = useI18n();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
            aria-label="toggle sidebar"
          >
            {sidebarOpen ? <IconX /> : <IconMenu />}
          </button>
          <img src={siteConfig.logo} alt="BOTech" className="h-9 w-9 rounded-lg" />
          <div className="leading-tight">
            <p className="font-bold text-gray-900 text-sm">BOTech Admin</p>
            <p className="text-xs text-gray-400">Central Admin Console</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLocale}
            className="px-3 py-1.5 text-sm font-medium bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
          >
            {locale === 'ar' ? 'EN' : 'عربي'}
          </button>

          <div className="relative">
            <button
              onClick={() => setUserMenuOpen((v) => !v)}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-bold">
                {(user?.displayName ?? user?.email ?? 'A').charAt(0).toUpperCase()}
              </div>
              <span className="hidden md:block text-sm text-gray-700 max-w-[140px] truncate">
                {user?.displayName ?? user?.email}
              </span>
              <IconChevronDown size={14} className="text-gray-400" />
            </button>
            {userMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                <div className="absolute end-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 z-50 py-2">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900 truncate">{user?.email}</p>
                    <p className="text-xs text-gray-500">{user?.roleName ?? user?.roleCode}</p>
                  </div>
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      navigate('/');
                    }}
                    className="w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    {t.common.dashboard} — {t.common.back}
                  </button>
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      void logout();
                    }}
                    className="w-full text-start px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <IconLogout size={16} />
                    {t.common.logout}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}