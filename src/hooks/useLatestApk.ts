import { useEffect, useState } from 'react';

const GITHUB_REPO = 'mobi1298-del/ussd';
const GITHUB_API_URL = `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`;
const GITHUB_FALLBACK_URL = `https://github.com/${GITHUB_REPO}/releases/latest`;

export function useLatestApk() {
  const [apkUrl, setApkUrl] = useState<string>(GITHUB_FALLBACK_URL);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const response = await fetch(GITHUB_API_URL);
        if (!response.ok) return;

        const data = await response.json();
        const apkAsset = data.assets?.find(
          (asset: { name: string }) => asset.name.endsWith('.apk')
        );

        if (!cancelled && apkAsset?.browser_download_url) {
          setApkUrl(apkAsset.browser_download_url);
        }
      } catch {
        // Keep fallback URL
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { apkUrl, loading };
}
