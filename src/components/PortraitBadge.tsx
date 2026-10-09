import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { media } from '../data/media';
import { profile } from '../data/portfolio';
import { useSite } from './SiteContext';

export function PortraitBadge({ compact = false }: { compact?: boolean }) {
  const { asset } = useSite();
  const [imageFailed, setImageFailed] = useState(false);
  const hasPortrait = Boolean(media.portrait && !imageFailed);
  return <div className={`portrait-scene ${compact ? 'compact' : ''}`}>
    <div className="badge-strap" aria-hidden="true" /><div className="badge-clip" aria-hidden="true" />
    <div className="portrait-badge">
      <div className="badge-topline"><span>THE PERSON BEHIND THE SYSTEMS</span><ArrowUpRight size={20} aria-hidden="true" /></div>
      <div className={`badge-image ${hasPortrait ? 'has-portrait' : ''}`}>
        <svg className="badge-orbits" viewBox="0 0 400 420" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth="1"><ellipse cx="200" cy="210" rx="155" ry="95" transform="rotate(-35 200 210)" /><ellipse cx="200" cy="210" rx="155" ry="95" transform="rotate(35 200 210)" /><circle cx="200" cy="210" r="155" /></g><circle cx="320" cy="112" r="7" fill="currentColor" /><circle cx="80" cy="308" r="7" fill="currentColor" /></svg>
        {hasPortrait ? <>
          <img src={asset(media.portrait!)} alt={`Portrait of ${profile.name}`} width="1173" height="1341" fetchPriority="high" decoding="async" onError={() => setImageFailed(true)} />
          <span className="badge-portrait-mark" aria-hidden="true">JK<span>.</span></span>
        </> : <>
          <span className="badge-monogram" aria-hidden="true">JK<span>.</span></span>
        </>}
      </div>
      <div className="badge-bottom"><div><strong>Jeyakrishnan</strong><span>Pitchaikani</span></div><span className="badge-id">ENGINEER<br />ARCHITECT<br /><span className="badge-ai-role">{profile.aiRole.toUpperCase()}</span></span></div>
    </div>
    <span className="badge-caption">A builder at heart.</span>
  </div>;
}
