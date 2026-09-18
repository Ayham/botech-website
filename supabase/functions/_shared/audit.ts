import { createClient } from 'npm:@supabase/supabase-js@^2';
import type { AdminIdentity } from './auth.ts';
import type { ConnectionId } from './connections.ts';

interface AuditLogEntry {
  admin_id: string;
  admin_email: string | null;
  action: string;
  target_type: string | null;
  target_id: string | null;
  connection: ConnectionId;
  details: Record<string, unknown>;
  result: 'success' | 'error' | 'denied';
  ip: string | null;
  user_agent: string | null;
}

// The audit_logs.ip column is `inet`. `x-forwarded-for` often contains a list
// ("ip1, ip2") and IPv4:port forms that Postgres rejects. Normalize to a
// single address or NULL so an audit insert can never be silently dropped.
export function sanitizeIp(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const part = raw.split(',')[0].trim();
  if (!part) return null;
  let candidate = part;
  // IPv4 with port: "1.2.3.4:5678"
  if (/^\d{1,3}(\.\d{1,3}){3}:\d+$/.test(part)) candidate = part.slice(0, part.lastIndexOf(':'));
  // Bracketed IPv6 with port: "[::1]:5678"
  else if (/^\[.*\]:\d+$/.test(part)) candidate = part.slice(1, part.lastIndexOf(']:'));
  return candidate || null;
}

export async function writeAuditLog(
  identity: AdminIdentity,
  entry: Omit<AuditLogEntry, 'admin_id' | 'admin_email'>,
  ip?: string | null,
  ua?: string | null,
): Promise<void> {
  try {
    const url = Deno.env.get('SUPABASE_URL');
    const service = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!url || !service) return;
    const client = createClient(url, service, { auth: { autoRefreshToken: false, persistSession: false } });
    await client.from('audit_logs').insert({
      admin_id: identity.id,
      admin_email: identity.email,
      action: entry.action,
      target_type: entry.target_type,
      target_id: entry.target_id,
      connection: entry.connection,
      details: entry.details,
      result: entry.result,
      ip: sanitizeIp(ip),
      user_agent: ua ? ua.slice(0, 500) : null,
    });
  } catch {
    // non-fatal
  }
}