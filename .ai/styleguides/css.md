# CSS Styleguide — wcag-ui

> Merged styleguide: project-specific conventions (priority) + general CSS best practices.

---

## CSS Cascade Layers System

wcag-ui uses a hierarchical `@layer` system to control the cascade without specificity conflicts.

### Global Order (declared in `foundations.css`)

```css
@layer wcag-ui.core, wcag-ui.foundations, wcag-ui.components;
```

Priority: **core < foundations < components** — later layers win in the cascade.

### Layers and Sub-layers

| Layer | Sub-layer | Content |
|-------|-------------|-----------|
| `wcag-ui.core` | `.reset`, `.helpers`, `.focus` | CSS reset, flex helper, sr-only, global focus |
| `wcag-ui.core.helpers` | `.flex`, `.sr-only` | Layout and accessibility utilities |
| `wcag-ui.foundations` | `.colors`, `.elevations`, `.spacings`, `.radiuses` | Global design tokens |
| `wcag-ui.foundations.typography` | `.fonts` | Font face, typographic scale |
| `wcag-ui.foundations.grid-system` | `.variables`, `.container`, `.row`, `.column` | Grid system |
| `wcag-ui.foundations.iconography` | — | Icon fonts |
| `wcag-ui.components.<name>` | (variants, sizes, modifiers, states) | Per component |

### Layers in Components

The entry-point file (`<kebab>.css`) imports `_core.css` into the component's layer:

```css
/* Simple component */
@import "./_core.css" layer(wcag-ui.components.accordion);
```

For complex components, additional sub-layers:

```css
/* Complex component (button) */
@import "./_core.css" layer(wcag-ui.components.button);
@import "./variants/variants.css" layer(wcag-ui.components.button);
@import "./sizes/sizes.css" layer(wcag-ui.components.button);
@import "./modifiers/modifiers.css" layer(wcag-ui.components.button);
@import "./states/states.css" layer(wcag-ui.components.button);
```

Sub-files use relative layers:

```css
/* variants/variants.css */
@import "./_primary.css" layer(variants.primary);
@import "./_secondary.css" layer(variants.secondary);
```

## CSS Custom Properties — Naming Convention

### Global Tokens

Pattern: `--wcag-<category>--<property>`

| Prefix | Domain | Example |
|----------|---------|---------|
| `--wcag-c--` | Colors | `--wcag-c--blue-400`, `--wcag-c--neutral-800` |
| `--wcag-s--` | Spacing | `--wcag-s--400`, `--wcag-s--50` |
| `--wcag-r--` | Radius | `--wcag-r--s`, `--wcag-r--m`, `--wcag-r--l` |
| `--wcag-e--` | Elevations | `--wcag-e--sm`, `--wcag-e--md`, `--wcag-e--lg` |
| `--wcag-f--` | Focus | `--wcag-f--outline-width`, `--wcag-f--outline-color` |
| `--wcag-t--` | Typography | `--wcag-t--font-size`, `--wcag-t--ratio` |
| `--wcag-gs--` | Grid System | `--wcag-gs--cols`, `--wcag-gs--container--size` |
| `--wcag-flex--` | Flex helper | `--wcag-flex--gap`, `--wcag-flex--direction` |

### Component Tokens — Multi-Level Structure

```
--wcag-<component>--<property>                          → base
--wcag-<component>--<dimension>--<property>             → dimension (sm, md, lg)
--wcag-<component>--v-<variant>--<property>             → variant
--wcag-<component>--v-<variant>--s-<state>--<property>  → variant + state
--wcag-<component>--s-<state>--<property>               → state
--wcag-<component>--m-<modifier>--<property>            → modifier
```

Abbreviations for variants/states/modifiers:

| Abbreviation | Meaning |
|---------------|-------------|
| `v-pri` | variant primary |
| `v-sec` | variant secondary |
| `v-ter` | variant tertiary |
| `v-des` | variant destructive |
| `s-hov` | state hover |
| `s-foc` | state focus |
| `s-act` | state active |
| `s-dis` | state disabled |
| `m-circle` | modifier circle |
| `m-square` | modifier square |

