import type { ReactNode } from 'react';

export function StatCard({
  title,
  value,
  icon,
  trend,
  subtitle,
  loading = false,
}: {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: { value: number; positive: boolean };
  subtitle?: string;
  loading?: boolean;
}) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
        <div className="h-4 w-24 bg-gray-200 rounded mb-3" />
        <div className="h-8 w-20 bg-gray-200 rounded mb-1" />
        <div className="h-3 w-32 bg-gray-100 rounded" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
      {trend && (
        <p className={`text-sm font-medium ${trend.positive ? 'text-green-600' : 'text-red-500'}`}>
          {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}%
        </p>
      )}
      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
    </div>
  );
}