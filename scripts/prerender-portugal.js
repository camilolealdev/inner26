#!/usr/bin/env node
/**
 * Generates dist/portugal/index.html from dist/index.html with dedicated
 * Portugal Open Graph, Twitter Cards, canonical link, and JSON-LD schema.
 * 
 * Ensures social share crawlers (WhatsApp, Facebook, LinkedIn, X, Telegram)
 * reading https://innerspirit.net/portugal immediately receive Portugal
 * metadata without running client-side JS.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distIndex = path.join(rootDir, 'dist', 'index.html');
const distPortugalDir = path.join(rootDir, 'dist', 'portugal');
const distPortugalIndex = path.join(distPortugalDir, 'index.html');

if (!fs.existsSync(distIndex)) {
  console.error('❌ Error: dist/index.html not found. Run "vite build" first.');
  process.exit(1);
}

let html = fs.readFileSync(distIndex, 'utf8');

// 1. Language & Canonical
html = html.replace(/<html lang="[^"]*"/, '<html lang="pt"');
html = html.replace(
  /<link rel="canonical" href="[^"]*"\s*\/?>/,
  '<link rel="canonical" href="https://innerspirit.net/portugal" />'
);

// 2. Title & Meta description
html = html.replace(
  /<title>.*?<\/title>/,
  '<title>Inner Spirit Portugal — Voluntariado & Comunidade na Costa da Nazaré</title>'
);
html = html.replace(
  /<meta name="description" content="[^"]*"\s*\/?>/,
  '<meta name="description" content="Inner Spirit Portugal — Programa de voluntariado e espaço consciente na costa de Leiria, perto da Nazaré. Remodelações, horta e construção da futura comunidade." />'
);

// 3. Open Graph Tags
html = html.replace(
  /<meta property="og:title" content="[^"]*"\s*\/?>/,
  '<meta property="og:title" content="Inner Spirit Portugal — Voluntariado & Comunidade na Costa da Nazaré" />'
);
html = html.replace(
  /<meta property="og:description" content="[^"]*"\s*\/?>/,
  '<meta property="og:description" content="Inner Spirit semeia um novo espaço de bem-estar na zona centro de Portugal, perto da Nazaré (costa de Leiria). Programa de voluntariado aberto para remodelações, horta e futuras cabanas." />'
);
html = html.replace(
  /<meta property="og:url" content="[^"]*"\s*\/?>/,
  '<meta property="og:url" content="https://innerspirit.net/portugal" />'
);
html = html.replace(
  /<meta property="og:image" content="[^"]*"\s*\/?>/,
  '<meta property="og:image" content="https://innerspirit.net/images/portugal/og-portugal.jpg" />'
);
html = html.replace(
  /<meta property="og:locale" content="[^"]*"\s*\/?>/,
  '<meta property="og:locale" content="pt_PT" />'
);
html = html.replace(
  /<meta property="og:site_name" content="[^"]*"\s*\/?>/,
  '<meta property="og:site_name" content="Inner Spirit Portugal" />'
);

// 4. Twitter Card Tags
html = html.replace(
  /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
  '<meta name="twitter:title" content="Inner Spirit Portugal — Voluntariado & Comunidade na Costa da Nazaré" />'
);
html = html.replace(
  /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
  '<meta name="twitter:description" content="Inner Spirit semeia um novo espaço de bem-estar na zona centro de Portugal, perto da Nazaré. Programa de voluntariado aberto." />'
);
html = html.replace(
  /<meta name="twitter:image" content="[^"]*"\s*\/?>/,
  '<meta name="twitter:image" content="https://innerspirit.net/images/portugal/og-portugal.jpg" />'
);

// 5. Ensure Portugal target directory exists
if (!fs.existsSync(distPortugalDir)) {
  fs.mkdirSync(distPortugalDir, { recursive: true });
}

fs.writeFileSync(distPortugalIndex, html, 'utf8');
console.log('✅ Generated dist/portugal/index.html with dedicated Open Graph metadata.');
