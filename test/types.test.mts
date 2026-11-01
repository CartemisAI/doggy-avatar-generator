import {
  createAvatar, createCollectionAvatar, getCollectionEntry, toDataUri,
  resolveFraming, BREED_CATALOG, STYLE_OPTIONS,
  type AvatarOptions, type CollectionAvatarOptions, type BreedId,
} from 'doggy-avatar-generator';

const options: AvatarOptions = { breed: 'samoyed', size: 32, outfit: 'hoodie', headwear: 'beanie', garmentColor: 'sky' };
const svg: string = createAvatar('typed-seed', options);
const uri: string = toDataUri(svg);
const overrides: CollectionAvatarOptions = { expression: 'joy', size: 24 };
const collectionSvg: string = createCollectionAvatar(981, overrides);
const breed: BreedId = getCollectionEntry(981).breed;
const framing: 'bust' | 'full' | 'head' = resolveFraming(32);
const catalogBreed: BreedId = BREED_CATALOG[0].id;
const outfit: NonNullable<AvatarOptions['outfit']> = STYLE_OPTIONS.outfit[0];
void [uri, collectionSvg, breed, framing, catalogBreed, outfit];

// @ts-expect-error Unknown breed IDs are rejected by the public type contract.
createAvatar('typed-seed', { breed: 'unknown-dog' });
// @ts-expect-error Collection entries have a fixed breed.
createCollectionAvatar(981, { breed: 'golden' });
// @ts-expect-error A display size must be numeric.
createAvatar('typed-seed', { size: '32' });
// @ts-expect-error Public catalog entries are immutable.
BREED_CATALOG[0].id = 'golden';
