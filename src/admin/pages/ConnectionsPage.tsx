import { useEffect, useState } from 'react';
import { useAdminTranslations } from '../i18n';
import { PageHeader } from '../components/PageHeader';
import { StatusBadge } from '../components/StatusBadge';
import { useAdminData } from '../hooks/useAdminData';
import { callAdmin } from '@/lib/admin-api';
import { Button } from '@/components/ui/Button';
import { Spinner } from '../components/Spinner';
import { IconPlug, IconRefresh, IconCheckCircle, IconXCircle, IconX, IconEdit } from '../components/Icons';

interface ConnectionSummary {
  id: string;
  name: string;
  nameAr?: string;
  projectRef: string;
  environment: string;
  description?: string;
  descriptionAr?: string;
  url?: string;
  status?: string;
  lastCheckedAt?: string | null;
  errorMessage?: string;
}

interface ConnectionsList {
  connections: ConnectionSummary[];
}

interface ConnTestResult {
  status: string;
  message: string;
  projectInfo?: { name?: string; region?: string; status?: string };
  error?: string;
}

interface SecretStatus {
  id: string;
  secretConfigured: boolean;
  mgmtTokenConfigured: boolean;
}

interface EditForm {
  id: string;
  name: string;
  name_ar: string;
  description: string;
  description_ar: string;
  environment: string;
}

