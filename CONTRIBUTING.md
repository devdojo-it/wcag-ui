# Contributing to wcag-ui

Welcome to the wcag-ui project! Thanks in advance for your time!

---

## Table of Contents

- [Setup](#setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Adding a New Component](#adding-a-new-component)
  - [Step 1: Scaffold](#step-1-scaffold)
  - [Step 2: Implement JavaScript](#step-2-implement-javascript)
  - [Step 3: Implement CSS](#step-3-implement-css)
  - [Step 4: Create the Demo Page](#step-4-create-the-demo-page)
  - [Step 5: Register Imports](#step-5-register-imports)
  - [Step 6: Verify](#step-6-verify)
- [Coding Conventions](#coding-conventions)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Contributors](#contributors)

---

## Setup

### Prerequisites

- **Node.js** 22+ (pinned via [Volta](https://volta.sh))
- **pnpm** 10+ (pinned via Volta)

```bash
# If you use Volta (recommended), node and pnpm are auto-installed
volta install pnpm

# Clone and install
git clone https://github.com/devdojo-it/wcag-ui.git
cd wcag-ui
pnpm install
```

> **Note**: This project uses **pnpm** exclusively. Do not use npm or yarn.

### Common Scripts

| Script | Description |
|--------|-------------|
| `pnpm start` | Start the dev server (docs site + all packages) |
| `pnpm build` | Build everything for production |
| `pnpm build:packages` | Build all packages (esbuild) |
| `pnpm watch:css` | Watch CSS changes across all packages |
| `pnpm watch:js` | Watch JS changes across all packages |
| `pnpm lint` | Run Biome linter |
| `pnpm lint:fix` | Autofix lint issues |
| `pnpm component:add` | Scaffold a new component (see below) |

---

## Project Structure

```
wcag-ui/
├── packages/
│   ├── css/            ← CSS foundation packages (foundations, grid, typography, icons)
│   ├── js/             ← JS runtime packages (core, dom)
│   └── components/     ← UI component packages
├── scripts/            ← CLI automation (scaffold, release)
├── src/                ← Documentation site (Parcel + PostHTML)
├── docs/               ← Markdown documentation
└── .ai/                ← AI/LLM development guidelines
```

Each component lives in `packages/components/<kebab-name>/` with this structure:

```
<kebab-name>/
├── package.json
├── README.md
├── <kebab-name>.min.js          ← Built JS output
├── <kebab-name>.min.css         ← Built CSS output
├── __tests__/
│   └── <kebab-name>.test.js
└── lib/
    ├── <kebab-name>.js           ← Main class
    ├── <kebab-name>.attributes.js ← Attribute change callbacks
    ├── <kebab-name>.events.js     ← Event handlers
    └── styles/
        ├── <kebab-name>.css       ← CSS entry point
        └── _core.css              ← Base styles
```

---

## Development Workflow

1. Start the dev server: `pnpm start`
2. Edit component files under `packages/components/<name>/lib/`
3. Watch mode rebuilds automatically (CSS and JS)
4. View changes at `http://localhost:1234`
5. Lint before committing: `pnpm lint`

---

## Adding a New Component

### Step 1: Scaffold

Use the CLI to generate all boilerplate:

```bash
pnpm component:add --component-name="DatePicker"
```

This creates `packages/components/date-picker/` with all required files, updates documentation, and wires navigation.

**Quick scaffold with auto-imports:**

```bash
pnpm component:add \
  --component-name="DatePicker" \
  --css-file="./src/styles/index.css" \
  --js-file="./src/scripts/index.js"
```

This additionally adds the CSS `@import` and JS `import` to the docs site entry points.

> See all options: `--force`, `--dry-run`, `--skip-html`, `--tag-name`, `--no-install`, etc. Full documentation in `docs/COMPONENTS-CLI.md`.

### Step 2: Implement JavaScript

Edit the 3 files under `lib/`:

**`lib/date-picker.js`** — Main component class:

```js
import { componentDecorator, helpers } from '@wcag-ui/core';
import { DOM } from '@wcag-ui/dom';
import attributes from './date-picker.attributes';
import events from './date-picker.events';

/**
 * wcagUI DatePicker class
 *
 * @export
 * @class DatePicker
 * @extends {HTMLInputElement}
 */
export class DatePicker extends HTMLInputElement {
  static extendsElement = 'input';
  static attributes = attributes;
  static events = events;

  static {
    componentDecorator(this);
  }

  #guid;

  constructor() {
    super();
    this.#init();
  }

  #init() {
    this.#guid = helpers.strings.guid();
    // Setup: wrapping, ARIA, DOM manipulation via DOM.*
  }
}
```

**Key patterns:**
- Always extend the most specific native HTML element
- Use `componentDecorator(this)` in the static block — never call `customElements.define()` directly
- Private fields with `#` prefix, public methods in camelCase
- DOM manipulation via `DOM.*` from `@wcag-ui/dom`
- GUID generation via `helpers.strings.guid()`

**`lib/date-picker.attributes.js`** — Observed attributes:

```js
import { events } from '@wcag-ui/core';

export default {
  'aria-label': function (_oldValue, newValue) {
    // React to aria-label changes
  },
};
```

**`lib/date-picker.events.js`** — Event handlers:

```js
import { events } from '@wcag-ui/core';

export default {
  change: function (e) {
    events.dispatchComponentEvent.call(this, 'change', { value: this.value }, e);
  },
  focus: function (e) {
    events.dispatchComponentEvent.call(this, 'focus', { value: this.value }, e);
  },
};
```

### Step 3: Implement CSS

Edit the styles under `lib/styles/`:

**`lib/styles/date-picker.css`** — Entry point (only imports):

```css
@import "./_core.css" layer(wcag-ui.components.date-picker);
```

**`lib/styles/_core.css`** — Base styles:

```css
:root {
  /* Define component tokens referencing global tokens */
  --wcag-date-picker--color: var(--wcag-c--neutral-800);
  --wcag-date-picker--background-color: var(--wcag-c--light);
  --wcag-date-picker--border-color: var(--wcag-c--neutral-800);
  --wcag-date-picker--border-radius: var(--wcag-r--s);
  --wcag-date-picker--padding: var(--wcag-s--400);
}

[is="wcag-date-picker"] {
  color: var(--wcag-date-picker--color);
  background-color: var(--wcag-date-picker--background-color);
  border: 1px solid var(--wcag-date-picker--border-color);
  border-radius: var(--wcag-date-picker--border-radius);
  padding: var(--wcag-date-picker--padding);
}
```

**Key CSS rules:**
- Always wrap in `@layer wcag-ui.components.<kebab>`
- Define tokens on `:root` with prefix `--wcag-<component>--`
- Reference global tokens (`--wcag-c--`, `--wcag-s--`, `--wcag-r--`) — don't hardcode values
- Use `[is="wcag-<name>"]` as selector, not classes
- Use `:where()` for state selectors to keep specificity low
- Support `light-dark()` for colors that differ in dark mode

For complex components, add subdirectories for variants, dimensions, modifiers, and states.

### Step 4: Create the Demo Page

If you used `--skip-html` or want to customize the generated page, edit `src/components-date-picker.html`:

```html
<extends src="_layout.html" locals='{"title": "Docs"}'>
  <block name="aside">
    <include src="common/docs-nav.html"></include>
  </block>
  <block name="main">
    <h1>DatePicker Docs Example</h1>
    <section>
      <h2>Usage</h2>
      <pre><code>&lt;input is="wcag-date-picker" type="date" aria-label="Select date" /&gt;</code></pre>
    </section>
    <section>
      <h2>Default</h2>
      <p>
        <input is="wcag-date-picker" type="date" aria-label="Select date" />
      </p>
    </section>
  </block>
</extends>
```

### Step 5: Register Imports

If you didn't use `--css-file` and `--js-file` during scaffolding, manually add:

**`src/styles/index.css`:**
```css
@import "npm:@wcag-ui/date-picker/date-picker.min.css";
```

**`src/scripts/index.js`:**
```js
import '@wcag-ui/date-picker';
```

### Step 6: Verify

```bash
# 1. Check syntax
node --check packages/components/date-picker/lib/date-picker.js

# 2. Build the package
cd packages/components/date-picker && pnpm run build && cd ../../..

# 3. Lint
pnpm lint

# 4. Start dev server and verify visually
pnpm start
```

---

## Coding Conventions

### Naming

| Context | Convention | Example |
|---------|-----------|---------|
| Component class | PascalCase | `DatePicker` |
| Package name | `@wcag-ui/<kebab>` | `@wcag-ui/date-picker` |
| HTML tag | `wcag-<kebab>` via `is` attribute | `is="wcag-date-picker"` |
| Files | `<kebab-name>.*` | `date-picker.js` |
| Docs folder | PascalCase | `docs/DatePicker/` |
| Demo page | `components-<kebab>.html` | `components-date-picker.html` |
| CSS tokens | `--wcag-<component>--<property>` | `--wcag-date-picker--color` |

### JavaScript

- **ESM only** (`import`/`export`) — no CommonJS in source files
- **Single quotes**, semicolons always, trailing commas
- **Private fields** with `#` prefix
- Document with **JSDoc** (classes, public methods, functions)
- Use `@wcag-ui/core` helpers, not external libraries
- DOM manipulation via `DOM.*` from `@wcag-ui/dom`

### CSS

- **CSS Cascade Layers** for all styles
- **No `!important`** — layers handle cascade order
- **Native CSS only** — no Sass, PostCSS plugins, CSS-in-JS
- Token naming: `--wcag-<category>--<name>`
- Use `rem` for spacing (1rem = 10px with the project's reset)
- Support dark mode via `light-dark()` with `@supports` fallback

### HTML

- Extend native elements with `is="wcag-*"`
- Use `aria-label` for standalone form controls
- Self-close void elements: `<input />`, `<br />`
- External links: `target="_blank" rel="noopener noreferrer"`
- Semantic landmark elements (`<header>`, `<nav>`, `<main>`, `<footer>`)

---

## Commit Guidelines

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>
```

**Allowed types:** `feat`, `fix`, `docs`, `chore`, `style`, `refactor`, `ci`, `test`, `revert`, `perf`, `build`, `rel`

**Examples:**
```bash
git commit -m "feat(date-picker): add date picker component"
git commit -m "fix(button): correct focus outline color in dark mode"
git commit -m "docs(accordion): add usage examples"
git commit -m "chore: update dependencies"
```

Commits are validated by [commitlint](https://commitlint.js.org/).

---

## Pull Request Process

1. Fork the project
2. Create your feature branch: `git checkout -b feat/date-picker`
3. Make your changes following the conventions above
4. Lint: `pnpm lint`
5. Commit with conventional commit messages
6. Push: `git push origin feat/date-picker`
7. Open a Pull Request

**PR checklist:**
- [ ] Name variants (camel, pascal, kebab, snake) are all consistent
- [ ] CSS is wrapped in the appropriate `@layer`
- [ ] Component tokens reference global design tokens
- [ ] `aria-label` and keyboard navigation work correctly
- [ ] Demo page is functional with `pnpm start`
- [ ] `pnpm lint` passes

---

## Contributors

We are grateful to the following contributors for their valuable contributions to this project:
- [@pixu1980](https://github.com/pixu1980)
- [@maxart2501](https://github.com/maxart2501)
- [@mirirosca](https://github.com/mirirosca)
- [@marcopollacci](https://github.com/marcopollacci)
- [@vallss](https://github.com/vallss)
- [@alestormoody](https://github.com/alestormoody)
- [@cnastasi](https://github.com/cnastasi)
- [@salvotropea96](https://github.com/salvotropea96)
- [@JellyBellyDev](https://github.com/JellyBellyDev)
- [@gabrycaos](https://github.com/gabrycaos)
