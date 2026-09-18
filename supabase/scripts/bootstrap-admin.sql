-- ============================================================
-- BOTech Admin Console — Bootstrap first Super Admin
-- Run AFTER migration 0001 is applied.
--
-- This script creates a user in Supabase Auth + admin_users +
-- grants super_admin role. Run it ONCE via Supabase SQL Editor.
-- ============================================================

-- STEP 1: Create the auth user (Supabase Auth)
-- Replace 'admin@botech-live.com' and the password as needed.
-- WARNING: After running, change the password via the Dashboard or API.

-- For local/dev, you can skip this step and create the user via the
-- Supabase Dashboard > Authentication > Users > "Add user" instead.

-- STEP 2: Add to admin_users (use the auth user's id)
-- Replace 'YOUR-AUTH-USER-ID' with the UUID from step 1 / Dashboard.

do $$
declare
  v_auth_id uuid;
  v_role_id uuid;
begin
  -- Get super_admin role id
  select id into v_role_id from public.admin_roles where code = 'super_admin';
  if v_role_id is null then
    raise exception 'super_admin role not found. Run 0001 migration first.';
  end if;

  -- Replace this UUID with the actual auth user id
  v_auth_id := '4e20b94e-1143-45aa-b077-bd70a6971a67'::uuid;

  insert into public.admin_users (id, email, display_name, role_id, status)
  values (v_auth_id, 'ayham.seif@gmail.com', 'Super Admin', v_role_id, 'active')
  on conflict (id) do update set role_id = v_role_id, status = 'active';
end $$;

-- ============================================================
-- Quick verify:
-- select au.*, ar.code, ar.name from admin_users au
--   join admin_roles ar on ar.id = au.role_id;
-- ============================================================