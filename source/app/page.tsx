import { ArrowRight, CreditCard, Database, Truck, Workflow } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConversionBand, SiteFooter, SiteHeader } from '@/components/site-frame';

export default function Home() {

  return (
    <><SiteHeader /><main id="main-content">
      <section className="hero" id="top">
        <div className="hero-network" aria-hidden="true"><span className="network-wave wave-northwest" /><span className="network-wave wave-southeast" /><span className="network-trace trace-one" /><span className="network-trace trace-two" /><span className="network-trace trace-three" /><span className="network-trace trace-four" /><span className="network-trace trace-five" /><i className="network-node node-one" /><i className="network-node node-two" /><i className="network-node node-three" /><i className="network-node node-four" /><i className="network-node node-five" /><i className="network-node node-six" /></div>
        <div className="hero-overlay" />
        <div className="hero-copy">
          <p className="eyebrow">Independent payments strategy</p>
          <h1>Every transaction should move your business forward.</h1>
          <p className="hero-lede">TSC connects payment strategy, cost optimization, and ERP-integrated workflows into one accountable plan - built around your business, not a processor’s product.</p>
          <div className="hero-actions">
            <Button nativeButton={false} render={<a href="#review" />} size="lg">Request a complimentary review <ArrowRight /></Button>
            <a className="text-link" href="/services/payment-processing-ach#calculator">Explore a card fee scenario</a>
          </div>
          <div className="proof-row" aria-label="TSC experience">
            <span><strong>100+</strong> years of expertise across our team</span>
            <span><strong>$400M+</strong> client processing volume advised or managed</span>
            <span><strong>B2B + B2C</strong> payment expertise</span>
          </div>
        </div>
      </section>
      <section className="home-intro"><p className="eyebrow">Your independent payment advisor</p><h2>Clearer costs. Less manual work. A plan that fits.</h2><p>TSC helps businesses understand payment costs, connect their systems, and improve how money is collected and paid. We evaluate providers and coordinate implementation, with ongoing support as your needs change.</p></section>
      <section className="solutions" id="solutions">

        <div className="section-heading-row">
          <div><p className="eyebrow">How TSC helps</p><h2>One strategy across every way money moves.</h2></div>
          <p>We evaluate your current environment, identify the highest-value changes, and connect you with vetted technology and processing partners. TSC remains your independent guide from analysis through ongoing optimization.</p>
        </div>
        <div className="solution-grid">
          <article className="solution-card"><Workflow /><span>01</span><h3>AR/AP automation</h3><p>Connect approvals, payment execution, remittance, and reconciliation.</p><a href="/services/ar-ap-automation">Explore finance automation <ArrowRight /></a></article>
          <article className="solution-card"><CreditCard /><span>02</span><h3>Card &amp; ACH</h3><p>Optimize how you accept, price, secure, and report every transaction.</p><a href="/services/payment-processing-ach">Explore card and ACH strategy <ArrowRight /></a></article>
          <article className="solution-card"><Database /><span>03</span><h3>ERP-integrated payments</h3><p>Make payments a native part of the finance systems your team already trusts.</p><a href="/services/erp-integrated-payments">Explore ERP integrations <ArrowRight /></a></article>
          <article className="solution-card"><Truck /><span>04</span><h3>Freight + logistics</h3><p>Through TSC’s Business Solutions Group relationship, benchmark and optimize transportation spend without adding internal burden.</p><a href="/services/freight-logistics">Explore freight strategy <ArrowRight /></a></article>
        </div>
      </section>
      <section className="method">
        <div className="method-intro"><p className="eyebrow">The TSC method</p><h2>Insight first. Implementation second. Accountability throughout.</h2></div>
        <ol className="method-steps">
          <li><span>01</span><div><h3>Discover</h3><p>Review statements, payment flows, acceptance channels, systems, and operating priorities.</p></div></li>
          <li><span>02</span><div><h3>Diagnose</h3><p>Quantify fee leakage, qualification gaps, workflow friction, and integration opportunities.</p></div></li>
          <li><span>03</span><div><h3>Design</h3><p>Build a right-fit roadmap across processing, data, controls, and technology partners.</p></div></li>
          <li><span>04</span><div><h3>Deliver</h3><p>Coordinate onboarding, compliance, integration, and ongoing performance reviews.</p></div></li>
        </ol>
      </section>
      <div id="review"><ConversionBand /></div>
    </main><SiteFooter /></>
  );
}
