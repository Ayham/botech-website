import type { CloverFeatureGroup } from '@/config/clover-content';
import { CloverIcon } from './CloverIcon';

export function FeatureGroupCard({ group }: { group: CloverFeatureGroup }) {
  return (
    <article className="group relative h-full overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-clover-200 hover:shadow-xl sm:p-7">
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-clover-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />
      <div className="relative flex items-start gap-4">
        <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-clover-50 text-clover-700 ring-1 ring-clover-100 transition-colors duration-300 group-hover:bg-clover-600 group-hover:text-white">
          <CloverIcon name={group.icon} className="h-6 w-6" />
        </span>
        <div>
          <h3 className="heading-4 text-neutral-900">{group.title}</h3>
          <p className="body-sm mt-1 text-neutral-600">{group.description}</p>
        </div>
      </div>

      <ul className="relative mt-5 space-y-2.5">
        {group.items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-700">
            <svg
              className="mt-0.5 h-4 w-4 flex-shrink-0 text-clover-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
