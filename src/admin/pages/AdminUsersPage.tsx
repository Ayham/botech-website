import { useState } from 'react';
import { useAdminTranslations } from '../i18n';
import { PageHeader } from '../components/PageHeader';
import { DataTable, type Column } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { useAdminData } from '../hooks/useAdminData';
import { callAdmin } from '@/lib/admin-api';
import { Button } from '@/components/ui/Button';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { IconUsersGroup, IconPlus, IconX, IconTrash, IconEdit } from '../components/Icons';

interface AdminUserRow {
  id: string;
  email: string;
  display_name: string | null;
  status: string;
  created_at: string;
  last_login_at: string | null;
  admin_roles: { code: string; name: string | null } | null;
}

const ROLE_CODES = ['super_admin', 'admin', 'manager', 'viewer'] as const;
const emptyForm = { email: '', password: '', display_name: '', role: 'viewer' as string };

export function AdminUsersPage() {
  const t = useAdminTranslations();
  const { user: currentUser } = useAdminAuth();
  const { data, loading, error, refresh } = useAdminData<AdminUserRow[]>({
    connection: 'botech',
    module: 'adminUsers',
    action: 'list',
  });

  const [showCreate, setShowCreate] = useState(false);
  const [editRow, setEditRow] = useState<AdminUserRow | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [flash, setFlash] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);

  function roleLabel(code: string): string {
    switch (code) {
      case 'super_admin': return t.adminUsers.superAdmin;
      case 'admin': return t.adminUsers.admin;
      case 'manager': return t.adminUsers.manager;
      default: return t.adminUsers.viewer;
    }
  }

  const clearForm = () => {
    setForm(emptyForm);
    setEditRow(null);
    setShowCreate(false);
    setActionError(null);
  };

  async function createUser() {
    if (!form.email.trim() || !form.password) return;
    setSaving(true);
    setActionError(null);
    try {
      await callAdmin({
        connection: 'botech',
        module: 'adminUsers',
        action: 'create',
        params: {
          email: form.email,
          password: form.password,
          display_name: form.display_name || null,
          role: form.role,
        },
      });
      refresh();
      clearForm();
      setFlash(t.common.success);
      setTimeout(() => setFlash(null), 2500);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'create_failed');
    } finally {
      setSaving(false);
    }
  }

  async function saveEdit() {
    if (!editRow) return;
    setSaving(true);
    setActionError(null);
    try {
      await callAdmin({
        connection: 'botech',
        module: 'adminUsers',
        action: 'update',
        params: {
          id: editRow.id,
          display_name: form.display_name || null,
          role: form.role,
          status: editRow.status,
        },
      });
      refresh();
      clearForm();
      setFlash(t.common.success);
      setTimeout(() => setFlash(null), 2500);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'update_failed');
    } finally {
      setSaving(false);
    }
  }

  async function removeUser(row: AdminUserRow) {
    if (row.id === currentUser?.id) {
      setActionError(t.adminUsers.cannotRemoveSelf);
      return;
    }
    if (!window.confirm(t.adminUsers.removeConfirm)) return;
    setRemovingId(row.id);
    setActionError(null);
    try {
      await callAdmin({
        connection: 'botech',
        module: 'adminUsers',
        action: 'remove',
        params: { id: row.id },
      });
      refresh();
      setFlash(t.adminUsers.remove);
      setTimeout(() => setFlash(null), 2500);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'remove_failed');
    } finally {
      setRemovingId(null);
    }
  }

  function openEdit(row: AdminUserRow) {
    setEditRow(row);
    setForm({
      email: row.email,
      password: '',
      display_name: row.display_name ?? '',
      role: row.admin_roles?.code ?? 'viewer',
    });
    setActionError(null);
  }

  const columns: Column<AdminUserRow>[] = [
    {
      key: 'email',
      header: t.adminUsers.email,
      render: (r) => (
        <div>
          <p className="font-medium text-gray-900">{r.email}</p>
          {r.display_name && <p className="text-xs text-gray-400">{r.display_name}</p>}
        </div>
      ),
    },
    {
      key: 'admin_roles',
      header: t.adminUsers.role,
      render: (r) => (
        <span className="px-2 py-0.5 bg-primary-50 text-primary-700 text-xs font-medium rounded-full">
          {roleLabel(r.admin_roles?.code ?? 'viewer')}
        </span>
      ),
    },
    { key: 'status', header: t.adminUsers.status, render: (r) => <StatusBadge status={r.status} /> },
    {
      key: 'last_login_at',
      header: t.adminUsers.lastLogin,
      render: (r) => (r.last_login_at ? new Date(r.last_login_at).toLocaleString() : '—'),
    },
    { key: 'created_at', header: t.common.date, render: (r) => new Date(r.created_at).toLocaleDateString() },
    {
      key: 'actions',
      header: t.adminUsers.actions,
      render: (r) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => openEdit(r)}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
            aria-label={t.common.edit}
          >
            <IconEdit size={16} />
          </button>
          <button
            onClick={() => removeUser(r)}
            disabled={r.id === currentUser?.id || removingId === r.id}
            className="p-1.5 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label={t.adminUsers.remove}
          >
            <IconTrash size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title={t.adminUsers.title}
        subtitle={t.adminUsers.subtitle}
        icon={<IconUsersGroup size={24} />}
        loading={loading}
        actions={
          <Button onClick={() => { setForm(emptyForm); setEditRow(null); setShowCreate(true); }}>
            <IconPlus size={16} />
            {t.adminUsers.addUser}
          </Button>
        }
      />

      {(error || actionError) && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
          {error ?? actionError}
        </div>
      )}

      {flash && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3 mb-4">
          {flash}
        </div>
      )}

      <DataTable columns={columns} data={data} rowKey={(r) => r.id} loading={loading} emptyTitle={t.adminUsers.noUsers} />

      {(showCreate || editRow) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={() => !saving && clearForm()} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-gray-900">
                {editRow ? t.adminUsers.editUser : t.adminUsers.addUser}
              </h3>
              <button onClick={() => !saving && clearForm()} className="p-1.5 rounded-lg hover:bg-gray-100" disabled={saving}>
                <IconX size={18} />
              </button>
            </div>

            {actionError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">{actionError}</div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.adminUsers.email} *</label>
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  disabled={!!editRow}
                  dir="ltr"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 text-sm disabled:bg-gray-100 disabled:text-gray-400"
                />
              </div>

              {!editRow && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.adminUsers.password} *</label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 text-sm"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.adminUsers.displayName}</label>
                <input
                  value={form.display_name}
                  onChange={(e) => setForm({ ...form, display_name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.adminUsers.role}</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm"
                >
                  {ROLE_CODES.map((code) => (
                    <option key={code} value={code}>{roleLabel(code)}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button variant="secondary" onClick={clearForm} disabled={saving}>
                {t.common.cancel}
              </Button>
              <Button onClick={editRow ? saveEdit : createUser} loading={saving}>
                {t.common.save}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}