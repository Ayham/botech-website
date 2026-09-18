import { useAdminTranslations } from '../i18n';
import { PageHeader } from '../components/PageHeader';
import { DataTable, type Column } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { useAdminData } from '../hooks/useAdminData';
import { IconActivity } from '../components/Icons';

interface AuditLog {
  id: string;
  admin_email: string | null;
  action: string;
  target_type: string | null;
  target_id: string | null;
  connection: string;
  result: string;
  created_at: string;
}

export function ActivityPage() {
  const t = useAdminTranslations();
  const { data, loading, error } = useAdminData<AuditLog[]>({
    connection: 'botech',
    module: 'activity',
    action: 'list',
  });

  const columns: Column<AuditLog>[] = [
    {
      key: 'created_at',
      header: t.activity.timestamp,
      minWidth: true,
      render: (r) => <span className="text-gray-500">{new Date(r.created_at).toLocaleString()}</span>,
    },
    { key: 'admin_email', header: t.activity.who, render: (r) => r.admin_email ?? '—' },
    { key: 'action', header: t.activity.action, render: (r) => <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">{r.action}</code> },
    {
      key: 'target_type',
      header: t.activity.target,
      render: (r) => (r.target_type ? `${r.target_type}${r.target_id ? ` · ${r.target_id}` : ''}` : '—'),
    },
    { key: 'connection', header: t.activity.connection, render: (r) => <span className="capitalize">{r.connection}</span> },
    { key: 'result', header: t.activity.result, render: (r) => <StatusBadge status={r.result} /> },
  ];

  return (
    <div>
      <PageHeader
        title={t.activity.title}
        subtitle={t.activity.subtitle}
        icon={<IconActivity size={24} />}
        loading={loading}
      />
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
          {t.common.error}: {error}
        </div>
      )}
      <DataTable
        columns={columns}
        data={data}
        rowKey={(r) => r.id}
        loading={loading}
        emptyTitle={t.common.noData}
      />
    </div>
  );
}