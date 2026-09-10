import { useI18n } from '../../i18n';
import { siteConfig } from '../../config/site';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Container } from '../ui/Container';
import { Section, SectionHeader } from '../ui/Section';
import { NavLink } from 'react-router-dom';

export function Work() {
  const { t, locale } = useI18n();

  return (
    <Section id="work" size="lg" background="white">
      <Container>
        <SectionHeader
          badge={t.work.title}
          title={t.work.title}
          subtitle={t.work.subtitle}
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {siteConfig.work.map((project, index) => (
            <Card key={project.key} variant="bordered" hover className="overflow-hidden flex flex-col animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
              <div className="relative aspect-video bg-neutral-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                {project.image && (
                  <img 
                    src={project.image} 
                    alt="" 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="neutral" size="sm">
                    {locale === 'ar' ? project.type.ar : project.type.en}
                  </Badge>
                </div>
                
                <h3 className="heading-4 text-neutral-900 mb-2">
                  {locale === 'ar' && 'nameAr' in project ? project.nameAr : project.name}
                </h3>
                
                <p className="body text-neutral-600 mb-4 flex-grow">
                  {locale === 'ar' ? project.description.ar : project.description.en}
                </p>
                
                <NavLink 
                  to={project.url} 
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  {t.work.viewProject}
                  <svg className="w-4 h-4 rtl-flip" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </NavLink>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}