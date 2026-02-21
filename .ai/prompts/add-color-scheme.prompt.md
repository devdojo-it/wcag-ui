# Add Color Scheme Support

## Prompt

Add light/dark color scheme support to a new token or component.

Follow these steps:

1. Define the light and dark variants:

```css
:root {
  --wcag-<token>--light: <light-value>;
  --wcag-<token>--dark: <dark-value>;
}
```

2. Use `light-dark()` with `@supports`:

```css
@supports (color: light-dark(var(--wcag-c--light), var(--wcag-c--dark))) {
  :root {
    --wcag-<token>: light-dark(
      var(--wcag-<token>--light),
      var(--wcag-<token>--dark)
    );
  }
}
```

3. Add fallback with `prefers-color-scheme`:

```css
@supports not (color: light-dark(var(--wcag-c--light), var(--wcag-c--dark))) {
  @media (prefers-color-scheme: dark) {
    :root { --wcag-<token>: var(--wcag-<token>--dark); }
  }
  @media (prefers-color-scheme: light) {
    :root { --wcag-<token>: var(--wcag-<token>--light); }
  }
}
```
