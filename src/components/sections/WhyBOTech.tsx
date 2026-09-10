import { useI18n } from '../../i18n';
import { siteConfig } from '../../config/site';
import { Card } from '../ui/Card';
import { Container } from '../ui/Container';
import { Section, SectionHeader } from '../ui/Section';

export function WhyBOTech() {
  const { t, locale } = useI18n();

  return (
    <Section size="lg" background="neutral">
      <Container>
        <SectionHeader
          title={t.whyBotech.title}
          subtitle={t.whyBotech.subtitle}
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.whyBotech.map((item, index) => (
            <Card key={item.key} variant="padded" hover className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="heading-4 text-neutral-900 mb-2">
                {locale === 'ar' ? item.title.ar : item.title.en}
              </h3>
              <p className="body text-neutral-600">
                {locale === 'ar' ? item.description.ar : item.description.en}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}