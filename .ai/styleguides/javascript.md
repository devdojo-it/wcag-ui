# JavaScript Conventions — wcag-ui

## JS Component Structure

Every component has **3 required files** under `lib/`:

| File | Responsibility |
|------|---------------|
| `<kebab>.js` | Main class, `extends` a native `HTML*Element` |
| `<kebab>.attributes.js` | Default export: dictionary `{ attributeName: callback(oldValue, newValue) }` |
| `<kebab>.events.js` | Default export: dictionary `{ eventName: handler(e) }` |

## Registration Pattern

Components do **not** call `customElements.define()` directly. They use the decorator in the `static {}` block:

```js
import { componentDecorator } from '@wcag-ui/core';
import attributes from './<kebab>.attributes';
import events from './<kebab>.events';

export class ComponentName extends HTMLElement {
  static extendsElement = 'section'; // extended native HTML element
  static attributes = attributes;
  static events = events;

  static {
    componentDecorator(this);
  }

  constructor() {
    super();
    this.#init();
  }

  #init() {
    // setup DOM, attributes, GUID, MutationObserver
  }
}
```

`componentDecorator` automatically performs:
1. Generates the `wcag-<kebab>` tag from the PascalCase class name
2. Calls `customElements.define()` with the `extends` option
3. Injects lifecycle, handlers, and `observedAttributes`
4. Exposes the class on `self.wcagUI[ComponentName]`

## Native Element to Extend

Choose the most semantically specific native HTML element:

| Component type | `extendsElement` | Base class |
|----------------|------------------|-------------|
| Button | `'button'` | `HTMLButtonElement` |
| Text input | `'input'` | `HTMLInputElement` |
| Checkbox / Radio / Switch | `'input'` | `HTMLInputElement` |
| Textarea | `'textarea'` | `HTMLTextAreaElement` |
| Select | `'select'` | `HTMLSelectElement` |
| Dialog / modal | `'dialog'` | `HTMLDialogElement` |
| Details disclosure | `'details'` | `HTMLDetailsElement` |
| Generic container | `'section'` | `HTMLElement` |

## Lifecycle

| Hook | When invoked |
|------|----------------------|
| `constructor()` → `#init()` | Element creation |
| `onConnected()` | Optional — when the element is inserted into the DOM |
| `onDisconnected()` | Optional — when the element is removed from the DOM |
| `onAttributeChanged(name, old, new)` | Optional — generic hook for any attribute |

Attribute routing is automatic: the `open` attribute generates `handleOpenAttributeChanged`, `aria-label` generates `handleAriaLabelAttributeChanged`.

## JS Naming

### Classes and Variables

| Type | Convention | Example |
|------|-------------|---------|
| Component class | PascalCase | `TreeView`, `ScrollSpy` |
| Private properties/methods | `#` prefix | `#guid`, `#init()` |
| Public methods | camelCase | `update()`, `buildNav()` |
| Unused parameters | `_` prefix | `_e`, `_oldValue` |
| Static properties | camelCase | `static extendsElement` |

Additional naming guidance:
- Use `camelCase` for all variables, functions, and properties (PascalCase only for classes).
- Avoid numbers in names — let numbers do the numbers.
- Always put effort into naming: if it is hard to name, you probably gave it extra responsibility. Give at least a 3-letter meaningful name.
- Make constants `UPPER_SNAKE_CASE` to signal they should not be changed.

### Import/Export

```js
// Named export for the component class
export class Accordion extends HTMLElement { ... }

// Default export for attributes and events
export default { ... };

// Import from core — only what's needed
import { componentDecorator } from '@wcag-ui/core';
import { componentDecorator, helpers } from '@wcag-ui/core';
import { events } from '@wcag-ui/core';

// Import from DOM — always as namespace
import { DOM } from '@wcag-ui/dom';

// Local imports — default import
import attributes from './accordion.attributes';
import events from './accordion.events';
```

## Event Handling

