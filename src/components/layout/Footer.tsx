import { NavLink } from 'react-router-dom';
import { Container } from '../ui/Container';
import { siteConfig } from '../../config/site';
import { useI18n } from '../../i18n';

export function Footer() {
  const { t, locale } = useI18n();
  const currentYear = new Date().getFullYear();

  const footerNav = siteConfig.navigation.footer;

  const socialLinks = [
    { key: 'facebook', href: siteConfig.contact.social.facebook, label: 'Facebook', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
    )},
    { key: 'youtube', href: siteConfig.contact.social.youtube, label: 'YouTube', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
    )},
    { key: 'linkedin', href: siteConfig.contact.social.linkedin, label: 'LinkedIn', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    )},
    { key: 'twitter', href: siteConfig.contact.social.twitter, label: 'X (Twitter)', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 9.24-3.908 3.908L9 12.167l6.824 7.422-3.897 3.907-7.92-8.615-7.92 8.615-3.897-3.907L14.17 19.65 5.668 10.41 9.576 10.03 3.728 1.68 7.636 1.25h3.306l7.224 7.99 8.502-9.24 3.907 3.907L15 12.167l-6.823-7.422 3.896-3.907 7.92 8.615 7.92-8.615 3.897 3.907-7.223 8.26z"/></svg>
    )},
    { key: 'github', href: siteConfig.contact.social.github, label: 'GitHub', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
    )},
  ];

  return (
    <footer className="bg-neutral-900 text-neutral-300" role="contentinfo">
      <Container className="py-16 lg:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <NavLink to="/" className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 rounded-lg" aria-label={t.common.backToHome}>
              <svg className="w-8 h-8 text-primary-400" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <circle cx="16" cy="16" r="14" stroke="#375378" strokeWidth="2"/>
                <path d="M16 6v20M6 16h20" stroke="#375378" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="16" cy="16" r="6" stroke="#375378" strokeWidth="1.5"/>
              </svg>
              <span className="font-bold text-xl text-white">Blue Orbit Technologies</span>
            </NavLink>
            <p className="text-sm text-neutral-400 leading-relaxed">{t.footer.tagline}</p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.key}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
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
                <a href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{siteConfig.contact.whatsapp}</a>
              </p>
              <p>{locale === 'ar' ? siteConfig.contact.address.ar : siteConfig.contact.address.en}</p>
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