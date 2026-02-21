# Testing Conventions — wcag-ui

## Test Stack

| Tool | Purpose |
|------|---------|
| **Node.js built-in test runner** (`node:test`) | Test framework — `describe`, `it`, `before`, `after`, `mock` |
| **`node:assert/strict`** | Assertion library |
| **happy-dom** | Lightweight DOM environment with Custom Elements support |
| **axe-core** | Automated WCAG 2.2 AA accessibility auditing |

## File Structure

| File type | Naming | Location |
|-----------|--------|----------|
| Unit tests | `<kebab>.test.js` | `packages/components/<kebab>/__tests__/` |
| A11y tests | `<kebab>.a11y.test.js` | `packages/components/<kebab>/__tests__/` |
| Shared setup | `setup.js` | `packages/components/<kebab>/__tests__/` |

## Running Tests

```bash
# Run all tests for a component
node --test ./__tests__/*.test.js

# Run only a11y tests
node --test ./__tests__/*.a11y.test.js
```

### Package.json Scripts

```json
{
  "scripts": {
    "test": "node --test ./__tests__/*.test.js",
    "test:a11y": "node --test ./__tests__/*.a11y.test.js"
  }
}
```

## Module System

Tests use **ESM** (`import`/`export`), matching the rest of the project. Legacy CommonJS test scaffolds should be migrated.

## What to Test

### Unit Tests (`<kebab>.test.js`)

1. **Registration**: `customElements.get('wcag-<name>')` returns the class
2. **Rendering**: element created with `document.createElement('<tag>', { is: 'wcag-<name>' })` has correct DOM structure
3. **Attributes**: attribute callbacks fire correctly, aria-label → label transformation works
4. **Events**: custom events dispatched with correct `detail` payload
5. **Lifecycle**: `connectedCallback` / `disconnectedCallback` behavior
6. **States**: checked, disabled, open/close

### Accessibility Tests (`<kebab>.a11y.test.js`)

1. **axe-core audit**: zero violations with `['wcag2a', 'wcag2aa', 'wcag22aa']` ruleset
2. **ARIA attributes**: correct `aria-expanded`, `aria-disabled`, `aria-controls`, `aria-pressed`
3. **Label association**: form controls have visible labels
4. **Focus management**: focus ring exists, focus not obscured
5. **Target size**: interactive targets ≥ 24×24 CSS pixels
6. **Keyboard navigation**: Tab, Enter, Space, Escape, Arrow keys as appropriate

## Detailed Skills

- See `.ai/skills/custom-element-testing/SKILL.md` for full unit testing patterns
- See `.ai/skills/accessibility-testing/SKILL.md` for full a11y testing patterns
