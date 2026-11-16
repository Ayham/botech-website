import type { CloverPageContent, CloverSpotlight } from '@/config/clover-content';
import { Image } from '@/components/ui';
import { CloverIcon } from './CloverIcon';

interface SpotlightRowProps {
  spotlight: CloverSpotlight;
  currencyPanel: CloverPageContent['currencyPanel'];
  reverse?: boolean;
}

function CurrencyPanel({ panel }: { panel: CloverPageContent['currencyPanel'] }) {
  return (
    <div className="relative h-full min-h-[280px] overflow-hidden rounded-3xl border border-clover-100 bg-gradient-to-br from-clover-950 via-[#063b2c] to-primary-950 p-6 text-white sm:p-8">
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-clover-500/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-primary-400/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex items-center justify-between gap-4">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-clover-200">{panel.title}</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-clover-200 ring-1 ring-white/15">
          <CloverIcon name="refresh" className="h-4 w-4" />
        </span>
      </div>

      <div className="relative mt-8 grid gap-3">
        <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-clover-100">{panel.usdLabel}</span>
            <span className="text-2xl font-semibold text-white">$</span>
          </div>
          <span className="mt-1 block text-xs font-medium tracking-wide text-clover-300">USD</span>
        </div>

        <div className="flex items-center gap-3 px-2" aria-hidden="true">
          <span className="h-px flex-1 bg-white/15" />
          <span className="rounded-full bg-clover-500/20 px-3 py-1 text-[11px] font-semibold text-clover-200">
            {panel.rateLabel}
          </span>
          <span className="h-px flex-1 bg-white/15" />
        </div>

        <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-clover-100">{panel.sypLabel}</span>
            <span className="text-2xl font-semibold text-white">ل.س</span>
          </div>
          <span className="mt-1 block text-xs font-medium tracking-wide text-clover-300">SYP</span>
        </div>
      </div>

      <p className="relative mt-6 text-xs leading-relaxed text-clover-100/80">{panel.note}</p>
    </div>
  );
}

export function SpotlightRow({ spotlight, currencyPanel, reverse = false }: SpotlightRowProps) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={`relative ${reverse ? 'lg:order-2' : ''}`}>
        {spotlight.image ? (
          <div className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 shadow-xl">
            <div className="aspect-[4/3]">
              <Image
                src={spotlight.image.src}
                alt={spotlight.image.alt}
                width={spotlight.image.width}
                height={spotlight.image.height}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-clover-950/70 via-clover-950/10 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-md">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-clover-500 text-white">
                <CloverIcon name={spotlight.icon} className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium text-white">{spotlight.eyebrow}</span>
            </div>
          </div>
        ) : (
          <CurrencyPanel panel={currencyPanel} />
        )}
      </div>

      <div className={reverse ? 'lg:order-1' : ''}>
        <span className="inline-flex items-center gap-2 rounded-full bg-clover-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-clover-700 ring-1 ring-clover-100">
          <CloverIcon name={spotlight.icon} className="h-3.5 w-3.5" />
          {spotlight.eyebrow}
        </span>
        <h3 className="heading-3 mt-4 text-neutral-900">{spotlight.title}</h3>
        <p className="body-lg mt-4 text-neutral-600">{spotlight.description}</p>
        <ul className="mt-6 space-y-3">
          {spotlight.points.map((point) => (
            <li key={point} className="flex items-start gap-3 text-neutral-700">
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-clover-100 text-clover-700">
                <CloverIcon name="check" className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm leading-relaxed sm:text-base">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
