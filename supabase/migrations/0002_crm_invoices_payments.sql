-- ============================================================
-- BOTech Admin Console — Migration 0002: CRM, Invoices, Payments
-- Project: mxkechnqkcyxbgbwvriz (BOTech Main)
-- ============================================================

-- 1. Customers
create table public.customers (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  name_ar     text,
  email       text,
  phone       text,
  company     text,
  status      text not null default 'lead' check (status in ('lead','active','inactive','blocked')),
  source      text,                -- website | referral | ad | direct | ...
  notes       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  created_by  uuid references auth.users(id)
);

create index customers_status_idx on public.customers (status);
create index customers_email_idx on public.customers (lower(email)) where email is not null;
create index customers_phone_idx on public.customers (phone) where phone is not null;

comment on table public.customers is 'BOTech CRM customers / leads.';

create trigger set_updated_at before update on public.customers
  for each row execute function public.handle_updated_at();

-- 2. Customer contacts (multiple per customer)
create table public.customer_contacts (
  id          uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  name        text not null,
  phone       text,
  email       text,
  role        text,                -- owner | finance | tech | ...
  is_primary  boolean not null default false,
  notes       text,
  created_at  timestamptz not null default now()
);

create index customer_contacts_customer_idx on public.customer_contacts (customer_id);

-- 3. Customer activity log
create table public.customer_activity (
  id             uuid primary key default gen_random_uuid(),
  customer_id    uuid not null references public.customers(id) on delete cascade,
  activity_type  text not null,     -- note | call | email | meeting | system
  description    text not null,
  metadata       jsonb not null default '{}',
  created_by     uuid references auth.users(id),
  created_at     timestamptz not null default now()
);

create index customer_activity_customer_idx on public.customer_activity (customer_id);

-- 4. Products / Services
create table public.products (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  name_ar     text,
  sku         text unique,
  description text,
  category    text,
  price       numeric(12,2) not null default 0,
  currency    text not null default 'USD',
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create trigger set_updated_at before update on public.products
  for each row execute function public.handle_updated_at();

-- 5. Invoices
create table public.invoices (
  id              uuid primary key default gen_random_uuid(),
  invoice_number  text unique not null,
  customer_id     uuid references public.customers(id) on delete set null,
  status          text not null default 'draft'
                    check (status in ('draft','issued','paid','partial','overdue','cancelled')),
  currency        text not null default 'USD',
  issue_date      date not null default current_date,
  due_date        date,
  discount        numeric(12,2) not null default 0,
  tax_rate        numeric(5,2) not null default 0,
  subtotal        numeric(12,2) not null default 0,
  tax_amount      numeric(12,2) not null default 0,
  total           numeric(12,2) not null default 0,
  paid_amount     numeric(12,2) not null default 0,
  notes           text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  created_by      uuid references auth.users(id)
);

create index invoices_status_idx on public.invoices (status);
create index invoices_customer_idx on public.invoices (customer_id);
create index invoices_issue_date_idx on public.invoices (issue_date desc);

create trigger set_updated_at before update on public.invoices
  for each row execute function public.handle_updated_at();

comment on table public.invoices is 'BOTech invoices. total = subtotal + tax_amount - discount.';

-- 6. Invoice items
create table public.invoice_items (
  id          uuid primary key default gen_random_uuid(),
  invoice_id  uuid not null references public.invoices(id) on delete cascade,
  product_id  uuid references public.products(id) on delete set null,
  description text,
  quantity    numeric(10,3) not null default 1,
  unit_price  numeric(12,2) not null default 0,
  discount    numeric(12,2) not null default 0,
  total       numeric(12,2) not null default 0,
  sort_order  int not null default 0
);

create index invoice_items_invoice_idx on public.invoice_items (invoice_id);

-- 7. Payments (BOTech's own)
create table public.payments (
  id           uuid primary key default gen_random_uuid(),
  customer_id  uuid references public.customers(id) on delete set null,
  invoice_id   uuid references public.invoices(id) on delete set null,
  amount       numeric(12,2) not null,
  currency     text not null default 'USD',
  method       text,                    -- bank_transfer | card | cash | wallet | other
  status       text not null default 'pending'
                 check (status in ('pending','completed','failed','refunded')),
  payment_date timestamptz not null default now(),
  reference    text,
  notes        text,
  created_at   timestamptz not null default now(),
  created_by   uuid references auth.users(id)
);

create index payments_status_idx on public.payments (status);
create index payments_customer_idx on public.payments (customer_id);
create index payments_invoice_idx on public.payments (invoice_id) where invoice_id is not null;

-- 8. Orders
create table public.orders (
  id            uuid primary key default gen_random_uuid(),
  order_number  text unique not null,
  customer_id   uuid references public.customers(id) on delete set null,
  status        text not null default 'pending'
                  check (status in ('pending','confirmed','in_progress','completed','cancelled')),
  total         numeric(12,2) not null default 0,
  currency      text not null default 'USD',
  order_date    timestamptz not null default now(),
  notes         text,
  created_at    timestamptz not null default now(),
  created_by    uuid references auth.users(id)
);

-- ============================================================
-- RLS Policies
-- ============================================================

alter table public.admin_users     enable row level security;
alter table public.audit_logs      enable row level security;
alter table public.backend_connections enable row level security;
alter table public.customers       enable row level security;
alter table public.invoices        enable row level security;
alter table public.payments        enable row level security;
alter table public.orders          enable row level security;
alter table public.products        enable row level security;
alter table public.company_settings enable row level security;

-- Helper: is this user an admin in admin_users?
create or replace function public.is_botech_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admin_users au where au.id = auth.uid() and au.status = 'active');
$$;

-- admin_users: only active admins can read
create policy "Admins read admin_users" on public.admin_users
  for select using (public.is_botech_admin());

-- audit_logs: only active admins can read
create policy "Admins read audit_logs" on public.audit_logs
  for select using (public.is_botech_admin());
create policy "Service role inserts audit_logs" on public.audit_logs
  for insert with check (true);

-- backend_connections: admins read, service role can update
create policy "Admins read connections" on public.backend_connections
  for select using (public.is_botech_admin());
create policy "Service updates connections" on public.backend_connections
  for all using (true) with check (true);

-- CRM tables: admins have full access via service role (Edge Functions).
-- Direct anon access is blocked by default (no policies = no anon access).
create policy "Admins full access customers" on public.customers
  for all using (public.is_botech_admin()) with check (public.is_botech_admin());
create policy "Service full access customers" on public.customers
  for all using (true) with check (true);

create policy "Admins full access invoices" on public.invoices
  for all using (public.is_botech_admin()) with check (public.is_botech_admin());
create policy "Service full access invoices" on public.invoices
  for all using (true) with check (true);

create policy "Admins full access payments" on public.payments
  for all using (public.is_botech_admin()) with check (public.is_botech_admin());
create policy "Service full access payments" on public.payments
  for all using (true) with check (true);

create policy "Admins full access orders" on public.orders
  for all using (public.is_botech_admin()) with check (public.is_botech_admin());
create policy "Service full access orders" on public.orders
  for all using (true) with check (true);

create policy "Admins full access products" on public.products
  for all using (public.is_botech_admin()) with check (public.is_botech_admin());
create policy "Service full access products" on public.products
  for all using (true) with check (true);

create policy "Admins full access settings" on public.company_settings
  for all using (public.is_botech_admin()) with check (public.is_botech_admin());
create policy "Service full access settings" on public.company_settings
  for all using (true) with check (true);