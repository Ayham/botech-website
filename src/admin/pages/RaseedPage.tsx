import { useState } from 'react';
import { useAdminTranslations } from '../i18n';
import { PageHeader } from '../components/PageHeader';
import { DataTable, type Column } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { useAdminData } from '../hooks/useAdminData';
import { IconPhone, IconSearch, IconKey, IconCreditCard, IconBell, IconWallet } from '../components/Icons';

type Tab = 'users' | 'licenses' | 'payments' | 'activations' | 'notifications';

interface RaseedUser {
  id: string;
  user_id: string;
  display_name: string | null;
  email: string | null;
  phone: string | null;
  account_status: string | null;
  license_status: string | null;
  license_type: string | null;
  expiry_date: string | null;
  created_at: string;
  last_login: string | null;
  role: string | null;
  city: string | null;
  shop_name: string | null;
}

interface RaseedLicense {
  id: string;
  device_id: string | null;
  user_id: string | null;
  license_key: string | null;
  status: string;
  level: string | null;
  plan: string | null;
  expires_at: string | null;
  created_at: string;
  is_permanent: boolean | null;
}

interface RaseedPayment {
  id: string;
  user_id: string | null;
  amount: number;
  currency: string | null;
  method: string | null;
  status: string | null;
  created_at: string;
  payment_for: string | null;
}

interface RaseedActivation {
  id: string;
  device_id: string | null;
  user_id: string | null;
  status: string;
  created_at: string;
  contact_name: string | null;
  contact_phone: string | null;
  request_type: string | null;
  payment_status: string | null;
}

interface RaseedNotification {
  id: string;
  title_ar: string | null;
  title_en: string | null;
  body_ar: string | null;
  body_en: string | null;
  notification_type: string | null;
  priority: string | null;
  status: string | null;
  is_pinned: boolean | null;
  is_announcement: boolean | null;
  created_at: string;
  sent_at: string | null;
}

interface ListResponse<T> {
  data: T[];
  total: number;
}

