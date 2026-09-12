import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { Section, Container } from '@/components/ui';
import { useI18n } from '@/i18n';
import { pageSEO } from '@/config/seo';
import { NavLink } from 'react-router-dom';

export function PrivacyPage() {
  const { t, locale } = useI18n();
  const seo = locale === 'ar' ? pageSEO.privacy : pageSEO.privacyEn;

  const sections = locale === 'ar' ? [
    {
      title: 'نطاق السياسة',
      body: 'تنطبق سياسة الخصوصية هذه على موقع Blue Orbit Technologies الإلكتروني ومنتجاتنا (Raseed و Clover Flow) وخدماتنا. نحن ملتزمون بحماية بياناتك واحترام خصوصيتك.',
    },
    {
      title: 'البيانات التي نجمعها',
      body: 'قد نجمع الحد الأدنى من البيانات اللازمة لتحسين خدماتنا والتواصل معك، مثل الاسم والبريد الإلكتروني ورقم الهاتف عند التواصل معنا. لا نقوم بجمع بيانات شخصية دون سبب واضح يوافق عليه المستخدم.',
    },
    {
      title: 'استخدام البيانات',
      body: 'نستخدم البيانات التي نجمعها للرد على استفساراتك، وتقديم الخدمات التي طلبتها، وتحسين جودة منتجاتنا. لا نبيع بياناتك أو نشاركها مع أطراف ثالثة لأغراض تسويقية.',
    },
    {
      title: 'موقع Raseed',
      body: 'يتضمن تطبيق Raseed بيانات تحويلات تعمل محلياً على جهازك. احتفظ بالنسخ الاحتياطية عند الحاجة. لا يشارك التطبيق سجل تحويلاتك مع أطراف خارجية.',
    },
    {
      title: 'الملفات الداعمة (Cookies والـ localStorage)',
      body: 'ربما نستخدم تخزين المتصفح المحلي (localStorage) لحفظ إعدادات الموقع مثل اللغة المفضلة. يمكنك مسح هذه البيانات من إعدادات متصفحك في أي وقت.',
    },
    {
      title: 'أمان البيانات',
      body: 'نتخذ إجراءات مناسبة لحماية البيانات من الوصول غير المصرح به أو التعديل أو الإفشاء. لا توجد خدمة إلكترونية مضمونة بنسبة 100%، لذلك لا نضمن أماناً مطلقاً.',
    },
    {
      title: 'اتصل بنا',
      body: 'لأي استفسار حول سياسة الخصوصية، تواصل معنا عبر البريد الإلكتروني.',
    },
  ] : [
    {
      title: 'Scope',
      body: 'This privacy policy applies to the Blue Orbit Technologies website, our products (Raseed and Clover Flow), and our services. We are committed to protecting your data and respecting your privacy.',
    },
    {
      title: 'Data We Collect',
      body: 'We may collect the minimum data needed to improve our services and communicate with you, such as name, email, and phone number when you contact us. We do not collect personal data without a clear, user-consented reason.',
    },
    {
      title: 'Use of Data',
      body: 'We use the data we collect to respond to your inquiries, deliver services you request, and improve our products. We do not sell your data or share it with third parties for marketing purposes.',
    },
    {
      title: 'The Raseed App',
      body: 'Raseed stores transfer records locally on your device. Please keep backups when needed. The app does not share your transfer history with outside parties.',
    },
    {
      title: 'Cookies and localStorage',
      body: 'We may use browser local storage (localStorage) to save site preferences such as your language. You can clear this data from your browser settings at any time.',
    },
    {
      title: 'Data Security',
      body: 'We take appropriate measures to protect data from unauthorized access, modification, or disclosure. No electronic service is 100% secure, so we cannot guarantee absolute security.',
    },
    {
      title: 'Contact Us',
      body: 'For any privacy-related questions, please contact us via email.',
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