// ============================================================
// raseed-deletion — Public endpoint powering the Raseed
// "Delete account" web page (Google Play: Delete account URL).
//
// SECURITY MODEL
//   - Nothing is deleted from email alone. The caller must prove
//     ownership of the account email through a Supabase Auth
//     one-time passcode (email OTP) issued by the Raseed project.
//     Only after verifyOtp succeeds is the deletion executed.
//   - The deletion itself is performed by Raseed's existing
//     admin_delete_user RPC through the botech_admin_bridge
//     SECURITY DEFINER function, so the same business logic and
//     data cleanup used by the admin console / in-app flow is
//     reused exactly (no parallel deletion implementation).
//   - Every attempt and result is appended to the BOTech
//     audit_logs table (connection = 'raseed').
//   - No account data is ever returned to the caller.
//
// ENV (on the BOTech Supabase project, all server-side):
//   RASEED_URL                       e.g. https://<ref>.supabase.co
//   RASEED_SERVICE_ROLE_KEY          service role key of Raseed
//   RASEED_ANON_KEY                  publishable key of Raseed (for /auth calls)
//   RASEED_DELETION_ADMIN_EMAIL      a Raseed admin email mapped in
//                                    system_config.botech_admin_bridge
// ============================================================

import { buildCorsHeaders, handleOptions } from '../_shared/cors.ts';
import { safeMessage } from '../_shared/responses.ts';

const OTP_RESEND_COOLDOWN_MS = 60_000;

type ErrorCode =
  | 'invalid_input'
  | 'account_not_found'
  | 'rate_limited'
  | 'email_send_failed'
  | 'invalid_code'
  | 'too_many_attempts'
  | 'deletion_not_configured'
  | 'deletion_failed'
  | 'verify_failed'
  | 'not_found';

interface RequestBody {
  action?: string;
  email?: unknown;
  code?: unknown;
}

function getEnv(name: string): string {
  const v = typeof Deno !== 'undefined' ? Deno.env.get(name) : undefined;
  if (v) return v;
  throw new Error(`missing_env:${name}`);
}

function getOptionalEnv(name: string): string | undefined {
  return typeof Deno !== 'undefined' ? Deno.env.get(name) : undefined;
}

function normalizeEmail(raw: unknown): string {
  return String(raw ?? '').trim().toLowerCase();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function sanitizeIp(raw: string | null): string | null {
  if (!raw) return null;
  const part = raw.split(',')[0].trim();
  if (!part) return null;
  let candidate = part;
  if (/^\d{1,3}(\.\d{1,3}){3}:\d+$/.test(part)) candidate = part.slice(0, part.lastIndexOf(':'));
  else if (/^\[.*\]:\d+$/.test(part)) candidate = part.slice(1, part.lastIndexOf(']:'));
  return candidate || null;
}

interface RestResult {
  status: number;
  data: unknown;
}

async function api(
  baseUrl: string,
  key: string,
  path: string,
  init?: { method?: string; body?: unknown; headers?: Record<string, string> },
): Promise<RestResult> {
  const res = await fetch(`${baseUrl}${path}`, {
    method: init?.method ?? 'GET',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    body: init?.body !== undefined && (init?.method ?? 'GET') !== 'GET' ? JSON.stringify(init.body) : undefined,
  });
  const text = await res.text();
  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }
  return { status: res.status, data };
}

// ---- Audit (BOTech audit_logs, connection 'raseed') ----

async function writeAudit(entry: {
  action: string;
  targetId?: string;
  details?: Record<string, unknown>;
  result: 'success' | 'error' | 'denied';
  ip?: string | null;
  ua?: string | null;
}): Promise<void> {
  try {
    const url = getEnv('SUPABASE_URL');
    const key = getEnv('SUPABASE_SERVICE_ROLE_KEY');
    await api(url, key, '/rest/v1/audit_logs', {
      method: 'POST',
      body: {
        admin_id: null,
        admin_email: null,
        action: entry.action,
        target_type: 'raseed_user',
        target_id: entry.targetId ?? null,
        connection: 'raseed',
        details: entry.details ?? {},
        result: entry.result,
        ip: sanitizeIp(entry.ip ?? null),
        user_agent: entry.ua ? entry.ua.slice(0, 500) : null,
      },
    });
  } catch {
    // audit must never break the flow
  }
}

// ---- Raseed lookups ----

interface RaseedProfile {
  id: string | null;
  user_id: string | null;
  email: string | null;
}

async function findProfileByEmail(raseedUrl: string, serviceKey: string, email: string): Promise<RaseedProfile | null> {
  const { status, data } = await api(
    raseedUrl,
    serviceKey,
    `/rest/v1/profiles?select=id,user_id,email&email=ilike.${encodeURIComponent(email)}&limit=1`,
  );
  if (status !== 200) return null;
  const rows = Array.isArray(data) ? (data as RaseedProfile[]) : [];
  return rows[0] ?? null;
}

