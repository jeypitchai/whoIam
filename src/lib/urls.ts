export type PageId = 'home' | 'about' | 'skills' | 'work' | 'expertise' | 'connect';
export const pageIds: PageId[] = ['home', 'about', 'skills', 'work', 'expertise', 'connect'];

export function normalizeBase(base: string) {
  return `/${base.split('/').filter(Boolean).join('/')}${base.split('/').filter(Boolean).length ? '/' : ''}`;
}

export function pageUrl(base: string, page: PageId, fragment = '') {
  return `${normalizeBase(base)}${page === 'home' ? '' : `${page}/`}${fragment ? `#${fragment}` : ''}`;
}

export function assetUrl(base: string, path: string) {
  return `${normalizeBase(base)}${path.replace(/^\/+/, '')}`;
}
