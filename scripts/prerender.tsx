/**
 * Post-build prerender for the public marketing routes.
 *
 * Runs after `vite build` (see the `build` script): renders each public page
 * to static HTML with react-dom/server and injects it into a copy of the
 * built dist/index.html, so crawlers get real visible Mongolian/English text
 * instead of an empty <div id="root">. The client bundle still boots normally
 * and replaces the snapshot on mount — no app behavior changes.
 *
 * App routes (/admin, /teacher, in-app tabs) are deliberately NOT prerendered:
 * they are behind auth and excluded via robots.txt.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { renderToString } from 'react-dom/server';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import HeroPage from '../frontend/src/HeroPage';
import TermsPage from '../frontend/src/pages/TermsPage';
import PrivacyPage from '../frontend/src/pages/PrivacyPage';
import ContactPage from '../frontend/src/pages/ContactPage';

const ORIGIN = 'https://www.gridwave.me';
const DIST = path.resolve(__dirname, '../dist');

const noop = () => {};

interface Route {
  route: string; // '/' | '/terms' | ...
  element: React.ReactElement;
  // Homepage keeps the meta already in index.html; subpages override these.
  title?: string;
  description?: string;
}

const ROUTES: Route[] = [
  {
    route: '/',
    element: <HeroPage onLogin={noop} onSignup={noop} onGuest={noop} />,
  },
  {
    route: '/terms',
    element: <TermsPage />,
    title: 'Үйлчилгээний нөхцөл — Vivid Lingua',
    description:
      'Vivid Lingua платформын үйлчилгээний нөхцөл. Герман хэл (A1–C2, TestDaF, Goethe) болон Англи хэл (IELTS, SAT) сурах Монгол платформын хэрэглээний журам.',
  },
  {
    route: '/privacy',
    element: <PrivacyPage />,
    title: 'Нууцлалын бодлого — Vivid Lingua',
    description:
      'Vivid Lingua-ийн нууцлалын бодлого: герман хэл, англи хэл сурах платформ таны мэдээллийг хэрхэн цуглуулж, хамгаалдаг тухай.',
  },
  {
    route: '/contact',
    element: <ContactPage />,
    title: 'Холбоо барих — Vivid Lingua | Герман, Англи хэлний сургалт',
    description:
      'Vivid Lingua-тай холбогдох: герман хэл сурах, англи хэл сурах, TestDaF, IELTS бэлтгэл, SAT сургалтын талаар асуулт, санал хүсэлт илгээх.',
  },
];

// Organization + WebSite structured data — homepage only.
const JSON_LD = `<script type="application/ld+json">${JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'Vivid Lingua',
      url: `${ORIGIN}/`,
      logo: `${ORIGIN}/og-card.png`,
      email: 'hanaa5qn@gmail.com',
    },
    {
      '@type': 'WebSite',
      name: 'Vivid Lingua',
      url: `${ORIGIN}/`,
      inLanguage: 'mn',
      description:
        'Герман болон Англи хэлийг монгол хэл дээрх тайлбартай сур — TestDaF, Goethe, IELTS, SAT бэлтгэл.',
    },
  ],
})}</script>`;

// Replace exactly one regex match or fail loudly — a silent non-match would
// ship a page with the wrong title/canonical.
function replaceOne(html: string, pattern: RegExp, replacement: string, what: string): string {
  const matches = html.match(pattern);
  if (!matches || matches.length !== 1) {
    throw new Error(`prerender: expected exactly 1 match for ${what}, got ${matches?.length ?? 0}`);
  }
  return html.replace(pattern, replacement);
}

// framer-motion server-renders its `initial` (hidden) state — opacity:0 and a
// translateY offset — which would hide the text from crawlers. Strip those:
// the client bundle re-renders from scratch on mount, so animations still run
// exactly as before for real visitors.
function unhideMotionInitialState(html: string): string {
  return html
    .replaceAll('opacity:0', 'opacity:1')
    .replace(/translateY\((-?[\d.]+)(px|%)\)/g, 'translateY(0px)')
    .replace(/translateX\((-?[\d.]+)(px|%)\)/g, 'translateX(0px)');
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function buildPage(template: string, r: Route): string {
  const app = unhideMotionInitialState(renderToString(r.element));
  let html = replaceOne(
    template,
    /<div id="root"><\/div>/,
    `<div id="root">${app}</div>`,
    '#root container',
  );

  const url = r.route === '/' ? `${ORIGIN}/` : `${ORIGIN}${r.route}`;
  html = replaceOne(
    html,
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${url}" />`,
    'canonical link',
  );
  html = replaceOne(
    html,
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${url}" />`,
    'og:url',
  );

  if (r.title && r.description) {
    html = replaceOne(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(r.title)}</title>`, 'title');
    html = replaceOne(
      html,
      /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/,
      `<meta name="description" content="${esc(r.description)}" />`,
      'meta description',
    );
    html = replaceOne(
      html,
      /<meta property="og:title" content="[^"]*"\s*\/?>/,
      `<meta property="og:title" content="${esc(r.title)}" />`,
      'og:title',
    );
  } else {
    html = replaceOne(html, /<\/head>/, `${JSON_LD}</head>`, 'head close (JSON-LD)');
  }

  return html;
}

function main() {
  const templatePath = path.join(DIST, 'index.html');
  const template = fs.readFileSync(templatePath, 'utf8');

  for (const r of ROUTES) {
    const html = buildPage(template, r);

    // Sanity: crawlable Mongolian text must actually be visible.
    if (html.includes('opacity:0')) throw new Error(`prerender ${r.route}: hidden text remains`);
    if (!/[А-Яа-яӨөҮүЁё]/.test(html.replace(/<head>[\s\S]*<\/head>/, ''))) {
      throw new Error(`prerender ${r.route}: no Cyrillic body text found`);
    }

    const outPath =
      r.route === '/' ? templatePath : path.join(DIST, r.route.slice(1), 'index.html');
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html);
    console.log(`prerendered ${r.route} → ${path.relative(DIST, outPath)} (${html.length} bytes)`);
  }
}

main();
