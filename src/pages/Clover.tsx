import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { Section, SectionHeader, Container, Badge } from '@/components/ui';
import { siteConfig } from '@/config/site';
import { useI18n } from '@/i18n';
import { ProductFeatures } from '@/components/product/ProductFeatures';
import { ProductHowItWorks } from '@/components/product/ProductHowItWorks';
import { ProductScreenshots } from '@/components/product/ProductScreenshots';
import { ProductDownload } from '@/components/product/ProductDownload';
import { ProductFAQ } from '@/components/product/ProductFAQ';
import { pageSEO } from '@/config/seo';

export function CloverPage() {
  const { t, locale } = useI18n();
  const seo = locale === 'ar' ? pageSEO.clover : pageSEO.cloverEn;
  const product = siteConfig.products.clover;

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
                {t.clover.hero.subtitle}
              </span>
              <h1 className="heading-1 text-neutral-900 mb-6">{product.name}</h1>
              <p className="body-lg text-neutral-600 mb-8">{t.clover.hero.description}</p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href={product.downloadLinks.web} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full sm:w-auto">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  {t.clover.hero.ctaDemo}
                </a>
                <a href="/contact" className="btn btn-outline w-full sm:w-auto">{t.clover.hero.ctaContact}</a>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.platforms.map((platform) => (
                  <Badge key={platform} variant="primary">
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Dashboard Mockup */}
            <div className="relative">
              <div className="relative bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden max-w-2xl mx-auto">
                <div className="flex items-center gap-2 px-4 py-3 bg-neutral-50 border-b border-neutral-200">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="p-6 h-96 overflow-y-auto">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-4">{locale === 'ar' ? 'ملخص المبيعات اليوم' : 'Today\'s Sales Summary'}</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { label: locale === 'ar' ? 'إجمالي المبيعات' : 'Total Sales', value: '45,230', unit: locale === 'ar' ? 'ر.س' : 'SAR', color: 'primary' },
                          { label: locale === 'ar' ? 'عدد الفواتير' : 'Invoices', value: '127', unit: '', color: 'blue' },
                          { label: locale === 'ar' ? 'متوسط الفاتورة' : 'Avg. Order', value: '356', unit: locale === 'ar' ? 'ر.س' : 'SAR', color: 'green' },
                        ].map((stat, i) => (
                          <div key={i} className={`p-4 rounded-xl bg-${stat.color}-50`}>
                            <p className="text-sm text-neutral-500">{stat.label}</p>
                            <p className="text-2xl font-bold text-${stat.color}-600">{stat.value} <span className="text-lg font-normal">{stat.unit}</span></p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-4">{locale === 'ar' ? 'تنبيهات المخزون' : 'Inventory Alerts'}</h3>
                      <div className="space-y-3">
                        {[
                          { name: 'iPhone 15 Pro 256GB', qty: 3, min: 10 },
                          { name: 'Samsung Galaxy S24', qty: 7, min: 15 },
                          { name: 'AirPods Pro 2', qty: 0, min: 5 },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-neutral-50">
                            <div>
                              <p className="font-medium text-neutral-900">{item.name}</p>
                              <p className="text-sm text-neutral-500">{locale === 'ar' ? 'الحد الأدنى' : 'Min'}: {item.min}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${item.qty === 0 ? 'bg-red-100 text-red-700' : item.qty < item.min ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                              {item.qty} {locale === 'ar' ? 'قطعة' : 'pcs'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-4">{locale === 'ar' ? 'آخر المبيعات' : 'Recent Sales'}</h3>
                      <div className="space-y-3">
                        {[
                          { time: '14:32', customer: 'أحمد محمد', amount: '1,250', method: 'نقدي' },
                          { time: '14:15', customer: 'سارة علي', amount: '3,400', method: 'بطاقة' },
                          { time: '13:58', customer: 'محمد سالم', amount: '890', method: 'أجل' },
                        ].map((sale, i) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-neutral-50">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                              </div>
                              <div>
                                <p className="font-medium text-neutral-900 text-sm">{sale.customer}</p>
                                <p className="text-xs text-neutral-500">{sale.time}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-neutral-900">{sale.amount} {locale === 'ar' ? 'ر.س' : 'SAR'}</p>
                              <p className="text-xs text-neutral-500">{sale.method}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Modules */}
      <Section size="lg" background="neutral" id="modules">
        <Container>
          <SectionHeader
            title={t.clover.modules.title}
          />
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.clover.modules.items.map((module) => (
              <div key={module.name} className="card-padded group hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="heading-4 text-neutral-900 mb-2">{locale === 'ar' ? module.name : module.name}</h3>
                <p className="body text-neutral-600">{locale === 'ar' ? module.desc : module.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Features */}
      <ProductFeatures productKey="clover" />

      {/* How It Works */}
      <ProductHowItWorks productKey="clover" />

      {/* Screenshots */}
      <ProductScreenshots productKey="clover" />

      {/* Download */}
      <ProductDownload productKey="clover" />

      {/* FAQ */}
      <ProductFAQ productKey="clover" />

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