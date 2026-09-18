import { useMemo, useState } from 'react';
import { useAdminTranslations } from '../i18n';
import { PageHeader } from '../components/PageHeader';
import { DataTable, type Column } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { useAdminData } from '../hooks/useAdminData';
import { callAdmin } from '@/lib/admin-api';
import { Button } from '@/components/ui/Button';
import { IconInvoice, IconSearch, IconPlus, IconX, IconTrash, IconEdit } from '../components/Icons';

interface Invoice {
  id: string;
  invoice_number: string;
  customer_id: string | null;
  status: string;
  currency: string;
  issue_date: string;
  due_date: string | null;
  subtotal: number;
  total: number;
  paid_amount: number;
  created_at: string;
}

interface InvoicesList {
  data: Invoice[];
  total: number;
}

const emptyForm = {
  invoice_number: '',
  customer_id: '',
  status: 'draft',
  currency: 'USD',
  issue_date: '',
  due_date: '',
  discount: '0',
  tax_rate: '0',
  subtotal: '0',
  total: '0',
  notes: '',
};

export function InvoicesPage() {
  const t = useAdminTranslations();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const request = useMemo(
    () => ({
      connection: 'botech' as const,
      module: 'invoices',
      action: 'list',
      params: { status: statusFilter || undefined },
    }),
    [statusFilter]
  );
  const { data, loading, error, refresh } = useAdminData<InvoicesList>(request);

  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [detail, setDetail] = useState<{ invoice: Invoice; items: unknown[] } | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [editForm, setEditForm] = useState<Record<string, string> | null>(null);
  const [editing, setEditing] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [removing, setRemoving] = useState(false);

  async function openInvoice(id: string) {
    setEditingId(id);
    setDetailLoading(true);
    setDetail(null);
    setEditError(null);
    try {
      const res = await callAdmin<{ invoice: Invoice; items: unknown[] }>({
        connection: 'botech',
        module: 'invoices',
        action: 'view',
        params: { id },
      });
      setDetail(res);
      setEditForm({
        invoice_number: res.invoice.invoice_number,
        status: res.invoice.status,
        currency: res.invoice.currency,
        issue_date: res.invoice.issue_date ?? '',
        due_date: res.invoice.due_date ?? '',
        total: String(res.invoice.total ?? 0),
        paid_amount: String(res.invoice.paid_amount ?? 0),
      });
    } catch (err) {
      setEditError(err instanceof Error ? err.message : 'load_failed');
    } finally {
      setDetailLoading(false);
    }
  }

  async function saveEdit() {
    if (!editingId || !editForm) return;
    setEditing(true);
    setEditError(null);
    try {
      await callAdmin({
        connection: 'botech',
        module: 'invoices',
        action: 'update',
        params: {
          id: editingId,
          invoice_number: editForm.invoice_number,
          status: editForm.status,
          currency: editForm.currency,
          issue_date: editForm.issue_date || undefined,
          due_date: editForm.due_date || undefined,
          total: Number(editForm.total) || 0,
          paid_amount: Number(editForm.paid_amount) || 0,
        },
      });
      setEditingId(null);
      setDetail(null);
      refresh();
    } catch (err) {
      setEditError(err instanceof Error ? err.message : 'update_failed');
    } finally {
      setEditing(false);
    }
  }

  async function removeInvoice() {
    if (!editingId) return;
    if (!window.confirm(t.invoices.removeConfirm)) return;
    setRemoving(true);
    setEditError(null);
    try {
      await callAdmin({
        connection: 'botech',
        module: 'invoices',
        action: 'remove',
        params: { id: editingId },
      });
      setEditingId(null);
      setDetail(null);
      refresh();
    } catch (err) {
      setEditError(err instanceof Error ? err.message : 'remove_failed');
    } finally {
      setRemoving(false);
    }
  }

  const filtered = (data?.data ?? []).filter((inv) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return inv.invoice_number.toLowerCase().includes(q) || (inv.customer_id ?? '').toLowerCase().includes(q);
  });

  async function createInvoice() {
    setCreating(true);
    setCreateError(null);
    try {
      await callAdmin({
        connection: 'botech',
        module: 'invoices',
        action: 'create',
        params: {
          invoice_number: form.invoice_number || undefined,
          customer_id: form.customer_id || undefined,
          status: form.status,
          currency: form.currency,
          issue_date: form.issue_date || undefined,
          due_date: form.due_date || undefined,
          discount: Number(form.discount) || 0,
          tax_rate: Number(form.tax_rate) || 0,
          subtotal: Number(form.subtotal) || 0,
          total: Number(form.total) || 0,
          notes: form.notes || undefined,
        },
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

  const columns: Column<Invoice>[] = [
    {
      key: 'invoice_number',
      header: t.invoices.invoiceNumber,
      render: (r) => (
        <button
          onClick={() => openInvoice(r.id)}
          className="font-medium text-primary-600 hover:text-primary-700 hover:underline"
        >
          {r.invoice_number}
        </button>
      ),
      minWidth: true,
    },
    { key: 'customer_id', header: t.invoices.customer, render: (r) => r.customer_id ? String(r.customer_id).slice(0, 8) : '—' },
    { key: 'status', header: t.invoices.status, render: (r) => <StatusBadge status={r.status} /> },
    {
      key: 'total',
      header: `${t.invoices.total} (${t.payments.currency})`,
      render: (r) => <span className="font-semibold">{Number(r.total).toLocaleString()}</span>,
      minWidth: true,
    },
    {
      key: 'paid_amount',
      header: t.invoices.paidAmount,
      render: (r) => <span>{Number(r.paid_amount).toLocaleString()}</span>,
      minWidth: true,
    },
    { key: 'issue_date', header: t.invoices.issueDate, render: (r) => r.issue_date ?? '—', minWidth: true },
    { key: 'due_date', header: t.invoices.dueDate, render: (r) => r.due_date ?? '—', minWidth: true },
    {
      key: 'actions',
      header: t.invoices.actions,
      render: (r) => (
        <button
          onClick={() => openInvoice(r.id)}
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
        title={t.invoices.title}
        subtitle={t.invoices.subtitle}
        icon={<IconInvoice size={24} />}
        loading={loading}
        actions={
          <Button onClick={() => setShowCreate(true)}>
            <IconPlus size={16} />
            {t.invoices.addInvoice}
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
            placeholder={t.invoices.search}
            className="w-full ps-10 pe-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-700"
        >
          <option value="">{t.common.filter}</option>
          <option value="draft">{t.invoices.draft}</option>
          <option value="issued">{t.invoices.issued}</option>
          <option value="paid">{t.invoices.paid}</option>
          <option value="partial">{t.invoices.partial}</option>
          <option value="overdue">{t.invoices.overdue}</option>
          <option value="cancelled">{t.invoices.cancelled}</option>
        </select>
      </div>

      <DataTable
        columns={columns}
        data={search ? filtered : data?.data}
        rowKey={(r) => r.id}
        loading={loading}
        emptyTitle={t.invoices.noInvoices}
        pagination={{ current: 1, pageSize: 20, total: data?.total ?? 0 }}
      />

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={() => !creating && setShowCreate(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-gray-900">{t.invoices.addInvoice}</h3>
              <button onClick={() => setShowCreate(false)} className="p-1.5 rounded-lg hover:bg-gray-100" disabled={creating}>
                <IconX size={18} />
              </button>
            </div>
            {createError && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">{createError}</div>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.invoices.invoiceNumber}</label>
                <input value={form.invoice_number} onChange={(e) => setForm({ ...form, invoice_number: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 text-sm" placeholder="INV-..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.invoices.status}</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm">
                  <option value="draft">{t.invoices.draft}</option>
                  <option value="issued">{t.invoices.issued}</option>
                  <option value="paid">{t.invoices.paid}</option>
                  <option value="partial">{t.invoices.partial}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.invoices.total}</label>
                <input type="number" step="0.01" value={form.total} onChange={(e) => setForm({ ...form, total: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.invoices.issueDate}</label>
                <input type="date" value={form.issue_date} onChange={(e) => setForm({ ...form, issue_date: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.invoices.dueDate}</label>
                <input type="date" value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.payments.currency}</label>
                <select value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm">
                  <option value="USD">USD</option>
                  <option value="SYP">SYP</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="secondary" onClick={() => setShowCreate(false)} disabled={creating}>
                {t.common.cancel}
              </Button>
              <Button onClick={createInvoice} loading={creating}>
                {t.common.create}
              </Button>
            </div>
          </div>
        </div>
      )}

      {editingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={() => !editing && setEditingId(null)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-gray-900">{t.invoices.editInvoice}</h3>
              <button onClick={() => !editing && setEditingId(null)} className="p-1.5 rounded-lg hover:bg-gray-100" disabled={editing}>
                <IconX size={18} />
              </button>
            </div>
            {editError && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">{editError}</div>}

            {detailLoading && !editForm ? (
              <div className="py-8 text-center text-sm text-gray-400">{t.common.loading}</div>
            ) : editForm && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.invoices.invoiceNumber}</label>
                    <input value={editForm.invoice_number} onChange={(e) => setEditForm({ ...editForm, invoice_number: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.invoices.status}</label>
                    <select value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm">
                      <option value="draft">{t.invoices.draft}</option>
                      <option value="issued">{t.invoices.issued}</option>
                      <option value="paid">{t.invoices.paid}</option>
                      <option value="partial">{t.invoices.partial}</option>
                      <option value="overdue">{t.invoices.overdue}</option>
                      <option value="cancelled">{t.invoices.cancelled}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.invoices.total}</label>
                    <input type="number" step="0.01" value={editForm.total} onChange={(e) => setEditForm({ ...editForm, total: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.invoices.paidAmount}</label>
                    <input type="number" step="0.01" value={editForm.paid_amount} onChange={(e) => setEditForm({ ...editForm, paid_amount: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.invoices.issueDate}</label>
                    <input type="date" value={editForm.issue_date} onChange={(e) => setEditForm({ ...editForm, issue_date: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.invoices.dueDate}</label>
                    <input type="date" value={editForm.due_date} onChange={(e) => setEditForm({ ...editForm, due_date: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.payments.currency}</label>
                    <select value={editForm.currency} onChange={(e) => setEditForm({ ...editForm, currency: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm">
                      <option value="USD">USD</option>
                      <option value="SYP">SYP</option>
                      <option value="EUR">EUR</option>
                    </select>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-sm font-medium text-gray-700 mb-2">{t.invoices.items}</p>
                  {detail && detail.items.length > 0 ? (
                    <ul className="divide-y divide-gray-100 rounded-lg border border-gray-200">
                      {detail.items.map((it, idx) => {
                        const item = it as { id?: string; description?: string; quantity?: number; unit_price?: number };
                        return (
                          <li key={item.id ?? idx} className="flex items-center justify-between px-3 py-2 text-sm">
                            <span className="text-gray-700">{item.description ?? '—'}</span>
                            <span className="text-gray-500">{item.quantity ?? 1} × {Number(item.unit_price ?? 0).toLocaleString()}</span>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-400">{t.invoices.noItems}</p>
                  )}
                </div>

                <div className="flex items-center justify-between gap-3 mt-6">
                  <Button variant="danger" onClick={removeInvoice} loading={removing} disabled={editing}>
                    <IconTrash size={16} />
                    {t.common.delete}
                  </Button>
                  <div className="flex gap-3">
                    <Button variant="secondary" onClick={() => setEditingId(null)} disabled={editing}>
                      {t.common.cancel}
                    </Button>
                    <Button onClick={saveEdit} loading={editing}>
                      {t.common.save}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}