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

// Note: the site serves both Arabic and English content from the SAME clean
// URLs (language is switched client-side via a toggle, `/en/*` just redirects).
// English entries therefore use the same canonical paths — no separate /en URLs.
export const pageSEO = {
  home: generateSEO({
    title: `BOTech | ${siteConfig.name} – ${siteConfig.tagline.ar}`,
    description:
      'نحوّل الأفكار إلى حلول تقنية عملية. تطوير المواقع والتطبيقات والأنظمة البرمجية المصممة لتلبية احتياجات الأعمال — من الفكرة والتصميم إلى التطوير والنشر والدعم.',
    canonical: '/',
  }),
  homeEn: generateSEO({
    title: `BOTech | ${siteConfig.name} – Practical Technology Solutions`,
    description:
      'We turn ideas into practical technology solutions. Web, mobile, and custom software systems designed around your business — from concept and design through development, deployment, and support.',
    canonical: '/',
  }),
  about: generateSEO({
    title: `من نحن | BOTech – ${siteConfig.name}`,
    description:
      'تعرف على BOTech (Blue Orbit Technologies): فريق التأسيس الذي يمتلك خبرة تفوق 12 عاماً، ومنهجية العمل في بناء الحلول التقنية العملية.',
    canonical: '/about',
  }),
  aboutEn: generateSEO({
    title: `About Us | BOTech – ${siteConfig.name}`,
    description:
      'Learn about BOTech (Blue Orbit Technologies): the founding team with 12+ years of experience, and our approach to building practical technology solutions.',
    canonical: '/about',
  }),
  services: generateSEO({
    title: `خدماتنا | BOTech – ${siteConfig.name}`,
    description:
      'خدمات تقنية متكاملة من BOTech: تطوير المواقع، تطبيقات الجوال، الأنظمة المخصصة، التكامل، الحلول السحابية، الأتمتة، والنشر والصيانة.',
    canonical: '/services',
  }),
  servicesEn: generateSEO({
    title: `Our Services | BOTech – ${siteConfig.name}`,
    description:
      'Comprehensive technology services from BOTech: web development, mobile apps, custom systems, integration, cloud & offline solutions, automation, and deployment.',
    canonical: '/services',
  }),
  products: generateSEO({
    title: `منتجاتنا | BOTech – ${siteConfig.name}`,
    description:
      'نطوّر منتجاتنا البرمجية الخاصة التي تحل مشكلات حقيقية في السوق — Raseed لإدارة تحويلات الرصيد، و Clover Flow لمنصة نقاط البيع.',
    canonical: '/products',
  }),
  productsEn: generateSEO({
    title: `Our Products | BOTech – ${siteConfig.name}`,
    description:
      'We build our own software products that solve real market problems — Raseed for balance transfers, and Clover Flow for POS management.',
    canonical: '/products',
  }),
  work: generateSEO({
    title: `أعمالنا | BOTech – ${siteConfig.name}`,
    description:
      'مشاريع ومنتجات BOTech: Raseed، Clover Flow، ومشاريع تقنية مخصصة قيد التطوير.',
    canonical: '/work',
  }),
  workEn: generateSEO({
    title: `Our Work & Projects | BOTech – ${siteConfig.name}`,
    description:
      'Projects and products by BOTech: Raseed, Clover Flow, and more custom technology solutions in development.',
    canonical: '/work',
  }),
  contact: generateSEO({
    title: `تواصل معنا | BOTech – ${siteConfig.name}`,
    description:
      'تواصل مع BOTech (Blue Orbit Technologies) للاستفسارات، الشراكات، أو طلب خدمات تقنية. نرد عادة خلال 24 ساعة.',
    canonical: '/contact',
  }),
  contactEn: generateSEO({
    title: `Contact Us | BOTech – ${siteConfig.name}`,
    description:
      'Contact BOTech (Blue Orbit Technologies) for inquiries, partnerships, or technology services. We usually reply within 24 hours.',
    canonical: '/contact',
  }),
  raseed: generateSEO({
    title: `Raseed (رصيد) | تطبيق إدارة تحويلات الرصيد في سوريا – BOTech`,
    description:
      'تطبيق Raseed لإدارة تحويلات الرصيد اليومية لنقاط بيع الرصيد ومراكز خدمة الموبايل في سوريا. تحويل بنقرة واحدة، تقارير يومية، ويعمل دون إنترنت بعد التفعيل.',
    canonical: '/raseed',
    ogImage: '/assets/raseed/Raseed%20app%20Logo.png',
  }),
  raseedEn: generateSEO({
    title: `Raseed App | Balance Transfer Manager for Syria – BOTech`,
    description:
      'Raseed helps mobile recharge shops and payment points in Syria manage daily balance transfers — one-tap transfers, daily reports, and offline support after activation.',
    canonical: '/raseed',
    ogImage: '/assets/raseed/Raseed%20app%20Logo.png',
  }),
  clover: generateSEO({
    title: `Clover Flow | نظام نقاط بيع وإدارة متجر | BOTech`,
    description:
      'نظام نقاط بيع وإدارة متجر لمختلف أنواع المتاجر السورية. مبيعات أسرع، مخزون، عملاء، ديون ودعم الدولار والليرة السورية، ويعمل بدون إنترنت.',
    canonical: '/clover',
    ogImage: '/assets/clover/clover-logo-512.png',
  }),
  cloverEn: generateSEO({
    title: `Clover Flow | POS & Store Management for Syrian Stores | BOTech`,
    description:
      'A POS and store management system for Syrian shops. Faster sales, inventory, customers, debts, USD/SYP support, and offline-first.',
    canonical: '/clover',
    ogImage: '/assets/clover/clover-logo-512.png',
  }),
  privacy: generateSEO({
    title: `سياسة الخصوصية | BOTech – ${siteConfig.name}`,
    description:
      'كيف يتعامل موقع ومنتجات BOTech (Blue Orbit Technologies) مع بياناتك.',
    canonical: '/privacy',
  }),
  privacyEn: generateSEO({
    title: `Privacy Policy | BOTech – ${siteConfig.name}`,
    description: 'How the BOTech (Blue Orbit Technologies) website and products handle your data.',
    canonical: '/privacy',
  }),
  terms: generateSEO({
    title: `شروط الاستخدام | BOTech – ${siteConfig.name}`,
    description:
      'شروط استخدام موقع BOTech ومنتجاته وخدماته.',
    canonical: '/terms',
  }),
  termsEn: generateSEO({
    title: `Terms of Service | BOTech – ${siteConfig.name}`,
    description: 'Terms of use for the BOTech website, products, and services.',
    canonical: '/terms',
  }),
  deleteAccount: generateSEO({
    title: `حذف حساب Raseed | BOTech – ${siteConfig.name}`,
    description:
      'اطلب حذف حسابك من تطبيق Raseed، أو أرسل طلب الحذف من هذه الصفحة بعد التحقق من ملكية البريد الإلكتروني.',
    canonical: '/delete-account',
    noIndex: true,
  }),
  deleteAccountEn: generateSEO({
    title: `Delete Raseed Account | BOTech – ${siteConfig.name}`,
    description:
      'Request deletion of your Raseed account, or send a deletion request from this page after verifying ownership of the account email.',
    canonical: '/delete-account',
    noIndex: true,
  }),
  notFound: generateSEO({
    title: `الصفحة غير موجودة | BOTech – ${siteConfig.name}`,
    description:
      'عذراً، الصفحة التي تبحث عنها غير موجودة. يمكنك العودة إلى الصفحة الرئيسية للبحث عن ما تريد.',
    canonical: '/',
    noIndex: true,
  }),
  notFoundEn: generateSEO({
    title: `Page Not Found | BOTech – ${siteConfig.name}`,
    description:
      "Sorry, the page you're looking for doesn't exist. You can go back to the homepage to find what you need.",
    canonical: '/',
    noIndex: true,
  }),
};