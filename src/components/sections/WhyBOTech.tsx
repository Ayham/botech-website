import { useI18n } from '../../i18n';
import { useSite } from '../../hooks/useSite';
import { Card } from '../ui/Card';
import { Container } from '../ui/Container';
import { Section, SectionHeader } from '../ui/Section';
import { Reveal, RevealStagger } from '../ui/Reveal';
import { OrbitBackground } from '../ui/OrbitBackground';

const whyIcons: Record<string, React.ReactNode> = {
  tailored: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 16l4-16M6 9a4 4 0 014-4h2a4 4 0 014 4v11a2 2 0 01-2 2H6a2 2 0 01-2-2V9z" /></svg>,
  ux: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
  scalable: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>,
  'offline-first': <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>,
  'full-lifecycle': <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
};

export function WhyBOTech() {
  const { t, locale } = useI18n();
  const { site } = useSite();

  return (
    <Section size="lg" background="white" className="relative overflow-hidden">
      <OrbitBackground variant="minimal" />
      <Container className="relative">
        <SectionHeader
          title={t.whyBotech.title}
          subtitle={t.whyBotech.subtitle}
          divider
        />

        <RevealStagger direction="up" delayStep={80} className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {site.whyBotech.map((item, index) => (
            <Reveal key={item.key} delay={index * 80}>
              <Card variant="padded" hover interactive className="group h-full">
                <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-4 group-hover:bg-primary-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  {whyIcons[item.key] || whyIcons.tailored}
                </div>
                <h3 className="heading-4 text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                  {locale === 'ar' ? item.title.ar : item.title.en}
                </h3>
                <p className="body text-neutral-600 leading-relaxed">
                  {locale === 'ar' ? item.description.ar : item.description.en}
                </p>
              </Card>
            </Reveal>
          ))}
        </RevealStagger>
      </Container>
    </Section>
  );
}