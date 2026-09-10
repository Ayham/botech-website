import { NavLink } from 'react-router-dom';
import { Container } from '../ui/Container';
import { siteConfig } from '../../config/site';
import { useI18n } from '../../i18n';

export function Footer() {
  const { t, locale } = useI18n();
  const currentYear = new Date().getFullYear();

  const footerNav = siteConfig.navigation.footer;

  return (
    <footer className="bg-neutral-900 text-neutral-300" role="contentinfo">
      <Container className="py-16 lg:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <NavLink to="/" className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 rounded-lg" aria-label={t.common.backToHome}>
              <img 
                src={siteConfig.logo} 
                alt="Blue Orbit Technologies" 
                className="w-8 h-8"
              />
              <span className="font-bold text-xl text-white">Blue Orbit Technologies</span>
            </NavLink>
            <p className="text-sm text-neutral-400 leading-relaxed">{t.footer.tagline}</p>
            <div className="flex gap-4">
              <a
                href={siteConfig.contact.social.raseedFacebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors"
                aria-label="Raseed Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Company Links */}
          <nav aria-label={t.footer.company}>
            <h3 className="font-semibold text-white mb-4">{t.footer.company}</h3>
            <ul className="space-y-3">
              {footerNav.company.map((item) => (
                <li key={item.key}>
                  <NavLink to={item.href} className="text-sm text-neutral-400 hover:text-white transition-colors">
                    {locale === 'ar' ? item.label.ar : item.label.en}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Products */}
          <nav aria-label={t.footer.products}>
            <h3 className="font-semibold text-white mb-4">{t.footer.products}</h3>
            <ul className="space-y-3">
              {footerNav.products.map((item) => (
                <li key={item.key}>
                  <NavLink to={item.href} className="text-sm text-neutral-400 hover:text-white transition-colors">
                    {locale === 'ar' ? item.label.ar : item.label.en}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label={t.footer.services}>
            <h3 className="font-semibold text-white mb-4">{t.footer.services}</h3>
            <ul className="space-y-3">
              {siteConfig.services.slice(0, 5).map((service) => (
                <li key={service.key}>
                  <NavLink to="/services" className="text-sm text-neutral-400 hover:text-white transition-colors">
                    {locale === 'ar' ? service.title.ar : service.title.en}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="font-semibold text-white mb-4">{t.contact.info.title}</h3>
            <address className="not-italic text-sm text-neutral-400 space-y-2">
              <p>
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">{siteConfig.contact.email}</a>
              </p>
              <p>
                <a href={siteConfig.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp</a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500">
            &copy; {currentYear} {siteConfig.name}. {t.footer.copyright}.
          </p>
          <div className="flex items-center gap-6 text-sm text-neutral-500">
            <NavLink to="/privacy" className="hover:text-white transition-colors">{t.footer.privacy}</NavLink>
            <NavLink to="/terms" className="hover:text-white transition-colors">{t.footer.terms}</NavLink>
          </div>
        </div>
      </Container>
    </footer>
  );
}