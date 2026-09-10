import { useI18n } from '../../i18n';
import { siteConfig } from '../../config/site';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';

interface ProductScreenshotsProps {
  productKey: 'raseed' | 'clover';
}

export function ProductScreenshots({ productKey }: ProductScreenshotsProps) {
  const { t } = useI18n();
  const product = siteConfig.products[productKey];
  const screenshots = product.screenshots;

  if (!screenshots.length) return null;

  return (
    <Section id="screenshots" size="lg" background="neutral">
      <Container>
        <div className="text-center mb-12">
          <h2 className="heading-2 text-neutral-900 mb-4">{t[productKey].screenshots}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {screenshots.map((screenshot, index) => (
            <div key={index} className="relative aspect-[9/19] bg-neutral-100 rounded-xl overflow-hidden shadow-lg">
              <div className="absolute inset-0 flex items-center justify-center text-neutral-400 p-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="sr-only">{t[productKey].screenshots} {index + 1}</span>
              </div>
              {screenshot && (
                <img 
                  src={screenshot} 
                  alt={`${product.name} screenshot ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}