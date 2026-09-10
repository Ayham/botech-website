import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Container, Card, Button } from '@/components/ui';
import { siteConfig } from '@/config/site';
import { useI18n } from '@/i18n';
import { pageSEO } from '@/config/seo';

export function About() {
  const { t, locale } = useI18n();
  const seo = locale === 'ar' ? pageSEO.about : pageSEO.aboutEn;
  const founder = siteConfig.founder;

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

      {/* Hero Section */}
      <Section size="xl" background="neutral" className="relative">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 text-neutral-900 mb-6">{t.about.title}</h1>
            <p className="body-lg text-neutral-600">{t.about.subtitle}</p>
          </div>
        </Container>
      </Section>

      {/* Description */}
      <Section size="lg" background="white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <p className="body-lg text-neutral-600 mb-8">{t.about.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="heading-3 text-neutral-900 mb-4">{t.about.whatWeBuild}</h2>
                <ul className="space-y-3">
                  {t.about.whatWeBuildItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="body text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Founder Section */}
      <Section size="lg" background="neutral" id="founder">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12 items-start">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-sm font-medium bg-primary-100 text-primary-700 rounded-full">
                    {t.about.founder.experience}
                  </span>
                </div>
                <h2 className="heading-2 text-neutral-900">{t.about.founder.title}</h2>
                <h3 className="heading-3 text-primary-600">{founder.name[locale]}</h3>
                <p className="text-xl font-medium text-neutral-600">{founder.title[locale]}</p>
                <p className="body text-neutral-600">{founder.bio[locale]}</p>
              </div>
              
              <div className="lg:col-span-1">
                <Card variant="padded" className="sticky top-24">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-primary-100 flex items-center justify-center">
                      <svg className="w-16 h-16 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h4 className="heading-4 text-neutral-900 mb-1">{founder.name[locale]}</h4>
                    <p className="text-primary-600 font-medium mb-4">{founder.title[locale]}</p>
                    <p className="body-sm text-neutral-500 mb-6">{founder.experience} {locale === 'ar' ? 'في هندسة البرمجيات' : 'in software engineering'}</p>
                    <div className="border-t border-neutral-200 pt-4">
                      <p className="body-sm text-neutral-600">{locale === 'ar' ? 'قيادة تقنية شاملة' : 'Full-cycle technical leadership'}</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Methodology */}
      <Section size="lg" background="white" id="methodology">
        <Container>
          <SectionHeader
            title={t.about.methodology.title}
          />
          
          <div className="mt-16 relative">
            <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-primary-100" aria-hidden="true" />
            
            <div className="space-y-12">
              {t.about.methodology.steps.map((step) => (
                <div key={step.step} className="relative flex gap-6 lg:gap-10">
                  <div className="relative flex-shrink-0 w-16 h-16 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xl font-bold z-10">
                    {step.step}
                  </div>
                  
                  <div className="flex-1 pt-1">
                    <h3 className="heading-4 text-neutral-900 mb-2">{step.title}</h3>
                    <p className="body text-neutral-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section size="lg" background="primary" className="relative overflow-hidden">
        <Container>
          <div className="max-w-3xl mx-auto text-center relative">
            <h2 className="heading-2 text-white mb-4">{t.contact.cta}</h2>
            <p className="body-lg text-primary-100 mb-8">{t.contact.ctaDesc}</p>
            <Button variant="secondary" size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              {t.contact.form.title}
            </Button>
          </div>
        </Container>
      </Section>
    </Layout>
  );
}