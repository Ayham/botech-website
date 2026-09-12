import { useI18n } from '../../i18n';
import { siteConfig } from '../../config/site';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { NavLink } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Reveal, RevealStagger } from '../ui/Reveal';

export function CTA() {
  const { t } = useI18n();

  return (
    <Section size="lg" background="primary" className="relative overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-700 rounded-full blur-3xl opacity-10" />
      </div>
      
      <Container>
        <RevealStagger direction="up" delayStep={100} className="relative max-w-3xl mx-auto text-center">
          <Reveal delay={0}>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium mb-6 border border-white/20 backdrop-blur-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {t.contact.cta}
            </span>
          </Reveal>
          
          <Reveal delay={100}>
            <h2 className="heading-2 text-white mb-4">{t.contact.ctaHeadingStart}<span className="text-primary-200">{t.contact.ctaHeadingHighlight}</span>{t.contact.ctaHeadingEnd}</h2>
          </Reveal>
          
          <Reveal delay={200}>
            <p className="body-lg text-primary-100 mb-8 text-balance">{t.contact.ctaDesc}</p>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <NavLink to="/contact#form">
                <Button variant="secondary" size="lg" className="bg-white text-primary-600 hover:bg-primary-50 group">
                  {t.contact.form.title}
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </NavLink>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                aria-label={t.contact.info.email}
                title={siteConfig.contact.email}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </a>
              <a
                href={`tel:+${siteConfig.contact.phoneRaw}`}
                aria-label={t.contact.info.phone}
                title={siteConfig.contact.phone}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </a>
              <a
                href={siteConfig.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.contact.info.whatsapp}
                title={siteConfig.contact.phone}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.82 9.82 0 001.51 5.26l-.999 3.648 3.978-1.05zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.867-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.258-.463-2.395-1.478-.886-.784-1.48-1.782-1.653-2.082-.173-.297-.019-.458.13-.606.134-.133.298-.347.446-.521.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.521.074-.793.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.064 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              </a>
            </div>
          </Reveal>
        </RevealStagger>
      </Container>
    </Section>
  );
}