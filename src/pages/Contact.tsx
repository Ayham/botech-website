import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { Section, Container, Input, Textarea, Button } from '@/components/ui';
import { siteConfig } from '@/config/site';
import { useSite } from '@/hooks/useSite';
import { useI18n } from '@/i18n';
import { pageSEO } from '@/config/seo';
import { useLocation } from 'react-router-dom';
import { Reveal, RevealStagger } from '@/components/ui/Reveal';
import { OrbitBackground } from '@/components/ui/OrbitBackground';

const RECAPTCHA_SITE_KEY = siteConfig.contact.recaptchaSiteKey;

interface RecaptchaApi {
  render: (container: string, options: Record<string, unknown>) => void;
  getResponse: () => string;
  reset: () => void;
}

declare global {
  interface Window {
    grecaptcha?: RecaptchaApi;
  }
}

export function Contact() {
  const { t, locale } = useI18n();
  const { site } = useSite();
  const seo = locale === 'ar' ? pageSEO.contact : pageSEO.contactEn;
  const location = useLocation();
  
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
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [captchaToken, setCaptchaToken] = useState('');
  const [captchaRendered, setCaptchaRendered] = useState(false);
  const [captchaError, setCaptchaError] = useState('');

  const captchaRequired = RECAPTCHA_SITE_KEY !== '';
  const captchaRenderedRef = useRef(false);

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY || captchaRenderedRef.current) return;

    const renderWidget = () => {
      if (captchaRenderedRef.current || !window.grecaptcha) return;
      const container = document.getElementById('recaptcha-container');
      if (!container) return;
      window.grecaptcha.render('recaptcha-container', {
        sitekey: RECAPTCHA_SITE_KEY,
        hl: locale === 'ar' ? 'ar' : 'en',
        callback: () => {
          setCaptchaToken(window.grecaptcha!.getResponse());
          setCaptchaError('');
        },
        'expired-callback': () => setCaptchaToken(''),
        'error-callback': () => setCaptchaToken(''),
      });
      captchaRenderedRef.current = true;
      setCaptchaRendered(true);
    };

    if (window.grecaptcha) {
      renderWidget();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>('script[src*="recaptcha/api.js"]');
    if (existing) {
      const timer = window.setInterval(() => {
        if (window.grecaptcha) {
          window.clearInterval(timer);
          renderWidget();
        }
      }, 300);
      window.setTimeout(() => window.clearInterval(timer), 15000);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=explicit&hl=${locale === 'ar' ? 'ar' : 'en'}`;
    script.async = true;
    script.defer = true;
    script.onload = renderWidget;
    document.head.appendChild(script);
  }, [locale]);

  useEffect(() => {
    if (location.hash === '#form') {
      const formSection = document.getElementById('contact-form');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location.hash]);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return locale === 'ar' ? 'الاسم مطلوب' : 'Name is required';
        if (value.trim().length < 2) return locale === 'ar' ? 'الاسم قصير جداً' : 'Name too short';
        break;
      case 'email':
        if (!value.trim()) return locale === 'ar' ? 'البريد الإلكتروني مطلوب' : 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return locale === 'ar' ? 'بريد إلكتروني غير صحيح' : 'Invalid email';
        break;
      case 'message':
        if (!value.trim()) return locale === 'ar' ? 'الرسالة مطلوبة' : 'Message is required';
        if (value.trim().length < 20) return locale === 'ar' ? 'الرسالة قصيرة جداً (20 حرف على الأقل)' : 'Message too short (min 20 chars)';
        break;
    }
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name] && errors[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    let hasErrors = false;
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) {
        newErrors[key] = error;
        hasErrors = true;
      }
    });
    
    setErrors(newErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    return !hasErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const endpoint = siteConfig.contact.formEndpoint;

    if (captchaRequired && !captchaToken) {
      setCaptchaError(locale === 'ar' ? 'أكّد أنك لست روبوتاً' : 'Please confirm you are not a robot');
      return;
    }

    setStatus('submitting');

    try {
      if (!endpoint) {
        throw new Error('form endpoint not configured');
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          subject: formData.subject || (locale === 'ar' ? 'رسالة جديدة' : 'New message'),
          message: formData.message,
          recaptcha: captchaToken,
        }),
      });

      const text = await response.text();
      let data: any = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = null;
      }

      if (response.ok && data?.success === true) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
        setTouched({});
        setCaptchaToken('');
        if (window.grecaptcha && captchaRendered) {
          window.grecaptcha.reset();
        }
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error(data?.error || 'send failed');
      }
    } catch {
      setStatus('error');
      if (window.grecaptcha && captchaRendered) {
        window.grecaptcha.reset();
        setCaptchaToken('');
      }
    }
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

      {/* Contact Form & Info */}
      <Section size="xl" background="white" id="contact-form" className="relative overflow-hidden">
        <OrbitBackground variant="contact" />
        <Container>
          <div className="grid lg:grid-cols-3 gap-12 relative">
            <Reveal delay={0} className="lg:col-span-1">
              {/* Contact Info */}
              <div className="space-y-8">
                <div className="p-6 sm:p-8 bg-neutral-50 rounded-2xl border border-neutral-200">
                  <h2 className="heading-3 text-neutral-900 mb-4">{t.contact.info.title}</h2>
                  <address className="not-italic space-y-6 text-neutral-600">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900">{t.contact.info.email}</p>
                        <a href={`mailto:${site.contact.email}`} className="text-primary-600 hover:text-primary-700 transition-colors group flex items-center gap-1">
                          {site.contact.email}
                          <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900">{t.contact.info.phone}</p>
                        <a href={`tel:+${site.contact.phoneRaw}`} className="text-primary-600 hover:text-primary-700 transition-colors group flex items-center gap-1" dir="ltr">
                          {site.contact.phone}
                          <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.864-5.597-5.597l-.012-.012A2.657 2.657 0 0011.053 10c-.575 0-1.098.197-1.54.542l-.462.355-.002-.002a14.466 14.466 0 00-3.08 3.08l-.355.462c-.345.442-.542.965-.542 1.54 0 .994.774 1.792 1.862 1.947.012.012.024.023.037.035l5.597 5.597a.497.497 0 00.702-.005l.007-.01c.2-.194.328-.45.328-.715 0-.455-.313-.845-.75-.922a1.462 1.462 0 00-.263-.308zM12 4.5a5.5 5.5 0 110 11 5.5 5.5 0 010-11z"/></svg>
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900">{t.contact.info.whatsapp}</p>
                        <a href={site.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 transition-colors group flex items-center gap-1" dir="ltr">
                          {site.contact.phone}
                          <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </a>
                      </div>
                    </div>
                  </address>
                </div>

                {/* Quick info cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-center">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <p className="text-sm font-medium text-neutral-900">9AM - 6PM</p>
                    <p className="text-xs text-neutral-500">Response Time</p>
                  </div>
                  <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-center">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    </div>
                    <p className="text-sm font-medium text-neutral-900">{'<' + ' 24h'}</p>
                    <p className="text-xs text-neutral-500">Typical Reply</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100} className="lg:col-span-2 h-full">
              {/* Form */}
              <div className="h-full">
                <div className="card-padded h-full flex flex-col">
                  <div className="mb-6">
                    <h2 className="heading-3 text-neutral-900 mb-2">{t.contact.form.title}</h2>
                    <p className="body text-neutral-600">{locale === 'ar' ? 'املأ النموذج وسنرد عليك خلال 24 ساعة' : 'Fill out the form and we\'ll get back to you within 24 hours'}</p>
                  </div>
                  
                  {status === 'success' && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center gap-3 animate-slide-down" role="alert">
                      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      <p className="font-medium">{t.contact.form.success}</p>
                    </div>
                  )}
                  
                  {status === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-3 animate-slide-down" role="alert">
                      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-7.707-9.293a1 1 0 00-1.414 1.414L10.586 10l-2.293 2.293a1 1 0 001.414 1.414l2.293-2.293 2.293 2.293a1 1 0 001.414-1.414L11.414 10l2.293-2.293a1 1 0 00-1.414-1.414L10 8.586l-2.293-2.293z" clipRule="evenodd" /></svg>
                      <p className="font-medium">{t.contact.form.error}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5 flex-1 flex flex-col" noValidate>
                    <RevealStagger direction="up" delayStep={50}>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <Input
                          name="name"
                          label={t.common.name}
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.name ? errors.name : undefined}
                          required
                          placeholder={locale === 'ar' ? 'رامي سعيد' : 'Rami Saeed'}
                          hint={locale === 'ar' ? 'اسمك الكامل' : 'Your full name'}
                        />
                        <Input
                          name="email"
                          type="email"
                          label={t.common.email}
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.email ? errors.email : undefined}
                          required
                          placeholder="rami@example.com"
                          hint={locale === 'ar' ? 'بريدك الإلكتروني للتواصل' : 'Your email for reply'}
                        />
                      </div>
                      
                      <div className="grid sm:grid-cols-2 gap-5">
                        <Input
                          name="phone"
                          type="tel"
                          label={t.common.phone}
                          value={formData.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder={locale === 'ar' ? '050 123 4567' : '+966 50 123 4567'}
                          hint={locale === 'ar' ? 'اختياري' : 'Optional'}
                        />
                        <Input
                          name="company"
                          label={t.common.company}
                          value={formData.company}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder={locale === 'ar' ? 'اسم الشركة (اختياري)' : 'Company name (optional)'}
                          hint={locale === 'ar' ? 'اختياري' : 'Optional'}
                        />
                      </div>
                      
                      <Input
                        name="subject"
                        label={t.common.subject}
                        value={formData.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={locale === 'ar' ? 'موضوع الاستفسار' : 'Inquiry subject'}
                        hint={locale === 'ar' ? 'موضوع رسالتك' : 'Subject of your message'}
                      />
                      
                      <Textarea
                        name="message"
                        label={t.common.message}
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.message ? errors.message : undefined}
                        required
                        rows={5}
                        placeholder={locale === 'ar' ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                        hint={locale === 'ar' ? '20 حرف على الأقل' : 'Minimum 20 characters'}
                      />
                    </RevealStagger>

                    {captchaRequired && (
                      <div className="min-h-[82px]">
                        <div id="recaptcha-container" />
                        <p className="text-sm text-neutral-500 mt-1">
                          {locale === 'ar' ? 'حماية من الرسائل الآلية (spam)' : 'Protected from spam'}
                        </p>
                        {captchaError && (
                          <p className="text-sm text-red-600 mt-1 font-medium">{captchaError}</p>
                        )}
                      </div>
                    )}

                    <Button type="submit" fullWidth loading={status === 'submitting'} className="mt-auto pt-4">
                      {status === 'submitting' ? t.common.sending : t.common.submit}
                    </Button>
                  </form>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </Layout>
  );
}