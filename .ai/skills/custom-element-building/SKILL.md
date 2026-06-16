---
name: custom-element-building
description: Build accessible Customized Built-in Elements for the wcag-ui design system. Comprehensive guide covering class structure, native element extension, componentDecorator registration, lifecycle hooks, DOM manipulation, 3-file component architecture (main class, attributes, events), CSS Cascade Layers styling with custom properties, specificity management, and WCAG accessibility patterns including ARIA attributes, focus management, and screen reader support.
metadata:
  domain: web-components
  framework: wcag-ui
  language: javascript,css,html
  difficulty: intermediate
compatibility:
  - copilot
  - cursor
  - windsurf
  - cline
---

# Custom Element Building — wcag-ui (Comprehensive Guide)

## 1. Overview

wcag-ui components are **Customized Built-in Elements** extending native HTML elements via the `is="wcag-*"` attribute. **No Shadow DOM, no slots, no autonomous custom elements.** This preserves native semantics, keyboard behavior, form participation, and screen reader support.

```html
<button is="wcag-button">Submit</button>
<input is="wcag-input" type="email" aria-label="Email" />
<details is="wcag-details">...</details>
```

## 2. Step-by-Step: Create a New Component

### 2.1 Choose the Native Element

| Component type        | `extendsElement` | Base class            |
|-----------------------|------------------|-----------------------|
| Button                | `'button'`       | `HTMLButtonElement`   |
| Text input            | `'input'`        | `HTMLInputElement`    |
| Checkbox/Radio/Switch | `'input'`        | `HTMLInputElement`    |
| Textarea              | `'textarea'`     | `HTMLTextAreaElement`  |
| Select                | `'select'`       | `HTMLSelectElement`   |
| Dialog / Modal        | `'dialog'`       | `HTMLDialogElement`   |
| Details disclosure    | `'details'`      | `HTMLDetailsElement`  |
| Generic container     | `'section'`      | `HTMLElement`         |

### 2.2 Create the 3-File Structure

```
packages/components/<kebab-name>/lib/
├── <kebab>.js              ← Main class
├── <kebab>.attributes.js   ← Observed attribute callbacks
└── <kebab>.events.js       ← DOM event handlers
```

### 2.3 Scaffold Shortcut

```bash
pnpm component:add --component-name="DatePicker" \
  --css-file="./src/styles/index.css" --js-file="./src/scripts/index.js"
```

## 3. Main Class Structure

```js
import { componentDecorator, helpers } from '@wcag-ui/core';
import { DOM } from '@wcag-ui/dom';
import attributes from './<kebab>.attributes';
import events from './<kebab>.events';

export class PascalName extends HTMLBaseElement {
  static extendsElement = '<native-tag>';
  static attributes = attributes;
  static events = events;

  static { componentDecorator(this); }

  #guid;
  constructor() { super(); this.#init(); }

  #init() {
    this.#guid = helpers.strings.guid();
    // DOM setup, attribute defaults, wrapping…
  }
}
```

### 3.1 What `componentDecorator(this)` Does

1. **Generates `is` attribute**: PascalCase → `wcag-<kebab>` (e.g. `TreeView` → `wcag-tree-view`)
2. **Registers**: `customElements.define()` with `{ extends: '<native-tag>' }`
3. **Injects lifecycle**: `connectedCallback`, `disconnectedCallback`, `attributeChangedCallback`, `handleEvent`, `observedAttributes`
4. **Exposes globally**: `self.wcagUI[ClassName]`

### 3.2 Lifecycle Hooks

| Hook | When |
|------|------|
| `constructor()` → `#init()` | Element creation |
| `onConnected()` | Inserted into DOM |
| `onDisconnected()` | Removed from DOM |
| `onAttributeChanged(name, old, new)` | Observed attribute changes |

### 3.3 DOM Manipulation — Always Use `@wcag-ui/dom`

```js
import { DOM } from '@wcag-ui/dom';
DOM.wrapElement(this, { tag: 'span' });
DOM.insertHTML('Label text', label, 'prepend');
DOM.createElement({ tag: 'section', classes: ['content'] });
DOM.createFragment(...DOM.getNextSiblings(this.#summary));
DOM.insertElement(icon, this.#summary, 'append');
```

## 4. Component Types

### Form Control — input/select/textarea with aria-label → label wrapping

```js
#init() {
  this.setAttribute('type', 'checkbox');
  const fieldWrapper = DOM.wrapElement(this, { tag: 'span' });
  const label = DOM.wrapElement(fieldWrapper, { tag: 'label' });
  DOM.insertHTML(this.ariaLabel ?? 'aria-label N/A', label, 'prepend');
  this.setAttribute('sr-only', '');
  this.removeAttribute('aria-label');
}
```

