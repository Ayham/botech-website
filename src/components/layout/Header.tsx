import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { useI18n } from '../../i18n';
import { localeNames } from '../../i18n/config';

const navigation = [
  { key: 'home', href: '/', labelKey: 'nav.home' },
  { key: 'services', href: '/services', labelKey: 'nav.services' },
  { key: 'products', href: '/products', labelKey: 'nav.products', children: [
    { key: 'raseed', href: '/raseed', labelKey: 'nav.raseed' },
    { key: 'clover', href: '/clover', labelKey: 'nav.clover' },
  ]},
  { key: 'work', href: '/work', labelKey: 'nav.work' },
  { key: 'about', href: '/about', labelKey: 'nav.about' },
  { key: 'contact', href: '/contact', labelKey: 'nav.contact' },
];

export function Header() {
  const { t, locale, toggleLocale } = useI18n();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(null);
  }, [location.pathname]);

  const getLabel = (key: string) => {
    const keys = key.split('.');
    let value: any = t;
    for (const k of keys) value = value?.[k];
    return value || key;
  };

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/' || location.pathname === '/en';
    return location.pathname.startsWith(href);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white'}`}>
      <nav className="relative" aria-label="Main navigation">
        <Container>
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-lg" aria-label={t.common.backToHome}>
              <svg className="w-8 h-8 text-primary-600" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <circle cx="16" cy="16" r="14" stroke="#375378" strokeWidth="2"/>
                <path d="M16 6v20M6 16h20" stroke="#375378" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="16" cy="16" r="6" stroke="#375378" strokeWidth="1.5"/>
              </svg>
              <span className="font-bold text-xl text-neutral-900 hidden sm:block">Blue Orbit Technologies</span>
              <span className="font-bold text-xl text-neutral-900 sm:hidden">BOTech</span>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-1">
              {navigation.map((item) => {
                const isCurrent = isActive(item.href);
                const hasChildren = item.children && item.children.length > 0;
                
                if (hasChildren) {
                  return (
                    <div key={item.key} className="relative" onMouseEnter={() => setDropdownOpen(item.key)} onMouseLeave={() => setDropdownOpen(null)}>
                      <button
                        className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                          isCurrent || dropdownOpen === item.key 
                            ? 'text-primary-600 bg-primary-50' 
                            : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                        }`}
                        aria-expanded={dropdownOpen === item.key}
                        aria-haspopup="true"
                      >
                        {getLabel(item.labelKey)}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {dropdownOpen === item.key && (
                        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-neutral-200 py-2 animate-fade-in" role="menu">
                          {item.children!.map((child) => (
                            <NavLink
                              key={child.key}
                              to={child.href}
                              className={`block px-4 py-2.5 text-sm transition-colors ${
                                isActive(child.href) 
                                  ? 'bg-primary-50 text-primary-600' 
                                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                              }`}
                              role="menuitem"
                            >
                              {getLabel(child.labelKey)}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={item.key}
                    to={item.href}
                    className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      isCurrent 
                        ? 'bg-primary-50 text-primary-600' 
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                    }`}
                    end={item.href === '/'}
                  >
                    {getLabel(item.labelKey)}
                  </NavLink>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <div className="relative hidden sm:block">
                <button
                  onClick={toggleLocale}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                  aria-label={t.common.language}
                  aria-expanded={false}
                  aria-haspopup="listbox"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <span>{localeNames[locale].native}</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Mobile Language */}
              <div className="sm:hidden">
                <button
                  onClick={toggleLocale}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                  aria-label={t.common.language}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <span>{localeNames[locale].native}</span>
                </button>
              </div>

              {/* Contact CTA */}
              <NavLink to="/contact" className="hidden sm:flex">
                <Button size="sm">{t.nav.contact}</Button>
              </NavLink>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors"
                aria-label={mobileOpen ? t.common.close : t.common.menu}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                {mobileOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </Container>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div id="mobile-menu" className="lg:hidden bg-white border-t border-neutral-200 animate-slide-up" role="navigation" aria-label="Mobile menu">
            <Container className="py-4 space-y-1">
              {navigation.map((item) => {
                const isCurrent = isActive(item.href);
                const hasChildren = item.children && item.children.length > 0;
                
                if (hasChildren) {
                  return (
                    <div key={item.key} className="space-y-1">
                      <button className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isCurrent ? 'bg-primary-50 text-primary-600' : 'text-neutral-600 hover:bg-neutral-50'}`}>
                        {getLabel(item.labelKey)}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <div className="pl-4 space-y-1 border-l-2 border-neutral-200">
                        {item.children!.map((child) => (
                          <NavLink
                            key={child.key}
                            to={child.href}
                            className={`block px-4 py-2.5 text-sm rounded-lg transition-colors ${isActive(child.href) ? 'bg-primary-50 text-primary-600' : 'text-neutral-600 hover:bg-neutral-50'}`}
                          >
                            {getLabel(child.labelKey)}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={item.key}
                    to={item.href}
                    className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${isCurrent ? 'bg-primary-50 text-primary-600' : 'text-neutral-600 hover:bg-neutral-50'}`}
                    end={item.href === '/'}
                  >
                    {getLabel(item.labelKey)}
                  </NavLink>
                );
              })}

              {/* Mobile Contact CTA */}
              <NavLink to="/contact" className="block mt-2">
                <Button fullWidth className="mt-2">{t.nav.contact}</Button>
              </NavLink>

              {/* Mobile Language */}
              <div className="pt-4 border-t border-neutral-200">
                <button
                  onClick={toggleLocale}
                  className="flex items-center justify-between w-full px-4 py-3 text-base font-medium text-neutral-600 hover:bg-neutral-50 rounded-lg"
                >
                  <span>{t.common.language}</span>
                  <span className="text-primary-600">{localeNames[locale === 'ar' ? 'en' : 'ar'].native}</span>
                </button>
              </div>
            </Container>
          </div>
        )}

        {/* Overlay */}
        {mobileOpen && (
          <div 
            className="fixed inset-0 bg-black/30 z-40 lg:hidden" 
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        )}
      </nav>
    </header>
  );
}