import { siteConfig } from './site';

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
  noFollow?: boolean;
}

export function generateSEO(props: Partial<SEOProps> & { title: string; description: string }): SEOProps {
  const baseUrl = siteConfig.url;
  const canonical = props.canonical ? `${baseUrl}${props.canonical}` : baseUrl;
  const ogImage = props.ogImage ? `${baseUrl}${props.ogImage}` : siteConfig.ogImage;

  return {
    title: props.title,
    description: props.description,
    canonical,
    ogImage,
    ogType: props.ogType || 'website',
    noIndex: props.noIndex || false,
    noFollow: props.noFollow || false,
  };
}

export const pageSEO = {
  home: generateSEO({
    title: `${siteConfig.name} | ${siteConfig.tagline.ar}`,
    description: siteConfig.description.ar,
    canonical: '/',
  }),
  homeEn: generateSEO({
    title: `${siteConfig.name} | ${siteConfig.tagline.en}`,
    description: siteConfig.description.en,
    canonical: '/en',
  }),
  about: generateSEO({
    title: `من نحن | ${siteConfig.name}`,
    description: 'تعرف على Blue Orbit Technologies، فريق التأسيس، ومنهجية العمل في بناء الحلول التقنية.',
    canonical: '/about',
  }),
  aboutEn: generateSEO({
    title: `About | ${siteConfig.name}`,
    description: 'Learn about Blue Orbit Technologies, the founding team, and our approach to building technology solutions.',
    canonical: '/en/about',
  }),
  services: generateSEO({
    title: `خدماتنا | ${siteConfig.name}`,
    description: 'خدمات تقنية متكاملة: تطوير المواقع، تطبيقات الجوال، الأنظمة المخصصة، التكامل، والحلول السحابية.',
    canonical: '/services',
  }),
  servicesEn: generateSEO({
    title: `Services | ${siteConfig.name}`,
    description: 'Comprehensive technology services: web development, mobile apps, custom systems, integration, and cloud solutions.',
    canonical: '/en/services',
  }),
  products: generateSEO({
    title: `منتجاتنا | ${siteConfig.name}`,
    description: 'نطور منتجاتنا البرمجية الخاصة التي تحل مشكلات حقيقية في السوق.',
    canonical: '/products',
  }),
  productsEn: generateSEO({
    title: `Products | ${siteConfig.name}`,
    description: 'We build our own software products that solve real market problems.',
    canonical: '/en/products',
  }),
  work: generateSEO({
    title: `أعمالنا | ${siteConfig.name}`,
    description: 'مشاريع ومنتجات Blue Orbit Technologies: Raseed، Clover Flow، وحلول تقنية مخصصة.',
    canonical: '/work',
  }),
  workEn: generateSEO({
    title: `Work | ${siteConfig.name}`,
    description: 'Projects and products by Blue Orbit Technologies: Raseed, Clover Flow, and custom technology solutions.',
    canonical: '/en/work',
  }),
  contact: generateSEO({
    title: `تواصل معنا | ${siteConfig.name}`,
    description: 'تواصل مع Blue Orbit Technologies للاستفسارات، الشراكات، أو طلب خدمات تقنية.',
    canonical: '/contact',
  }),
  contactEn: generateSEO({
    title: `Contact | ${siteConfig.name}`,
    description: 'Contact Blue Orbit Technologies for inquiries, partnerships, or technology services.',
    canonical: '/en/contact',
  }),
  raseed: generateSEO({
    title: `Raseed | رصيد — إدارة تحويلات الرصيد في سوريا`,
    description: 'تطبيق Raseed لإدارة تحويلات الرصيد اليومية لنقاط بيع الرصيد في سوريا. تحويل بنقرة واحدة، تقارير يومية، يعمل بدون إنترنت.',
    canonical: '/raseed',
    ogImage: '/assets/raseed/Raseed%20app%20Logo.png',
  }),
  raseedEn: generateSEO({
    title: `Raseed | Balance Transfer App for Syria`,
    description: 'Raseed helps mobile phone shops in Syria manage daily balance transfers with fewer mistakes and clear daily reports.',
    canonical: '/en/raseed',
    ogImage: '/assets/raseed/Raseed%20app%20Logo.png',
  }),
  clover: generateSEO({
    title: `Clover Flow | إدارة نقاط البيع والأعمال — قريباً`,
    description: 'منصة لإدارة نقاط البيع والأعمال، مصممة لتبسيط عمليات البيع والمخزون وإدارة العمل. قريباً.',
    canonical: '/clover',
    ogImage: '/assets/clover/clover-logo-512.png',
  }),
  cloverEn: generateSEO({
    title: `Clover Flow | POS & Business Management — Coming Soon`,
    description: 'A platform for POS and business management, designed to simplify sales, inventory, and operations. Coming soon.',
    canonical: '/en/clover',
    ogImage: '/assets/clover/clover-logo-512.png',
  }),
  privacy: generateSEO({
    title: `سياسة الخصوصية | ${siteConfig.name}`,
    description: 'كيف يتعامل موقع ومنتجات Blue Orbit Technologies مع بياناتك.',
    canonical: '/privacy',
  }),
  privacyEn: generateSEO({
    title: `Privacy Policy | ${siteConfig.name}`,
    description: 'How BOTech website and products handle your data.',
    canonical: '/en/privacy',
  }),
  terms: generateSEO({
    title: `شروط الاستخدام | ${siteConfig.name}`,
    description: 'شروط استخدام موقع Blue Orbit Technologies وخدماته.',
    canonical: '/terms',
  }),
  termsEn: generateSEO({
    title: `Terms of Service | ${siteConfig.name}`,
    description: 'Terms of use for the BOTech website and services.',
    canonical: '/en/terms',
  }),
};
