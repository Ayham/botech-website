import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Container, Card, Button } from '@/components/ui';
import { siteConfig } from '@/config/site';
import { useI18n } from '@/i18n';
import { pageSEO } from '@/config/seo';
import { Reveal, RevealStagger } from '@/components/ui/Reveal';
import { OrbitBackground } from '@/components/ui/OrbitBackground';

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

      {/* Company Introduction */}
      <Section size="xl" background="primary" className="relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-700 rounded-full blur-3xl opacity-10" />
        </div>

        <OrbitBackground variant="about" />
        
        <Container>
          <RevealStagger direction="up" delayStep={100} className="max-w-4xl mx-auto text-center relative">
            <Reveal>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium mb-6 border border-white/20 backdrop-blur-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                About BOTech
              </span>
            </Reveal>
            
            <Reveal delay={100}>
              <h1 className="heading-1 text-white mb-6">{t.about.title}</h1>
            </Reveal>
            
            <Reveal delay={200}>
              <p className="body-lg text-primary-100 mb-8 max-w-2xl mx-auto text-balance">
                {locale === 'ar'
                  ? 'نحن في بلو أوربيت، نؤمن بأن التقنية أداة عملية لحل المشكلات الحقيقية، وليست غاية بحد ذاتها. ومنذ تأسيسنا، نلتزم بتحويل الأفكار إلى حلول تقنية ملموسة تلبي احتياجات الأعمال الحقيقية.'
                  : 'At Blue Orbit Technologies, we believe technology should be a practical tool for solving real problems, not an end in itself. Since our founding, we have been committed to transforming ideas into concrete solutions that serve real business needs.'}
              </p>
            </Reveal>
            
            <Reveal delay={300}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  aria-label={t.contact.info.email}
                  title={siteConfig.contact.email}
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
                <a
                  href={`tel:+${siteConfig.contact.phoneRaw}`}
                  aria-label={t.contact.info.phone}
                  title={siteConfig.contact.phone}
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
              </div>
            </Reveal>
          </RevealStagger>
        </Container>
      </Section>

      {/* Description */}
      <Section size="lg" background="white">
        <Container>
          <RevealStagger direction="up" delayStep={100} className="max-w-3xl mx-auto">
            <Reveal>
              <p className="body-lg text-neutral-600 mb-8 text-balance">{t.about.description}</p>
            </Reveal>
            
            <Reveal delay={100}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="heading-3 text-neutral-900 mb-4">{t.about.whatWeBuild}</h2>
                  <ul className="space-y-3">
                    {t.about.whatWeBuildItems.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 group">
                        <div className="w-8 h-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="body text-neutral-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </RevealStagger>
        </Container>
      </Section>

      {/* Founder Section */}
      <Section size="lg" background="neutral" id="founder">
        <Container>
          <RevealStagger direction="up" delayStep={100} className="max-w-4xl mx-auto">
            <Reveal>
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
                  <p className="body text-neutral-600 leading-relaxed">{founder.bio[locale]}</p>
                </div>
                
                <Reveal delay={200} direction="right">
                  <div className="lg:col-span-1">
                    <Card variant="padded" className="sticky top-24 group">
                      <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-primary-100 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                          <svg className="w-16 h-16 text-primary-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
                </Reveal>
              </div>
            </Reveal>
          </RevealStagger>
        </Container>
      </Section>

      {/* Methodology */}
      <Section size="lg" background="white" id="methodology">
        <Container>
          <SectionHeader
            title={t.about.methodology.title}
            divider
          />
          
          <RevealStagger direction="up" delayStep={100} className="mt-16 relative">
            <Reveal>
              <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-primary-100" aria-hidden="true" />
            </Reveal>
            
            <Reveal delay={100}>
              <div className="space-y-12">
                {t.about.methodology.steps.map((step) => (
                  <div key={step.step} className="relative flex gap-6 lg:gap-10 group">
                    <div className="relative flex-shrink-0 w-16 h-16 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xl font-bold z-10 group-hover:bg-primary-600 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                      {step.step}
                    </div>
                    
                    <div className="flex-1 pt-1">
                      <h3 className="heading-4 text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">{step.title}</h3>
                      <p className="body text-neutral-600 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </RevealStagger>
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
          <RevealStagger direction="up" delayStep={100} className="max-w-3xl mx-auto text-center relative">
            <Reveal>
              <h2 className="heading-2 text-white mb-4">{t.contact.cta}</h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="body-lg text-primary-100 mb-8">{t.contact.ctaDesc}</p>
            </Reveal>
            <Reveal delay={200}>
              <Button variant="secondary" size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="group">
                {t.contact.form.title}
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </Reveal>
          </RevealStagger>
        </Container>
      </Section>
    </Layout>
  );
}