import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './src/App';
import { pageIds, normalizeBase, pageUrl, type PageId } from './src/lib/urls';
import { pageMetadata } from './src/data/pages';
import { profile } from './src/data/portfolio';

function escapeAttribute(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

// Emit populated HTML for each entry; React hydrates interactive controls.
// Links load independent documents without a client-side router or SPA fallback.
function staticPages(base: string, origin: string): Plugin {
  return {
    name: 'portfolio-static-pages',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const page = html.match(/data-page="(\w+)"/)?.[1] as PageId;
        if (!pageIds.includes(page)) return html;
        const meta = pageMetadata[page];
        const canonical = `${origin}${pageUrl(base, page)}`;
        const structuredData = { '@context': 'https://schema.org', '@type': 'Person', name: profile.name, url: `${origin}${base}`, jobTitle: profile.role, worksFor: { '@type': 'Organization', name: profile.organization }, sameAs: [profile.linkedin, profile.github] };
        return html
          .replace('<title>Portfolio</title>', `<title>${escapeAttribute(meta.title)}</title>`)
          .replace('<!--page-meta-->', `<meta name="description" content="${escapeAttribute(meta.description)}" />\n<link rel="canonical" href="${canonical}" />\n<meta property="og:type" content="website" />\n<meta property="og:title" content="${escapeAttribute(meta.title)}" />\n<meta property="og:description" content="${escapeAttribute(meta.description)}" />\n<meta property="og:url" content="${canonical}" />\n<script type="application/ld+json">${JSON.stringify(structuredData).replaceAll('<', '\\u003c')}</script>`)
          .replace('<!--app-html-->', renderToString(React.createElement(App, { page, base })));
      },
    },
    generateBundle() {
      const urls = pageIds.map(page => `<url><loc>${origin}${pageUrl(base, page)}</loc></url>`).join('');
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>` });
      this.emitFile({ type: 'asset', fileName: '.nojekyll', source: '' });
    },
  };
}

export default defineConfig(({ command, mode, isPreview }) => {
  const env = loadEnv(mode, process.cwd(), 'SITE_');
  const base = normalizeBase(env.SITE_BASE || (command === 'build' || isPreview ? '/whoIam/' : '/'));
  const origin = (env.SITE_ORIGIN || 'https://jeypitchai.github.io').replace(/\/$/, '');
  return {
    base,
    plugins: [staticPages(base, origin), react(), tailwindcss()],
    build: {
      rollupOptions: {
        input: Object.fromEntries(pageIds.map(page => [page, resolve(process.cwd(), page === 'home' ? 'index.html' : `${page}/index.html`)])),
      },
    },
  };
});
