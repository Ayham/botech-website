import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { Services } from '@/components/sections/Services';
import { WhyBOTech } from '@/components/sections/WhyBOTech';
import { CTA } from '@/components/sections/CTA';
import { useI18n } from '@/i18n';
import { pageSEO } from '@/config/seo';

export function ServicesPage() {
  const { locale } = useI18n();
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

      {/* Services Grid */}
      <Services />

      {/* Why BOTech */}
      <WhyBOTech />

      {/* CTA */}
      <CTA />
    </Layout>
  );
}