### Definition (`.events.js` file)

Keys are native DOM event names (`click`, `focus`, `blur`, `input`, `change`, `toggle`):

```js
import { events } from '@wcag-ui/core';

export default {
  input: function (e) {
    events.dispatchComponentEvent.call(this, 'input', { value: this.value }, e);
  },
  change: function (e) {
    events.dispatchComponentEvent.call(this, 'change', { value: this.value }, e);
  },
};
```

### Custom Event Dispatching

```js
// Produces a CustomEvent: "wcag-dialog.toggle"
events.dispatchComponentEvent.call(this, 'toggle', { state });
```

Custom event naming is: `wcag-<component-kebab>.<event-name>`.

### Cross-component Listeners

```js
// accordion.events.js — listens to events from child component
'wcag-details.toggle': function (_e) {
  events.dispatchComponentEvent.call(this, 'toggle', {});
}
```

## Attribute Handling

### Definition (`.attributes.js` file)

```js
import { events } from '@wcag-ui/core';

export default {
  'aria-label': function (_oldValue, newValue) {
    // reacts to aria-label change
    if (this.label) {
      this.label.childNodes[0].textContent = newValue;
      events.dispatchComponentEvent.call(this, 'aria-label.change', { label: newValue });
    }
  },
  name: function () {
    this.update();
  },
};
```

## Available Utilities

### `@wcag-ui/core`

| Export | API |
|--------|-----|
| `componentDecorator` | Decorator for registering components |
| `helpers.strings` | `guid()`, `microId()`, `stripEmojis()`, `toCapitalCase()`, `toCamelCase()`, `toPascalCase()`, `toKebabCase()`, `toSnakeCase()`, `toBoolean()` |
| `helpers.types` | `trueTypeOf()`, `isNull()`, `isUndefined()`, `isNullOrUndefined()`, `isObject()`, `isFunction()`, `isString()`, `isArray()`, `isBoolean()`, `isNumber()`, `isDate()`, `isRegExp()`, `isSymbol()` |
| `helpers.debounce` | `debounce(callback, threshold=300)` |
| `helpers.throttle` | `throttle(callback, threshold=300)` |
| `helpers.files` | `buildFileList()`, `buildFileArray()` |
| `events.dispatchComponentEvent` | Dispatch namespaced events `wcag-<name>.<event>` |
| `events.dispatchCustomEvent` | Dispatch generic `CustomEvent` |
| `events.cancelEvent` | `preventDefault` + `stopPropagation` + `stopImmediatePropagation` |
| `encoding` | `base64`, `jwt`, `md5` |
| `coreStyleSheet` | `CSSStyleSheet` with layer declaration |

### `@wcag-ui/dom`

| Method | Usage |
|--------|-----|
| `DOM.wrapElement(el, opts)` | Wraps an element in a wrapper |
| `DOM.insertHTML(html, target, pos)` | Inserts sanitized HTML (before/prepend/append/after) |
| `DOM.insertElement(el, target, pos)` | Inserts a real element |
| `DOM.createElement({ tag, classes, attributes, content })` | Creates element with options |
| `DOM.createFragment(...children)` | Creates `DocumentFragment` |
| `DOM.ensureElement(elOrOpts)` | Returns it if Element, otherwise creates it |
| `DOM.findNodes(query, node)` | Finds nodes by `textContent` |
| `DOM.ancestors(el, selector)` | Traverses ancestors |
| `DOM.ancestor(el, selector)` | First matching ancestor |
| `DOM.getAllSiblings(el)` | All siblings |
| `DOM.sanitizeHTML(html)` | Sanitizes HTML (removes scripts, `on*` handlers) |
| `DOM.containsHTML(str)` | Checks if a string contains HTML |
| `DOM.outerHTML(el, excludeContent)` | Outer HTML with content exclusion option |

## JSDoc

Document classes, methods, and utility functions with JSDoc:

