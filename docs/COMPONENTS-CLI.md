# wcagUI Component CLI – Extended Guide

The wcagUI Component CLI automates the creation of new components from a predefined template, ensuring consistency, speed, and reduced manual work.

---

## 🚀 Example Usage

To create a new **TreeView** component:

```bash
node --experimental-modules ./scripts/component.mjs --component-name="treeView"
```

**Alternative (with pnpm shortcut):**

```bash
pnpm component:add --component-name="treeView"
```

---

## ⚙️ What the Script Does

### 1. **Copy the template**

* Duplicates the `./scripts/templates/component` folder into `./packages/components/tree-view`.

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

---

### 2. **Replace placeholders**

* Replaces all occurrences of:

  * `componentName` → `treeView`
  * `ComponentName` → `TreeView`
  * `component-name` → `tree-view`
  * `component_name` → `tree_view`
  * `COMPONENT_NAME` → `TREE_VIEW`

**Example:**

```js
// Before
class ComponentName extends HTMLElement { ... }

// After
class TreeView extends HTMLElement { ... }
```

---

### 3. **Update dependencies**

* Adds `@wcag-ui/tree-view` to the root `package.json` with:

```json
"@wcag-ui/tree-view": "workspace:^0.0.0"
```

---

### 4. **Install dependencies**

* Runs `pnpm install` automatically.
* Skips installation if `--no-install` is provided.

---

### 5. **Generate the example HTML file**

* Creates `./src/component-treeview.html` with the following content:

```html
<extends src="_layout.html" locals='{"title": "Docs"}'>
  <block name="aside">
    <include src="common/docs-nav.html"></include>
  </block>
  <block name="main">
    <h1>TreeView Docs Example</h1>
    <section>
      <h2>TreeView</h2>
      <p>
        <element is="wcag-treeview"></element>
      </p>
    </section>
  </block>
</extends>
```

**File structure before:**

```
/src/
```

**File structure after:**

```
/src/
  └── component-treeview.html
```

---

## 🛠 Useful Options

* `--dry-run` → Only logs actions without modifying files.
* `--force` → Overwrites an existing component.
* `--no-install` → Skips running `pnpm install`.
* `--css-file="./src/styles/index.css"` → Adds CSS import automatically.
* `--js-file="./src/scripts/index.js"` → Adds JS import automatically.

---

## 💡 Setting up pnpm Shortcut

To make the command shorter, add this to the root `package.json`:

```json
{
  "scripts": {
    "component:add": "node --experimental-modules ./scripts/component.mjs"
  }
}
```

Then run:

```bash
pnpm component:add --component-name="treeView"
```

This will internally call:

```bash
node --experimental-modules ./scripts/component.mjs --component-name="treeView"
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
  └── component-treeview.html          # Example HTML
package.json                           # Updated dependencies
```

---

This CLI ensures each component is created following wcagUI’s architecture and naming conventions, keeping the codebase clean, modular, and accessible.
