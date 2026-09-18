import type { Metadata } from 'next';
import { Montserrat, Open_Sans } from 'next/font/google';
import './globals.css';
import './mobile.css';
import './readiness.css';
import { siteUrl, shareImage } from '@/lib/site-content';

const montserrat = Montserrat({ variable: '--font-montserrat', subsets: ['latin'] });
const openSans = Open_Sans({ variable: '--font-open-sans', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Transaction Solutions Consulting | TSC', template: '%s | TSC' },
  description: 'Independent B2B payment consulting for card processing, ACH, interchange optimization, ERP integrations, AR/AP automation, and merchant statement reviews.',
  icons: {
    icon: [{ url: '/tsc-mark-white.svg', type: 'image/svg+xml' }],
    shortcut: '/tsc-mark-white.svg',
    apple: '/tsc-logo.png',
  },
  alternates: { canonical: siteUrl },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false, noarchive: true, nosnippet: true } },
  openGraph: {
    title: 'Every transaction should move your business forward.',
    description: 'Independent payment strategy, ERP-integrated workflows, and interchange optimization.',
    siteName: 'Transaction Solutions Consulting',
    type: 'website',
    images: [shareImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Every transaction should move your business forward.',
    description: 'Independent payment strategy, ERP-integrated workflows, and interchange optimization.',
    images: [shareImage.url],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    '@context': 'https://schema.org', '@graph': [
      { '@type': ['Organization', 'ProfessionalService'], '@id': `${siteUrl}/#organization`, name: 'Transaction Solutions Consulting', alternateName: 'TSC', url: siteUrl, logo: `${siteUrl}/tsc-logo.png`, image: shareImage.url, description: 'Independent payment consulting and brokerage firm serving B2B and B2C organizations nationwide.', telephone: '+1-888-660-3466', email: 'info@TransactionSolutionsConsulting.com', areaServed: { '@type': 'Country', name: 'United States' }, address: { '@type': 'PostalAddress', streetAddress: '1530 E Williams Field Road, Suite 201', addressLocality: 'Gilbert', addressRegion: 'AZ', postalCode: '85295', addressCountry: 'US' }, founder: [{ '@id': `${siteUrl}/about#dan-palmquist` }, { '@id': `${siteUrl}/about#christian-palmquist` }] },
      { '@type': 'Person', '@id': `${siteUrl}/about#dan-palmquist`, name: 'Dan Palmquist', jobTitle: 'Managing Partner', email: 'dan@transactionsolutionsconsulting.com', sameAs: ['https://www.linkedin.com/in/dan-palmquist/'], worksFor: { '@id': `${siteUrl}/#organization` }, url: `${siteUrl}/about` },
      { '@type': 'Person', '@id': `${siteUrl}/about#christian-palmquist`, name: 'Christian Palmquist', jobTitle: 'Managing Partner', email: 'christian@transactionsolutionsconsulting.com', sameAs: ['https://www.linkedin.com/in/christianpalmquist/'], worksFor: { '@id': `${siteUrl}/#organization` }, url: `${siteUrl}/about` },
      { '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: siteUrl, name: 'Transaction Solutions Consulting', publisher: { '@id': `${siteUrl}/#organization` }, inLanguage: 'en-US' },
    ],
  };
  return <html lang="en-US"><head><meta name="viewport" content="width=device-width, initial-scale=1" /></head><body className={`${montserrat.variable} ${openSans.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />{children}</body></html>;
}
