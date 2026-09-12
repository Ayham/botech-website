import { useI18n } from '../../i18n';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Reveal, RevealStagger } from '../ui/Reveal';

export function Hero() {
  const { t } = useI18n();

  return (
    <Section size="xl" background="gradient" className="relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-100 rounded-full blur-3xl opacity-50 animate-pulse-soft" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30 animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-50 rounded-full blur-3xl opacity-20" />
      </div>

      <Container>
        <RevealStagger direction="up" delayStep={100} className="max-w-4xl mx-auto text-center">
          <Reveal delay={0}>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium mb-6 border border-primary-100">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {t.hero.title}
            </span>
          </Reveal>
          
          <Reveal delay={100}>
            <h1 className="heading-1 text-neutral-950 mb-6 gradient-text">
              {t.hero.subtitle.split(' ').slice(0, 3).join(' ')} <br />
              <span className="text-neutral-900">{t.hero.subtitle.split(' ').slice(3).join(' ')}</span>
            </h1>
          </Reveal>
          
          <Reveal delay={200}>
            <p className="body-lg text-neutral-600 mb-10 max-w-3xl mx-auto text-balance">
              {t.hero.subtitle}
            </p>
          </Reveal>
          
          <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="group"
              >
                {t.hero.ctaPrimary}
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t.hero.ctaSecondary}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={400} direction="scale">
            <div className="flex items-center justify-center gap-8 mt-12 text-sm text-neutral-500">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>12+ years experience</span>
              </div>
              <div className="w-px h-6 bg-neutral-200" />
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Full-cycle development</span>
              </div>
              <div className="w-px h-6 bg-neutral-200" />
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>Ongoing support</span>
              </div>
            </div>
          </Reveal>
        </RevealStagger>
      </Container>

      {/* Scroll indicator */}
      <Reveal delay={800} direction="up">
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
          <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </Reveal>
    </Section>
  );
}