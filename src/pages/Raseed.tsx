import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { Section, Container, Button } from '@/components/ui';
import { siteConfig } from '@/config/site';
import { useI18n } from '@/i18n';
import { ProductFeatures } from '@/components/product/ProductFeatures';
import { ProductHowItWorks } from '@/components/product/ProductHowItWorks';
import { ProductScreenshots } from '@/components/product/ProductScreenshots';
import { ProductDownload } from '@/components/product/ProductDownload';
import { ProductFAQ } from '@/components/product/ProductFAQ';
import { pageSEO } from '@/config/seo';

export function RaseedPage() {
  const { t, locale } = useI18n();
  const seo = locale === 'ar' ? pageSEO.raseed : pageSEO.raseedEn;
  const product = siteConfig.products.raseed;

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
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0f5fa 0%, #ffffff 100%)' }}>
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t.raseed.hero.subtitle}
              </span>
              <h1 className="heading-1 text-neutral-900 mb-6">
                {product.name} <span className="text-primary-600">— {product.nameAr}</span>
              </h1>
              <p className="body-lg text-neutral-600 mb-8">{t.raseed.hero.description}</p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={product.downloadLinks.android} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="w-full sm:w-auto">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M6 0a6 6 0 0 0-6 6v12a6 6 0 0 0 6 6h12a6 6 0 0 0 6-6V6a6 6 0 0 0-6-6H6zm9.678 14.727c-.254.937-1.532.937-1.787 0l-1.534-5.677h-4.263v5.677c-.255.937-1.533.937-1.787 0-.254-.938.929-1.722 1.81-1.543l3.08-1.026c.884-.294 1.652.55 1.465 1.416l-1.455 6.614c-.148.674.529 1.245 1.205 1.078.41-.1.763-.382 1.045-.775l1.713-4.746h4.534l1.712 4.746c.283.393.636.675 1.045.775.676.167 1.353-.404 1.205-1.078l-1.455-6.614c-.187-.866.58-1.71 1.465-1.416l3.08 1.026c.88.18 2.063.964 1.809 1.542z"/>
                    </svg>
                    {t.raseed.hero.ctaDownload}
                  </Button>
                </a>
                <a href="/contact" className="btn btn-outline w-full sm:w-auto">{t.raseed.hero.ctaContact}</a>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="relative">
              <div className="relative aspect-[9/19] max-w-sm mx-auto bg-neutral-900 rounded-[40px] p-1.5 shadow-2xl">
                <div className="w-full h-full bg-neutral-100 rounded-[38px] flex items-center justify-center">
                  <div className="w-full h-full bg-neutral-50 rounded-[36px] flex items-center justify-center p-4">
                    <svg className="w-32 h-32 text-primary-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 lg:-right-8 hidden lg:block">
                <div className="bg-white rounded-xl shadow-lg p-4 w-56 border border-neutral-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900 text-sm">{locale === 'ar' ? 'تحويل فوري' : 'Instant Transfer'}</p>
                      <p className="text-xs text-neutral-500">{locale === 'ar' ? 'في ثوانٍ معدودة' : 'In seconds'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900 text-sm">{locale === 'ar' ? 'آمن ومشفر' : 'Secure & Encrypted'}</p>
                      <p className="text-xs text-neutral-500">{locale === 'ar' ? 'حماية PIN والبصمة' : 'PIN & Biometric'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <ProductFeatures productKey="raseed" />

      {/* How It Works */}
      <ProductHowItWorks productKey="raseed" />

      {/* Screenshots */}
      <ProductScreenshots productKey="raseed" />

      {/* Download */}
      <ProductDownload productKey="raseed" />

      {/* FAQ */}
      <ProductFAQ productKey="raseed" />

      {/* Back to Products */}
      <Section size="sm" background="neutral">
        <Container>
          <div className="text-center">
            <a href="/products" className="btn btn-ghost inline-flex items-center gap-2">
              <svg className="w-4 h-4 rtl-flip" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
              {locale === 'ar' ? 'العودة للمنتجات' : 'Back to Products'}
            </a>
          </div>
        </Container>
      </Section>
    </Layout>
  );
}