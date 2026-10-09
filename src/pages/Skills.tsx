import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Search, Sparkles, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { domains } from '../data/portfolio';
import { featuredSkills, filterSkills, skillCount, skillGroups } from '../data/skills';
import { SkillLogo, skillSymbols } from '../components/SkillLogo';
import { ButtonLink, SectionHeading, Star } from '../components/ui';
import { useSite } from '../components/SiteContext';

function SkillConstellation() {
  return <div className="skill-constellation" aria-hidden="true">
    <div className="skill-orbit skill-orbit-outer" /><div className="skill-orbit skill-orbit-inner" />
    <svg className="skill-connections" viewBox="0 0 500 460">
      <path d="M250 230 250 48M250 230 425 135M250 230 425 325M250 230 250 412M250 230 75 325M250 230 75 135" />
    </svg>
    <div className="skill-orbit-hub"><Star /><span>CONNECT<br />THE DOTS</span></div>
    {featuredSkills.map((skill, index) => <div className={`skill-orbit-node orbit-node-${index}`} key={skill.id}>
      <SkillLogo skill={skill} eager /><span>{skill.name}</span>
    </div>)}
    <span className="orbit-caption">DIFFERENT TOOLS. ONE CONNECTED VIEW.</span>
  </div>;
}

export function Skills() {
  const { url } = useSite();
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [ready, setReady] = useState(false);
  const reducedMotion = useReducedMotion();
  const hero = useRef<HTMLElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const y = useTransform(progress, [0, 1], [0, -35]);
  useEffect(() => setReady(true), []);
  const groups = filterSkills(category, query);
  const visibleCount = groups.reduce((sum, group) => sum + group.skills.length, 0);
  const reset = () => { setCategory('all'); setQuery(''); };
  const transition = reducedMotion ? { duration: 0 } : { type: 'spring' as const, stiffness: 240, damping: 28 };

  return <>
    <section ref={hero} className="page-intro skills-hero grid-texture">
      <div className="container skills-hero-grid">
        <div className="skills-hero-copy">
          <span className="page-index">MY SKILLS / ALWAYS CONNECTING</span>
          <SectionHeading as="h1" label="The toolkit behind the work" title={<>Many tools.<br /><span className="accent-text">One systems view.</span></>}>
            From enterprise foundations to applied AI. The technologies and practices I bring together to make complex things work.
          </SectionHeading>
          <a className="skills-explore" href="#skill-library">Explore the toolkit<ArrowDown size={18} aria-hidden="true" /></a>
          <div className="skills-hero-stats"><div><strong>{skillCount}</strong><span>TOOLS & PRACTICES</span></div><div><strong>08</strong><span>CONNECTED DISCIPLINES</span></div><div><strong>19+</strong><span>YEARS OF BUILDING</span></div></div>
        </div>
        <motion.div className="skills-hero-art" style={reducedMotion ? undefined : { y }}><SkillConstellation /></motion.div>
      </div>
    </section>

    <section id="skill-library" className="skill-library" aria-labelledby="library-heading">
      <div className="container skill-library-intro"><span className="eyebrow"><span className="eyebrow-dot" />THE FULL TOOLKIT</span>
        <h2 id="library-heading">Find the right connection.</h2><p>Explore by discipline, or find a specific tool. Current tools and career foundations, all in one place.</p>
      </div>
      <div className="skills-controls"><div className="container">
        <div className="skills-search-row">
          <label className="skills-search"><Search size={19} aria-hidden="true" /><span className="sr-only">Search skills</span>
            <input ref={search} type="search" placeholder="Find a skill, tool, or framework…" value={query} onChange={event => setQuery(event.target.value)} aria-controls="skill-results" />
            {query && <button type="button" aria-label="Clear search" onClick={() => { setQuery(''); search.current?.focus(); }}><X size={17} aria-hidden="true" /></button>}
          </label>
          <p className="skills-result-count" role="status" aria-live="polite" aria-atomic="true"><strong>{visibleCount}</strong> of {skillCount} tools & practices</p>
        </div>
        <div className="skills-filters" role="group" aria-label="Filter skills by discipline">
          <button type="button" aria-pressed={category === 'all'} onClick={() => setCategory('all')} aria-controls="skill-results">All skills<span>{skillCount}</span></button>
          {skillGroups.map(group => <button key={group.id} type="button" aria-pressed={category === group.id} onClick={() => setCategory(group.id)} aria-controls="skill-results">{group.label}<span>{group.skills.length}</span></button>)}
        </div>
      </div></div>
      <noscript><style>{'.skills-controls{display:none}'}</style></noscript>
      <div id="skill-results" className="container skill-results">
        <AnimatePresence initial={false} mode="popLayout">
          {groups.map(group => { const Icon = skillSymbols[group.symbol]; return <motion.section key={group.id} className="skill-group" layout={!reducedMotion}
            initial={ready && !reducedMotion ? { opacity: 0, y: 14 } : false} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={transition} aria-labelledby={`group-${group.id}`}>
            <div className="skill-group-body" data-reveal><div className="skill-group-heading"><div className="skill-group-mark"><Icon size={22} strokeWidth={1.4} aria-hidden="true" /><span>0{skillGroups.findIndex(item => item.id === group.id) + 1}</span></div>
              <div><h3 id={`group-${group.id}`}>{group.title}</h3><p>{group.description}</p></div><span className="skill-group-count">{group.skills.length.toString().padStart(2, '0')} / {group.label.toUpperCase()}</span>
            </div>
            <motion.ul className="skill-grid" layout={!reducedMotion} aria-label={group.label}>
              <AnimatePresence initial={false} mode="popLayout">{group.skills.map((skill, index) => <motion.li key={skill.id} className="skill-tile" layout={!reducedMotion} data-skill={skill.id}
                initial={ready && !reducedMotion ? { opacity: 0, y: 12, scale: .97 } : false} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: .95 }}
                transition={{ ...transition, opacity: { duration: reducedMotion ? 0 : .22, delay: Math.min(index * .015, .12) } }}>
                <SkillLogo skill={skill} /><span className="skill-tile-name">{skill.name}</span><span className="skill-tile-dot" aria-hidden="true" />
              </motion.li>)}</AnimatePresence>
            </motion.ul></div>
          </motion.section>; })}
        </AnimatePresence>
        {groups.length === 0 && <div className="skills-empty"><Search size={32} aria-hidden="true" /><h3>No connections found.</h3><p>Try another name or explore all disciplines.</p><button className="button button-light" type="button" onClick={reset}>Reset filters<ArrowUpRight size={17} aria-hidden="true" /></button></div>}
      </div>
    </section>

    <section className="section light-section grid-texture skills-in-practice"><div className="container">
      <div><SectionHeading label="Tools are only the start" title={<>The value is in<br />what we build.</>}>I bring this toolkit into real systems, shaped by the people and industries they serve.</SectionHeading>
        <div className="actions"><ButtonLink href={url('work')} variant="dark">See the work</ButtonLink><ButtonLink href={url('expertise')} variant="outline">Explore my expertise</ButtonLink></div>
      </div><div className="skills-domain-panel" data-reveal><Sparkles size={28} strokeWidth={1.3} aria-hidden="true" /><span className="eyebrow">EXPERIENCE ACROSS INDUSTRIES</span><ul>{domains.map((domain, index) => <li key={domain}><span>0{index + 1}</span>{domain}</li>)}</ul></div>
    </div></section>
  </>;
}
