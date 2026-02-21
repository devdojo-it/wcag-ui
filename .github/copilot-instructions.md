# 🤖 AI Assistant Guidelines for wcag-ui

Concise, project-specific instructions to help AI coding agents be productive immediately.

---

## ⚡ Quick Reference: `.ai/` Knowledge Base

Before working on any task, **always consult these reference folders**:

### 📋 **Instructions** (`.github/instructions` → `.ai/instructions`)
- **general.md** — Project identity, naming conventions, module system, formatting rules
- **testing.md** — Node test runner setup, happy-dom, axe-core, test file conventions

### 💡 **Context** (`.github/context` → `.ai/context`)
- **component-anatomy.md** — 3-file structure template, class layout, package.json template
- **design-tokens.md** — Colors, spacing modular scale, radius, elevations, typography
- **architecture.md** — Monorepo structure, dependency flow, CSS cascade layers
- **build-and-release.md** — esbuild/Parcel config, release workflow
- **cli-scripts.md** — component-add.mjs, release.mjs, CLI utility APIs

### 🎨 **Styleguides** (`.github/styleguides` → `.ai/styleguides`)
- **css.md** — Project-specific layers + general best practices
- **html.md** — PostHTML + semantic HTML + accessibility conventions
- **javascript.md** — Component structure, naming, arrays, promises, declarations
- **accessibility.md** — WCAG 2.2 founding principles, implemented patterns, anti-patterns

