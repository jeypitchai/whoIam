import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { JSDOM } from 'jsdom';

const segments = (process.env.SITE_BASE || '/whoIam/').split('/').filter(Boolean);
const base = `/${segments.join('/')}${segments.length ? '/' : ''}`;
const origin = (process.env.SITE_ORIGIN || 'https://jeypitchai.github.io').replace(/\/$/, '');
const pageIds = ['home', 'about', 'skills', 'work', 'expertise', 'connect'];
const documents = new Map();
for (const page of pageIds) {
  const path = page === 'home' ? 'index.html' : `${page}/index.html`;
  const html = await readFile(resolve('dist', path), 'utf8');
  documents.set(page, new JSDOM(html).window.document);
}

test('six pages contain distinct pre-rendered content and metadata', () => {
  const titles = new Set();
  for (const [page, doc] of documents) {
    assert.equal(doc.querySelector('#root').dataset.page, page);
    assert.equal(doc.querySelectorAll('h1').length, 1, `${page}: one page heading`);
    assert.ok(doc.querySelector('main').textContent.trim().length > 300, `${page}: content before JavaScript`);
    assert.ok(doc.querySelector('meta[name="description"]').content.length > 40);
    assert.equal(doc.querySelector('link[rel="canonical"]').href, `${origin}${base}${page === 'home' ? '' : `${page}/`}`);
    titles.add(doc.title);
    const ids = [...doc.querySelectorAll('[id]')].map(el => el.id);
    assert.equal(ids.length, new Set(ids).size, `${page}: unique ids`);
    assert.equal(doc.querySelectorAll('#main-navigation [aria-current="page"]').length, 1);
  }
  assert.equal(titles.size, 6);
});

test('links, fragments and assets resolve under the configured hosting path', async () => {
  for (const [page, doc] of documents) {
    for (const el of doc.querySelectorAll('a[href],script[src],link[href],img[src],video[src]')) {
      const value = el.getAttribute('href') || el.getAttribute('src');
      if (/^(https?:|mailto:|tel:|data:)/.test(value)) continue;
      const pagePath = `${base}${page === 'home' ? '' : `${page}/`}`;
      const url = new URL(value, `${origin}${pagePath}`);
      assert.ok(url.pathname.startsWith(base), `${page}: ${value} preserves base path`);
      let relative = decodeURIComponent(url.pathname.slice(base.length));
      if (!relative || relative.endsWith('/')) relative += 'index.html';
      assert.ok((await stat(resolve('dist', relative))).isFile(), `${page}: ${value} exists`);
      if (url.hash) {
        const targetPage = relative === 'index.html' ? 'home' : relative.split('/')[0];
        assert.ok(documents.get(targetPage)?.getElementById(decodeURIComponent(url.hash.slice(1))), `${page}: fragment ${value} exists`);
      }
    }
    for (const el of doc.querySelectorAll('a[target="_blank"]')) assert.ok(el.rel.includes('noopener'));
  }
});

