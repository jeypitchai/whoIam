import React, { createContext, useContext } from 'react';
import { pageUrl, assetUrl, type PageId } from '../lib/urls';

const SiteContext = createContext({ base: '/', page: 'home' as PageId });
export const SiteProvider = SiteContext.Provider;

export function useSite() {
  const context = useContext(SiteContext);
  return {
    ...context,
    url: (page: PageId, fragment?: string) => pageUrl(context.base, page, fragment),
    asset: (path: string) => assetUrl(context.base, path),
  };
}
