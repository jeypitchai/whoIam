import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { SiteLayout } from './components/SiteLayout';
import { pageIds, type PageId } from './lib/urls';
import './styles/index.css';

const root = document.getElementById('root');
const page = root?.dataset.page as PageId;
if (!root || !pageIds.includes(page)) throw new Error('A valid portfolio page is required.');
const pageModules = {
  home: () => import('./pages/Home').then(module => module.Home),
  about: () => import('./pages/About').then(module => module.About),
  skills: () => import('./pages/Skills').then(module => module.Skills),
  work: () => import('./pages/Work').then(module => module.Work),
  expertise: () => import('./pages/Expertise').then(module => module.Expertise),
  connect: () => import('./pages/Connect').then(module => module.Connect),
};

async function hydratePage() {
  const Page = await pageModules[page]();
  hydrateRoot(root!, <SiteLayout page={page} base={import.meta.env.BASE_URL}><Page /></SiteLayout>);
}
void hydratePage().catch(error => console.error('Portfolio interactions could not initialize.', error));
