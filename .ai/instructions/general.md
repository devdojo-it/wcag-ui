# General LLM Rules — wcag-ui

## Project Identity

- **wcag-ui** is a monorepo design system focused on accessible Web Components + CSS foundations.
- Stack: **Plain HTML/CSS/JS** — no frameworks (no React, no Vue, no Angular).
- Components are **Customized Built-in Elements** (`is="wcag-*"`) that extend native HTML elements.
- Build: **Parcel** (docs site) + **esbuild** (individual packages).
- Linting: **Biome** — do not introduce ESLint, Prettier (used only in the scaffold script), or other stylistic tools.
- Package manager: **pnpm** with workspaces. Do not use npm or yarn.
- Runtime: **Node.js 22+**, pinned via Volta.

## Language Conventions in Code

- All source code (variables, comments, JSDoc, file names) is in **English**.
- User documentation (docs/, README) may be in English.
- CLI messages use emoji prefixes: `✔` (success), `⚠` (warning), `❌` (error), `▶` (operation start), `ℹ` (info), `⏭` (skip).

## Modularity

- Each package is self-contained under `packages/{css,js,components}/<name>/`.
- Internal dependencies always use `workspace:^<version>`.
- Do not duplicate logic: reuse helpers from `@wcag-ui/core` and `@wcag-ui/dom`.
- Utility scripts are centralized in `scripts/_*.mjs` — reuse, do not reimplement.

## Naming Convention (Name Derivation)

Given any name, derive **all** variants and keep them in sync:

| Variant       | Example (`TreeView`) |
|---------------|---------------------|
| `camelCase`   | `treeView`          |
| `PascalCase`  | `TreeView`          |
| `kebab-case`  | `tree-view`         |
| `snake_case`  | `tree_view`         |
| `UPPER_SNAKE` | `TREE_VIEW`         |

Conversion functions are in `@wcag-ui/core/lib/helpers/_strings.js`.

## File and Folder Naming

| Context                     | Pattern                        | Example                     |
|-----------------------------|--------------------------------|-----------------------------|
| Component package           | `packages/components/<kebab>/` | `packages/components/tree-view/` |
| Component JS file           | `<kebab>.js`                   | `tree-view.js`              |
| Component CSS file          | `<kebab>.css`                  | `tree-view.css`             |
| Attributes file             | `<kebab>.attributes.js`        | `tree-view.attributes.js`   |
| Events file                 | `<kebab>.events.js`            | `tree-view.events.js`       |
| Test file                   | `<kebab>.test.js`              | `tree-view.test.js`         |
| Test folder                 | `__tests__/`                   | `__tests__/`                |
| Docs folder                 | `docs/<PascalCase>/`           | `docs/TreeView/`            |
| Docs file                   | `<PascalCase>.md`              | `TreeView.md`               |
| HTML demo page              | `src/components-<kebab>.html`  | `src/components-tree-view.html` |
| CSS partial (private)       | `_<name>.css`                  | `_core.css`                 |
| Utility script              | `_<name>.mjs`                  | `_fs-utils.mjs`             |

## Module System

- **Pure ESM** (`import`/`export`) for all source code.
- `"type": "module"` in all `package.json` files.
- **No CommonJS** (`require`/`module.exports`) — exception: legacy test files and `commitlint.config.js`.

## Formatting (Biome)

| Property             | Value      |
|----------------------|------------|
| Indent               | 2 spaces   |
| Line ending          | LF         |
| Max line width       | 120 char   |
| Quote style JS       | Single `'` |
| Semicolons           | Always     |
| Trailing commas      | All        |
| Arrow parentheses    | Always     |
| Bracket spacing      | `true`     |
| HTML void self-close | Always (`<input />`) |

## Dependencies

- Do not add external dependencies to component packages — they may only depend on `@wcag-ui/core` and `@wcag-ui/dom`.
- Third-party dependencies belong only in the root `devDependencies` or in CSS/JS infrastructure packages.
- After adding a component, sort dependencies alphabetically in the root `package.json`.

## Git & Commit

- Conventional Commits required: `<type>(<scope>): <description>`
- Allowed types: `feat`, `fix`, `docs`, `chore`, `style`, `refactor`, `ci`, `test`, `revert`, `perf`, `build`, `rel`
- The release commit is `chore(release): vX.Y.Z` — it is handled automatically by the script.

## Pre-commit Checklist for AI

1. Verify that all derived names (camel, pascal, kebab, snake, UPPER_SNAKE) are consistent.
2. If touching version/dependency logic → use only the helpers in `_package-utils.mjs`.
3. If adding CLI options → update JSDoc, `docs/COMPONENTS-CLI.md`, and `.github/copilot-instructions.md`.
4. Verify that new files follow the naming conventions.
5. Run: `node --check scripts/*.mjs` (syntax check) and `pnpm lint`.
6. Do not create summary Markdown files for changes — document in the code.
