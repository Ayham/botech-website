import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Spinner } from '../components/Spinner';
import { useI18n } from '@/i18n';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAdminAuth();
  const location = useLocation();
  const { dir } = useI18n();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir={dir}>
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}