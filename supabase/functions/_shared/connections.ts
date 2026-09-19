// Central connection registry.
//
// The FRONTEND only ever sends a connection id ('botech' | 'raseed' | 'clover').
// All actual URLs + credentials live HERE (server-side env secrets), never in
// the browser bundle. No secret is ever returned to the client.

export type ConnectionId = 'botech' | 'raseed' | 'clover';

export interface ConnectionConfig {
  id: ConnectionId;
  name: string;
  nameAr: string;
  url: string;
  projectRef: string;
  environment: string;
  description: string;
  descriptionAr: string;
  sortOrder: number;
  // Env var names (server-side only)
  serviceRoleKeyEnv?: string;
  anonKeyEnv?: string;
  mgmtTokenEnv?: string;
}

export function getEnv(name: string): string {
  const v = Deno.env.get(name);
  if (!v) throw new Error(`missing_env:${name}`);
  return v;
}

export function getOptionalEnv(name: string): string | undefined {
  return Deno.env.get(name) ?? undefined;
}

export function getConnections(): ConnectionConfig[] {
  return [
    {
      id: 'botech',
      name: 'BOTech Main',
      nameAr: 'BOTech الرئيسية',
      url: getOptionalEnv('SUPABASE_URL') ?? '',
      projectRef: 'mxkechnqkcyxbgbwvriz',
      environment: 'production',
      description: 'Company website, CRM, invoices, payments, admin users, system settings.',
      descriptionAr: 'موقع الشركة، CRM، الفواتير، المدفوعات، مستخدمو الإدارة، إعدادات النظام.',
      sortOrder: 1,
      serviceRoleKeyEnv: 'SUPABASE_SERVICE_ROLE_KEY', // auto-provided on Edge Functions
      anonKeyEnv: 'SUPABASE_ANON_KEY',
    },
    {
      id: 'raseed',
      name: 'Raseed',
      nameAr: 'رصيد',
      url: getOptionalEnv('RASEED_URL') ?? '',
      projectRef: 'tebyyidgcsivzslaohxd',
      environment: 'production',
      description: 'Raseed app database: users, devices, licenses, payments, transfers, notifications.',
      descriptionAr: 'قاعدة بيانات تطبيق رصيد: المستخدمون، الأجهزة، التراخيص، المدفوعات، التحويلات، الإشعارات.',
      sortOrder: 2,
      serviceRoleKeyEnv: 'RASEED_SERVICE_ROLE_KEY',
      anonKeyEnv: 'RASEED_ANON_KEY',
      mgmtTokenEnv: 'RASEED_MGMT_TOKEN',
    },
    {
      id: 'clover',
      name: 'Clover Flow',
      nameAr: 'كلوفر فلو',
      url: getOptionalEnv('CLOVER_URL') ?? '',
      projectRef: 'ewnvrchcemjpuqrnbcrt',
      environment: 'production',
      description: 'Clover POS database: businesses, stores, products, sales, payments, licenses.',
      descriptionAr: 'قاعدة بيانات كلوفر: شركات، متاجر، منتجات، مبيعات، مدفوعات، تراخيص.',
      sortOrder: 3,
      serviceRoleKeyEnv: 'CLOVER_SERVICE_ROLE_KEY',
      anonKeyEnv: 'CLOVER_ANON_KEY',
      mgmtTokenEnv: 'CLOVER_MGMT_TOKEN',
    },
  ];
}

export function getConnection(id: string): ConnectionConfig {
  const conn = getConnections().find((c) => c.id === id);
  if (!conn) throw new Error(`unknown_connection:${id}`);
  return conn;
}

export function publicConnectionSummary(conn: ConnectionConfig): {
  id: ConnectionId;
  name: string;
  nameAr: string;
  url: string;
  projectRef: string;
  environment: string;
  description: string;
  descriptionAr: string;
  sortOrder: number;
} {
  // Never include keys/tokens here.
  const { serviceRoleKeyEnv, anonKeyEnv, mgmtTokenEnv, ...pub } = conn;
  return pub;
}