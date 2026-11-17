import type { CloverPageContent } from '@/config/clover-content';
import { CloverIcon } from './CloverIcon';

interface EcosystemDiagramProps {
  ecosystem: CloverPageContent['ecosystem'];
}

function NodeCard({
  title,
  role,
  description,
  items,
  icon,
  accent,
}: {
  title: string;
  role: string;
  description: string;
  items: string[];
  icon: 'pos' | 'store';
  accent: 'primary' | 'clover';
}) {
  const accentStyles =
    accent === 'clover'
      ? {
          ring: 'ring-clover-200',
          icon: 'bg-clover-600 text-white',
          badge: 'bg-clover-50 text-clover-700 ring-clover-100',
          dot: 'text-clover-600',
        }
      : {
          ring: 'ring-primary-200',
          icon: 'bg-primary-800 text-white',
          badge: 'bg-primary-50 text-primary-700 ring-primary-100',
          dot: 'text-primary-700',
        };

  return (
    <div className={`relative h-full rounded-3xl border border-neutral-200 bg-white p-6 shadow-lg ring-1 ${accentStyles.ring} sm:p-8`}>
      <div className="flex items-start gap-4">
        <span className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ${accentStyles.icon}`}>
          <CloverIcon name={icon} className="h-6 w-6" />
        </span>
        <div>
          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${accentStyles.badge}`}>
            {role}
          </span>
          <h3 className="heading-3 mt-2 text-neutral-900">{title}</h3>
        </div>
      </div>

      <p className="body mt-4 text-neutral-600">{description}</p>

      <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-neutral-700">
            <CloverIcon name="check" className={`mt-0.5 h-4 w-4 flex-shrink-0 ${accentStyles.dot}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function EcosystemDiagram({ ecosystem }: EcosystemDiagramProps) {
  return (
    <div>
      <div className="grid items-stretch gap-5 lg:grid-cols-[1fr_auto_1fr] lg:gap-4">
        <NodeCard
          title={ecosystem.pos.title}
          role={ecosystem.pos.role}
          description={ecosystem.pos.description}
          items={ecosystem.pos.items}
          icon="pos"
          accent="primary"
        />

        <div className="flex items-center justify-center py-1 lg:py-0" aria-hidden="true">
          <div className="flex flex-row items-center gap-2 lg:flex-col">
            <span className="hidden h-16 w-px bg-gradient-to-b from-transparent via-clover-300 to-transparent lg:block" />
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-clover-200 bg-clover-50 text-clover-700 shadow-sm">
              <CloverIcon name="refresh" className="h-5 w-5" />
            </span>
            <span className="hidden h-16 w-px bg-gradient-to-b from-transparent via-clover-300 to-transparent lg:block" />
          </div>
        </div>

        <NodeCard
          title={ecosystem.market.title}
          role={ecosystem.market.role}
          description={ecosystem.market.description}
          items={ecosystem.market.items}
          icon="store"
          accent="clover"
        />
      </div>

      <div className="mt-6 flex flex-col items-center gap-3 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-clover-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-clover-900/10">
          <CloverIcon name="arrow" className="h-4 w-4 rtl-flip" />
          {ecosystem.connector}
        </span>
        <p className="body-sm max-w-2xl text-neutral-500">{ecosystem.note}</p>
      </div>
    </div>
  );
}
