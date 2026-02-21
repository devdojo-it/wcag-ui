# Design Token — wcag-ui

## Principle

All design values (colors, spacing, radius, elevations, typography) are expressed as CSS Custom Properties on `:root`. Components reference them through intermediate variables with their own prefix.

## Colors (`--wcag-c--`)

### Palette

| Family | Available steps | Base HSL |
|----------|-----------------|----------|
| **Neutrals** | `neutral-00` → `neutral-900` (step di ~10% lightness) | `hsl(248, 28%, ...)` |
| **Blue (brand)** | `blue-100` → `blue-800` | `hsl(245, 94%, ...)` light / `hsl(245, 73%, ...)` dark |
| **Green (success)** | `green-100` → `green-500` | `hsl(133, ...)` |
| **Yellow (warning)** | `yellow-100` → `yellow-500` | `hsl(42, ...)` |
| **Red (error)** | `red-100` → `red-500` | `hsl(354, ...)` |

### Naming pattern

```css
--wcag-c--<famiglia>-<step>           /* Composite light-dark value */
--wcag-c--<famiglia>-<step>--light    /* Light-only value */
--wcag-c--<famiglia>-<step>--dark     /* Dark-only value */
```

### Special Colors

```css
--wcag-c--light: hsl(0, 0%, 100%);   /* White */
--wcag-c--dark: hsl(0, 0%, 0%);      /* Black */
```

### Light/Dark System

```css
/* Variant definition */
--wcag-c--blue-400--light: hsl(245, 94%, 74%);
--wcag-c--blue-400--dark: hsl(245, 73%, 74%);

/* Composition with light-dark() */
@supports (color: light-dark(var(--wcag-c--light), var(--wcag-c--dark))) {
  --wcag-c--blue-400: light-dark(
    var(--wcag-c--blue-400--light),
    var(--wcag-c--blue-400--dark)
  );
}

/* Fallback for browsers without light-dark() */
@supports not (...) {
  @media (prefers-color-scheme: dark) {
    :root { --wcag-c--blue-400: var(--wcag-c--blue-400--dark); }
  }
}
```

## Spacing (`--wcag-s--`)

### Modular Scale (ratio 1.25 — Major Third)

```css
:root {
  --wcag-s--ratio: 1.25;
  --wcag-s--400: 1.6rem;        /* Base = 16px */

  /* Levels below base */
  --wcag-s--50:  calc(var(--wcag-s--400) / pow(var(--wcag-s--ratio), 4));
  --wcag-s--100: calc(var(--wcag-s--400) / pow(var(--wcag-s--ratio), 3));
  --wcag-s--200: calc(var(--wcag-s--400) / pow(var(--wcag-s--ratio), 2));
  --wcag-s--300: calc(var(--wcag-s--400) / var(--wcag-s--ratio));

  /* Levels above base */
  --wcag-s--500: calc(var(--wcag-s--400) * var(--wcag-s--ratio));
  --wcag-s--600: calc(var(--wcag-s--400) * pow(var(--wcag-s--ratio), 2));
  /* ... fino a --wcag-s--1900 */
}
```

### Approximate Values

| Token | ~Value | Typical usage |
|-------|---------|------------|
| `--wcag-s--50` | ~0.65rem | Micro spacing |
| `--wcag-s--100` | ~0.82rem | Small gaps |
| `--wcag-s--200` | ~1.02rem | Internal form gaps |
| `--wcag-s--300` | ~1.28rem | Small padding |
| `--wcag-s--400` | 1.6rem | **Base** — standard padding |
| `--wcag-s--500` | ~2.0rem | Large padding |
| `--wcag-s--600` | ~2.5rem | Section gaps |
| `--wcag-s--700` | ~3.1rem | Large gaps |
| `...` | ... | Progressive scale |

## Radius (`--wcag-r--`)

```css
:root {
  --wcag-r--s: 4px;    /* Small */
  --wcag-r--m: 6px;    /* Medium */
  --wcag-r--l: 8px;    /* Large */
}
```

## Elevations (`--wcag-e--`)

