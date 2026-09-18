import { useMemo, useState } from 'react';
import { useAdminTranslations } from '../i18n';
import { PageHeader } from '../components/PageHeader';
import { DataTable, type Column } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { useAdminData } from '../hooks/useAdminData';
import { callAdmin } from '@/lib/admin-api';
import { Button } from '@/components/ui/Button';
import { IconUsers, IconSearch, IconPlus, IconX, IconTrash, IconEdit } from '../components/Icons';

interface Customer {
  id: string;
  name: string;
  name_ar: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  status: string;
  source: string | null;
  notes?: string | null;
  created_at: string;
}

interface Contact {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  role: string | null;
  is_primary: boolean;
}

interface ActivityEntry {
  id: string;
  activity_type: string;
  description: string;
  created_at: string;
}

interface LinkedInvoice { id: string; invoice_number: string; status: string; total: number }
interface LinkedPayment { id: string; amount: number; currency: string; status: string; payment_date: string }
interface LinkedOrder { id: string; order_number: string; status: string; total: number; currency: string }

interface CustomerDetail {
  customer: Customer;
  contacts: Contact[];
  activity: ActivityEntry[];
  invoices: LinkedInvoice[];
  payments: LinkedPayment[];
  orders: LinkedOrder[];
}

interface CustomersList {
  data: Customer[];
  total: number;
}

const emptyForm = { name: '', name_ar: '', email: '', phone: '', company: '', status: 'lead', source: '', notes: '' };
const emptyContact = { name: '', phone: '', email: '', role: '' };

