import { useState, type FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useI18n } from '@/i18n';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site';
import { IconKey, IconShield } from '../components/Icons';

export function LoginPage() {
  const { login, error: authError, loading: checking } = useAdminAuth();
  const { dir, locale, toggleLocale } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email.trim(), password);
      const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname;
      navigate(from && from !== '/admin/login' ? from : '/admin', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'login_failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" dir={dir}>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img src={siteConfig.logo} alt="BOTech" className="h-10 w-10 rounded-lg" />
          <div>
            <p className="font-bold text-gray-900">BOTech Admin</p>
            <p className="text-xs text-gray-400">Central Admin Console</p>
          </div>
        </div>
        <button
          onClick={toggleLocale}
          className="px-3 py-1.5 text-sm font-medium bg-white hover:bg-gray-200 border border-gray-200 rounded-lg text-gray-700 transition-colors"
        >
          {locale === 'ar' ? 'EN' : 'عربي'}
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mb-6">
              <IconShield size={28} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {locale === 'ar' ? 'تسجيل دخول المدير' : 'Admin Sign In'}
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              {locale === 'ar'
                ? 'الدخول مخصص لفريق BOTech فقط. بياناتك آمنة ومشفرة.'
                : 'Restricted to the BOTech team only. Your credentials are safe and encrypted.'}
            </p>

            {(error || authError) && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
                {error ?? authError}
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={locale === 'ar' ? 'admin@botech-live.com' : 'admin@botech-live.com'}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900"
                  autoComplete="email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {locale === 'ar' ? 'كلمة المرور' : 'Password'}
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900"
                  autoComplete="current-password"
                />
              </div>
              <Button type="submit" fullWidth loading={submitting || checking} size="lg">
                <IconKey size={18} />
                {locale === 'ar' ? 'دخول' : 'Sign In'}
              </Button>
            </form>
          </div>

          <div className="mt-6 flex items-center gap-2 justify-center text-xs text-gray-400">
            <IconShield size={14} />
            {locale === 'ar'
              ? 'لا تُخزَّن أي بيانات سرية في المتصفح. جميع العمليات الحساسة تتم عبر خوادم آمنة.'
              : 'No secrets are stored in the browser. All privileged operations run on secure servers.'}
          </div>
        </div>
      </div>
    </div>
  );
}