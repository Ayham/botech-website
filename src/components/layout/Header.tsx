import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { useI18n } from '../../i18n';
import { localeNames } from '../../i18n/config';
import { siteConfig } from '../../config/site';

const navigation = [
  { key: 'home', href: '/', labelKey: 'nav.home' },
  { key: 'services', href: '/services', labelKey: 'nav.services' },
  { key: 'products', href: '/products', labelKey: 'nav.products', children: [
    { key: 'all', href: '/products', labelKey: 'common.allProducts' },
    { key: 'raseed', href: '/raseed', labelKey: 'nav.raseid' },
    { key: 'clover', href: '/clover', labelKey: 'nav.clover' },
  ]},
  { key: 'work', href: '/work', labelKey: 'nav.work' },
  { key: 'about', href: '/about', labelKey: 'nav.about' },
  { key: 'contact', href: '/contact#form', labelKey: 'nav.contact' },
];

export function Header() {
  const { t, locale, toggleLocale } = useI18n();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle scroll for header visibility and background
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      
      // Hide header on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

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
    <header 
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white'
      } ${headerVisible ? 'top-0' : '-top-16 lg:-top-20'}`}
    >
      <nav className="relative" aria-label="Main navigation" ref={dropdownRef}>
        <Container>
          <div className="flex items-center justify-between h-16 lg:h-20">
            <NavLink to="/" className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-lg" aria-label={t.common.backToHome}>
              <img 
                src={siteConfig.logo} 
                alt="BOTech" 
                className="h-14 sm:h-16 w-auto transition-transform duration-200 hover:scale-105"
                width="48"
                height="48"
              />
            </NavLink>

            <div className="hidden lg:flex lg:items-center lg:gap-1">
              {navigation.map((item) => {
                const isCurrent = isActive(item.href);
                const hasChildren = item.children && item.children.length > 0;
                
                if (hasChildren) {
                  return (
                    <div key={item.key} className="relative group" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                      <NavLink
                        to={item.href}
                        className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                          isCurrent ? 'text-primary-600 bg-primary-50' : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                        }`}
                      >
                        {getLabel(item.labelKey)}
                        <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </NavLink>
                      
                      {dropdownOpen && (
                        <div className="absolute top-full left-0 pt-2 z-50">
                          <div className="w-56 bg-white rounded-xl shadow-lg border border-neutral-200 py-2 animate-slide-down" role="menu">
                          {item.children!.map((child) => (
                            <NavLink
                              key={child.key}
                              to={child.href}
                              className={`block px-4 py-2.5 text-sm transition-colors ${
                                child.key === 'all' 
                                  ? 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 border-b border-neutral-100 font-medium' 
                                  : isActive(child.href) 
                                    ? 'bg-primary-50 text-primary-600' 
                                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                              }`}
                              role="menuitem"
                            >
                              {getLabel(child.labelKey)}
                            </NavLink>
                          ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={item.key}
                    to={item.href}
                    className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 relative overflow-hidden ${
                      isCurrent 
                        ? 'bg-primary-50 text-primary-600' 
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                    } before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-0.5 before:bg-primary-600 before:transition-all before:duration-300 hover:before:w-full hover:before:left-0`}
                    end={item.href === '/'}
                  >
                    {getLabel(item.labelKey)}
                  </NavLink>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleLocale}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors group"
                aria-label={t.common.language}
              >
                <svg className="w-4 h-4 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span>{localeNames[locale === 'ar' ? 'en' : 'ar'].native}</span>
              </button>

              <NavLink to="/contact#form" className="hidden sm:flex">
                <Button size="sm">{t.nav.contact}</Button>
              </NavLink>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors tap-scale"
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

        {mobileOpen && (
          <div id="mobile-menu" className="lg:hidden bg-white border-t border-neutral-200 animate-slide-up fixed inset-x-0 top-16 bottom-0 overflow-y-auto z-50" role="navigation" aria-label="Mobile menu">
            <Container className="py-4 space-y-1">
              {navigation.map((item) => {
                const isCurrent = isActive(item.href);
                const hasChildren = item.children && item.children.length > 0;
                
                if (hasChildren) {
                  return (
                    <div key={item.key} className="space-y-1">
                      <NavLink
                        to={item.href}
                        className={`w-full flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors ${isCurrent ? 'bg-primary-50 text-primary-600' : 'text-neutral-600 hover:bg-neutral-50'}`}
                      >
                        {getLabel(item.labelKey)}
                      </NavLink>
                      <div className="pl-4 space-y-1 animate-slide-down">
                        {item.children!.map((child) => (
                          <NavLink
                            key={child.key}
                            to={child.href}
                            className={`block px-4 py-2.5 text-sm rounded-lg transition-colors ${isActive(child.href) ? 'bg-primary-50 text-primary-600' : 'text-neutral-500 hover:bg-neutral-50'}`}
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
                    className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors tap-scale ${isCurrent ? 'bg-primary-50 text-primary-600' : 'text-neutral-600 hover:bg-neutral-50'}`}
                    end={item.href === '/'}
                  >
                    {getLabel(item.labelKey)}
                  </NavLink>
                );
              })}

              <NavLink to="/contact#form" className="block mt-2">
                <Button fullWidth className="mt-2">{t.nav.contact}</Button>
              </NavLink>

              <div className="pt-4 border-t border-neutral-200">
                <button
                  onClick={toggleLocale}
                  className="flex items-center justify-between w-full px-4 py-3 text-base font-medium text-neutral-600 hover:bg-neutral-50 rounded-lg tap-scale"
                >
                  <span>{t.common.language}</span>
                  <span className="text-primary-600">{localeNames[locale === 'ar' ? 'en' : 'ar'].native}</span>
                </button>
              </div>
            </Container>
          </div>
        )}

        {mobileOpen && (
          <div 
            className="fixed inset-0 bg-black/30 z-40 lg:hidden animate-fade-in" 
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        )}
      </nav>
    </header>
  );
}