```js
/**
 * wcagUI Accordion class
 *
 * @export
 * @class Accordion
 * @extends {HTMLElement}
 */
export class Accordion extends HTMLElement {
  /**
   * static initialization
   *
   * @static
   * @memberof Accordion
   */
  static {
    componentDecorator(this);
  }
}
```

For helper functions, use `@example` with caption:

```js
/**
 * @example <caption>eg. usage</caption>
 * const id = guid();
 * console.log(id); // 'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx'
 *
 * @return {string}
 */
```

## Biome Ignore

In templates, use the Biome comment for unused imports:

```js
/** biome-ignore-all lint/correctness/noUnusedImports: <this is a template> */
```

## Anti-Patterns to Avoid

- ❌ Do not use `document.createElement` directly → use `DOM.createElement()`
- ❌ Do not use `innerHTML` directly → use `DOM.insertHTML()` (sanitizes)
- ❌ Do not register custom elements manually → use `componentDecorator`
- ❌ Do not import from long relative paths between packages → use bare specifiers (`@wcag-ui/core`)
- ❌ Do not use CommonJS in source files (only in legacy test files)
- ❌ Do not add external dependencies to component packages
- ❌ Never use `eval` — it is unnecessary and dangerous
- ❌ Do not use `var` — use `const` by default, `let` only when reassignment is needed

---

## General JavaScript Best Practices

The following are general-purpose JavaScript conventions that complement the project-specific rules above.

### Prefer `const` and Immutability

Use `const` by default. Switch to `let` only when reassignment is truly needed. Avoid mutating data in place — work on copies and minimize side effects.

### Function Expressions over Function Declarations

Function declarations are hoisted, which can cause non-obvious behavior. Prefer function expressions so the definition always appears before usage:

```js
// preferred
export const add = function (a, b) {
  return a + b;
};
```

### Prefer Arrow Functions

Arrow functions inherit `this` from the enclosing scope, eliminating the need for `bind`/`apply`:

```js
const add = (a, b) => a + b;
```

### Prefer Pure Functions

Ensure functions do not mutate their arguments or data in their outer scope. Return new values instead.

### Prefer Class over Prototype-based Constructors

If you find yourself reaching for `prototype`, use `class` syntax instead — it is cleaner and more widely understood.

### Use Destructuring

Destructuring makes it explicit what you need from objects and arrays and provides opportunity to rename for clarity:

```js
const { name, age } = person;
const [first, ...rest] = items;
```

### Only Work with Data You Need

Extract and clean up only the data required before passing it around. This applies especially to API responses.

### Always Use `===`

Triple equals checks both value and type. Make it a habit to avoid loose equality (`==`).

### Avoid Global Variables

Do not pollute global scope. Global names may collide with third-party code or colleague additions.

### Wrap Loose Declarations in Blocks

Avoid name clashes and accidental global access by wrapping temporary logic in its own block scope `{}`.

### Organize Your Declarations

Place all declarations at the top, constants first, then variables. Use `UPPER_SNAKE_CASE` for constants to signal immutability.

### Don't Initialize with `undefined`

JavaScript already makes uninitialized declarations `undefined`. Assigning `undefined` explicitly makes debugging harder — prefer `null` when you need to express "no value". Always initialize declarations.

### Use Default Parameter Values

Defaults are more elegant than throwing errors for missing arguments:

```js
const greet = (name = 'World') => `Hello, ${name}!`;
```

### Always Have a Default Case for `switch`

Something can go wrong — ensure you catch it:

```js
switch (action) {
  case 'open':
    open();
    break;
  default:
    handleUnknown(action);
}
```

### Avoid the `new` Keyword (Except Class Instances)

Using `new` outside of class instantiation (e.g., `new Object()`, `new Array()`) can slow compilers and is unnecessary.

### Add Meaningful Comments

Only comment non-obvious, hacky, or context-dependent code. Annotate third-party integration points and architectural decisions. Avoid commenting the obvious.

### Keep Ternaries Simple

