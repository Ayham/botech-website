// CORS allowlist. Only known frontend origins may call the admin-gateway.
// Server-to-server calls (no Origin header) are always accepted.
// Public read-only endpoints (e.g. site-content) define their own permissive
// CORS; this module is for the authenticated admin API.
//
// Override/append via env ALLOWED_ORIGINS (comma-separated, supplied through
// the Supabase dashboard or `supabase secrets set`).

const DEFAULT_ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:4173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:4173',
  'http://127.0.0.1:3000',
  'https://botech-live.com',
  'https://botechinc.github.io',
];

export function allowedOrigins(): string[] {
  const env = Deno.env.get('ALLOWED_ORIGINS');
  const extra = env ? env.split(',').map((s) => s.trim()).filter(Boolean) : [];
  return [...DEFAULT_ALLOWED_ORIGINS, ...extra];
}

export function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return true; // non-browser / server-to-server
  const o = origin.toLowerCase();
  const exact = allowedOrigins().map((x) => x.toLowerCase());
  if (exact.includes(o)) return true;
  // GitHub Pages deployments end with .github.io over HTTPS.
  if (/^https:\/\/[a-z0-9-]+\.github\.io$/i.test(o)) return true;
  return false;
}

export function buildCorsHeaders(origin: string | null): Record<string, string> {
  const headers: Record<string, string> = {
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Max-Age': '86400',
    'Access-Control-Expose-Headers': 'content-type',
    'Content-Type': 'application/json',
  };
  if (isOriginAllowed(origin)) {
    headers['Access-Control-Allow-Origin'] = origin ?? '*';
  }
  return headers;
}

export function corsResponse(origin: string | null): Response {
  return new Response(null, { status: 204, headers: buildCorsHeaders(origin) });
}

export function handleOptions(req: Request): Response | null {
  if (req.method === 'OPTIONS') return corsResponse(req.headers.get('origin'));
  return null;
}

// Backwards-compatible for callers that only need a static header map.
export const corsHeaders = buildCorsHeaders(DEFAULT_ALLOWED_ORIGINS[0]);