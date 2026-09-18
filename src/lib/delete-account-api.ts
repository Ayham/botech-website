import { edgeFunctionsBase, supabaseConfigured } from './supabase';

export type DeletionErrorCode =
  | 'invalid_input'
  | 'account_not_found'
  | 'rate_limited'
  | 'email_send_failed'
  | 'invalid_code'
  | 'too_many_attempts'
  | 'deletion_not_configured'
  | 'deletion_failed'
  | 'verify_failed'
  | 'not_found'
  | 'method_not_allowed'
  | 'network'
  | 'not_configured';

export interface DeletionApiResult {
  ok: boolean;
  code?: DeletionErrorCode;
  data?: Record<string, unknown>;
}

async function call(action: 'request' | 'confirm', email: string, code?: string): Promise<DeletionApiResult> {
  if (!supabaseConfigured || !edgeFunctionsBase) {
    return { ok: false, code: 'not_configured' };
  }

  try {
    const res = await fetch(`${edgeFunctionsBase}/raseed-deletion`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, email, ...(code !== undefined ? { code } : {}) }),
    });

    const body = (await res.json().catch(() => null)) as {
      ok?: boolean;
      error?: { code?: DeletionErrorCode };
      data?: Record<string, unknown>;
    } | null;

    if (body?.ok) return { ok: true, data: body.data };

    const codeFromServer = body?.error?.code;
    if (codeFromServer) return { ok: false, code: codeFromServer };

    return res.ok ? { ok: true } : { ok: false, code: 'network' };
  } catch {
    return { ok: false, code: 'network' };
  }
}

/** Step 1 — request a deletion verification code for the account email. */
export function requestAccountDeletion(email: string): Promise<DeletionApiResult> {
  return call('request', email);
}

/** Step 2 — confirm the emailed code; only then is the account deleted. */
export function confirmAccountDeletion(email: string, code: string): Promise<DeletionApiResult> {
  return call('confirm', email, code);
}