import { readFile, writeFile, copyFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const pkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
if (!/^\d+\.\d+\.\d+$/.test(pkg.version)) throw new Error('Release version must be a stable three-part version');
const tag = `v${pkg.version}`;
if (process.env.GITHUB_REF_TYPE === 'tag' && process.env.GITHUB_REF_NAME !== tag) {
  throw new Error(`Tag ${process.env.GITHUB_REF_NAME} does not match package version ${tag}`);
}

const release = join(root, 'release');
const archive = `${pkg.name}-${pkg.version}.tgz`;
await readFile(join(release, archive));
await copyFile(join(root, 'output/doggy-avatar-generator.mjs'), join(release, 'doggy-avatar-generator.mjs'));
await copyFile(join(root, 'src/index.d.ts'), join(release, 'doggy-avatar-generator.d.mts'));

const assets = [archive, 'doggy-avatar-generator.mjs', 'doggy-avatar-generator.d.mts'];
const sums = await Promise.all(assets.map(async name => {
  const bytes = await readFile(join(release, name));
  return `${createHash('sha256').update(bytes).digest('hex')}  ${name}`;
}));
await writeFile(join(release, 'SHA256SUMS'), sums.join('\n') + '\n');

const changelog = await readFile(join(root, 'CHANGELOG.md'), 'utf8');
const heading = `## [${pkg.version}] - `;
const start = changelog.indexOf(heading);
if (start < 0) throw new Error(`Missing CHANGELOG entry for ${pkg.version}`);
const contentStart = changelog.indexOf('\n', start) + 1;
const nextHeading = changelog.indexOf('\n## ', contentStart);
const changes = changelog.slice(contentStart, nextHeading < 0 ? undefined : nextHeading).replace(/^\[[^\]]+\]:.*$/gm, '').trim();
const base = `https://github.com/CartemisAI/doggy-avatar-generator/releases/download/${tag}`;
const notes = `# Doggy Avatar Generator ${tag}

${changes}

## Installation

\`\`\`sh
npm install ${base}/${archive}
\`\`\`

Import from \`doggy-avatar-generator\` after installation. This is a standalone, programmatic package; generation needs no network connection or model.

## Assets

- \`${archive}\`: installable package with API, types, documentation, and license notices.
- \`doggy-avatar-generator.mjs\`: self-contained ESM module for browser or server use.
- \`doggy-avatar-generator.d.mts\`: declarations for the standalone module.
- \`SHA256SUMS\`: checksums for all three distribution files.

Source archives are available below from the version tag. See [README](https://github.com/CartemisAI/doggy-avatar-generator/tree/${tag}#readme) for usage and upstream attribution.
`;
await writeFile(join(release, 'RELEASE_NOTES.md'), notes);
console.log(`Prepared ${tag}: ${assets.length} distribution files, checksums, and release notes.`);
