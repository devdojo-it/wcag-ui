# Add Design Token

## Prompt

Add a new global design token to the wcag-ui foundations.

Follow these steps:

1. Identify the token category (color, spacing, radius, elevation)
2. Follow the naming convention: `--wcag-<category>--<name>`
3. If it's a color: define `--light` and `--dark` variants + use `light-dark()`
4. If it's spacing: use the modular scale with `pow()` and ratio `1.25`
5. Add the token in the appropriate CSS file under `packages/css/foundations/lib/`
6. Document in `.ai/context/design-tokens.md`

## Color Token Template

```css
:root {
  --wcag-c--<name>--light: hsl(...);
  --wcag-c--<name>--dark: hsl(...);

  @supports (color: light-dark(var(--wcag-c--light), var(--wcag-c--dark))) {
    --wcag-c--<name>: light-dark(
      var(--wcag-c--<name>--light),
      var(--wcag-c--<name>--dark)
    );
  }
}

@supports not (color: light-dark(var(--wcag-c--light), var(--wcag-c--dark))) {
  @media (prefers-color-scheme: dark) {
    :root { --wcag-c--<name>: var(--wcag-c--<name>--dark); }
  }
  @media (prefers-color-scheme: light) {
    :root { --wcag-c--<name>: var(--wcag-c--<name>--light); }
  }
}
```
