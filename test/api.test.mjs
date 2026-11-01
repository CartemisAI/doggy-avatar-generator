import test from 'node:test';
import assert from 'node:assert/strict';
import { createAvatar, createCollectionAvatar, getCollectionEntry, resolveFraming, toDataUri, BREED_CATALOG, STYLE_OPTIONS, COLLECTION_COUNT } from 'doggy-avatar-generator';

function metadata(svg) {
  const escaped = svg.match(/<metadata>(.*?)<\/metadata>/s)[1];
  const text = escaped.replace(/&(quot|apos|lt|gt|amp);/g, (_, name) => ({ quot: '"', apos: "'", lt: '<', gt: '>', amp: '&' })[name]);
  return JSON.parse(text);
}

test('24/32 use bust, every other supported display size uses full', () => {
  for (const size of [16, 24, 28, 32, 40, 48, 64, 128, 256, 4096]) {
    const expected = size === 24 || size === 32 ? 'bust' : 'full';
    assert.equal(resolveFraming(size), expected);
    const svg = createAvatar('size-rule', { size, breed: 'golden' });
    assert.equal(metadata(svg).framing, expected);
    assert.ok(svg.includes(`width="${size}" height="${size}"`));
  }
  assert.equal(metadata(createAvatar('override', { size: 24, framing: 'full' })).framing, 'full');
  assert.equal(metadata(createAvatar('override', { size: 128, framing: 'head' })).framing, 'head');
});

test('Unicode seeds and option order produce repeatable bytes', () => {
  const a = createAvatar('小狗🐕', { size: 32, breed: 'samoyed', outfit: 'hoodie' });
  const b = createAvatar('小狗🐕', { outfit: 'hoodie', breed: 'samoyed', size: 32 });
  assert.equal(a, b);
  assert.equal(createAvatar(42), createAvatar('42'));
  assert.notEqual(a, createAvatar('另一只🐕', { size: 32, breed: 'samoyed', outfit: 'hoodie' }));
});

test('styling does not change breed, seed or the head outline', () => {
  const a = createAvatar('same-dog', { breed: 'shetland-sheepdog', outfit: 'hoodie', garmentColor: 'sky' });
  const b = createAvatar('same-dog', { breed: 'shetland-sheepdog', outfit: 'raincoat', garmentColor: 'ruby' });
  assert.equal(metadata(a).seed, metadata(b).seed);
  assert.equal(metadata(a).breed, metadata(b).breed);
  assert.equal(a.match(/<clipPath[^>]+><path d="([^"]+)"/)[1], b.match(/<clipPath[^>]+><path d="([^"]+)"/)[1]);
  assert.notEqual(a, b);
});

test('collection IDs, breed boundaries and returned metadata are stable', () => {
  assert.equal(COLLECTION_COUNT, 76800);
  assert.equal(BREED_CATALOG.length, 120);
  assert.equal(new Set(BREED_CATALOG.map(breed => breed.id)).size, 120);
  assert.ok(['samoyed', 'golden', 'shetland-sheepdog'].every(id => BREED_CATALOG.some(breed => breed.id === id)));
  assert.equal(getCollectionEntry(0).id, 'dog-00001');
  assert.equal(getCollectionEntry(76799).id, 'dog-76800');
  assert.notEqual(getCollectionEntry(639).breed, getCollectionEntry(640).breed);
  assert.equal(getCollectionEntry(0).seed, getCollectionEntry(19).seed);
  const before = createCollectionAvatar(981, { size: 24 });
  const entry = getCollectionEntry(981);
  entry.style.outfit = 'wizard';
  entry.seed = 'changed';
  assert.equal(createCollectionAvatar(981, { size: 24 }), before);
  assert.equal(metadata(before).framing, 'bust');
});

test('public catalogs cannot be changed and rejected options fail clearly', () => {
  assert.throws(() => BREED_CATALOG.push({}), TypeError);
  assert.throws(() => { BREED_CATALOG[0].id = 'fake'; }, TypeError);
  assert.throws(() => STYLE_OPTIONS.outfit.push('fake'), TypeError);
  for (const size of [0, -1, 32.5, NaN, Infinity, '32', 4097]) assert.throws(() => createAvatar('x', { size }), RangeError);
  for (const options of [{ breed: 'missing' }, { outfit: 'missing' }, { framing: 'missing' }]) assert.throws(() => createAvatar('x', options), RangeError);
  assert.throws(() => createAvatar({}, {}), TypeError);
  assert.throws(() => createAvatar('x', null), TypeError);
  assert.throws(() => createAvatar('x', { colour: 'red' }), TypeError);
  assert.throws(() => createCollectionAvatar(1, { breed: 'golden' }), TypeError);
  for (const index of [-1, 76800, 1.5, NaN]) assert.throws(() => createCollectionAvatar(index), RangeError);
});

test('SVG text is escaped and external paint sources are rejected', () => {
  const svg = createAvatar('\"><script>alert(1)</script>&🐕', { breed: 'golden', prefix: 'profile-card', background: '#abc' });
  assert.doesNotMatch(svg, /<script>|NaN|Infinity|undefined/);
  assert.match(svg, /id="c_profile-card"/);
  assert.throws(() => createAvatar('x', { background: 'url(https://example.com/x)' }), TypeError);
  assert.throws(() => createAvatar('x', { prefix: '" onload="x' }), TypeError);
  assert.equal(decodeURIComponent(toDataUri(svg).split(',')[1]), svg);
});