### Double-Mapping Pattern

Tokens are defined on `:root` and then wired into the component selector:

```css
/* Dimension token definition */
:root {
  --wcag-button--md--height: 4.4rem;
  --wcag-button--md--padding-inline: 2rem;
}

/* Selector mapping — medium is the default */
[is="wcag-button"] {
  --wcag-button--height: var(--wcag-button--md--height);
  --wcag-button--padding-inline: var(--wcag-button--md--padding-inline);
}
```

Variants and states override **intermediate variables**, not final CSS properties:

```css
/* _core.css — final property */
[is="wcag-button"] {
  color: var(--wcag-button--color);
}

/* _hover.css — overrides the variable, not the property */
[is="wcag-button"]:hover {
  --wcag-button--color: var(--wcag-button--s-hov--color);
}
```

## Selectors

### Primary Pattern: `is="wcag-*"`

```css
[is="wcag-button"]    { /* ... */ }
[is="wcag-accordion"] { /* ... */ }
[is="wcag-input"]     { /* ... */ }
```

### Variants with Boolean Attributes

```css
[is="wcag-button"][secondary]   { /* variant */ }
[is="wcag-button"][sm]          { /* dimension */ }
[is="wcag-button"][circle]      { /* modifier */ }
```

### Label Wrapping for Form Controls

Input, textarea, checkbox, radio, switch use `label:has()`:

```css
label:has([is="wcag-input"]) {
  display: inline-flex;
  flex-flow: column nowrap;
}
```

### Pseudo-elements for Custom Controls

Checkbox, radio, switch use `::before`/`::after` for the visual appearance:

```css
label:has([is="wcag-checkbox"]) {
  > span {
    &::before { /* visual box */ }
    &::after  { content: "\e908"; /* check icon */ }
  }
  &:has(:checked) > span::after { opacity: 1; }
}
```

### Grid System: Tags + Attributes

```css
:where(container, [container]) { /* ... */ }
:where(row, [row])             { /* ... */ }
:where(col, [col])             { /* ... */ }
```

## Specificity Management

### 1. `:where()` for Zero Specificity

Used in foundations to avoid interfering with components:

```css
/* Global focus — spec 0 */
:where(:focus-visible, :has(> [sr-only]):focus-within) { /* ... */ }

/* Grid — spec 0 */
:where(container, [container]) { /* ... */ }

/* Typography — spec 0 */
:where(h1, h2, h3, h4, h5, h6, p) { margin: 0; }
```

### 2. `:where()` in Component States

State pseudo-classes are wrapped in `:where()`:

```css
[is="wcag-button"]:where(:focus, :focus-visible) { /* ... */ }
[is="wcag-button"]:where(:active, [aria-pressed="true"]) { /* ... */ }
[is="wcag-button"]:where([disabled], :disabled, [aria-disabled="true"]) { /* ... */ }
```

### 3. CSS Layers as Primary Means

Layer order replaces the need for high specificity.

## Color Scheme — Light/Dark

### Strategy: `light-dark()` with Fallback

```css
:root {
  --wcag-c--blue-400--light: hsl(245, 94%, 74%);
  --wcag-c--blue-400--dark: hsl(245, 73%, 74%);

  /* Modern browsers */
  @supports (color: light-dark(var(--wcag-c--light), var(--wcag-c--dark))) {
    --wcag-c--blue-400: light-dark(
      var(--wcag-c--blue-400--light),
      var(--wcag-c--blue-400--dark)
    );
  }
}

/* Fallback */
@supports not (color: light-dark(var(--wcag-c--light), var(--wcag-c--dark))) {
  @media (prefers-color-scheme: dark) {
    :root { --wcag-c--blue-400: var(--wcag-c--blue-400--dark); }
  }
}
```

In components, use `light-dark()` directly:

