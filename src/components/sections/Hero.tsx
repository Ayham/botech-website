import { useI18n } from '../../i18n';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';

export function Hero() {
  const { t } = useI18n();

  return (
    <Section size="xl" background="transparent" className="relative overflow-hidden">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            {t.hero.scrollDown}
          </div>
          
          <h1 className="heading-1 text-neutral-900 mb-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
            {t.hero.title}
          </h1>
          
          <p className="body-lg text-neutral-600 mb-10 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
            {t.hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <Button size="lg" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
              {t.hero.ctaPrimary}
            </Button>
            <Button variant="outline" size="lg" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
              {t.hero.ctaSecondary}
            </Button>
          </div>
        </div>
      </Container>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30" />
      </div>
    </Section>
  );
}