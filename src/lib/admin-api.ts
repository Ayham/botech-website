import { supabase, supabaseConfigured, edgeFunctionsBase } from './supabase';

export type ConnectionId = 'botech' | 'raseed' | 'clover';

export interface AdminCallRequest {
  connection: ConnectionId;
  module: string;
  action: string;
  params?: Record<string, unknown>;
}

export class AdminApiError extends Error {
  code: string;
  status: number;
  constructor(code: string, message: string, status = 400) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

export interface AdminApiResult<D = unknown> {
  ok: boolean;
  data?: D;
  error?: { code: string; message: string };
}

/**
 * Calls a BOTech Admin Edge Function. The caller's Supabase session
 * (JWT for the BOTech project) is attached automatically server-side.
 * NEVER any secret here — only the user's own access token.
 */
export async function callAdmin<D = unknown>(
  request: AdminCallRequest
): Promise<D> {
  if (!supabaseConfigured) {
    throw new AdminApiError(
      'not_configured',
      'Configuration error: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are required. Check your .env file.',
      500
    );
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new AdminApiError('unauthenticated', 'Not authenticated', 401);
  }

  const res = await fetch(`${edgeFunctionsBase}/admin-gateway`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify(request),
  });

  const body = (await res.json().catch(() => null)) as AdminApiResult<D> | null;

  if (!res.ok) {
    const code = body?.error?.code || 'http_error';
    const message = body?.error?.message || `HTTP ${res.status}`;
    throw new AdminApiError(code, message, res.status);
  }

  if (!body?.ok) {
    throw new AdminApiError(
      body?.error?.code || 'unknown_error',
      body?.error?.message || 'Unknown error',
      res.status
    );
  }

  return body.data as D;
}

export interface ConnectionStatus {
  id: ConnectionId;
  name: string;
  status: 'connected' | 'not_connected' | 'error' | 'unavailable' | 'not_configured';
  projectRef: string;
  environment: string;
  lastCheckedAt: string | null;
  errorMessage?: string;
  projectInfo?: {
    name?: string;
    region?: string;
    created_at?: string;
    lastActive?: string;
  };
}