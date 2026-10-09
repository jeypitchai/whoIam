import React, { useEffect, type ReactNode } from 'react';
import type { PageId } from '../lib/urls';
import { SiteProvider } from './SiteContext';
import { Header } from './Header';
import { Footer } from './Footer';

export function SiteLayout({ page, base, children }: { page: PageId; base: string; children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    // Only animate content below the fold; generated HTML stays visible without JS.
    elements.forEach(el => { if (el.getBoundingClientRect().top > window.innerHeight) el.classList.add('reveal-pending'); });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.remove('reveal-pending'); observer.unobserve(entry.target); } });
    }, { threshold: 0.08 });
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return <SiteProvider value={{ page, base }}><div id="top" className={`page page-${page}`}><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main" tabIndex={-1}>{children}</main><Footer /></div></SiteProvider>;
}
