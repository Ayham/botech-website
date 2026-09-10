import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Products } from '@/components/sections/Products';
import { WhyBOTech } from '@/components/sections/WhyBOTech';
import { Work } from '@/components/sections/Work';
import { CTA } from '@/components/sections/CTA';
import { pageSEO } from '@/config/seo';

export function Home() {
  const seo = pageSEO.home;

  return (
    <Layout 
      title={seo.title}
      description={seo.description}
      canonical={seo.canonical}
      ogImage={seo.ogImage}
    >
      <Helmet>
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content={seo.ogImage} />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={seo.ogImage} />
      </Helmet>

      <Hero />
      <Services />
      <Products />
      <WhyBOTech />
      <Work />
      <CTA />
    </Layout>
  );
}