Two levels deep at most. Anything longer should be an `if` statement or `switch` for readability and debuggability.

### Simplify with Optional Chaining

Replace nested existence checks with `?.`:

```js
const city = user?.address?.city;
```

### Prefer Promises over Callbacks

Promises (and `async`/`await`) produce more readable asynchronous code. Anything callback-based can be "promisified."

### `for` Loops vs `.forEach`

Don't convert data to an array just to call `.forEach`. Standard `for` loops are faster and support `break`/`continue`. Use `for...of` for iterables (arrays, strings, Maps, Sets). Avoid `for...in` for iteration as it traverses prototype keys and is the slowest option.

### Optimize Loops

Avoid nesting or chaining iteration methods unnecessarily — assess your looping strategy to ensure no redundant or combinable loops. Note: modern engines already optimize basic `for` loops, so micro-optimizations are rarely needed.

### Always `try...catch` JSON Methods

Never trust data passed to `JSON.stringify` or `JSON.parse` — wrap them to prevent silent failures:

```js
try {
  const data = JSON.parse(raw);
} catch (e) {
  console.error('Invalid JSON', e);
}
```

### Prefer Template Strings

Template literals allow embedded expressions and preserve formatting:

```js
const message = `Hello, ${name}! You have ${count} items.`;
```

### Prefer the Rest Operator over `arguments`

The rest operator works with arrow functions (where `arguments` is unavailable) and produces a real array:

```js
const sum = (...nums) => nums.reduce((a, b) => a + b, 0);
```

### Use `globalThis` for Global Access

`globalThis` works consistently across environments (browser, Web Worker, Node):

```js
globalThis.myLib = { ... };
```

### Semicolons — Always

Always terminate statements with semicolons. Biome enforces this in the project, but the habit matters even outside linting.

### Use Regex for String Manipulation

Regex is faster than manual index-based manipulation, encapsulates logic in a single expression, and leaves the original string untouched:

```js
const cleaned = input.replace(/[^a-z0-9]/gi, '');
```

### IIFE for Early Setup and Utility Libraries

Immediately Invoked Function Expressions are useful for executing setup logic before the rest of the code runs, and for encapsulating small utility APIs:

```js
const utils = (() => {
  const internal = () => { /* ... */ };
  return { publicMethod: internal };
})();
```

### Avoid Repeating Yourself

Turn repeated patterns into small, generic, testable utility functions. Reuse over duplication.

### Never Trust External Data

Validate type and format of all data coming from users or unknown APIs before operating on it. Implement basic anti-XSS measures when integrating external code.

### Readable > Performant (Unless You Need Performance)

Favor clarity over micro-optimizations. Only sacrifice readability when measurable performance gains are required.

### Be Careful with Truthy/Falsy Checks

Don't rely solely on truthy/falsy evaluation — be specific in your checks to avoid subtle bugs. Use the nullish coalescing operator `??` to handle `null`/`undefined` explicitly:

```js
const value = arg ?? '';
```

### Prefer Ternary over Logical `||`/`&&` for Defaults

The `||` and `&&` operators evaluate truthiness, which can produce undesired results with `0`, `""`, or `false`. Prefer explicit ternaries or `??`.

### Be Careful with Automatic Type Conversions

JavaScript converts types implicitly — "truthy" becomes `true`, "falsy" becomes `false`, and math between numbers and strings may concatenate. Always be explicit.

### Don't Abuse Weird JavaScript "Features"

Avoid:
- Updating `array.length` directly
- The `with` keyword
- The `void` keyword
- Mutating native prototypes (`Date`, `Array`, `Object`)
- Passing strings to `setTimeout`/`setInterval`

Just because the language allows it doesn't mean you should use it.

### Functions Should Do One Thing

If a function is hard to name, it likely has too many responsibilities. Keep functions focused and single-purpose.

### Avoid Unnecessary Declarations

Only declare variables when strictly necessary. Excessive declarations hint at a lack of proper code design.
