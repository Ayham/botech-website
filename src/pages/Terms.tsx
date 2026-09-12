import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { Section, Container } from '@/components/ui';
import { useI18n } from '@/i18n';
import { pageSEO } from '@/config/seo';
import { NavLink } from 'react-router-dom';

export function TermsPage() {
  const { t, locale } = useI18n();
  const seo = locale === 'ar' ? pageSEO.terms : pageSEO.termsEn;

  const sections = locale === 'ar' ? [
    {
      title: 'قبول الشروط',
      body: 'باستخدامك موقع Blue Orbit Technologies أو منتجاتنا أو خدماتنا فإنك توافق على هذه الشروط. إذا كنت لا توافق عليها، يرجى عدم استخدام الموقع أو الخدمات.',
    },
    {
      title: 'وصف الخدمات',
      body: 'نقدم خدمات تطوير تقنية وبرمجية إلى جانب منتجاتنا (Raseed و Clover Flow). قد تتطور الخدمات والمنتجات أو تتغير ميزاتها مع مرور الوقت بناءً على التطورات التقنية.',
    },
    {
      title: 'حقوق الملكية الفكرية',
      body: 'جميع المحتويات والبرمجيات والتصاميم والعلامات التجارية المرتبطة بنا محمية بموجب قوانين الملكية الفكرية. لا يُسمح باستخدامها دون إذن كتابي مسبق.',
    },
    {
      title: 'تراخيص Raseed',
      body: 'تطبيق Raseed يُستخدم بموجب ترخيص نظير مدة محددة، ويُربط بالجهاز الذي يُفعّل عليه تطبيقنا. جميع التحديثات مشمولة خلال مدة الترخيص. يُفضّل الاحتفاظ برقم الترخيص ومعرفة تواصل معنا لعملية النقل عند الحاجة.',
    },
    {
      title: 'تحديثات الخدمة',
      body: 'نحتفظ بالحق في التوقف عن تقديم خدمة أو إيقاف منتج مؤقتاً للصيانة أو التحديث أو تحسينات تقنية، دون المساس بحقوق المستخدمين الحاليين.',
    },
    {
      title: 'حدود المسؤولية',
      body: 'نقدم الخدمات «كما هي». لا نتحمل المسؤولية عن أي أضرار غير مباشرة ناتجة عن الاستخدام أو عدم القدرة على الاستخدام، ضمن الحدود المسموح بها قانونياً.',
    },
    {
      title: 'القانون الواجب التطبيق',
      body: 'تخضع هذه الشروط للقوانين السارية في الجمهورية العربية السورية. أي نزاع يُحل وفق القوانين المعمول بها.',
    },
    {
      title: 'التواصل',
      body: 'لأي استفسار حول هذه الشروط، تواصل معنا عبر البريد الإلكتروني المذكور في صفحة الاتصال.',
    },
  ] : [
    {
      title: 'Acceptance of Terms',
      body: 'By using the Blue Orbit Technologies website, products, or services, you agree to these terms. If you do not agree, please do not use the site or services.',
    },
    {
      title: 'Description of Services',
      body: 'We provide technology and software development services along with our products (Raseed and Clover Flow). Services and products may evolve and their features may change over time based on technical developments.',
    },
    {
      title: 'Intellectual Property',
      body: 'All content, software, designs, and trademarks associated with us are protected under intellectual property laws. They may not be used without prior written permission.',
    },
    {
      title: 'Raseed Licenses',
      body: 'Raseed is used under a license for a defined period and is tied to the device where it was activated. All updates are included during the license period. Keep your license number and contact us for transfers when needed.',
    },
    {
      title: 'Service Updates',
      body: 'We reserve the right to pause or discontinue a service or product temporarily for maintenance, updates, or technical improvements, without affecting the rights of current users.',
    },
    {
      title: 'Limitation of Liability',
      body: 'We provide services "as is." We are not liable for indirect damages resulting from use or inability to use, within the limits permitted by law.',
    },
    {
      title: 'Governing Law',
      body: 'These terms are governed by the laws in force in the Syrian Arab Republic. Any dispute shall be resolved in accordance with applicable laws.',
    },
    {
      title: 'Contact',
      body: 'For any questions about these terms, please contact us via the email listed on the contact page.',
    },
  ];

  return (
    <Layout
      title={seo.title}
      description={seo.description}
      canonical={seo.canonical}
    >
      <Helmet>
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
      </Helmet>

      <Section size="lg" background="white">
        <Container>
          <div className="max-w-3xl mx-auto space-y-8">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="heading-3 text-neutral-900 mb-3">{section.title}</h2>
                <p className="body text-neutral-600">{section.body}</p>
              </div>
            ))}

            <div className="pt-4 border-t border-neutral-200">
              <NavLink to="/contact#form" className="btn btn-primary inline-flex">
                {t.common.contactUs}
              </NavLink>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  );
}