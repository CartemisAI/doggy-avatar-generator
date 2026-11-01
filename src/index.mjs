import { VERSION, BREEDS, COAT_PALETTES, traits, random } from './model.mjs';
import { EXPRESSIONS, HEADWEAR, OUTFITS, personalStyle } from './style.mjs';
import { ACCESSORIES, POSES, EAR_STATES } from './wardrobe.mjs';
import { COLORWAYS, FABRICS } from './costumes.mjs';
import { COLLECTION_COUNT, collectionEntry } from './collection.mjs';
import { renderSVG } from './render.mjs';
import { resolveFraming } from './framing.mjs';

export { VERSION, COLLECTION_COUNT, resolveFraming };

const breedById = new Map(BREEDS.map(breed => [breed.id, breed]));
const freezeList = values => Object.freeze([...values]);

export const BREED_CATALOG = Object.freeze(BREEDS.map(breed => Object.freeze({
  id: breed.id,
  name: breed.name,
  nameZh: breed.nameZh,
  group: breed.group,
  description: breed.cues,
})));

export const STYLE_OPTIONS = Object.freeze({
  expression: freezeList(EXPRESSIONS),
  headwear: freezeList(HEADWEAR),
  outfit: freezeList(OUTFITS),
  accessory: freezeList(ACCESSORIES),
  pose: freezeList(POSES),
  ears: freezeList(EAR_STATES),
  coat: freezeList(Object.keys(COAT_PALETTES)),
  pattern: freezeList(['breed', 'solid', 'blaze', 'patch', 'eye-patch', 'mask', 'points', 'spots', 'merle', 'brindle', 'ticking', 'roan', 'husky', 'urajiro', 'bernese']),
  garmentColor: freezeList(Object.keys(COLORWAYS)),
  headwearColor: freezeList(Object.keys(COLORWAYS)),
  accessoryColor: freezeList(Object.keys(COLORWAYS)),
  fabric: freezeList(FABRICS),
});

const styleKeys = Object.keys(STYLE_OPTIONS);
const optionKeys = new Set(['breed', 'size', 'framing', 'background', 'prefix', ...styleKeys]);
const stylingKeys = styleKeys.filter(key => key !== 'coat' && key !== 'pattern');

function normalizeOptions(options, allowBreed) {
  if (!options || typeof options !== 'object' || Array.isArray(options)) {
    throw new TypeError('options must be an object');
  }
  for (const key of Object.keys(options)) {
    if (!optionKeys.has(key)) throw new TypeError(`Unknown avatar option: ${key}`);
  }
  const size = options.size ?? 256;
  const framing = resolveFraming(size, options.framing ?? 'auto');
  const result = { size, framing };
  if (options.breed !== undefined) {
    if (!allowBreed) throw new TypeError('Collection avatars have a fixed breed');
    if (!breedById.has(options.breed)) throw new RangeError(`Unknown breed: ${options.breed}`);
    result.breed = options.breed;
  }
  for (const key of styleKeys) {
    if (options[key] === undefined) continue;
    if (!STYLE_OPTIONS[key].includes(options[key])) {
      throw new RangeError(`Invalid ${key}: ${String(options[key])}`);
    }
    result[key] = options[key];
  }
  if (options.background !== undefined) {
    if (typeof options.background !== 'string' || !/^(?:transparent|#[\da-f]{3}|#[\da-f]{4}|#[\da-f]{6}|#[\da-f]{8})$/i.test(options.background)) {
      throw new TypeError('background must be transparent or a CSS hex color');
    }
    result.background = options.background;
  }
  if (options.prefix !== undefined) {
    if (typeof options.prefix !== 'string' || !/^[A-Za-z][A-Za-z0-9_-]{0,63}$/.test(options.prefix)) {
      throw new TypeError('prefix must begin with a letter and contain 1–64 letters, digits, _ or -');
    }
    result.prefix = options.prefix;
  }
  return result;
}

function normalizeSeed(seed) {
  if (typeof seed !== 'string' && (typeof seed !== 'number' || !Number.isFinite(seed))) {
    throw new TypeError('seed must be a string or a finite number');
  }
  const normalized = String(seed);
  if (normalized.length > 1024) throw new RangeError('seed must contain at most 1024 characters');
  return normalized;
}

function renderPrepared(dog, style, options) {
  // Styles have their own deterministic streams; changing clothes cannot change anatomy.
  const identity = JSON.stringify([VERSION, dog.id, dog.seed, style, options.framing, options.coat, options.pattern]);
  const next = random(`svg-namespace/${identity}`);
  const prefix = options.prefix ?? `dog_${Math.floor(next() * 4294967296).toString(36)}_${Math.floor(next() * 4294967296).toString(36)}`;
  return renderSVG(dog, { ...style, ...options, prefix, dressed: options.framing !== 'head' });
}

/** Create a deterministic SVG. Sizes 24 and 32 use bust framing by default. */
export function createAvatar(seed, options = {}) {
  const normalizedSeed = normalizeSeed(seed);
  const normalized = normalizeOptions(options, true);
  const breed = normalized.breed ? breedById.get(normalized.breed)
    : BREEDS[Math.floor(random(`${VERSION}/${normalizedSeed}/breed`)() * BREEDS.length)];
  const dog = traits(breed, normalizedSeed);
  const style = personalStyle(dog, Object.fromEntries(stylingKeys.map(key => [key, normalized[key]])));
  return renderPrepared(dog, style, normalized);
}

/** Render a stable, zero-based collection entry without materializing the collection. */
export function createCollectionAvatar(index, options = {}) {
  const normalized = normalizeOptions(options, false);
  const entry = collectionEntry(index);
  const changes = Object.fromEntries(stylingKeys.filter(key => normalized[key] !== undefined).map(key => [key, normalized[key]]));
  const style = personalStyle(entry.dog, { ...entry.style, ...changes });
  return renderPrepared(entry.dog, style, normalized);
}

/** Return independent metadata; callers cannot mutate the cached anatomy pool. */
export function getCollectionEntry(index) {
  const entry = collectionEntry(index);
  return {
    id: entry.id,
    index: entry.index,
    version: entry.version,
    breed: entry.dog.id,
    seed: entry.dog.seed,
    individual: entry.individual,
    look: entry.look,
    coat: entry.dog.palette,
    pattern: entry.dog.pattern,
    style: Object.fromEntries(stylingKeys.map(key => [key, entry.style[key]])),
  };
}

/** Encode SVG for an img src. Does not require a DOM, canvas or Node APIs. */
export function toDataUri(svg) {
  if (typeof svg !== 'string') throw new TypeError('svg must be a string');
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