test('resume, portrait cards, project anchors and career facts are included', async () => {
  const resume = await readFile('dist/resume/JeyakrishnanPitchaikani_Resume.pdf');
  assert.equal(resume.subarray(0, 5).toString(), '%PDF-');
  assert.deepEqual(resume, await readFile('public/resume/JeyakrishnanPitchaikani_Resume.pdf'));
  assert.equal(documents.get('work').querySelectorAll('.project-detailed').length, 7);
  const home = documents.get('home');
  const featured = [...home.querySelectorAll('#selected-work .project-card')];
  assert.deepEqual(featured.map(card => card.querySelector('a').getAttribute('href')), [
    `${base}work/#digital-brain`, `${base}work/#voice-ai`, `${base}work/#image-to-record`,
  ]);
  assert.equal(featured[2].querySelector('h3').textContent, 'AI Image Capture and Salesforce Integration');
  assert.ok(home.querySelector('.hero-role').textContent.includes('AI Solution Builder'));
  for (const page of ['home', 'work']) {
    assert.equal(documents.get(page).querySelector('.knowledge-hub img').getAttribute('src'), `${base}skills/logos/devicon-neo4j.svg`);
    assert.ok(documents.get(page).querySelector('.capture-brand img[src$="logos-salesforce.svg"]'));
  }
  assert.ok(documents.get('home').querySelector('main').textContent.includes('19+'));
  assert.ok(documents.get('about').body.textContent.includes('Master of Computer Applications'));
  assert.ok(documents.get('about').body.textContent.includes('Jun 2007'));
  assert.ok(documents.get('connect').querySelector('a[href="mailto:jkkanin@gmail.com"]'));
  for (const page of ['about']) {
    const portrait = documents.get(page).querySelector('.badge-image.has-portrait img');
    assert.ok(portrait, `${page}: portrait is included before JavaScript`);
    assert.equal(portrait.getAttribute('src'), `${base}media/jk-portrait.webp`);
    assert.equal(portrait.alt, 'Portrait of Jeyakrishnan Pitchaikani');
    assert.equal(documents.get(page).querySelector('.badge-portrait-mark').textContent, 'JK.');
  }
  const video = home.querySelector('video');
  assert.equal(video.getAttribute('src'), `${base}media/jk-introduction-orange.mp4`);
  assert.equal(video.getAttribute('poster'), `${base}media/jk-introduction-orange.webp`);
  for (const archived of ['jk-introduction.mp4', 'jk-introduction.webp']) {
    assert.ok((await stat(resolve('dist/media', archived))).isFile(), 'Previous reel remains available for swapping');
    assert.deepEqual(await readFile(resolve('dist/media', archived)), await readFile(resolve('public/media', archived)));
    for (const doc of documents.values()) {
      assert.equal(doc.querySelector(`[src="${base}media/${archived}"], [poster="${base}media/${archived}"]`), null, 'Inactive reel is not rendered');
    }
  }
  assert.equal(video.hasAttribute('loop'), false);
  assert.equal(video.hasAttribute('autoplay'), false, 'First-visit policy controls autoplay');
  assert.ok(video.hasAttribute('muted') && video.hasAttribute('playsinline'));
  for (const [page, doc] of documents) {
    assert.equal(doc.querySelectorAll('video').length, page === 'home' ? 1 : 0);
    assert.ok(doc.querySelector('button[aria-controls="main-navigation"][aria-expanded="false"]'));
  }
  assert.equal(((await readFile('dist/sitemap.xml', 'utf8')).match(/<url>/g) || []).length, 6);
});

test('Skills includes the full resume toolkit, local logos, and navigation after About', async () => {
  const doc = documents.get('skills');
  const tiles = [...doc.querySelectorAll('[data-skill]')];
  assert.equal(tiles.length, 131);
  assert.equal(new Set(tiles.map(tile => tile.dataset.skill)).size, tiles.length);
  assert.equal(doc.querySelectorAll('.skill-group').length, 8);
  const names = new Set(tiles.map(tile => tile.querySelector('.skill-tile-name').textContent));
  for (const name of ['Windsurf', 'Jev', 'Model Context Protocol', 'MyBatis', 'iBatis', 'Kendo UI', 'IBM DB2', 'Vertica', 'Unix', 'Solaris', 'Apache Ant', 'TestNG', 'Gherkin', 'AI-driven SDLC', 'Engineering mentorship']) {
    assert.ok(names.has(name), `${name} from the resume is present`);
  }
  for (const tile of tiles) assert.ok(tile.querySelector('.skill-logo img, .skill-logo svg'), 'Each skill has a logo or meaningful symbol');
  for (const image of doc.querySelectorAll('.skill-logo img')) {
    assert.ok(image.getAttribute('src').startsWith(`${base}skills/logos/`), 'Logos are self-hosted');
    assert.equal(image.alt, '', 'Decorative logos accompany text labels');
    assert.ok(image.hasAttribute('width') && image.hasAttribute('height'));
  }
  assert.ok(doc.querySelector('input[type="search"][aria-controls="skill-results"]'));
  assert.equal(doc.querySelectorAll('.skills-filters button[aria-pressed="true"]').length, 1);
  for (const page of documents.values()) {
    const links = [...page.querySelectorAll('#main-navigation > a')];
    const about = links.findIndex(link => link.textContent.startsWith('About'));
    assert.ok(links[about + 1].textContent.startsWith('Skills'));
    assert.equal(links[about + 1].getAttribute('href'), `${base}skills/`);
  }
  const sources = JSON.parse(await readFile('dist/skills/logo-sources.json', 'utf8'));
  assert.ok(sources.length >= 60);
  for (const item of sources) {
    const svg = await readFile(resolve('dist', item.asset), 'utf8');
    assert.match(svg, /<svg/);
    assert.ok(!/<script|<foreignObject|\son\w+=/i.test(svg));
  }
});
