import { Button } from '@/components/ui/Button';
import { IconAlert } from './Icons';
import { useAdminTranslations } from '../i18n';

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel,
  danger = true,
  loading = false,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const t = useAdminTranslations();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
        onClick={loading ? undefined : onCancel}
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-start gap-4">
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ${
              danger ? 'bg-red-100 text-red-600' : 'bg-primary-50 text-primary-600'
            }`}
          >
            <IconAlert size={22} />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="secondary" onClick={onCancel} disabled={loading}>
            {cancelLabel ?? t.common.cancel}
          </Button>
          <Button
            variant={danger ? 'primary' : 'primary'}
            onClick={onConfirm}
            loading={loading}
            className={danger ? '!bg-red-600 !hover:bg-red-700' : ''}
          >
            {confirmLabel ?? t.common.confirm}
          </Button>
        </div>
      </div>
    </div>
  );
}