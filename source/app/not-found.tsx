import { ArrowRight } from 'lucide-react';
import { SiteFooter, SiteHeader } from '@/components/site-frame';

export default function NotFound(){ return <><SiteHeader/><main id="main-content" className="legal-page not-found-page"><p className="eyebrow">Page not found</p><h1>Let’s get you back to the right place.</h1><p>The page may have moved or the address may be incomplete. Return to the TSC home page or contact us for help.</p><div className="not-found-actions"><a href="/">Return home <ArrowRight aria-hidden="true"/></a><a href="/contact">Contact TSC</a></div></main><SiteFooter/></> }
