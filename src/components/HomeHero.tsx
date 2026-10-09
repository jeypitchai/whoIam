import React from 'react';
import { ArrowDown } from 'lucide-react';
import { profile } from '../data/portfolio';
import { useSite } from './SiteContext';
import { IntroReel } from './IntroReel';
import { selectedIntroReel } from '../data/media';
import { ButtonLink, ResumeLink, SocialLinks, WaveDivider } from './ui';

export function HomeHero() {
  const { url } = useSite();
  return <section className="hero hero-cinema accent-section" aria-labelledby="hero-heading" style={{ backgroundColor: selectedIntroReel.background }}>
    <div className="hero-background" aria-hidden="true"><span /><span /><span /></div>
    <IntroReel />
    <div className="container hero-grid"><div className="hero-copy">
      <span className="eyebrow hero-intro"><span>Jeyakrishnan Pitchaikani</span><span className="hero-location">{profile.location}</span></span>
      <h1 id="hero-heading">Hi, I’m <span>JK.</span></h1>
      <p className="hero-role">Engineer. Architect.<br /><span>{profile.aiRole}.</span></p>
      <p className="hero-description">Turning complex business problems into connected systems and practical AI solutions.</p>
      <div className="actions"><ButtonLink href={url('work')} variant="dark">Explore my work</ButtonLink><ResumeLink variant="outline" /></div>
      <div className="hero-social"><SocialLinks labels /><span className="hero-position">Senior Solution Engineer<br />at Relevantz</span></div>
    </div></div>
    <div className="hero-bottom container"><a href="#selected-work">Scroll to explore<ArrowDown size={16} aria-hidden="true" /></a><span>19+ years of building what matters</span></div>
    <WaveDivider fill="var(--background)" />
  </section>;
}
