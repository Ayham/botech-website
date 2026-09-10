import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { Services } from '@/components/sections/Services';
import { WhyBOTech } from '@/components/sections/WhyBOTech';
import { CTA } from '@/components/sections/CTA';
import { useI18n } from '@/i18n';
import { pageSEO } from '@/config/seo';

export function ServicesPage() {
  const { t, locale } = useI18n();
  const seo = locale === 'ar' ? pageSEO.services : pageSEO.servicesEn;

  return (
    <Layout 
      title={seo.title}
      description={seo.description}
      canonical={seo.canonical}
    >
      <Helmet>
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <h1 className="heading-1 text-neutral-900 mb-6">{t.services.title}</h1>
          <p className="body-lg text-neutral-600">{t.services.subtitle}</p>
        </div>
      </section>

      {/* Services Grid */}
      <Services />

      {/* Why BOTech */}
      <WhyBOTech />

      {/* CTA */}
      <CTA />
    </Layout>
  );
}