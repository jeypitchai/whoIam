import React from 'react';
import { ArrowUpRight, AudioLines, ScanLine } from 'lucide-react';
import { profile, featuredProjects, domains } from '../data/portfolio';
import { useSite } from '../components/SiteContext';
import { HomeHero } from '../components/HomeHero';
import { ButtonLink, SectionHeading, Star, WaveDivider } from '../components/ui';
import { ProjectCard } from '../components/ProjectCard';
import { Process } from '../components/Process';
import { ContactBanner } from '../components/ContactBanner';

export function Home() {
  const { url, asset } = useSite();
  return <>
    <HomeHero />

    <section id="selected-work" className="section selected-work grid-texture"><div className="container">
      <div className="section-heading-row"><SectionHeading label="Selected work" title={<>Ideas, connected.<br />Solutions, built.</>}>A few explorations at the intersection of enterprise engineering and applied AI.</SectionHeading><a href={url('work')} className="text-link">All work <span className="count">07</span><ArrowUpRight size={20} aria-hidden="true" /></a></div>
      <div className="project-list">{featuredProjects.map((project, i) => <ProjectCard key={project.id} project={project} featured={i === 0} />)}</div>
    </div></section>

    <section className="section home-about accent-section"><div className="container home-about-grid">
      <div><span className="eyebrow">A little about me</span><h2>Engineering roots.<br />An AI mindset.</h2><Star /></div>
      <div><p className="large-copy">I build the connections that make AI useful.</p>
        <p>{profile.introduction}</p>
        <p>Today, I turn AI ideas into working proofs of concept: knowledge graphs that connect enterprise context, voice agents that reach backend workflows, and image understanding that feeds business systems. Custom skills and MCP integrations bring these capabilities into everyday engineering.</p>
        <ul className="about-ai-highlights" aria-label="Applied AI focus">
          <li><img src={asset('skills/logos/devicon-neo4j.svg')} alt="" width="24" height="24" /><span>Connected knowledge</span></li>
          <li><AudioLines size={24} aria-hidden="true" /><span>Conversational AI</span></li>
          <li><ScanLine size={24} aria-hidden="true" /><span>AI integration</span></li>
        </ul>
        <p>That work draws on 19+ years of engineering across network security, telecommunications, banking, healthcare, and media.</p>
        <ButtonLink href={url('about')} variant="dark">Meet the person behind the work</ButtonLink>
      </div>
    </div><div className="container career-stats"><div><strong>19<span>+</span></strong><span>Years in software engineering</span></div><div><strong>5</strong><span>Industry domains</span></div><div><strong>End to end</strong><span>Discovery through delivery</span></div></div><WaveDivider fill="var(--paper)" /></section>

    <Process />

    <section className="section expertise-preview"><div className="container"><div className="section-heading-row"><SectionHeading label="Connected capabilities" title={<>Depth in engineering.<br />Breadth in perspective.</>} /><ButtonLink href={url('expertise')} variant="outline">Explore my expertise</ButtonLink></div><div className="capability-list">{[
      ['01', 'Enterprise engineering', 'Java, Spring Boot, React, APIs, and integration.'],
      ['02', 'Applied AI & knowledge', 'MCP, custom skills, voice AI, and knowledge graphs.'],
      ['03', 'Architecture & delivery', 'From discovery and design to deployment and support.'],
    ].map(([number, title, text]) => <a href={url('expertise')} className="capability-row" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p><ArrowUpRight aria-hidden="true" /></a>)}</div><div className="domain-strip"><span>Across industries</span>{domains.map(domain => <span key={domain}>{domain}</span>)}</div></div></section>
    <ContactBanner />
  </>;
}
