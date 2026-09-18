import { useAdminTranslations } from '../i18n';
import { PageHeader } from '../components/PageHeader';
import { StatCard } from '../components/StatCard';
import { StatusBadge } from '../components/StatusBadge';
import { Spinner } from '../components/Spinner';
import { useAdminData } from '../hooks/useAdminData';
import {
  IconDashboard,
  IconUsers,
  IconInvoice,
  IconCreditCard,
  IconPhone,
  IconKey,
  IconRefresh,
  IconStore,
  IconPlug,
} from '../components/Icons';

interface DashboardStats {
  botech: {
    customers: number | null;
    pendingInvoices: number;
    totalInvoiceValue: number;
    revenue: number;
    completedPayments: number;
  };
  raseed: {
    users: number | null;
    activeLicenses: number;
    expiredLicenses: number;
    totalTransfers: number | null;
  };
  clover: {
    stores: number | null;
  };
}

interface ConnectionsList {
  connections: {
    id: string;
    name: string;
    status: string;
    projectRef: string;
    environment: string;
    lastCheckedAt: string | null;
    errorMessage?: string;
  }[];
}

export function DashboardPage() {
  const t = useAdminTranslations();
  const { data, loading, error, refresh } = useAdminData<DashboardStats>({
    connection: 'botech',
    module: 'dashboard',
    action: 'stats',
  });
  const { data: connData } = useAdminData<ConnectionsList>({
    connection: 'botech',
    module: 'connections',
    action: 'list',
  });

  const fmt = (n: number | null | undefined) => (n === null || n === undefined ? '—' : Number(n).toLocaleString());

  return (
    <div>
      <PageHeader
        title={t.dashboard.title}
        subtitle={t.dashboard.subtitle}
        icon={<IconDashboard size={24} />}
        loading={loading}
        actions={
          <button
            onClick={refresh}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
          >
            <IconRefresh size={16} />
            {t.common.refresh}
          </button>
        }
      />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
          {t.common.error}: {error}
        </div>
      )}

      {loading && !data ? (
        <div className="flex justify-center py-24">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">BOTech Main</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mb-8">
            <StatCard
              title={t.dashboard.totalCustomers}
              value={fmt(data?.botech.customers)}
              icon={<IconUsers size={20} />}
            />
            <StatCard
              title={t.dashboard.pendingInvoices}
              value={fmt(data?.botech.pendingInvoices)}
              icon={<IconInvoice size={20} />}
            />
            <StatCard
              title={t.dashboard.revenue}
              value={fmt(data?.botech.revenue)}
              icon={<IconCreditCard size={20} />}
            />
            <StatCard
              title={t.payments.title}
              value={fmt(data?.botech.completedPayments)}
              icon={<IconCreditCard size={20} />}
            />
            <StatCard
              title={t.invoices.title}
              value={fmt(data?.botech.totalInvoiceValue)}
              icon={<IconInvoice size={20} />}
            />
          </div>

          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 mt-6">Raseed</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            <StatCard
              title={t.dashboard.raseedUsers}
              value={fmt(data?.raseed.users)}
              icon={<IconPhone size={20} />}
            />
            <StatCard
              title={t.dashboard.activeLicenses}
              value={fmt(data?.raseed.activeLicenses)}
              icon={<IconKey size={20} />}
            />
            <StatCard
              title={t.dashboard.expiredLicenses}
              value={fmt(data?.raseed.expiredLicenses)}
              icon={<IconKey size={20} />}
            />
            <StatCard
              title={t.dashboard.raseedTransfers}
              value={fmt(data?.raseed.totalTransfers)}
              icon={<IconRefresh size={20} />}
            />
          </div>

          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 mt-6">Clover Flow</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            <StatCard
              title={t.dashboard.cloverStores}
              value={fmt(data?.clover.stores)}
              icon={<IconStore size={20} />}
            />
            <StatCard title={t.common.connections} value="—" icon={<IconPlug size={20} />} />
          </div>

          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 mt-6">
            {t.dashboard.connectionsTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {connData?.connections?.map((c) => (
              <div key={c.id} className="bg-white rounded-xl border border-gray-200 p-5 flex items-start justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{c.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{c.projectRef}</p>
                  {c.lastCheckedAt && (
                    <p className="text-xs text-gray-400 mt-1">
                      {t.common.lastChecked}: {new Date(c.lastCheckedAt).toLocaleString()}
                    </p>
                  )}
                </div>
                <StatusBadge status={c.status} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}