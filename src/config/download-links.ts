export interface StoreDownload {
  key: string;
  href: string;
  /** Short app name; empty when the product ships a single app. */
  caption: string;
}

/**
 * Resolve the Google Play downloads for a product.
 *
 * Products with one app (Raseed) return a single entry. Products that ship
 * several apps (Clover Flow POS + Clover Market) return one entry per app so
 * each can be downloaded directly.
 */
export function storeDownloads(downloadLinks: Record<string, string>): StoreDownload[] {
  const apps = [
    { key: 'flow', href: downloadLinks.cloverFlowPos, caption: 'Clover Flow POS' },
    { key: 'market', href: downloadLinks.cloverMarket, caption: 'Clover Market' },
  ].filter((item) => Boolean(item.href));

  if (apps.length > 0) return apps;

  const play = downloadLinks.googlePlay || downloadLinks.android;
  return play ? [{ key: 'play', href: play, caption: '' }] : [];
}