```css
:root {
  --wcag-details--background-color: light-dark(
    var(--wcag-c--neutral-20),
    var(--wcag-c--neutral-800)
  );
}
```

## Units of Measurement

| Unit | Used for | Notes |
|-------|-----|------|
| `rem` | Spacing, padding, height, component radius | `1rem = 10px` (reset: `html { font-size: 0.625em }`) |
| `em` | Font size (headings, typographic scale) | Relative to context |
| `px` | Border width, outline width, base radius token | Only for thin/fixed values |
| `vw` | Default container size | `100vw` |

## Modular Scale

### Spacing (ratio 1.25 — Major Third)

```css
:root {
  --wcag-s--ratio: 1.25;
  --wcag-s--400: 1.6rem; /* base */
  --wcag-s--300: calc(var(--wcag-s--400) / var(--wcag-s--ratio));
  --wcag-s--500: calc(var(--wcag-s--400) * var(--wcag-s--ratio));
  /* ... use pow() for higher levels */
}
```

### Typography (ratio 1.2 — Minor Third)

```css
:root {
  --wcag-t--ratio: 1.2;
  --wcag-t--font-size--base: 1.6rem;
}
h1 { --wcag-t--font-size: calc(1em * pow(var(--wcag-t--ratio), 6)); }
h2 { --wcag-t--font-size: calc(1em * pow(var(--wcag-t--ratio), 5)); }
/* ... */
```

## Breakpoints

| Name | Breakpoint | Container size |
|------|------------|---------------|
| iphone max | `width >= 414px` | 375px |
| xs | `width >= 576px` | 540px |
| sm | `width >= 768px` | 720px |
| md | `width >= 1024px` | 960px |
| lg | `width >= 1366px` | 1200px |
| xl | `width >= 1600px` | 1366px |
| xxl | `width >= 1920px` | 1920px |

Modern syntax:

```css
@media screen and (width >= 1024px) { /* ... */ }
```

## File Organization

### Simple Component

```
lib/styles/
├── <kebab>.css      ← Entry point (imports + layer only)
└── _core.css        ← :root variables + base selector + styles
```

### Complex Component

```
lib/styles/
├── <kebab>.css        ← Entry point orchestrator
├── _core.css          ← Base structure
├── variants/
│   ├── variants.css   ← Sub-layer imports
│   ├── _primary.css
│   ├── _secondary.css
│   └── ...
    ├── sizes/
    │   ├── sizes.css
│   ├── _small.css
│   ├── _medium.css
│   └── _large.css
├── modifiers/
│   ├── modifiers.css
│   └── _circle.css
└── states/
    ├── states.css
    ├── _hover.css
    ├── _active.css
    ├── _focus.css
    └── _disabled.css
```

## CSS Import in the Docs Site

```css
/* Foundations — barrel import */
@import "npm:@wcag-ui/foundations";
@import "npm:@wcag-ui/typography";

/* Components — explicit path to .min.css file */
@import "npm:@wcag-ui/accordion/accordion.min.css";
@import "npm:@wcag-ui/button/button.min.css";
```

## Anti-Patterns to Avoid

