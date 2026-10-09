import React from 'react';
import type { PageId } from './lib/urls';
import { SiteLayout } from './components/SiteLayout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Skills } from './pages/Skills';
import { Work } from './pages/Work';
import { Expertise } from './pages/Expertise';
import { Connect } from './pages/Connect';

const pages = { home: Home, about: About, skills: Skills, work: Work, expertise: Expertise, connect: Connect };

export function App({ page, base }: { page: PageId; base: string }) {
  const Page = pages[page];
  return <SiteLayout page={page} base={base}><Page /></SiteLayout>;
}
