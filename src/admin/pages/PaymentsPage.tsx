import { useMemo, useState } from 'react';
import { useAdminTranslations } from '../i18n';
import { PageHeader } from '../components/PageHeader';
import { DataTable, type Column } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { useAdminData } from '../hooks/useAdminData';
import { callAdmin } from '@/lib/admin-api';
import { Button } from '@/components/ui/Button';
import { IconCreditCard, IconSearch, IconPlus, IconX, IconTrash, IconEdit } from '../components/Icons';

interface Payment {
  id: string;
  customer_id: string | null;
  invoice_id: string | null;
  amount: number;
  currency: string;
  method: string | null;
  status: string;
  payment_date: string;
  reference: string | null;
  notes: string | null;
  created_at: string;
}

interface PaymentsList {
  data: Payment[];
  total: number;
}

const emptyForm = { amount: '', currency: 'USD', method: 'bank_transfer', status: 'completed', reference: '', notes: '' };

export function PaymentsPage() {
  const t = useAdminTranslations();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const request = useMemo(
    () => ({
      connection: 'botech' as const,
      module: 'payments',
      action: 'list',
      params: { status: statusFilter || undefined },
    }),
    [statusFilter]
  );
  const { data, loading, error, refresh } = useAdminData<PaymentsList>(request);

  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const [editRow, setEditRow] = useState<Payment | null>(null);
  const [editForm, setEditForm] = useState<{ amount: string; currency: string; method: string; status: string; reference: string } | null>(null);
  const [editing, setEditing] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [removing, setRemoving] = useState(false);

  function openEdit(row: Payment) {
    setEditRow(row);
    setEditForm({
      amount: String(row.amount ?? 0),
      currency: row.currency ?? 'USD',
      method: row.method ?? 'bank_transfer',
      status: row.status ?? 'completed',
      reference: row.reference ?? '',
    });
    setEditError(null);
  }

  async function saveEdit() {
    if (!editRow || !editForm) return;
    setEditing(true);
    setEditError(null);
    try {
      await callAdmin({
        connection: 'botech',
        module: 'payments',
        action: 'update',
        params: {
          id: editRow.id,
          amount: Number(editForm.amount) || 0,
          currency: editForm.currency,
          method: editForm.method,
          status: editForm.status,
          reference: editForm.reference || null,
        },
      });
      setEditRow(null);
      setEditForm(null);
      refresh();
    } catch (err) {
      setEditError(err instanceof Error ? err.message : 'update_failed');
    } finally {
      setEditing(false);
    }
  }

  async function removePayment() {
    if (!editRow) return;
    if (!window.confirm(t.payments.removeConfirm)) return;
    setRemoving(true);
    setEditError(null);
    try {
      await callAdmin({
        connection: 'botech',
        module: 'payments',
        action: 'remove',
        params: { id: editRow.id },
      });
      setEditRow(null);
      setEditForm(null);
      refresh();
    } catch (err) {
      setEditError(err instanceof Error ? err.message : 'remove_failed');
    } finally {
      setRemoving(false);
    }
  }

  const filtered = (data?.data ?? []).filter((p) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      (p.reference ?? '').toLowerCase().includes(q) ||
      (p.customer_id ?? '').toLowerCase().includes(q) ||
      (p.invoice_id ?? '').toLowerCase().includes(q)
    );
  });

  async function createPayment() {
    setCreating(true);
    setCreateError(null);
    try {
      await callAdmin({
        connection: 'botech',
        module: 'payments',
        action: 'create',
        params: { ...form, amount: Number(form.amount) || 0 },
      });
      setForm(emptyForm);
      setShowCreate(false);
      refresh();
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : 'create_failed');
    } finally {
      setCreating(false);
    }
  }

  const columns: Column<Payment>[] = [
    {
      key: 'amount',
      header: `${t.payments.amount} (${t.payments.currency})`,
      render: (r) => <span className="font-semibold">{Number(r.amount).toLocaleString()}</span>,
      minWidth: true,
    },
    { key: 'method', header: t.payments.method, render: (r) => r.method ?? '—' },
    { key: 'status', header: t.payments.status, render: (r) => <StatusBadge status={r.status} /> },
    { key: 'reference', header: t.payments.reference, render: (r) => r.reference ?? '—' },
    { key: 'invoice_id', header: t.crm.invoices, render: (r) => (r.invoice_id ? String(r.invoice_id).slice(0, 8) : '—') },
    {
      key: 'payment_date',
      header: t.payments.date,
      minWidth: true,
      render: (r) => <span className="text-gray-500">{new Date(r.payment_date).toLocaleString()}</span>,
    },
    {
      key: 'actions',
      header: t.payments.actions,
      render: (r) => (
        <button
          onClick={() => openEdit(r)}
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
          aria-label={t.common.edit}
        >
          <IconEdit size={16} />
        </button>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title={t.payments.title}
        subtitle={t.payments.subtitle}
        icon={<IconCreditCard size={24} />}
        loading={loading}
        actions={
          <Button onClick={() => setShowCreate(true)}>
            <IconPlus size={16} />
            {t.payments.addPayment}
          </Button>
        }
      />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
          {t.common.error}: {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <IconSearch size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.payments.search}
            className="w-full ps-10 pe-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-700"
        >
          <option value="">{t.common.filter}</option>
          <option value="pending">{t.payments.pending}</option>
          <option value="completed">{t.payments.completed}</option>
          <option value="failed">{t.payments.failed}</option>
          <option value="refunded">{t.payments.refunded}</option>
        </select>
      </div>

      <DataTable
        columns={columns}
        data={search ? filtered : data?.data}
        rowKey={(r) => r.id}
        loading={loading}
        emptyTitle={t.payments.noPayments}
        pagination={{ current: 1, pageSize: 20, total: data?.total ?? 0 }}
      />

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={() => !creating && setShowCreate(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-gray-900">{t.payments.addPayment}</h3>
              <button onClick={() => setShowCreate(false)} className="p-1.5 rounded-lg hover:bg-gray-100" disabled={creating}>
                <IconX size={18} />
              </button>
            </div>
            {createError && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">{createError}</div>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.payments.amount} *</label>
                <input type="number" step="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.payments.currency}</label>
                <select value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm">
                  <option value="USD">USD</option>
                  <option value="SYP">SYP</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.payments.method}</label>
                <select value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm">
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="card">Card</option>
                  <option value="cash">Cash</option>
                  <option value="wallet">Wallet</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.payments.status}</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm">
                  <option value="completed">{t.payments.completed}</option>
                  <option value="pending">{t.payments.pending}</option>
                  <option value="failed">{t.payments.failed}</option>
                  <option value="refunded">{t.payments.refunded}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.payments.reference}</label>
                <input value={form.reference} onChange={(e) => setForm({ ...form, reference: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 text-sm" />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="secondary" onClick={() => setShowCreate(false)} disabled={creating}>
                {t.common.cancel}
              </Button>
              <Button onClick={createPayment} loading={creating}>
                {t.common.create}
              </Button>
            </div>
          </div>
        </div>
      )}

      {editRow && editForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={() => !editing && setEditRow(null)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-gray-900">{t.payments.editPayment}</h3>
              <button onClick={() => !editing && setEditRow(null)} className="p-1.5 rounded-lg hover:bg-gray-100" disabled={editing}>
                <IconX size={18} />
              </button>
            </div>
            {editError && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">{editError}</div>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.payments.amount} *</label>
                <input type="number" step="0.01" value={editForm.amount} onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.payments.currency}</label>
                <select value={editForm.currency} onChange={(e) => setEditForm({ ...editForm, currency: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm">
                  <option value="USD">USD</option>
                  <option value="SYP">SYP</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.payments.method}</label>
                <select value={editForm.method} onChange={(e) => setEditForm({ ...editForm, method: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm">
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="card">Card</option>
                  <option value="cash">Cash</option>
                  <option value="wallet">Wallet</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.payments.status}</label>
                <select value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm">
                  <option value="completed">{t.payments.completed}</option>
                  <option value="pending">{t.payments.pending}</option>
                  <option value="failed">{t.payments.failed}</option>
                  <option value="refunded">{t.payments.refunded}</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.payments.reference}</label>
                <input value={editForm.reference} onChange={(e) => setEditForm({ ...editForm, reference: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 text-sm" />
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 mt-6">
              <Button variant="danger" onClick={removePayment} loading={removing} disabled={editing}>
                <IconTrash size={16} />
                {t.common.delete}
              </Button>
              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setEditRow(null)} disabled={editing}>
                  {t.common.cancel}
                </Button>
                <Button onClick={saveEdit} loading={editing}>
                  {t.common.save}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}