export function RaseedPage() {
  const t = useAdminTranslations();
  const [tab, setTab] = useState<Tab>('users');
  const [search, setSearch] = useState('');

  const request =
    tab === 'users'
      ? { connection: 'raseed' as const, module: 'users', action: 'list', params: { search: search || undefined } }
      : tab === 'licenses'
        ? { connection: 'raseed' as const, module: 'licenses', action: 'list' }
        : tab === 'payments'
          ? { connection: 'raseed' as const, module: 'payments', action: 'list' }
          : tab === 'activations'
            ? { connection: 'raseed' as const, module: 'activations', action: 'list' }
            : { connection: 'raseed' as const, module: 'notifications', action: 'list' };

  const { data, loading, error } = useAdminData<ListResponse<RaseedUser> | ListResponse<RaseedLicense> | ListResponse<RaseedPayment> | RaseedActivation[] | RaseedNotification[]>(request);

  const tabs: { id: Tab; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
    { id: 'users', label: t.raseed.users, icon: IconPhone },
    { id: 'licenses', label: t.raseed.licenses, icon: IconKey },
    { id: 'payments', label: t.raseed.payments, icon: IconCreditCard },
    { id: 'activations', label: t.raseed.activations, icon: IconWallet },
    { id: 'notifications', label: t.raseed.notifications, icon: IconBell },
  ];

  const userCols: Column<RaseedUser>[] = [
    {
      key: 'display_name',
      header: t.raseed.shopName,
      render: (r) => (
        <div>
          <p className="font-medium text-gray-900">{r.display_name ?? r.email ?? r.phone ?? '—'}</p>
          {r.shop_name && <p className="text-xs text-gray-400">{r.shop_name}</p>}
        </div>
      ),
    },
    { key: 'phone', header: t.crm.phone, render: (r) => r.phone ?? '—' },
    { key: 'email', header: t.crm.email, render: (r) => r.email ?? '—' },
    { key: 'city', header: t.raseed.city, render: (r) => r.city ?? '—' },
    { key: 'account_status', header: t.raseed.accountStatus, render: (r) => r.account_status ? <StatusBadge status={r.account_status} /> : '—' },
    { key: 'license_status', header: t.raseed.licenseStatus, render: (r) => r.license_status ? <StatusBadge status={r.license_status} /> : '—' },
    {
      key: 'expiry_date',
      header: 'Expiry',
      minWidth: true,
      render: (r) => (r.expiry_date ? new Date(r.expiry_date).toLocaleDateString() : '—'),
    },
  ];

  const licenseCols: Column<RaseedLicense>[] = [
    { key: 'license_key', header: 'Key', render: (r) => <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{r.license_key ?? '—'}</code>, minWidth: true },
    { key: 'device_id', header: 'Device', render: (r) => r.device_id ?? '—' },
    { key: 'plan', header: 'Plan', render: (r) => r.plan ?? (r.level ?? '—') },
    { key: 'status', header: t.raseed.licenseStatus, render: (r) => <StatusBadge status={r.status} /> },
    {
      key: 'expires_at',
      header: 'Expires',
      render: (r) => (r.is_permanent ? t.raseed.lifetime : r.expires_at ? new Date(r.expires_at).toLocaleDateString() : '—'),
    },
  ];

  const paymentCols: Column<RaseedPayment>[] = [
    {
      key: 'amount',
      header: `${t.payments.amount} (${t.payments.currency})`,
      render: (r) => <span className="font-semibold">{Number(r.amount).toLocaleString()}</span>,
      minWidth: true,
    },
    { key: 'method', header: t.payments.method, render: (r) => r.method ?? '—' },
    { key: 'status', header: t.payments.status, render: (r) => r.status ? <StatusBadge status={r.status} /> : '—' },
    { key: 'payment_for', header: 'For', render: (r) => r.payment_for ?? '—' },
    {
      key: 'created_at',
      header: t.common.date,
      render: (r) => <span className="text-gray-500">{new Date(r.created_at).toLocaleString()}</span>,
    },
  ];

  const activationCols: Column<RaseedActivation>[] = [
    { key: 'contact_name', header: 'Name', render: (r) => r.contact_name ?? '—' },
    { key: 'contact_phone', header: t.crm.phone, render: (r) => r.contact_phone ?? '—' },
    { key: 'device_id', header: 'Device', render: (r) => r.device_id ?? '—' },
    { key: 'request_type', header: 'Type', render: (r) => r.request_type ?? '—' },
    { key: 'payment_status', header: t.payments.status, render: (r) => r.payment_status ? <StatusBadge status={r.payment_status} /> : '—' },
    { key: 'status', header: t.raseed.activations, render: (r) => <StatusBadge status={r.status} /> },
    {
      key: 'created_at',
      header: t.common.date,
      render: (r) => <span className="text-gray-500">{new Date(r.created_at).toLocaleString()}</span>,
    },
  ];

  const notificationCols: Column<RaseedNotification>[] = [
    {
      key: 'title_ar',
      header: 'Title',
      render: (r) => (
        <div>
          <p className="font-medium text-gray-900">{r.title_ar ?? r.title_en ?? '—'}</p>
          {r.body_ar && <p className="text-xs text-gray-400 truncate max-w-xs">{r.body_ar}</p>}
        </div>
      ),
    },
    { key: 'notification_type', header: t.common.type, render: (r) => r.notification_type ?? '—' },
    { key: 'priority', header: 'Priority', render: (r) => r.priority ? <StatusBadge status={r.priority} /> : '—' },
    { key: 'status', header: t.common.status, render: (r) => r.status ? <StatusBadge status={r.status} /> : '—' },
    { key: 'is_pinned', header: 'Pinned', render: (r) => (r.is_pinned ? '📌' : '—') },
    {
      key: 'created_at',
      header: t.common.date,
      render: (r) => <span className="text-gray-500">{new Date(r.created_at).toLocaleString()}</span>,
    },
  ];

  const rows = Array.isArray(data)
    ? data
    : ((data as ListResponse<unknown> | null)?.data ?? []);
  const total = Array.isArray(data) ? data.length : ((data as ListResponse<unknown> | null)?.total ?? 0);

  function renderTable() {
    const common = { loading, pagination: { current: 1, pageSize: 20, total } as const };
    switch (tab) {
      case 'licenses':
        return (
          <DataTable
            {...common}
            columns={licenseCols}
            data={rows as RaseedLicense[]}
            rowKey={(r) => r.id}
            emptyTitle={t.raseed.noLicenses}
          />
        );
      case 'payments':
        return (
          <DataTable
            {...common}
            columns={paymentCols}
            data={rows as RaseedPayment[]}
            rowKey={(r) => r.id}
            emptyTitle={t.common.noData}
          />
        );
      case 'activations':
        return (
          <DataTable
            {...common}
            columns={activationCols}
            data={rows as RaseedActivation[]}
            rowKey={(r) => r.id}
            emptyTitle={t.common.noData}
          />
        );
      case 'notifications':
        return (
          <DataTable
            {...common}
            columns={notificationCols}
            data={rows as RaseedNotification[]}
            rowKey={(r) => r.id}
            emptyTitle={t.common.noData}
          />
        );
      case 'users':
      default:
        return (
          <DataTable
            {...common}
            columns={userCols}
            data={rows as RaseedUser[]}
            rowKey={(r) => r.id}
            emptyTitle={t.raseed.noUsers}
          />
        );
    }
  }

  return (
    <div>
      <PageHeader title={t.raseed.title} subtitle={t.raseed.subtitle} icon={<IconPhone size={24} />} loading={loading} />

      <div className="flex flex-wrap items-center gap-2 mb-5 border-b border-gray-200">
        {tabs.map((tabItem) => (
          <button
            key={tabItem.id}
            onClick={() => { setTab(tabItem.id); setSearch(''); }}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === tabItem.id
                ? 'border-primary-600 text-primary-700'
                : 'border-transparent text-gray-500 hover:text-gray-800'
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

      {(tab === 'users' || tab === 'payments' || tab === 'notifications') && (
        <div className="relative mb-4 max-w-md">
          <IconSearch size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.raseed.search}
            className="w-full ps-10 pe-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
          />
        </div>
      )}

      {renderTable()}
    </div>
  );
}