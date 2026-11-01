# Usage and integration

The package returns SVG strings. Consumers control storage, presentation, caching, and any customization interface.

## Store the avatar specification

For seed-based avatars, store a stable seed and optional customization. Store the deployed package version when users must retain exact artwork across generator upgrades.

```ts
import { VERSION, createAvatar, toDataUri, type AvatarOptions } from 'doggy-avatar-generator';

type StoredAvatar = {
  kind: 'seed';
  packageVersion: string;
  recipeVersion: string;
  seed: string;
  options: Omit<AvatarOptions, 'size' | 'prefix'>;
};

const avatar: StoredAvatar = {
  kind: 'seed',
  packageVersion: '1.0.0',
  recipeVersion: VERSION,
  seed: 'account-42',
  options: { breed: 'golden', outfit: 'hoodie', garmentColor: 'sky' },
};

function avatarSource(specification: StoredAvatar, size: number): string {
  if (specification.packageVersion !== '1.0.0' || specification.recipeVersion !== VERSION) {
    throw new Error('Avatar specification needs a compatible generator version');
  }
  return toDataUri(createAvatar(specification.seed, { ...specification.options, size }));
}

const sidebarSrc = avatarSource(avatar, 24);
const memberListSrc = avatarSource(avatar, 32);
const profileSrc = avatarSource(avatar, 128);
```

The version fields belong to the stored record; they are not renderer options. The consumer chooses how to retain or migrate older records. The renderer does not switch implementations based on those fields.

For collection avatars, store `index` and any overrides. The entry's anatomy seed alone does not identify the complete look:

```ts
import { createCollectionAvatar, type CollectionAvatarOptions } from 'doggy-avatar-generator';

const selected = {
  index: 981,
  options: { accessory: 'round-glasses' } satisfies CollectionAvatarOptions,
};

const svg = createCollectionAvatar(selected.index, { ...selected.options, size: 32 });
```

## Render at the actual display size

- Sidebar and compact member lists at 24/32px use the large-head composition.
- Other sizes use the normal half-body composition.
- A 2× or 3× screen still receives the CSS display size, because the output is vector artwork.

Changing an image element's CSS dimensions alone does not change composition. Regenerate when the display size changes. A framework component can memoize generation using the seed or index, options, and size as dependencies.

Set accessible alternative text in the consumer. Decorative avatars beside an already-visible user name can use your project's decorative-image treatment.

## SVG delivery

`toDataUri()` works with an image element when your project's content-security policy permits `data:` images. Alternatively, serve the SVG string from your project's own asset layer with `Content-Type: image/svg+xml`, or create a browser Blob URL and revoke it when no longer needed.

Server-side generation uses the same API and needs no DOM. When inserting multiple SVGs directly into a shared document, pass a unique, stable `prefix` per component instance so clip-path IDs are namespaced. Use the same prefix on server and client for matching markup.

## Cache by rendering inputs

Include the deployed package version, seed or collection index, display size, framing, and all rendering overrides in the cache key. Include `prefix` if explicitly supplied, since it changes SVG source. Normalize option-key ordering before serializing a cache key.

The library caches collection anatomy per breed, up to the fixed 120-breed catalog. It does not retain every generated SVG. Consumers can use a bounded memory or asset cache for frequently displayed avatars.

## Generate multiple avatars programmatically

Use the API inside ordinary iteration. The generator returns one SVG at a time and does not need to materialize the full collection.

```ts
import { createCollectionAvatar, getCollectionEntry } from 'doggy-avatar-generator';

async function generateSelection(
  indices: Iterable<number>,
  save: (key: string, svg: string) => Promise<void>,
) {
  for (const index of indices) {
    const { id } = getCollectionEntry(index);
    for (const size of [24, 32, 128]) {
      await save(`${id}/${size}.svg`, createCollectionAvatar(index, { size }));
    }
  }
}
```

The `save` callback is owned by the consumer and can write to its filesystem, database, or asset store. Generation itself performs no I/O.

## Customization data

Use `BREED_CATALOG` and `STYLE_OPTIONS` to populate your project's own controls or validate stored selections against the installed version. English and Chinese breed names are catalog data, not a bundled UI.

Stable collection IDs describe deterministic designs rather than perceptual uniqueness. Similar anatomy and styling can look alike at small sizes. Treat the collection as selectable designs, not unique user identifiers.
