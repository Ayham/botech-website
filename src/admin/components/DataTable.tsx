import { useState } from 'react';
import { Spinner } from './Spinner';
import { EmptyState } from './EmptyState';
import { useAdminTranslations } from '../i18n';

export interface Column<T> {
  key: string;
  header: string;
  hidden?: boolean;
  minWidth?: boolean;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[] | null | undefined;
  rowKey: (row: T, index: number) => string;
  loading?: boolean;
  onRowClick?: (row: T) => void;
  emptyTitle?: string;
  emptyDescription?: string;
  pagination?: {
    current?: number;
    pageSize?: number;
    total?: number;
    onPageChange?: (page: number) => void;
  };
}

export function DataTable<T>({
  columns,
  data,
  rowKey,
  loading = false,
  onRowClick,
  emptyTitle = 'لا توجد بيانات',
  emptyDescription,
  pagination,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const t = useAdminTranslations();
  const emptyLabel = emptyTitle === 'لا توجد بيانات' ? t.common.noData : emptyTitle;

  const visible = columns.filter((c) => !c.hidden);

  const rows: T[] = Array.isArray(data) ? [...data] : [];
  if (sortKey) {
    rows.sort((a, b) => {
      const av = (a as Record<string, unknown>)[sortKey];
      const bv = (b as Record<string, unknown>)[sortKey];
      const cmp = String(av ?? '').localeCompare(String(bv ?? ''));
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {visible.map((col) => (
                <th
                  key={col.key}
                  onClick={() => {
                    if (sortKey === col.key) {
                      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
                    } else {
                      setSortKey(col.key);
                      setSortDir('asc');
                    }
                  }}
                  className={`px-4 py-3 text-start text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer select-none ${
                    col.minWidth ? 'w-1 whitespace-nowrap' : ''
                  }`}
                >
                  {col.header}
                  {sortKey === col.key && <span className="ms-1">{sortDir === 'asc' ? '▲' : '▼'}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={visible.length} className="py-16">
                  <div className="flex justify-center">
                    <Spinner />
                  </div>
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={visible.length} className="py-16">
                  <EmptyState
                    title={emptyLabel}
                    description={emptyDescription}
                  />
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr
                  key={rowKey(row, i)}
                  onClick={() => onRowClick?.(row)}
                  className={onRowClick ? 'hover:bg-gray-50 transition-colors cursor-pointer' : 'hover:bg-gray-50 transition-colors'}
                >
                  {visible.map((col) => {
                    const value = (row as Record<string, unknown>)[col.key];
                    return (
                      <td key={col.key} className={`px-4 py-3 text-sm text-gray-800 ${col.minWidth ? 'whitespace-nowrap' : ''}`}>
                        {col.render ? col.render(row) : value === null || value === undefined ? '—' : String(value)}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {pagination && pagination.total !== undefined && pagination.total > 0 && (
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-200">
          <span className="text-sm text-gray-500">
            {pagination.total}{' '}
            {pagination.pageSize ? `• ${pagination.pageSize} ${t.common.show} / ${t.common.page}` : ''}
          </span>
          {pagination.onPageChange && (
            <div className="flex gap-2">
              <button
                onClick={() => pagination.onPageChange?.((pagination.current ?? 1) - 1)}
                disabled={(pagination.current ?? 1) <= 1}
                className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                {t.common.previous}
              </button>
              <button
                onClick={() => pagination.onPageChange?.((pagination.current ?? 1) + 1)}
                disabled={(pagination.current ?? 1) * (pagination.pageSize ?? 20) >= pagination.total}
                className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                {t.common.next}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}