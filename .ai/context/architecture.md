# Project Architecture — wcag-ui

## Overview

wcag-ui is a monorepo design system producing accessible web components using **Customized Built-in Elements** and modular CSS foundations. No JavaScript frameworks.

## Monorepo Structure

```
wcag-ui/
├── packages/
│   ├── css/                           ← Foundation CSS packages
│   │   ├── foundations/               ← Reset, colors, spacing, radius, elevations, focus
│   │   ├── grid-system/              ← 12-column responsive grid system
│   │   ├── typography/               ← Font, type scale
│   │   └── iconography/              ← Icon font (wcag-icons)
│   ├── js/                            ← Runtime JS packages
│   │   ├── core/                     ← Decorator, helpers, events, encoding
│   │   └── dom/                      ← Safe and sanitized DOM manipulation
│   └── components/                    ← UI Components
│       ├── accordion/
│       ├── button/
│       ├── checkbox/
│       ├── details/
│       ├── dialog/
│       ├── input/
│       ├── radio/
│       ├── scroll-spy/
│       ├── select/
│       ├── switch/
│       ├── textarea/
│       ├── tooltip/
│       └── tree-view/
├── scripts/                           ← CLI and automation
│   ├── component-add.mjs            ← Scaffold new component
│   ├── release.mjs                   ← Release workflow
│   ├── unpublish.mjs                ← Unpublish packages
│   ├── _cli-utils.mjs               ← CLI argument parsing
│   ├── _docs-utils.mjs              ← Documentation updates
│   ├── _fs-utils.mjs                ← Filesystem operations
│   ├── _package-utils.mjs           ← package.json and version management
│   ├── _template-utils.mjs          ← HTML formatting with Prettier
│   └── templates/component/         ← New component template
├── src/                               ← Docs site (Parcel)
│   ├── _layout.html                  ← PostHTML base layout
│   ├── index.html                    ← Homepage
│   ├── components-*.html             ← Component demo pages
│   ├── common/                       ← Header, footer, nav, breadcrumbs
│   ├── scripts/index.js             ← JS entry point docs
│   └── styles/index.css             ← CSS entry point docs
├── docs/                              ← Markdown documentation
│   ├── COMPONENTS.md                 ← Components index
│   ├── <PascalCase>/                 ← Per-component docs
│   └── ...                           ← Other doc pages
└── .ai/                               ← LLM instructions (this folder)
```

## Dependency Flow

```
                   @wcag-ui/core
                        │
             ┌──────────┼──────────┐
             │          │          │
        @wcag-ui/dom    │    (encoding, helpers, events)
             │          │
             └────┬─────┘
                  │
         ┌───────┴──────────────────┐
         │  @wcag-ui/<component>    │  ← depends only on core + dom
         └──────────────────────────┘

   CSS Foundations (no JS dependency):
   @wcag-ui/foundations
   @wcag-ui/typography
   @wcag-ui/grid-system
   @wcag-ui/iconography
```

## Package Manager

- **pnpm** with workspace (`pnpm-workspace.yaml`)
- Internal dependencies: `workspace:^<version>`
- Volta for Node.js and pnpm pinning

## Build Pipeline

### Individual Packages (esbuild)

```bash
# JS: ESM bundle, external dependencies not included
esbuild --bundle --packages=external --format=esm ./lib/<name>.js --outfile=./<name>.min.js

# CSS: bundle + minify
esbuild --bundle --minify ./lib/styles/<name>.css --outfile=./<name>.min.css
```

### Docs site (Parcel)

```bash
# Dev
parcel ./src/index.html

# Build
parcel build ./src/index.html --no-source-maps --public-url ./
```

Parcel handles:
- PostHTML templating (extends, include, markdown)
- `npm:` resolution for CSS imports
- Bare specifier resolution for JS imports
- Font preloading
- View Transitions API

## CSS Cascade Layers

```
┌────────────────────────────────────────┐
│  @layer wcag-ui.core                   │  Reset, helpers, focus
├────────────────────────────────────────┤
│  @layer wcag-ui.foundations            │  Colors, spacing, radius, elevations
│    └ .typography, .grid-system,        │  Typography, grid, iconography
│      .iconography                      │
├────────────────────────────────────────┤
│  @layer wcag-ui.components.<name>      │  Per component
│    └ variants → dimensions →           │
│      modifiers → states                │
├────────────────────────────────────────┤
│  @layer wcag-ui-docs.*                 │  Docs site only (not shipped)
└────────────────────────────────────────┘
```

## Workspace Scripts

| Script | Purpose |
|--------|----------|
| `pnpm start` | Docs dev server (prebuild packages + Parcel) |
| `pnpm build` | Production docs build |
| `pnpm build:packages` | Build all packages with esbuild |
| `pnpm watch:css` | Watch CSS across all packages |
| `pnpm watch:js` | Watch JS across all packages |
| `pnpm lint` | Lint with Biome |
| `pnpm lint:fix` | Autofix lint |
| `pnpm component:add` | Scaffold new component |
| `pnpm release:packages` | Full release workflow |

## Versioning

- All packages share the **same version** (monorepo lockstep).
- The root version governs: currently `0.1.0-alpha.0`.
- During release: simultaneous version bump for all packages.
- Workspace dependencies temporarily switch to `^x.y.z` for publishing, then revert to `workspace:^x.y.z`.
