export function StatusBadge({
  status,
  size = 'sm',
}: {
  status: string;
  size?: 'sm' | 'md';
}) {
  const s = status?.toLowerCase().trim() ?? '';
  const base =
    'inline-flex items-center font-medium rounded-full whitespace-nowrap';
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm';

  const colorMap: Record<string, string> = {
    connected: 'bg-green-100 text-green-800',
    active: 'bg-green-100 text-green-800',
    success: 'bg-green-100 text-green-800',
    completed: 'bg-green-100 text-green-800',
    paid: 'bg-green-100 text-green-800',
    approved: 'bg-green-100 text-green-800',
    available: 'bg-green-100 text-green-800',
    granted: 'bg-green-100 text-green-800',
    running: 'bg-green-100 text-green-800',
    serving: 'bg-green-100 text-green-800',
    'in_progress': 'bg-blue-100 text-blue-800',
    confirmed: 'bg-blue-100 text-blue-800',
    in_use: 'bg-blue-100 text-blue-800',
    acknowledged: 'bg-blue-100 text-blue-800',
    issued: 'bg-blue-100 text-blue-800',
    draft: 'bg-gray-100 text-gray-600',
    available_unassigned: 'bg-gray-100 text-gray-600',
    lead: 'bg-gray-100 text-gray-600',
    installed: 'bg-gray-100 text-gray-600',
    error: 'bg-red-100 text-red-700',
    failed: 'bg-red-100 text-red-700',
    critical: 'bg-red-100 text-red-700',
    broken: 'bg-red-100 text-red-700',
    suspended: 'bg-red-100 text-red-700',
    blocked: 'bg-red-100 text-red-700',
    revoked: 'bg-red-100 text-red-700',
    expired: 'bg-red-100 text-red-700',
    rejected: 'bg-red-100 text-red-700',
    overdue: 'bg-red-100 text-red-700',
    overdue_critical: 'bg-red-100 text-red-700',
    unknown: 'bg-gray-100 text-gray-600',
    unavailable: 'bg-gray-100 text-gray-600',
    not_connected: 'bg-yellow-100 text-yellow-800',
    pending: 'bg-yellow-100 text-yellow-800',
    revoked_granted: 'bg-yellow-100 text-yellow-800',
    not_found: 'bg-gray-100 text-gray-600',
    denied: 'bg-red-100 text-red-700',
    partial: 'bg-yellow-100 text-yellow-800',
    inactive: 'bg-gray-100 text-gray-600',
    disabled: 'bg-gray-100 text-gray-600',
    refunded: 'bg-orange-100 text-orange-700',
    lifetime: 'bg-purple-100 text-purple-700',
    transferred: 'bg-indigo-100 text-indigo-700',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-700',
  };

  const colors = colorMap[s] || 'bg-gray-100 text-gray-600';
  return <span className={`${base} ${sizeClass} ${colors}`}>{status}</span>;
}