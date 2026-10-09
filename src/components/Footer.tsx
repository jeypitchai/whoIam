import React from 'react';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { profile } from '../data/portfolio';
import { useSite } from './SiteContext';
import { SocialLinks } from './ui';

export function Footer() {
  const { url } = useSite();
  return <footer className="site-footer">
    <div className="container">
      <div className="footer-top"><p>Engineering, architecture<br />& practical AI.</p><a href={url('connect')}>Start a conversation<ArrowUpRight size={20} aria-hidden="true" /></a><span>{profile.location}</span></div>
      <div className="footer-wordmark" aria-hidden="true">jeypitchai<span>.</span></div>
      <div className="footer-bottom"><p>© 2026 {profile.name}</p><SocialLinks /><a href="#top">Back to top<ArrowUp size={15} aria-hidden="true" /></a></div>
    </div>
  </footer>;
}
