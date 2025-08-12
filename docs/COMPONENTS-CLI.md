# wcagUI Component CLI – Extended Guide

The wcagUI Component CLI automates the creation of new components from a predefined template, ensuring consistency, speed, and reduced manual work.

This CLI ensures each component follows wcagUI's architecture and conventions, keeping the codebase clean, modular, and accessible.

The script handles the complete workflow from scaffolding to documentation, making component creation fast and consistent.

---

## 🚀 Example Usage

To create a new **TreeView** component:

```bash
node ./scripts/component-add.mjs --component-name="TreeView"
```

**Alternative (with pnpm shortcut):**

```bash
pnpm component:add --component-name="TreeView"
```

---

## ⚙️ What the Script Does

### 1. **Copy the template**

* Duplicates the chosen template folder (default: `./scripts/templates/component`) into `./packages/components/tree-view`.

**Before:**

```
/scripts/templates/component/
  ├── componentName.js
  ├── componentName.css
  └── README.md
```

**After:**

```
/packages/components/tree-view/
  ├── tree-view.js
  ├── tree-view.css
  └── README.md
```

### 2. **Replace placeholders**

* Replaces all occurrences of:

  * `componentName` → `treeView`
  * `ComponentName` → `TreeView`
  * `component-name` → `tree-view`
  * `component_name` → `tree_view`
  * `COMPONENT_NAME` → `TREE_VIEW`

### 3. **Rename files with placeholders**

* Renames any files that contain placeholders in their filenames to use the component's actual names.

### 4. **Update dependencies**

* Updates the generated component's `package.json` version to match the root version.
* Updates its `workspace:` dependencies to match the root version.
* Adds `<scope>/<name>` (default scope: `@wcag-ui`) to the root `package.json` unless `--no-root-dep` is set.
* Sorts the root `package.json` dependencies alphabetically.

### 5. **Install dependencies**

* Runs `pnpm install` unless `--no-install` is provided.

### 6. **Optional CSS/JS imports**

* If `--css-file` is provided, adds the CSS import line to the specified file.
* If `--js-file` is provided, adds the JS import line to the specified file.

### 7. **Generate example HTML**

* Creates `./src/components-tree-view.html` (unless `--skip-html` is set) with a ready-to-use snippet.
* Optionally also writes the example file into a directory provided via `--examples-dir`.

### 8. **Update documentation**

* Adds the component to `./docs/COMPONENTS.md` in alphabetical order.
* Updates the navigation in `./docs/common/docs-nav.html`.
* Creates a new documentation folder `./docs/TreeView/` with a starter `TreeView.md` file.

---

## 🛠 Full List of Options

* `--component-name` **(required)**: Component name (CamelCase, kebab-case, snake_case, etc.)
* `--pkg-scope="@scope"`: Package scope (default: `@wcag-ui`)
* `--template="./path/to/template"`: Alternate template folder (default: `./scripts/templates/component`)
* `--force`: Overwrites the target folder if it already exists
* `--no-install`: Skips running `pnpm install`
* `--dry-run`: Shows what would be done without modifying files
* `--dry-content`: Only logs placeholder replacements, doesn't write file contents
* `--css-file="./src/styles/index.css"`: If provided, adds an `@import` to the CSS file
* `--js-file="./src/scripts/index.js"`: If provided, adds a JS import to the file
* `--root-version="x.y.z"`: Overrides the root package.json version for this run
* `--skip-html`: Skips generation of example HTML files
* `--examples-dir="./examples"`: Also generate example HTML into this folder
* `--no-root-dep`: Do not add the new package to root package.json dependencies
* `--tag-name="custom-tag"`: Override default HTML tag (defaults to `wcag-<kebabName>`)

---

## 💡 Setting up pnpm Shortcut

```json
{
  "scripts": {
    "component:add": "node ./scripts/component-add.mjs"
  }
}
```

Run:

```bash
pnpm component:add --component-name="TreeView"
```

---

## 📂 Final Folder Structure Example

After running the CLI for `treeView`, you might have:

```
/scripts/templates/component/          # Template source
/packages/components/tree-view/        # Generated component
  ├── tree-view.js
  ├── tree-view.css
  └── README.md
/src/
  ├── components-tree-view.html        # Example HTML (if not skipped)
  └── common/
      └── docs-nav.html                # Updated navigation
/docs/
  ├── COMPONENTS.md                    # Updated with new component
  └── TreeView/                        # New docs folder (PascalCase)
      └── TreeView.md                  # Component documentation
package.json                           # Updated dependencies
```

This CLI ensures each component follows wcagUI’s architecture and conventions, keeping the codebase clean, modular, and accessible.
