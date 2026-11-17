import { Layout } from '@/components/layout/Layout';
import { Section, Container, Card, Badge } from '@/components/ui';
import { siteConfig } from '@/config/site';
import { useI18n } from '@/i18n';
import { pageSEO } from '@/config/seo';
import { NavLink } from 'react-router-dom';
import { OrbitBackground } from '@/components/ui/OrbitBackground';
import { JsonLd } from '@/components/ui/JsonLd';
import { breadcrumbJsonLd } from '@/config/structured-data';
import { ProductDownloads } from '@/components/product/ProductDownloads';

export function ProductsPage() {
  const { t, locale } = useI18n();
  const seo = locale === 'ar' ? pageSEO.products : pageSEO.productsEn;

  return (
    <Layout
      title={seo.title}
      description={seo.description}
      canonical={seo.canonical}
      noIndex={seo.noIndex}
    >
      <JsonLd
        data={breadcrumbJsonLd([
          { label: siteConfig.navigation.main[0].label[locale], href: '/' },
          { label: siteConfig.navigation.main.find((n) => n.key === 'products')!.label[locale], href: '/products' },
        ])}
      />

      {/* Products Grid */}
      <h1 className="sr-only">{siteConfig.navigation.main.find((n) => n.key === 'products')!.label[locale]}</h1>
      <Section size="lg" background="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {Object.entries(siteConfig.products).map(([key, product], index) => {
              const available = product.status === 'available';
              return (
                <Card key={key} variant="padded" hover className="flex flex-col h-full animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                  {product.logo && (
                    <div className="flex items-start gap-4 mb-6">
                      <img
                        src={product.logo}
                        alt={product.name}
                        className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                        loading="lazy"
                      />
                      <div>
                        <h3 className="heading-3 text-neutral-900">
                          {locale === 'ar' && 'nameAr' in product ? product.nameAr : product.name}
                        </h3>
                        <p className="body text-neutral-600 mt-1">
                          {locale === 'ar' ? product.tagline.ar : product.tagline.en}
                        </p>
                      </div>
                    </div>
                  )}
                  {!product.logo && (
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-16 h-16 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 16l4-16M6 9a4 4 0 014-4h2a4 4 0 014 4v11a2 2 0 01-2 2H6a2 2 0 01-2-2V9z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="heading-3 text-neutral-900">
                          {locale === 'ar' && 'nameAr' in product ? product.nameAr : product.name}
                        </h3>
                        <p className="body text-neutral-600 mt-1">
                          {locale === 'ar' ? product.tagline.ar : product.tagline.en}
                        </p>
                      </div>
                    </div>
                  )}

                  <p className="body text-neutral-600 mb-6 flex-grow">
                    {locale === 'ar' ? product.shortDescription.ar : product.shortDescription.en}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <Badge
                      variant={available ? 'success' : 'warning'}
                      size="sm"
                    >
                      {available ? t.products.available : t.products.comingSoon}
                    </Badge>
                    {product.platforms.length > 0 && product.platforms.map((platform) => (
                      <Badge key={platform} variant="primary" size="sm">
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-col gap-4 mt-auto pt-4 border-t border-neutral-200">
                    <ProductDownloads downloadLinks={product.downloadLinks} />
                    <NavLink to={`/${key}`}>
                      <span className="btn btn-primary w-full text-center">{t.products.exploreProduct}</span>
                    </NavLink>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section size="lg" background="primary" className="relative overflow-hidden">
        <OrbitBackground variant="cta" />
        <Container>
          <div className="max-w-3xl mx-auto text-center relative">
            <h2 className="heading-2 text-white mb-4">{t.contact.cta}</h2>
            <p className="body-lg text-primary-100 mb-8">{t.contact.ctaDesc}</p>
            <NavLink to="/contact#form">
              <span className="btn btn-secondary inline-flex items-center gap-2">{t.common.contactUs}</span>
            </NavLink>
          </div>
        </Container>
      </Section>
    </Layout>
  );
}