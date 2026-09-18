import { useCallback, useEffect, useRef, useState } from 'react';
import { callAdmin, type AdminCallRequest } from '@/lib/admin-api';

export function useAdminData<D>(request: AdminCallRequest | null) {
  const [data, setData] = useState<D | null>(null);
  const [loading, setLoading] = useState<boolean>(request !== null);
  const [error, setError] = useState<string | null>(null);
  const requestRef = useRef<AdminCallRequest | null>(request);
  requestRef.current = request;

  const requestKey = request ? JSON.stringify(request) : null;

  const refresh = useCallback(async () => {
    const req = requestRef.current;
    if (!req) return;
    setLoading(true);
    setError(null);
    try {
      const result = await callAdmin<D>(req);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'unknown_error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!requestKey) {
      setData(null);
      setLoading(false);
      return;
    }
    let cancelled = false;
    const req = requestRef.current;
    if (!req) return;
    setLoading(true);
    setError(null);
    callAdmin<D>(req)
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'unknown_error');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [requestKey]);

  return { data, loading, error, refresh };
}