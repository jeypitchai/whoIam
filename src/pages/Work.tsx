import React from 'react';
import { projects } from '../data/portfolio';
import { SectionHeading } from '../components/ui';
import { ProjectCard } from '../components/ProjectCard';
import { ContactBanner } from '../components/ContactBanner';
import { CustomerExperience } from '../components/CustomerExperience';

const groups = [
  { id: 'applied-ai', name: 'Applied AI', subtitle: 'From enterprise knowledge to useful conversations.' },
  { id: 'automation', name: 'Automation', subtitle: 'Exploring better ways to work, test, and build.' },
  { id: 'enterprise', name: 'Enterprise', subtitle: 'Hands-on engineering for systems people depend on.' },
] as const;

export function Work() {
  return <>
    <section className="page-intro work-intro grid-texture"><div className="container"><span className="page-index" aria-hidden="true">01 / SELECTED WORK</span><SectionHeading as="h1" label="Discovery · prototypes · delivery" title={<>Work that connects<br /><span className="accent-text">the dots.</span></>}>A selection of AI explorations, enterprise engineering, and automation. Each project reflects a different part of turning a business problem into working software.</SectionHeading><nav className="category-nav" aria-label="Work sections"><a href="#customers">Customers<span>12</span></a>{groups.map(group => <a key={group.id} href={`#${group.id}`}>{group.name}<span>{String(projects.filter(p => p.category === group.name).length).padStart(2, '0')}</span></a>)}</nav></div></section>
    <CustomerExperience />
    <div className="container work-groups">{groups.map(group => <section className="work-group" id={group.id} key={group.id}><div className="work-group-heading"><h2>{group.name}</h2><p>{group.subtitle}</p></div><div className="project-list">{projects.filter(project => project.category === group.name).map((project, i) => <ProjectCard key={project.id} project={project} detailed featured={group.id === 'applied-ai' && i === 0} />)}</div></section>)}</div>
    <section className="section work-note light-section"><div className="container"><span className="eyebrow">The broader journey</span><h2>Different industries.<br />The same engineering care.</h2><p>Earlier work spans telecommunications portals and middleware, banking platforms, healthcare document systems, mobile applications, and responsive media experiences. That breadth shapes how I approach architecture and delivery today.</p></div></section>
    <ContactBanner />
  </>;
}
