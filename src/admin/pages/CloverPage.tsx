import { useState } from 'react';
import { useAdminTranslations } from '../i18n';
import { PageHeader } from '../components/PageHeader';
import { StatCard } from '../components/StatCard';
import { DataTable, type Column } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { useAdminData } from '../hooks/useAdminData';
import {
  IconStore,
  IconUsers,
  IconBox,
  IconTrendUp,
  IconKey,
  IconWallet,
  IconAlert,
} from '../components/Icons';

interface CloverStats {
  connected: boolean;
  stores: number | null;
  customers: number | null;
  products: number | null;
  totalSales: number | null;
  revenue: number | null;
  licenses: { total: number; active: number; expired: number } | null;
}

interface CloverStore {
  id: string;
  name: string | null;
  business_id: string | null;
  is_active: boolean | null;
  created_at: string;
}

interface CloverCustomer {
  id: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  created_at: string;
}

interface CloverProduct {
  id: string;
  name: string | null;
  sku: string | null;
  price: number | null;
  is_active: boolean | null;
  created_at: string;
}

interface CloverSale {
  id: string;
  store_id: string | null;
  total: number | null;
  status: string | null;
  currency: string | null;
  created_at: string;
}

interface ListResponse<T> {
  data: T[];
  total: number;
}

type Tab = 'stores' | 'customers' | 'products' | 'sales';

export function CloverPage() {
  const t = useAdminTranslations();
  const [tab, setTab] = useState<Tab>('stores');

  const { data: stats, loading: statsLoading } = useAdminData<CloverStats>({
    connection: 'clover',
    module: 'dashboard',
    action: 'stats',
  });

  const listReq =
    tab === 'stores'
      ? { connection: 'clover' as const, module: 'stores', action: 'list' }
      : tab === 'customers'
        ? { connection: 'clover' as const, module: 'customers', action: 'list' }
        : tab === 'products'
          ? { connection: 'clover' as const, module: 'products', action: 'list' }
          : { connection: 'clover' as const, module: 'sales', action: 'list' };

  const { data, loading, error } = useAdminData<ListResponse<unknown>>(listReq);

  const tabs: { id: Tab; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
    { id: 'stores', label: t.clover.stores, icon: IconStore },
    { id: 'customers', label: t.clover.customers, icon: IconUsers },
    { id: 'products', label: t.clover.products, icon: IconBox },
    { id: 'sales', label: t.clover.sales, icon: IconTrendUp },
  ];

  const fmt = (n: number | null | undefined) => (n === null || n === undefined ? '—' : Number(n).toLocaleString());

  function renderTable() {
    const common = {
      loading,
      emptyTitle: t.clover.noData,
      emptyDescription: !stats?.connected ? t.common.comingSoon : undefined,
      pagination: { current: 1, pageSize: 20, total: data?.total ?? 0 } as const,
    };
    switch (tab) {
      case 'stores': {
        const cols: Column<CloverStore>[] = [
          { key: 'name', header: t.common.business, render: (r) => <span className="font-medium text-gray-900">{r.name ?? '—'}</span> },
          { key: 'business_id', header: 'Business', render: (r) => (r.business_id ? String(r.business_id).slice(0, 8) : '—') },
          { key: 'is_active', header: t.common.status, render: (r) => (r.is_active ? <StatusBadge status="active" /> : <StatusBadge status="inactive" />) },
          { key: 'created_at', header: t.common.date, minWidth: true, render: (r) => new Date(r.created_at).toLocaleDateString() },
        ];
        return <DataTable {...common} columns={cols} data={data?.data as CloverStore[]} rowKey={(r) => r.id} />;
      }
      case 'customers': {
        const cols: Column<CloverCustomer>[] = [
          { key: 'name', header: t.crm.name, render: (r) => <span className="font-medium text-gray-900">{r.name ?? '—'}</span> },
          { key: 'phone', header: t.crm.phone, render: (r) => r.phone ?? '—' },
          { key: 'email', header: t.crm.email, render: (r) => r.email ?? '—' },
          { key: 'created_at', header: t.common.date, minWidth: true, render: (r) => new Date(r.created_at).toLocaleDateString() },
        ];
        return <DataTable {...common} columns={cols} data={data?.data as CloverCustomer[]} rowKey={(r) => r.id} />;
      }
      case 'products': {
        const cols: Column<CloverProduct>[] = [
          { key: 'name', header: t.common.products, render: (r) => <span className="font-medium text-gray-900">{r.name ?? '—'}</span> },
          { key: 'sku', header: 'SKU', render: (r) => <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{r.sku ?? '—'}</code> },
          { key: 'price', header: t.payments.amount, render: (r) => <span className="font-semibold">{fmt(r.price)}</span> },
          { key: 'is_active', header: t.common.status, render: (r) => (r.is_active ? <StatusBadge status="active" /> : <StatusBadge status="inactive" />) },
        ];
        return <DataTable {...common} columns={cols} data={data?.data as CloverProduct[]} rowKey={(r) => r.id} />;
      }
      case 'sales':
      default: {
        const cols: Column<CloverSale>[] = [
          { key: 'total', header: `${t.clover.totalSales} (${t.payments.currency})`, render: (r) => <span className="font-semibold">{fmt(r.total)}</span> },
          { key: 'store_id', header: t.clover.stores, render: (r) => (r.store_id ? String(r.store_id).slice(0, 8) : '—') },
          { key: 'status', header: t.common.status, render: (r) => (r.status ? <StatusBadge status={r.status} /> : '—') },
          { key: 'currency', header: t.payments.currency, render: (r) => r.currency ?? '—' },
          { key: 'created_at', header: t.common.date, minWidth: true, render: (r) => new Date(r.created_at).toLocaleString() },
        ];
        return <DataTable {...common} columns={cols} data={data?.data as CloverSale[]} rowKey={(r) => r.id} />;
      }
    }
  }

  return (
    <div>
      <PageHeader title={t.clover.title} subtitle={t.clover.subtitle} icon={<IconStore size={24} />} loading={statsLoading} />

      {stats && !stats.connected && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm rounded-lg px-4 py-3 mb-4 flex items-center gap-2">
          <IconAlert size={16} />
          Clover — {t.common.comingSoon}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard title={t.clover.stores} value={fmt(stats?.stores)} icon={<IconStore size={20} />} />
        <StatCard title={t.clover.customers} value={fmt(stats?.customers)} icon={<IconUsers size={20} />} />
        <StatCard title={t.clover.products} value={fmt(stats?.products)} icon={<IconBox size={20} />} />
        <StatCard title={t.clover.totalSales} value={fmt(stats?.totalSales)} icon={<IconTrendUp size={20} />} />
        <StatCard title={t.clover.revenue} value={fmt(stats?.revenue)} icon={<IconWallet size={20} />} />
        <StatCard
          title={t.clover.licenses}
          value={stats?.licenses ? `${stats.licenses.active} / ${stats.licenses.total}` : '—'}
          subtitle={stats?.licenses ? `${stats.licenses.expired} ${t.dashboard.expiredLicenses}` : undefined}
          icon={<IconKey size={20} />}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-5 border-b border-gray-200">
        {tabs.map((tabItem) => (
          <button
            key={tabItem.id}
            onClick={() => setTab(tabItem.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === tabItem.id ? 'border-primary-600 text-primary-700' : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <tabItem.icon size={16} />
            {tabItem.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
          {t.common.error}: {error}
        </div>
      )}

      {renderTable()}
    </div>
  );
}