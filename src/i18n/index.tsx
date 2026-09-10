import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { defaultLocale, locales, localeNames, type Locale } from './config';
import { getTranslations, type Translations } from './translations';

interface I18nContextType {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  dir: 'rtl' | 'ltr';
  availableLocales: Locale[];
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children, initialLocale }: { children: ReactNode; initialLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale || defaultLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('botech-locale') as Locale | null;
    if (saved && locales.includes(saved)) {
      setLocaleState(saved);
    } else if (initialLocale) {
      setLocaleState(initialLocale);
    }
  }, [initialLocale]);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = locale;
    document.documentElement.dir = localeNames[locale].dir;
    localStorage.setItem('botech-locale', locale);
  }, [locale, mounted]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'ar' ? 'en' : 'ar');
  }, [locale, setLocale]);

  const value: I18nContextType = {
    locale,
    t: getTranslations(locale),
    setLocale,
    toggleLocale,
    dir: localeNames[locale].dir,
    availableLocales: locales,
  };

  if (!mounted) {
    return (
      <I18nContext.Provider value={{ ...value, t: getTranslations(defaultLocale) }}>
        {children}
      </I18nContext.Provider>
    );
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

export function useLocale() {
  const { locale, setLocale, toggleLocale, dir, availableLocales } = useI18n();
  return { locale, setLocale, toggleLocale, dir, availableLocales };
}

export function useTranslations() {
  const { t } = useI18n();
  return t;
}