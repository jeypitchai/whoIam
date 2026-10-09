import React from 'react';
import { ArrowDown, Users, HeartHandshake } from 'lucide-react';
import { profile, experience } from '../data/portfolio';
import { useSite } from '../components/SiteContext';
import { PortraitBadge } from '../components/PortraitBadge';
import { SectionHeading, ResumeLink, Star, WaveDivider, ButtonLink } from '../components/ui';
import { ContactBanner } from '../components/ContactBanner';
import { LearningRecognition } from '../components/LearningRecognition';

function ExperienceRow({ item }: { item: (typeof experience)[number] }) {
  return <article className="timeline-row"><span className="timeline-date">{item.period}</span><div><h3>{item.role}</h3><span className="timeline-company">{item.organization}</span>{item.detail && <p>{item.detail}</p>}</div></article>;
}

export function About() {
  const { url } = useSite();
  return <>
    <section className="about-hero accent-section"><div className="container about-hero-grid"><PortraitBadge compact /><div><SectionHeading as="h1" label="The person behind the systems" title={<>Hello.<br />I’m Jeyakrishnan.</>}>{profile.introduction}</SectionHeading><p>Known as JK. A software engineer by foundation, a solution engineer by profession, and a curious learner throughout.</p><div className="actions"><ResumeLink variant="dark" /><a href="#journey" className="text-link">My journey<ArrowDown size={17} aria-hidden="true" /></a></div></div></div><Star className="about-star" /><WaveDivider fill="var(--background)" /></section>
    <section id="journey" className="section journey-section"><div className="container"><div className="section-heading-row"><SectionHeading label="2007 → today" title={<>The work changes.<br />The curiosity stays.</>}>19+ years of hands-on development, technical leadership, and solution engineering.</SectionHeading><span className="oversized-number" aria-hidden="true">19<span>+</span></span></div><div className="timeline">{experience.slice(0, 2).map(item => <ExperienceRow key={item.period} item={item} />)}<details className="earlier-experience"><summary>Explore my earlier engineering roles <span>2007 — 2016</span></summary>{experience.slice(2).map(item => <ExperienceRow key={item.period} item={item} />)}</details></div></div></section>
    <LearningRecognition />
    <section id="community" className="section community-section"><div className="container"><SectionHeading label="Beyond the code" title={<>Technology with<br />a community purpose.</>}>Contributing to Greater Atlanta Tamil Sangam, and making space for the next generation to learn.</SectionHeading><div className="community-grid"><article><HeartHandshake size={32} strokeWidth={1.4} aria-hidden="true" /><span className="eyebrow">Community technology</span><h3>Help things run better.</h3><p>I contribute to website maintenance, membership systems, event check-in, and mobile application development for community initiatives.</p></article><article><Users size={32} strokeWidth={1.4} aria-hidden="true" /><span className="eyebrow">Youth & volunteering</span><h3>Give people room to grow.</h3><p>I support opportunities for youth to participate in community events, practice teamwork, and learn leadership through hands-on volunteering with adult guidance.</p></article></div><ButtonLink href={url('connect')} variant="outline">Talk technology or community</ButtonLink></div></section>
    <ContactBanner />
  </>;
}
