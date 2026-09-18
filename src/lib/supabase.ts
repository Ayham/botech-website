import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Public (anon/publishable) credentials for the BOTech site project.
// They are safe to embed: the anon (publishable) key only grants the
// RLS/tenant-scoped access already exposed to the browser.
const DEFAULT_SUPABASE_URL = 'https://mxkechnqkcyxbgbwvriz.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_KFH2p26ZU_ACcRAeGFzL2g_-9Q_Yw0g';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined) || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) || DEFAULT_SUPABASE_ANON_KEY;

// Public (anon/publishable) client — SAFE for the browser.
// No service-role key or any secret ever touches this bundle.
export const supabaseConfigured: boolean = true;

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export const edgeFunctionsBase: string =
  (import.meta.env.VITE_SUPABASE_EDGE_FUNCTIONS_URL as string | undefined) || `${supabaseUrl}/functions/v1`;