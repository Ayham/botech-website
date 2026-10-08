import { ReactNode } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Section, Container, Card, Badge, Button, Reveal, RevealStagger } from '@/components/ui';
import { siteConfig } from '@/config/site';
import { useI18n } from '@/i18n';
import { pageSEO } from '@/config/seo';
import { NavLink } from 'react-router-dom';
import { OrbitBackground } from '@/components/ui/OrbitBackground';
import { JsonLd } from '@/components/ui/JsonLd';
import { breadcrumbJsonLd, softwareAppJsonLd } from '@/config/structured-data';

const LIVE_APP_URL = 'https://clover.botech-live.com/';

const featureIcons: Record<string, ReactNode> = {
  'fast-sales': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 2v6h6" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 13H8M16 17H8" />
    </svg>
  ),
  inventory: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.27 6.96 12 12.01 20.73 6.96" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 22.08V12" />
    </svg>
  ),
  'customers-debts': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  currencies: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M1 10h22" />
    </svg>
  ),
  reports: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M23 6l-9.5 9.5-5-5L1 18" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 6h6v6" />
    </svg>
  ),
  offline: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
    </svg>
  ),
};

const offlineStepIcons: ReactNode[] = [
  (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
];

const offlineStepStyles = [
  'bg-amber-100 text-amber-600',
  'bg-emerald-100 text-emerald-600',
  'bg-primary-100 text-primary-600',
];

export function CloverPage() {
  const { t, locale } = useI18n();
  const seo = locale === 'ar' ? pageSEO.clover : pageSEO.cloverEn;
  const product = siteConfig.products.clover;
  const text = t.clover as any;
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  const featureList = Array.isArray(product.features) ? product.features : [];
  const storeTypeList = Array.isArray(product.storeTypes) ? product.storeTypes : [];
  const offlineSteps = Array.isArray(text.offline?.points)
    ? text.offline.points
    : Array.isArray(text.offline?.steps)
      ? text.offline.steps
      : [];
  const pricingPlans = Array.isArray(text.pricing?.plans) ? text.pricing.plans : [];

  const whatsappUrl = siteConfig.contact.whatsapp
    ? `https://wa.me/${siteConfig.contact.whatsapp.replace('+', '')}?text=${encodeURIComponent(
        locale === 'ar'
          ? 'مرحبًا، أريد تجربة Clover Flow POS'
          : 'Hi, I want to try Clover Flow POS'
      )}`
    : '/contact#form';

  return (
    <Layout
      title={seo.title}
      description={seo.description}
      canonical={seo.canonical}
      ogImage={seo.ogImage}
    >
      <JsonLd
        data={breadcrumbJsonLd([
          { label: siteConfig.navigation.main[0].label[locale], href: '/' },
          { label: siteConfig.navigation.main.find((n) => n.key === 'products')!.label[locale], href: '/products' },
          { label: product.name, href: '/clover' },
        ])}
      />
      <JsonLd
        data={softwareAppJsonLd({
          name: product.name,
          url: '/clover',
          image: product.logo,
          description: locale === 'ar' ? product.description.ar : product.description.en,
          operatingSystem: 'Android, Web',
          offersPrice: 150,
          offersCurrency: 'USD',
        })}
      />

      {/* Hero */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-neutral-900 text-white">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
        </div>
        <OrbitBackground variant="dark" />
        <Container>
          <RevealStagger direction="up" delayStep={100} className="relative max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <img
                src={product.logo}
                alt={product.name}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover shadow-xl ring-4 ring-white/10"
                width="112"
                height="112"
              />
            </div>

            <Badge variant="primary" size="md" className="mb-6">
              <span className="relative flex h-2 w-2 mr-2 rtl:mr-0 rtl:ml-2">
                <span className="animate-pulse-soft inline-flex h-full w-full absolute inset-0 rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {text.hero?.badge || (locale === 'ar' ? 'نظام نقاط بيع احترافي' : 'Professional POS System')}
            </Badge>

            <h1 className="heading-1 text-white mb-4">{product.name}</h1>
            <p className="heading-3 text-primary-300 mb-4">
              {locale === 'ar' ? product.tagline.ar : product.tagline.en}
            </p>
            <p className="body-lg text-neutral-300 mb-8 max-w-3xl mx-auto">
              {text.hero?.description || (locale === 'ar' ? product.shortDescription?.ar : product.shortDescription?.en)}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <NavLink to="/contact#form">
                <Button size="lg" variant="light">
                  {text.hero?.ctaPrimary || (locale === 'ar' ? 'ابدأ الآن' : 'Get Started')}
                </Button>
              </NavLink>
              <a href={LIVE_APP_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-2 border-white/70 text-white hover:bg-white/10">
                  {text.hero?.ctaSecondary || (locale === 'ar' ? 'جرّب Clover' : 'Try Clover')}
                </Button>
              </a>
            </div>
            {text.hero?.trialNote && (
              <p className="text-sm text-neutral-400">{text.hero.trialNote}</p>
            )}
          </RevealStagger>
        </Container>
      </section>

      {/* Launch Offer */}
      <Section size="lg" background="white" id="launch-offer">
        <Container>
          <Reveal className="text-center mb-12">
            <Badge variant="warning" size="md" className="mb-4">
              {text.launch?.badge || (locale === 'ar' ? 'عرض الإطلاق' : 'Launch Offer')}
            </Badge>
            <h2 className="heading-2 text-neutral-900 mb-4">
              {text.launch?.title || (locale === 'ar' ? 'عرض البداية السنوي' : 'Annual Starter Bundle')}
            </h2>
            <p className="body-lg text-neutral-600 max-w-2xl mx-auto">
              {text.launch?.subtitle || (locale === 'ar' ? 'احصل على كل ما تحتاجه لبدء متجرك مباشرةً' : 'Get everything you need to start your store right away')}
            </p>
          </Reveal>

          <Reveal delay={150} className="max-w-3xl mx-auto">
            <Card variant="elevated" className="border-2 border-primary-200 bg-gradient-to-br from-primary-50/50 to-white p-8">
              <div className="text-center mb-8">
                <h3 className="heading-3 text-neutral-900 mb-4">
                  {text.launch?.bundleTitle || (locale === 'ar' ? 'حزمة البداية السنوية' : 'Annual Starter Bundle')}
                </h3>
                <div className="flex items-baseline justify-center gap-4 mb-2" dir={dir}>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold text-neutral-400 line-through">${text.launch?.oldPrice || '150'}</span>
                    {typeof text.launch?.compare === 'string' && (
                      <span className="text-xs text-neutral-500">{text.launch.compare}</span>
                    )}
                  </div>
                  <span className="text-5xl font-bold text-primary-600">${text.launch?.price || '150'}</span>
                  <span className="text-lg text-neutral-600">{locale === 'ar' ? 'دولار أمريكي' : 'USD'}</span>
                </div>
                {typeof text.launch?.priceNote === 'string' && (
                  <p className="text-sm text-neutral-500 mb-4">{text.launch.priceNote}</p>
                )}
                <p className="body text-neutral-600 mb-6">
                  {text.launch?.savings || (locale === 'ar' ? 'تشمل قارئ الباركود والطابعة مجاناً — بنفس سعر الاشتراك السنوي لوحده' : 'Barcode reader and thermal printer included free — same price as the one-year subscription alone')}
                </p>
                <Badge variant="primary" size="md">
                  {text.launch?.highlight || (locale === 'ar' ? 'الأكثر قيمة' : 'Best Value')}
                </Badge>
              </div>

              {typeof text.launch?.includes === 'string' && (
                <p className="text-sm font-semibold text-neutral-500 mb-4">{text.launch.includes}</p>
              )}
              <div className="space-y-4 mb-8">
                {(Array.isArray(text.launch?.includes)
                  ? text.launch.includes
                  : [
                      { text: locale === 'ar' ? 'قارئ باركود' : 'Barcode Reader' },
                      { text: locale === 'ar' ? 'طابعة حرارية' : 'Thermal Printer' },
                      { text: locale === 'ar' ? 'اشتراك Clover Flow POS لمدة سنة كاملة' : '1-Year Clover Flow POS Subscription' },
                    ]
                ).map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-3" dir={dir}>
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="body text-neutral-700">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <NavLink to="/contact#form" className="w-full sm:w-auto">
                  <Button size="lg" variant="primary" className="w-full sm:w-auto">
                    {text.launch?.cta || text.launch?.ctaPrimary || (locale === 'ar' ? 'احصل على العرض' : 'Get This Offer')}
                  </Button>
                </NavLink>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    {text.launch?.ctaSecondary || (locale === 'ar' ? 'استفسر عبر واتساب' : 'Inquire on WhatsApp')}
                  </Button>
                </a>
              </div>
              {text.launch?.note && (
                <p className="text-sm text-neutral-500 text-center mt-4">{text.launch.note}</p>
              )}
            </Card>
          </Reveal>
        </Container>
      </Section>

      {/* Why Clover */}
      <Section size="lg" background="neutral" id="why">
        <Container>
          <Reveal className="text-center mb-16">
            <h2 className="heading-2 text-neutral-900 mb-4">
              {text.why?.title || (locale === 'ar' ? 'لماذا Clover Flow POS؟' : 'Why Clover Flow POS?')}
            </h2>
            <p className="body-lg text-neutral-600 max-w-2xl mx-auto">
              {text.why?.subtitle || (locale === 'ar' ? 'صُمم خصيصاً لاحتياجات أصحاب المتاجر السورية' : 'Built specifically for Syrian store owners')}
            </p>
          </Reveal>

          <RevealStagger direction="up" delayStep={100} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureList.map((feature: any, idx: number) => (
              <Card key={feature.key || idx} variant="padded" hover className="group h-full">
                <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-4 group-hover:bg-primary-600 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                  {featureIcons[feature.key] || featureIcons['fast-sales']}
                </div>
                <h3 className="heading-4 text-neutral-900 mb-2">
                  {locale === 'ar' ? feature.title.ar : feature.title.en}
                </h3>
                <p className="body text-neutral-600">
                  {locale === 'ar' ? feature.description.ar : feature.description.en}
                </p>
              </Card>
            ))}
          </RevealStagger>
        </Container>
      </Section>

      {/* Store Types */}
      {storeTypeList.length > 0 && (
        <Section size="lg" background="white" id="store-types">
          <Container>
            <Reveal className="text-center mb-12">
              <h2 className="heading-2 text-neutral-900 mb-4">
                {text.forYou?.title || (locale === 'ar' ? 'مناسب لأي نوع من المتاجر' : 'Perfect For Any Store Type')}
              </h2>
              <p className="body-lg text-neutral-600">
                {text.forYou?.subtitle || (locale === 'ar' ? 'صُمم ليلائم مختلف الأنشطة التجارية' : 'Designed to fit various business types')}
              </p>
            </Reveal>
            <RevealStagger direction="up" delayStep={60} className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
              {storeTypeList.map((type: any, idx: number) => (
                <Badge
                  key={type.key || idx}
                  variant="neutral"
                  size="md"
                  className="px-4 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  {type.label?.[locale] ?? type.label?.en}
                </Badge>
              ))}
            </RevealStagger>
          </Container>
        </Section>
      )}

      {/* How It Works */}
      <Section size="lg" background="neutral" id="how-it-works">
        <Container>
          <Reveal className="text-center mb-16">
            <h2 className="heading-2 text-neutral-900 mb-4">
              {text.how?.title || (locale === 'ar' ? 'كيف يعمل Clover Flow POS؟' : 'How Does Clover Flow POS Work?')}
            </h2>
            <p className="body-lg text-neutral-600">
              {text.how?.subtitle || (locale === 'ar' ? 'خطوات بسيطة لبدء إدارة متجرك' : 'Simple steps to start managing your store')}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-neutral-200 -z-0" aria-hidden="true" />
            {((Array.isArray(text.how?.steps)?text.how.steps:[])).map((step: any, idx: number) => (
              <Reveal key={idx} delay={idx * 150}>
                <div className="relative flex flex-col items-center text-center group">
                  <div className="relative flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-primary-600 text-white flex items-center justify-center text-2xl lg:text-3xl font-bold z-10 group-hover:bg-primary-700 group-hover:scale-110 transition-all duration-300 shadow-lg mb-6">
                    {idx + 1}
                  </div>
                  <h3 className="heading-4 text-neutral-900 mb-2">{step.title}</h3>
                  <p className="body text-neutral-600">{step.description || step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Offline-First */}
      <Section size="lg" background="white" id="offline">
        <Container>
          <Reveal className="text-center mb-16">
            <h2 className="heading-2 text-neutral-900 mb-4">
              {text.offline?.title || (locale === 'ar' ? 'يعمل بدون إنترنت - Offline-First' : 'Works Offline - Offline-First')}
            </h2>
            <p className="body-lg text-neutral-600 max-w-2xl mx-auto">
              {text.offline?.subtitle || (locale === 'ar' ? 'استمر في البيع حتى لو انقطع الإنترنت، ثم تتم المزامنة تلقائياً عند عودته' : 'Continue selling even if internet drops, auto-sync when back online')}
            </p>
          </Reveal>

          <RevealStagger direction="up" delayStep={100} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offlineSteps.map((point: any, idx: number) => (
              <Card key={idx} variant="padded" className="text-center h-full">
                <div className={`w-14 h-14 rounded-2xl ${offlineStepStyles[idx] || 'bg-emerald-100 text-emerald-600'} flex items-center justify-center mx-auto mb-4 transition-colors duration-300`}>
                  {offlineStepIcons[idx] || offlineStepIcons[0]}
                </div>
                <h3 className="heading-4 text-neutral-900 mb-2">{point.title}</h3>
                <p className="body text-neutral-600">{point.description || point.desc}</p>
              </Card>
            ))}
          </RevealStagger>
        </Container>
      </Section>

      {/* Screenshots */}
      {product.screenshots && product.screenshots.length > 0 && (
        <Section size="lg" background="neutral" id="screenshots">
          <Container>
            <div className="text-center mb-16">
              <h2 className="heading-2 text-neutral-900 mb-4">
                {text.screenshots?.title || (locale === 'ar' ? 'لقطات شاشة من التطبيق' : 'App Screenshots')}
              </h2>
              <p className="body-lg text-neutral-600">
                {text.screenshots?.subtitle || (locale === 'ar' ? 'شاهد واجهة التطبيق مباشرة' : 'See the app interface in action')}
              </p>
            </div>
          </Container>
        </Section>
      )}

      {/* Pricing */}
      <Section size="lg" background="white" id="pricing">
        <Container>
          <Reveal className="text-center mb-16">
            <h2 className="heading-2 text-neutral-900 mb-4">
              {text.pricing?.title || (locale === 'ar' ? 'خطط الاشتراك' : 'Subscription Plans')}
            </h2>
            <p className="body-lg text-neutral-600 max-w-2xl mx-auto">
              {text.pricing?.subtitle || (locale === 'ar' ? 'اختر الخطة الأنسب لعملك' : 'Choose the plan that fits your business')}
            </p>
          </Reveal>

          <RevealStagger direction="up" delayStep={100} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              {
                name: pricingPlans[0]?.name || (locale === 'ar' ? 'سنة واحدة' : '1 Year'),
                price: pricingPlans[0]?.price || '150',
                popular: true,
                features: [
                  locale === 'ar' ? 'اشتراك كامل لمدة 12 شهر' : 'Full access for 12 months',
                  locale === 'ar' ? 'تحديثات التطبيق' : 'App updates',
                  locale === 'ar' ? 'دعم فني' : 'Technical support',
                ],
              },
              {
                name: pricingPlans[1]?.name || (locale === 'ar' ? 'سنتان' : '2 Years'),
                price: pricingPlans[1]?.price || '160',
                popular: false,
                features: [
                  locale === 'ar' ? 'اشتراك كامل لمدة 24 شهر' : 'Full access for 24 months',
                  locale === 'ar' ? 'توفير أفضل' : 'Better savings',
                  locale === 'ar' ? 'تحديثات ودعم مستمر' : 'Continuous updates & support',
                ],
              },
              {
                name: pricingPlans[2]?.name || (locale === 'ar' ? '3 سنوات' : '3 Years'),
                price: pricingPlans[2]?.price || '180',
                popular: false,
                features: [
                  locale === 'ar' ? 'اشتراك كامل لمدة 36 شهر' : 'Full access for 36 months',
                  locale === 'ar' ? 'أقصى توفير' : 'Maximum savings',
                  locale === 'ar' ? 'أفضل قيمة على المدى الطويل' : 'Best long-term value',
                ],
              },
              {
                name: pricingPlans[3]?.name || (locale === 'ar' ? 'مخصص' : 'Custom'),
                price: pricingPlans[3]?.price || (locale === 'ar' ? 'تواصل معنا' : 'Contact Us'),
                popular: false,
                features: [
                  locale === 'ar' ? 'للمتاجر متعددة الفروع' : 'For multi-branch stores',
                  locale === 'ar' ? 'متطلبات خاصة' : 'Custom requirements',
                  locale === 'ar' ? 'عرض مخصص' : 'Custom quote',
                ],
                isCustom: true,
              },
            ].map((plan: any, idx: number) => (
              <div key={idx} className="relative h-full">
                {plan.popular && (
                  <div className="absolute -top-4 left-0 right-0 z-10 flex justify-center">
                    <Badge variant="primary" size="md">
                      {text.pricing?.mostPopular || text.pricing?.recommended || (locale === 'ar' ? 'الأكثر شعبية' : 'Most Popular')}
                    </Badge>
                  </div>
                )}
                <Card
                  variant="elevated"
                  className={`h-full p-8 ${plan.popular ? 'border-2 border-primary-500 shadow-xl scale-[1.02]' : ''}`}
                >
                  <div className="text-center mb-8">
                    <h3 className="heading-4 text-neutral-900 mb-4">{plan.name}</h3>
                    <div className="mb-2">
                      <span className={plan.isCustom ? 'text-3xl lg:text-4xl font-bold text-neutral-900' : 'text-4xl lg:text-5xl font-bold text-neutral-900'}>
                        {plan.isCustom ? plan.price : `$${plan.price}`}
                      </span>
                    </div>
                    {!plan.isCustom && (
                      <>
                        <p className="text-sm text-neutral-500">
                          {locale === 'ar' ? 'الدفعة الأولى — تشمل المدة كاملة' : 'First payment — covers the full term'}
                        </p>
                        <p className="text-sm font-medium text-primary-600 mt-1">
                          {text.pricing?.renewal || (locale === 'ar' ? 'ثم $20 سنوياً بعد انتهاء المدة' : 'Then $20/year after the term ends')}
                        </p>
                      </>
                    )}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature: string, fIdx: number) => (
                      <li key={fIdx} className="flex items-start gap-2" dir={dir}>
                        <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-neutral-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <NavLink to="/contact#form" className="block">
                    <Button variant={plan.popular ? 'primary' : 'outline'} size="lg" className="w-full">
                      {plan.isCustom
                        ? text.pricing?.customCta || (locale === 'ar' ? 'تواصل معنا' : 'Contact Us')
                        : text.pricing?.cta || (locale === 'ar' ? 'اختر الخطة' : 'Choose Plan')}
                    </Button>
                  </NavLink>
                </Card>
              </div>
            ))}
          </RevealStagger>
          {text.pricing?.note && (
            <p className="text-center text-sm text-neutral-500 mt-8 max-w-3xl mx-auto">{text.pricing.note}</p>
          )}
        </Container>
      </Section>

      {/* Final CTA */}
      <Section size="lg" background="primary" className="relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>
        <OrbitBackground variant="cta" />
        <Container>
          <RevealStagger direction="up" delayStep={100} className="relative max-w-3xl mx-auto text-center">
            <h2 className="heading-2 text-white mb-4">
              {text.finalCta?.title || (locale === 'ar' ? 'جاهز لإدارة متجرك بطريقة أبسط؟' : 'Ready to Manage Your Store Smarter?')}
            </h2>
            <p className="body-lg text-primary-100 mb-8">
              {text.finalCta?.subtitle || (locale === 'ar' ? 'ابدأ مع Clover Flow POS واجعل المبيعات والمخزون وحسابات متجرك في مكان واحد' : 'Start with Clover Flow POS and keep sales, inventory, and accounts in one place')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <NavLink to="/contact#form">
                <Button size="lg" variant="light">
                  {text.finalCta?.cta || text.finalCta?.ctaPrimary || (locale === 'ar' ? 'ابدأ الآن' : 'Get Started Now')}
                </Button>
              </NavLink>
              <a href={LIVE_APP_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-2 border-white/70 text-white hover:bg-white/10">
                  {text.finalCta?.ctaSecondary || (locale === 'ar' ? 'جرّب Clover' : 'Try Clover')}
                </Button>
              </a>
            </div>
          </RevealStagger>
        </Container>
      </Section>

      {/* Back to Products */}
      <Section size="sm" background="white">
        <Container>
          <div className="text-center">
            <NavLink to="/products" className="btn btn-ghost inline-flex items-center gap-2">
              <svg className="w-4 h-4 rtl-flip" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {text.backToProducts || (locale === 'ar' ? 'العودة إلى المنتجات' : 'Back to Products')}
            </NavLink>
          </div>
        </Container>
      </Section>
    </Layout>
  );
}
