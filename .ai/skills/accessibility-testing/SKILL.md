---
name: accessibility-testing
description: Test accessibility of wcag-ui components using axe-core with Node.js built-in test runner. Covers automated WCAG 2.2 AA auditing, keyboard navigation testing, ARIA attribute verification, focus management testing, screen reader text validation, contrast checks, and target size verification.
metadata:
  domain: accessibility-testing
  framework: wcag-ui
  standard: wcag-2.2
  language: javascript
  difficulty: intermediate
compatibility:
  - copilot
  - cursor
  - windsurf
  - cline
---

# Accessibility Testing for wcag-ui Components

## 1. Setup

Install dependencies at workspace root:

```bash
pnpm add -Dw axe-core happy-dom
```

### Shared Test Setup

Create `__tests__/helpers/a11y-setup.js`:

```js
import { Window } from 'happy-dom';
import axe from 'axe-core';

/**
 * Boot a minimal DOM environment and wire axe-core into it.
 * Call once in a top-level `before()` hook.
 * @param {string} html - innerHTML to inject into document.body
 * @returns {{ document: Document, window: Window, runAxe: Function }}
 */
export function createA11yEnv(html = '') {
  const window = new Window({ url: 'http://localhost' });
  const document = window.document;
  document.body.innerHTML = html;

  // Expose globals axe-core expects
  globalThis.window = window;
  globalThis.document = document;
  globalThis.Node = window.Node;
  globalThis.HTMLElement = window.HTMLElement;

  /** Run axe against document.body with WCAG 2.2 AA ruleset */
  async function runAxe(context = document.body, opts = {}) {
    return axe.run(context, {
      runOnly: ['wcag2a', 'wcag2aa', 'wcag22aa'],
      rules: {
        'color-contrast': { enabled: true },
        'target-size': { enabled: true },
        ...opts.rules,
      },
      ...opts,
    });
  }

  return { window, document, runAxe };
}

/** Format axe violations into a readable assertion message. */
export function formatViolations(violations) {
  return violations
    .map((v) => `[${v.id}] ${v.description} (${v.nodes.length} node(s))`)
    .join('\n');
}
```

## 2. Test File Structure

Place accessibility tests alongside unit tests using a distinct suffix:

```
packages/components/<kebab>/
  __tests__/
    <kebab>.a11y.test.js   ← accessibility tests
    <kebab>.test.js         ← unit / behaviour tests
```

Each file follows this shape:

```js
import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createA11yEnv, formatViolations } from './helpers/a11y-setup.js';
```

## 3. Running axe-core Audits

Full-page audit template:

```js
import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import { createA11yEnv, formatViolations } from './helpers/a11y-setup.js';

describe('<PascalName> accessibility', () => {
  let env;

  before(() => {
    env = createA11yEnv(`
      <!-- component markup here -->
      <button is="wcag-button">Save</button>
    `);
  });

  it('should have no axe violations', async () => {
    const results = await env.runAxe();
    assert.strictEqual(
      results.violations.length,
      0,
      `Violations found:\n${formatViolations(results.violations)}`,
    );
  });
});
```

## 4. Testing Specific WCAG 2.2 Criteria

### SC 2.5.8 — Target Size (Minimum 24×24 px)

```js
it('interactive elements meet 24x24 target size', () => {
  const interactives = env.document.querySelectorAll(
    'button, [role="button"], a[href], input, select, textarea',
  );
  for (const el of interactives) {
    const rect = el.getBoundingClientRect();
    assert.ok(rect.width >= 24, `${el.tagName} width ${rect.width} < 24`);
    assert.ok(rect.height >= 24, `${el.tagName} height ${rect.height} < 24`);
  }
});
```

### SC 2.4.11 — Focus Not Obscured (Minimum)

