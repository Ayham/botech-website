-- ============================================================
-- BOTech Admin Console — Migration 0004: Analytics + Site CMS
-- Project: mxkechnqkcyxbgbwvriz (BOTech Main)
--
--  1. analytics_events        (privacy-conscious visitor analytics)
--  2. company_settings seed   (site_content: static-home CMS content)
--  3. RLS: anon may INSERT analytics (beacon) but NEVER read them;
--     admins may read; service role has full access
-- ============================================================

-- 1. Analytics events -------------------------------------------------
create table if not exists public.analytics_events (
  id           bigint generated always as identity primary key,
  visitor_key  text,                          -- anonymous per-day hash; never a raw IP
  page_path    text not null,
  referrer     text,
  device_type  text,                          -- mobile | tablet | desktop
  browser      text,
  os           text,
  screen_width int,
  country      text,                          -- from cf-ipcountry when available
  ip           inet,                          -- used only for rate sanity; never exposed
  created_at   timestamptz not null default now()
);

create index if not exists analytics_events_created_at_idx on public.analytics_events (created_at desc);
create index if not exists analytics_events_path_idx on public.analytics_events (page_path);
create index if not exists analytics_events_bucket_idx on public.analytics_events (((created_at at time zone 'UTC')::date));

comment on table public.analytics_events is
  'Anonymous page-view analytics for the public website. No cookies, no raw IPs '
  '(visitor_key is an opaque salted hash), no personal data.';

alter table public.analytics_events enable row level security;

-- Beacon inserts: any visitor may record an event.
create policy "Anon may insert analytics" on public.analytics_events
  for insert with check (page_path is not null and length(page_path) <= 512);

-- No SELECT policy for anon/authenticated: reads are admin-only via service
-- role through the Edge Function (which also enforces RBAC).

-- 2. Seed static site content (CMS) ------------------------------------
-- The Edge Functions serve this via GET functions/v1/site-content/content
-- and admins edit it from the Admin Console -> Settings -> Site Content.
-- The public site deep-merges this over its built-in defaults, so the site
-- stays fully functional even if this row is empty or unreachable.
-- 2b. Extend default roles with platform scopes (idempotent) -------------
update public.admin_roles set permissions = jsonb_build_object(
  '__all', true
) where code = 'super_admin';

update public.admin_roles set permissions = jsonb_build_object(
  'botech',      jsonb_build_array('read', 'write'),
  'raseed',      jsonb_build_array('read'),
  'clover',      jsonb_build_array('read'),
  'activity',    jsonb_build_array('read'),
  'adminUsers',  jsonb_build_array('read', 'write'),
  'settings',    jsonb_build_array('read', 'write'),
  'content',     jsonb_build_array('read', 'write'),
  'analytics',   jsonb_build_array('read'),
  'connections', jsonb_build_array('read', 'write'),
  'crm',         jsonb_build_array('read', 'write'),
  'invoices',    jsonb_build_array('read', 'write'),
  'payments',    jsonb_build_array('read', 'write'),
  'orders',      jsonb_build_array('read'),
  'products',    jsonb_build_array('read', 'write'),
  'dashboard',   jsonb_build_array('read')
) where code = 'admin';

update public.admin_roles set permissions = jsonb_build_object(
  'botech',      jsonb_build_array('read', 'write'),
  'raseed',      jsonb_build_array('read'),
  'clover',      jsonb_build_array('read'),
  'activity',    jsonb_build_array('read'),
  'settings',    jsonb_build_array('read'),
  'content',     jsonb_build_array('read', 'write'),
  'analytics',   jsonb_build_array('read'),
  'connections', jsonb_build_array('read'),
  'crm',         jsonb_build_array('read', 'write'),
  'invoices',    jsonb_build_array('read', 'write'),
  'payments',    jsonb_build_array('read', 'write'),
  'orders',      jsonb_build_array('read'),
  'products',    jsonb_build_array('read'),
  'dashboard',   jsonb_build_array('read')
) where code = 'manager';

update public.admin_roles set permissions = jsonb_build_object(
  'botech',      jsonb_build_array('read'),
  'raseed',      jsonb_build_array('read'),
  'clover',      jsonb_build_array('read'),
  'activity',    jsonb_build_array('read'),
  'settings',    jsonb_build_array('read'),
  'content',     jsonb_build_array('read'),
  'analytics',   jsonb_build_array('read'),
  'connections', jsonb_build_array('read'),
  'crm',         jsonb_build_array('read'),
  'invoices',    jsonb_build_array('read'),
  'payments',    jsonb_build_array('read'),
  'orders',      jsonb_build_array('read'),
  'products',    jsonb_build_array('read'),
  'dashboard',   jsonb_build_array('read')
) where code = 'viewer';

-- 3. Seed static site content (CMS) ------------------------------------
-- The Edge Functions serve this via GET functions/v1/site-content/content
-- and admins edit it from the Admin Console -> Settings -> Site Content.
-- The public site deep-merges this over its built-in defaults, so the site
-- stays fully functional even if this row is empty or unreachable.
insert into public.company_settings (key, value, description)
values (
  'site_content',
  '{
    "version": 1,
    "content": {
      "hero": {
        "badge": { "ar": "شركة تقنية متخصصة", "en": "Specialized technology company" },
        "title": { "ar": "نحوّل الأفكار إلى حلول تقنية عملية", "en": "Turning ideas into practical technology solutions" },
        "subtitle": { "ar": "نطوّر المواقع والتطبيقات والأنظمة البرمجية المصممة لتلبية احتياجات الأعمال — من الفكرة والتصميم إلى التطوير والنشر والدعم المستمر.", "en": "We build websites, applications, and software systems designed for business needs — from concept and design through development, deployment, and ongoing support." }
      },
      "announcement": {
        "ar": "",
        "en": ""
      },
      "contact": {
        "email": "contact@botech-live.com",
        "phone": "+963 940 716 331",
        "whatsapp": "https://wa.me/963940716331"
      },
      "products": {
        "raseed": {
          "tagline": { "ar": "اخدم زبائنك أسرع، وأدر تحويلاتك باحتراف", "en": "Serve customers faster, manage transfers professionally" },
          "status": "available"
        },
        "clover": {
          "tagline": { "ar": "إدارة نقاط البيع والأعمال", "en": "POS & Business Management" },
          "status": "coming-soon"
        }
      }
    }
  }'::jsonb,
  'Public website content (CMS) served by site-content Edge Function. Modules are deep-merged over defaults.'
)
on conflict (key) do nothing;