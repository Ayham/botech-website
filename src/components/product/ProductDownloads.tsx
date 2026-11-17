import { useI18n } from '@/i18n';
import { storeDownloads } from '@/config/download-links';
import { GooglePlayButton } from './GooglePlayButton';

interface ProductDownloadsProps {
  downloadLinks: Record<string, string>;
  align?: 'start' | 'center';
  className?: string;
}

/**
 * Renders the Google Play download button(s) for a product. When a product has
 * more than one app (Clover), each badge gets a small caption so the two
 * downloads stay distinguishable.
 */
export function ProductDownloads({ downloadLinks, align = 'start', className = '' }: ProductDownloadsProps) {
  const { t } = useI18n();
  const downloads = storeDownloads(downloadLinks);

  if (downloads.length === 0) return null;
  const showCaption = downloads.length > 1;

  return (
    <div className={`flex flex-wrap items-end gap-x-5 gap-y-3 ${align === 'center' ? 'justify-center' : ''} ${className}`}>
      {downloads.map((item) => (
        <div key={item.key} className="flex flex-col gap-1.5">
          <GooglePlayButton
            href={item.href}
            label={showCaption ? `${t.products.downloadOnGooglePlay} — ${item.caption}` : t.products.downloadOnGooglePlay}
          />
          {showCaption && (
            <span className="text-[11px] font-semibold text-neutral-500">{item.caption}</span>
          )}
        </div>
      ))}
    </div>
  );
}
