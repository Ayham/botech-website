import { edgeFunctionsBase } from './supabase';

/**
 * Fetches public site content from the site-content Edge Function.
 * This is safe to call from the browser — the endpoint is public
 * and returns only non-sensitive CMS content (no secrets, no PII).
 *
 * Returns null when the backend is unreachable or unconfigured,
 * allowing the frontend to fall back to its built-in defaults.
 */

export interface SiteContentResponse {
  ok: boolean;
  version: number;
  content: Record<string, unknown> | null;
  updatedAt: string | null;
}

let _cache: SiteContentResponse | null = null;
let _fetching: Promise<SiteContentResponse | null> | null = null;

export async function fetchSiteContent(): Promise<SiteContentResponse | null> {
  if (_cache) return _cache;

  // Deduplicate concurrent fetches
  if (_fetching) return _fetching;

  _fetching = (async () => {
    try {
      const url = `${edgeFunctionsBase}/site-content/content`;
      if (!url) return null;
      const res = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        // Short timeout — the public site should never hang on a slow backend
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) return null;
      const body = (await res.json()) as SiteContentResponse;
      if (body?.ok) {
        _cache = body;
        return body;
      }
      return null;
    } catch {
      return null;
    }
  })();

  try {
    return await _fetching;
  } finally {
    _fetching = null;
  }
}

/**
 * CMS-only sections that are not part of the built-in SiteConfig type.
 * The CMS can add whole new top-level keys (hero, announcement, …) which
 * the deep-merge copies over verbatim. Use `as unknown as CMSOverrides`
 * to read them in components when present.
 */
export interface CMSOverrides {
  hero?: {
    badge?: string | { ar: string; en: string };
    title?: string | { ar: string; en: string };
    subtitle?: string | { ar: string; en: string };
  };
  announcement?: string | { ar: string; en: string };
}

/**
 * Deep-merge CMS overrides into the built-in default config.
 * CMS values win when present; defaults fill in everything else.
 * Arrays are NOT merged — CMS array fully replaces the default.
 */
export function deepMergeCMS<T>(defaults: T, cms: Record<string, unknown> | null): T {
  if (!cms || typeof cms !== 'object') return defaults;
  if (!defaults || typeof defaults !== 'object') return defaults;
  if (Array.isArray(defaults)) return defaults; // arrays not merged

  const result = { ...defaults } as Record<string, unknown>;
  for (const [key, val] of Object.entries(cms)) {
    if (val === undefined) continue;
    const existing = result[key];
    if (
      existing !== null &&
      existing !== undefined &&
      typeof existing === 'object' &&
      !Array.isArray(existing) &&
      typeof val === 'object' &&
      val !== null &&
      !Array.isArray(val)
    ) {
      result[key] = deepMergeCMS(existing, val as Record<string, unknown>);
    } else {
      result[key] = val;
    }
  }
  return result as T;
}
