import { useI18n } from '../../i18n';
import { siteConfig } from '../../config/site';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Container } from '../ui/Container';
import { Section, SectionHeader } from '../ui/Section';
import { NavLink } from 'react-router-dom';
import { Reveal, RevealStagger } from '../ui/Reveal';

export function Work({ showHeader = true }: { showHeader?: boolean }) {
  const { t, locale } = useI18n();

  return (
    <Section id="work" size="lg" background="white">
      <Container>
        {showHeader && (
          <SectionHeader
            title={t.work.title}
            subtitle={t.work.subtitle}
            divider
          />
        )}

        <RevealStagger direction="up" delayStep={120} className={`mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 ${showHeader ? '' : 'mt-0'}`}>
          {siteConfig.work.map((project, index) => (
            <Reveal key={project.key} delay={index * 120}>
              <Card key={project.key} variant="elevated" hover interactive className="overflow-hidden flex flex-col group">
                <div className="relative aspect-video bg-neutral-100 overflow-hidden image-reveal">
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  {project.image && (
                    <img 
                      src={project.image} 
                      alt={locale === 'ar' && 'nameAr' in project ? project.nameAr : project.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="neutral" size="sm" className="group-hover:bg-primary-100 group-hover:text-primary-700 transition-colors">
                      {locale === 'ar' ? project.type.ar : project.type.en}
                    </Badge>
                  </div>
                  
                  <h3 className="heading-4 text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                    {locale === 'ar' && 'nameAr' in project ? project.nameAr : project.name}
                  </h3>
                  
                  <p className="body text-neutral-600 mb-4 flex-grow leading-relaxed">
                    {locale === 'ar' ? project.description.ar : project.description.en}
                  </p>
                  
                  <NavLink 
                    to={project.url} 
                    className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors group"
                  >
                    {t.work.viewProject}
                    <svg className="w-4 h-4 rtl-flip transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </NavLink>
                </div>
              </Card>
            </Reveal>
          ))}
        </RevealStagger>
      </Container>
    </Section>
  );
}