# Doggy Avatar Generator

A standalone JavaScript and TypeScript package that generates deterministic SVG dog avatars from stable seeds or collection indices. It runs entirely offline, without AI models or third-party runtime dependencies.

Generate avatars through a synchronous, typed ESM API. Use the returned SVG strings in browsers, servers, workers, static assets, or any other SVG-capable environment.

## Quick start

```ts
import { createAvatar, toDataUri } from 'doggy-avatar-generator';

const svg = createAvatar('account-42', {
  breed: 'samoyed',
  size: 32,
  outfit: 'hoodie',
  headwear: 'beanie',
  garmentColor: 'sky',
  headwearColor: 'rose',
});

const src = toDataUri(svg);
// Use src as an image source with width=32 and height=32.
```

Use any stable string or number as the seed. Save the seed and selected options to reproduce a design.

### Size-aware composition

| Logical display size | Default composition |
| --- | --- |
| Exactly 24px or 32px | `bust`: large head with a small amount of shoulders and neckline |
| Every other size | `full`: normal half-body portrait |

The same seed and styling preserve the same dog across sizes. Pass the intended **CSS display size**, including on high-density screens: a 32px avatar still uses `size: 32`. Resizing an existing SVG with CSS does not rerun the composition rule.

Explicit overrides are available through `framing: 'bust' | 'full' | 'head'`. The default is `'auto'`. Head-only framing excludes clothing, headwear, and accessories. The artwork does not include hands or front paws.

## Fixed collection

```ts
import {
  createCollectionAvatar,
  getCollectionEntry,
  COLLECTION_COUNT,
} from 'doggy-avatar-generator';

const svg = createCollectionAvatar(981, { size: 24 });
const entry = getCollectionEntry(981); // id: "dog-00982"
console.log(COLLECTION_COUNT); // 76800
```

The collection contains 120 stylized breeds × 32 individuals × 20 looks. Indices range from `0` to `76799`; display IDs range from `dog-00001` to `dog-76800`. Persist the collection index to reproduce a selected look. Its base seed alone does not identify the look.

The library also includes 20 expressions, 26 coat palettes, 14 optional coat-pattern overrides, 12 poses, 5 ear states, 48 outfits, 40 headwear choices, 30 accessories, 30 independent colorways per styling layer, and 12 fabric patterns. Headwear and accessory counts include their `none` option.

Background colors do not contribute to the collection count. Different collection indices are not a guarantee that every portrait is perceptually distinct at small sizes. Some breed recipes share underlying structures.

## Public API

```ts
createAvatar(seed: string | number, options?: AvatarOptions): string
createCollectionAvatar(index: number, options?: CollectionAvatarOptions): string
getCollectionEntry(index: number): CollectionEntry
resolveFraming(size?: number, framing?: Framing): 'bust' | 'full' | 'head'
toDataUri(svg: string): string
```

The package also exports `VERSION`, `COLLECTION_COUNT`, `BREED_CATALOG`, and `STYLE_OPTIONS`. Catalogs expose supported breed and styling identifiers; TypeScript declarations include their literal unions. Invalid inputs throw explicit errors.

- [API reference](docs/API.md): parameters, return values, validation, and catalogs.
- [Usage and integration](docs/INTEGRATION.md): persistence, rendering, caching, and programmatic batch generation.
- [Development](docs/DEVELOPMENT.md): building, tests, packaging, and repository layout.

## Installation

Install the versioned package from [GitHub Releases](https://github.com/CartemisAI/doggy-avatar-generator/releases):

```sh
npm install https://github.com/CartemisAI/doggy-avatar-generator/releases/download/v1.0.0/doggy-avatar-generator-1.0.0.tgz
```

Or install directly from the version tag:

```sh
npm install github:CartemisAI/doggy-avatar-generator#v1.0.0
```

Import from `doggy-avatar-generator` after installation. Source consumers can import `./src/index.mjs`. Releases also provide a self-contained `doggy-avatar-generator.mjs` browser module and matching TypeScript declarations. Download and serve those files from your own static assets when using native browser imports.

The runtime is ESM-only and supports Node.js 20+ and modern browsers with native ESM and `TextEncoder`. It does not require a DOM, canvas, filesystem, network connection, or credentials. All generation is programmatic; there is no executable CLI or hosted service.

See [development and release instructions](docs/DEVELOPMENT.md) to build the package locally.

## Determinism and versioning

Package version: `1.0.0`. Artwork recipe version: `dog-studio-3`, exposed as `VERSION`.

The same package version, seed, and options produce the same SVG string. The generator uses UTF-8 seeds and explicit 32-bit integer operations; styling streams are separate from anatomy. Collection samples are computed lazily and cached per breed.

Save the package version alongside avatar specifications when long-term reproducibility matters. The library does not load older rendering versions automatically. SVG rasterization can differ between browsers and operating systems; identical SVG source does not imply pixel-identical screenshots.

## Attribution

This project is adapted from:

- [Animatar](https://github.com/luizvbo/animatar) by Luiz Otavio Vilas Boas Oliveira.
- [Animal Avatar Generator](https://github.com/roma-lukashik/animal-avatar-generator) by Roman Lukashik.

It extends these projects with deterministic dog-breed recipes, configurable expressions and outfits, size-aware composition, and a standalone JavaScript/TypeScript API. Their original copyright and MIT license notices are preserved in [LICENSES](LICENSES) and included in distribution archives.

## License

Apache-2.0. See [LICENSE](LICENSE) and [NOTICE](NOTICE). Upstream MIT notices are retained in [Animatar-MIT.txt](LICENSES/Animatar-MIT.txt) and [Animal-Avatar-Generator-MIT.txt](LICENSES/Animal-Avatar-Generator-MIT.txt). The package runs independently of the original Rust workspace and includes no model assets.
