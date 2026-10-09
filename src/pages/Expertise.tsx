import React from 'react';
import { Sparkles, Layers, Code2, Network, Cloud, ShieldCheck, ArrowRight } from 'lucide-react';
import { expertise, domains } from '../data/portfolio';
import { SectionHeading, Tags } from '../components/ui';
import { ContactBanner } from '../components/ContactBanner';

const icons = { sparkles: Sparkles, layers: Layers, code: Code2, network: Network, cloud: Cloud, check: ShieldCheck };

export function Expertise() {
  return <>
    <section className="page-intro grid-texture"><div className="container"><span className="page-index" aria-hidden="true">02 / EXPERTISE</span><SectionHeading as="h1" label="A connected toolkit" title={<>Engineering depth.<br /><span className="accent-text">A systems view.</span></>}>Tools matter. Understanding when and how to connect them matters more. My expertise combines application engineering, enterprise architecture, and practical AI.</SectionHeading></div></section>
    <section className="expertise-section"><div className="container expertise-grid">{expertise.map(item => { const Icon = icons[item.icon]; return <article className="expertise-card" id={item.id} key={item.id} data-reveal><div className="expertise-card-top"><Icon size={30} strokeWidth={1.3} aria-hidden="true" /><span>{item.number}</span></div><h2>{item.title}</h2><p>{item.description}</p><Tags items={item.tools} /><div className="expertise-example"><span>In practice</span><p>{item.example}</p></div></article>; })}</div></section>
    <section className="section lifecycle-section accent-section"><div className="container"><SectionHeading label="My current focus" title={<>AI across the<br />software lifecycle.</>}>Useful AI starts with understanding the work people need to do. I explore how skills, plugins, and connected tools can support each stage.</SectionHeading><ol className="lifecycle">{['Requirements', 'Design', 'Development', 'Testing', 'Deployment', 'Operations'].map((stage, i) => <li key={stage}><span>0{i + 1}</span>{stage}{i < 5 && <ArrowRight size={16} aria-hidden="true" />}</li>)}</ol></div></section>
    <section className="section light-section grid-texture"><div className="container industry-section"><SectionHeading label="Experience across domains" title="Context changes the solution." /><p>Different industries bring different workflows, integrations, and operational needs. I bring that context into discovery and technical decisions.</p><ul className="industry-list">{domains.map((domain, i) => <li key={domain}><span>0{i + 1}</span>{domain}</li>)}</ul></div></section>
    <ContactBanner />
  </>;
}
