// Regenerates the showcase images used by README.md.
//   node scripts/readme-assets.mjs
// Output: docs/assets/*.svg (not included in the npm package).
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
  write('hero.svg', doc(W, H, body, 'A parade of generated dog avatars'));
}

// ── Breed gallery ────────────────────────────────────────────────────────────
{
  const breeds = [
    'labrador', 'german-shepherd', 'husky', 'border-collie', 'beagle', 'poodle',
    'chow-chow', 'dachshund', 'bernese', 'akita', 'schnauzer', 'afghan',
    'shar-pei', 'bull-terrier', 'pomeranian', 'basset', 'komondor', 'xolo',
  ];
  const cols = 6;
  const cell = 160;
  const box = 120;
  const rows = Math.ceil(breeds.length / cols);
  const W = cols * cell;
  const H = rows * (cell + 16);
  let body = `<rect width="${W}" height="${H}" rx="24" fill="#FBFAF7"/>`;
  breeds.forEach((breed, i) => {
    const cx = (i % cols) * cell;
    const cy = Math.floor(i / cols) * (cell + 16);
    body += `<rect x="${cx + 12}" y="${cy + 12}" width="${cell - 24}" height="${cell - 8}" rx="18" fill="${PASTELS[(i + Math.floor(i / cols)) % PASTELS.length]}"/>`;
    body += place(`gallery-${breed}`, { breed, size: 256, framing: 'bust' }, cx + (cell - box) / 2, cy + 14, box);
    body += label(cx + cell / 2, cy + cell - 6, breedName(breed), { size: 12 });
  });
  write('breeds.svg', doc(W, H, body, '18 of the 120 built-in breeds'));
}

// ── Size-aware composition ───────────────────────────────────────────────────
{
  const dog = { breed: 'shiba', outfit: 'varsity', headwear: 'cap', garmentColor: 'forest', headwearColor: 'honey', expression: 'smile' };
  const frames = [
    { size: 24, caption: 'size: 24', sub: '→ bust' },
    { size: 32, caption: 'size: 32', sub: '→ bust' },
    { size: 64, caption: 'size: 64', sub: '→ full' },
    { size: 256, caption: 'size: 256', sub: '→ full' },
    { size: 256, framing: 'head', caption: "framing: 'head'", sub: 'no styling layers' },
  ];
  const cell = 190;
  const box = 140;
  const W = frames.length * cell;
  const H = 250;
  let body = `<rect width="${W}" height="${H}" rx="24" fill="#FBFAF7"/>`;
  frames.forEach((f, i) => {
    const x = i * cell;
    body += `<rect x="${x + 14}" y="16" width="${cell - 28}" height="${box + 20}" rx="18" fill="${PASTELS[i]}"/>`;
    // Rendered with the real size so the composition rule applies, then shown enlarged.
    body += place('size-demo', { ...dog, size: f.size, framing: f.framing ?? 'auto' }, x + (cell - box) / 2, 26, box);
    body += label(x + cell / 2, 204, f.caption, { size: 14, family: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" });
    body += label(x + cell / 2, 226, f.sub, { size: 13, weight: 500, fill: MUTED });
  });
  write('sizes.svg', doc(W, H, body, 'Same dog, size-aware composition'));
}

// ── Expressions ──────────────────────────────────────────────────────────────
{
  const expressions = ['neutral', 'smile', 'tongue', 'wink', 'joy', 'curious', 'sleepy', 'surprised', 'grumpy', 'blep'];
  const cell = 100;
  const box = 88;
  const W = expressions.length * cell;
  const H = 132;
  let body = `<rect width="${W}" height="${H}" rx="22" fill="#FBFAF7"/>`;
  expressions.forEach((expression, i) => {
    const x = i * cell;
    body += `<circle cx="${x + cell / 2}" cy="54" r="42" fill="${PASTELS[i % PASTELS.length]}"/>`;
    body += place('expr-demo', { breed: 'shiba', framing: 'head', size: 256, expression }, x + (cell - box) / 2, 12, box);
    body += label(x + cell / 2, 116, expression, { size: 12, weight: 500, fill: MUTED, family: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" });
  });
  write('expressions.svg', doc(W, H, body, '10 of the 20 expressions'));
}

// ── Wardrobe ─────────────────────────────────────────────────────────────────
{
  const looks = [
    { outfit: 'hoodie', headwear: 'beanie', accessory: 'round-glasses', garmentColor: 'coral', headwearColor: 'honey' },
    { outfit: 'kimono', headwear: 'flower', accessory: 'none', garmentColor: 'sapphire', fabric: 'waves' },
    { outfit: 'knight', headwear: 'knight-helmet', accessory: 'none', garmentColor: 'silver', headwearColor: 'silver' },
    { outfit: 'bee-suit', headwear: 'bee-antennae', accessory: 'none', garmentColor: 'lemon' },
    { outfit: 'detective', headwear: 'detective-hat', accessory: 'monocle', garmentColor: 'mocha', headwearColor: 'cocoa' },
    { outfit: 'astronaut', headwear: 'none', accessory: 'none', garmentColor: 'snow' },
    { outfit: 'wizard', headwear: 'witch-hat', accessory: 'none', garmentColor: 'midnight', headwearColor: 'amethyst', fabric: 'stars' },
    { outfit: 'strawberry', headwear: 'strawberry-leaf', accessory: 'heart-glasses', garmentColor: 'ruby' },
  ];
  const cell = 125;
  const box = 112;
  const W = looks.length * cell;
  const H = 158;
  let body = `<rect width="${W}" height="${H}" rx="22" fill="#FBFAF7"/>`;
  looks.forEach((look, i) => {
    const x = i * cell;
    body += `<rect x="${x + 8}" y="10" width="${cell - 16}" height="${box + 4}" rx="16" fill="${PASTELS[i % PASTELS.length]}"/>`;
    body += place('wardrobe-demo', { breed: 'corgi', size: 256, framing: 'full', expression: 'smile', fabric: 'plain', ...look }, x + (cell - box) / 2, 10, box);
    body += label(x + cell / 2, 146, look.outfit, { size: 12, weight: 500, fill: MUTED, family: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" });
  });
  write('wardrobe.svg', doc(W, H, body, 'One corgi, eight looks'));
}
