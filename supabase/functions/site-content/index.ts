import { createClient } from 'npm:@supabase/supabase-js@^2';
import { sanitizeIp } from '../_shared/audit.ts';

const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
};

function handleOptions(req: Request): Response | null {
  if (req.method === 'OPTIONS') return new Response('ok', { status: 204, headers: corsHeaders });
  return null;
}

function json(body: unknown, status = 200, extra?: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json', ...(extra ?? {}) },
  });
}

function client() {
  return createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

const clamp = (v: unknown, max: number) => (typeof v === 'string' ? v.slice(0, max) : v);

async function getContent(): Promise<Response> {
  const { data, error } = await client()
    .from('company_settings')
    .select('value, updated_at')
    .eq('key', 'site_content')
    .maybeSingle();

  if (error) return json({ ok: false, error: 'db_unavailable' }, 500);

  if (data) {
    const parsed = typeof data.value === 'string' ? JSON.parse(data.value) : data.value;
    const version = parsed?.version ?? 1;
    return json(
      { ok: true, version, content: parsed?.content ?? null, updatedAt: data.updated_at },
      200,
      {
        'Cache-Control': 'public, max-age=300, s-maxage=300',
        'ETag': `"site-${version}"`,
        'X-Content-Type-Options': 'nosniff',
      },
    );
  }
  return json({ ok: true, version: 0, content: null, updatedAt: null }, 200, {
    'Cache-Control': 'public, max-age=60',
  });
}

async function track(req: Request): Promise<Response> {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return json({ ok: false, error: 'invalid_body' }, 400); }

  const path = typeof body.path === 'string' && body.path ? String(body.path).slice(0, 500) : '/';
  const ip = sanitizeIp(req.headers.get('x-forwarded-for'));
  const country = (req.headers.get('cf-ipcountry') || body.country || null) as string | null;

  const n: Record<string, unknown> = {
    visitor_key: clamp(body.visitor_key, 128) ?? null,
    page_path: path,
    referrer: clamp(body.referrer, 1000) ?? null,
    device_type: clamp(body.device_type, 32) ?? null,
    browser: clamp(body.browser, 64) ?? null,
    os: clamp(body.os, 64) ?? null,
    screen_width: typeof body.screen_width === 'number' ? Math.min(Math.max(body.screen_width, 0), 20000) : null,
    country: country ? String(country).slice(0, 8) : null,
  };
  if (ip) n.ip = ip;

  const { error } = await client().from('analytics_events').insert(n);
  if (error) return json({ ok: false, error: error.message }, 500);
  return json({ ok: true }, 200, { 'Cache-Control': 'no-store' });
}

Deno.serve(async (req: Request): Promise<Response> => {
  const opts = handleOptions(req);
  if (opts) return opts;

  const url = new URL(req.url);
  if (url.pathname.endsWith('/content')) return getContent();
  if (url.pathname.endsWith('/track') && req.method === 'POST') return track(req);
  return json({ ok: false, error: 'not_found' }, 404);
});