// Last deletion-request audit entry for the same email (rate limiting).
async function lastRequestAt(url: string, serviceKey: string, email: string): Promise<string | null> {
  try {
    const { status, data } = await api(
      url,
      serviceKey,
      `/rest/v1/audit_logs?details->>email=eq.${encodeURIComponent(email)}&action=eq.raseed.deletion.requested&order=created_at.desc&select=created_at&limit=1`,
    );
    if (status !== 200 || !Array.isArray(data)) return null;
    const rows = data as Array<{ created_at?: string }>;
    const createdAt = rows[0]?.created_at;
    return typeof createdAt === 'string' ? createdAt : null;
  } catch {
    return null;
  }
}

async function sendEmailOtp(raseedUrl: string, raseedAnonKey: string, email: string): Promise<{ ok: boolean; status: number }> {
  try {
    const res = await api(raseedUrl, raseedAnonKey, '/auth/v1/otp', {
      method: 'POST',
      body: { email, create_user: false },
      headers: { Authorization: `Bearer ${raseedAnonKey}` },
    });
    return { ok: res.status >= 200 && res.status < 300, status: res.status };
  } catch {
    return { ok: false, status: 0 };
  }
}

interface VerifyOtpResult {
  ok: boolean;
  uid?: string;
  errorDescription?: string;
}

async function verifyEmailOtp(raseedUrl: string, raseedAnonKey: string, email: string, code: string): Promise<VerifyOtpResult> {
  try {
    const res = await api(raseedUrl, raseedAnonKey, '/auth/v1/verify', {
      method: 'POST',
      body: { type: 'email', email, token: code },
      headers: { Authorization: `Bearer ${raseedAnonKey}` },
    });
    if (res.status >= 200 && res.status < 300) {
      const data = res.data as { user?: { id?: string } } | null;
      const uid = data?.user?.id;
      return uid ? { ok: true, uid } : { ok: false };
    }
    const err = res.data as { error_description?: string; error?: string } | null;
    return { ok: false, errorDescription: err?.error_description ?? err?.error ?? `http_${res.status}` };
  } catch {
    return { ok: false };
  }
}

/**
 * Executes the deletion reusing Raseed admin_delete_user via the
 * botech_admin_bridge (SECURITY DEFINER). Throws on any failure.
 */
async function executeDeletion(raseedUrl: string, serviceKey: string, uid: string): Promise<unknown> {
  const actingEmail = getEnv('RASEED_DELETION_ADMIN_EMAIL');
  const res = await api(raseedUrl, serviceKey, '/rest/v1/rpc/botech_admin_bridge', {
    method: 'POST',
    body: {
      p_acting_email: actingEmail,
      p_action: 'delete_user',
      p_args: { _target_user_id: uid },
    },
  });
  if (res.status >= 200 && res.status < 300) {
    const data = res.data as { ok?: boolean } | null;
    if (data?.ok !== false) return data;
  }
  throw new Error(safeMessage(res.data));
}

function respond(origin: string | null, body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), { status, headers: buildCorsHeaders(origin) });
}

function fail(origin: string | null, code: ErrorCode, status = 400): Response {
  return respond(origin, { ok: false, error: { code } }, status);
}

function success(origin: string | null, data: Record<string, unknown>): Response {
  return respond(origin, { ok: true, data }, 200);
}

async function handleRequest(body: RequestBody, req: Request, origin: string | null): Promise<Response> {
  const email = normalizeEmail(body.email);
  if (!isValidEmail(email)) return fail(origin, 'invalid_input', 400);

  const raseedUrl = getEnv('RASEED_URL');
  const serviceKey = getEnv('RASEED_SERVICE_ROLE_KEY');
  const raseedAnonKey = getEnv('RASEED_ANON_KEY');

  // 1. Account must exist in Raseed (no deletion for unknown addresses).
  const profile = await findProfileByEmail(raseedUrl, serviceKey, email);
  if (!profile || !profile.user_id) {
    await writeAudit({
      action: 'raseed.deletion.requested',
      targetId: profile?.user_id ?? null,
      details: { email, reason: 'account_not_found' },
      result: 'denied',
      ip: req.headers.get('x-forwarded-for'),
      ua: req.headers.get('user-agent'),
    });
    return fail(origin, 'account_not_found', 404);
  }
  const uid = profile.user_id;

  // 2. Coarse rate limit — one OTP email per address per ~60s.
  const lastAt = await lastRequestAt(getEnv('SUPABASE_URL'), getEnv('SUPABASE_SERVICE_ROLE_KEY'), email);
  if (lastAt) {
    const elapsed = Date.now() - new Date(lastAt).getTime();
    if (!Number.isNaN(elapsed) && elapsed >= 0 && elapsed < OTP_RESEND_COOLDOWN_MS) {
      await writeAudit({
        action: 'raseed.deletion.requested',
        targetId: uid,
        details: { email, reason: 'rate_limited' },
        result: 'denied',
        ip: req.headers.get('x-forwarded-for'),
        ua: req.headers.get('user-agent'),
      });
      return fail(origin, 'rate_limited', 429);
    }
  }

  // 3. Send the verification code to the owner's email (Raseed Auth / SMTP).
  const sent = await sendEmailOtp(raseedUrl, raseedAnonKey, email);
  if (!sent.ok) {
    await writeAudit({
      action: 'raseed.deletion.requested',
      targetId: uid,
      details: { email, reason: 'email_send_failed', status: sent.status },
      result: 'error',
      ip: req.headers.get('x-forwarded-for'),
      ua: req.headers.get('user-agent'),
    });
    return fail(origin, 'email_send_failed', 502);
  }

  await writeAudit({
    action: 'raseed.deletion.requested',
    targetId: uid,
    details: { email },
    result: 'success',
    ip: req.headers.get('x-forwarded-for'),
    ua: req.headers.get('user-agent'),
  });

  return success(origin, { sent: true, email });
}

