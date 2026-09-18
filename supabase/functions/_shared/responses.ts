import { corsHeaders } from './cors.ts';

export function ok<T>(data: T, extraHeaders?: Record<string, string>): Response {
  return json({ ok: true, data }, 200, extraHeaders);
}

export function fail(code: string, message: string, status = 400, extraHeaders?: Record<string, string>): Response {
  return json({ ok: false, error: { code, message } }, status, extraHeaders);
}

export function json(body: unknown, status = 200, extraHeaders?: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json', ...(extraHeaders ?? {}) },
  });
}

// Ensures we never leak raw secrets/credentials in error messages.
export function safeMessage(err: unknown): string {
  let raw: string;
  if (err instanceof Error) raw = err.message;
  else if (typeof err === 'object' && err !== null) {
    const o = err as Record<string, unknown>;
    const msg = typeof o.message === 'string' ? o.message : (typeof o.details === 'string' ? o.details : (typeof o.hint === 'string' ? o.hint : typeof o.error === 'string' ? o.error : String(err)));
    raw = msg;
  } else raw = String(err);
  // Strip access-token-looking strings (sbp_, eyJ... JWT, publishable keys, secrets)
  return raw
    .replace(/sbp_[A-Za-z0-9_]{8,}/g, '[redacted]')
    .replace(/eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}/g, '[redacted]')
    .replace(/sb_publishable_[A-Za-z0-9_-]{8,}/g, '[redacted]')
    .replace(/sb_secret_[A-Za-z0-9_-]{8,}/g, '[redacted]')
    .slice(0, 500);
}