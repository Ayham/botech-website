-- ============================================================
-- Raseed Bridge for BOTech Central Admin Console
-- Project: tebyyidgcsivzslaohxd (Raseed / USSD Dialer)
--
-- This single SECURITY DEFINER function acts as a trusted bridge
-- between the BOTech Edge Functions (which use service_role JWT)
-- and the existing Raseed admin_* RPC functions (which require
-- auth.uid() to be an admin via _require_admin()).
--
-- HOW IT WORKS:
--   1. Edge Function calls botech_admin_bridge(email, action, args)
--      with the Raseed service_role key → auth.role() = 'service_role'
--   2. The bridge validates: auth.role() = 'service_role' (server-only)
--   3. It resolves the acting admin by:
--      a) Looking up profiles.email matching the email
--      b) Verifying that user has admin role via has_role()
--      c) Fallback: system_config key 'botech_admin_bridge' (jsonb map)
--   4. It temporarily sets the JWT GUC to impersonate that admin
--   5. Calls the target admin_* function with proper typed arguments
--   6. The admin_* function's _require_admin() sees the impersonated
--      auth.uid() and proceeds normally.
--
-- SECURITY:
--   - Only callable via service_role (server-side only)
--   - Acting admin MUST exist in Raseed as an admin
--   - All existing _require_admin checks still apply
--   - All existing business logic is reused exactly
--   - Audit trail via admin_actions/audit_logs preserved
--
-- DEPLOYMENT:
--   Run this SQL in the Raseed Supabase SQL Editor.
--   This adds ONE function (no tables, no data changes).
-- ============================================================

