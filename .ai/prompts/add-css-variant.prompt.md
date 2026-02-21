# Add CSS Variant to a Component

## Prompt

Add a new CSS variant `<variantName>` to the `<componentName>` component.

Follow these steps:

1. Create `lib/styles/variants/_<variant>.css` with the token definitions:

```css
:root {
  --wcag-<component>--v-<abbr>--color: ...;
  --wcag-<component>--v-<abbr>--background-color: ...;
  --wcag-<component>--v-<abbr>--border-color: ...;
  --wcag-<component>--v-<abbr>--s-hov--color: ...;
  --wcag-<component>--v-<abbr>--s-hov--background-color: ...;
  --wcag-<component>--v-<abbr>--s-hov--border-color: ...;
  /* repeat for s-foc, s-act, s-dis */
}

[is="wcag-<component>"][<variant>] {
  --wcag-<component>--color: var(--wcag-<component>--v-<abbr>--color);
  --wcag-<component>--background-color: var(--wcag-<component>--v-<abbr>--background-color);
  /* wire all state variables */
}
```

2. Add the import in `variants/variants.css`:

```css
@import "./_<variant>.css" layer(variants.<variant>);
```

3. Add an example in the HTML demo page
4. Verify with `pnpm start`
