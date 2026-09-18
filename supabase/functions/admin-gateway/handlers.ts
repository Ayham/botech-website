import { createClient } from 'npm:@supabase/supabase-js@^2';
import type { AdminIdentity } from '../_shared/auth.ts';
import { can } from '../_shared/auth.ts';
import { getConnection, type ConnectionConfig, getConnections, publicConnectionSummary, getOptionalEnv } from '../_shared/connections.ts';
import { safeMessage } from '../_shared/responses.ts';
import type { ConnectionId } from '../_shared/connections.ts';

type Handler = (identity: AdminIdentity, conn: ConnectionConfig, params: Record<string, unknown>) => Promise<unknown>;

const table: Record<string, Record<string, Record<string, Handler>>> = {};

function route(conn: string, mod: string, action: string, fn: Handler) {
  table[conn] ??= {};
  table[conn][mod] ??= {};
  table[conn][mod][action] = fn;
}

// Scope-guard helper: throws 'forbidden' (mapped to 403 by index.ts)
function requirePerm(identity: AdminIdentity, scope: string, permission: 'read' | 'write') {
  if (!can(identity, scope, permission)) throw new Error('forbidden');
}

// ===== CLIENT FACTORIES (server-side only, NEVER exposed to client) =====

function botechClient() {
  return createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
function raseedClient() {
  return createClient(Deno.env.get('RASEED_URL')!, Deno.env.get('RASEED_SERVICE_ROLE_KEY')!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
function cloverClient() {
  const url = Deno.env.get('CLOVER_URL'), key = Deno.env.get('CLOVER_SERVICE_ROLE_KEY');
  if (!url || !key) return null;
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

function envAlternatively(): { botech: boolean; raseed: boolean; clover: boolean } {
  return {
    botech: Boolean(Deno.env.get('SUPABASE_URL') && Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')),
    raseed: Boolean(Deno.env.get('RASEED_URL') && Deno.env.get('RASEED_SERVICE_ROLE_KEY')),
    clover: Boolean(Deno.env.get('CLOVER_URL') && Deno.env.get('CLOVER_SERVICE_ROLE_KEY')),
  };
}

// ===== AUTH =====

route('botech', 'auth', 'profile', async (identity) => {
  return { user: identity };
});

// ===== CONNECTIONS =====

route('botech', 'connections', 'list', async (identity) => {
  requirePerm(identity, 'connections', 'read');
  const envs = envAlternatively();
  const rows = getConnections().map((c) => publicConnectionSummary(c));
  return { connections: rows, envs };
});

route('botech', 'connections', 'test', async (identity, _conn, params) => {
  requirePerm(identity, 'connections', 'read');
  const connId = (params.connection as string) ?? 'botech';
  const conn = getConnection(connId);
  return testConnection(conn);
});

route('botech', 'connections', 'testAll', async (identity) => {
  requirePerm(identity, 'connections', 'read');
  return { results: await Promise.all(getConnections().map(async (c) => ({ ...publicConnectionSummary(c), test: await testConnection(c) }))) };
});

// Metadata update: names/descriptions/ref only. NEVER secrets.
route('botech', 'connections', 'update', async (identity, _conn, params) => {
  requirePerm(identity, 'connections', 'write');
  const id = (params.connection ?? params.id) as string;
  const conn = getConnection(id);
  const up: Record<string, unknown> = {};
  if (typeof params.name === 'string' && params.name.trim()) up.name = params.name.trim();
  if (typeof params.name_ar === 'string') up.name_ar = params.name_ar;
  if (typeof params.description === 'string') up.description = params.description;
  if (typeof params.description_ar === 'string') up.description_ar = params.description_ar;
  if (typeof params.environment === 'string' && params.environment.trim()) up.environment = params.environment.trim();
  if (typeof params.enabled === 'boolean') up.enabled = params.enabled;
  const { error } = await botechClient().from('backend_connections')
    .update({ ...up, updated_at: new Date().toISOString() }).eq('id', id);
  if (error) throw error;
  return { id, updated: true, conn: publicConnectionSummary(conn) };
});

route('botech', 'connections', 'secretStatus', async (identity) => {
  requirePerm(identity, 'connections', 'read');
  return getConnections().map((c) => ({
    id: c.id,
    secretConfigured: Boolean(c.serviceRoleKeyEnv && getOptionalEnv(c.serviceRoleKeyEnv)),
    mgmtTokenConfigured: Boolean(c.mgmtTokenEnv && getOptionalEnv(c.mgmtTokenEnv)),
  }));
});

// ===== SYSTEM HEALTH =====

route('botech', 'system', 'health', async (identity) => {
  requirePerm(identity, 'dashboard', 'read');
  const envs = envAlternatively();
  const tests = await Promise.all(getConnections().map(async (c) => ({ id: c.id, test: await testConnection(c) })));
  return {
    timestamp: new Date().toISOString(),
    source: 'admin-gateway',
    envs,
    connections: tests,
    db: { botech: 'ok' },
  };
});

// ===== DASHBOARD (BOTech aggregates, server-side reads across projects) =====

route('botech', 'dashboard', 'stats', async (identity) => {
  requirePerm(identity, 'dashboard', 'read');
  const bc = botechClient(), rc = raseedClient();
  const cc = cloverClient();

  const [custRes, invRes, payRes, rUsersRes, rLicRes, rTransRes, clStoreRes, clSalesRes] = await Promise.allSettled([
    bc.from('customers').select('id', { count: 'exact', head: true }),
    bc.from('invoices').select('id, status, total, paid_amount'),
    bc.from('payments').select('id, amount, status'),
    rc.from('profiles').select('id', { count: 'exact', head: true }),
    rc.from('licenses').select('id, status'),
    rc.from('transfers').select('id, amount, status'),
    cc?.from('stores').select('id', { count: 'exact', head: true }),
    cc?.from('sales').select('id, total'),
  ]);

  const customerCount = custRes.status === 'fulfilled' ? (custRes.value.count ?? 0) : null;
  const invoices = invRes.status === 'fulfilled' ? (invRes.value.data ?? []) : [];
  const payments = payRes.status === 'fulfilled' ? (payRes.value.data ?? []) : [];
  const raseedLicenses = rLicRes.status === 'fulfilled' ? (rLicRes.value.data ?? []) : [];
  const completedPayments = payments.filter((p: { status: string }) => p.status === 'completed');

  return {
    botech: {
      customers: customerCount,
      pendingInvoices: invoices.filter((i: { status: string }) => i.status === 'issued' || i.status === 'partial').length,
      totalInvoiceValue: invoices.reduce((s: number, i: { total?: number }) => s + Number(i.total ?? 0), 0),
      revenue: completedPayments.reduce((s: number, p: { amount?: number }) => s + Number(p.amount ?? 0), 0),
      completedPayments: completedPayments.length,
    },
    raseed: {
      users: rUsersRes.status === 'fulfilled' ? (rUsersRes.value.count ?? null) : null,
      activeLicenses: raseedLicenses.filter((l: { status: string }) => l.status === 'active' || l.status === 'permanent').length,
      expiredLicenses: raseedLicenses.filter((l: { status: string }) => l.status === 'expired').length,
      totalTransfers: rTransRes.status === 'fulfilled' ? (rTransRes.value.count ?? null) : null,
    },
    clover: {
      stores: clStoreRes?.status === 'fulfilled' && clStoreRes.value && 'count' in clStoreRes.value ? ((clStoreRes.value as { count: number }).count ?? 0) : null,
      totalSales: clSalesRes?.status === 'fulfilled' ? (clSalesRes.value.data ?? []).length : null,
      revenue: clSalesRes?.status === 'fulfilled' ? ((clSalesRes.value.data ?? []) as { total?: number }[]).reduce((s: number, v) => s + Number(v.total ?? 0), 0) : null,
    },
  };
});

// ===== RASEED (read-only; production data is never modified) =====

route('raseed', 'users', 'list', async (identity, _conn, params) => {
  requirePerm(identity, 'raseed', 'read');
  const client = raseedClient();
  const page = Math.max(1, Number(params.page) || 1);
  const pageSize = Math.min(Math.max(1, Number(params.pageSize) || 20), 100);
  const search = (params.search as string) || null;
  const status = (params.status as string) || null;
  const offset = (page - 1) * pageSize;

  let query = client.from('profiles')
    .select('id, user_id, display_name, email, phone, account_status, license_status, license_type, expiry_date, created_at, current_device, last_login, role, city, shop_name')
    .order('created_at', { ascending: false }).range(offset, offset + pageSize - 1);
  if (search) query = query.or(`display_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`);
  if (status) query = query.eq('account_status', status);
  const { data, error } = await query;
  if (error) throw new Error(`raseed_users_error: ${error.message}`);

  let countQuery = client.from('profiles').select('id', { count: 'exact', head: true });
  if (search) countQuery = countQuery.or(`display_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`);
  if (status) countQuery = countQuery.eq('account_status', status);
  const { count: total } = await countQuery;
  return { data: data ?? [], total: total ?? 0, page, pageSize };
});

route('raseed', 'users', 'detail', async (identity, _conn, params) => {
  requirePerm(identity, 'raseed', 'read');
  const client = raseedClient();
  const { data, error } = await client.from('profiles')
    .select('*').eq('user_id', params.userId as string).limit(1).maybeSingle();
  if (error) throw error;
  return data;
});

route('raseed', 'licenses', 'list', async (identity, _conn, params) => {
  requirePerm(identity, 'raseed', 'read');
  const client = raseedClient();
  const page = Math.max(1, Number(params.page) || 1);
  const pageSize = Math.min(Math.max(1, Number(params.pageSize) || 20), 100);
  const status = (params.status as string) || null;
  const offset = (page - 1) * pageSize;

  let query = client.from('licenses')
    .select('id, device_id, user_id, license_key, status, level, plan, expires_at, created_at, is_permanent, notes')
    .order('created_at', { ascending: false }).range(offset, offset + pageSize - 1);
  if (status) query = query.eq('status', status);
  const { data, error } = await query;
  if (error) throw error;

  const licenses = data ?? [];
  return { data: licenses, total: licenses.length, page, pageSize };
});

route('raseed', 'licenses', 'summary', async (identity) => {
  requirePerm(identity, 'raseed', 'read');
  const client = raseedClient();
  const { data, error } = await client.from('licenses').select('id, status');
  if (error) throw error;
  const licenses = data ?? [];
  return {
    total: licenses.length,
    active: licenses.filter((l) => l.status === 'active').length,
    expired: licenses.filter((l) => l.status === 'expired').length,
    trial: licenses.filter((l) => l.status === 'trial').length,
    revoked: licenses.filter((l) => l.status === 'revoked').length,
    pending: licenses.filter((l) => l.status === 'pending').length,
  };
});

route('raseed', 'activations', 'list', async (identity, _conn, params) => {
  requirePerm(identity, 'raseed', 'read');
  const client = raseedClient();
  let query = client.from('activations')
    .select('id, device_id, user_id, status, created_at, contact_name, contact_phone, license_id, request_type, payment_status')
    .order('created_at', { ascending: false }).limit(100);
  const status = (params.status as string) || null;
  if (status) query = query.eq('status', status);
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
});

route('raseed', 'payments', 'list', async (identity, _conn, params) => {
  requirePerm(identity, 'raseed', 'read');
  const client = raseedClient();
  const page = Math.max(1, Number(params.page) || 1);
  const pageSize = Math.min(Math.max(1, Number(params.pageSize) || 20), 100);
  const offset = (page - 1) * pageSize;

  const { data, error } = await client.from('payments')
    .select('id, user_id, amount, currency, method, status, created_at, notes, payment_for, customer_id')
    .order('created_at', { ascending: false }).range(offset, offset + pageSize - 1);
  if (error) throw error;
  return data ?? [];
});

route('raseed', 'notifications', 'list', async (identity, _conn, params) => {
  requirePerm(identity, 'raseed', 'read');
  const client = raseedClient();
  const page = Math.max(1, Number(params.page) || 1);
  const pageSize = Math.min(Math.max(1, Number(params.pageSize) || 20), 100);
  const offset = (page - 1) * pageSize;
  const status = (params.status as string) || null;
  let query = client.from('notifications')
    .select('id, title_ar, title_en, body_ar, body_en, notification_type, priority, status, is_pinned, is_announcement, created_at, sent_at, expires_at')
    .order('created_at', { ascending: false }).range(offset, offset + pageSize - 1);
  if (status) query = query.eq('status', status);
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
});

route('raseed', 'transfers', 'list', async (identity, _conn, params) => {
  requirePerm(identity, 'raseed', 'read');
  const client = raseedClient();
  const page = Math.max(1, Number(params.page) || 1);
  const pageSize = Math.min(Math.max(1, Number(params.pageSize) || 20), 100);
  const offset = (page - 1) * pageSize;
  const { data, error } = await client.from('transfers')
    .select('id, device_id, user_id, phone, amount, operator, status, created_at, reference_number, package_price')
    .order('created_at', { ascending: false }).range(offset, offset + pageSize - 1);
  if (error) throw error;
  return data ?? [];
});

// ===== CLOVER (read-only; production data is never modified) =====

route('clover', 'dashboard', 'stats', async (identity) => {
  requirePerm(identity, 'clover', 'read');
  const client = cloverClient();
  if (!client) return { connected: false, stores: null, customers: null, products: null, sales: null, licenses: null };

  const [stores, customers, products, sales, licenses] = await Promise.allSettled([
    client.from('stores').select('id', { count: 'exact', head: true }),
    client.from('customers').select('id', { count: 'exact', head: true }),
    client.from('products').select('id', { count: 'exact', head: true }),
    client.from('sales').select('id, total, status, created_at'),
    client.from('licenses').select('id, status'),
  ]);

  return {
    connected: true,
    stores: stores.status === 'fulfilled' && stores.value && 'count' in stores.value ? (stores.value.count ?? 0) : null,
    customers: customers.status === 'fulfilled' && customers.value && 'count' in customers.value ? (customers.value.count ?? 0) : null,
    products: products.status === 'fulfilled' && products.value && 'count' in products.value ? (products.value.count ?? 0) : null,
    totalSales: sales.status === 'fulfilled' ? (sales.value.data ?? []).length : null,
    revenue: sales.status === 'fulfilled' ? (sales.value.data ?? []).reduce((s: number, v: { total?: number }) => s + Number(v.total ?? 0), 0) : null,
    licenses: licenses.status === 'fulfilled' && licenses.value.data ? {
      total: licenses.value.data.length,
      active: licenses.value.data.filter((l: { status: string }) => l.status === 'active').length,
      expired: licenses.value.data.filter((l: { status: string }) => l.status === 'expired').length,
    } : null,
  };
});

const cloverList = (tableName: string, columns: string) => async (identity: AdminIdentity, _conn: ConnectionConfig, params: Record<string, unknown>) => {
  requirePerm(identity, 'clover', 'read');
  const client = cloverClient();
  if (!client) return { data: [], total: 0, readOnly: true };
  const page = Math.max(1, Number(params.page) || 1);
  const pageSize = Math.min(Math.max(1, Number(params.pageSize) || 20), 100);
  const offset = (page - 1) * pageSize;
  const order = (params.order as string) || 'created_at';
  let query = client.from(tableName as never).select(columns).order(order as never, { ascending: false }).range(offset, offset + pageSize - 1);
  const status = (params.status as string) || null;
  if (status) query = query.eq('status', status);
  const { data, error } = await query;
  if (error) throw error;
  return { data: data ?? [], total: (data ?? []).length, page, pageSize, readOnly: true };
};

route('clover', 'businesses', 'list', cloverList('businesses', 'id, name, commercial_register, phone, address, status, created_at'));
route('clover', 'stores', 'list', cloverList('stores', 'id, business_id, name, address, phone, is_main, created_at'));
route('clover', 'customers', 'list', cloverList('customers', 'id, business_id, name, phone, address, credit_limit, currency, created_at'));
route('clover', 'products', 'list', cloverList('products', 'id, business_id, name, sku, category_id, cost_price, selling_price, is_active, created_at'));
route('clover', 'sales', 'list', cloverList('sales', 'id, business_id, store_id, customer_id, sale_number, status, total, currency, created_at'));
route('clover', 'licenses', 'list', cloverList('licenses', 'id, business_id, plan_id, license_key, status, activated_at, expires_at, created_at'));

// ===== BOTech CRM =====

route('botech', 'customers', 'list', async (identity, _conn, params) => {
  requirePerm(identity, 'crm', 'read');
  const client = botechClient();
  const page = Math.max(1, Number(params.page) || 1);
  const pageSize = Math.min(Math.max(1, Number(params.pageSize) || 20), 100);
  const search = (params.search as string) || null;
  const status = (params.status as string) || null;
  const offset = (page - 1) * pageSize;

  let query = client.from('customers')
    .select('id, name, name_ar, email, phone, company, status, source, created_at')
    .order('created_at', { ascending: false }).range(offset, offset + pageSize - 1);
  if (search) query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`);
  if (status) query = query.eq('status', status);
  const { data, error } = await query;
  if (error) throw error;

  let countQ = client.from('customers').select('id', { count: 'exact', head: true });
  if (search) countQ = countQ.or(`name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`);
  if (status) countQ = countQ.eq('status', status);
  const { count: total } = await countQ;
  return { data: data ?? [], total: total ?? 0, page, pageSize };
});

route('botech', 'customers', 'create', async (identity, _conn, params) => {
  requirePerm(identity, 'crm', 'write');
  const client = botechClient();
  const { data, error } = await client.from('customers').insert({
    name: params.name, name_ar: params.name_ar ?? null, email: params.email ?? null,
    phone: params.phone ?? null, company: params.company ?? null,
    status: params.status ?? 'lead', source: params.source ?? null,
    notes: params.notes ?? null, created_by: identity.id,
  }).select('id, name, email, phone, status').single();
  if (error) throw error;
  return data;
});

route('botech', 'customers', 'update', async (identity, _conn, params) => {
  requirePerm(identity, 'crm', 'write');
  const client = botechClient();
  const patch: Record<string, unknown> = {};
  for (const k of ['name', 'name_ar', 'email', 'phone', 'company', 'status', 'source', 'notes'] as const) {
    if (params[k] !== undefined) patch[k] = params[k];
  }
  patch.updated_at = new Date().toISOString();
  const { data, error } = await client.from('customers').update(patch).eq('id', params.id as string).select('id, name, email, phone, status').single();
  if (error) throw error;
  return data;
});

route('botech', 'customers', 'remove', async (identity, _conn, params) => {
  requirePerm(identity, 'crm', 'write');
  const client = botechClient();
  const { error } = await client.from('customers').delete().eq('id', params.id as string);
  if (error) throw error;
  return { id: params.id, deleted: true };
});

route('botech', 'customers', 'detail', async (identity, _conn, params) => {
  requirePerm(identity, 'crm', 'read');
  const client = botechClient();
  const id = params.id as string;
  const [cust, contacts, activity, invoices, payments, orders] = await Promise.all([
    client.from('customers').select('id, name, name_ar, email, phone, company, status, source, notes, created_at, created_by').eq('id', id).maybeSingle(),
    client.from('customer_contacts').select('*').eq('customer_id', id).order('is_primary', { ascending: false }),
    client.from('customer_activity').select('*').eq('customer_id', id).order('created_at', { ascending: false }).limit(50),
    client.from('invoices').select('id, invoice_number, status, total, paid_amount, issue_date, due_date').eq('customer_id', id).order('created_at', { ascending: false }),
    client.from('payments').select('id, amount, currency, method, status, payment_date, reference').eq('customer_id', id).order('created_at', { ascending: false }),
    client.from('orders').select('id, order_number, status, total, currency, order_date').eq('customer_id', id).order('created_at', { ascending: false }),
  ]);
  if (cust.error) throw cust.error;
  return {
    customer: cust.data,
    contacts: contacts.data ?? [],
    activity: activity.data ?? [],
    invoices: invoices.data ?? [],
    payments: payments.data ?? [],
    orders: orders.data ?? [],
  };
});

route('botech', 'contacts', 'create', async (identity, _conn, params) => {
  requirePerm(identity, 'crm', 'write');
  const { data, error } = await botechClient().from('customer_contacts').insert({
    customer_id: params.customer_id, name: params.name, phone: params.phone ?? null,
    email: params.email ?? null, role: params.role ?? null,
    is_primary: Boolean(params.is_primary), notes: params.notes ?? null,
  }).select('*').single();
  if (error) throw error;
  return data;
});

route('botech', 'contacts', 'update', async (identity, _conn, params) => {
  requirePerm(identity, 'crm', 'write');
  const patch: Record<string, unknown> = {};
  for (const k of ['name', 'phone', 'email', 'role', 'is_primary', 'notes'] as const) {
    if (params[k] !== undefined) patch[k] = params[k];
  }
  const { data, error } = await botechClient().from('customer_contacts').update(patch).eq('id', params.id as string).select('*').single();
  if (error) throw error;
  return data;
});

route('botech', 'contacts', 'remove', async (identity, _conn, params) => {
  requirePerm(identity, 'crm', 'write');
  const { error } = await botechClient().from('customer_contacts').delete().eq('id', params.id as string);
  if (error) throw error;
  return { id: params.id, deleted: true };
});

route('botech', 'activityLog', 'add', async (identity, _conn, params) => {
  requirePerm(identity, 'crm', 'write');
  const { data, error } = await botechClient().from('customer_activity').insert({
    customer_id: params.customer_id, activity_type: params.activity_type ?? 'note',
    description: params.description, metadata: params.metadata ?? {}, created_by: identity.id,
  }).select('*').single();
  if (error) throw error;
  return data;
});

// ===== BOTech Invoices =====

route('botech', 'invoices', 'list', async (identity, _conn, params) => {
  requirePerm(identity, 'invoices', 'read');
  const client = botechClient();
  const page = Math.max(1, Number(params.page) || 1);
  const pageSize = Math.min(Math.max(1, Number(params.pageSize) || 20), 100);
  const status = (params.status as string) || null;
  const offset = (page - 1) * pageSize;
  let query = client.from('invoices')
    .select('id, invoice_number, customer_id, status, currency, issue_date, due_date, subtotal, total, paid_amount, created_at')
    .order('created_at', { ascending: false }).range(offset, offset + pageSize - 1);
  if (status) query = query.eq('status', status);
  const { data, error } = await query;
  if (error) throw error;
  let countQ = client.from('invoices').select('id', { count: 'exact', head: true });
  if (status) countQ = countQ.eq('status', status);
  const { count: total } = await countQ;
  return { data: data ?? [], total: total ?? 0, page, pageSize };
});

route('botech', 'invoices', 'create', async (identity, _conn, params) => {
  requirePerm(identity, 'invoices', 'write');
  const client = botechClient();
  const { data, error } = await client.from('invoices').insert({
    invoice_number: params.invoice_number ?? `INV-${Date.now().toString(36).toUpperCase()}`,
    customer_id: params.customer_id, status: params.status ?? 'draft',
    currency: params.currency ?? 'USD', issue_date: params.issue_date ?? new Date().toISOString().slice(0, 10),
    due_date: params.due_date ?? null, discount: params.discount ?? 0, tax_rate: params.tax_rate ?? 0,
    subtotal: params.subtotal ?? 0, tax_amount: params.tax_amount ?? 0, total: params.total ?? 0,
    notes: params.notes ?? null, created_by: identity.id,
  }).select('id, invoice_number, status, total').single();
  if (error) throw error;
  return data;
});

route('botech', 'invoices', 'update', async (identity, _conn, params) => {
  requirePerm(identity, 'invoices', 'write');
  const patch: Record<string, unknown> = {};
  for (const k of ['invoice_number', 'customer_id', 'status', 'currency', 'issue_date', 'due_date', 'discount', 'tax_rate', 'subtotal', 'tax_amount', 'total', 'paid_amount', 'notes'] as const) {
    if (params[k] !== undefined) patch[k] = params[k];
  }
  patch.updated_at = new Date().toISOString();
  const { data, error } = await botechClient().from('invoices').update(patch).eq('id', params.id as string).select('id, invoice_number, status, total').single();
  if (error) throw error;
  return data;
});

route('botech', 'invoices', 'remove', async (identity, _conn, params) => {
  requirePerm(identity, 'invoices', 'write');
  const { error } = await botechClient().from('invoices').delete().eq('id', params.id as string);
  if (error) throw error;
  return { id: params.id, deleted: true };
});

route('botech', 'invoices', 'view', async (identity, _conn, params) => {
  requirePerm(identity, 'invoices', 'read');
  const client = botechClient();
  const id = params.id as string;
  const [inv, items] = await Promise.all([
    client.from('invoices').select('*').eq('id', id).maybeSingle(),
    client.from('invoice_items').select('*').eq('invoice_id', id).order('sort_order', { ascending: true }),
  ]);
  if (inv.error) throw inv.error;
  return { invoice: inv.data, items: items.data ?? [] };
});

// ===== BOTech Payments =====

route('botech', 'payments', 'list', async (identity, _conn, params) => {
  requirePerm(identity, 'payments', 'read');
  const client = botechClient();
  const page = Math.max(1, Number(params.page) || 1);
  const pageSize = Math.min(Math.max(1, Number(params.pageSize) || 20), 100);
  const status = (params.status as string) || null;
  const offset = (page - 1) * pageSize;
  let query = client.from('payments')
    .select('id, customer_id, invoice_id, amount, currency, method, status, payment_date, reference, notes, created_at')
    .order('created_at', { ascending: false }).range(offset, offset + pageSize - 1);
  if (status) query = query.eq('status', status);
  const { data, error } = await query;
  if (error) throw error;
  let countQ = client.from('payments').select('id', { count: 'exact', head: true });
  if (status) countQ = countQ.eq('status', status);
  const { count: total } = await countQ;
  return { data: data ?? [], total: total ?? 0, page, pageSize };
});

route('botech', 'payments', 'create', async (identity, _conn, params) => {
  requirePerm(identity, 'payments', 'write');
  const client = botechClient();
  const { data, error } = await client.from('payments').insert({
    customer_id: params.customer_id, invoice_id: params.invoice_id ?? null,
    amount: params.amount, currency: params.currency ?? 'USD',
    method: params.method ?? null, status: params.status ?? 'pending',
    payment_date: params.payment_date ?? new Date().toISOString(),
    reference: params.reference ?? null, notes: params.notes ?? null, created_by: identity.id,
  }).select('id, amount, status, payment_date').single();
  if (error) throw error;
  return data;
});

route('botech', 'payments', 'update', async (identity, _conn, params) => {
  requirePerm(identity, 'payments', 'write');
  const patch: Record<string, unknown> = {};
  for (const k of ['customer_id', 'invoice_id', 'amount', 'currency', 'method', 'status', 'payment_date', 'reference', 'notes'] as const) {
    if (params[k] !== undefined) patch[k] = params[k];
  }
  const { data, error } = await botechClient().from('payments').update(patch).eq('id', params.id as string).select('id, amount, status, payment_date').single();
  if (error) throw error;
  return data;
});

route('botech', 'payments', 'remove', async (identity, _conn, params) => {
  requirePerm(identity, 'payments', 'write');
  const { error } = await botechClient().from('payments').delete().eq('id', params.id as string);
  if (error) throw error;
  return { id: params.id, deleted: true };
});

// ===== BOTech Orders =====

route('botech', 'orders', 'list', async (identity, _conn, params) => {
  requirePerm(identity, 'orders', 'read');
  const client = botechClient();
  const page = Math.max(1, Number(params.page) || 1);
  const pageSize = Math.min(Math.max(1, Number(params.pageSize) || 20), 100);
  const status = (params.status as string) || null;
  const offset = (page - 1) * pageSize;
  let query = client.from('orders')
    .select('id, order_number, customer_id, status, total, currency, order_date, notes, created_at')
    .order('created_at', { ascending: false }).range(offset, offset + pageSize - 1);
  if (status) query = query.eq('status', status);
  const { data, error } = await query;
  if (error) throw error;
  let countQ = client.from('orders').select('id', { count: 'exact', head: true });
  if (status) countQ = countQ.eq('status', status);
  const { count: total } = await countQ;
  return { data: data ?? [], total: total ?? 0, page, pageSize };
});

// ===== BOTech Products =====

route('botech', 'products', 'list', async (identity, _conn, params) => {
  requirePerm(identity, 'products', 'read');
  const client = botechClient();
  const page = Math.max(1, Number(params.page) || 1);
  const pageSize = Math.min(Math.max(1, Number(params.pageSize) || 20), 100);
  const offset = (page - 1) * pageSize;
  const { data, error } = await client.from('products')
    .select('id, name, name_ar, sku, category, price, currency, is_active, created_at')
    .order('created_at', { ascending: false }).range(offset, offset + pageSize - 1);
  if (error) throw error;
  const { count: total } = await client.from('products').select('id', { count: 'exact', head: true });
  return { data: data ?? [], total: total ?? 0, page, pageSize };
});

route('botech', 'products', 'create', async (identity, _conn, params) => {
  requirePerm(identity, 'products', 'write');
  const { data, error } = await botechClient().from('products').insert({
    name: params.name, name_ar: params.name_ar ?? null, sku: params.sku ?? null,
    description: params.description ?? null, category: params.category ?? null,
    price: params.price ?? 0, currency: params.currency ?? 'USD',
    is_active: params.is_active ?? true,
  }).select('id, name, price, is_active').single();
  if (error) throw error;
  return data;
});

route('botech', 'products', 'update', async (identity, _conn, params) => {
  requirePerm(identity, 'products', 'write');
  const patch: Record<string, unknown> = {};
  for (const k of ['name', 'name_ar', 'sku', 'description', 'category', 'price', 'currency', 'is_active'] as const) {
    if (params[k] !== undefined) patch[k] = params[k];
  }
  patch.updated_at = new Date().toISOString();
  const { data, error } = await botechClient().from('products').update(patch).eq('id', params.id as string).select('id, name, price, is_active').single();
  if (error) throw error;
  return data;
});

// ===== ACTIVITY (audit log) =====

route('botech', 'activity', 'list', async (identity, _conn, params) => {
  requirePerm(identity, 'activity', 'read');
  const client = botechClient();
  const page = Math.max(1, Number(params.page) || 1);
  const pageSize = Math.min(Math.max(1, Number(params.pageSize) || 50), 100);
  const connection = (params.connection as string) || null;
  const actionFilter = (params.action as string) || null;
  const resultFilter = (params.result as string) || null;
  const offset = (page - 1) * pageSize;
  let query = client.from('audit_logs')
    .select('id, admin_id, admin_email, action, target_type, target_id, connection, details, result, created_at')
    .order('created_at', { ascending: false }).range(offset, offset + pageSize - 1);
  if (connection) query = query.eq('connection', connection);
  if (actionFilter) query = query.ilike('action', `%${actionFilter}%`);
  if (resultFilter) query = query.eq('result', resultFilter);
  const { data, error } = await query;
  if (error) throw error;
  const { count: total } = await client.from('audit_logs').select('id', { count: 'exact', head: true });
  return { data: data ?? [], total: total ?? 0, page, pageSize };
});

// ===== ADMIN USERS =====

route('botech', 'adminUsers', 'list', async (identity) => {
  requirePerm(identity, 'adminUsers', 'read');
  const client = botechClient();
  const { data, error } = await client.from('admin_users')
    .select('id, email, display_name, status, created_at, last_login_at, admin_roles(code, name)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
});

route('botech', 'adminUsers', 'create', async (identity, _conn, params) => {
  requirePerm(identity, 'adminUsers', 'write');
  const email = (params.email as string)?.trim().toLowerCase();
  const password = params.password as string;
  const display_name = (params.display_name as string)?.trim() || null;
  const role_code = (params.role as string) ?? 'viewer';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('invalid_email');
  if (!password || password.length < 8) throw new Error('weak_password');

const client = botechClient();
  const { data: role } = await client.from('admin_roles').select('id, code').eq('code', role_code).maybeSingle();
  if (!role) throw new Error(`unknown_role:${role_code}`);

  let uid: string | undefined;
  // Create the auth user (service-role admin API), confirmed immediately.
  const { data: authUser, error: authErr } = await client.auth.admin.createUser({
    email, password, email_confirm: true,
    user_metadata: { botech_admin: true },
  });
  if (authErr) {
    // Idempotent re-create: if the auth user already exists, reuse it instead of failing.
    const msg = (authErr as { message?: string }).message ?? '';
    const existsLike = /(email|registered|exists|duplicate)/i.test(msg);
    if (!existsLike) throw new Error(`auth_create_failed: ${authErr.message}`);
    const { data: lu, error: luErr } = await client.auth.admin.listUsers();
    if (!luErr) uid = (lu?.users ?? []).find((u) => u.email?.toLowerCase() === email)?.id;
    if (!uid) throw new Error(`auth_create_failed: ${authErr.message}`);
  } else {
    uid = (authUser as { id?: string }).id ?? (authUser as { user?: { id?: string } }).user?.id;
    if (!uid) {
      // supabase-js response shape varies; fall back to a lookup by email.
      const { data: lu, error: luErr } = await client.auth.admin.listUsers();
      if (!luErr) uid = (lu?.users ?? []).find((u) => u.email?.toLowerCase() === email)?.id;
    }
  }
  if (!uid) throw new Error('auth_user_id_missing');

  const { data: adminUser, error } = await client.from('admin_users').upsert({
    id: uid, email, display_name, role_id: role.id, status: 'active',
  }, { onConflict: 'id' }).select('id, email, display_name, status, admin_roles(code, name)').single();
  if (error) throw error;
  return adminUser;
});

route('botech', 'adminUsers', 'update', async (identity, _conn, params) => {
  requirePerm(identity, 'adminUsers', 'write');
  const id = params.id as string;
  const patch: Record<string, unknown> = {};
  if (typeof params.display_name === 'string') patch.display_name = params.display_name;
  if (typeof params.status === 'string') patch.status = params.status;
  if (typeof params.role === 'string') {
    const { data: role } = await botechClient().from('admin_roles').select('id').eq('code', params.role).maybeSingle();
    if (!role) throw new Error(`unknown_role:${params.role}`);
    patch.role_id = role.id;
  }
  patch.updated_at = new Date().toISOString();
  const { data, error } = await botechClient().from('admin_users').update(patch)
    .eq('id', id).select('id, email, display_name, status, admin_roles(code, name)').single();
  if (error) throw error;
  return data;
});

route('botech', 'adminUsers', 'remove', async (identity, _conn, params) => {
  requirePerm(identity, 'adminUsers', 'write');
  const id = params.id as string;
  if (id === identity.id) throw new Error('cannot_remove_self');
  const client = botechClient();

  // Try a full hard delete first (auth user + admin row). If the auth user is
  // referenced by authored records (FK), fall back to disabling the admin so
  // historical ownership stays intact while access is revoked.
  let hardDeleted = false;
  const { error: delErr } = await client.auth.admin.deleteUser(id);
  if (!delErr) hardDeleted = true;
  else {
    const msg = (delErr as { message?: string })?.message ?? '';
    if (!/23503|referenced|foreign/i.test(msg)) hardDeleted = true; // truly gone or unrelated: drop the row
  }
  if (hardDeleted) {
    const { error } = await client.from('admin_users').delete().eq('id', id);
    if (error) throw error;
    return { id, deleted: true };
  }
  const { data, error } = await client.from('admin_users')
    .update({ status: 'disabled', updated_at: new Date().toISOString() })
    .eq('id', id).select('id, email, display_name, status').single();
  if (error) throw error;
  return { id, deleted: false, disabled: true, data };
});

// ===== SETTINGS (raw company_settings) =====

route('botech', 'settings', 'get', async (identity) => {
  requirePerm(identity, 'settings', 'read');
  const { data, error } = await botechClient().from('company_settings').select('*');
  if (error) throw error;
  return data ?? [];
});

route('botech', 'settings', 'update', async (identity, _conn, params) => {
  requirePerm(identity, 'settings', 'write');
  const { error } = await botechClient().from('company_settings')
    .upsert({ key: params.key, value: params.value, updated_at: new Date().toISOString(), updated_by: identity.id }, { onConflict: 'key' });
  if (error) throw error;
  return { key: params.key, updated: true };
});

// ===== SITE CONTENT (CMS) =====

route('botech', 'content', 'get', async (identity) => {
  requirePerm(identity, 'content', 'read');
  const { data, error } = await botechClient().from('company_settings')
    .select('value, updated_at').eq('key', 'site_content').maybeSingle();
  if (error) throw error;
  if (data) {
    const parsed = typeof data.value === 'string' ? JSON.parse(data.value) : data.value;
    return { version: parsed?.version ?? 1, content: parsed?.content ?? null, updatedAt: data.updated_at };
  }
  return { version: 0, content: null, updatedAt: null };
});

route('botech', 'content', 'update', async (identity, _conn, params) => {
  requirePerm(identity, 'content', 'write');
  const section = params.section as string;
  if (!section) throw new Error('invalid_section');
const client = botechClient();
  const { data: existing } = await client.from('company_settings')
    .select('value').eq('key', 'site_content').maybeSingle();
  const raw = existing?.value;
  const parsed = raw ? (typeof raw === 'string' ? JSON.parse(raw) : raw) : undefined;
  const base = parsed && parsed.content ? parsed : undefined;
  const current = base && base.content ? { ...base.content } : {};
  current[section] = params.value;
  const next = {
    version: (base?.version ?? 0) + 1,
    content: current,
  };
  const { error } = await client.from('company_settings')
    .upsert({ key: 'site_content', value: next, updated_at: new Date().toISOString(), updated_by: identity.id }, { onConflict: 'key' });
  if (error) throw error;
  return { section, updated: true, version: next.version };
});

// ===== ANALYTICS =====

async function analyticsSeries(bc: ReturnType<typeof botechClient>, days: number) {
  const since = new Date(Date.now() - days * 86_400_000).toISOString();
  const outcome: Record<string, unknown> = { rangeDays: days, generatedAt: new Date().toISOString() };

const totals = await bc.from('analytics_events').select('id', { count: 'exact', head: true }).gte('created_at', since);
  if (totals.error) throw totals.error;
  const visitors = await bc.from('analytics_events')
    .select('visitor_key, created_at, page_path, referrer, device_type, browser, os, country')
    .gte('created_at', since);
  if (visitors.error) throw visitors.error;

  const daily = new Map<string, { views: number; visitors: Set<string> }>();
  const pages = new Map<string, number>();
  const referrers = new Map<string, number>();
  const devices = new Map<string, number>();
  const browsers = new Map<string, number>();
  const oss = new Map<string, number>();
  const countries = new Map<string, number>();
  const visitorKeys = new Set<string>();

  const all = visitors.data ?? [];
  for (const row of all as { visitor_key: string | null; created_at: string; page_path: string; referrer: string | null; device_type: string | null; browser: string | null; os: string | null; country: string | null }[]) {
    if (row.visitor_key) visitorKeys.add(row.visitor_key);
    const day = (row.created_at ?? '').slice(0, 10);
    if (day) {
      if (!daily.has(day)) daily.set(day, { views: 0, visitors: new Set() });
      const d = daily.get(day)!;
      d.views += 1;
      if (row.visitor_key) d.visitors.add(row.visitor_key);
    }
    if (row.page_path) pages.set(row.page_path, (pages.get(row.page_path) ?? 0) + 1);
    const ref = row.referrer ? (() => { try { return new URL(row.referrer).hostname; } catch { return '(direct)'; } })() : '(direct)';
    referrers.set(ref, (referrers.get(ref) ?? 0) + 1);
    if (row.device_type) devices.set(row.device_type, (devices.get(row.device_type) ?? 0) + 1);
    if (row.browser) browsers.set(row.browser, (browsers.get(row.browser) ?? 0) + 1);
    if (row.os) oss.set(row.os, (oss.get(row.os) ?? 0) + 1);
    if (row.country) countries.set(row.country, (countries.get(row.country) ?? 0) + 1);
  }

  const top = (m: Map<string, number>, n = 10) => [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, n).map(([k, v]) => ({ key: k, count: v }));

  outcome.totals = {
    views: totals.count ?? 0,
    visitors: visitorKeys.size,
  };
  outcome.daily = [...daily.entries()]
    .map(([date, d]) => ({ date, views: d.views, visitors: d.visitors.size }))
    .sort((a, b) => a.date.localeCompare(b.date));
  outcome.pages = top(pages);
  outcome.referrers = top(referrers);
  outcome.devices = top(devices);
  outcome.browsers = top(browsers);
  outcome.oss = top(oss);
  outcome.countries = top(countries);

  return outcome;
}

route('botech', 'analytics', 'overview', async (identity, _conn, params) => {
  requirePerm(identity, 'analytics', 'read');
  const days = Math.min(Math.max(1, Number(params.days) || 30), 365);
  const bc = botechClient();
  const hasTable = await bc.from('analytics_events').select('id', { count: 'exact', head: true }).limit(1);
  if (hasTable.error) throw new Error('analytics_table_unavailable');
  return await analyticsSeries(bc, days);
});

// ===== DISPATCH =====

export async function dispatch(
  identity: AdminIdentity, connection: ConnectionId, mod: string, action: string, params: Record<string, unknown>,
): Promise<unknown> {
  const conn = getConnection(connection);
  const handler = table[connection]?.[mod]?.[action];
  if (!handler) throw new Error(`no_handler: ${connection}/${mod}/${action}`);
  return handler(identity, conn, params);
}

// ===== HELPERS =====

async function testConnection(conn: ConnectionConfig): Promise<{
  status: string; message: string; projectInfo?: { name?: string; region?: string; status?: string }; error?: string;
}> {
  const mgmtToken = conn.mgmtTokenEnv ? getOptionalEnv(conn.mgmtTokenEnv) : null;
  if (mgmtToken) {
    try {
      const r = await fetch(`https://api.supabase.com/v1/projects/${conn.projectRef}`, { headers: { Authorization: `Bearer ${mgmtToken}` } });
      if (r.ok) {
        const p = await r.json();
        return { status: p.status === 'ACTIVE_HEALTHY' ? 'connected' : p.status === 'INACTIVE' ? 'unavailable' : 'error', message: p.status === 'ACTIVE_HEALTHY' ? 'Connected' : `Status: ${p.status}`, projectInfo: { name: p.name, region: p.region, status: p.status } };
      }
    } catch { /* fall through */ }
  }
  const svc = conn.serviceRoleKeyEnv ? getOptionalEnv(conn.serviceRoleKeyEnv) : null;
  if (conn.url && svc) {
    try {
      const r = await fetch(`${conn.url}/rest/v1/?apikey=${svc}`, { headers: { apikey: svc, Authorization: `Bearer ${svc}` } });
      return { status: r.ok ? 'connected' : 'error', message: r.ok ? 'Connected (service role)' : `HTTP ${r.status}` };
    } catch (err) { return { status: 'error', message: 'Connection failed', error: safeMessage(err) }; }
  }
  return { status: 'not_configured', message: 'No credentials configured for this connection' };
}
