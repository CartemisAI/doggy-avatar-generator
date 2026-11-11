// Regenerates the banner image used by README.md.
//   node scripts/readme-assets.mjs
// Output: docs/assets/hero.svg (not included in the npm package).
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BREED_CATALOG, createAvatar } from '../src/index.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'docs', 'assets');
mkdirSync(outDir, { recursive: true });

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";
const PASTELS = ['#FFF1E0', '#E6F2FF', '#EFE9FF', '#E4F7EA', '#FFE9EF', '#FFF7D6', '#E0F6F6', '#F3ECE4'];
const INK = '#2B2D42';
const MUTED = '#6B6F86';

let uid = 0;

/** Embeds a generated avatar as a nested <svg> placed at (x, y) with the given box size. */
function place(seed, options, x, y, box) {
  const svg = createAvatar(seed, { ...options, prefix: `r${uid++}` })
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace(/<metadata>[\s\S]*?<\/metadata>/, '');
  return svg.replace(
    /^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" width="\d+" height="\d+"/,
    `<svg x="${x}" y="${y}" width="${box}" height="${box}"`,
  );
}

function escape(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function label(x, y, text, { size = 14, weight = 600, fill = INK, family = FONT } = {}) {
  return `<text x="${x}" y="${y}" text-anchor="middle" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}">${escape(text)}</text>`;
}

function doc(width, height, body, title) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escape(title)}"><title>${escape(title)}</title>${body}</svg>\n`;
}

function write(name, content) {
  writeFileSync(join(outDir, name), content);
  console.log(`docs/assets/${name}  ${(content.length / 1024).toFixed(1)} KB`);
}

const SHORT_NAMES = { labrador: 'Labrador', bernese: 'Bernese', schnauzer: 'Schnauzer', 'french-bulldog': 'Frenchie', corgi: 'Corgi', golden: 'Golden' };
const breedName = (id) => SHORT_NAMES[id] ?? BREED_CATALOG.find((b) => b.id === id).name;

// ── Hero ─────────────────────────────────────────────────────────────────────
{
  const W = 1000;
  const H = 260;
  const cast = [
    ['hero-1', { breed: 'shiba', outfit: 'hoodie', headwear: 'beanie', garmentColor: 'sky', headwearColor: 'rose', expression: 'smile' }],
    ['hero-2', { breed: 'samoyed', outfit: 'astronaut', headwear: 'none', accessory: 'none', expression: 'joy' }],
    ['hero-3', { breed: 'corgi', outfit: 'raincoat', headwear: 'sailor-cap', garmentColor: 'honey', expression: 'tongue' }],
    ['hero-4', { breed: 'french-bulldog', outfit: 'tuxedo', headwear: 'top-hat', accessory: 'monocle', expression: 'smirk' }],
    ['hero-5', { breed: 'golden', outfit: 'flower-dress', headwear: 'flower-wreath', garmentColor: 'peach', expression: 'dreamy' }],
    ['hero-6', { breed: 'dalmatian', outfit: 'chef', headwear: 'chef-hat', accessory: 'none', expression: 'cheeky' }],
    ['hero-7', { breed: 'pug', outfit: 'wizard', headwear: 'witch-hat', garmentColor: 'midnight', headwearColor: 'amethyst', expression: 'curious' }],
  ];
  const box = 128;
  const gap = (W - cast.length * box) / (cast.length + 1);
  let body = `<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFF6EC"/><stop offset="0.5" stop-color="#F3EEFF"/><stop offset="1" stop-color="#E8F6FF"/></linearGradient></defs>`;
  body += `<rect width="${W}" height="${H}" rx="24" fill="url(#bg)"/>`;
  cast.forEach(([seed, options], i) => {
    const x = gap + i * (box + gap);
    const cy = 120 + (i % 2 === 0 ? 8 : -8);
    body += `<circle cx="${x + box / 2}" cy="${cy}" r="${box / 2 + 4}" fill="${PASTELS[i % PASTELS.length]}" stroke="#FFFFFF" stroke-width="4"/>`;
    body += place(seed, { ...options, size: 256, framing: 'full' }, x, cy - box / 2 - 2, box);
    body += label(x + box / 2, 232, breedName(options.breed), { size: 13, weight: 600, fill: MUTED });
  });
  write('hero.svg', doc(W, H, body, 'Generated dog avatars'));
}
