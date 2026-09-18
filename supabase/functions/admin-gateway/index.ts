import { handleOptions, buildCorsHeaders } from '../_shared/cors.ts';
import { ok, fail, safeMessage } from '../_shared/responses.ts';
import { verifyAdmin, updateLastLogin, type AdminIdentity } from '../_shared/auth.ts';
import { writeAuditLog } from '../_shared/audit.ts';
import type { ConnectionId } from '../_shared/connections.ts';
import { dispatch } from './handlers.ts';

Deno.serve(async (req: Request): Promise<Response> => {
  const origin = req.headers.get('origin');
  const opts = handleOptions(req);
  if (opts) return opts;
  const headers = buildCorsHeaders(origin);

  if (req.method !== 'POST') return fail('method_not_allowed', 'POST required', 405, headers);

  const identity: AdminIdentity | null = await verifyAdmin(req);
  if (!identity) return fail('unauthorized', 'Not authenticated or not an admin', 401, headers);

  let body: { connection?: string; module?: string; action?: string; params?: Record<string, unknown> };
  try { body = await req.json(); } catch { return fail('invalid_body', 'Request body must be valid JSON', 400, headers); }

  const connection = body.connection as ConnectionId | undefined;
  const mod = body.module as string | undefined;
  const action = body.action as string | undefined;
  const params = body.params ?? {};

  if (!connection || !mod || !action) return fail('missing_params', 'connection, module, action are required', 400, headers);
  if (!['botech', 'raseed', 'clover'].includes(connection)) return fail('invalid_connection', 'connection must be botech | raseed | clover', 400, headers);

  const ip = req.headers.get('x-forwarded-for');
  const ua = req.headers.get('user-agent');

  // Touch last_login on the auth.profile round-trip (cheap, no extra call).
  if (connection === 'botech' && mod === 'auth' && action === 'profile') void updateLastLogin(identity);

  try {
    const result = await dispatch(identity, connection, mod, action, params);
    void writeAuditLog(identity, {
      action: `${mod}.${action}`, target_type: mod, target_id: (params.id as string) ?? null,
      connection, details: { action, paramsKeys: Object.keys(params) }, result: 'success',
    }, ip, ua);
    return ok(result, headers);
  } catch (err) {
    const message = safeMessage(err);
    if (message === 'forbidden') {
      void writeAuditLog(identity, {
        action: `${mod}.${action}`, target_type: mod, target_id: (params.id as string) ?? null,
        connection, details: { action, reason: 'permission_denied' }, result: 'denied',
      }, ip, ua);
      return fail('forbidden', 'Permission denied', 403, headers);
    }
    void writeAuditLog(identity, {
      action: `${mod}.${action}`, target_type: mod, target_id: (params.id as string) ?? null,
      connection, details: { action, error: message }, result: 'error',
    }, ip, ua);
    return fail('handler_error', message, 500, headers);
  }
});