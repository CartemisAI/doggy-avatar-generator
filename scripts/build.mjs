import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { BREED_CATALOG, STYLE_OPTIONS } from '../src/index.mjs';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const output = join(root, 'output');
await mkdir(output, { recursive: true });
await mkdir(join(root, 'release'), { recursive: true });

const modules = ['breeds-more', 'breeds-extra', 'model', 'costumes', 'wardrobe', 'style', 'framing', 'render', 'collection'];
const stripModuleSyntax = source => source
  .replace(/^import .*;\r?\n/gm, '')
  .replace(/^export \{[^}]+\};?\r?\n/gm, '')
  .replace(/^export (?=(?:const|function|async function|class)\b)/gm, '');
const sources = await Promise.all(modules.map(name => readFile(join(root, 'src', name + '.mjs'), 'utf8')));
const bundledArt = sources.map(stripModuleSyntax).join('\n');
const apiSource = await readFile(join(root, 'src/index.mjs'), 'utf8');
const exports = ['VERSION', 'COLLECTION_COUNT', 'BREED_CATALOG', 'STYLE_OPTIONS', 'createAvatar', 'createCollectionAvatar', 'getCollectionEntry', 'resolveFraming', 'toDataUri'];
await writeFile(join(output, 'doggy-avatar-generator.mjs'), `${bundledArt}\n${stripModuleSyntax(apiSource)}\nexport { ${exports.join(', ')} };\n`);

const union = values => values.map(value => JSON.stringify(value)).join(' | ');
const typeName = key => key[0].toUpperCase() + key.slice(1);
const typeAliases = Object.entries(STYLE_OPTIONS).map(([key, values]) => `export type ${typeName(key)} = ${union(values)};`).join('\n');
const styleProperties = Object.keys(STYLE_OPTIONS).map(key => `  ${key}?: ${typeName(key)};`).join('\n');
const stylingKeys = Object.keys(STYLE_OPTIONS).filter(key => key !== 'coat' && key !== 'pattern');
const declarations = `// Generated from the runtime catalogs by scripts/build.mjs.
export type BreedId = ${union(BREED_CATALOG.map(breed => breed.id))};
export type Framing = 'auto' | 'bust' | 'full' | 'head';
export type ResolvedFraming = Exclude<Framing, 'auto'>;
${typeAliases}
export interface AvatarOptions {
  breed?: BreedId;
  /** Logical display size. Exactly 24 and 32 default to bust framing. */
  size?: number;
  framing?: Framing;
  /** Transparent by default; accepts CSS hex colors or 'transparent'. */
  background?: string;
  /** Namespace for clip IDs when embedding multiple inline SVGs. */
  prefix?: string;
${styleProperties}
}
export type CollectionAvatarOptions = Omit<AvatarOptions, 'breed'>;
export interface BreedInfo { readonly id: BreedId; readonly name: string; readonly nameZh: string; readonly group: string; readonly description: string; }
export type CollectionStyle = Required<Pick<AvatarOptions, ${union(stylingKeys)}>>;
export interface CollectionEntry {
  id: string; index: number; version: string; breed: BreedId; seed: string;
  individual: number; look: number; coat: Coat; pattern: string; style: CollectionStyle;
}
export declare const VERSION: string;
export declare const COLLECTION_COUNT: number;
export declare const BREED_CATALOG: readonly BreedInfo[];
export declare const STYLE_OPTIONS: Readonly<{
${Object.keys(STYLE_OPTIONS).map(key => `  ${key}: readonly ${typeName(key)}[];`).join('\n')}
}>;
export declare function createAvatar(seed: string | number, options?: AvatarOptions): string;
export declare function createCollectionAvatar(index: number, options?: CollectionAvatarOptions): string;
export declare function getCollectionEntry(index: number): CollectionEntry;
export declare function resolveFraming(size?: number, framing?: Framing): ResolvedFraming;
export declare function toDataUri(svg: string): string;
`;
await writeFile(join(root, 'src/index.d.ts'), declarations);

console.log(`Built the ESM module and TypeScript declarations (${BREED_CATALOG.length} breeds).`);
