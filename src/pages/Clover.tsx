import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { Section, Container, Card, Badge } from '@/components/ui';
import { siteConfig } from '@/config/site';
import { useI18n } from '@/i18n';
import { pageSEO } from '@/config/seo';
import { NavLink } from 'react-router-dom';
import { OrbitBackground } from '@/components/ui/OrbitBackground';

export function CloverPage() {
  const { t, locale } = useI18n();
  const seo = locale === 'ar' ? pageSEO.clover : pageSEO.cloverEn;
  const product = siteConfig.products.clover;
  const text = t.clover;

  return (
    <Layout
      title={seo.title}
      description={seo.description}
      canonical={seo.canonical}
      ogImage={seo.ogImage}
    >
      <Helmet>
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content={seo.ogImage} />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={seo.ogImage} />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-neutral-900 text-white">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        </div>
        <OrbitBackground variant="dark" />
        <Container>
          <div className="relative max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <img
                src={product.logo}
                alt={product.name}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover shadow-xl"
                width="112"
                height="112"
              />
            </div>

            <Badge variant="warning" size="md" className="mb-6">
              <span className="relative flex h-2 w-2 mr-2 rtl:mr-0 rtl:ml-2">
                <span className="animate-pulse-soft inline-flex h-full w-full absolute inset-0 rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              {t.products.comingSoon}
            </Badge>

            <h1 className="heading-1 mb-4">{product.name}</h1>
            <p className="heading-3 text-primary-300 mb-4">
              {locale === 'ar' ? product.tagline.ar : product.tagline.en}
            </p>
            <p className="body-lg text-neutral-300 mb-8">{text.hero.description}</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <NavLink to="/contact#form">
                <span className="btn bg-white text-primary-700 hover:bg-primary-50 inline-flex items-center gap-2">
                  {t.common.contactUs}
                </span>
              </NavLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Modules */}
      <Section size="lg" background="neutral" id="modules">
        <Container>
          <div className="text-center mb-16">
            <h2 className="heading-2 text-neutral-900 mb-4">{text.modules.title}</h2>
            <p className="body-lg text-neutral-600">{text.comingSoon.modulesSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {text.modules.items.map((module) => (
              <Card key={module.name} variant="padded" hover className="animate-fade-in">
                <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="heading-4 text-neutral-900 mb-2">{module.name}</h3>
                <p className="body text-neutral-600">{module.desc}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section size="lg" background="primary" className="relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>
        <OrbitBackground variant="cta" />
        <Container>
          <div className="relative max-w-3xl mx-auto text-center">
            <h2 className="heading-2 text-white mb-4">{text.comingSoon.contactTitle}</h2>
            <p className="body-lg text-primary-100 mb-8">{text.comingSoon.subtitle}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <NavLink to="/contact#form">
                <span className="btn btn-secondary inline-flex items-center gap-2 bg-white text-primary-600 hover:bg-primary-50">
                  {t.common.contactUs}
                </span>
              </NavLink>
              <a
                href={siteConfig.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline border-2 border-white/70 text-white hover:bg-white/10"
              >
                {locale === 'ar' ? 'واتساب' : 'WhatsApp'}
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* Back to Products */}
      <Section size="sm" background="white">
        <Container>
          <div className="text-center">
            <NavLink to="/products" className="btn btn-ghost inline-flex items-center gap-2">
              <svg className="w-4 h-4 rtl-flip" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
              {locale === 'ar' ? 'العودة للمنتجات' : 'Back to Products'}
            </NavLink>
          </div>
        </Container>
      </Section>
    </Layout>
  );
}