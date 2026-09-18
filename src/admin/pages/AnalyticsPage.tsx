import { useMemo, useState } from 'react';
import { useAdminTranslations } from '../i18n';
import { PageHeader } from '../components/PageHeader';
import { StatCard } from '../components/StatCard';
import { Spinner } from '../components/Spinner';
import { useAdminData } from '../hooks/useAdminData';
import { IconTrendUp } from '../components/Icons';

interface TopItem {
  key: string;
  count: number;
}

interface DailyPoint {
  date: string;
  views: number;
  visitors: number;
}

interface AnalyticsData {
  rangeDays: number;
  generatedAt: string;
  totals: { views: number; visitors: number };
  daily: DailyPoint[];
  pages: TopItem[];
  referrers: TopItem[];
  devices: TopItem[];
  browsers: TopItem[];
  oss: TopItem[];
  countries: TopItem[];
}

function BarChart({ data }: { data: DailyPoint[] }) {
  if (!data.length) return null;
  const max = Math.max(...data.map((d) => d.views), 1);
  const w = 640;
  const h = 160;
  const bw = Math.max(2, Math.min(24, w / data.length - 4));
  const labels = data.length <= 31;

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full min-w-[480px]" role="img" aria-label="Daily traffic bar chart">
        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1={0}
            x2={w}
            y1={h * (1 - f)}
            y2={h * (1 - f)}
            stroke="#e5e7eb"
            strokeWidth={1}
            strokeDasharray="4 4"
          />
        ))}
        {data.map((d, i) => {
          const x = i * (bw + 4);
          const bh = (d.views / max) * (h - 24);
          return (
            <g key={d.date}>
              <rect
                x={x}
                y={h - bh}
                width={bw}
                height={bh}
                rx={2}
                className="fill-primary-500 hover:fill-primary-600 transition-colors"
                opacity={0.9}
              >
                <title>{`${d.date}: ${d.views} views`}</title>
              </rect>
              {labels && (
                <text x={x + bw / 2} y={h - 3} textAnchor="middle" fontSize={8} fill="#9ca3af">
                  {d.date.slice(5)}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function TopList({ items, title }: { items: TopItem[]; title: string }) {
  const max = Math.max(...items.map((i) => i.count), 1);
  if (!items.length) return null;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">{title}</h3>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={`${item.key}-${i}`}>
            <div className="flex items-center justify-between mb-1 text-sm">
              <span className="text-gray-700 truncate max-w-[60%]" dir="ltr">
                {item.key === '(direct)' ? 'Direct' : item.key}
              </span>
              <span className="font-medium text-gray-900">{item.count.toLocaleString()}</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-500 rounded-full"
                style={{ width: `${(item.count / max) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AnalyticsPage() {
  const t = useAdminTranslations();
  const [days, setDays] = useState(30);

  const request = useMemo(
    () => ({ connection: 'botech' as const, module: 'analytics', action: 'overview', params: { days } }),
    [days]
  );
  const { data, loading, error, refresh } = useAdminData<AnalyticsData>(request);

  const totalViews = data?.totals.views ?? 0;
  const totalVisitors = data?.totals.visitors ?? 0;
  const avgPerDay = data?.daily.length ? Math.round(totalViews / data.daily.length) : 0;

  return (
    <div>
      <PageHeader
        title={t.analytics.title}
        subtitle={t.analytics.subtitle}
        icon={<IconTrendUp size={24} />}
        loading={loading}
        actions={
          <div className="flex items-center gap-2">
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700"
            >
              <option value={7}>{t.analytics.days7}</option>
              <option value={30}>{t.analytics.days30}</option>
              <option value={90}>{t.analytics.days90}</option>
            </select>
            <button
              onClick={refresh}
              className="px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
            >
              {t.common.refresh}
            </button>
          </div>
        }
      />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
          {t.common.error}: {error}
        </div>
      )}

      {loading && !data ? (
        <div className="flex justify-center py-24">
          <Spinner size="lg" />
        </div>
      ) : !data || (totalViews === 0 && totalVisitors === 0) ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center">
            <IconTrendUp size={28} />
          </div>
          <p className="text-gray-500 font-medium">{t.analytics.noData}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <StatCard title={t.analytics.views} value={totalViews.toLocaleString()} icon={<IconTrendUp size={20} />} />
            <StatCard title={t.analytics.visitors} value={totalVisitors.toLocaleString()} icon={<IconTrendUp size={20} />} />
            <StatCard title={t.analytics.avgPerDay} value={avgPerDay.toLocaleString()} icon={<IconTrendUp size={20} />} />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">{t.analytics.dailyTraffic}</h3>
            <BarChart data={data.daily} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
            <TopList items={data.pages} title={t.analytics.topPages} />
            <TopList items={data.referrers} title={t.analytics.topReferrers} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            <TopList items={data.devices} title={t.analytics.devices} />
            <TopList items={data.browsers} title={t.analytics.browsers} />
            <TopList items={data.oss} title={t.analytics.operatingSystems} />
            <TopList items={data.countries} title={t.analytics.countries} />
          </div>
        </>
      )}
    </div>
  );
}