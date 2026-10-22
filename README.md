# pas2-file-utils

Read JSON and replace files atomically on the same filesystem.

Part of **Pas2 Kit** by [1Pas2](https://github.com/1Pas2): small independent TypeScript libraries with no runtime dependencies.

## Features

- Focused API with strict TypeScript declarations.
- ESM package for Node.js 22 and later.
- Automated behavioral tests and CI on Node.js 22 and 24.

## Installation

This package is prepared for npm but is **not published to npm**. Install from a local checkout:

```sh
git clone https://github.com/1Pas2/pas2-file-utils.git
cd pas2-file-utils
npm ci
npm run build
npm pack
```

Install the resulting `.tgz` in your application using `npm install /path/to/package.tgz`.
The intended npm name is `@1pas2/file-utils`; registry availability is not claimed.

## Usage

```ts
import { writeJsonAtomic, readJson } from '@1pas2/file-utils';
await writeJsonAtomic('./settings.json', {theme:'dark'});
console.log(await readJson('./settings.json'));
```

The checked-in example imports the local build. After building, run it with `node --experimental-strip-types examples/basic.ts` on a compatible Node.js release. Network and filesystem examples perform the operations shown.

## API and behavior

readJson<T>(path) parses UTF-8 JSON; T does not validate. writeFileAtomic(path,data) writes a unique sibling temporary file then renames it. writeJsonAtomic pretty-prints JSON. Parent directory must exist. Atomic visibility depends on filesystem rename semantics; no fsync durability guarantee, permission preservation or cross-process locking. New files use mode 0600 where supported.

The complete public types are in [src/index.ts](src/index.ts) and generated in `dist/index.d.ts`.

## Development

```sh
npm ci
npm test
npm run check:examples
npm pack --dry-run
```

Tests use the built-in Node.js test runner against the compiled public API. Runtime dependencies: none. Development dependencies: TypeScript and Node.js type declarations. This initial release has a deliberately small scope; review its documented limits before production use.

## Ecosystem

Browse the [Pas2 Kit project index](https://github.com/1Pas2?tab=repositories&q=pas2-). Each repository builds and runs independently.

## Contributing

Open an issue describing a reproducible problem or submit a focused pull request with a behavioral test. Run the development commands above before submitting. Never include credentials or private information in reports.

## License

[MIT](LICENSE) © 2026 1Pas2.

1Pas2
