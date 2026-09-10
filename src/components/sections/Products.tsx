import { useI18n } from '../../i18n';
import { siteConfig } from '../../config/site';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Container } from '../ui/Container';
import { Section, SectionHeader } from '../ui/Section';
import { NavLink } from 'react-router-dom';

export function Products() {
  const { t, locale } = useI18n();

  return (
    <Section id="products" size="lg" background="white">
      <Container>
        <SectionHeader
          badge={t.products.title}
          title={t.products.title}
          subtitle={t.products.subtitle}
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Object.entries(siteConfig.products).map(([key, product], index) => (
            <Card key={key} variant="padded" hover className="flex flex-col h-full animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
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

              <p className="body text-neutral-600 mb-6 flex-grow">
                {locale === 'ar' ? product.shortDescription.ar : product.shortDescription.en}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {product.platforms.map((platform) => (
                  <Badge key={platform} variant="primary" size="sm">
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-neutral-200">
                <NavLink to={product.downloadLinks.android ? `/${key}` : '#'} className="text-center">
                  <Button variant="primary" fullWidth>
                    {t.products.exploreProduct}
                  </Button>
                </NavLink>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}