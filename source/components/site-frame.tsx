'use client';

import Image from 'next/image';
import { ArrowRight, CalendarDays, Mail, MapPin, Phone, Menu, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { bookingUrl } from '@/lib/site-content';

export function SiteHeader() {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  const serviceMenu = useRef<HTMLDetailsElement>(null);
  const previousPath = useRef(pathname);
  useEffect(() => {
    if (previousPath.current !== pathname) {
      if (menu.current) menu.current.open = false;
      if (serviceMenu.current) serviceMenu.current.open = false;
      previousPath.current = pathname;
    }
  }, [pathname]);
  const services = [['AR/AP Automation','/services/ar-ap-automation'],['Card & ACH','/services/payment-processing-ach'],['ERP Payments','/services/erp-integrated-payments'],['Freight + Logistics','/services/freight-logistics']];
  const inServices = pathname.startsWith('/services/');
  const link = (label: string, href: string) => <a key={href} href={href} aria-current={pathname === href ? 'page' : undefined}>{label}</a>;
  return <><a className="skip-link" href="#main-content">Skip to content</a><header className="site-header v2-header">
    <a href="/" aria-label="Transaction Solutions Consulting home"><Image src="/tsc-logo.png" alt="Transaction Solutions Consulting" width={260} height={90} priority /></a>
    <nav className="desktop-navigation" aria-label="Primary navigation">
      {link('Home','/')}
      <details className="services-menu" data-active={inServices || undefined} ref={serviceMenu} onPointerEnter={e=>{if(e.pointerType==='mouse')e.currentTarget.open=true;}} onPointerLeave={e=>{if(e.pointerType==='mouse'&&!e.currentTarget.contains(document.activeElement))e.currentTarget.open=false;}} onKeyDown={e => {if(e.key === 'Escape') {e.currentTarget.open=false;e.currentTarget.querySelector('summary')?.focus();}}}><summary>Services</summary><div>{services.map(([label,href])=>link(label,href))}</div></details>
      {link('Insights','/insights')}{link('About','/about')}{link('Contact','/contact')}
    </nav>
    <a className="action-primary header-cta" href={bookingUrl} target="_blank" rel="noreferrer">Book a consultation</a>
    <details className="mobile-navigation" ref={menu} onKeyDown={e=>{if(e.key==='Escape'){e.currentTarget.open=false;e.currentTarget.querySelector('summary')?.focus();}}}>
      <summary><Menu className="menu-open-icon" aria-hidden="true"/><X className="menu-close-icon" aria-hidden="true"/><span>Menu</span></summary>
      <nav aria-label="Mobile navigation" onClick={e=>{if((e.target as HTMLElement).closest('a')&&menu.current)menu.current.open=false;}}>
        {link('Home','/')}<details className="mobile-services" data-active={inServices || undefined}><summary>Services</summary><div>{services.map(([label,href])=>link(label,href))}</div></details>
        {link('Insights','/insights')}{link('About','/about')}{link('Contact TSC','/contact')}
        <a className="mobile-booking" href={bookingUrl} target="_blank" rel="noreferrer">Book a consultation<CalendarDays aria-hidden="true"/></a>
      </nav>
    </details>
  </header></>;
}

export function SiteFooter() {
  const pathname = usePathname();
  return <footer><div className="footer-brand"><Image src="/tsc-logo.png" alt="Transaction Solutions Consulting" width={280} height={95} /><p>Your advocate. Your resource. Your payments strategy partner.</p><small>Based in Gilbert, Arizona, serving businesses nationwide.</small></div><div><h3>Explore</h3><a href="/services/ar-ap-automation" aria-current={pathname === '/services/ar-ap-automation' ? 'page' : undefined}>AR/AP Automation</a><a href="/services/payment-processing-ach" aria-current={pathname === '/services/payment-processing-ach' ? 'page' : undefined}>Card &amp; ACH</a><a href="/services/erp-integrated-payments" aria-current={pathname === '/services/erp-integrated-payments' ? 'page' : undefined}>ERP Payments</a><a href="/services/freight-logistics" aria-current={pathname === '/services/freight-logistics' ? 'page' : undefined}>Freight + Logistics</a><a href="/services/interchange-optimization" aria-current={pathname === '/services/interchange-optimization' ? 'page' : undefined}>Interchange optimization</a><a href="/insights" aria-current={pathname === '/insights' ? 'page' : undefined}>Insights</a></div><div><h3>Connect</h3><a href={bookingUrl} target="_blank" rel="noreferrer"><CalendarDays /> Book a consultation</a><a href="tel:18886603466"><Phone /> (888) 660-3466</a><a href="mailto:info@TransactionSolutionsConsulting.com"><Mail /> info@TransactionSolutionsConsulting.com</a><span><MapPin /> 1530 E Williams Field Road, Suite 201, Gilbert, AZ 85295</span></div><p className="copyright">© 2026 Transaction Solutions Consulting. All rights reserved. <span className="legal-links"><a href="/privacy" aria-current={pathname === '/privacy' ? 'page' : undefined}>Privacy</a><a href="/terms" aria-current={pathname === '/terms' ? 'page' : undefined}>Terms</a><a href="/accessibility" aria-current={pathname === '/accessibility' ? 'page' : undefined}>Accessibility</a></span></p></footer>;
}

export function ConversionBand({ title = 'Let’s find the right next step.', freight = false }: { title?: string; freight?: boolean }) {
  const pathname = usePathname();
  return <section className="conversion-band"><div><p className="eyebrow">{freight ? 'Freight review' : 'Talk with TSC'}</p><h2>{title}</h2><p>{freight ? 'Tell us about your shipment or transportation costs. We will help assess the opportunity and coordinate specialist support.' : 'Book a consultation or contact us with your payment question. We will help identify what to review and explain the next steps.'}</p></div><div className="conversion-actions"><Button nativeButton={false} render={<a href={bookingUrl} target="_blank" rel="noreferrer" />} size="lg">Book a consultation <CalendarDays /></Button><a href="/contact" aria-current={pathname === '/contact' ? 'page' : undefined}>Contact TSC <ArrowRight /></a><a href="tel:18886603466">Call (888) 660-3466</a></div></section>;
}
