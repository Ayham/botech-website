#!/usr/bin/env node
/**
 * Test harness for supabase/functions/raseed-deletion/index.ts
 *
 * Approach:
 *  1. Bundle the edge function with esbuild (needle: .ts) into a temp ESM file.
 *  2. Load it into Node with a minimal `Deno` shim (env only) so the module
 *     runs without Deno.serve.
 *  3. Stub `fetch` to emulate the Supabase REST/Auth endpoints:
 *       - {raseed}/rest/v1/profiles?*             -> profile lookup
 *       - {raseed}/auth/v1/otp                    -> send OTP
 *       - {raseed}/auth/v1/verify                 -> verify OTP
 *       - {raseed}/rest/v1/rpc/botech_admin_bridge -> deletion
 *       - {botech}/rest/v1/audit_logs?*           -> rate-limit lookups
 *       - {botech}/rest/v1/audit_logs             -> audit writes
 *  4. Assert the response codes for the key scenarios.
 */

import { buildSync } from 'esbuild';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const RASEED = 'https://raseed-mock.supabase.co';
const BOTECH = 'https://botech-mock.supabase.co';

const ENV = {
  RASEED_URL: RASEED,
  RASEED_SERVICE_ROLE_KEY: 'raseed-service-role-mock',
  RASEED_ANON_KEY: 'raseed-anon-mock',
  RASEED_DELETION_ADMIN_EMAIL: 'admin@botech-live.com',
  SUPABASE_URL: BOTECH,
  SUPABASE_SERVICE_ROLE_KEY: 'botech-service-role-mock',
};

// ---- Build the bundled module ----
const outDir = mkdtempSync(join(tmpdir(), 'raseed-deletion-'));
const outFile = join(outDir, 'index.mjs');

buildSync({
  entryPoints: ['supabase/functions/raseed-deletion/index.ts'],
  outfile: outFile,
  bundle: true,
  format: 'esm',
  platform: 'node',
  target: 'node18',
  banner: {
    js: '// bundled for node test harness',
  },
});

// ---- Deno shim (env only) so module init doesn't crash ----
globalThis.Deno = {
  env: {
    get(name) {
      return ENV[name] ?? null;
    },
  },
};

// ---- Stateful mock backend ----
const now = Date.now();

// Profiles known in mock Raseed.
const profiles = [
  { id: 1, user_id: 'user-existing-uid', email: 'existing@example.com' },
];

// OTPs "sent" when /auth/v1/otp is called with this email.
const sentOtps = new Map(); // email -> { token, confirmed, at }

// Fake recent deletion-request audit entries (rate limiting). Indexed by email.
const lastRequestedAt = new Map(); // email -> ISO date string
lastRequestedAt.set('recent@example.com', new Date(now - 5_000).toISOString()); // within 60s window

const auditWrites = [];