### Container — Accordion, TreeView (MutationObserver)

```js
#init() {
  this.#guid = helpers.strings.guid();
  this.#mutationObserver = new MutationObserver(this.#mutationHandler.bind(this));
  this.#mutationObserver.observe(this, { attributes: true, attributeFilter: ['name'], childList: true, subtree: false });
  this.update();
}
```

### Disclosure — Details/Dialog (open + ARIA)

```js
#init() {
  this.#guid = helpers.strings.guid();
  this.setAttribute('aria-expanded', `${this.open.toString()}`);
  this.#summary.setAttribute('aria-controls', `${this.#guid}-content`);
  DOM.insertElement({ tag: 'i', classes: ['wcag-icon-chevron-down'] }, this.#summary, 'append');
}
```

## 5. Attributes (`<kebab>.attributes.js`)

### Structure

```js
export default {
  '<attribute-name>': function (oldValue, newValue) { /* this = component */ },
};
```

**How it works:** Keys → `observedAttributes`. Key `'open'` → method `handleOpenAttributeChanged(old, new)`. Uses `function` (not arrows) to preserve `this`. `oldValue`/`newValue` are `null` when added/removed. Boolean attrs: present = `""`, absent = `null`.

### Real Examples

```js
// accordion.attributes.js — triggers update
export default { name: function () { this.update(); } };

// checkbox.attributes.js — syncs label + dispatches event
import { events } from '@wcag-ui/core';
export default {
  'aria-label': function (_oldValue, newValue) {
    if (this.label && this.label.textContent !== newValue) {
      this.label.childNodes[0].textContent = newValue;
      events.dispatchComponentEvent.call(this, 'aria-label.change', { label: newValue });
    }
  },
};

// details.attributes.js — manages aria-expanded
export default {
  open: function (_oldValue, newValue) {
    const state = newValue === null ? 'close' : 'open';
    this.setAttribute('aria-expanded', state === 'open');
    events.dispatchComponentEvent.call(this, 'toggle', { state });
  },
};
```

## 6. Events (`<kebab>.events.js`)

### Structure

```js
export default {
  '<event-name>': function (e) { /* this = component */ },
};
```

**How it works:** Key `'click'` → `handleClickEvent(e)`. `connectedCallback` adds listeners; `disconnectedCallback` removes them. `handleEvent(e)` routes to the correct handler. Empty file still required: `export default {};`

### Common Form Control Event Set

```js
import { events } from '@wcag-ui/core';
export default {
  input:   function (e) { events.dispatchComponentEvent.call(this, 'input', { value: this.value }, e); },
  change:  function (e) { events.dispatchComponentEvent.call(this, 'change', { value: this.value }, e); },
  focus:   function (e) { events.dispatchComponentEvent.call(this, 'focus', { value: this.value }, e); },
  blur:    function (e) { events.dispatchComponentEvent.call(this, 'blur', { value: this.value }, e); },
  invalid: function (e) { events.dispatchComponentEvent.call(this, 'invalid', { value: this.value }, e); },
};
```

### Custom Event Dispatching

```js
events.dispatchComponentEvent.call(this, '<event-name>', { ...detail }, originalEvent?);
// Produces: "wcag-<component-kebab>.<event-name>"
```

| Component | Action     | Custom event name              |
|-----------|------------|--------------------------------|
| Dialog    | toggle     | `wcag-dialog.toggle`           |
| Checkbox  | change     | `wcag-checkbox.change`         |
| Input     | aria-label | `wcag-input.aria-label.change` |

### Cross-Component Event Listening

```js
// accordion.events.js — listens to child details toggle
export default {
  'wcag-details.toggle': function (_e) {
    events.dispatchComponentEvent.call(this, 'toggle', {});
  },
};
```

### Handler Name Generation

| Key | Generated method |
|-----|-----------------|
| `click` | `handleClickEvent` |
| `wcag-details.toggle` | `handleWcagDetails.toggleEvent` |
| `open` | `handleOpenAttributeChanged` |
| `aria-label` | `handleAriaLabelAttributeChanged` |

## 7. CSS Architecture

### Cascade Layers (declared in `foundations.css`)

```css
@layer wcag-ui.core, wcag-ui.foundations, wcag-ui.components;
```

| Layer | Sub-layers | Content |
|-------|-----------|---------|
| `wcag-ui.core` | `.reset`, `.helpers`, `.focus` | Reset, flex, sr-only, global focus |
| `wcag-ui.foundations` | `.colors`, `.elevations`, `.spacings`, `.radiuses`, `.typography`, `.grid-system`, `.iconography` | Design tokens |
| `wcag-ui.components.<name>` | variants, sizes, modifiers, states | Per-component |

### Simple Component CSS

```css
/* <kebab>.css */
@import "./_core.css" layer(wcag-ui.components.<kebab>);
```

### Complex Component CSS (with sub-layers)

```css
/* <kebab>.css */
@import "./_core.css" layer(wcag-ui.components.<kebab>);
@import "./variants/variants.css" layer(wcag-ui.components.<kebab>);
@import "./sizes/sizes.css" layer(wcag-ui.components.<kebab>);
@import "./modifiers/modifiers.css" layer(wcag-ui.components.<kebab>);
@import "./states/states.css" layer(wcag-ui.components.<kebab>);
```

Sub-files use relative layers: `@import "./_primary.css" layer(variants.primary);`

## 8. CSS Custom Properties

### Global Tokens: `--wcag-<category>--<property>`

| Prefix | Domain | Example |
|--------|--------|---------|
| `--wcag-c--` | Colors | `--wcag-c--blue-400` |
| `--wcag-s--` | Spacing | `--wcag-s--400` |
| `--wcag-r--` | Radius | `--wcag-r--m` |
| `--wcag-e--` | Elevations | `--wcag-e--md` |
| `--wcag-f--` | Focus | `--wcag-f--outline-width` |
| `--wcag-t--` | Typography | `--wcag-t--font-size` |

### Component Token Multi-Level Naming

```
--wcag-<comp>--<property>                              base
--wcag-<comp>--<dim>--<property>                       dimension (sm, md, lg)
--wcag-<comp>--v-<variant>--<property>                 variant
--wcag-<comp>--v-<variant>--s-<state>--<property>      variant + state
--wcag-<comp>--s-<state>--<property>                   state
--wcag-<comp>--m-<modifier>--<property>                modifier
```

**Abbreviations:** `v-pri` (primary), `v-sec` (secondary), `v-ter` (tertiary), `v-des` (destructive), `s-hov` (hover), `s-foc` (focus), `s-act` (active), `s-dis` (disabled), `m-circle`, `m-square`

### The Double-Mapping Pattern

**Step 1** — Define dimension tokens on `:root`:
```css
:root { --wcag-button--md--height: 4.4rem; --wcag-button--md--padding-inline: 2rem; }
```
**Step 2** — Wire defaults in component selector:
```css
[is="wcag-button"] { --wcag-button--height: var(--wcag-button--md--height); }
```
**Step 3** — Use intermediate variables in properties:
```css
[is="wcag-button"] { padding-inline: var(--wcag-button--padding-inline); }
```
**Step 4** — Override intermediate variables (not properties) in variants/states:
```css
[is="wcag-button"]:hover { --wcag-button--color: var(--wcag-button--s-hov--color); }
[is="wcag-button"][sm] { --wcag-button--height: var(--wcag-button--sm--height); }
```

## 9. CSS Selectors & Specificity

### Primary: `[is="wcag-*"]`

```css
[is="wcag-button"] { /* base */ }
[is="wcag-button"][secondary] { /* variant via boolean attr */ }
[is="wcag-button"][sm] { /* dimension */ }
```

### Label wrapping for form controls

```css
label:has([is="wcag-checkbox"]) {
  > span {
    &::before { /* custom visual box */ }
    &::after  { /* check icon */ }
  }
  &:has(:checked) > span::after { opacity: 1; }
}
```

### `:where()` for zero specificity — states & foundations

```css
[is="wcag-button"]:where(:focus, :focus-visible) { /* focus */ }
[is="wcag-button"]:where([disabled], :disabled, [aria-disabled="true"]) { /* disabled */ }
:where(:focus-visible) { /* global focus — zero specificity */ }
```

### Units: `rem` (spacing, 1rem=10px), `em` (font sizes), `px` (borders only), `vw` (containers)

## 10. Color Scheme

```css
:root {
  --wcag-c--blue-400--light: hsl(245, 94%, 74%);
  --wcag-c--blue-400--dark: hsl(245, 73%, 74%);
  @supports (color: light-dark(var(--wcag-c--light), var(--wcag-c--dark))) {
    --wcag-c--blue-400: light-dark(var(--wcag-c--blue-400--light), var(--wcag-c--blue-400--dark));
  }
}
@supports not (color: light-dark(var(--wcag-c--light), var(--wcag-c--dark))) {
  @media (prefers-color-scheme: dark) {
    :root { --wcag-c--blue-400: var(--wcag-c--blue-400--dark); }
  }
}
```

## 11. Accessibility Patterns

### ARIA Attributes Driving CSS

```css
[is="wcag-details"][aria-expanded="true"]  { /* open  */ }
[is="wcag-details"][aria-expanded="false"] { /* closed */ }
[is="wcag-button"]:where(:active, [aria-pressed="true"]) { /* pressed */ }
```

**Disabled triple pattern** (HTML attr + pseudo + ARIA):
```css
[is="wcag-button"]:where([disabled], :disabled, [aria-disabled="true"]) { cursor: not-allowed; }
```
`aria-disabled="true"` keeps the element focusable (allows tooltip/explanation).

### `aria-controls` + `id` Relationships

```js
this.#summary.setAttribute('id', this.#guid);
this.#summary.setAttribute('aria-controls', `${this.#guid}-content`);
this.#content.setAttribute('id', `${this.#guid}-content`);
```

### aria-label → Visible Label Transformation

Author writes: `<input is="wcag-checkbox" aria-label="Accept terms" />`
Component generates:
```html
<label>Accept terms <span><input is="wcag-checkbox" type="checkbox" sr-only /></span></label>
```
Satisfies **SC 1.3.1** (Info and Relationships) and **SC 2.5.3** (Label in Name).

### `sr-only` — Screen Reader Only

```css
[sr-only] { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; white-space: nowrap; clip: rect(0,0,0,0); }
```
Use for: hidden native inputs, descriptive text for AT. **Never** use `display:none` or `visibility:hidden` (removes from a11y tree).

### Focus Management

Global (zero specificity):
```css
:where(:focus-visible, :has(> [sr-only]):focus-within) {
  outline: var(--wcag-f--outline-width) var(--wcag-f--outline-style) var(--wcag-f--outline-color);
  outline-offset: var(--wcag-f--outline-offset);
}
```
`:has(> [sr-only]):focus-within` — when hidden input focuses, parent label shows the ring.

### Custom Checkbox/Radio/Switch Visuals

Native `<input>` is `sr-only`; `label > span::before/::after` provides custom visuals. `:has(:checked)` toggles visibility. Element stays in DOM, focusable, participates in forms.

### Decorative Icons

```css
[class^="wcag-icon-"], [class*=" wcag-icon-"] { speak: never; }
```

### Semantic Landmarks

```html
<header> <nav> <main> <aside nav> <footer>
<nav aria-label="breadcrumb">
```

## 12. Naming Rules

| Context | Convention | Example |
|---------|-----------|---------|
| Class name | PascalCase | `TreeView` |
| Package name | `@wcag-ui/<kebab>` | `@wcag-ui/tree-view` |
| HTML tag | `wcag-<kebab>` | `wcag-tree-view` |
| Private fields | `#` prefix | `#guid`, `#init()` |
| Public methods | camelCase | `update()`, `buildNav()` |
| Unused params | `_` prefix | `_e`, `_oldValue` |
| CSS global tokens | `--wcag-<cat>--<prop>` | `--wcag-c--blue-400` |
| CSS component tokens | `--wcag-<comp>--<prop>` | `--wcag-button--height` |
| Custom events | `wcag-<comp>.<action>` | `wcag-dialog.toggle` |

## 13. Checklist for New Components

### Required
- [ ] Extend the most semantically appropriate native HTML element
- [ ] Keyboard navigation works (inherited or explicit)
- [ ] `aria-label` where no visible text label exists
- [ ] `:focus-visible` with outline conforming to focus tokens
- [ ] Support `aria-disabled` in addition to `disabled`
- [ ] `sr-only` for screen-reader-only content (not `display:none`)
- [ ] CSS state pseudo-classes wrapped in `:where()`
- [ ] All styles inside `@layer`
- [ ] Component tokens on `:root`, mapped in selector (double-mapping)

### Recommended
- [ ] `aria-expanded` for open/close components
- [ ] Connect controller ↔ controlled with `aria-controls` + `id` (GUID)
- [ ] Emit custom events with state details
- [ ] Test with screen readers (VoiceOver, NVDA)

## 14. Anti-Patterns

**JavaScript:**
- **NEVER** call `customElements.define()` directly → use `componentDecorator`
- **NEVER** use `document.createElement` → use `DOM.createElement()`
- **NEVER** use `innerHTML` directly → use `DOM.insertHTML()` (sanitizes)
- **NEVER** use Shadow DOM or `<slot>` elements
- **NEVER** use CommonJS — pure ESM only
- **NEVER** add external deps — only `@wcag-ui/core` and `@wcag-ui/dom`
- **NEVER** use arrow functions in attribute/event dictionaries (`this` must bind to instance)
- **NEVER** manually manage listeners for dictionary-declared events

**CSS:**
- **NEVER** use `!important` — Cascade Layers make it unnecessary
- **NEVER** create new top-level layers — use sub-layers of existing ones
- **NEVER** override CSS properties in variants/states — override intermediate variables
- **NEVER** use class selectors for variants — use boolean HTML attributes
- **NEVER** write styles outside a `@layer`
- **ALWAYS** define component tokens on `:root` first, then map in selector
- **ALWAYS** use `_` prefix for partial CSS files (`_core.css`, `_hover.css`)
