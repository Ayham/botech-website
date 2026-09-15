import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { Container } from '@/components/ui/Container';
import { Reveal, RevealStagger } from '@/components/ui/Reveal';
import { OrbitBackground } from '@/components/ui/OrbitBackground';
import { useI18n } from '@/i18n';
import { pageSEO } from '@/config/seo';

export function NotFound() {
  const navigate = useNavigate();
  const { locale } = useI18n();
  const seo = locale === 'ar' ? pageSEO.notFound : pageSEO.notFoundEn;

  return (
    <Layout
      title={seo.title}
      description={seo.description}
      noIndex
    >
      <Helmet>
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
      </Helmet>

      <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
        {/* Orbit decoration */}
        <div className="absolute inset-0" aria-hidden="true">
          <OrbitBackground variant="dark" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 via-primary-700/90 to-primary-800/90" />
        </div>

        <Container className="relative z-10">
          <RevealStagger direction="up" delayStep={100} className="max-w-4xl mx-auto text-center">
            {/* Error badge */}
            <Reveal>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium mb-6 border border-white/20 backdrop-blur-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {locale === 'ar' ? 'خطأ 404' : 'Error 404'}
              </span>
            </Reveal>

            {/* Error code */}
            <Reveal delay={100}>
              <h1 className="text-[8rem] sm:text-[10rem] lg:text-[12rem] font-bold text-white leading-none mb-6 tracking-tighter" style={{ textShadow: '0 4px 20px rgba(28, 74, 127, 0.3)' }}>
                404
              </h1>
            </Reveal>

            {/* Error title */}
            <Reveal delay={200}>
              <h2 className="heading-2 text-white mb-4">
                {locale === 'ar' ? 'الصفحة غير موجودة' : 'Page Not Found'}
              </h2>
            </Reveal>

            {/* Error description */}
            <Reveal delay={300}>
              <p className="body-lg text-primary-100 mb-8 max-w-2xl mx-auto text-balance">
                {locale === 'ar'
                  ? 'عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى عنوان آخر. يمكنك العودة إلى الصفحة الرئيسية للبحث عن ما تريد.'
                  : "Sorry, the page you're looking for doesn't exist or has been moved to a different address. You can go back to the homepage to find what you need."}
              </p>
            </Reveal>

            {/* Action buttons */}
            <Reveal delay={400}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => navigate('/')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  {locale === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
                </button>

                <button
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white text-lg font-semibold rounded-xl border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  {locale === 'ar' ? 'الرجوع للصفحة السابقة' : 'Go Back'}
                </button>
              </div>
            </Reveal>
          </RevealStagger>
        </Container>
      </section>
    </Layout>
  );
}