async function handleConfirm(body: RequestBody, req: Request, origin: string | null): Promise<Response> {
  const email = normalizeEmail(body.email);
  const code = typeof body.code === 'string' ? body.code.trim() : '';
  if (!isValidEmail(email) || code.length < 6 || code.length > 16) return fail(origin, 'invalid_input', 400);

  const raseedUrl = getEnv('RASEED_URL');
  const serviceKey = getEnv('RASEED_SERVICE_ROLE_KEY');
  const raseedAnonKey = getEnv('RASEED_ANON_KEY');

  // Unique constraint on audit: record this attempt's start, verified below.
  // 1. Verify the one-time code (proves email ownership).
  const verified = await verifyEmailOtp(raseedUrl, raseedAnonKey, email, code);
  if (!verified.ok || !verified.uid) {
    await writeAudit({
      action: 'raseed.deletion.confirmed',
      details: { email, reason: 'invalid_code', detail: verified.errorDescription },
      result: 'denied',
      ip: req.headers.get('x-forwarded-for'),
      ua: req.headers.get('user-agent'),
    });
    return fail(origin, 'invalid_code', 401);
  }
  const uid = verified.uid;

  // 2. Defense in depth — the verified auth user must still hold a Raseed profile.
  const profile = await findProfileByEmail(raseedUrl, serviceKey, email);
  if (!profile || profile.user_id !== uid) {
    await writeAudit({
      action: 'raseed.deletion.confirmed',
      targetId: uid,
      details: { email, reason: 'profile_mismatch' },
      result: 'denied',
      ip: req.headers.get('x-forwarded-for'),
      ua: req.headers.get('user-agent'),
    });
    return fail(origin, 'verify_failed', 403);
  }

  // 3. Execute deletion with the existing Raseed admin_delete_user logic.
  try {
    await executeDeletion(raseedUrl, serviceKey, uid);
  } catch (err) {
    const why = safeMessage(err);
    await writeAudit({
      action: 'raseed.deletion.confirmed',
      targetId: uid,
      details: { email, reason: 'deletion_failed', detail: why },
      result: 'error',
      ip: req.headers.get('x-forwarded-for'),
      ua: req.headers.get('user-agent'),
    });
    if (/missing_env:RASEED_DELETION_ADMIN_EMAIL/.test(why)) return fail(origin, 'deletion_not_configured', 503);
    return fail(origin, 'deletion_failed', 502);
  }

  await writeAudit({
    action: 'raseed.deletion.confirmed',
    targetId: uid,
    details: { email, deletedUserId: uid },
    result: 'success',
    ip: req.headers.get('x-forwarded-for'),
    ua: req.headers.get('user-agent'),
  });

  return success(origin, { deleted: true, email });
}

export async function handler(req: Request): Promise<Response> {
  const origin = req.headers.get('origin');
  const preflight = handleOptions(req);
  if (preflight) return preflight;

  if (req.method !== 'POST') {
    return respond(origin, { ok: false, error: { code: 'method_not_allowed' } }, 405);
  }

  let body: RequestBody;
  try {
    body = (await req.json()) as RequestBody;
  } catch {
    return fail(origin, 'invalid_input', 400);
  }

  try {
    switch (body.action) {
      case 'request':
        return await handleRequest(body, req, origin);
      case 'confirm':
        return await handleConfirm(body, req, origin);
      default:
        return fail(origin, 'not_found', 404);
    }
  } catch (err) {
    const why = safeMessage(err);
    try {
      await writeAudit({
        action: 'raseed.deletion.request',
        details: { reason: 'internal_error', detail: why.replace(/sid_[A-Za-z0-9]+/g, '[redacted]') },
        result: 'error',
        ip: req.headers.get('x-forwarded-for'),
        ua: req.headers.get('user-agent'),
      });
    } catch {
      // ignore
    }
    if (/missing_env/.test(why)) return fail(origin, 'deletion_not_configured', 503);
    return fail(origin, 'deletion_failed', 500);
  }
}

// Register with the Deno runtime when running as a Supabase Edge Function.
if (typeof Deno !== 'undefined' && typeof (Deno as { serve?: unknown }).serve === 'function') {
  (Deno as { serve: (fn: (req: Request) => Promise<Response>) => void }).serve(handler);
}

export type { ErrorCode, RequestBody };