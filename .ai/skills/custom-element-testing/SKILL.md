---
name: custom-element-testing
description: Test wcag-ui Customized Built-in Elements using Node.js built-in test runner (node:test). Covers component registration verification, DOM rendering with JSDOM/happy-dom, attribute callback testing, custom event dispatch testing, lifecycle hook testing, and test file conventions for the 3-file architecture.
metadata:
  domain: testing
  framework: wcag-ui
  language: javascript
  difficulty: intermediate
compatibility:
  - copilot
  - cursor
  - windsurf
  - cline
---

# Custom Element Testing — wcag-ui

## 1. Setup

### Test Runner

Use the **Node.js built-in test runner** (`node:test`) — no Jest, Vitest, or Mocha.
Assertions use `node:assert/strict` exclusively (never bare `node:assert`).

### DOM Environment

Components need a browser-like DOM. Use **happy-dom** — a lightweight, fast DOM
implementation with Custom Elements support.

```bash
pnpm add -Dw happy-dom
```

### Test Bootstrap

Create a shared setup file that initializes the DOM environment before each test suite:

```js
// packages/components/<kebab>/__tests__/setup.js
import { Window } from 'happy-dom';

/**
 * Bootstraps a happy-dom environment, exposing globals that
 * Customized Built-in Elements rely on (window, document,
 * customElements, HTMLElement, etc.).
 */
export function setupDOM() {
  const window = new Window({ url: 'https://localhost' });
  const globals = [
    'document', 'customElements', 'HTMLElement', 'HTMLButtonElement',
    'HTMLInputElement', 'HTMLSelectElement', 'HTMLTextAreaElement',
    'HTMLDialogElement', 'HTMLDetailsElement', 'HTMLDivElement',
    'HTMLSpanElement', 'Event', 'CustomEvent', 'MutationObserver',
  ];

  globalThis.window = window;
  for (const key of globals) {
    globalThis[key] = window[key];
  }
  // wcag-ui exposes components on `self.wcagUI`
  globalThis.self = globalThis;
  globalThis.wcagUI = globalThis.wcagUI ?? {};
}

export function teardownDOM() {
  const window = globalThis.window;
  if (window?.close) window.close();
  globalThis.window = undefined;
  globalThis.document = undefined;
  globalThis.customElements = undefined;
}
```

> **Tip:** If multiple component test suites need the same setup, extract it into
> a shared workspace file (e.g. `scripts/test-setup.js`) and import from there.

## 2. Test File Structure

| Aspect            | Convention                                                    |
|-------------------|---------------------------------------------------------------|
| **Location**      | `packages/components/<kebab>/__tests__/<kebab>.test.js`       |
| **Naming**        | `<kebab-name>.test.js`                                        |
| **Module system** | ESM (`import`/`export`) — **not** CommonJS                    |
| **Style**         | `describe` / `it` blocks from `node:test`                     |
| **Assertions**    | `node:assert/strict`                                          |

### Running Tests

Per-component (from the component directory):

```bash
node --test ./__tests__/*.test.js
```

All components from the repo root:

```bash
node --test packages/components/**/__tests__/*.test.js
```

### package.json Script

Each component's `package.json` should have:

```json
{
  "scripts": {
    "test": "node --test ./__tests__/*.test.js"
  }
}
```

## 3. Testing Component Registration

Verify that importing a component triggers `componentDecorator` and registers
the element in the Custom Elements registry.

```js
import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { setupDOM, teardownDOM } from './setup.js';

describe('<PascalName> registration', () => {
  before(() => {
    setupDOM();
    // Dynamic import AFTER DOM globals are in place
  });

  after(() => teardownDOM());

  it('should be registered as a custom element', async () => {
    await import('../lib/<kebab>.js');
    const Ctor = customElements.get('wcag-<kebab>');
    assert.ok(Ctor, 'wcag-<kebab> should be defined in the registry');
    assert.strictEqual(Ctor.extendsElement, '<native-tag>');
  });

  it('should be exposed on the global wcagUI namespace', async () => {
    assert.ok(globalThis.wcagUI.<PascalName>, 'wcagUI.<PascalName> should exist');
  });
});
```

> **Important:** Import the component **dynamically** (`await import(...)`) inside
> `before()` or inside a test, so the DOM globals are set up first.

## 4. Testing DOM Rendering

Create an element using the Customized Built-in Element syntax and verify
its DOM structure after the constructor runs.

```js
describe('<PascalName> rendering', () => {
  before(async () => {
    setupDOM();
    await import('../lib/<kebab>.js');
  });
  after(() => teardownDOM());

  it('should create an element with is="wcag-<kebab>"', () => {
    const el = document.createElement('<native-tag>', { is: 'wcag-<kebab>' });
    document.body.appendChild(el);

    assert.strictEqual(el.getAttribute('is'), 'wcag-<kebab>');
    assert.ok(el instanceof HTMLButtonElement); // adjust to the base class
  });

  it('should wrap itself with a label (form controls)', () => {
    const el = document.createElement('input', { is: 'wcag-input' });
    el.setAttribute('aria-label', 'Email');
    document.body.appendChild(el);

    const label = el.closest('label');
    assert.ok(label, 'Input should be wrapped in a <label>');
    assert.match(label.textContent, /Email/);
  });
});
```

### Cleanup Pattern

Always remove created elements after each test to avoid cross-contamination:

