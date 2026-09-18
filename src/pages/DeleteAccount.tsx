import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { Section, Container } from '@/components/ui';
import { Input, Button } from '@/components/ui';
import { useI18n } from '@/i18n';
import { pageSEO } from '@/config/seo';
import { useSite } from '@/hooks/useSite';
import { requestAccountDeletion, confirmAccountDeletion, type DeletionErrorCode } from '@/lib/delete-account-api';

type Step = 'email' | 'code' | 'done';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function DeleteAccount() {
  const { t, locale, dir } = useI18n();
  const { site } = useSite();
  const seo = locale === 'ar' ? pageSEO.deleteAccount : pageSEO.deleteAccountEn;

  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [fieldError, setFieldError] = useState<string | undefined>(undefined);
  const [apiError, setApiError] = useState<DeletionErrorCode | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const supportEmail = site.contact.emails.support;
  const errorMessage = apiError ? t.deleteAccount.errors[apiError] : undefined;

  function validateEmail(): boolean {
    const value = email.trim();
    if (!value) {
      setFieldError(t.deleteAccount.emailRequired);
      return false;
    }
    if (!EMAIL_RE.test(value)) {
      setFieldError(t.deleteAccount.invalidEmail);
      return false;
    }
    setFieldError(undefined);
    return true;
  }

  async function handleRequest() {
    if (!validateEmail()) return;
    setLoading(true);
    setApiError(undefined);
    const res = await requestAccountDeletion(email.trim());
    setLoading(false);
    if (res.ok) {
      setStep('code');
    } else {
      setApiError(res.code);
    }
  }

  async function handleConfirm(e: React.FormEvent) {
    e.preventDefault();
    const value = code.trim();
    if (!value) {
      setApiError('invalid_code');
      return;
    }
    setLoading(true);
    setApiError(undefined);
    const res = await confirmAccountDeletion(email.trim(), value);
    setLoading(false);
    if (res.ok) {
      setStep('done');
    } else {
      setApiError(res.code);
    }
  }

  function resetForAnother() {
    setEmail('');
    setCode('');
    setFieldError(undefined);
    setApiError(undefined);
    setStep('email');
  }

  function backToEmail() {
    setCode('');
    setFieldError(undefined);
    setApiError(undefined);
    setStep('email');
  }

  return (
    <Layout title={seo.title} description={seo.description} canonical={seo.canonical} noIndex={seo.noIndex}>
      <Helmet>
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
      </Helmet>

      <Section size="lg" background="gradient">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Page header */}
            <div className="text-center mb-10">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-red-100 text-red-700 rounded-full mb-4">
                {t.deleteAccount.badge}
              </span>
              <h1 className="heading-2 text-neutral-900 mb-4">{t.deleteAccount.title}</h1>
              <p className="body-lg text-neutral-600">{t.deleteAccount.subtitle}</p>
            </div>

            {/* Card */}
            <div className="bg-white rounded-2xl shadow-lg shadow-neutral-900/5 border border-neutral-100 p-6 sm:p-10">
              {step === 'done' ? (
                <div className="text-center py-4" dir={dir}>
                  <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="heading-3 text-neutral-900 mb-3">{t.deleteAccount.doneTitle}</h2>
                  <p className="body text-neutral-600 mb-6">{t.deleteAccount.doneSubtitle}</p>
                  <p className="body-sm text-neutral-500 mb-8">
                    {t.deleteAccount.doneExtra}
                    <a href={`mailto:${supportEmail}`} className="text-primary-600 hover:text-primary-700 underline transition-colors" dir="ltr">
                      {t.deleteAccount.supportEmail}
                    </a>
                  </p>
                  <Button variant="outline" onClick={resetForAnother}>
                    {t.deleteAccount.deleteAnother}
                  </Button>
                </div>
              ) : (
                <>
                  {/* What gets deleted */}
                  <div className="mb-8">
                    <h2 className="font-semibold text-neutral-900 mb-3">{t.deleteAccount.whatsDeletedTitle}</h2>
                    <ul className="grid gap-2 sm:grid-cols-1">
                      {t.deleteAccount.whatsDeleted.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-neutral-600">
                          <svg className="w-4 h-4 mt-1 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Irreversible warning */}
                  <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4 mb-8" role="alert">
                    <svg className="w-5 h-5 mt-0.5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-medium text-red-800 text-sm mb-1">{t.deleteAccount.irreversibleTitle}</p>
                      <p className="text-sm text-red-700">{t.deleteAccount.irreversible}</p>
                    </div>
                  </div>

                  {/* Order matters */}
                  {step === 'email' && (
                    <>
                      <div className="mb-8">
                        <h2 className="font-semibold text-neutral-900 mb-4">{t.deleteAccount.optionsTitle}</h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-600">
                            <p className="font-semibold text-neutral-900 mb-1 flex items-center gap-2">
                              <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                              {t.deleteAccount.inAppTitle}
                            </p>
                            <p>{t.deleteAccount.inAppDesc}</p>
                            <p className="mt-2 text-primary-600">{t.deleteAccount.appDeleteNote}</p>
                          </div>
                          <div className="rounded-xl border-2 border-primary-200 bg-primary-50 p-4 text-sm text-neutral-600">
                            <p className="font-semibold text-neutral-900 mb-1 flex items-center gap-2">
                              <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path d="M13 7H7v6h6V7z" /><path d="M3 5a2 2 0 012-2h2V2a2 2 0 012-2h2a2 2 0 012 2v1h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2 0v10h10V5H5z" /></svg>
                              {t.deleteAccount.webTitle}
                            </p>
                            <p>{t.deleteAccount.webDesc}</p>
                          </div>
                        </div>
                      </div>

                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          void handleRequest();
                        }}
                        noValidate
                      >
                        <h2 className="font-semibold text-neutral-900 mb-4">{t.deleteAccount.formTitle}</h2>
                        <Input
                          type="email"
                          autoComplete="email"
                          dir="ltr"
                          inputMode="email"
                          name="raseed-deletion-email"
                          label={t.deleteAccount.emailLabel}
                          placeholder={t.deleteAccount.emailPlaceholder}
                          hint={t.deleteAccount.emailHint}
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (fieldError) setFieldError(undefined);
                          }}
                          error={fieldError}
                          className="text-left"
                        />

                        {apiError && (
                          <div className="mt-4 flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700" role="alert">
                            <svg className="w-5 h-5 mt-0.5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <span>{errorMessage}</span>
                          </div>
                        )}

                        <div className="mt-6">
                          <Button type="submit" variant="danger" loading={loading} fullWidth size="lg">
                            {t.deleteAccount.requestBtn}
                          </Button>
                        </div>
                      </form>
                    </>
                  )}

                  {step === 'code' && (
                    <form onSubmit={handleConfirm} noValidate>
                      <h2 className="font-semibold text-neutral-900 mb-3">{t.deleteAccount.codeTitle}</h2>
                      <p className="text-sm text-neutral-600 mb-5">
                        {t.deleteAccount.codeSent}{' '}
                        <span className="font-medium text-neutral-900" dir="ltr">
                          {email}
                        </span>
                      </p>
                      <Input
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        name="raseed-deletion-code"
                        label={t.deleteAccount.codeLabel}
                        placeholder={t.deleteAccount.codePlaceholder}
                        hint={t.deleteAccount.codeHint}
                        value={code}
                        onChange={(e) => {
                          setCode(e.target.value.replace(/\D/g, '').slice(0, 6));
                          if (apiError) setApiError(undefined);
                        }}
                        error={fieldError}
                        maxLength={6}
                        className="text-center text-lg tracking-[0.4em] font-mono"
                        dir="ltr"
                      />

                      {apiError && (
                        <div className="mt-4 flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700" role="alert">
                          <svg className="w-5 h-5 mt-0.5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      <div className="mt-6 space-y-3">
                        <Button type="submit" variant="danger" loading={loading} fullWidth size="lg">
                          {t.deleteAccount.confirmBtn}
                        </Button>
                        <Button type="button" variant="ghost" fullWidth onClick={backToEmail} disabled={loading}>
                          {t.deleteAccount.backBtn}
                        </Button>
                      </div>
                    </form>
                  )}
                </>
              )}
            </div>

            {/* Security note */}
            {step !== 'done' && (
              <div className="mt-8 flex items-start gap-3 text-sm text-neutral-500" dir={dir}>
                <svg className="w-5 h-5 mt-0.5 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p>{t.deleteAccount.securityNote}</p>
              </div>
            )}
          </div>
        </Container>
      </Section>
    </Layout>
  );
}