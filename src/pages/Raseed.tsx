import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { Section, Container, Badge } from '@/components/ui';
import { siteConfig } from '@/config/site';
import { useI18n } from '@/i18n';
import { ProductFeatures } from '@/components/product/ProductFeatures';
import { ProductHowItWorks } from '@/components/product/ProductHowItWorks';
import { ProductFAQ } from '@/components/product/ProductFAQ';
import { pageSEO } from '@/config/seo';
import { NavLink } from 'react-router-dom';

export function RaseedPage() {
  const { t, locale } = useI18n();
  const seo = locale === 'ar' ? pageSEO.raseed : pageSEO.raseedEn;
  const product = siteConfig.products.raseed;
  const [activeShot, setActiveShot] = useState(0);

  const phoneUrl =
    siteConfig.contact.whatsapp || siteConfig.contact.social.raseedFacebook;
  const ctaPrimaryHref = phoneUrl;
  const text = t.raseed;

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
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0f5fa 0%, #ffffff 100%)' }}>
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="max-w-xl">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={product.logo}
                  alt={product.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-md"
                  width="64"
                  height="64"
                />
                <Badge variant="success" size="md">{t.products.available}</Badge>
              </div>

              <h1 className="heading-1 text-neutral-900 mb-4">
                {product.name} <span className="text-primary-600">{locale === 'ar' ? `(${product.nameAr})` : '(Balance)'}</span>
              </h1>

              <p className="heading-3 text-primary-600 mb-4">
                {locale === 'ar' ? product.tagline.ar : product.tagline.en}
              </p>

              <p className="body-lg text-neutral-600 mb-8">{text.hero.description}</p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href={ctaPrimaryHref} target="_blank" rel="noopener noreferrer">
                  <span className="btn btn-primary w-full sm:w-auto inline-flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.82 9.82 0 001.51 5.26l-.999 3.648 3.978-1.05zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.867-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.258-.463-2.395-1.478-.886-.784-1.48-1.782-1.653-2.082-.173-.297-.019-.458.13-.606.134-.133.298-.347.446-.521.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.521.074-.793.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.064 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                    {text.hero.ctaDownload}
                  </span>
                </a>
                <NavLink to="/contact#form">
                  <span className="btn btn-outline w-full sm:w-auto inline-flex items-center gap-2">
                    {text.hero.ctaContact}
                  </span>
                </NavLink>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href={product.social?.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-neutral-600 hover:text-primary-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                  <span>{locale === 'ar' ? 'تابعنا على فيسبوك' : 'Follow us on Facebook'}</span>
                </a>
              </div>
            </div>

            {/* Phone mockup with real screenshot */}
            <div className="relative">
              <div className="relative aspect-[9/19] max-w-[280px] mx-auto bg-neutral-900 rounded-[40px] p-1.5 shadow-2xl">
                <div className="w-full h-full bg-neutral-100 rounded-[38px] overflow-hidden relative">
                  <img
                    src={product.screenshotsThumbs[0] || product.screenshots[0]}
                    alt={`${product.name} ${locale === 'ar' ? 'تطبيق' : 'app'}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="absolute -top-4 -right-4 lg:-right-8 hidden lg:block">
                <div className="bg-white rounded-xl shadow-lg p-4 w-56 border border-neutral-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900 text-sm">{locale === 'ar' ? 'يعمل بدون إنترنت' : 'Works Offline'}</p>
                      <p className="text-xs text-neutral-500">{locale === 'ar' ? 'بعد التفعيل' : 'After activation'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <Section size="md" background="white">
        <Container>
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {text.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="heading-3 text-primary-600 mb-1">{stat.value}</dd>
                <dd className="body-sm text-neutral-500">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* Why Choose */}
      <Section size="lg" background="neutral" id="why-choose">
        <Container>
          <div className="text-center mb-16">
            <h2 className="heading-2 text-neutral-900 mb-4">{text.whyChoose.title}</h2>
            <p className="body-lg text-neutral-600">{text.whyChoose.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {text.whyChoose.items.map((item, index) => (
              <div key={index} className="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="heading-4 text-neutral-900 mb-2">{item.title}</h3>
                <p className="body text-neutral-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Features */}
      <ProductFeatures productKey="raseed" />

      {/* How It Works */}
      <ProductHowItWorks productKey="raseed" />

      {/* Gallery: promotional album */}
      <Section id="gallery" size="lg" background="neutral">
        <Container>
          <div className="text-center mb-12">
            <h2 className="heading-2 text-neutral-900 mb-4">{text.screenshots}</h2>
            <p className="body-lg text-neutral-600">{text.screenshotsSubtitle}</p>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory" role="region" aria-label={text.screenshots}>
            {product.screenshots.map((image, index) => (
              <figure key={index} className="shrink-0 snap-start flex flex-col items-center">
                <button
                  onClick={() => setActiveShot(index)}
                  className={`relative w-56 sm:w-72 overflow-hidden rounded-2xl shadow-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                    activeShot === index ? 'ring-4 ring-primary-500' : 'hover:shadow-2xl'
                  }`}
                  aria-label={text.screenshotsItems[index]?.title || `${text.screenshots} ${index + 1}`}
                  aria-pressed={activeShot === index}
                >
                  <div className="aspect-[9/16] bg-neutral-100">
                    <img
                      src={image}
                      alt={text.screenshotsItems[index]?.title || `${text.screenshots} ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </button>
                <figcaption className="mt-3 text-sm sm:text-base font-medium text-neutral-700">
                  {text.screenshotsItems[index]?.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      {/* Videos */}
      <Section size="lg" background="white" id="videos">
        <Container>
          <div className="text-center mb-12">
            <h2 className="heading-2 text-neutral-900 mb-4">{text.videos.title}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
            {product.videos.map((video) => (
              <div key={video.src} className="flex flex-col items-center">
                <div className="w-full max-w-[300px] bg-neutral-900 rounded-[28px] p-1.5 shadow-xl">
                  <video
                    controls
                    preload="none"
                    poster={video.poster}
                    aria-label={locale === 'ar' ? video.title.ar : video.title.en}
                    className="w-full aspect-[9/16] rounded-[22px] bg-neutral-900 object-cover"
                  >
                    <source src={video.src} type="video/mp4" />
                    {locale === 'ar' ? 'متصفحك لا يدعم تشغيل الفيديو.' : 'Your browser does not support video playback.'}
                  </video>
                </div>
                <p className="mt-4 text-sm sm:text-base font-medium text-neutral-700 text-center">
                  {locale === 'ar' ? video.title.ar : video.title.en}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Comparison */}
      <Section size="lg" background="neutral" id="comparison">
        <Container>
          <div className="text-center mb-12">
            <h2 className="heading-2 text-neutral-900 mb-4">{text.comparison.title}</h2>
            <p className="body-lg text-neutral-600">{text.comparison.subtitle}</p>
          </div>

          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <caption className="sr-only">{text.comparison.title}</caption>
              <thead>
                <tr className="bg-white border border-neutral-200">
                  <th scope="col" className="px-4 py-4 font-semibold text-neutral-900">{locale === 'ar' ? 'المقارنة' : 'Comparison'}</th>
                  <th scope="col" className="px-4 py-4 font-semibold text-neutral-500">{text.comparison.manualHeader}</th>
                  <th scope="col" className="px-4 py-4 font-semibold text-primary-600 bg-primary-50">{text.comparison.appHeader}</th>
                </tr>
              </thead>
              <tbody>
                {text.comparison.rows.map((row, index) => (
                  <tr key={index} className={`border border-neutral-200 ${index % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'}`}>
                    <th scope="row" className="px-4 py-3 font-medium text-neutral-900">{row.label}</th>
                    <td className="px-4 py-3 text-neutral-500">{row.manual}</td>
                    <td className="px-4 py-3 text-primary-700 bg-primary-50/40 font-medium">{row.app}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* Pricing */}
      <Section size="lg" background="white" id="pricing">
        <Container>
          <div className="text-center mb-16">
            <h2 className="heading-2 text-neutral-900 mb-4">{text.pricing.title}</h2>
            <p className="body-lg text-neutral-600">{text.pricing.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {text.pricing.plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-2xl border-2 p-8 flex flex-col ${
                  'popular' in plan && (plan as any).popular
                    ? 'border-primary-500 shadow-xl scale-[1.02]'
                    : 'border-neutral-200'
                }`}
              >
                {'popular' in plan && (plan as any).popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-semibold bg-primary-600 text-white rounded-full">
                    {locale === 'ar' ? 'الأكثر شيوعاً' : 'Most Popular'}
                  </span>
                )}
                <h3 className="heading-4 text-neutral-900 mb-2">{plan.name}</h3>
                <p className="mb-6">
                  <span className="heading-2 text-primary-600">{plan.price}</span>
                  <span className="text-neutral-500"> {text.pricing.currency}</span>
                  <span className="text-neutral-400 text-sm"> {text.pricing.per}</span>
                </p>
                <p className="body text-neutral-600 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="body text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-center body-sm text-neutral-500 mt-8">
            {locale === 'ar'
              ? 'الأسعار دون إلزام، ولنا الحق في تعديل الأسعار مستقبلاً مع إبقاء تراخيصك النشطة سارية بمعدلها عند الشراء.'
              : 'Prices are not binding and may be adjusted in the future; active licenses remain at their purchase rate.'}
          </p>
        </Container>
      </Section>

      {/* FAQ */}
      <ProductFAQ productKey="raseed" />

      {/* Download / CTA */}
      <Section size="lg" background="primary" className="relative overflow-hidden" id="download">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>
        <Container>
          <div className="relative max-w-3xl mx-auto text-center">
            <h2 className="heading-2 text-white mb-4">{text.download.title}</h2>
            <p className="body-lg text-primary-100 mb-8">{text.download.subtitle}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={ctaPrimaryHref} target="_blank" rel="noopener noreferrer">
                <span className="btn btn-secondary inline-flex items-center gap-2 bg-white text-primary-600 hover:bg-primary-50">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.82 9.82 0 001.51 5.26l-.999 3.648 3.978-1.05zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.867-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.258-.463-2.395-1.478-.886-.784-1.48-1.782-1.653-2.082-.173-.297-.019-.458.13-.606.134-.133.298-.347.446-.521.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.521.074-.793.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.064 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                  {text.download.ctaPrimary}
                </span>
              </a>
              <NavLink to="/contact#form">
                <span className="btn btn-outline border-2 border-white/70 text-white hover:bg-white/10">
                  {text.download.ctaContact}
                </span>
              </NavLink>
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