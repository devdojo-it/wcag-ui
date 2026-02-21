# CLI Scripts and Automation — wcag-ui

## component-add.mjs — Scaffold New Component

### Command

```bash
pnpm component:add --component-name="TreeView" [options]
```

### Options

| Option | Default | Description |
|---------|---------|-------------|
| `--component-name` | *(required)* | Component name (any format: camel, pascal, kebab) |
| `--pkg-scope` | `@wcag-ui` | npm package scope |
| `--template` | `./scripts/templates/component` | Alternative template path |
| `--force` | `false` | Overwrite if folder exists |
| `--no-install` | `false` | Skip `pnpm install` |
| `--dry-run` | `false` | Show what it would do without modifying |
| `--dry-content` | `false` | Log only file replacements |
| `--css-file` | — | CSS path where to add the import |
| `--js-file` | — | JS path where to add the import |
| `--root-version` | from `package.json` | Force a specific version |
| `--skip-html` | `false` | Skip HTML demo generation |
| `--examples-dir` | — | Additional folder for HTML demo |
| `--no-root-dep` | `false` | Don't add dependency to root `package.json` |
| `--tag-name` | `wcag-<kebab>` | Override custom HTML tag |

### Execution Flow

```
1. Parse CLI arguments
2. Derive name variants (camel, pascal, kebab, snake, UPPER_SNAKE)
3. Read root version from package.json
4. Copy template → packages/components/component (temp)
5. Rename temp folder → packages/components/<kebab>
6. Replace placeholders in file contents:
   - componentName → camelName
   - ComponentName → pascalName
   - component-name → kebabName
   - component_name → snakeName
   - COMPONENT_NAME → upperSnake
7. Rename files with placeholders in their names
8. Update version + deps in the component's package.json
9. Add workspace dependency to root package.json (sorted)
10. pnpm install (unless --no-install)
11. Inject @import CSS (if --css-file)
12. Inject import JS (if --js-file)
13. Generate HTML demo page (unless --skip-html)
14. Update docs/COMPONENTS.md
15. Update src/common/docs-nav.html
16. Create docs/<PascalCase>/ folder
```

### Complete Example

```bash
pnpm component:add \
  --component-name="DatePicker" \
  --css-file="./src/styles/index.css" \
  --js-file="./src/scripts/index.js"
```

This:
1. Creates `packages/components/date-picker/` with all files
2. Sets `@wcag-ui/date-picker` as package name
3. Generates tag `wcag-date-picker`
4. Adds `@import "npm:@wcag-ui/date-picker/date-picker.min.css"` to CSS
5. Adds `import "@wcag-ui/date-picker"` to JS
6. Generates `src/components-date-picker.html`
7. Updates documentation and navigation

### Template Placeholders

| Placeholder | Replaced with |
|-------------|---------------|
| `componentName` | camelCase (`datePicker`) |
| `ComponentName` | PascalCase (`DatePicker`) |
| `component-name` | kebab-case (`date-picker`) |
| `component_name` | snake_case (`date_picker`) |
| `COMPONENT_NAME` | UPPER_SNAKE (`DATE_PICKER`) |

## release.mjs — Release Workflow

### Comando

```bash
pnpm release:packages
```

### Prerequisites

- Clean git working tree
- At least one commit after the last tag
- Write access to npm registry
- Push access to git repository

### Flow

See [build-and-release.md](./build-and-release.md) for the full flow.

## unpublish.mjs — Unpublish Packages

```bash
node scripts/unpublish.mjs
```

Removes published packages from the registry (for development/alpha use).

## Extending Scripts

### Adding a New CLI Option

1. Add the parsing in the `const OPTION = args['option-name']` area
2. Add the logic in the `main()` flow
3. Document the option in the JSDoc at the top of the file
4. Update `docs/COMPONENTS-CLI.md`
5. Update `.github/copilot-instructions.md`
6. Update this file (`.ai/context/cli-scripts.md`)

### Adding a New Utility Script

1. Create `scripts/_<name>-utils.mjs` (prefix `_`, suffix `-utils.mjs`)
2. Use ESM (`import`/`export`)
3. Document every function with full JSDoc
4. Use `async` with fs utilities from `_fs-utils.mjs`
5. Log messages with standard emoji prefixes: `✔ ⚠ ❌ ▶ ℹ ⏭`

### Adding a New Template

1. Create the structure in `scripts/templates/<name>/`
2. Use the standard placeholders (`componentName`, `ComponentName`, `component-name`, etc.)
3. The CSS entry file must have `@import "./_core.css" layer(wcag-ui.components.component-name);`
4. The `.js` file must use the `componentDecorator` pattern
5. The `package.json` must follow the standard structure
