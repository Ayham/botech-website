import type { ReactNode, SVGProps } from 'react';
import type { CloverIconName } from '@/config/clover-content';

interface CloverIconProps extends SVGProps<SVGSVGElement> {
  name: CloverIconName;
  className?: string;
}

/**
 * A single lightweight icon set for the Clover page.
 * Stroke icons share one visual language; the WhatsApp mark is filled.
 */
export function CloverIcon({ name, className = 'w-6 h-6', ...props }: CloverIconProps) {
  if (name === 'whatsapp') {
    return (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" {...props}>
        <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.82 9.82 0 0 0 1.51 5.26l-.999 3.648 3.978-1.05zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.867-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.258-.463-2.395-1.478-.886-.784-1.48-1.782-1.653-2.082-.173-.297-.019-.458.13-.606.134-.133.298-.347.446-.521.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.521.074-.793.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.064 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
      </svg>
    );
  }

  const paths: Record<Exclude<CloverIconName, 'whatsapp'>, ReactNode> = {
    pos: (
      <>
        <rect x="3" y="3" width="18" height="12" rx="2" />
        <path d="M7 21h10M12 15v6" />
        <path d="M7 7h6M7 11h3" />
      </>
    ),
    store: (
      <>
        <path d="M4 10v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9" />
        <path d="M3 10l1.6-5.2A1 1 0 0 1 5.6 4h12.8a1 1 0 0 1 1 0.8L21 10" />
        <path d="M3 10a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
        <path d="M9 20v-5h6v5" />
      </>
    ),
    'cloud-off': (
      <>
        <path d="M3 3l18 18" />
        <path d="M17.5 19H6a4 4 0 0 1-.7-7.94A6 6 0 0 1 8.2 6.2" />
        <path d="M9.5 5.2A6 6 0 0 1 18 10a4 4 0 0 1 2.5 6.5" />
      </>
    ),
    currency: (
      <>
        <circle cx="8" cy="8" r="4" />
        <circle cx="16" cy="16" r="4" />
        <path d="M11 8h2M14.5 8H17M7 8h1M8 6v4M14 16h2M18.5 16H20M16 18v-4" />
      </>
    ),
    inventory: (
      <>
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12" />
      </>
    ),
    users: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    wallet: (
      <>
        <path d="M20 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5" />
        <path d="M16 12h4" />
        <circle cx="16" cy="12" r="1" />
      </>
    ),
    chart: (
      <>
        <path d="M3 3v18h18" />
        <path d="M7 15l4-4 3 3 5-6" />
        <path d="M15 8h4v4" />
      </>
    ),
    barcode: (
      <>
        <path d="M4 5v14M7 5v14M10 5v14M14 5v14M17 5v14M20 5v14" />
        <path d="M2 5h1M2 19h1M21 5h1M21 19h1" />
      </>
    ),
    receipt: (
      <>
        <path d="M6 2h12v20l-3-2-3 2-3-2-3 2z" />
        <path d="M9 7h6M9 11h6M9 15h4" />
      </>
    ),
    truck: (
      <>
        <path d="M1 3h14v13H1zM15 8h4l3 3v5h-7z" />
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
        <path d="M8 18h8" />
      </>
    ),
    qr: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <path d="M14 14h3v3h-3zM20 14h1M14 20h1M17 20h4M20 17v1" />
      </>
    ),
    monitor: (
      <>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </>
    ),
    smartphone: (
      <>
        <rect x="6" y="2" width="12" height="20" rx="2" />
        <path d="M11 18h2" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
      </>
    ),
    check: <path d="M5 13l4 4L19 7" />,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    refresh: (
      <>
        <path d="M21 12a9 9 0 0 1-15.5 6.2M3 12A9 9 0 0 1 18.5 5.8" />
        <path d="M3 4v5h5M21 20v-5h-5" />
      </>
    ),
    cart: (
      <>
        <circle cx="9" cy="20" r="1.5" />
        <circle cx="18" cy="20" r="1.5" />
        <path d="M2 3h3l2.4 11.2a1 1 0 0 0 1 .8h9.6a1 1 0 0 0 1-.8L21 7H6" />
      </>
    ),
    package: (
      <>
        <path d="M12 3 3 7.5v9L12 21l9-4.5v-9z" />
        <path d="M3 7.5 12 12l9-4.5M12 12v9" />
        <path d="M7.5 5.25 16.5 9.75" />
      </>
    ),
    tag: (
      <>
        <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z" />
        <circle cx="7.5" cy="7.5" r="1.5" />
      </>
    ),
  };

  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