create or replace function public.botech_admin_bridge(
  p_acting_email text,
  p_action text,
  p_args jsonb default '{}'
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_admin_id uuid;
  v_result jsonb;
  v_uid uuid;
begin
  -- 1. Only service_role may call (server-side only)
  if auth.role() <> 'service_role' then
    raise exception 'forbidden: botech_admin_bridge requires service_role'
      using errcode = '42501';
  end if;

  -- 2. Resolve acting admin from email + user_roles
  select p.user_id into v_admin_id
  from public.profiles p
  where lower(p.email) = lower(p_acting_email)
    and public.has_role(p.user_id, 'admin'::public.app_role)
  limit 1;

  -- 3. Fallback: explicit mapping in system_config
  if v_admin_id is null then
    select (c.value ->> p_acting_email)::uuid into v_admin_id
    from public.system_config c
    where c.key = 'botech_admin_bridge'
      and c.value ? p_acting_email;

    if v_admin_id is not null and not public.has_role(v_admin_id, 'admin'::public.app_role) then
      v_admin_id := null; -- mapped user is not an admin, reject
    end if;
  end if;

  if v_admin_id is null then
    raise exception 'admin_not_mapped: email % is not a Raseed admin', p_acting_email
      using errcode = '42501';
  end if;

  -- 4. Impersonate: set JWT claims (transaction-local) so auth.uid()/auth.role()
  --    resolve to the acting admin inside the admin_* RPCs. DB role switching is
  --    NOT performed: set_config('role', ...) is forbidden inside SECURITY DEFINER.
  v_uid := v_admin_id;
  perform set_config('request.jwt.claims', json_build_object(
    'sub', v_uid::text,
    'role', 'authenticated',
    'aud', 'authenticated'
  )::text, true);

  -- 5. Allowlist dispatch — each action maps to an existing admin_* RPC
  --    with properly typed arguments extracted from p_args.
  begin
    case p_action

      -- ===== Users =====
      when 'users_list' then
        select public.admin_get_users_admin(
          p_args->>'_search',
          p_args->>'_status',
          coalesce((p_args->>'_page')::int, 1),
          coalesce((p_args->>'_page_size')::int, 20),
          p_args->>'_account_status',
          p_args->>'_role',
          p_args->>'_activation_status'
        ) into v_result;

      when 'user_devices' then
        select public.admin_get_user_devices(
          (p_args->>'_user_id')::uuid
        ) into v_result;

      when 'user_payments' then
        select public.admin_get_user_payments(
          (p_args->>'_user_id')::uuid
        ) into v_result;

      when 'set_role' then
        select public.admin_set_role(
          (p_args->>'_target_user')::uuid,
          (p_args->>'_role')::public.app_role,
          coalesce((p_args->>'_grant')::boolean, true)
        ) into v_result;

      when 'suspend_user' then
        select public.admin_suspend_user(
          (p_args->>'_target_user_id')::uuid,
          coalesce(p_args->>'_status', 'suspended'),
          p_args->>'_reason'
        ) into v_result;

      when 'delete_user' then
        select public.admin_delete_user(
          (p_args->>'_target_user_id')::uuid
        ) into v_result;

      -- ===== Licenses =====
      when 'license_summary' then
        select public.admin_get_license_summary() into v_result;

      when 'licenses_list' then
        select public.admin_get_all_users_license(
          p_args->>'_search',
          p_args->>'_status',
          coalesce((p_args->>'_page')::int, 1),
          coalesce((p_args->>'_page_size')::int, 20)
        ) into v_result;

      when 'set_license' then
        select public.admin_set_license(
          (p_args->>'_target_user_id')::uuid,
          (p_args->>'_license_status')::public.license_status,
          (p_args->>'_license_type')::public.license_type,
          (p_args->>'_expiry_date')::date,
          p_args->>'_notes'
        ) into v_result;

      when 'extend_license' then
        select public.admin_extend_license(
          (p_args->>'_license_id')::uuid,
          (p_args->>'_new_expiry')::date
        ) into v_result;

      when 'transfer_license' then
        select public.admin_transfer_license(
          (p_args->>'_license_id')::uuid,
          p_args->>'_new_device_id',
          p_args->>'_reason'
        ) into v_result;

      -- ===== Activations =====
      when 'activations_list' then
        select public.get_activation_requests(
          p_args->>'_status'
        ) into v_result;

      when 'approve_activation' then
        select public.admin_approve_activation(
          (p_args->>'_request_id')::uuid,
          p_args->>'_license_type',
          (p_args->>'_expiry_date')::date,
          p_args->>'_notes'
        ) into v_result;

      when 'reject_activation' then
        select public.admin_reject_activation(
          (p_args->>'_request_id')::uuid,
          p_args->>'_reason'
        ) into v_result;

      when 'revoke_activation' then
        select public.admin_revoke_activation(
          (p_args->>'_request_id')::uuid,
          p_args->>'_reason'
        ) into v_result;

      -- ===== Devices =====
      when 'block_device' then
        select public.admin_block_device(
          p_args->>'_device_id',
          p_args->>'_reason'
        ) into v_result;

      when 'unblock_device' then
        select public.admin_unblock_device(
          p_args->>'_device_id'
        ) into v_result;

      when 'reset_user_device' then
        select public.admin_reset_user_device(
          (p_args->>'_user_id')::uuid
        ) into v_result;

      -- ===== Payments (Raseed) =====
      when 'add_payment' then
        select public.admin_add_payment(
          (p_args->>'_user_id')::uuid,
          (p_args->>'_amount')::numeric,
          p_args->>'_currency',
          (p_args->>'_payment_date')::timestamptz,
          p_args->>'_payment_method',
          p_args->>'_payment_for'
        ) into v_result;

      when 'update_payment' then
        select public.admin_update_payment(
          (p_args->>'_payment_id')::uuid,
          (p_args->>'_amount')::numeric,
          p_args->>'_currency',
          (p_args->>'_payment_date')::timestamptz,
          p_args->>'_payment_method',
          p_args->>'_payment_for'
        ) into v_result;

      when 'delete_payment' then
        select public.admin_delete_payment(
          (p_args->>'_payment_id')::uuid
        ) into v_result;

      -- ===== Notifications =====
      when 'notifications_list' then
        select public.admin_get_notifications(
          coalesce((p_args->>'_page')::int, 1),
          coalesce((p_args->>'_page_size')::int, 20),
          p_args->>'_status',
          p_args->>'_type',
          p_args->>'_search'
        ) into v_result;

      -- ===== Distributors =====
      when 'distributors_list' then
        select public.admin_get_distributors(
          p_args->>'_search',
          p_args->>'_status',
          coalesce((p_args->>'_page')::int, 1),
          coalesce((p_args->>'_page_size')::int, 20)
        ) into v_result;

      -- ===== Customers with assignment =====
      when 'customers_assignment' then
        select public.admin_get_customers_with_assignment(
          p_args->>'_search',
          (p_args->>'_assignment_status')::public.distributor_assignment_status,
          (p_args->>'_distributor_id')::uuid,
          coalesce((p_args->>'_page')::int, 1),
          coalesce((p_args->>'_page_size')::int, 20)
        ) into v_result;

      else
        raise exception 'unknown_action: %', p_action
          using errcode = '22023';
    end case;

    -- Reset the JWT claims so they don't leak to sibling statements
    perform set_config('request.jwt.claims', '{}'::text, true);

    return jsonb_build_object('ok', true, 'data', v_result);

  exception when others then
    -- Always reset claims even on error
    perform set_config('request.jwt.claims', '{}'::text, true);
    raise;
  end;
end;
$$;

comment on function public.botech_admin_bridge(text, text, jsonb) is
  'Secure bridge for BOTech Central Admin Console. Calls existing admin_* RPCs '
  'with proper impersonation. Service-role only. Reuses 100% of Raseed admin logic.';