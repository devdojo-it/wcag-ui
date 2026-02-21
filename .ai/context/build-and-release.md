# Build and Release — wcag-ui

## Package Build

### esbuild (Individual Packages)

Each package defines two build scripts:

```bash
# JavaScript: ESM bundle with external dependencies not included
esbuild --bundle --packages=external --format=esm \
  ./lib/<name>.js --outfile=./<name>.min.js

# CSS: bundle with minification
esbuild --bundle --minify \
  ./lib/styles/<name>.css --outfile=./<name>.min.css
```

Key flags:
- `--packages=external`: dependencies (`@wcag-ui/core`, `@wcag-ui/dom`) are not included in the bundle
- `--format=esm`: output as ES Module
- `--bundle`: resolves all local imports
- `--minify`: CSS only

### Global Build

```bash
# Build all packages in parallel
pnpm build:packages    # → pnpm -r -parallel run build

# Watch mode
pnpm watch:css         # → pnpm -r --parallel watch:css
pnpm watch:js          # → pnpm -r --parallel watch:js
```

### Build Order

Packages are built in weight order:
1. **CSS** (foundations, grid, typography, iconography) — weight 0
2. **JS** (core, dom) — weight 1
3. **Components** — weight 2

This order is managed by `sortPackageJsonByWeights()` in `_package-utils.mjs`.

## Docs Site (Parcel)

```bash
# Dev server with hot reload
pnpm start      # pre: clear cache + build packages → parcel ./src/index.html

# Production build
pnpm build       # pre: clear cache + build packages → parcel build --no-source-maps --public-url ./
```

Parcel handles:
- PostHTML (extends, include, markdown)
- `npm:` resolution in CSS (`@import "npm:@wcag-ui/foundations"`)
- Bare specifier resolution in JS (`import '@wcag-ui/accordion'`)
- Asset handling (fonts, images)

## Release Workflow (`scripts/release.mjs`)

### Full Flow

```
1. Collect all package.json paths from packages/
2. Get local package names
3. Determine last git tag (semver) or first commit
4. Collect commit messages since last tag
5. Detect bump type from commits:
   - BREAKING CHANGE → major
   - feat(...) → minor
   - everything else → patch
6. Calculate next version
7. Sort packages by weight: css → js → components
8. For each package:
   a. Update version in package.json
   b. Set local deps to ^<version> (exact caret)
   c. Run build if script exists
9. Update root package.json (version + local deps)
10. Run root build
11. Publish each package (npm publish --access public)
12. Generate changelog
13. git add . && git commit "chore(release): vX.Y.Z"
14. git push && git tag vX.Y.Z && git push --tags
15. Reset all deps to workspace:^<version>
16. git add . && git commit --amend --no-edit && git push -f
```

### Commit-based version bump

| Commit pattern | Bump |
|--------------------|------|
| `BREAKING CHANGE` in message | **major** |
| `feat(...)` as type | **minor** |
| Everything else | **patch** |

### Dependency Resolution During Release

```
          Development                   Publishing
workspace:^0.1.0-alpha.0   →   ^0.2.0   →   workspace:^0.2.0
```

1. **Pre-publish**: workspace dependencies are converted to exact caret ranges (`^x.y.z`)
2. **Publish**: npm publishes with real ranges
3. **Post-publish**: dependencies revert to `workspace:^x.y.z`
4. The commit is amended to include the reset

## Utility Scripts

### `_package-utils.mjs`

| Function | Purpose |
|----------|-------|
| `normalizeWorkspaceRange(range, version)` | Normalize any `workspace:` range to `workspace:^<version>` |
| `updatePackageVersionAndWorkspaceDeps(path, version)` | Update version + align workspace deps |
| `updatePackageForRelease(path, version, localPkgs)` | Prepare package for publish (exact ranges) |
| `addWorkspaceDependency(pkgPath, depName, version)` | Add sorted workspace dependency |
| `updateRootPackageForRelease(path, version, pkgs, build)` | Update root package + optional build |
| `resetToWorkspaceRanges(path, version, localPkgs)` | Reset deps to `workspace:^` post-publish |
| `buildPackageIfNeeded(path)` | Run build if package has the script |
| `collectPackageJson(dir)` | Collect all `package.json` recursively |
| `sortPackageJsonByWeights(paths)` | Sort by type (css:0, js:1, components:2) |

### `_fs-utils.mjs`

| Function | Purpose |
|----------|-------|
| `ensureDir(path)` | Create directory if it doesn't exist |
| `cpRecursive(src, dest)` | Recursive copy |
| `walk(dir)` | AsyncGenerator that yields file paths |
| `replaceInFile(file, replacements)` | Global replacement in file |
| `renamePlaceholdersInFilenames(dir, placeholders)` | Rename files with placeholders |
| `readJson(path)` / `writeJson(path, obj)` | JSON read/write |
| `sortObjectKeys(obj)` | Sort object keys alphabetically |
| `appendLineIfMissing(path, line)` | Append line if not present |

### `_docs-utils.mjs`

| Function | Purpose |
|----------|-------|
| `addComponentToDocsMD(kebab, pascal)` | Add section to `docs/COMPONENTS.md` |
| `addComponentToDocsNav(kebab, pascal)` | Add link to `src/common/docs-nav.html` |
| `createComponentDocsFolder(kebab, pascal)` | Create `docs/<PascalCase>/<PascalCase>.md` |

### `_cli-utils.mjs`

| Function | Purpose |
|----------|-------|
| `parseArgs(argv)` | Parse `--key=value` and `--flag` from CLI |

### `_template-utils.mjs`

| Function | Purpose |
|----------|-------|
| `writeHtmlFileWithPrettier(path, html)` | Write HTML formatted with Prettier |

## Publishing

- Registry: npm public (default)
- Per-package script: `npm publish --access public`
- Publishing is orchestrated by the release script in order (css → js → components)
- Packages expose: `lib/`, `<name>.min.js`, `<name>.min.css`, `package.json`, `README.md`
