# Jeyakrishnan Pitchaikani — portfolio

A responsive, multi-page portfolio built with React, TypeScript, Vite, Tailwind CSS, and selective Motion animations. Inspired by the Lohitha portfolio's warm hero, hanging portrait badge, contrasting editorial sections, and bold typography.

## Run locally

Use Node.js 24 (see `.nvmrc`; minimum supported version is 22.12).

```sh
nvm install
nvm use
npm ci
npm run dev
```

Development starts at `http://127.0.0.1:5173/`.

```sh
npm run check
npm run preview
```

The production preview starts at `http://127.0.0.1:4173/whoIam/`. `check` runs TypeScript validation, builds all pages, and tests generated content, links, fragments, assets, metadata, and the resume download.

## Pages

| Page | URL | Purpose |
| --- | --- | --- |
| Home | `/whoIam/` | Introduction, selected work, approach, and capability overview |
| About | `/whoIam/about/` | Career timeline, education, recognition, and community |
| Skills | `/whoIam/skills/` | Searchable logo gallery covering 131 tools and practices in eight disciplines |
| Work | `/whoIam/work/` | Seven projects with contribution details and technology stacks |
| Expertise | `/whoIam/expertise/` | Engineering, architecture, AI, data, and delivery capabilities |
| Connect | `/whoIam/connect/` | Email, professional profiles, and resume download |

Each page is a separate HTML entry. The Vite plugin pre-renders the React content into each document, then React hydrates interactive controls. Navigation uses ordinary links. There is no client-side router or SPA fallback; pages support direct links and reloads on static hosting. Page-specific JavaScript is loaded separately.

## Structure

```text
about/, skills/, work/, expertise/, connect/  Independent HTML entries
index.html                          Home entry
src/
  pages/                            Page-level composition
  components/                       Shared layout, navigation, cards, and visuals
  data/                             Professional content, metadata, and media settings
  lib/                              Base-aware page and asset URLs
  styles/                           Tokens, base, layout, components, pages, responsive CSS
  App.tsx                           Build-time page composition
  main.tsx                          Page-specific hydration
public/
  resume/                           Supplied resume PDF
  media/                            Transparent portrait and optional video
  favicon.svg                       JK identity
tests/                              Generated-site integration checks
vite.config.ts                      Multi-page build and static rendering
.github/workflows/deploy.yml         Validation and GitHub Pages deployment
```

## Update content and assets

- Professional content: `src/data/portfolio.ts`.
- Skills, categories, and search aliases: `src/data/skills.ts`.
- Page titles and descriptions: `src/data/pages.ts`.
- Colors and sizing: `src/styles/tokens.css`.
- Portrait and video: add files to `public/media/`, then update `src/data/media.ts`. Set `activeIntroReel` to `'orange'` (current) or `'original'` (retained previous version) to swap the Home video and matching poster together.
- Resume: replace `public/resume/JeyakrishnanPitchaikani_Resume.pdf`.

The current resume is included unchanged. Its career dates, degrees, experience, email, and project contributions inform the website. Recognition and community details carry forward from the existing portfolio. Website project descriptions omit customer names.

Home uses the supplied 30-second introduction as an orange-background avatar reel. It autoplays once per browser, muted, and then plays only through Play/Stop; sound has its own control. Reduced-motion visitors receive the opening frame with manual playback. About retains the transparent portrait ID card with a JK corner mark. See `public/media/README.md` and `docs/intro-video.md` for media configuration and processing, and `docs/portrait-edit.md` for the photograph cutout. Email, phone, and LinkedIn links work directly.

The Skills page includes the resume's full skill set, project technologies, and delivery practices, including historical tools. It uses a connected logo constellation, scroll reveals, animated filtering, and hover responses, with a reduced-motion alternative. Search recognizes aliases such as MCP, RAG, EJB, JSP, and UAT. Technology marks are self-hosted; unverified marks and unbranded practices use decorative symbols rather than invented logos. Java-family tools and Cypher use their platform marks.

Local logo assets are committed with source/license information in `public/skills/`. To regenerate them after changing the logo references, run `npm run icons:generate` with Node.js 24. The icon collections are development dependencies; the website loads only the selected local SVGs.

## GitHub Pages

The production default is `https://jeypitchai.github.io/whoIam/`, with Vite base `/whoIam/`. All internal page links and assets include that subpath.

In repository Settings → Pages, select **GitHub Actions** as the deployment source. The workflow builds and validates pull requests, and deploys `dist/` on pushes to `main` or a manual run. Building locally does not publish the site.

For another hosting path or domain:

```sh
SITE_BASE=/ SITE_ORIGIN=https://example.com npm run check
```

Use the same `SITE_BASE` when starting the preview. Deployment uses static HTML, CSS, JS, and the resume asset; no server runtime is needed.

## Design and accessibility

The site uses semantic headings, active-page navigation, a skip link, visible keyboard focus, a keyboard-operable mobile menu with Escape dismissal and focus restoration, native career disclosures, reduced-motion styles, and visible pre-rendered content without JavaScript. Phone navigation also has a no-JavaScript fallback. Decorative visuals are hidden from assistive technology.

The [reference review](docs/portfolio-reference-review.md) documents the initial design exploration. The [architecture notes](docs/architecture.md) describe the implemented page structure and validation.
