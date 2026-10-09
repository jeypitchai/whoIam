import React from 'react';
import { useSite } from './SiteContext';
import { ButtonLink } from './ui';
import { AnimatedScene } from './AnimatedScene';

function ConversationMark() {
  return <svg className="conversation-mark" viewBox="0 0 120 120" aria-hidden="true">
    <g className="conversation-reply"><path d="M46 17H99Q108 17 108 26V58Q108 67 99 67H86L75 79V67H46Q37 67 37 58V26Q37 17 46 17Z" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" /><path d="M77 26 81 39 94 43 81 47 77 60 73 47 60 43 73 39Z" fill="var(--accent)" /></g>
    <g className="conversation-message"><path d="M17 43H71Q81 43 81 53V85Q81 95 71 95H36L20 107V95H17Q7 95 7 85V53Q7 43 17 43Z" fill="var(--ink)" /><g fill="var(--paper)"><circle className="typing-dot" cx="29" cy="69" r="3.5" /><circle className="typing-dot" cx="44" cy="69" r="3.5" /><circle className="typing-dot" cx="59" cy="69" r="3.5" /></g></g>
  </svg>;
}

export function ContactBanner() {
  const { url } = useSite();
  return <section className="contact-banner accent-section"><AnimatedScene className="container conversation-scene"><ConversationMark /><div className="conversation-copy"><span className="eyebrow">A conversation is a good start</span><h2>Something complex<br />worth <span className="conversation-title">solving?<svg viewBox="0 0 240 18" preserveAspectRatio="none" aria-hidden="true"><path d="M3 12Q105 1 237 10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" pathLength="1" /></svg></span></h2></div><ButtonLink href={url('connect')} variant="dark">Let’s connect</ButtonLink></AnimatedScene></section>;
}
