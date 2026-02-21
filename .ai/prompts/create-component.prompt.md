# Create a New Component

## Prompt

Create a new wcag-ui component called `<ComponentName>`.

Follow these steps:

1. Identify the most semantically appropriate native HTML element to extend
2. Run `pnpm component:add --component-name="<ComponentName>"`
3. Implement the class in `lib/<kebab>.js` using the `componentDecorator` pattern
4. Define observed attributes in `lib/<kebab>.attributes.js`
5. Define event handlers in `lib/<kebab>.events.js`
6. Implement styles in `lib/styles/_core.css` following the layer pattern
7. Update the HTML demo page at `src/components-<kebab>.html`
8. Verify with `pnpm lint` and `pnpm start`

## Variants

### Form Control

Create a new form control wcag-ui component called `<ComponentName>` that extends `<input|select|textarea>`.

Ensure:
- Extend the correct native element (`HTMLInputElement`, etc.)
- Implement the `aria-label` → label wrapping pattern in `#init()`
- Add `sr-only` to the original input if needed
- Implement states: checked, disabled, focus, invalid
- Create `::before`/`::after` pseudo-elements for custom visual appearance
- Handle events: `input`, `change`, `focus`, `blur`, `invalid`
- Support `aria-disabled="true"` in addition to `disabled`

### Container

Create a new container wcag-ui component called `<ComponentName>` that extends `<section>`.

Ensure:
- Use `MutationObserver` if needed to react to child changes
- Implement `update()` method to synchronize state
- Generate GUID with `helpers.strings.guid()` for IDs
- Set `aria-controls` and `aria-expanded` where appropriate
- Handle the `name` attribute for grouping if relevant
