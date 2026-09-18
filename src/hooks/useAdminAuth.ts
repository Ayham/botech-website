import { useCallback, useEffect, useState } from 'react';
import { supabase, supabaseConfigured } from '@/lib/supabase';
import { callAdmin } from '@/lib/admin-api';

export interface AdminUser {
  id: string;
  email: string;
  displayName: string | null;
  roleCode: string;
  roleName?: string;
  permissions: Record<string, unknown>;
  status: string;
}

interface AdminProfileResult {
  user: AdminUser;
}

const CONFIG_ERROR = 'Configuration error: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are required. Check your .env file.';

export function useAdminAuth() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshSession = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (!supabaseConfigured) {
        setError(CONFIG_ERROR);
        setUser(null);
        return;
      }
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        setUser(null);
        return;
      }
      const profile = await callAdmin<AdminProfileResult>({
        connection: 'botech',
        module: 'auth',
        action: 'profile',
      });
      setUser(profile.user);
    } catch (err) {
      setUser(null);
      setError(err instanceof Error ? err.message : 'auth_error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshSession();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void refreshSession();
    });
    return () => subscription.unsubscribe();
  }, [refreshSession]);

  const login = useCallback(async (email: string, password: string) => {
    setError(null);
    if (!supabaseConfigured) {
      setError(CONFIG_ERROR);
      throw new Error(CONFIG_ERROR);
    }
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (signInError) {
      throw signInError;
    }
    await refreshSession();
  }, [refreshSession]);

  const logout = useCallback(async () => {
    if (supabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
  }, []);

  const can = useCallback(
    (scope: string, permission: 'read' | 'write' = 'read'): boolean => {
      if (!user) return false;
      const perms = user.permissions;
      if ((perms as Record<string, unknown>).__all === true) return true;
      const scoped = (perms as Record<string, unknown>)[scope];
      if (scoped === true || scoped === '*') return true;
      if (Array.isArray(scoped)) {
        return scoped.includes('*') || scoped.includes(permission);
      }
      return false;
    },
    [user]
  );

  return { user, loading, error, login, logout, refreshSession, can };
}