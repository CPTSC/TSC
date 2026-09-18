import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { FreightEstimator, IntegrationChecker, InterchangeEstimator } from '@/components/interactive-tools';
import { ConversionBand, SiteFooter, SiteHeader } from '@/components/site-frame';
import { serviceBySlug, services, siteUrl, shareImage } from '@/lib/site-content';

export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const service = serviceBySlug[slug];
  if (!service) return {};
  const url = `${siteUrl}/services/${service.slug}`;
  return { title: service.title, description: service.description, alternates: { canonical: url }, openGraph: { title: service.title, description: service.description, url, images: [shareImage] }, twitter: { card: 'summary_large_image', title: service.title, description: service.description, images: [shareImage.url] } };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const service = serviceBySlug[slug]; if (!service) notFound();
  const url = `${siteUrl}/services/${service.slug}`;
  const commercial = ['payment-processing-ach','interchange-optimization','level-2-level-3-processing'].includes(slug);
  return <><SiteHeader/><main id="main-content" className="seo-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'Service',name:service.title,description:service.description,url,provider:{'@type':'ProfessionalService',name:'Transaction Solutions Consulting',url:siteUrl}})}}/>
    <section className="seo-hero"><div><p className="eyebrow">{service.eyebrow}</p><h1>{service.title}</h1><a className="seo-primary-link" href="/contact">Talk with TSC <ArrowRight/></a></div><aside><p>{service.intro}</p></aside></section>
    {service.plainLanguage&&<section className="service-definition"><div><h2>{service.plainLanguage.title}</h2><p>{service.plainLanguage.body}</p></div></section>}
    <section className="seo-grid"><div><h2>Common challenges</h2><ul>{service.problems.map(item=><li key={item}><CheckCircle2/>{item}</li>)}</ul></div><div><h2>How TSC helps</h2><ul>{service.capabilities.map(item=><li key={item}><CheckCircle2/>{item}</li>)}</ul></div></section>
    {commercial&&<section className="program-note"><div><h2>Commercial card data and today’s rules</h2><p>Extra transaction detail can affect eligible commercial-card fees. Visa’s US Commercial Enhanced Data Program (CEDP) has replaced its legacy Level 2/3 programs. Mastercard has separate requirements. TSC checks card eligibility, data quality, gateway and processor support, and the actual net cost before recommending changes.</p></div></section>}
    {slug==='erp-integrated-payments'&&<IntegrationChecker/>}{slug==='payment-processing-ach'&&<InterchangeEstimator/>}{slug==='freight-logistics'&&<FreightEstimator/>}
    {commercial&&<nav className="related-topics" aria-label="Related payment guidance">{services.filter(s=>['interchange-optimization','level-2-level-3-processing','merchant-statement-review'].includes(s.slug)&&s.slug!==slug).map(s=><a key={s.slug} href={'/services/'+s.slug}>{s.eyebrow}</a>)}</nav>}
    <section className="faq-section"><div><p className="eyebrow">Frequently asked questions</p><h2>Your questions answered.</h2></div><div>{service.faqs.map(faq=><details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section>
    <ConversionBand freight={slug==='freight-logistics'} title={slug==='freight-logistics'?'Let’s review your shipping needs.':undefined}/>
  </main><SiteFooter/></>;
}