- ❌ Do not use CSS classes to select wcag-ui components → use `[is="wcag-*"]`
- ❌ Do not use `!important` — the layer system manages the cascade
- ❌ Do not define component tokens outside of `:root` (except in selectors for mapping)
- ❌ Do not use CSS-in-JS or preprocessors (no Sass, no PostCSS custom) → pure native CSS
- ❌ Do not use container queries (not yet in the project's patterns)
- ❌ Do not create custom breakpoints — use those defined in the grid system
- ❌ Do not use `@media (max-width: ...)` → use `@media screen and (width >= ...)`

---

## General CSS Best Practices

> The following sections contain general CSS best practices that complement the project-specific conventions above.

### CSS Properties Hierarchy

Within any selector, properties MUST follow this ordering:

1. **Variables / custom properties** (`--example: 1;`)
2. **Positional properties** (`position`, `inset`, `top`, `right`, `bottom`, `left`, `z-index`)
3. **Display properties** (including flex & grid: `display`, `justify-self`, `grid-template-*`, `gap`)
4. **Visibility properties** (`visibility`, `opacity`, `backface-visibility`)
5. **Box-model properties** (`box-sizing`, `width`, `height`, `aspect-ratio`, `padding`, `border`, `border-radius`, `margin`, `outline`, `outline-offset`)
6. **Colors & backgrounds** (`color`, `background-color`, `background-image`, `box-shadow`, `filter`)
7. **Typography properties** (`font-family`, `font-size`, `font-weight`, `line-height`, `white-space`, `text-align`, `text-shadow`, `vertical-align`)
8. **Transform & motion** (`transform`, `transition`, `will-change`, `animation`)
9. **Behavior / helpers** (`cursor`, `appearance`, `pointer-events`)

```css
[is="wcag-example"] {
  /* 1. custom properties */
  --wcag-example--color: var(--wcag-c--blue-400);

  /* 2. positional */
  position: absolute;
  inset: 0;
  z-index: 1;

  /* 3. display */
  display: flex;
  place-content: center;
  gap: 1rem;

  /* 4. visibility */
  opacity: 1;

  /* 5. box-model */
  box-sizing: border-box;
  width: 10rem;
  padding: 1rem;
  border: 0.1rem solid black;
  border-radius: 0.4rem;
  margin: 1rem;
  outline: 0.3rem solid black;
  outline-offset: 0.3rem;

  /* 6. colors & background */
  color: white;
  background-color: black;

  /* 7. typography */
  font-size: 1.6rem;
  line-height: normal;
  text-align: center;

  /* 8. transform & motion */
  transform: translate();
  transition: opacity 300ms ease-in, width 500ms linear;

  /* 9. behavior */
  cursor: pointer;
  appearance: none;
}
```

### Selector Internal Hierarchy

Inside a single selector block, nested rules MUST follow this ordering:

1. **CSS properties** (following the properties hierarchy above)
2. **Pseudo-class selectors** (`:hover`, `:disabled`, `:checked`, `:read-only`, etc.)
3. **Attribute/variant selectors** (`[aria-expanded="false"]`, `[secondary]`, etc.)
4. **Media queries** (`@media screen and (width >= 1024px) { }`)
5. **Pseudo-element selectors** (`::before`, `::after`, etc.)
6. **Children selectors** (nested element/tag selectors)
7. **Combinator selectors** (`> child`, `~ sibling`, `+ adjacent`, etc.)

```css
[is="wcag-example"] {
  /* properties (css-hierarchy) */
  display: flex;
  color: var(--wcag-example--color);

  /* pseudo-classes */
  &:hover { }
  &:disabled { }

  /* attribute variants */
  &[aria-hidden="true"] {
    display: none;
  }

  /* media queries */
  @media screen and (width >= 1024px) {
    /* repeat css-hierarchy here */
  }

  /* pseudo-elements */
  &::after { }

  /* children */
  span { }
  input { }

  /* combinators */
  > element { }
}
```

### General Coding Rules

1. **Comment complex code**
   Add comments for complex hacks, organizational sections, and non-obvious decisions. Help others (and your future self) understand the reasoning.

2. **Normalize or reset**
   Every browser has default styles that vary. Use a CSS reset or normalize to ensure consistent baseline rendering. (wcag-ui provides this via the `wcag-ui.core.reset` layer.)

3. **Minimize output**
   Before shipping CSS to the browser, minimize it. Smaller files load faster and begin processing sooner.

4. **Lint**
   Ensure your styles follow defined rules and remain consistent, well structured, and aligned with best practices. (wcag-ui uses Biome — run `pnpm lint`.)

5. **Validate**
   Use the W3C CSS validator to verify that CSS follows correct style rules and guidelines.

6. **Avoid hard-to-maintain hacks**
   When a hack is unavoidable, isolate it in a separate file (e.g., `_hacks.css`) for easy tracking and removal.

7. **Be aware of cascade order**
   CSS is cascading — whatever comes last can overwrite previous styles. Order declarations so the intended style wins.

8. **Avoid color names**
   Prefer hex or color functions (`hsl()`, `rgb()`) over named colors like `red` or `cyan`. Not all colors have names, and consistency matters. (wcag-ui uses HSL.)

9. **Remove unused CSS**
   Ship only the CSS you need. Tools like PurgeCSS can identify and strip unused rules.

10. **Separate global vs local style**
    Distinguish styles meant for any selector (global tokens, resets) from component-specific styles. Keep them in separate files. (wcag-ui enforces this via the layer system and `:root` for globals.)

11. **Modularize your style**
    Don't bundle all CSS in one file. Include only the styles needed for the current page. Separate essential styles from non-essential ones (dialogs, notifications, etc.).

12. **Lazy load non-critical stylesheets**
    Defer non-critical CSS using dynamic imports, `<link>` tag techniques, or bundler-based strategies.

13. **Be specific but not overly specific**
    Over-specificity reduces performance, increases bundle size, and signals bad architecture. Under-specificity causes conflicts. Find the balance. (wcag-ui uses `:where()` and layers to manage this.)

14. **Read CSS as the browser does**
    Browsers read selectors right-to-left. `nav ul li a` means: find all `<a>`, filter to those in `<li>`, then `<ul>`, then `<nav>`. Deep nesting is expensive. Keep selectors shallow.

15. **Avoid inline styles**
    The only override for inline styles is `!important`. Keep all styles in external files for maintainability.

16. **Write CSS consistently**
    Consistency matters more than perfection. Follow the same naming, ordering, nesting depth, and methodology throughout.

17. **Prefer shorthand**
    Use shorthand properties (`padding`, `border`, `margin`) whenever possible — less code, easier changes.

18. **Combine common styles**
    Avoid repeating identical rules. Group selectors with comma separation when they share the same style body.

19. **Turn common patterns into utility classes**
    Repetitive style combinations (centering, sr-only, flex helpers) should become reusable utilities. (wcag-ui provides these in `wcag-ui.core.helpers`.)

20. **Use relative units**
    Prefer `em`, `rem`, `%`, `vw`, `vh`, `fr` over fixed `px`/`pt`. The browser is flexible — your styles should be too.

21. **Use double quotes**
    For string values (URLs, `content`, font names), consistently use double quotes. Omitting quotes can cause parsing issues.

### Dependencies Rules

A dependency brings features but also risks: unnecessary weight, potential 0-day exploits, compatibility issues, poor accessibility, rigid UI rules, and strict DOM structures.

1. **Pure HTML+CSS first**
   Always try to find a CSS solution before reaching for JavaScript. Let CSS handle styling and use JS only for triggers and side effects.

2. **Avoid third-party dependencies by default**
   Implement from scratch before relying on external libraries. (wcag-ui is built entirely with native CSS — no frameworks, no preprocessors.)

3. **Separate third-party overrides**
   When overriding a third-party library, put the overrides in a dedicated file for easy tracking and future removal.

### Box Model Rules

Everything in CSS is a box: margin (distance apart), border (walls), padding (space between content and walls), content (text or child boxes), and outline (between border and margin — fundamental for accessibility).

1. **`box-sizing: border-box` everything**

   ```css
   *,
   *::after,
   *::before {
     box-sizing: border-box;
   }
   ```

2. **Let the parent handle spacing, position, and sizing**
   Components in the content flow should let their content and inner padding define their size. The parent container decides position and margin.

3. **Cascade and specificity**
   The top issue in CSS is unintended overrides. Learn how specificity is calculated, in which order styles apply, and how layers resolve conflicts. (wcag-ui uses `@layer` as the primary cascade mechanism.)

4. **Master selectors, combinators, pseudo-classes & pseudo-elements**
   Selectors target elements, combinators target patterns, pseudo-classes target states, pseudo-elements target or inject specific DOM parts.

5. **Display and positioning**
   These properties control flow placement. Go deep in learning `display`, `position`, and their interactions.

### Layout & Responsive Rules

1. **Style to be responsive or at least fluid**
   People access the browser on a variety of devices and sizes. With grid, flex, `clamp()`, and modern CSS features, fluid layouts are achievable without excessive media queries.

2. **Let the content define the size**
   Prefer `max-width`/`max-height` with padding over fixed `width`/`height`, unless the design requires strict dimensions.

3. **Avoid constantly overriding/undoing style**
   If you repeatedly write the same selector with different values, your architecture needs rethinking. Plan variations upfront. (wcag-ui uses the double-mapping pattern for this.)

4. **Place media queries correctly**
   In the dist output, media queries go at the end. In the source, they live inside the specific selector as nested variations.

### Color Rules

1. **Create a variable for every color in the palette**
   Never use raw color values in component styles — reference tokens.

2. **Number color variables by weight**
   Lower numbers are brighter, higher numbers are darker (e.g., `--wcag-c--primary-400`, `--wcag-c--primary-800`).

### Typography Rules

85–90% of a web product is text. A well-structured typography system keeps the entire CSS codebase clean and maintainable.

1. **Consider font loading strategy**
   Use `<link>` tags to load fonts for deferral capability. Add `@font-face` rules at the top of your stylesheet. Look into font-display strategies (FOIT, FOUT, FOFT).

2. **Avoid too many font files**
   Too many fonts cause layout jumps and slow page loads. Include only the fonts actually needed.

3. **Format text with CSS**
   Use `text-transform` for capitalization instead of manually writing all-caps/lowercase in HTML. Easier to change and better for internationalization.

### Media Rules

1. **Composing**
   Use `<figure>` to wrap composed images and/or CSS shapes.

2. **Avoid media queries for responsive images**
   Prefer HTML-based responsive image techniques (`srcset`, `<picture>`) over CSS media queries.

3. **Customize native**
   Customize native media players or embeds instead of pulling in a library.

### Motion Rules

1. **Be aware of rendering-expensive properties**
   `box-shadow`, `border-radius`, `position`, `filter`, `width`, `height` — these trigger complex re-calculations and layouts. Animate `transform` and `opacity` when possible.

2. **Minimize layout-modifying animations**
   Properties like `width`, `height`, `left`, `top`, `margin`, `order` force full layout recalculations. Be careful when animating them at scale.

3. **Use `will-change` as a last resort**
   Only use `will-change` when you've identified actual performance issues with transforms or animations.

4. **Add animation declarations last**
   Put `@keyframes` in a separate file or at the end of your stylesheet so all styles are parsed before animations trigger.

5. **Specify transition properties explicitly**
   Always list the exact property names in `transition`. Using `all` forces the browser to transition everything, hurting performance.

   ```css
   /* ✅ Good */
   transition: opacity 300ms ease-in, width 500ms linear;

   /* ❌ Bad */
   transition: all 300ms ease-in;
   ```

### Accessibility Rules

1. **Don't remove the outline — style it**
   Never set `outline: none`. The outline is critical for keyboard and screen-reader navigation. Style it to match the design. (wcag-ui provides global focus styles via `wcag-ui.core.focus`.)

2. **Disable `pointer-events` only when necessary**
   Let the browser handle element interaction by default. Only disable `pointer-events` when explicitly required by the use case.

### HTML Considerations for CSS

1. **Keep HTML semantics — use CSS for styling**
   Write HTML with content and structure in mind first. Add CSS afterward. Only restructure HTML for styling reasons as a last resort, never at the expense of semantics or accessibility.

2. **Organize CSS to match markup order**
   Matching markup order improves specificity reasoning, keeps HTML and CSS in sync, and makes the DOM visualizable from the stylesheet.

3. **Avoid `id` attributes for styling**
   Use `id` only when semantically required (logo, anchor targets, unique containers). Never use `id` on reusable components. (wcag-ui uses `[is="wcag-*"]` attribute selectors instead.)
