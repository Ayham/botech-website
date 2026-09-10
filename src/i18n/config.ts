export type Locale = 'ar' | 'en';

export const defaultLocale: Locale = 'ar';
export const locales: Locale[] = ['ar', 'en'];

export const localeNames: Record<Locale, { native: string; english: string; dir: 'rtl' | 'ltr' }> = {
  ar: { native: 'العربية', english: 'Arabic', dir: 'rtl' },
  en: { native: 'English', english: 'English', dir: 'ltr' },
};

export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] === 'en') return 'en';
  return 'ar';
}

export function getPathWithLocale(path: string, locale: Locale): string {
  if (locale === 'ar') return path;
  return `/en${path === '/' ? '' : path}`;
}

export function removeLocaleFromPath(pathname: string): { locale: Locale; path: string } {
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] === 'en') {
    return { locale: 'en', path: '/' + segments.slice(1).join('/') };
  }
  return { locale: 'ar', path: pathname };
}