import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useSite } from './SiteContext';
import type { PageId } from '../lib/urls';

const navigation: { page: PageId; label: string }[] = [
  { page: 'home', label: 'Home' }, { page: 'about', label: 'About' },
  { page: 'skills', label: 'Skills' },
  { page: 'work', label: 'Work' }, { page: 'expertise', label: 'Expertise' },
];

export function Header() {
  const { page, url } = useSite();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    navRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
      if (event.key === 'Tab') {
        const controls = [buttonRef.current, ...Array.from(navRef.current?.querySelectorAll<HTMLAnchorElement>('a') ?? [])].filter(Boolean) as HTMLElement[];
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    const resize = () => { if (window.innerWidth >= 850) setOpen(false); };
    document.addEventListener('keydown', keydown);
    window.addEventListener('resize', resize);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', keydown);
      window.removeEventListener('resize', resize);
    };
  }, [open]);

  return <header className={`site-header ${page === 'home' ? 'on-hero' : ''} ${scrolled ? 'is-scrolled' : ''} ${open ? 'menu-open' : ''}`}>
    <div className="header-inner container">
      <a className="wordmark" href={url('home')} aria-label="JK — Home">JK<span>.</span></a>
      <span className="header-note">ENGINEERING & POSSIBILITY</span>
      <button ref={buttonRef} className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>
        {open ? <X size={25} aria-hidden="true" /> : <Menu size={25} aria-hidden="true" />}
      </button>
      <nav id="main-navigation" className={`site-nav ${open ? 'is-open' : ''}`} ref={navRef} aria-label="Main navigation">
        {navigation.map(item => <a href={url(item.page)} key={item.page} aria-current={page === item.page ? 'page' : undefined}
          onClick={() => setOpen(false)}>{item.label}<span className="nav-number" aria-hidden="true">0{navigation.indexOf(item) + 1}</span></a>)}
        <a className="nav-contact" href={url('connect')} aria-current={page === 'connect' ? 'page' : undefined} onClick={() => setOpen(false)}>
          Let’s connect<ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </nav>
    </div>
  </header>;
}
