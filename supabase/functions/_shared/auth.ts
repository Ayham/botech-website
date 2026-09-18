import { createClient } from 'npm:@supabase/supabase-js@^2';

export interface AdminIdentity {
  id: string;
  email: string;
  displayName: string | null;
  roleCode: string;
  roleName: string | null;
  permissions: Record<string, unknown>;
  status: string;
}

/**
 * Verifies the caller's JWT against the BOTech project's Auth,
 * then loads the matching admin record + role + permissions from
 * the BOTech database. Returns null when not authorized.
 */
export async function verifyAdmin(req: Request): Promise<AdminIdentity | null> {
  const url = Deno.env.get('SUPABASE_URL');
  const anon = Deno.env.get('SUPABASE_ANON_KEY');
  const service = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !anon || !service) return null;

  const authHeader = req.headers.get('Authorization') ?? '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  if (!token) return null;

  const client = createClient(url, anon, { global: { headers: { Authorization: `Bearer ${token}` } } });
  const { data: userData, error: getUserErr } = await client.auth.getUser(token);
  if (getUserErr || !userData?.user) return null;

  const uid = userData.user.id;

  const adminClient = createClient(url, service, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: admin, error: adminErr } = await adminClient
    .from('admin_users')
    .select('id, display_name, email, status, admin_roles(code, name)')
    .eq('id', uid)
    .limit(1)
    .maybeSingle();

  if (adminErr || !admin) return null;
  if (admin.status !== 'active') return null;

  const role = admin.admin_roles as { code: string; name: string } | null;
  if (!role) return null;

  const { data: roleFull } = await adminClient
    .from('admin_roles')
    .select('permissions')
    .eq('code', role.code)
    .limit(1)
    .maybeSingle();

  const permissions = (roleFull?.permissions as Record<string, unknown>) ?? {};

  return {
    id: uid,
    email: admin.email ?? userData.user.email ?? '',
    displayName: admin.display_name,
    roleCode: role.code,
    roleName: role.name,
    permissions,
    status: admin.status,
  };
}

export function can(identity: AdminIdentity, scope: string, permission: 'read' | 'write'): boolean {
  const perms = identity.permissions;
  if ((perms as Record<string, unknown>).__all === true) return true;
  const scoped = (perms as Record<string, unknown>)[scope];
  if (scoped === true || scoped === '*') return true;
  if (Array.isArray(scoped)) return scoped.includes('*') || scoped.includes(permission);
  return false;
}

export async function updateLastLogin(identity: AdminIdentity): Promise<void> {
  try {
    const url = Deno.env.get('SUPABASE_URL');
    const service = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!url || !service) return;
    const client = createClient(url, service, { auth: { autoRefreshToken: false, persistSession: false } });
    await client.from('admin_users').update({ last_login_at: new Date().toISOString() }).eq('id', identity.id);
  } catch {
    // non-fatal
  }
}