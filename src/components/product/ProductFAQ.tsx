import { useI18n } from '../../i18n';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { RevealStagger } from '../ui/Reveal';

interface ProductFAQProps {
  productKey: 'raseed' | 'clover';
}

export function ProductFAQ({ productKey }: ProductFAQProps) {
  const { t } = useI18n();
  const faq = t[productKey].faq;

  if (!faq || !faq.items.length) return null;

  return (
    <Section id="faq" size="lg" background="neutral">
      <Container>
        <div className="text-center mb-12">
          <h2 className="heading-2 text-neutral-900 mb-4">{faq.title}</h2>
        </div>

        <RevealStagger direction="up" delayStep={50} className="max-w-3xl mx-auto space-y-4">
          {faq.items.map((item, index) => (
            <details key={index} className="group bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none group-hover:bg-neutral-50 transition-colors">
                <h3 className="heading-4 text-neutral-900 pr-4">
                  {item.q}
                </h3>
                <svg className="w-5 h-5 text-neutral-400 group-open:rotate-180 transition-transform duration-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-6 border-t border-neutral-200 animate-slide-down">
                <p className="body text-neutral-600 leading-relaxed">
                  {item.a}
                </p>
              </div>
            </details>
          ))}
        </RevealStagger>
      </Container>
    </Section>
  );
}