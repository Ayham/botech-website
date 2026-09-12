import { useI18n } from '../../i18n';
import { siteConfig } from '../../config/site';
import { Card } from '../ui/Card';
import { Container } from '../ui/Container';
import { Section, SectionHeader } from '../ui/Section';
import { RevealStagger } from '../ui/Reveal';

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
          divider
        />
        
        <RevealStagger direction="up" delayStep={80} className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.key} variant="padded" hover interactive className="group h-full">
              <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-4 group-hover:bg-primary-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="heading-4 text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                {locale === 'ar' ? feature.title.ar : feature.title.en}
              </h3>
              <p className="body text-neutral-600 leading-relaxed">
                {locale === 'ar' ? feature.description.ar : feature.description.en}
              </p>
            </Card>
          ))}
        </RevealStagger>
      </Container>
    </Section>
  );
}