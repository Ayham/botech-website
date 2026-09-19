-- ============================================================
-- BOTech Admin Console — Migration 0001: Admin schema
-- Project: mxkechnqkcyxbgbwvriz (BOTech Main)
-- Run in Supabase SQL Editor or via supabase db push.
-- ============================================================

-- 1. Admin roles (RBAC)
create table public.admin_roles (
  id         uuid primary key default gen_random_uuid(),
  code       text unique not null,       -- super_admin | admin | manager | viewer
  name       text not null,
  name_ar    text not null,
  permissions jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table  public.admin_roles is 'BOTech admin console roles with permission sets.';
comment on column public.admin_roles.permissions is 'JSONB permission map. Use {"__all":true} for unrestricted or {"crm":["read","write"],...} per scope.';

-- 2. Admin users (linked to auth.users)
create table public.admin_users (
  id           uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  email        text not null,
  role_id      uuid not null references public.admin_roles(id),
  status       text not null default 'active' check (status in ('active','suspended','disabled')),
  created_at   timestamptz not null default now(),
  last_login_at timestamptz,
  updated_at   timestamptz not null default now()
);

create unique index admin_users_email_idx on public.admin_users (lower(email));

comment on table public.admin_users is 'Users authorized to access the BOTech Central Admin Console.';

-- 3. Audit logs
create table public.audit_logs (
  id          uuid primary key default gen_random_uuid(),
  admin_id    uuid references auth.users(id) on delete set null,
  admin_email text,
  action      text not null,
  target_type text,                   -- customer | invoice | payment | raseed_user | clover_store | system
  target_id   text,
  connection  text not null default 'botech',  -- botech | raseed | clover
  details     jsonb not null default '{}',
  result      text not null default 'success' check (result in ('success','error','denied')),
  ip          inet,
  user_agent  text,
  created_at  timestamptz not null default now()
);

create index audit_logs_admin_id_idx on public.audit_logs (admin_id);
create index audit_logs_connection_idx on public.audit_logs (connection);
create index audit_logs_created_at_idx on public.audit_logs (created_at desc);
create index audit_logs_action_idx on public.audit_logs (action);

comment on table public.audit_logs is 'Administrative audit trail — WHO did WHAT on which connection at WHAT time with WHAT result.';

-- 4. Backend connections (metadata only, NO secrets stored here)
create table public.backend_connections (
  id          text primary key,    -- botech | raseed | clover
  name        text not null,
  name_ar     text not null,
  type        text not null default 'supabase',
  project_url text not null,
  project_ref text,
  environment text not null default 'production',
  description text,
  description_ar text,
  status      text not null default 'unknown' check (status in ('unknown','connected','not_connected','error','unavailable')),
  last_checked_at timestamptz,
  enabled     boolean not null default true,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.backend_connections is 'Metadata for external Supabase projects managed from this console. NEVER store actual service-role keys or access tokens here.';

-- 5. Company settings
create table public.company_settings (
  id         uuid primary key default gen_random_uuid(),
  key        text unique not null,
  value      jsonb,
  description text,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

-- updated_at auto-update trigger (reusable)
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_updated_at before update on public.admin_roles
  for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.admin_users
  for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.backend_connections
  for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.company_settings
  for each row execute function public.handle_updated_at();

-- 6. Seed default roles
insert into public.admin_roles (code, name, name_ar, permissions) values
  ('super_admin', 'Super Admin', 'مدير عام',  '{"__all":true}'),
  ('admin',       'Admin',       'مدير',      '{"botech":["read","write"],"raseed":["read","write"],"clover":["read"],"activity":["read"],"adminUsers":["read"],"settings":["read","write"]}'),
  ('manager',     'Manager',     'مشرف',      '{"botech":["read","write"],"raseed":["read"],"clover":["read"],"activity":["read"]}'),
  ('viewer',      'Viewer',      'مشاهد',     '{"botech":["read"],"raseed":["read"],"clover":["read"],"activity":["read"]}')
on conflict (code) do update set
  name = excluded.name,
  name_ar = excluded.name_ar,
  permissions = excluded.permissions;

-- 7. Seed connection metadata (status updated by Edge Functions at runtime)
insert into public.backend_connections (id, name, name_ar, project_url, project_ref, environment, description, description_ar, status, sort_order)
values
  ('botech',  'BOTech Main',  'BOTech الرئيسية', 'https://mxkechnqkcyxbgbwvriz.supabase.co', 'mxkechnqkcyxbgbwvriz', 'production',
   'Company website, CRM, invoices, payments, admin users, system settings.',
   'موقع الشركة، CRM، الفواتير، المدفوعات، مستخدمو الإدارة، إعدادات النظام.',
   'unknown', 1),
  ('raseed',  'Raseed',       'رصيد',           'https://tebyyidgcsivzslaohxd.supabase.co',  'tebyyidgcsivzslaohxd',  'production',
   'Raseed app: users, devices, licenses, payments, transfers, notifications.',
   'تطبيق رصيد: المستخدمون، الأجهزة، التراخيص، المدفوعات، التحويلات، الإشعارات.',
   'unknown', 2),
  ('clover',  'Clover Flow',  'كلوفر فلو',     'https://ewnvrchcemjpuqrnbcrt.supabase.co', 'ewnvrchcemjpuqrnbcrt', 'production',
   'Clover POS: businesses, stores, products, sales, payments, licenses.',
   'كلوفر: شركات، متاجر، منتجات، مبيعات، مدفوعات، تراخيص.',
   'unknown', 3)
on conflict (id) do update set
  name = excluded.name, name_ar = excluded.name_ar,
  project_url = excluded.project_url, project_ref = excluded.project_ref;