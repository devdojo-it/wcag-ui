# Add State to a Component

## Prompt

Add a new CSS state `<stateName>` to the `<componentName>` component.

Follow these steps:

1. Create `lib/styles/states/_<state>.css`
2. Define tokens on `:root` with prefix `--wcag-<component>--s-<abbr>--`
3. Use `:where()` to wrap the state pseudo-class or attribute selector
4. Override **intermediate variables**, NOT final CSS properties
5. Add the import in `states/states.css`:

```css
@import "./_<state>.css" layer(states.<state>);
```

## Example

```css
:root {
  --wcag-<component>--s-<abbr>--color: var(--wcag-c--...);
  --wcag-<component>--s-<abbr>--background-color: var(--wcag-c--...);
  --wcag-<component>--s-<abbr>--cursor: not-allowed; /* for disabled */
}

[is="wcag-<component>"]:where(:<pseudo-class>, [<aria-attribute>]) {
  --wcag-<component>--color: var(--wcag-<component>--s-<abbr>--color);
  --wcag-<component>--background-color: var(--wcag-<component>--s-<abbr>--background-color);
}
```