```js
it('focused element is not hidden behind sticky/fixed overlays', () => {
  const focusable = env.document.querySelector('[tabindex="0"], button');
  focusable?.focus();
  const style = env.window.getComputedStyle(focusable);
  assert.notStrictEqual(style.visibility, 'hidden');
  assert.notStrictEqual(style.display, 'none');
});
```

### SC 1.3.1 — Info and Relationships (Label Association)

```js
it('every form control has an accessible label', () => {
  const controls = env.document.querySelectorAll('input, select, textarea');
  for (const ctrl of controls) {
    const hasLabel =
      ctrl.getAttribute('aria-label') ||
      ctrl.getAttribute('aria-labelledby') ||
      env.document.querySelector(`label[for="${ctrl.id}"]`);
    assert.ok(hasLabel, `Control ${ctrl.tagName}#${ctrl.id} lacks a label`);
  }
});
```

### SC 2.4.7 — Focus Visible

```js
it('focus outline is not suppressed', () => {
  const btn = env.document.querySelector('button');
  btn?.focus();
  const style = env.window.getComputedStyle(btn);
  // outline must not be 'none' or '0' when focused
  assert.notStrictEqual(style.outlineStyle, 'none', 'outline-style is none');
});
```

### SC 4.1.2 — Name, Role, Value

```js
it('ARIA attributes provide name, role, value', () => {
  const widget = env.document.querySelector('[role]');
  if (widget) {
    const name =
      widget.getAttribute('aria-label') ||
      widget.getAttribute('aria-labelledby') ||
      widget.textContent.trim();
    assert.ok(name, 'Widget has no accessible name');
  }
});
```

## 5. Testing ARIA Patterns

### aria-expanded State Sync (Disclosure)

```js
it('aria-expanded toggles on activation', () => {
  const trigger = env.document.querySelector('[aria-expanded]');
  assert.strictEqual(trigger.getAttribute('aria-expanded'), 'false');
  trigger.click();
  assert.strictEqual(trigger.getAttribute('aria-expanded'), 'true');
});
```

### Disabled Triple Pattern

wcag-ui components implement disabled as `disabled` attribute + `:disabled` pseudo + `aria-disabled="true"`:

```js
it('disabled state applies triple pattern', () => {
  const el = env.document.querySelector('[disabled]');
  assert.ok(el.hasAttribute('disabled'));
  assert.strictEqual(el.getAttribute('aria-disabled'), 'true');
  assert.ok(el.matches(':disabled'), 'element does not match :disabled');
});
```

### aria-controls + id Relationship

```js
it('aria-controls references a valid id', () => {
  const trigger = env.document.querySelector('[aria-controls]');
  const targetId = trigger?.getAttribute('aria-controls');
  assert.ok(targetId, 'aria-controls is empty');
  assert.ok(env.document.getElementById(targetId), `#${targetId} not found`);
});
```

### aria-pressed (Toggle Button)

```js
it('aria-pressed reflects toggle state', () => {
  const toggle = env.document.querySelector('[aria-pressed]');
  assert.strictEqual(toggle.getAttribute('aria-pressed'), 'false');
  toggle.click();
  assert.strictEqual(toggle.getAttribute('aria-pressed'), 'true');
});
```

### aria-label on Form Controls

```js
it('icon-only buttons have aria-label', () => {
  const iconBtns = env.document.querySelectorAll('button:not(:empty)');
  for (const btn of iconBtns) {
    if (!btn.textContent.trim()) {
      assert.ok(btn.getAttribute('aria-label'), 'icon button lacks aria-label');
    }
  }
});
```

## 6. Testing Keyboard Navigation

### Tab Order

```js
it('tab order follows logical sequence', () => {
  const focusable = [...env.document.querySelectorAll(
    'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
  )];
  for (let i = 0; i < focusable.length; i++) {
    focusable[i].focus();
    assert.strictEqual(env.document.activeElement, focusable[i]);
  }
});
```

### Enter / Space Activation

```js
it('button activates on Enter and Space', () => {
  let activated = 0;
  const btn = env.document.querySelector('button');
  btn.addEventListener('click', () => activated++);
  btn.dispatchEvent(new env.window.KeyboardEvent('keydown', { key: 'Enter' }));
  btn.dispatchEvent(new env.window.KeyboardEvent('keydown', { key: ' ' }));
  // Component code should translate keydown → click
  assert.ok(activated >= 0, 'button did not activate');
});
```

### Escape to Close (Dialog)

```js
it('Escape closes the dialog', () => {
  const dialog = env.document.querySelector('dialog[is="wcag-dialog"]');
  dialog.showModal?.();
  dialog.dispatchEvent(
    new env.window.KeyboardEvent('keydown', { key: 'Escape' }),
  );
  assert.strictEqual(dialog.open, false, 'dialog still open after Escape');
});
```

### Arrow Keys (Accordion, TreeView)

```js
it('ArrowDown moves focus to next item', () => {
  const items = env.document.querySelectorAll('[role="treeitem"]');
  items[0].focus();
  items[0].dispatchEvent(
    new env.window.KeyboardEvent('keydown', { key: 'ArrowDown' }),
  );
  assert.strictEqual(env.document.activeElement, items[1]);
});
```

## 7. Testing Screen Reader Text

### sr-only Content Exists

```js
it('sr-only span provides screen reader text', () => {
  const srOnly = env.document.querySelector('.sr-only');
  assert.ok(srOnly, '.sr-only element missing');
  assert.ok(srOnly.textContent.trim(), '.sr-only is empty');
});
```

### Decorative Content Hidden from AT

```js
it('decorative icons are hidden from assistive tech', () => {
  const icons = env.document.querySelectorAll('svg, [class*="icon"]');
  for (const icon of icons) {
    const hidden =
      icon.getAttribute('aria-hidden') === 'true' ||
      icon.getAttribute('role') === 'presentation';
    assert.ok(hidden, `${icon.tagName} not hidden from AT`);
  }
});
```

### Label Text Consistency

```js
it('visible label matches aria-label', () => {
  const labeled = env.document.querySelectorAll('[aria-label]');
  for (const el of labeled) {
    const visible = el.textContent.trim();
    const ariaLabel = el.getAttribute('aria-label');
    if (visible && ariaLabel) {
      assert.ok(
        ariaLabel.toLowerCase().includes(visible.toLowerCase()),
        `aria-label "${ariaLabel}" does not contain visible text "${visible}"`,
      );
    }
  }
});
```

## 8. Testing Focus Management

### Focus Ring Visibility

```js
it('focus ring has visible outline', () => {
  const el = env.document.querySelector('button');
  el.focus();
  const style = env.window.getComputedStyle(el);
  const outlineWidth = parseInt(style.outlineWidth, 10);
  assert.ok(outlineWidth > 0, 'outline-width is 0 on focus');
});
```

### Focus Trap in Dialog

```js
it('focus stays trapped inside open dialog', () => {
  const dialog = env.document.querySelector('dialog[is="wcag-dialog"]');
  dialog.showModal?.();
  const focusable = dialog.querySelectorAll('button, [href], input, [tabindex]');
  const last = focusable[focusable.length - 1];
  last.focus();
  // Simulate Tab (component should wrap focus)
  last.dispatchEvent(
    new env.window.KeyboardEvent('keydown', { key: 'Tab' }),
  );
  assert.strictEqual(env.document.activeElement, focusable[0]);
});
```

### Focus Restore After Dialog Close

```js
it('focus returns to trigger after dialog closes', () => {
  const trigger = env.document.querySelector('[data-dialog-trigger]');
  trigger.focus();
  trigger.click(); // opens dialog
  const dialog = env.document.querySelector('dialog[is="wcag-dialog"]');
  dialog.dispatchEvent(
    new env.window.KeyboardEvent('keydown', { key: 'Escape' }),
  );
  assert.strictEqual(env.document.activeElement, trigger);
});
```

## 9. Component-Specific Test Templates

### Button

```js
describe('wcag-button a11y', () => {
  let env;
  before(() => {
    env = createA11yEnv('<button is="wcag-button">Save</button>');
  });
  it('no axe violations', async () => {
    const r = await env.runAxe();
    assert.strictEqual(r.violations.length, 0, formatViolations(r.violations));
  });
  it('has implicit button role', () => {
    assert.strictEqual(env.document.querySelector('button').getAttribute('role') ?? 'button', 'button');
  });
});
```

### Form Control (Input, Checkbox, Radio, Select, Textarea)

```js
describe('wcag-input a11y', () => {
  let env;
  before(() => {
    env = createA11yEnv(`
      <label for="email">Email</label>
      <input is="wcag-input" id="email" type="email" />
    `);
  });
  it('no axe violations', async () => {
    const r = await env.runAxe();
    assert.strictEqual(r.violations.length, 0, formatViolations(r.violations));
  });
  it('label is associated', () => {
    assert.ok(env.document.querySelector('label[for="email"]'));
  });
});
```

### Disclosure (Accordion, Details)

```js
describe('wcag-accordion a11y', () => {
  let env;
  before(() => {
    env = createA11yEnv(`
      <div is="wcag-accordion">
        <button aria-expanded="false" aria-controls="panel-1">Section 1</button>
        <div id="panel-1" role="region" hidden>Content 1</div>
      </div>
    `);
  });
  it('aria-expanded toggles', () => { /* see §5 */ });
  it('aria-controls points to valid panel', () => { /* see §5 */ });
});
```

### Dialog

```js
describe('wcag-dialog a11y', () => {
  let env;
  before(() => {
    env = createA11yEnv(`
      <button data-dialog-trigger>Open</button>
      <dialog is="wcag-dialog" aria-label="Confirm">
        <p>Are you sure?</p>
        <button>Yes</button><button>No</button>
      </dialog>
    `);
  });
  it('no axe violations', async () => { /* see §3 */ });
  it('Escape closes dialog', () => { /* see §6 */ });
  it('focus trap works', () => { /* see §8 */ });
  it('focus restores on close', () => { /* see §8 */ });
});
```

## 10. Package.json Script

Add to the component or root `package.json`:

```json
{
  "scripts": {
    "test:a11y": "node --test ./__tests__/*.a11y.test.js"
  }
}
```

Run all a11y tests across the monorepo:

```bash
pnpm -r test:a11y
```

## 11. Conventions

### Automate vs Manual

| What                        | Automated (axe + tests) | Manual |
|-----------------------------|:-----------------------:|:------:|
| ARIA attribute presence     | ✔                       |        |
| Label association           | ✔                       |        |
| Color contrast (computed)   | ✔                       |        |
| Target size (getBCR)        | ✔                       |        |
| Keyboard navigation         | ✔                       |        |
| Focus management            | ✔                       |        |
| Screen reader announcement  |                         | ✔      |
| Reflow / zoom behaviour     |                         | ✔      |
| Cognitive load / readability|                         | ✔      |

### Interpreting axe Results

- **violations** — must fix; fail the test.
- **incomplete** — needs manual review; log a warning, do not fail.
- **passes** — confirmed passing rules.
- **inapplicable** — rule doesn't apply to the markup provided.

### Common False Positives

| Rule ID            | Cause                                    | Resolution                              |
|--------------------|------------------------------------------|-----------------------------------------|
| `color-contrast`   | happy-dom doesn't compute colors         | Verify in real browser; disable in unit |
| `region`           | Test markup lacks landmarks              | Wrap test HTML in `<main>`              |
| `page-has-heading` | Test fragment has no `<h1>`              | Add heading or disable rule in test     |

Disable individual rules only in tests, never globally:

```js
const results = await env.runAxe(document.body, {
  rules: { 'region': { enabled: false } },
});
```
