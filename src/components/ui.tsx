import React, { type ReactNode } from 'react';
import { ArrowUpRight, ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '../data/portfolio';
import { useSite } from './SiteContext';

export function ButtonLink({ href, children, variant = 'light', className = '', download = false }: {
  href: string; children: ReactNode; variant?: 'light' | 'dark' | 'outline' | 'accent'; className?: string; download?: boolean;
}) {
  const external = href.startsWith('https:');
  return <a className={`button button-${variant} ${className}`} href={href}
    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    {...(download ? { download: 'JeyakrishnanPitchaikani_Resume.pdf' } : {})}>
    {children}{download ? <Download size={17} aria-hidden="true" /> : external ? <ArrowUpRight size={18} aria-hidden="true" /> : <ArrowRight size={18} aria-hidden="true" />}
  </a>;
}

export function ResumeLink({ variant = 'outline' }: { variant?: 'light' | 'dark' | 'outline' | 'accent' }) {
  const { asset } = useSite();
  return <ButtonLink href={asset(profile.resume)} variant={variant} download>Download resume</ButtonLink>;
}

export function SectionHeading({ label, title, children, className = '', as: Heading = 'h2' }: {
  label: string; title: ReactNode; children?: ReactNode; className?: string; as?: 'h1' | 'h2';
}) {
  return <div className={`section-heading ${className}`} data-reveal>
    <span className="eyebrow"><span className="eyebrow-dot" />{label}</span>
    <Heading>{title}</Heading>
    {children && <p className="section-description">{children}</p>}
  </div>;
}

export function Tags({ items }: { items: readonly string[] }) {
  return <ul className="tags" aria-label="Technologies and practices">{items.map(item => <li key={item}>{item}</li>)}</ul>;
}

export function SocialLinks({ email = false, labels = false }: { email?: boolean; labels?: boolean }) {
  const socials = [
    { name: 'LinkedIn', href: profile.linkedin, Icon: Linkedin },
    { name: 'GitHub', href: profile.github, Icon: Github },
    ...(email ? [{ name: 'Email', href: `mailto:${profile.email}`, Icon: Mail }] : []),
  ];
  return <div className={`social-links ${labels ? 'with-labels' : ''}`}>
    {socials.map(({ name, href, Icon }) => <a key={name} href={href} aria-label={name}
      {...(href.startsWith('https:') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      <Icon size={19} strokeWidth={1.6} aria-hidden="true" />{labels && <span>{name}</span>}
    </a>)}
  </div>;
}

export function WaveDivider({ fill, className = '' }: { fill: string; className?: string }) {
  return <svg className={`wave-divider ${className}`} viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0 52C240 132 424-30 730 40C1060 120 1200-20 1440 54V100H0Z" fill={fill} />
  </svg>;
}

export function Star({ className = '' }: { className?: string }) {
  return <svg className={`decorative-star ${className}`} viewBox="0 0 100 100" aria-hidden="true"><path d="M50 0 62 38 100 50 62 62 50 100 38 62 0 50 38 38Z" fill="currentColor" /></svg>;
}
