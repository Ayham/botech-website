import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { edgeFunctionsBase } from '@/lib/supabase';

const VISITOR_KEY = 'botech-visitor-key';

function getVisitorKey(): string {
  try {
    const existing = localStorage.getItem(VISITOR_KEY);
    if (existing) return existing;
    const key =
      'v-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
    localStorage.setItem(VISITOR_KEY, key);
    return key;
  } catch {
    return 'v-' + Date.now().toString(36);
  }
}

function detectOs(ua: string): string {
  if (/android/i.test(ua)) return 'Android';
  if (/iphone|ipad|ipod/i.test(ua)) return 'iOS';
  if (/windows/i.test(ua)) return 'Windows';
  if (/mac os x|macintosh/i.test(ua)) return 'macOS';
  if (/linux/i.test(ua)) return 'Linux';
  return 'Other';
}

function detectBrowser(ua: string): string {
  if (/edg\//i.test(ua)) return 'Edge';
  if (/opr\//i.test(ua)) return 'Opera';
  if (/chrome\//i.test(ua)) return 'Chrome';
  if (/firefox\//i.test(ua)) return 'Firefox';
  if (/safari\//i.test(ua)) return 'Safari';
  return 'Other';
}

function detectDevice(ua: string, width: number): string {
  if (/android|iphone/i.test(ua)) return 'mobile';
  if (/ipad|tablet/i.test(ua)) return 'tablet';
  if (width <= 640) return 'mobile';
  if (width <= 1024) return 'tablet';
  return 'desktop';
}

/**
 * Fire-and-forget analytics beacon. Tracks public page views only
 * (skips /admin, /en, and internal router redirects). No PII is sent —
 * the visitor key is a random anonymous identifier scoped to the browser.
 */
export function AnalyticsBeacon() {
  const location = useLocation();
  const sentRef = useRef(false);

  useEffect(() => {
    sentRef.current = false;
  }, [location.pathname]);

  useEffect(() => {
    if (sentRef.current) return;

    // Skip admin/internal routes
    const path = location.pathname;
    if (path === '/en' || path.startsWith('/en/')) return;
    if (path.startsWith('/admin')) return;

    sentRef.current = true;

    if (!edgeFunctionsBase) return;

    const ua = navigator.userAgent;
    const width = window.screen?.width ?? 800;
    const payload = {
      visitor_key: getVisitorKey(),
      path,
      referrer: document.referrer?.slice(0, 1000) || null,
      device_type: detectDevice(ua, width),
      browser: detectBrowser(ua),
      os: detectOs(ua),
      screen_width: width,
      country: null,
    };

    fetch(`${edgeFunctionsBase}/site-content/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      /* best-effort */
    });
  }, [location.pathname]);

  return null;
}