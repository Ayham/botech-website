import { useI18n } from '../../i18n';
import { siteConfig } from '../../config/site';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';

interface ProductDownloadProps {
  productKey: 'raseed' | 'clover';
}

export function ProductDownload({ productKey }: ProductDownloadProps) {
  const { t, locale } = useI18n();
  const product = siteConfig.products[productKey];
  const download = t[productKey].download;
  const links = product.downloadLinks;

  return (
    <Section id="download" size="lg" background="white">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="heading-2 text-neutral-900 mb-4">{download.title}</h2>
          <p className="body-lg text-neutral-600 mb-10">{download.comingSoon}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            {links.android && (
              <a
                href={links.android}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-4 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition-colors w-full sm:w-auto"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 0a6 6 0 0 0-6 6v12a6 6 0 0 0 6 6h12a6 6 0 0 0 6-6V6a6 6 0 0 0-6-6H6zm9.678 14.727c-.254.937-1.532.937-1.787 0l-1.534-5.677h-4.263v5.677c-.255.937-1.533.937-1.787 0-.254-.938.929-1.722 1.81-1.543l3.08-1.026c.884-.294 1.652.55 1.465 1.416l-1.455 6.614c-.148.674.529 1.245 1.205 1.078.41-.1.763-.382 1.045-.775l1.713-4.746h4.534l1.712 4.746c.283.393.636.675 1.045.775.676.167 1.353-.404 1.205-1.078l-1.455-6.614c-.187-.866.58-1.71 1.465-1.416l3.08 1.026c.88.18 2.063.964 1.809 1.542z"/>
                </svg>
                <span className="font-medium">{download.android}</span>
              </a>
            )}

            {'apk' in links && 'apk' in download && download.apk && (
              <a
                href={links.apk!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-4 border-2 border-primary-600 text-primary-600 rounded-xl hover:bg-primary-50 transition-colors w-full sm:w-auto"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="font-medium">{download.apk}</span>
              </a>
            )}

            {'web' in links && 'web' in download && download.web && (
              <a
                href={links.web!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors w-full sm:w-auto"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="font-medium">{locale === 'ar' ? 'لوحة التحكم' : 'Web Dashboard'}</span>
              </a>
            )}
          </div>

          <p className="body-sm text-neutral-500">
            {locale === 'ar' ? 'يتطلب Android 8.0 أو أحدث' : 'Requires Android 8.0 or later'}
          </p>
        </div>
      </Container>
    </Section>
  );
}