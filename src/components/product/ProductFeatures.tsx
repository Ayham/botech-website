import { useI18n } from '../../i18n';
import { siteConfig } from '../../config/site';
import { Card } from '../ui/Card';
import { Container } from '../ui/Container';
import { Section, SectionHeader } from '../ui/Section';

interface ProductFeatureProps {
  productKey: 'raseed' | 'clover';
}

export function ProductFeatures({ productKey }: ProductFeatureProps) {
  const { t, locale } = useI18n();
  const product = siteConfig.products[productKey];
  const features = product.features;

  return (
    <Section id="features" size="lg" background="neutral">
      <Container>
        <SectionHeader
          title={t[productKey].features.title}
        />
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={feature.key} variant="padded" hover className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="heading-4 text-neutral-900 mb-2">
                {locale === 'ar' ? feature.title.ar : feature.title.en}
              </h3>
              <p className="body text-neutral-600">
                {locale === 'ar' ? feature.description.ar : feature.description.en}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}