### 🛠️ **Skills** (`.github/skills` → `.ai/skills`)
- **custom-element-building/** — Extend native elements, componentDecorator, lifecycle, DOM patterns, CSS Cascade Layers, ARIA-driven styling
- **custom-element-testing/** — Node test runner pattern, happy-dom setup, testing registration/rendering/attributes/events
- **accessibility-testing/** — axe-core integration, WCAG 2.2 AA ruleset, testing SC patterns

### 🎯 **Prompts** (`.github/prompts` → `.ai/prompts`)
- Template prompts for common tasks (create-component, add-css-variant, add-design-token, create-docs-page, etc.)

---

## 1. Project Overview
- Monorepo design system focused on accessible Web Components + CSS foundations.
- Tech stack: Plain HTML/CSS/JS + small modular JS packages under `packages/js` and Web Component-like enhancers (no frameworks). Build via Parcel (root entry: `src/index.html`).
- Packages grouped by domain:
  - `packages/components/*`: Individual accessible UI components (accordion, dialog, tooltip...).
  - `packages/css/*`: Design tokens, grid, typography, foundations.
  - `packages/js/*`: Core runtime helpers (`core`, `dom`).
- Root `package.json` orchestrates builds with workspaces (`workspace:^` ranges) and Volta pins Node + pnpm.

## 2. Core Conventions
- Naming conversions across scripts: derive all name variants (`camel`, `pascal`, `kebab`, `snake`, `UPPER_SNAKE`). Keep them in sync when adding new utilities.
- Component package name: `@wcag-ui/<kebab-name>`; HTML tag default: `wcag-<kebab-name>` unless overridden with `--tag-name`.
- Folder names for docs: PascalCase (e.g. `docs/TreeView/TreeView.md`).
- CSS artifacts: components expose `<kebab>.min.css` (import with `@import "npm:@wcag-ui/<kebab>/<kebab>.min.css"`).
- Internal dependency alignment: always use `workspace:^<rootVersion>` after scaffold or after release resets.

## 3. Key Scripts & Workflows
- Scaffold component: `pnpm component:add --component-name="TreeView" [options]` → copies template, replaces placeholders, renames files, syncs versions, updates root deps, optional HTML demo + docs wiring.
- Release flow (`scripts/release.mjs`):
  1. Detect bump (BREAKING/feat/patch) from commit messages.
  2. Bump all package versions + rewrite local deps with caret ranges.
  3. Build packages that define a `build` script.
  4. Publish each package (expects per-package `publish:package` script if present; add before extending).
  5. Generate changelog (`generate-changelog` via `changelog` bin).
  6. Commit + tag `vX.Y.Z`.
  7. Reset deps back to `workspace:^` and amend commit.
- Utilities centralized in `scripts/_package-utils.mjs`, `_fs-utils.mjs`, `_docs-utils.mjs`, `_template-utils.mjs`, `_cli-utils.mjs`.

## 4. File Utilities Patterns
- Always use async fs wrappers from `_fs-utils.mjs` when available (e.g. `readJson`, `writeJson`, `ensureDir`, `cpRecursive`, `walk`, `replaceInFile`). Avoid duplicating logic.
- Placeholder replacement + file rename pipeline: iterate `walk()`, run `replaceInFile`, then `renamePlaceholdersInFilenames`.
- HTML example generation uses `writeHtmlFileWithPrettier`; if extending, keep fallback graceful when Prettier fails.

## 5. Dependency & Version Logic
- During scaffold: new component gets root version; root gains dependency via `addWorkspaceDependency` (sorted alphabetically).
- During release: temporary exact caret ranges (`^x.y.z`) then reverted to `workspace:^x.y.z`.
- Keep functions: `normalizeWorkspaceRange`, `updatePackageVersionAndWorkspaceDeps`, `resetToWorkspaceRanges` as single sources of truth. Reuse instead of reimplementing.

## 6. Documentation Automation
- Script adds entries to `docs/COMPONENTS.md` + updates nav (`docs/common/docs-nav.html`) + creates PascalCase folder.
- If changing structure, update `_docs-utils.mjs` and reflect adjustments in component scaffold script and this file.

## 7. Coding Style Highlights
- Linting via Biome (`pnpm lint`). Prefer existing formatting; do not introduce alternate stylistic tools.
- Pure ESM (import/export). Avoid CommonJS.
- Keep error messages terse and prefixed with symbols (✔, ⚠, ❌, ▶, ℹ, ⏭) for CLI UX consistency.

## 8. Adding New Components (Programmatic)
When generating via code:
1. Derive name variants.
2. Copy template to temp folder `component` then rename.
3. Run content placeholder replacement before filename renames.
4. Update version + workspace deps.
5. Optionally inject CSS/JS imports if args provided.
6. Generate example HTML unless `--skip-html`.
7. Wire docs last.

## 9. Safe Changes Checklist (for AI)
Before committing edits:
- If touching version/deps logic → modify only through `_package-utils.mjs` helpers.
- If adding options to CLI → update JSDoc + `docs/COMPONENTS-CLI.md` + here if workflow changes.
- Verify new files use consistent naming + placeholder list.
- Run: `node --check scripts/*.mjs` (syntax), optionally `pnpm lint`.

## 10. Common Pitfalls
- Forgetting PascalCase folder for docs (must match component PascalCase).
- Mixing direct fs sync writes with async helpers (prefer async except where release script intentionally uses sync for simplicity).
- Not updating root dependency sorting after adding a component.

## 11. Testing

- Test runner: **Node.js built-in test runner** (`node:test`) with `node:assert/strict`.
- DOM environment: **happy-dom** for Custom Element support.
- Accessibility testing: **axe-core** for automated WCAG 2.2 AA audits.
- Unit test files: `__tests__/<kebab>.test.js` (ESM format).
- A11y test files: `__tests__/<kebab>.a11y.test.js`.
- Run tests: `node --test ./__tests__/*.test.js`.
- See `.ai/skills/custom-element-testing/` and `.ai/skills/accessibility-testing/` for detailed patterns.

## 12. Accessibility Standard

- Target: **WCAG 2.2 Level AA** compliance.
- Key WCAG 2.2 criteria to verify: Target Size (2.5.8), Focus Not Obscured (2.4.11), Dragging Movements (2.5.7), Accessible Authentication (3.3.8), Redundant Entry (3.3.7), Consistent Help (3.2.6).
- See `.ai/context/accessibility.md` for full pattern reference.

---
Refine this file if workflows (scaffold/release) change or new automation scripts are added.
