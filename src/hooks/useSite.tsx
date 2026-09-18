import { createContext, useContext, useState, useEffect, useCallback, ReactNode, useMemo } from 'react';
import { siteConfig, type SiteConfig } from '@/config/site';
import { fetchSiteContent, deepMergeCMS } from '@/lib/site-content';

interface SiteContextType {
  site: SiteConfig;
  version: number | null;
  loaded: boolean;
  refresh: () => void;
}

const SiteContext = createContext<SiteContextType>({
  site: siteConfig,
  version: null,
  loaded: false,
  refresh: () => {},
});

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [site, setSite] = useState<SiteConfig>(siteConfig);
  const [version, setVersion] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(async () => {
    const res = await fetchSiteContent();
    if (res?.ok && res.content) {
      setSite(deepMergeCMS(siteConfig, res.content) as SiteConfig);
      setVersion(res.version);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const refresh = useCallback(() => {
    setLoaded(false);
    load();
  }, [load]);

  const value = useMemo(() => ({ site, version, loaded, refresh }), [site, version, loaded, refresh]);

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite(): SiteContextType {
  return useContext(SiteContext);
}
