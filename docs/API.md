# API reference

Import runtime functions, constants, and types from the package root:

```ts
import {
  createAvatar,
  createCollectionAvatar,
  getCollectionEntry,
  resolveFraming,
  toDataUri,
  VERSION,
  COLLECTION_COUNT,
  BREED_CATALOG,
  STYLE_OPTIONS,
  type AvatarOptions,
  type CollectionAvatarOptions,
  type CollectionEntry,
  type BreedId,
} from 'doggy-avatar-generator';
```

Internal drawing modules are implementation details. Consumers should use the package-root exports.

## `createAvatar(seed, options?)`

Returns a complete SVG string synchronously. Accepts a string of up to 1,024 UTF-16 code units or a finite number. Numbers are converted to strings, so `42` and `'42'` produce the same avatar. The empty string is also valid.

If `breed` is omitted, the seed selects a breed deterministically. Unspecified styling values use independent deterministic streams. Changing clothing does not resample the dog's anatomy.

```ts
const svg = createAvatar('account-42', {
  breed: 'shetland-sheepdog',
  size: 128,
  expression: 'joy',
  outfit: 'raincoat',
  headwear: 'none',
  garmentColor: 'honey',
});
```

## `createCollectionAvatar(index, options?)`

Returns an SVG string for a fixed collection entry. `index` must be an integer in `0..76799`.

Options are the same as `AvatarOptions`, except `breed` is not allowed: each entry has a fixed breed. Unspecified styling comes from the entry's original look. Overrides do not mutate the collection.

```ts
const svg = createCollectionAvatar(981, { size: 32, accessory: 'round-glasses' });
```

## Rendering options

| Option | Accepted values | Default |
| --- | --- | --- |
| `breed` | `BreedId`, listed in `BREED_CATALOG` | Selected by seed; unavailable for collection rendering |
| `size` | Integer from 1 to 4096 | `256` |
| `framing` | `'auto'`, `'bust'`, `'full'`, `'head'` | `'auto'` |
| `expression` | `STYLE_OPTIONS.expression` | Seeded or collection look |
| `pose` | `STYLE_OPTIONS.pose` | Seeded or collection look |
| `ears` | `STYLE_OPTIONS.ears` | Seeded or collection look |
| `coat` | `STYLE_OPTIONS.coat` | Original breed-specific palette |
| `pattern` | `STYLE_OPTIONS.pattern` | Original breed pattern; `'breed'` explicitly preserves it |
| `outfit` | `STYLE_OPTIONS.outfit` | Seeded or collection look |
| `headwear` | `STYLE_OPTIONS.headwear` | Seeded or collection look |
| `accessory` | `STYLE_OPTIONS.accessory` | Seeded or collection look |
| `garmentColor` | `STYLE_OPTIONS.garmentColor` | Seeded or collection look |
| `headwearColor` | `STYLE_OPTIONS.headwearColor` | Seeded or collection look |
| `accessoryColor` | `STYLE_OPTIONS.accessoryColor` | Seeded or collection look |
| `fabric` | `STYLE_OPTIONS.fabric` | Seeded or collection look |
| `background` | `'transparent'` or a 3-, 4-, 6-, or 8-digit CSS hex color | Transparent |
| `prefix` | 1–64 ASCII letters, digits, `_`, or `-`, beginning with a letter | Deterministically generated SVG namespace |

Size controls the SVG's width and height; its viewBox remains `0 0 256 256`. Automatic framing selects `bust` for exactly 24 and 32, and `full` for every other valid size, including 28.

`head` shows the base head with the selected expression and coat, using upright posture and natural ears. It omits clothing, headwear, and accessories. `bust` and `full` preserve styling and pose selections.

Transparent output is intended to sit on the surrounding surface. A background rectangle is only added when `background` is provided.

## `getCollectionEntry(index)`

Returns an independent metadata object:

```ts
interface CollectionEntry {
  id: string;         // e.g. "dog-00982"
  index: number;      // zero-based collection index
  version: string;    // artwork recipe version
  breed: BreedId;
  seed: string;       // anatomy seed, not the complete collection look
  individual: number; // 1–32 within the breed
  look: number;       // 1–20 within the individual
  coat: Coat;
  pattern: string;
  style: CollectionStyle;
}
```

`style` includes expression, pose, ears, outfit, headwear, accessory, garment color, headwear color, accessory color, and fabric. Its values describe the original look. Render-time overrides are not written back to this metadata.

Every consecutive 20 entries share one base dog; every consecutive 640 entries share one breed. Changes to a returned object do not affect subsequent calls.

## `resolveFraming(size?, framing?)`

Returns the resolved `'bust'`, `'full'`, or `'head'` composition using the renderer's size rule. Defaults to `size: 256` and `framing: 'auto'`.

```ts
resolveFraming(24);         // 'bust'
resolveFraming(32);         // 'bust'
resolveFraming(48);         // 'full'
resolveFraming(24, 'full'); // 'full'
```

## `toDataUri(svg)`

Returns a percent-encoded `data:image/svg+xml;charset=utf-8,...` string suitable for an image source. Accepts a string and does not access the DOM or filesystem. It is an encoder, not an SVG sanitizer; use it with generator output.

## Catalogs, constants, and types

- `VERSION`: the artwork recipe version, currently `'dog-studio-3'`.
- `COLLECTION_COUNT`: `76800`.
- `BREED_CATALOG`: an immutable array of immutable `{ id, name, nameZh, group, description }` records. `name` is English; `nameZh` contains Chinese localization data for consumers that need it.
- `STYLE_OPTIONS`: an immutable object containing immutable arrays of supported option identifiers.

The declarations export `BreedId`, `AvatarOptions`, `CollectionAvatarOptions`, `CollectionEntry`, `CollectionStyle`, `Framing`, `ResolvedFraming`, `BreedInfo`, and literal-union types for each styling option.

## Errors

Invalid values throw synchronously. Use caller-side error handling for stored or user-provided data.

- `RangeError`: invalid sizes, unsupported styling identifiers, unknown breed IDs, invalid framing, out-of-range indices, or excessively long seeds.
- `TypeError`: unsupported seed types, non-object options, unknown option keys, invalid backgrounds or prefixes, or a breed override on a collection entry.

No error handling, storage writes, navigation, or UI notifications occur inside the library.
