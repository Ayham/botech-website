import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { Section, Container, Input, Textarea, Button } from '@/components/ui';
import { siteConfig } from '@/config/site';
import { useI18n } from '@/i18n';
import { pageSEO } from '@/config/seo';

export function Contact() {
  const { t, locale } = useI18n();
  const seo = locale === 'ar' ? pageSEO.contact : pageSEO.contactEn;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = locale === 'ar' ? 'الاسم مطلوب' : 'Name is required';
    if (!formData.email.trim()) newErrors.email = locale === 'ar' ? 'البريد الإلكتروني مطلوب' : 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = locale === 'ar' ? 'بريد إلكتروني غير صحيح' : 'Invalid email';
    if (!formData.message.trim()) newErrors.message = locale === 'ar' ? 'الرسالة مطلوبة' : 'Message is required';
    else if (formData.message.trim().length < 20) newErrors.message = locale === 'ar' ? 'الرسالة قصيرة جداً (20 حرف على الأقل)' : 'Message too short (min 20 chars)';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus('submitting');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In production, replace with actual form submission (Formspree, Netlify Forms, etc.)
    // const formData = new FormData();
    // formData.append('name', formData.name);
    // ...
    // await fetch('https://formspree.io/f/your-id', { method: 'POST', body: formData });
    
    setStatus('success');
    setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
    
    setTimeout(() => setStatus('idle'), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

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

      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-neutral-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 text-neutral-900 mb-6">{t.contact.title}</h1>
            <p className="body-lg text-neutral-600">{t.contact.subtitle}</p>
          </div>
        </Container>
      </section>

      {/* Contact Form & Info */}
      <Section size="lg" background="white">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="heading-3 text-neutral-900 mb-4">{t.contact.info.title}</h2>
                <address className="not-italic space-y-4 text-neutral-600">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">{t.contact.info.email}</p>
                      <a href={`mailto:${siteConfig.contact.email}`} className="text-primary-600 hover:text-primary-700">{siteConfig.contact.email}</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">{t.contact.info.phone}</p>
                      <a href={`tel:${siteConfig.contact.phone}`} className="text-primary-600 hover:text-primary-700">{siteConfig.contact.phone}</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.864-5.597-5.597l-.012-.012A2.657 2.657 0 0011.053 10c-.575 0-1.098.197-1.54.542l-.462.355-.002-.002a14.466 14.466 0 00-3.08 3.08l-.355.462c-.345.442-.542.965-.542 1.54 0 .994.774 1.792 1.862 1.947.012.012.024.023.037.035l5.597 5.597a.497.497 0 00.702-.005l.007-.01c.2-.194.328-.45.328-.715 0-.455-.313-.845-.75-.922a1.462 1.462 0 00-.263-.308zM12 4.5a5.5 5.5 0 110 11 5.5 5.5 0 010-11z"/></svg>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">{t.contact.info.whatsapp}</p>
                      <a href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">{siteConfig.contact.whatsapp}</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">{t.contact.info.address}</p>
                      <p className="text-neutral-600">{locale === 'ar' ? siteConfig.contact.address.ar : siteConfig.contact.address.en}</p>
                    </div>
                  </div>
                </address>
              </div>

              <div className="border-t border-neutral-200 pt-6">
                <h3 className="font-semibold text-neutral-900 mb-4">{t.footer.followUs}</h3>
                <div className="flex gap-4">
                  {[
                    { key: 'facebook', href: siteConfig.contact.social.facebook, icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg> },
                    { key: 'youtube', href: siteConfig.contact.social.youtube, icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
                    { key: 'linkedin', href: siteConfig.contact.social.linkedin, icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                  ].map(social => (
                    <a key={social.key} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-neutral-100 text-neutral-600 flex items-center justify-center hover:bg-primary-100 hover:text-primary-600 transition-colors" aria-label={social.key}>
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="card-padded">
                <h2 className="heading-3 text-neutral-900 mb-6">{t.contact.form.title}</h2>
                
                {status === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700" role="alert">
                    <p className="font-medium">{t.contact.form.success}</p>
                  </div>
                )}
                
                {status === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700" role="alert">
                    <p className="font-medium">{t.contact.form.error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input
                      name="name"
                      label={t.common.name}
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                      required
                      placeholder={locale === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed'}
                    />
                    <Input
                      name="email"
                      type="email"
                      label={t.common.email}
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      required
                      placeholder="ahmed@example.com"
                    />
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input
                      name="phone"
                      type="tel"
                      label={t.common.phone}
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={locale === 'ar' ? '050 123 4567' : '+966 50 123 4567'}
                    />
                    <Input
                      name="company"
                      label={t.common.company}
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={locale === 'ar' ? 'اسم الشركة (اختياري)' : 'Company name (optional)'}
                    />
                  </div>
                  
                  <Input
                    name="subject"
                    label={t.common.subject}
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={locale === 'ar' ? 'موضوع الاستفسار' : 'Inquiry subject'}
                  />
                  
                  <Textarea
                    name="message"
                    label={t.common.message}
                    value={formData.message}
                    onChange={handleChange}
                    error={errors.message}
                    required
                    rows={5}
                    placeholder={locale === 'ar' ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                  />
                  
                  <Button type="submit" fullWidth loading={status === 'submitting'}>
                    {status === 'submitting' ? t.common.sending : t.common.submit}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  );
}