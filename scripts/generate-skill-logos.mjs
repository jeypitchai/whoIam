import { mkdir, readFile, writeFile } from 'node:fs/promises';
import * as simpleIcons from 'simple-icons';
import { allSkills } from '../src/data/skills.ts';
import { brandLogoPath } from '../src/lib/logos.ts';
import { certificates } from '../src/data/credentials.ts';

const collections = {};
for (const name of ['logos', 'devicon']) {
  collections[name] = JSON.parse(await readFile(`node_modules/@iconify-json/${name}/icons.json`, 'utf8'));
}
const simple = new Map(Object.values(simpleIcons).map(icon => [icon.slug, icon]));
await mkdir('public/skills/logos', { recursive: true });
const manifest = [];
for (const source of new Set([...allSkills.map(skill => skill.logo).filter(Boolean), ...certificates.map(certificate => certificate.issuerLogo)])) {
  const [collection, name] = source.split(':');
  let svg;
  if (collection === 'lobe') {
    svg = await readFile(`node_modules/@lobehub/icons-static-svg/icons/${name}.svg`, 'utf8');
    svg = svg.replaceAll('currentColor', '#191916');
    manifest.push({ asset: brandLogoPath(source), collection: 'Lobe Icons', source: 'https://github.com/lobehub/lobe-icons', license: 'MIT' });
  } else if (collection === 'simple') {
    const icon = simple.get(name);
    if (!icon) throw new Error(`Missing brand icon: ${source}`);
    svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#${icon.hex}" d="${icon.path}"/></svg>`;
    manifest.push({ asset: brandLogoPath(source), collection: 'Simple Icons', source: icon.source, license: icon.license ?? 'CC0 collection; brand rights remain with their owners' });
  } else {
    const data = collections[collection];
    const alias = data.aliases?.[name];
    const icon = data.icons[name] ?? data.icons[alias?.parent];
    if (!icon || alias?.rotate || alias?.hFlip || alias?.vFlip) throw new Error(`Missing or transformed icon: ${source}`);
    svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${icon.width ?? data.width ?? 24} ${icon.height ?? data.height ?? 24}">${icon.body}</svg>`;
    const info = JSON.parse(await readFile(`node_modules/@iconify-json/${collection}/info.json`, 'utf8'));
    manifest.push({ asset: brandLogoPath(source), collection: info.name, source: info.author.url, license: info.license });
  }
  if (/<script|<foreignObject|\son\w+=|https?:\/\//i.test(svg.replace('http://www.w3.org/2000/svg', ''))) throw new Error(`Unsafe icon markup: ${source}`);
  await writeFile(`public/${brandLogoPath(source)}`, svg);
}
await writeFile('public/skills/logo-sources.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`Generated ${manifest.length} local logos for skills and certificate issuers.`);