```js
import { afterEach } from 'node:test';

afterEach(() => {
  document.body.innerHTML = '';
});
```

## 5. Testing Attributes

Components define observed attributes in `<kebab>.attributes.js`. Each key
maps to a callback invoked on attribute change.

```js
describe('<PascalName> attributes', () => {
  let el;

  before(async () => {
    setupDOM();
    await import('../lib/<kebab>.js');
  });
  after(() => teardownDOM());

  beforeEach(() => {
    el = document.createElement('<native-tag>', { is: 'wcag-<kebab>' });
    document.body.appendChild(el);
  });
  afterEach(() => { document.body.innerHTML = ''; });

  it('should react to "open" attribute change', () => {
    el.setAttribute('open', '');
    assert.strictEqual(el.getAttribute('aria-expanded'), 'true');

    el.removeAttribute('open');
    assert.strictEqual(el.getAttribute('aria-expanded'), 'false');
  });

  it('should update label text when aria-label changes', () => {
    el.setAttribute('aria-label', 'New Label');
    const label = el.closest('label');
    assert.ok(label);
    assert.match(label.textContent, /New Label/);
  });
});
```

## 6. Testing Events

Components dispatch custom events via `events.dispatchComponentEvent`. The
custom event name follows the pattern `wcag-<kebab>.<event-name>`.

```js
import { describe, it, before, after, afterEach, mock } from 'node:test';
import assert from 'node:assert/strict';
import { setupDOM, teardownDOM } from './setup.js';

describe('<PascalName> events', () => {
  let el;

  before(async () => {
    setupDOM();
    await import('../lib/<kebab>.js');
  });
  after(() => teardownDOM());

  beforeEach(() => {
    el = document.createElement('<native-tag>', { is: 'wcag-<kebab>' });
    document.body.appendChild(el);
  });
  afterEach(() => { document.body.innerHTML = ''; });

  it('should dispatch "wcag-<kebab>.change" on value change', () => {
    const handler = mock.fn();
    el.addEventListener('wcag-<kebab>.change', handler);

    el.value = 'test';
    el.dispatchEvent(new Event('change', { bubbles: true }));

    assert.strictEqual(handler.mock.callCount(), 1);
    const detail = handler.mock.calls[0].arguments[0].detail;
    assert.strictEqual(detail.value, 'test');
  });

  it('should dispatch "wcag-<kebab>.focus" on focus', () => {
    const handler = mock.fn();
    el.addEventListener('wcag-<kebab>.focus', handler);

    el.dispatchEvent(new Event('focus'));

    assert.strictEqual(handler.mock.callCount(), 1);
  });
});
```

### Cross-Component Events

Some components listen to events from child components (e.g. Accordion listens
to `wcag-details.toggle`):

```js
it('should react to child "wcag-details.toggle" event', () => {
  const accordion = document.createElement('section', { is: 'wcag-accordion' });
  const details = document.createElement('details', { is: 'wcag-details' });
  accordion.appendChild(details);
  document.body.appendChild(accordion);

  const handler = mock.fn();
  accordion.addEventListener('wcag-accordion.toggle', handler);

  details.dispatchEvent(new CustomEvent('wcag-details.toggle', { bubbles: true }));

  assert.strictEqual(handler.mock.callCount(), 1);
});
```

## 7. Testing Lifecycle

### connectedCallback

```js
it('should run connectedCallback when appended to DOM', () => {
  const el = document.createElement('<native-tag>', { is: 'wcag-<kebab>' });
  // Element is created but NOT connected yet

  document.body.appendChild(el); // triggers connectedCallback

  // Verify side effects: event listeners attached, ARIA attributes set, etc.
  assert.ok(el.getAttribute('aria-expanded') !== null);
});
```

### disconnectedCallback

```js
it('should clean up when removed from DOM', () => {
  const el = document.createElement('<native-tag>', { is: 'wcag-<kebab>' });
  document.body.appendChild(el);

  el.remove(); // triggers disconnectedCallback

  // Verify listeners removed, observers disconnected, etc.
});
```

## 8. Conventions & Anti-Patterns

### Do

- Use `node:assert/strict` — never bare `node:assert`.
- Use `describe` / `it` for structure (`node:test`).
- Use `mock.fn()` from `node:test` for spies — no external mocking libs.
- Test the **public API**: attributes, DOM output, dispatched events.
- Clean up DOM (`document.body.innerHTML = ''`) in `afterEach`.
- Import components **dynamically** after `setupDOM()`.
- Use `beforeEach` to create a fresh element per test.

### Do Not

- Do not test private fields (`#guid`, `#init`).
- Do not import internal decorator machinery in tests.
- Do not use CommonJS (`require`) — all tests must be ESM.
- Do not install Jest, Vitest, Mocha, or any external test runner.
- Do not create CSS snapshot tests or E2E tests (out of scope).
- Do not assert on internal implementation details — only observable behavior.
- Do not rely on test execution order; each test must be independent.

### Assertion Quick Reference

| Assertion                     | Use case                     |
|-------------------------------|------------------------------|
| `assert.ok(value)`            | Truthy check                 |
| `assert.strictEqual(a, b)`   | Strict equality              |
| `assert.deepStrictEqual(a,b)`| Object / array deep equality |
| `assert.match(str, /regex/)` | Regex match on strings       |
| `assert.throws(fn)`          | Sync error                   |
| `assert.rejects(asyncFn)`    | Async error                  |
