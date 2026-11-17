import type { ReactNode } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Section, Container, Reveal } from '@/components/ui';
import { siteConfig } from '@/config/site';
import { useI18n } from '@/i18n';
import { pageSEO } from '@/config/seo';
import { NavLink } from 'react-router-dom';
import { OrbitBackground } from '@/components/ui/OrbitBackground';
import { JsonLd } from '@/components/ui/JsonLd';
import { breadcrumbJsonLd, softwareAppJsonLd, faqJsonLd } from '@/config/structured-data';
import { cloverContent } from '@/config/clover-content';
import { CloverIcon } from '@/components/clover/CloverIcon';
import { FeatureGroupCard } from '@/components/clover/FeatureGroupCard';
import { SpotlightRow } from '@/components/clover/SpotlightRow';
import { EcosystemDiagram } from '@/components/clover/EcosystemDiagram';
import { PlatformCard } from '@/components/clover/PlatformCard';
import { WhatsAppButton } from '@/components/clover/WhatsAppButton';

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-clover-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-clover-700 ring-1 ring-clover-100">
      <span className="h-1.5 w-1.5 rounded-full bg-clover-500" aria-hidden="true" />
      {children}
    </span>
  );
}

export function CloverPage() {
  const { locale } = useI18n();
  const seo = locale === 'ar' ? pageSEO.clover : pageSEO.cloverEn;
  const product = siteConfig.products.clover;
  const content = cloverContent[locale];
  const storeTypeList = Array.isArray(product.storeTypes) ? product.storeTypes : [];

  const whatsappLink = (message: string) =>
    `${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;

  const heroWhatsApp = whatsappLink(
    locale === 'ar'
      ? 'مرحبًا، أريد معرفة المزيد عن Clover Flow POS وClover Market لمتجري.'
      : 'Hi, I would like to learn more about Clover Flow POS and Clover Market for my store.'
  );

  const pricingWhatsApp = whatsappLink(
    locale === 'ar'
      ? 'مرحبًا، أريد معرفة الخيارات والأسعار المناسبة لمتجري في Clover.'
      : 'Hi, I would like to learn about the options and pricing that fit my store for Clover.'
  );

  const finalWhatsApp = whatsappLink(
    locale === 'ar'
      ? 'مرحبًا، أريد التحدث عن تشغيل Clover في متجري.'
      : 'Hi, I would like to talk about running Clover in my store.'
  );

  const downloadsWhatsApp = whatsappLink(
    locale === 'ar'
      ? 'مرحبًا، أريد المساعدة في تحميل تطبيقات Clover.'
      : 'Hi, I would like help downloading the Clover apps.'
  );

  return (
    <Layout
      title={seo.title}
      description={seo.description}
      canonical={seo.canonical}
      ogImage={seo.ogImage}
    >
      <JsonLd
        data={breadcrumbJsonLd([
          { label: siteConfig.navigation.main[0].label[locale], href: '/' },
          {
            label: siteConfig.navigation.main.find((n) => n.key === 'products')!.label[locale],
            href: '/products',
          },
          { label: product.name, href: '/clover' },
        ])}
      />
      <JsonLd
        data={softwareAppJsonLd({
          name: product.name,
          url: '/clover',
          image: product.logo,
          description: locale === 'ar' ? product.description.ar : product.description.en,
          operatingSystem: 'Windows (browser), Android, Web',
        })}
      />
      {content.faq.items.length > 0 && <JsonLd data={faqJsonLd(content.faq.items)} />}

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#021712] pt-28 pb-16 text-white lg:pt-36 lg:pb-24">
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src={content.hero.visual.src}
            alt=""
            className="h-full w-full object-cover opacity-20"
            width={content.hero.visual.width}
            height={content.hero.visual.height}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#021712]/95 via-[#04251d]/92 to-[#031437]/95" />
          <div className="absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-clover-500/20 blur-3xl" />
          <div className="absolute -right-16 top-0 h-96 w-96 rounded-full bg-primary-500/20 blur-3xl" />
        </div>
        <OrbitBackground variant="dark" />

        <Container>
          <div className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <Reveal direction="up">
              <div className="flex flex-wrap items-center gap-3">
                <img
                  src={product.logo}
                  alt={product.name}
                  className="h-12 w-12 rounded-xl object-cover shadow-lg ring-1 ring-white/20"
                  width="48"
                  height="48"
                />
                <span className="inline-flex items-center gap-2 rounded-full border border-clover-400/30 bg-clover-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-clover-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-clover-400" aria-hidden="true" />
                  {content.hero.eyebrow}
                </span>
              </div>

              <h1 className="heading-1 mt-6 max-w-3xl text-white">{content.hero.title}</h1>

              <p className="body-lg mt-5 max-w-2xl text-neutral-300">{content.hero.lead}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <WhatsAppButton href={heroWhatsApp} variant="light">
                  {content.hero.primaryCta}
                </WhatsAppButton>
                <a
                  href="#ecosystem"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/50 px-7 py-3.5 text-lg font-medium text-white transition-all duration-200 hover:border-white/70 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#021712]"
                >
                  {content.hero.secondaryCta}
                  <CloverIcon name="arrow" className="h-4 w-4 rtl-flip" />
                </a>
              </div>

              <p className="mt-4 text-sm text-neutral-400">{content.hero.whatsappNote}</p>

              <ul className="mt-7 flex flex-wrap gap-2">
                {content.hero.chips.map((chip) => (
                  <li
                    key={chip}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-200"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal direction="left" delay={150} className="relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/5 shadow-2xl">
                  <div className="aspect-[4/3]">
                    <img
                      src={content.hero.visual.src}
                      alt={content.hero.visual.alt}
                      className="h-full w-full object-cover"
                      width={content.hero.visual.width}
                      height={content.hero.visual.height}
                      loading="eager"
                    />
                  </div>
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#021712]/90 via-[#021712]/20 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-md">
                    <span className="h-2 w-2 rounded-full bg-clover-400" aria-hidden="true" />
                    {content.hero.visualLabel}
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                    <p className="text-sm leading-relaxed text-white">{content.hero.visualCaption}</p>
                  </div>
                </div>

                <div className="absolute -bottom-5 -left-2 hidden items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-900 shadow-xl sm:flex rtl:-left-auto rtl:-right-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-clover-100 text-clover-700">
                    <CloverIcon name="cloud-off" className="h-4 w-4" />
                  </span>
                  {content.hero.offlineBadge}
                </div>
                <div className="absolute -right-2 top-8 hidden items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-900 shadow-xl sm:flex rtl:-right-auto rtl:-left-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-800">
                    <CloverIcon name="store" className="h-4 w-4" />
                  </span>
                  Clover Market
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Quick pillars */}
      <section className="border-b border-neutral-200 bg-white">
        <Container className="py-8 sm:py-10">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {content.pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 60} className="h-full">
                <div className="flex h-full items-start gap-3">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-clover-50 text-clover-700 ring-1 ring-clover-100">
                    <CloverIcon name={pillar.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="text-sm font-semibold text-neutral-900">{pillar.title}</h2>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-600">{pillar.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Daily challenges */}
      <Section size="lg" background="neutral" id="why">
        <Container>
          <Reveal className="max-w-3xl">
            <Eyebrow>{content.pain.eyebrow}</Eyebrow>
            <h2 className="heading-2 mt-4 text-neutral-900">{content.pain.title}</h2>
            <p className="body-lg mt-4 text-neutral-600">{content.pain.subtitle}</p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {content.pain.items.map((item, index) => (
              <Reveal key={item.title} delay={index * 60} className="h-full">
                <div className="group flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-clover-200 hover:shadow-lg">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-clover-50 text-clover-700 ring-1 ring-clover-100 transition-colors duration-300 group-hover:bg-clover-600 group-hover:text-white">
                    <CloverIcon name={item.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="heading-4 mt-4 text-neutral-900">{item.title}</h3>
                  <p className="body-sm mt-2 text-neutral-600">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Ecosystem */}
      <Section size="lg" background="white" id="ecosystem">
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <Eyebrow>{content.ecosystem.eyebrow}</Eyebrow>
            </div>
            <h2 className="heading-2 mt-4 text-neutral-900">{content.ecosystem.title}</h2>
            <p className="body-lg mt-4 text-neutral-600">{content.ecosystem.subtitle}</p>
          </Reveal>

          <Reveal delay={120} className="mt-12">
            <EcosystemDiagram ecosystem={content.ecosystem} />
          </Reveal>
        </Container>
      </Section>

      {/* Feature groups */}
      <Section size="lg" background="neutral" id="features">
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <Eyebrow>{content.features.eyebrow}</Eyebrow>
            </div>
            <h2 className="heading-2 mt-4 text-neutral-900">{content.features.title}</h2>
            <p className="body-lg mt-4 text-neutral-600">{content.features.subtitle}</p>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {content.features.groups.map((group, index) => (
              <Reveal key={group.key} delay={index * 50} className="h-full">
                <FeatureGroupCard group={group} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Spotlights */}
      <Section size="lg" background="white" id="details">
        <Container>
          <Reveal className="max-w-3xl">
            <Eyebrow>{content.spotlights.eyebrow}</Eyebrow>
            <h2 className="heading-2 mt-4 text-neutral-900">{content.spotlights.title}</h2>
            <p className="body-lg mt-4 text-neutral-600">{content.spotlights.subtitle}</p>
          </Reveal>

          <div className="mt-14 space-y-16 lg:space-y-24">
            {content.spotlights.items.map((spotlight, index) => (
              <Reveal key={spotlight.key}>
                <SpotlightRow
                  spotlight={spotlight}
                  currencyPanel={content.currencyPanel}
                  reverse={index % 2 === 1}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Platforms */}
      <Section size="lg" background="neutral" id="platforms">
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <Eyebrow>{content.platforms.eyebrow}</Eyebrow>
            </div>
            <h2 className="heading-2 mt-4 text-neutral-900">{content.platforms.title}</h2>
            <p className="body-lg mt-4 text-neutral-600">{content.platforms.subtitle}</p>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {content.platforms.items.map((platform, index) => (
              <Reveal key={platform.key} delay={index * 70} className="h-full">
                <PlatformCard platform={platform} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-6">
            <p className="mx-auto max-w-2xl text-center text-sm text-neutral-500">{content.platforms.note}</p>
          </Reveal>
        </Container>
      </Section>

      {/* Clover Market */}
      <section id="market" className="relative overflow-hidden bg-[#021712] py-16 text-white sm:py-24 lg:py-32">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute -right-24 top-10 h-[30rem] w-[30rem] rounded-full bg-clover-500/15 blur-3xl" />
          <div className="absolute -left-20 bottom-0 h-[26rem] w-[26rem] rounded-full bg-primary-500/15 blur-3xl" />
        </div>
        <OrbitBackground variant="dark" />

        <Container>
          <div className="relative grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2 rounded-full border border-clover-400/30 bg-clover-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-clover-200">
                <span className="h-1.5 w-1.5 rounded-full bg-clover-400" aria-hidden="true" />
                {content.market.eyebrow}
              </span>
              <h2 className="heading-2 mt-4 text-white">{content.market.title}</h2>
              <p className="body-lg mt-4 text-neutral-300">{content.market.subtitle}</p>
              <p className="body mt-4 text-neutral-400">{content.market.lead}</p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {content.market.features.map((feature) => (
                  <div key={feature.title} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-clover-500/15 text-clover-300">
                      <CloverIcon name={feature.icon} className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{feature.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-neutral-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-sm text-clover-200/80">{content.market.note}</p>
            </Reveal>

            <Reveal direction="left" delay={120} className="relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative overflow-hidden rounded-[2rem] border border-white/15 shadow-2xl">
                  <div className="aspect-[4/5]">
                    <img
                      src={content.market.image.src}
                      alt={content.market.image.alt}
                      className="h-full w-full object-cover"
                      width={content.market.image.width}
                      height={content.market.image.height}
                    />
                  </div>
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#021712]/90 via-[#021712]/15 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-clover-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />
                    {content.market.imageLabel}
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-black/30 p-4 backdrop-blur-md">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-clover-200">
                      {content.market.statusesLabel}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {content.market.statuses.map((status) => (
                        <span
                          key={status}
                          className="rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[11px] text-neutral-100"
                        >
                          {status}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={150} className="relative mt-14 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h3 className="heading-3 text-white">{content.market.flowTitle}</h3>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-clover-300">
                Clover Market → Clover Flow POS
              </span>
            </div>

            <ol className="mt-7 grid gap-5 md:grid-cols-4">
              {content.market.flow.map((step, index) => (
                <li key={step.title} className="relative">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-clover-500 text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <h4 className="text-sm font-semibold text-white">{step.title}</h4>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-400">{step.description}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </section>

      {/* Integration */}
      <Section size="lg" background="white" id="integration">
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <Eyebrow>{content.integration.eyebrow}</Eyebrow>
            </div>
            <h2 className="heading-2 mt-4 text-neutral-900">{content.integration.title}</h2>
            <p className="body-lg mt-4 text-neutral-600">{content.integration.subtitle}</p>
          </Reveal>

          <div className="relative mt-12">
            <div
              className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-clover-200 to-transparent md:block"
              aria-hidden="true"
            />
            <div className="grid gap-6 md:grid-cols-4">
              {content.integration.steps.map((step, index) => (
                <Reveal key={step.title} delay={index * 80} className="relative h-full">
                  <div className="flex h-full flex-col items-center rounded-2xl border border-neutral-200 bg-white px-5 py-6 text-center shadow-sm">
                    <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-clover-600 text-base font-bold text-white shadow-lg shadow-clover-900/10">
                      {index + 1}
                    </span>
                    <h3 className="heading-4 mt-4 text-neutral-900">{step.title}</h3>
                    <p className="body-sm mt-2 text-neutral-600">{step.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Store types */}
      {storeTypeList.length > 0 && (
        <Section size="md" background="neutral" id="store-types">
          <Container>
            <Reveal className="mx-auto max-w-3xl text-center">
              <div className="flex justify-center">
                <Eyebrow>{content.storeTypes.eyebrow}</Eyebrow>
              </div>
              <h2 className="heading-2 mt-4 text-neutral-900">{content.storeTypes.title}</h2>
              <p className="body-lg mt-4 text-neutral-600">{content.storeTypes.subtitle}</p>
            </Reveal>

            <Reveal delay={100} className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
              {storeTypeList.map((type) => (
                <span
                  key={type.key}
                  className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm transition-colors duration-200 hover:border-clover-200 hover:text-clover-700"
                >
                  {type.label[locale]}
                </span>
              ))}
            </Reveal>

            <Reveal delay={150}>
              <p className="mt-5 text-center text-sm text-neutral-500">{content.storeTypes.note}</p>
            </Reveal>
          </Container>
        </Section>
      )}

      {/* Pricing information */}
      <Section size="lg" background="white" id="pricing-info">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-clover-100 bg-gradient-to-br from-clover-50 via-white to-primary-50/50 p-6 sm:p-10 lg:p-14">
              <div
                className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-clover-200/40 blur-3xl"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-primary-200/30 blur-3xl"
                aria-hidden="true"
              />

              <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                <div>
                  <Eyebrow>{content.pricing.eyebrow}</Eyebrow>
                  <h2 className="heading-2 mt-4 text-neutral-900">{content.pricing.title}</h2>
                  <p className="body-lg mt-4 max-w-2xl text-neutral-600">{content.pricing.lead}</p>

                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    {content.pricing.items.map((item) => (
                      <div key={item.title} className="rounded-2xl border border-neutral-200 bg-white/80 p-4">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-clover-50 text-clover-700">
                          <CloverIcon name={item.icon} className="h-4 w-4" />
                        </span>
                        <h3 className="mt-3 text-sm font-semibold text-neutral-900">{item.title}</h3>
                        <p className="mt-1 text-xs leading-relaxed text-neutral-600">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-clover-200 bg-white p-6 shadow-xl sm:p-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-clover-600 text-white shadow-lg shadow-clover-900/15">
                    <CloverIcon name="whatsapp" className="h-7 w-7" />
                  </div>
                  <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-clover-700">
                    WhatsApp
                  </p>
                  <p className="mt-2 text-lg font-semibold text-neutral-900">{content.pricing.whatsappCta}</p>
                  <p className="mt-2 text-sm text-neutral-600">{content.pricing.whatsappNote}</p>

                  <div className="mt-6">
                    <WhatsAppButton href={pricingWhatsApp} variant="primary" size="lg" className="w-full">
                      {content.pricing.whatsappCta}
                    </WhatsAppButton>
                  </div>

                  <NavLink
                    to="/contact#form"
                    className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-700 transition-colors hover:border-clover-200 hover:text-clover-700"
                  >
                    {content.pricing.contactCta}
                    <CloverIcon name="arrow" className="h-4 w-4 rtl-flip" />
                  </NavLink>

                  <p className="mt-4 text-center text-xs text-neutral-500">{content.pricing.note}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* FAQ */}
      <Section size="lg" background="neutral" id="faq">
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <Eyebrow>{content.faq.eyebrow}</Eyebrow>
            </div>
            <h2 className="heading-2 mt-4 text-neutral-900">{content.faq.title}</h2>
            <p className="body-lg mt-4 text-neutral-600">{content.faq.subtitle}</p>
          </Reveal>

          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            {content.faq.items.map((item, index) => (
              <Reveal key={item.q} delay={index * 40}>
                <details className="group overflow-hidden rounded-xl border border-neutral-200 bg-white">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 transition-colors group-hover:bg-neutral-50 sm:p-6">
                    <h3 className="text-base font-semibold text-neutral-900">{item.q}</h3>
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition-transform duration-200 group-open:rotate-180">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="border-t border-neutral-200 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
                    <p className="body text-neutral-600">{item.a}</p>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Download the apps */}
      <Section size="lg" background="white" id="download">
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <Eyebrow>{content.downloads.eyebrow}</Eyebrow>
            </div>
            <h2 className="heading-2 mt-4 text-neutral-900">{content.downloads.title}</h2>
            <p className="body-lg mt-4 text-neutral-600">{content.downloads.subtitle}</p>
          </Reveal>

          <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
            {content.downloads.apps.map((app, index) => {
              const href =
                app.key === 'flow'
                  ? product.downloadLinks.cloverFlowPos
                  : product.downloadLinks.cloverMarket;
              const webHref =
                app.key === 'flow'
                  ? product.webLinks.cloverFlowPos
                  : product.webLinks.cloverMarket;

              return (
                <Reveal key={app.key} delay={index * 90} className="h-full">
                  <div className="group flex h-full flex-col items-center rounded-3xl border border-neutral-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-clover-200 hover:shadow-xl sm:p-8">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-clover-50 text-clover-700 ring-1 ring-clover-100">
                      <CloverIcon name={app.key === 'flow' ? 'pos' : 'store'} className="h-6 w-6" />
                    </span>
                    <h3 className="heading-4 mt-4 text-neutral-900">{app.name}</h3>
                    <p className="body-sm mt-2 text-neutral-600">{app.tagline}</p>

                    <div className="mt-6 flex flex-1 flex-col items-center justify-end gap-3">
                      {href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative inline-flex rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clover-500 focus-visible:ring-offset-4"
                          aria-label={app.badgeAlt}
                        >
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-3 rounded-[28px] bg-clover-500/15 blur-2xl transition-colors duration-300 group-hover:bg-clover-500/25"
                          />
                          <img
                            src="/assets/clover/google-play-badge-en.svg"
                            alt={app.badgeAlt}
                            width="239"
                            height="71"
                            loading="lazy"
                            className="relative h-16 w-auto rounded-2xl shadow-xl ring-1 ring-black/10 transition-transform duration-200 group-hover:-translate-y-0.5 sm:h-20"
                          />
                        </a>
                      ) : (
                        <span className="relative inline-flex items-center gap-3 rounded-2xl bg-neutral-900 px-5 py-3.5 opacity-80">
                          <img
                            src="/assets/clover/google-play-badge-en.svg"
                            alt=""
                            aria-hidden="true"
                            className="h-11 w-auto opacity-60 grayscale"
                          />
                        </span>
                      )}

                      {webHref && (
                        <a
                          href={webHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${content.downloads.webCta} — ${app.name}`}
                          className="inline-flex items-center gap-1.5 rounded text-sm font-medium text-clover-700 transition-colors hover:text-clover-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clover-500 focus-visible:ring-offset-2"
                        >
                          {content.downloads.webCta}
                          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={120}>
            <div className="mx-auto mt-10 max-w-3xl border-t border-neutral-200 pt-6">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                <a
                  href={downloadsWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-clover-700"
                >
                  <CloverIcon name="whatsapp" className="h-4 w-4 flex-shrink-0" />
                  {content.downloads.whatsappCta}
                </a>
                <span className="hidden h-4 w-px bg-neutral-200 sm:block" aria-hidden="true" />
                <NavLink
                  to="/contact#form"
                  className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-clover-700"
                >
                  <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.8L3 20l1.2-3.6A7.9 7.9 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                  {content.downloads.contactCta}
                </NavLink>
              </div>
              <p className="mt-4 text-center text-xs text-neutral-500">{content.downloads.note}</p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-[#021712] py-16 text-white sm:py-24 lg:py-28">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-clover-500/20 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-primary-500/15 blur-3xl" />
        </div>
        <OrbitBackground variant="cta" />

        <Container>
          <Reveal className="relative mx-auto max-w-3xl text-center">
            <h2 className="heading-2 text-white">{content.finalCta.title}</h2>
            <p className="body-lg mt-4 text-neutral-300">{content.finalCta.subtitle}</p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <WhatsAppButton href={finalWhatsApp} variant="light">
                {content.finalCta.whatsappCta}
              </WhatsAppButton>
              <NavLink
                to="/contact#form"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/50 px-7 py-3.5 text-lg font-medium text-white transition-all duration-200 hover:border-white/70 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#021712]"
              >
                {content.finalCta.contactCta}
              </NavLink>
            </div>

            <p className="mt-6 text-sm text-neutral-400">Clover Flow POS + Clover Market</p>
          </Reveal>
        </Container>
      </section>

      {/* Back to products */}
      <Section size="sm" background="white">
        <Container>
          <div className="text-center">
            <NavLink to="/products" className="btn btn-ghost inline-flex items-center gap-2">
              <svg className="w-4 h-4 rtl-flip" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {content.backToProducts}
            </NavLink>
          </div>
        </Container>
      </Section>
    </Layout>
  );
}
