import { useI18n } from '../../i18n';
import { siteConfig } from '../../config/site';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Container } from '../ui/Container';
import { Section, SectionHeader } from '../ui/Section';
import { NavLink } from 'react-router-dom';
import { Reveal, RevealStagger } from '../ui/Reveal';

export function Products() {
  const { t, locale } = useI18n();

  return (
    <Section id="products" size="lg" background="white">
      <Container>
        <SectionHeader
          badge={t.products.title}
          title={t.products.subtitle}
          divider
        />

        <RevealStagger direction="up" delayStep={120} className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Object.entries(siteConfig.products).map(([key, product], index) => {
            const available = product.status === 'available';
            return (
              <Reveal key={key} delay={index * 120}>
                <Card key={key} variant="elevated" hover interactive className="flex flex-col h-full overflow-hidden group">
                  <div className="relative aspect-[4/3] bg-neutral-50 overflow-hidden">
                    {product.logo ? (
                      <img
                        src={product.logo}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-20 h-20 rounded-2xl bg-primary-100 text-primary-600 flex items-center justify-center">
                          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 16l4-16M6 9a4 4 0 014-4h2a4 4 0 014 4v11a2 2 0 01-2 2H6a2 2 0 01-2-2V9z" />
                          </svg>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Badge variant={available ? 'success' : 'warning'} size="sm" className="shadow-md">
                        {available ? t.products.available : t.products.comingSoon}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 flex flex-col flex-grow">
                    <div className="mb-4">
                      <h3 className="heading-3 text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                        {locale === 'ar' && 'nameAr' in product ? product.nameAr : product.name}
                      </h3>
                      <p className="body text-neutral-600">
                        {locale === 'ar' ? product.tagline.ar : product.tagline.en}
                      </p>
                    </div>

                    <p className="body text-neutral-600 mb-6 flex-grow leading-relaxed">
                      {locale === 'ar' ? product.shortDescription.ar : product.shortDescription.en}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mb-6">
                      {product.platforms.map((platform) => (
                        <Badge key={platform} variant="primary" size="sm">
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-auto pt-4 border-t border-neutral-200">
                      <NavLink to={`/${key}`} className="block w-full">
                        <Button variant="primary" fullWidth className="group">
                          {t.products.exploreProduct}
                          <svg className="w-4 h-4 rtl-flip transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Button>
                      </NavLink>
                    </div>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </RevealStagger>
      </Container>
    </Section>
  );
}