function json(res, status) {
  return new Response(JSON.stringify(res), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

// Mock fetch dispatcher (supabase rest/auth)
async function handleUrl(url, init) {
  const requestUrl = new URL(url);
  const method = (init?.method || 'GET').toUpperCase();
  let body = null;
  if (init?.body) body = JSON.parse(init.body);

  // ---- BOTech audit lookups (SELECT) ----
  if (requestUrl.origin === BOTECH && requestUrl.pathname === '/rest/v1/audit_logs' && method === 'GET') {
    const emailParam = requestUrl.searchParams.get('details->>email') || '';
    const email = emailParam.replace(/^eq\./, '');
    const recent = lastRequestedAt.get(email);
    if (recent) {
      return json([{ created_at: recent }], 200);
    }
    return json([], 200);
  }

  // ---- BOTech audit writes (INSERT) ----
  if (requestUrl.origin === BOTECH && requestUrl.pathname === '/rest/v1/audit_logs' && method === 'POST') {
    auditWrites.push({ ...body, ts: new Date().toISOString() });
    return json(body, 201);
  }

  // ---- Raseed profile lookup ----
  if (requestUrl.origin === RASEED && requestUrl.pathname === '/rest/v1/profiles' && method === 'GET') {
    const emailParam = requestUrl.searchParams.get('email') || '';
    const email = decodeURIComponent(emailParam.replace(/^ilike\./, ''));
    const profile = profiles.find((p) => p.email.toLowerCase() === email.toLowerCase());
    return json(profile ? [profile] : [], profile ? 200 : 200);
  }

  // ---- Send OTP ----
  if (requestUrl.origin === RASEED && requestUrl.pathname === '/auth/v1/otp' && method === 'POST') {
    const email = body?.email?.toLowerCase() || '';
    if (email === 'smtp-fail@example.com') {
      return json({ error: 'smtp provider error' }, 422);
    }
    sentOtps.set(email, { token: '123456', confirmed: false, at: now });
    return json({}, 200);
  }

  // ---- Verify OTP ----
  if (requestUrl.origin === RASEED && requestUrl.pathname === '/auth/v1/verify' && method === 'POST') {
    const email = body?.email?.toLowerCase() || '';
    const token = body?.token || '';
    const record = sentOtps.get(email);
    if (record && record.token === token) {
      record.confirmed = true;
      return json({ user: { id: 'user-existing-uid' } }, 200);
    }
    return json({ error: 'invalid_otp', error_description: 'Invalid OTP' }, 400);
  }

  // ---- Admin bridge (deletion) ----
  if (requestUrl.origin === RASEED && requestUrl.pathname === '/rest/v1/rpc/botech_admin_bridge' && method === 'POST') {
    const args = JSON.parse(init?.body || '{}');
    const action = args.p_action;
    if (action === 'delete_user') {
      const target = args.p_args?._target_user_id;
      const idx = profiles.findIndex((p) => p.user_id === target);
      if (idx === -1) {
        return json({ error: 'user not found' }, 404);
      }
      profiles.splice(idx, 1);
      return json({ ok: true }, 200);
    }
    return json({ error: 'unsupported action' }, 400);
  }

  return json({ error: `unhandled endpoint: ${url}` }, 500);
}

const realFetch = globalThis.fetch;
globalThis.fetch = async (url, init) => {
  try {
    return await handleUrl(url, init);
  } catch (err) {
    return json({ error: String(err) }, 500);
  }
};

// ---- Import the bundled edge function ----
const mod = await import(pathToFileURL(outFile).href);
const { handler } = mod;

// ---- Helpers ----
let failures = 0;
let passed = 0;

async function call(actionBody, { origin = 'https://botech-live.com', headers = {} } = {}) {
  const res = await handler(
    new Request('https://functions.local/raseed-deletion', {
      method: 'POST',
      headers: { 'content-type': 'application/json', origin, ...headers, 'x-forwarded-for': '203.0.113.1' },
      body: JSON.stringify(actionBody),
      // dispatcher: handleUrl,
    }),
  );
  let body = null;
  try {
    body = await res.json();
  } catch {
    body = null;
  }
  return { status: res.status, body };
}

function assert(name, cond, extra = '') {
  if (cond) {
    passed++;
    console.log(`  PASS  ${name}`);
  } else {
    failures++;
    console.error(`  FAIL  ${name} ${extra}`);
  }
}

async function resetState() {
  lastRequestedAt.clear();
  sentOtps.clear();
  profiles.length = 0;
  profiles.push(
    { id: 1, user_id: 'user-existing-uid', email: 'existing@example.com' },
    { id: 2, user_id: 'user-recent-uid', email: 'recent@example.com' },
  );
  auditWrites.length = 0;
  lastRequestedAt.set('recent@example.com', new Date(now - 5_000).toISOString());
}

// ---- Scenario 1: profile missing -> account_not_found ----
console.log('\nScenario 1: unknown email');
await resetState();
{
  const r = await call({ action: 'request', email: 'missing@example.com' });
  assert('request missing email -> 404', r.status === 404 && r.body?.error?.code === 'account_not_found', JSON.stringify({ status: r.status, body: r.body }));
  assert('audit written for denied', auditWrites.some((a) => a.action === 'raseed.deletion.requested' && a.result === 'denied'));
}

// ---- Scenario 2: valid request -> OTP sent ----
console.log('\nScenario 2: existing email requests deletion (no recent request)');
await resetState();
{
  const r = await call({ action: 'request', email: 'existing@example.com' });
  assert('request existing email -> 200 ok', r.status === 200 && r.body?.ok === true, JSON.stringify({ status: r.status, body: r.body }));
  assert('request audit success written', auditWrites.some((a) => a.action === 'raseed.deletion.requested' && a.result === 'success'));
}

// ---- Scenario 3: rate limited ----
console.log('\nScenario 3: rate limiting');
await resetState();
{
  const r = await call({ action: 'request', email: 'recent@example.com' });
  assert('request recent email -> 429', r.status === 429 && r.body?.error?.code === 'rate_limited', JSON.stringify({ status: r.status, body: r.body }));
}

// ---- Scenario 4: invalid code ----
console.log('\nScenario 4: confirm with a wrong code');
await resetState();
await call({ action: 'request', email: 'existing@example.com' });
{
  const r = await call({ action: 'confirm', email: 'existing@example.com', code: '999999' });
  assert('confirm wrong code -> 401', r.status === 401 && r.body?.error?.code === 'invalid_code', JSON.stringify({ status: r.status, body: r.body }));
  assert('confirm-denied audit written', auditWrites.some((a) => a.action === 'raseed.deletion.confirmed' && a.result === 'denied'));
}

// ---- Scenario 5: valid confirm -> deletes ----
console.log('\nScenario 5: confirm with the sent code');
await resetState();
await call({ action: 'request', email: 'existing@example.com' });
{
  const r = await call({ action: 'confirm', email: 'existing@example.com', code: '123456' });
  assert('confirm valid -> 200 deleted', r.status === 200 && r.body?.data?.deleted === true, JSON.stringify({ status: r.status, body: r.body }));
  assert('confirm success audit written', auditWrites.some((a) => a.action === 'raseed.deletion.confirmed' && a.result === 'success'));
  const remaining = profiles.filter((p) => p.email === 'existing@example.com');
  assert('profile actually deleted', remaining.length === 0);
}

// ---- Scenario 6: invalid input ----
console.log('\nScenario 6: invalid input');
await resetState();
{
  const r = await call({ action: 'request', email: 'not-an-email' });
  assert('request invalid email -> 400', r.status === 400 && r.body?.error?.code === 'invalid_input', JSON.stringify({ status: r.status, body: r.body }));
  const r2 = await call({ action: 'request' });
  assert('request missing email -> 400', r2.status === 400 && r2.body?.error?.code === 'invalid_input');
}

// ---- Scenario 10: SMTP failure -> email_send_failed ----
console.log('\nScenario 10: SMTP send failure');
await resetState();
{
  profiles.push({ id: 3, user_id: 'user-smtp-uid', email: 'smtp-fail@example.com' });
  const r = await call({ action: 'request', email: 'smtp-fail@example.com' });
  assert('request smtp fail -> 502', r.status === 502 && r.body?.error?.code === 'email_send_failed', JSON.stringify({ status: r.status, body: r.body }));
}

// ---- Scenario 11: missing RASEED_DELETION_ADMIN_EMAIL -> deletion_not_configured ----
console.log('\nScenario 11: missing deletion admin email env');
await resetState();
{
  const saved = ENV.RASEED_DELETION_ADMIN_EMAIL;
  delete ENV.RASEED_DELETION_ADMIN_EMAIL;
  await call({ action: 'request', email: 'existing@example.com' });
  const r = await call({ action: 'confirm', email: 'existing@example.com', code: '123456' });
  assert('confirm missing env -> 503', r.status === 503 && r.body?.error?.code === 'deletion_not_configured', JSON.stringify({ status: r.status, body: r.body }));
  ENV.RASEED_DELETION_ADMIN_EMAIL = saved;
}

// ---- Scenario 7: unsupported action ----
console.log('\nScenario 7: unknown action');
await resetState();
{
  const r = await call({ action: 'frobnicate', email: 'existing@example.com' });
  assert('unknown action -> 404', r.status === 404 && r.body?.error?.code === 'not_found');
}

// ---- Scenario 8: GET / preflight handling ----
console.log('\nScenario 8: non-POST method');
await resetState();
{
  const res = await handler(new Request('https://functions.local/raseed-deletion', { method: 'GET' }));
  assert('GET -> 405', res.status === 405);
}

// ---- Scenario 9: CORS header on success ----
console.log('\nScenario 9: CORS headers');
await resetState();
{
  const res = await handler(
    new Request('https://functions.local/raseed-deletion', {
      method: 'OPTIONS',
      headers: { origin: 'https://botech-live.com', 'access-control-request-method': 'POST' },
    }),
  );
  assert('OPTIONS preflight -> allowed', res.status === 200 || res.status === 204);
  const acao = res.headers.get('access-control-allow-origin');
  assert('CORS allows botech-live.com', acao === 'https://botech-live.com', `acao=${acao}`);
}

console.log(`\n${passed} passed, ${failures} failed`);
process.exit(failures === 0 ? 0 : 1);