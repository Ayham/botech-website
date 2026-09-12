import { NavLink } from 'react-router-dom';
import { Container } from '../ui/Container';
import { siteConfig } from '../../config/site';
import { useI18n } from '../../i18n';
import { Reveal, RevealStagger } from '../ui/Reveal';
import { OrbitBackground } from '../ui/OrbitBackground';

export function Footer() {
  const { t, locale } = useI18n();
  const currentYear = new Date().getFullYear();

  const footerNav = siteConfig.navigation.footer;

  return (
    <footer className="bg-neutral-900 text-neutral-300 relative overflow-hidden" role="contentinfo">
      <OrbitBackground variant="footer" />
      <Container className="py-16 lg:py-24">
        <RevealStagger direction="up" delayStep={80} className="relative grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          <Reveal>
            <div className="col-span-2 lg:col-span-1 space-y-4">
              <NavLink to="/" className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 rounded-lg tap-scale" aria-label={t.common.backToHome}>
                <img 
                  src="/white logo.png" 
                  alt="BOTech" 
                  className="h-20 w-auto"
                  width="40"
                  height="40"
                />
              </NavLink>
              <p className="text-sm text-neutral-400 leading-relaxed">{t.footer.tagline}</p>
              
              {/* Social links */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={siteConfig.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.contact.info.whatsapp}
                  className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-primary-600 text-neutral-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.82 9.82 0 001.51 5.26l-.999 3.648 3.978-1.05zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.867-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.258-.463-2.395-1.478-.886-.784-1.48-1.782-1.653-2.082-.173-.297-.019-.458.13-.606.134-.133.298-.347.446-.521.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.521.074-.793.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.064 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  aria-label={t.contact.info.email}
                  className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-primary-600 text-neutral-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <nav aria-label={t.footer.company}>
              <h3 className="font-semibold text-white mb-4 text-base">{t.footer.company}</h3>
              <ul className="space-y-3">
                {footerNav.company.map((item) => (
                  <li key={item.key}>
                    <NavLink to={item.href} className="text-sm text-neutral-400 hover:text-white transition-colors group flex items-center gap-2">
                      <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      {locale === 'ar' ? item.label.ar : item.label.en}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          <Reveal>
            <nav aria-label={t.footer.products}>
              <h3 className="font-semibold text-white mb-4 text-base">{t.footer.products}</h3>
              <ul className="space-y-3">
                {footerNav.products.map((item) => (
                  <li key={item.key}>
                    <NavLink to={item.href} className="text-sm text-neutral-400 hover:text-white transition-colors group flex items-center gap-2">
                      <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      {locale === 'ar' ? item.label.ar : item.label.en}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          <Reveal>
            <nav aria-label={t.footer.services}>
              <h3 className="font-semibold text-white mb-4 text-base">{t.footer.services}</h3>
              <ul className="space-y-3">
                {siteConfig.services.slice(0, 5).map((service) => (
                  <li key={service.key}>
                    <NavLink to="/services" className="text-sm text-neutral-400 hover:text-white transition-colors group flex items-center gap-2">
                      <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      {locale === 'ar' ? service.title.ar : service.title.en}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          <Reveal>
            <div className="space-y-3">
              <h3 className="font-semibold text-white mb-4 text-base">{t.contact.info.title}</h3>
              <address className="not-italic space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-neutral-800 text-neutral-300 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm">{t.contact.info.email}</p>
                    <a href={`mailto:${siteConfig.contact.email}`} className="text-primary-400 hover:text-primary-300 text-sm transition-colors">{siteConfig.contact.email}</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-neutral-800 text-neutral-300 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm">{t.contact.info.phone}</p>
                    <a href={`tel:+${siteConfig.contact.phoneRaw}`} className="text-primary-400 hover:text-primary-300 text-sm transition-colors" dir="ltr">{siteConfig.contact.phone}</a>
                  </div>
                </div>
              </address>
            </div>
          </Reveal>
        </RevealStagger>

        <Reveal delay={400} className="relative mt-12 pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500">
            &copy; {currentYear} {siteConfig.name}. {t.footer.copyright}.
          </p>
          <div className="flex items-center gap-6 text-sm text-neutral-500">
            <NavLink to="/privacy" className="hover:text-white transition-colors group flex items-center gap-1">
              {t.footer.privacy}
            </NavLink>
            <NavLink to="/terms" className="hover:text-white transition-colors group flex items-center gap-1">
              {t.footer.terms}
            </NavLink>
            
          </div>
        </Reveal>
      </Container>
    </footer>
  );
}
