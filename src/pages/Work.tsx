import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { Work } from '@/components/sections/Work';
import { CTA } from '@/components/sections/CTA';
import { Section, Container } from '@/components/ui';
import { useI18n } from '@/i18n';
import { pageSEO } from '@/config/seo';

export function WorkPage() {
  const { t, locale } = useI18n();
  const seo = locale === 'ar' ? pageSEO.work : pageSEO.workEn;

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

      {/* Work Grid */}
      <Work showHeader={false} />

      {/* Additional Projects Note */}
      <Section size="md" background="neutral">
        <Container>
          <div className="text-center">
            <p className="body text-neutral-600 mb-6">
              {locale === 'ar' 
                ? 'مشاريع أخرى قيد التطوير. تواصل معنا لمعرفة المزيد.' 
                : 'More projects in development. Contact us to learn more.'
              }
            </p>
            <a href="/contact#form" className="btn btn-primary inline-flex">
              {t.common.contactUs}
            </a>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <CTA />
    </Layout>
  );
}