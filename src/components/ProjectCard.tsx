import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../data/portfolio';
import { useSite } from './SiteContext';
import { Tags } from './ui';
import { ProjectVisual } from './ProjectVisual';

export function ProjectCard({ project, detailed = false, featured = false }: { project: Project; detailed?: boolean; featured?: boolean }) {
  const { url } = useSite();
  return <article id={detailed ? project.id : undefined} className={`project-card ${featured ? 'is-featured' : ''} ${detailed ? 'project-detailed' : ''}`} data-reveal>
    <div className="project-content"><div className="project-meta"><span>{project.category}</span><span>{project.stage}</span></div>
      <div className="project-title"><span className="project-number" aria-hidden="true">{project.number}</span><h3>{project.title}</h3></div>
      <p>{project.description}</p>
      {detailed && <><div className="contribution-heading">My contribution{project.duration && <span>{project.duration}</span>}</div><ul className="contribution-list">{project.contribution.map(item => <li key={item}>{item}</li>)}</ul></>}
      <Tags items={project.technologies} />
      {!detailed && <a className="text-link" href={url('work', project.id)}>Explore project<ArrowUpRight size={18} aria-hidden="true" /><span className="sr-only">: {project.title}</span></a>}
    </div><ProjectVisual type={project.visual} />
  </article>;
}