export function ConnectionsPage() {
  const t = useAdminTranslations();
  const { data, loading, error, refresh } = useAdminData<ConnectionsList>({
    connection: 'botech',
    module: 'connections',
    action: 'list',
  });
  const [testingId, setTestingId] = useState<string | null>(null);
  const [testingAll, setTestingAll] = useState(false);
  const [results, setResults] = useState<Record<string, ConnTestResult>>({});
  const [secrets, setSecrets] = useState<Record<string, SecretStatus>>({});

  const [editForm, setEditForm] = useState<EditForm | null>(null);
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    callAdmin<SecretStatus[]>({ connection: 'botech', module: 'connections', action: 'secretStatus' })
      .then((rows) => {
        if (!active) return;
        const map: Record<string, SecretStatus> = {};
        rows.forEach((r) => (map[r.id] = r));
        setSecrets(map);
      })
      .catch(() => { /* status panel is best-effort */ });
    return () => {
      active = false;
    };
  }, []);

  async function testConnection(id: string) {
    setTestingId(id);
    setResults((r) => ({ ...r, [id]: { status: 'pending', message: t.connections.testing } }));
    try {
      const res = await callAdmin<ConnTestResult>({
        connection: 'botech',
        module: 'connections',
        action: 'test',
        params: { connection: id },
      });
      setResults((r) => ({ ...r, [id]: res }));
    } catch (err) {
      setResults((r) => ({
        ...r,
        [id]: { status: 'error', message: err instanceof Error ? err.message : 'test_failed' },
      }));
    } finally {
      setTestingId(null);
    }
  }

  async function testAll() {
    setTestingAll(true);
    try {
      const res = await callAdmin<{ results: { id: string; test: ConnTestResult }[] }>({
        connection: 'botech',
        module: 'connections',
        action: 'testAll',
      });
      const map: Record<string, ConnTestResult> = {};
      res.results.forEach((r) => (map[r.id] = r.test));
      setResults(map);
    } catch (err) {
      setResults((r) => ({ ...r, botech: { status: 'error', message: err instanceof Error ? err.message : 'test_failed' } }));
    } finally {
      setTestingAll(false);
    }
  }

  function openEdit(c: ConnectionSummary) {
    setEditForm({
      id: c.id,
      name: c.name ?? '',
      name_ar: c.nameAr ?? '',
      description: c.description ?? '',
      description_ar: c.descriptionAr ?? '',
      environment: c.environment ?? 'production',
    });
    setEditError(null);
  }

  async function saveEdit() {
    if (!editForm) return;
    setSaving(true);
    setEditError(null);
    try {
      await callAdmin({
        connection: 'botech',
        module: 'connections',
        action: 'update',
        params: {
          connection: editForm.id,
          name: editForm.name,
          name_ar: editForm.name_ar,
          description: editForm.description,
          description_ar: editForm.description_ar,
          environment: editForm.environment,
        },
      });
      setEditForm(null);
      refresh();
    } catch (err) {
      setEditError(err instanceof Error ? err.message : 'update_failed');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <PageHeader
        title={t.connections.title}
        subtitle={t.connections.subtitle}
        icon={<IconPlug size={24} />}
        loading={loading}
        actions={
          <button
            onClick={testAll}
            disabled={testingAll}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
          >
            {testingAll ? <Spinner size="sm" className="border-white/40 border-t-white" /> : <IconRefresh size={16} />}
            {t.connections.testAll}
          </button>
        }
      />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
          {t.common.error}: {error}
        </div>
      )}

      {!loading && !data?.connections?.length && !error && (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500">
          {t.common.noData}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {data?.connections?.map((c) => {
          const test = results[c.id];
          const displayStatus = test?.status && test.status !== 'pending' ? test.status : c.status;
          const secret = secrets[c.id];
          return (
            <div key={c.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{c.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{c.projectRef}</p>
                  </div>
                  <StatusBadge status={displayStatus ?? 'unknown'} size="md" />
                </div>

                {c.description && <p className="text-xs text-gray-500 mb-3">{c.description}</p>}

                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">{t.connections.environment}</dt>
                    <dd className="font-medium text-gray-800">{c.environment ?? t.common.production}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">{t.connections.projectRef}</dt>
                    <dd className="font-mono text-xs text-gray-700 mt-1">{c.projectRef}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">{t.common.lastChecked}</dt>
                    <dd className="text-gray-700">
                      {test?.message && test.status !== 'pending' ? test.message : c.lastCheckedAt ? new Date(c.lastCheckedAt).toLocaleString() : '—'}
                    </dd>
                  </div>
                </dl>

                {secret && (
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div
                      className={`text-xs rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 ${
                        secret.secretConfigured ? 'text-green-700 bg-green-50' : 'text-amber-700 bg-amber-50'
                      }`}
                    >
                      {secret.secretConfigured ? <IconCheckCircle size={13} /> : <IconXCircle size={13} />}
                      {t.connections.serviceKey}
                    </div>
                    <div
                      className={`text-xs rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 ${
                        secret.mgmtTokenConfigured ? 'text-green-700 bg-green-50' : 'text-amber-700 bg-amber-50'
                      }`}
                    >
                      {secret.mgmtTokenConfigured ? <IconCheckCircle size={13} /> : <IconXCircle size={13} />}
                      {t.connections.mgmtToken}
                    </div>
                  </div>
                )}

                {test && test.status !== 'pending' && (test.error || test.status === 'error') && (
                  <div className="mt-3 text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2 flex items-center gap-2">
                    <IconXCircle size={14} />
                    {test.error ?? test.message}
                  </div>
                )}

                {test?.projectInfo && test.status === 'connected' && (
                  <div className="mt-3 text-xs text-green-700 bg-green-50 rounded-lg px-3 py-2 flex items-center gap-2">
                    <IconCheckCircle size={14} />
                    {test.projectInfo.name}
                    {test.projectInfo.region ? ` — ${test.projectInfo.region}` : ''}
                  </div>
                )}
              </div>

              <div className="px-5 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <button
                  onClick={() => testConnection(c.id)}
                  disabled={testingId === c.id}
                  className="flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 disabled:opacity-50"
                >
                  {testingId === c.id ? <Spinner size="sm" /> : <IconRefresh size={15} />}
                  {testingId === c.id ? t.connections.testing : t.connections.testConnection}
                </button>
                <button
                  onClick={() => openEdit(c)}
                  className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-500 hover:text-gray-900 transition-colors"
                  aria-label={t.connections.editConnection}
                >
                  <IconEdit size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {editForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={() => !saving && setEditForm(null)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-gray-900">{t.connections.editConnection}</h3>
              <button onClick={() => !saving && setEditForm(null)} className="p-1.5 rounded-lg hover:bg-gray-100" disabled={saving}>
                <IconX size={18} />
              </button>
            </div>
            {editError && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">{editError}</div>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.connections.connectionName}</label>
                <input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.connections.connectionNameAr}</label>
                <input value={editForm.name_ar} onChange={(e) => setEditForm({ ...editForm, name_ar: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 text-sm" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.connections.description}</label>
                <textarea value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 text-sm" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.connections.description} (AR)</label>
                <textarea value={editForm.description_ar} onChange={(e) => setEditForm({ ...editForm, description_ar: e.target.value })} rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.connections.environment}</label>
                <select value={editForm.environment} onChange={(e) => setEditForm({ ...editForm, environment: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm">
                  <option value="production">{t.common.production}</option>
                  <option value="staging">Staging</option>
                  <option value="development">Development</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="secondary" onClick={() => setEditForm(null)} disabled={saving}>
                {t.common.cancel}
              </Button>
              <Button onClick={saveEdit} loading={saving}>
                {t.common.save}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}