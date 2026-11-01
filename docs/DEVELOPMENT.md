# Development and releases

## Scope

Doggy Avatar Generator is a standalone, programmatic SVG package. The public API is exported from `src/index.mjs`, with declarations in `src/index.d.ts`. It has no executable generator, web UI, or HTTP endpoint.

## Requirements

Use Node.js 20+ and npm. The renderer has no third-party runtime dependencies. TypeScript is a pinned development dependency used to check declarations. Browser use requires native ESM and `TextEncoder`.

```sh
npm ci --ignore-scripts
npm run build
npm test
```

`npm run build` writes a self-contained `output/doggy-avatar-generator.mjs` module and regenerates the TypeScript declarations from the supported catalogs. The source module is directly importable without a build.

`npm test` runs focused API tests and checks the public TypeScript declarations. It does not render the entire collection or perform a perceptual-uniqueness audit.

## Local release artifacts

```sh
npm run release
```

This command creates the following files under `release/`:

- `doggy-avatar-generator-VERSION.tgz`: installable npm-format package.
- `doggy-avatar-generator.mjs`: standalone ESM module.
- `doggy-avatar-generator.d.mts`: matching TypeScript declarations.
- `SHA256SUMS`: SHA-256 checksums for the three distribution files.

It also writes the release notes used by the publishing workflow. The local command does not publish or push anything. GitHub automatically provides source archives for the release tag.

## Publish a GitHub Release

1. Update `package.json` and `package-lock.json` to the new version.
2. Add its dated changes to `CHANGELOG.md` and update version-pinned installation examples.
3. Build, test, and commit the release changes on `main`; wait for CI to pass.
4. Create an annotated version tag matching `package.json` and push it:

```sh
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

The tag workflow checks the version, builds and tests the package, prepares its assets and checksums, and publishes a GitHub Release. Package versions are stable three-part versions such as `1.0.0`; the workflow rejects mismatched tags. Use a new version for changes after publication instead of moving a published tag or replacing existing assets.

Distribution currently uses GitHub Releases. npm-registry publication is a separate operation and is not performed by these scripts or workflows.

## Repository layout

```text
src/                 Public API, declarations, breed data, vector rendering
docs/                API, usage, and contributor documentation
scripts/             Build and release maintenance scripts
test/                Focused API tests
LICENSES/            Original upstream license texts
.github/workflows/   CI and tagged-release workflows
output/              Generated ESM module; ignored by Git
release/             Local distribution artifacts; ignored by Git
```

## Compatibility and versioning

CI runs build, tests, and packing on Node.js 20, 22, and 24. Tagged releases build on Node.js 24. These workflows run against the committed source, with GitHub Actions pinned to specific revisions.

`package.json` tracks the package version. `VERSION` tracks the artwork recipe namespace used by seeded generation. When changing generated artwork, update the appropriate version and document its compatibility implications. Avoid reordering the breed catalog or collection layout: consumers may persist collection indices.

Keep styling streams independent of anatomy. Preserve the exact size rule: automatic framing uses `bust` only at 24 and 32, and `full` at every other supported size.

Documentation, comments, errors, and contributor output are English. Localized breed names and Unicode test seeds are intentionally retained as data.

## Attribution

This project is adapted from [Animatar](https://github.com/luizvbo/animatar) and [Animal Avatar Generator](https://github.com/roma-lukashik/animal-avatar-generator). Preserve `LICENSE`, `NOTICE`, and the complete `LICENSES/` directory in distributions.