export function CRMPage() {
  const t = useAdminTranslations();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const request = useMemo(
    () => ({
      connection: 'botech' as const,
      module: 'customers',
      action: 'list',
      params: { search: search || undefined, status: statusFilter || undefined },
    }),
    [search, statusFilter]
  );
  const { data, loading, error, refresh } = useAdminData<CustomersList>(request);

  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const [detailId, setDetailId] = useState<string | null>(null);
  const [detail, setDetail] = useState<CustomerDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [editForm, setEditForm] = useState<Customer | null>(null);
  const [saving, setSaving] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [removing, setRemoving] = useState(false);

  const [contactForm, setContactForm] = useState(emptyContact);
  const [addingContact, setAddingContact] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [addingNote, setAddingNote] = useState(false);

  async function createCustomer() {
    if (!form.name.trim()) return;
    setCreating(true);
    setCreateError(null);
    try {
      await callAdmin({ connection: 'botech', module: 'customers', action: 'create', params: form });
      setForm(emptyForm);
      setShowCreate(false);
      refresh();
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : 'create_failed');
    } finally {
      setCreating(false);
    }
  }

  async function loadDetail(id: string) {
    setDetailId(id);
    setDetailLoading(true);
    setDetail(null);
    setDetailError(null);
    try {
      const res = await callAdmin<CustomerDetail>({
        connection: 'botech',
        module: 'customers',
        action: 'detail',
        params: { id },
      });
      setDetail(res);
      setEditForm(res.customer);
    } catch (err) {
      setDetailError(err instanceof Error ? err.message : 'load_failed');
    } finally {
      setDetailLoading(false);
    }
  }

  async function saveCustomer() {
    if (!editForm) return;
    setSaving(true);
    setDetailError(null);
    try {
      await callAdmin({
        connection: 'botech',
        module: 'customers',
        action: 'update',
        params: {
          id: editForm.id,
          name: editForm.name,
          name_ar: editForm.name_ar || null,
          email: editForm.email || null,
          phone: editForm.phone || null,
          company: editForm.company || null,
          status: editForm.status,
          source: editForm.source || null,
          notes: editForm.notes || null,
        },
      });
      await loadDetail(editForm.id);
      refresh();
    } catch (err) {
      setDetailError(err instanceof Error ? err.message : 'update_failed');
    } finally {
      setSaving(false);
    }
  }

  async function removeCustomer() {
    if (!detailId) return;
    if (!window.confirm(t.crm.removeConfirm)) return;
    setRemoving(true);
    setDetailError(null);
    try {
      await callAdmin({ connection: 'botech', module: 'customers', action: 'remove', params: { id: detailId } });
      setDetailId(null);
      setDetail(null);
      refresh();
    } catch (err) {
      setDetailError(err instanceof Error ? err.message : 'remove_failed');
    } finally {
      setRemoving(false);
    }
  }

  async function addContact() {
    if (!detailId || !contactForm.name.trim()) return;
    setAddingContact(true);
    setDetailError(null);
    try {
      await callAdmin({
        connection: 'botech',
        module: 'contacts',
        action: 'create',
        params: { customer_id: detailId, ...contactForm, is_primary: false },
      });
      setContactForm(emptyContact);
      await loadDetail(detailId);
    } catch (err) {
      setDetailError(err instanceof Error ? err.message : 'create_failed');
    } finally {
      setAddingContact(false);
    }
  }

  async function removeContact(id: string) {
    if (!window.confirm(t.crm.removeContactConfirm)) return;
    setDetailError(null);
    try {
      await callAdmin({ connection: 'botech', module: 'contacts', action: 'remove', params: { id } });
      if (detailId) await loadDetail(detailId);
    } catch (err) {
      setDetailError(err instanceof Error ? err.message : 'remove_failed');
    }
  }

  async function addNote() {
    if (!detailId || !noteText.trim()) return;
    setAddingNote(true);
    setDetailError(null);
    try {
      await callAdmin({
        connection: 'botech',
        module: 'activityLog',
        action: 'add',
        params: { customer_id: detailId, activity_type: 'note', description: noteText },
      });
      setNoteText('');
      await loadDetail(detailId);
    } catch (err) {
      setDetailError(err instanceof Error ? err.message : 'create_failed');
    } finally {
      setAddingNote(false);
    }
  }

  const columns: Column<Customer>[] = [
    {
      key: 'name',
      header: t.crm.name,
      render: (r) => (
        <button onClick={() => loadDetail(r.id)} className="text-start">
          <p className="font-medium text-primary-600 hover:text-primary-700 hover:underline">{r.name}</p>
          {r.name_ar && <p className="text-xs text-gray-400">{r.name_ar}</p>}
        </button>
      ),
    },
    { key: 'email', header: t.crm.email, render: (r) => r.email ?? '—' },
    { key: 'phone', header: t.crm.phone, render: (r) => r.phone ?? '—', minWidth: true },
    { key: 'company', header: t.crm.company, render: (r) => r.company ?? '—' },
    { key: 'source', header: t.crm.source, render: (r) => r.source ?? '—' },
    { key: 'status', header: t.crm.status, render: (r) => <StatusBadge status={r.status} />, minWidth: true },
    {
      key: 'created_at',
      header: t.common.date,
      minWidth: true,
      render: (r) => <span className="text-gray-500">{new Date(r.created_at).toLocaleDateString()}</span>,
    },
    {
      key: 'actions',
      header: t.crm.actions,
      render: (r) => (
        <button
          onClick={() => loadDetail(r.id)}
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
        title={t.crm.title}
        subtitle={t.crm.subtitle}
        icon={<IconUsers size={24} />}
        loading={loading}
        actions={
          <Button onClick={() => setShowCreate(true)}>
            <IconPlus size={16} />
            {t.crm.addCustomer}
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
            placeholder={t.crm.search}
            className="w-full ps-10 pe-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-700"
        >
          <option value="">{t.common.filter}</option>
          <option value="lead">{t.crm.lead}</option>
          <option value="active">{t.crm.active}</option>
          <option value="inactive">{t.crm.inactive}</option>
          <option value="blocked">{t.crm.blocked}</option>
        </select>
      </div>

      <DataTable
        columns={columns}
        data={data?.data}
        rowKey={(r) => r.id}
        loading={loading}
        emptyTitle={t.crm.noCustomers}
        pagination={{ current: 1, pageSize: 20, total: data?.total ?? 0 }}
      />

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={() => !creating && setShowCreate(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-gray-900">{t.crm.addCustomer}</h3>
              <button onClick={() => setShowCreate(false)} className="p-1.5 rounded-lg hover:bg-gray-100" disabled={creating}>
                <IconX size={18} />
              </button>
            </div>
            {createError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">{createError}</div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.crm.name} *</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.crm.nameAr}</label>
                <input value={form.name_ar} onChange={(e) => setForm({ ...form, name_ar: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.crm.email}</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.crm.phone}</label>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.crm.company}</label>
                <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.crm.status}</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm">
                  <option value="lead">{t.crm.lead}</option>
                  <option value="active">{t.crm.active}</option>
                  <option value="inactive">{t.crm.inactive}</option>
                  <option value="blocked">{t.crm.blocked}</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="secondary" onClick={() => setShowCreate(false)} disabled={creating}>
                {t.common.cancel}
              </Button>
              <Button onClick={createCustomer} loading={creating}>
                {t.common.create}
              </Button>
            </div>
          </div>
        </div>
      )}

      {detailId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={() => !saving && !removing && setDetailId(null)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-gray-900">{t.crm.customerDetails}</h3>
              <button onClick={() => setDetailId(null)} className="p-1.5 rounded-lg hover:bg-gray-100" disabled={saving || removing}>
                <IconX size={18} />
              </button>
            </div>

            {detailError && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">{detailError}</div>}

            {detailLoading && !editForm ? (
              <div className="py-8 text-center text-sm text-gray-400">{t.common.loading}</div>
            ) : editForm && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.crm.name}</label>
                    <input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.crm.nameAr}</label>
                    <input value={editForm.name_ar ?? ''} onChange={(e) => setEditForm({ ...editForm, name_ar: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.crm.email}</label>
                    <input value={editForm.email ?? ''} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.crm.phone}</label>
                    <input value={editForm.phone ?? ''} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.crm.company}</label>
                    <input value={editForm.company ?? ''} onChange={(e) => setEditForm({ ...editForm, company: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.crm.status}</label>
                    <select value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm">
                      <option value="lead">{t.crm.lead}</option>
                      <option value="active">{t.crm.active}</option>
                      <option value="inactive">{t.crm.inactive}</option>
                      <option value="blocked">{t.crm.blocked}</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.crm.notes}</label>
                    <textarea value={editForm.notes ?? ''} onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })} rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 text-sm" />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <Button variant="danger" onClick={removeCustomer} loading={removing} disabled={saving}>
                    <IconTrash size={16} />
                    {t.common.delete}
                  </Button>
                  <Button onClick={saveCustomer} loading={saving}>
                    {t.common.save}
                  </Button>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">{t.crm.contacts}</p>
                  {detail && detail.contacts.length > 0 ? (
                    <ul className="divide-y divide-gray-100 rounded-lg border border-gray-200 mb-3">
                      {detail.contacts.map((c) => (
                        <li key={c.id} className="flex items-center justify-between px-3 py-2 text-sm">
                          <div>
                            <span className="text-gray-800">{c.name}</span>
                            {c.is_primary && <span className="ms-2 text-xs text-primary-600">({t.crm.primary})</span>}
                            <div className="text-xs text-gray-400">{[c.role, c.phone, c.email].filter(Boolean).join(' · ')}</div>
                          </div>
                          <button onClick={() => removeContact(c.id)} className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-600" aria-label={t.common.delete}>
                            <IconTrash size={14} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-400 mb-3">{t.common.noData}</p>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} placeholder={t.crm.contactName} className="px-3 py-2 rounded-lg border border-gray-300 text-sm" />
                    <input value={contactForm.role} onChange={(e) => setContactForm({ ...contactForm, role: e.target.value })} placeholder={t.crm.contactRole} className="px-3 py-2 rounded-lg border border-gray-300 text-sm" />
                    <input value={contactForm.phone} onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })} placeholder={t.crm.phone} className="px-3 py-2 rounded-lg border border-gray-300 text-sm" />
                    <input value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} placeholder={t.crm.email} className="px-3 py-2 rounded-lg border border-gray-300 text-sm" />
                    <div className="sm:col-span-2">
                      <Button size="sm" onClick={addContact} loading={addingContact}>{t.crm.addContact}</Button>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">{t.crm.activityLog}</p>
                  {detail && detail.activity.length > 0 ? (
                    <ul className="space-y-2 mb-3">
                      {detail.activity.map((a) => (
                        <li key={a.id} className="rounded-lg border border-gray-200 px-3 py-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-primary-600">{a.activity_type}</span>
                            <span className="text-xs text-gray-400">{new Date(a.created_at).toLocaleString()}</span>
                          </div>
                          <p className="text-gray-700 mt-1">{a.description}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-400 mb-3">{t.crm.noActivity}</p>
                  )}
                  <div className="flex gap-2">
                    <input value={noteText} onChange={(e) => setNoteText(e.target.value)} placeholder={t.crm.notePlaceholder} className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm" />
                    <Button size="sm" onClick={addNote} loading={addingNote}>{t.crm.addNote}</Button>
                  </div>
                </div>

                {detail && (detail.invoices.length > 0 || detail.payments.length > 0 || detail.orders.length > 0) && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="rounded-lg border border-gray-200 p-3">
                      <p className="text-xs font-medium text-gray-500 mb-1">{t.crm.invoices}</p>
                      <p className="text-lg font-semibold text-gray-900">{detail.invoices.length}</p>
                    </div>
                    <div className="rounded-lg border border-gray-200 p-3">
                      <p className="text-xs font-medium text-gray-500 mb-1">{t.crm.payments}</p>
                      <p className="text-lg font-semibold text-gray-900">{detail.payments.length}</p>
                    </div>
                    <div className="rounded-lg border border-gray-200 p-3">
                      <p className="text-xs font-medium text-gray-500 mb-1">{t.crm.orders}</p>
                      <p className="text-lg font-semibold text-gray-900">{detail.orders.length}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}