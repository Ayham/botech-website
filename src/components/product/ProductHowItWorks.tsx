import { useI18n } from '../../i18n';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { RevealStagger } from '../ui/Reveal';

interface ProductHowItWorksProps {
  productKey: 'raseed' | 'clover';
}

interface Step {
  step: string;
  title: string;
  desc: string;
}

export function ProductHowItWorks({ productKey }: ProductHowItWorksProps) {
  const { t } = useI18n();
  const steps: Step[] = t[productKey].howItWorks?.steps || [];

  if (steps.length === 0) return null;

  return (
    <Section id="how-it-works" size="lg" background="white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="heading-2 text-neutral-900 mb-4">{t[productKey].howItWorks.title}</h2>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-10 left-1/2 transform -translate-x-1/2 w-0.5 h-[calc(100%-2.5rem)] bg-primary-100" aria-hidden="true" />
          
          <RevealStagger direction="up" delayStep={120} className="space-y-16">
            {steps.map((step) => (
              <div key={step.step} className="relative flex gap-6 lg:gap-10">
                <div className="relative flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-2xl lg:text-3xl font-bold z-10 group-hover:bg-primary-600 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                  {step.step}
                </div>
                
                <div className="flex-1 pt-2 lg:pt-0">
                  <h3 className="heading-4 text-neutral-900 mb-2">{step.title}</h3>
                  <p className="body text-neutral-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </RevealStagger>
        </div>
      </Container>
    </Section>
  );
}