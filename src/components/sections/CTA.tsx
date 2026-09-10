import { useI18n } from '../../i18n';
import { siteConfig } from '../../config/site';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { NavLink } from 'react-router-dom';
import { Button } from '../ui/Button';

export function CTA() {
  const { t } = useI18n();

  return (
    <Section size="lg" background="primary" className="relative overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>
      
      <Container>
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="heading-2 text-white mb-4">{t.contact.cta}</h2>
          <p className="body-lg text-primary-100 mb-8">{t.contact.ctaDesc}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <NavLink to="/contact">
              <Button variant="secondary" size="lg" className="bg-white text-primary-600 hover:bg-primary-50">
                {t.contact.form.title}
              </Button>
            </NavLink>
            <a 
              href={`mailto:${siteConfig.contact.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 text-lg font-medium text-white hover:text-primary-100 transition-colors"
            >
              {siteConfig.contact.email}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}