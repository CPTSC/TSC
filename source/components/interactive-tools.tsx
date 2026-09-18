'use client';

import { useState } from 'react';
import { parseAmount, validVolume, validMix, nextVolume, estimate } from '@/lib/estimator';
import { ArrowRight, Check, CheckCircle2, Handshake, Minus, Plus, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const wholeNumber = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

const integrations = [
  'Acumatica', 'D365 Business Central', 'D365 Finance & Operations', 'Dynamics GP', 'Dynamics NAV',
  'QuickBooks Enterprise', 'QuickBooks Online', 'Epicor Eagle', 'Epicor Eclipse', 'Epicor E9/10',
  'Epicor Kinetic', 'Epicor Prophet 21', 'Infor SyteLine / CSI', 'NetSuite', 'Odoo', 'Oracle E-Business Suite',
  'Sage 100', 'Sage 300', 'Sage X3', 'SAP Business One', 'SAP S/4HANA', 'SYSPRO', 'Other / not listed',
];

const integrationFeatures = [
  'Pull ERP invoices into a customer portal for online viewing and payment',
  'Support cards, ACH, eChecks, scheduled payments, and stored tokenized payment methods',
  'Trigger capture from ERP events such as shipment or run batch capture on a defined schedule',
  'Keep invoice, order, payment, and reconciliation status synchronized in both directions',
  'Centralize transaction logs, error handling, retries, audit history, and exception payments',
];

function integrationDetail(name: string) {
  if (/Epicor|Infor|SYSPRO/i.test(name)) return 'Common fit for distribution and manufacturing payment workflows. Exact modules, versions, APIs, and feature coverage require confirmation.';
  if (/Dynamics|NetSuite|Acumatica|SAP|Oracle/i.test(name)) return 'Common fit for multi-entity and enterprise finance workflows. Exact posting, portal, and automation coverage depends on your ERP edition and configuration.';
  if (/QuickBooks|Sage|Odoo/i.test(name)) return 'Common fit for invoice payment and accounting workflows. TSC will confirm the product edition, hosting model, gateway, and required data exchange.';
  return 'This system is a starting point for an integration discussion. TSC will verify the specific version, gateway, workflow, and included capabilities before recommending a scope.';
}

export function IntegrationChecker() {
  const [selectedIntegration, setSelectedIntegration] = useState('NetSuite');
  const integrationFound = selectedIntegration !== 'Other / not listed';
  return <section className="integration-band service-tool-section" aria-labelledby="integration-check-title">
    <div className="integration-finder">
      <p className="finder-kicker"><Sparkles /> Explore integration options</p>
      <h2 id="integration-check-title">What accounting system runs your back office?</h2>
      <select className="integration-trigger" aria-label="Select your ERP or CRM" value={selectedIntegration} onChange={(event) => setSelectedIntegration(event.target.value)}>{integrations.map((name) => <option key={name} value={name}>{name}</option>)}</select>
      {integrationFound ? <div className="finder-result" aria-live="polite"><span className="ready-badge"><CheckCircle2 /> Scope review required</span><h3>{selectedIntegration} + payments</h3><p>{integrationDetail(selectedIntegration)}</p><h4>Possible workflows to discuss</h4><ul>{integrationFeatures.map((feature) => <li key={feature}><Check /> {feature}</li>)}</ul><small>No feature is assumed from ERP selection alone. Coverage varies by ERP edition and version, gateway, hosting model, licensed modules, and desired workflow. TSC confirms scope before any recommendation.</small></div> : <div className="finder-result idea" aria-live="polite"><span className="ready-badge"><Sparkles /> That is a useful idea.</span><h3>Let’s explore connecting it.</h3><p>Not seeing your system is an invitation to investigate, not a promise of compatibility. Tell TSC what you use and what you need, and we will assess the available APIs, data, gateway, and practical route.</p><Button nativeButton={false} render={<a href="/contact" />}>Bring us the challenge <ArrowRight /></Button></div>}
    </div>
    <div className="integration-copy"><p className="eyebrow">Integration without compromise</p><h2>Your operation should define the payment stack.</h2><p>For complex requirements, TSC can coordinate with specialist technology partners to connect merchant services with ERP, CRM, ecommerce, and business applications. TSC continues to lead payment strategy, processor alignment, scope validation, and the client relationship.</p><div className="partner-callout"><Handshake /><div><strong>TSC leads the strategy.</strong><span>Packaged integrations where validated; custom connectivity when the workflow requires it.</span></div></div></div>
  </section>;
}

export function InterchangeEstimator() {
 const [volumeText,setVolumeText]=useState('10,000');
 const [mixText,setMixText]=useState('5');
 const volume=parseAmount(volumeText), mix=parseAmount(mixText);
 const valid=validVolume(volume)&&validMix(mix);
 const result=valid?estimate(volume,mix,20):null;
 const fields=[
  {id:'volume-input',label:'Monthly card volume (USD)',text:volumeText,set:setVolumeText,value:volume,valid:validVolume(volume),prefix:'$',suffix:'',help:'Type an amount from $10,000 to $1,000,000. Buttons step by $10,000 through $50,000, then $20,000, with a final $10,000 step to the cap.',min:10000,max:1000000,step:10000},
  {id:'mix-input',label:'Commercial card ratio of total volume',text:mixText,set:setMixText,value:mix,valid:validMix(mix),prefix:'',suffix:'%',help:'The share of your card volume paid with corporate, purchasing, or other commercial cards. Enter 5%–100%; buttons change it by 5%.',min:5,max:100,step:5},
 ];
 function step(field:typeof fields[number],direction:1|-1){
  const current=field.valid&&field.value!==null?field.value:field.min;
  const n=field.id==='volume-input'?nextVolume(current,direction):Math.min(field.max,Math.max(field.min,current+direction*field.step));
  field.set(wholeNumber.format(n));
 }
 return <section className="calculator-section service-tool-section" id="calculator" aria-labelledby="interchange-estimator-title">
  <div className="section-intro"><div><p className="eyebrow">Illustrative fee scenario</p><h2 id="interchange-estimator-title">What could incomplete card data cost?</h2></div><p>Eligible commercial-card transactions can cost more when required data or processing conditions are missing. Explore an example, then have TSC verify the actual opportunity.</p></div>
  <div className="calculator-shell"><div className="controls field-controls">{fields.map(field=><div className="estimator-field" key={field.id}>
   <label htmlFor={field.id}>{field.label}</label><div className="field-stepper">
    <button type="button" onClick={()=>step(field,-1)} disabled={field.valid&&field.value===field.min} aria-label={'Decrease '+field.label}><Minus/></button>
    <div className={field.prefix?'currency-input':'percent-input'}>{field.prefix&&<span aria-hidden="true">{field.prefix}</span>}<input id={field.id} type="text" inputMode="decimal" value={field.text} aria-invalid={!field.valid} aria-describedby={field.id+'-help'} onChange={e=>field.set(e.target.value)} onBlur={()=>{if(field.valid&&field.value!==null)field.set(wholeNumber.format(field.value));}} onKeyDown={e=>{if(e.key==='Enter')e.currentTarget.blur();if(e.key==='ArrowUp'||e.key==='ArrowDown'){e.preventDefault();step(field,e.key==='ArrowUp'?1:-1);}}}/>{field.suffix&&<span aria-hidden="true">{field.suffix}</span>}</div>
    <button type="button" onClick={()=>step(field,1)} disabled={field.valid&&field.value===field.max} aria-label={'Increase '+field.label}><Plus/></button>
   </div><p id={field.id+'-help'}>{field.help}{!field.valid&&<span className="field-error"> Enter a number between {wholeNumber.format(field.min)} and {wholeNumber.format(field.max)}.</span>}</p>
  </div>)}</div><div className="impact-card" aria-live="polite"><p>Illustrative annual fee difference</p><output>{result?currency.format(result.annual):'Check your inputs'}</output>{result&&<span>{currency.format(result.monthly)} per month on {currency.format(result.exposed)} in assumed nonqualifying monthly volume.</span>}<div className="impact-note"><ShieldCheck/> Assumes 20% of commercial card volume is not qualifying and a 0.70% (70 basis point) fee reduction on that portion. Illustrative only, not guaranteed savings.</div><a className="action-primary" href="/contact">Discuss my card costs <ArrowRight/></a></div></div>
  <details className="calculator-method"><summary>How this example is calculated</summary><p>Monthly card volume × commercial card ratio × 20% assumed nonqualifying × 0.70% fee reduction × 12. For example, $100,000 total volume × 50% commercial cards = $50,000 in commercial card volume. Assuming 20% ($10,000) is nonqualifying, a 70 basis point fee reduction on that portion equals $70 per month, or $840 per year.</p><p>The fixed 20% nonqualifying share and 70 basis point difference are illustrative assumptions, not verified averages or findings about your business. Actual eligibility, card mix, network programs, data quality, timing, processor configuration, program fees, and implementation costs can change the result. A statement and transaction review is needed to estimate net savings. Rounded displayed figures may differ slightly from the underlying calculation.</p></details>
 </section>;
}

export function FreightEstimator() {
  return <section className="freight-quote-section service-tool-section" id="freight-quote" aria-labelledby="freight-estimator-title">
    <div className="freight-quote-heading"><div><p className="eyebrow">Freight and logistics</p><h2 id="freight-estimator-title">Quote your LTL and Parcel shipments with TSC</h2></div><div><p>Enter the shipment origin, destination, freight details, and extra shipping services to compare available options through TSC’s freight relationship.</p><a className="quote-external-link" href="/contact">Questions about the estimator? Contact TSC <ArrowRight /></a></div></div>
    <div className="freight-frame-shell"><div className="freight-tool-header"><div><Truck /><span><strong>TSC shipment estimator</strong><small>LTL and parcel rate exploration</small></span></div><span className="freight-guided-badge"><ShieldCheck /> Guided through TSC</span></div><div className="freight-tool-gap" aria-hidden="true" /><div className="freight-frame-viewport"><iframe src="https://getafreightquote.sscsship.com/quickship?header=false&amp;mode=ltl" title="TSC LTL and parcel freight quote estimator" loading="lazy" scrolling="yes" referrerPolicy="strict-origin-when-cross-origin" sandbox="allow-forms allow-scripts allow-same-origin" /></div></div><p className="freight-sandbox-note"><ShieldCheck /> This estimator is operated by our freight partner. Scroll inside it to view shipment details. Availability, layout, rates, and data handling depend on the partner. Results are not automatically sent to TSC; contact us to review an estimate.</p><div className="freight-conversion"><div><p className="eyebrow">Your TSC freight review</p><h3>Turn the estimate into an accountable shipping plan.</h3><p>After exploring rates, contact TSC to validate the shipment, review the opportunity, and coordinate next steps.</p></div><Button nativeButton={false} render={<a href="/contact" />} size="lg">Contact TSC about freight <ArrowRight /></Button></div>
  </section>;
}