```css
:root {
  --wcag-e--sm: 0 0.2rem 2rem 0 hsla(248, 28%, 55%, 0.08);
  --wcag-e--md: 0 0.4rem 4rem -0.2rem hsla(248, 28%, 55%, 0.1);
  --wcag-e--lg: 0 1.8rem 6rem 0.2rem hsla(248, 28%, 55%, 0.1);
}
```

Characteristics: shadow color consistent with neutrals (`hsl(248, 28%, ...)`), low opacity.

## Typography (`--wcag-t--`)

### Font stack

```css
--wcag-t--font-family: "Inter", sans-serif;
```

### REM reset

```css
html { font-size: 0.625em; }  /* 1rem = 10px */
```

### Type Scale (ratio 1.2 — Minor Third)

```css
:root {
  --wcag-t--ratio: 1.2;
  --wcag-t--font-size--base: 1.6rem;  /* = 16px */
  --wcag-t--line-height: 1.333;
}

h1 { --wcag-t--font-size: calc(1em * pow(var(--wcag-t--ratio), 6)); }  /* ~2.986em */
h2 { --wcag-t--font-size: calc(1em * pow(var(--wcag-t--ratio), 5)); }  /* ~2.488em */
h3 { --wcag-t--font-size: calc(1em * pow(var(--wcag-t--ratio), 4)); }  /* ~2.074em */
h4 { --wcag-t--font-size: calc(1em * pow(var(--wcag-t--ratio), 3)); }  /* ~1.728em */
h5 { --wcag-t--font-size: calc(1em * pow(var(--wcag-t--ratio), 2)); }  /* ~1.44em */
h6 { --wcag-t--font-size: calc(1em * var(--wcag-t--ratio)); }          /* ~1.2em */
small { --wcag-t--font-size: calc(1em / var(--wcag-t--ratio)); }       /* ~0.833em */
```

### Responsive Scale

```css
:root {
  --wcag-t--scale--lg--font-size: 1.125em;
  --wcag-t--scale--md--font-size: 1em;
  --wcag-t--scale--sm--font-size: 0.875em;
  --wcag-t--scale--xs--font-size: 0.75em;
}
```

Applied with attributes: `<p lg>Large text</p>`, `<p sm>Small text</p>`

## Focus (`--wcag-f--`)

```css
:root {
  --wcag-f--outline-width: 2px;
  --wcag-f--outline-style: solid;
  --wcag-f--outline-color: hsl(245, 93%, 38%);
  --wcag-f--outline-offset: var(--wcag-f--outline-width);
}
```

Global zero-specificity selector:

```css
:where(:focus-visible, :has(> [sr-only]):focus-within) {
  outline-width: var(--wcag-f--outline-width);
  outline-style: var(--wcag-f--outline-style);
  outline-color: var(--wcag-f--outline-color);
  outline-offset: var(--wcag-f--outline-offset);
}
```

## Grid System (`--wcag-gs--`)

```css
:root {
  --wcag-gs--cols: 12;
  --wcag-gs--gap: var(--wcag-s--500);
  --wcag-gs--container--size: 100vw;
}
```

## Tokens in Components

Components create their own intermediate variables that reference global tokens:

```css
:root {
  /* Component token → references global tokens */
  --wcag-accordion--gap: var(--wcag-s--200);
  --wcag-accordion--border-radius: var(--wcag-r--s);
  --wcag-accordion--border-color: light-dark(
    var(--wcag-c--blue-300),
    var(--wcag-c--blue-200)
  );
}

/* Selector — uses only component variables */
[is="wcag-accordion"] {
  gap: var(--wcag-accordion--gap);
  border-radius: var(--wcag-accordion--border-radius);
}
```

## Rules for New Tokens

1. Choose the correct category (`c`, `s`, `r`, `e`, `t`, `f`, `gs`)
2. Follow the naming convention: `--wcag-<cat>--<name>`
3. If it's a color: define `--light` and `--dark` + `light-dark()` composition
4. If it's spacing: use the modular scale with `pow()` and 1.25 ratio
5. If it's a component token: prefix with `--wcag-<component>--`
6. Always define on `:root`
