import type { CloverPlatform } from '@/config/clover-content';
import { CloverIcon } from './CloverIcon';

export function PlatformCard({ platform }: { platform: CloverPlatform }) {
  return (
    <div className="group flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-clover-200 hover:shadow-lg">
      <div className="flex items-center justify-between gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-800 ring-1 ring-primary-100 transition-colors duration-300 group-hover:bg-clover-600 group-hover:text-white group-hover:ring-clover-200">
          <CloverIcon name={platform.icon} className="h-6 w-6" />
        </span>
        <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600">
          {platform.subtitle}
        </span>
      </div>
      <h3 className="heading-4 mt-5 text-neutral-900">{platform.title}</h3>
      <p className="body-sm mt-2 text-neutral-600">{platform.description}</p>
    </div>
  );
}
