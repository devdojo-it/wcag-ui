# Accessibility Styleguide — wcag-ui

> Merged from `.ai/context/accessibility.md` — comprehensive WCAG 2.2 patterns.

## Founding Principles

wcag-ui follows WCAG 2.2 with focus on:
- **Perceivable**: sufficient contrast, screen reader alternatives
- **Operable**: keyboard navigation, visible focus
- **Understandable**: clear labels, explicit states
- **Robust**: semantic HTML, ARIA where needed

## Implemented Patterns

### 1. Customized Built-in Elements

The project extends native HTML elements (`<button>`, `<input>`, `<details>`, etc.) rather than creating autonomous custom elements. This guarantees:

- Native semantics preserved (screen readers recognize the type)
- Native keyboard behavior inherited
- Native form participation
- No Shadow DOM → direct DOM accessibility

```html
<!-- Semantically a <button>, with wcag-ui styles and behavior -->
<button is="wcag-button">Action</button>

<!-- Semantically an <input>, extended by wcag-ui -->
<input is="wcag-input" type="email" aria-label="Email" />
```

### 2. aria-label → Visible Label

Key pattern for form controls. When an input has `aria-label`, the JS automatically transforms it into a visible `<label>`:

```html
<!-- Author writes: -->
<input is="wcag-checkbox" aria-label="I accept the terms" />

<!-- wcag-ui generates: -->
<label>
  I accept the terms
  <span>
    <input is="wcag-checkbox" sr-only />
  </span>
</label>
```

This satisfies WCAG 2.2 SC 1.3.1 (Info and Relationships) and SC 2.5.3 (Label in Name).

### 3. Screen Reader Only (`sr-only`)

Custom attribute that visually hides content while keeping it readable by screen readers:

```css
[sr-only] {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  border: 0;
  margin: -1px;
  overflow: hidden;
  white-space: nowrap;
  clip: rect(0, 0, 0, 0);
}
```

Used for:
- Hidden native inputs (checkbox, radio, switch) → visual appearance is via pseudo-elements
- Additional screen reader text in the color scheme switcher

### 4. Visible Focus

Global focus on `:focus-visible` with configurable outline:

```css
:where(:focus-visible, :has(> [sr-only]):focus-within) {
  outline-width: var(--wcag-f--outline-width);
  outline-style: var(--wcag-f--outline-style);
  outline-color: var(--wcag-f--outline-color);
  outline-offset: var(--wcag-f--outline-offset);
}
```

The `:has(> [sr-only]):focus-within` selector ensures labels with hidden inputs show the focus ring when the inner input is focused. This satisfies WCAG 2.2 SC 2.4.7 (Focus Visible).

Components can customize their focus:

```css
[is="wcag-button"]:where(:focus, :focus-visible) {
  --wcag-button--outline-width: var(--wcag-button--s-foc--outline-width);
  --wcag-button--outline-color: var(--wcag-button--s-foc--outline-color);
}
```

### 5. aria-expanded and aria-controls

For disclosure components (details, dialog, accordion):

```js
// GUID for aria-controls connection
this.#guid = helpers.strings.guid();
this.#summary.setAttribute('id', this.#guid);
this.#summary.setAttribute('aria-controls', `${this.#guid}-content`);

// aria-expanded synchronization
this.setAttribute('aria-expanded', `${this.open.toString()}`);
```

### 6. Disabled States

Triple support for maximum compatibility:

```css
[is="wcag-button"]:where([disabled], :disabled, [aria-disabled="true"]) {
  cursor: not-allowed;
  /* disabled styles */
}
```

`aria-disabled="true"` keeps the element focusable (useful for tooltip/explanations on why it's disabled).

### 7. aria-pressed for Toggle

```css
[is="wcag-button"]:where(:active, [aria-pressed="true"]) {
  /* pressed styles */
}
```

### 8. Semantic Landmarks

```html
<header>        <!-- banner -->
<nav>           <!-- navigation -->
<main>          <!-- main content -->
<aside>         <!-- complementary content -->
<footer>        <!-- footer -->
```

### 9. External Links

```html
<a href="https://..." target="_blank" rel="noopener noreferrer">
  Link <i class="wcag-icon-external"></i>
</a>
```

### 10. Decorative Icons

```css
[class^="wcag-icon-"],
[class*=" wcag-icon-"] {
  speak: never;  /* Not read by screen readers */
}
```

Icons use `<i>` which is semantically neutral. If it has meaning, add `aria-label` to the container.

### 11. Breadcrumb Navigation

```html
<nav aria-label="breadcrumb">
  <ul>
    <li><a href="...">Section</a></li>
    <li>Current page</li>
  </ul>
</nav>
```

### 12. Color Scheme Switcher

Tristate radio (system/light/dark) with `sr-only`:

```html
<menu color-scheme>
  <label>
    <input type="radio" name="color-scheme" value="light dark" sr-only />
    <i class="wcag-icon-scheme-system"></i> System
  </label>
</menu>
```

### 13. Focus Not Obscured (WCAG 2.2)

Focused elements must not be entirely hidden behind sticky headers, footers, dialogs, or other overlays (SC 2.4.11 Level AA).

```css
/* Add scroll-margin to prevent focus from being hidden behind sticky content */
:focus {
  scroll-margin-block: 8rem;
}
```

### 14. Target Size (WCAG 2.2)

All interactive targets must be at least 24×24 CSS pixels, or have sufficient spacing so that a 24px circle centered on their bounding box does not overlap other targets (SC 2.5.8 Level AA).

```css
/* Minimum target size for all interactive elements */
button,
summary,
[role="button"],
[role="tab"] {
  min-height: 2.4rem; /* 24px with 1rem = 10px base */
  min-width: 2.4rem;
}
```

Components already meeting this: `wcag-button` (sm = 3.4rem height), `wcag-checkbox/radio/switch` (label wrapping expands target area), `wcag-details` (summary has padding).

### 15. Dragging Movements (WCAG 2.2)

Any functionality using drag must have a single-pointer alternative without dragging (SC 2.5.7 Level AA). This applies to:

- Range/slider components — must support click-in-track + arrow keys
- Any future sortable/reorderable components — must provide move up/down buttons

### 16. Accessible Authentication (WCAG 2.2)

Authentication steps must not require cognitive function tests unless alternative mechanisms exist (SC 3.3.8 Level AA):

- **Never** block paste on password inputs (`autocomplete="current-password"` or `autocomplete="new-password"`)
- **Never** use `autocomplete="off"` on authentication fields
- Support password managers by using correct `autocomplete` values

### 17. Redundant Entry (WCAG 2.2)

In multi-step processes, previously entered information must be auto-populated or available for selection — never force users to re-enter data (SC 3.3.7 Level A). Use correct `autocomplete` attribute values on form controls.

### 18. Consistent Help (WCAG 2.2)

Help mechanisms (contact info, self-help, automated contact) must appear in the same relative order across all pages in a set (SC 3.2.6 Level A). This is a layout-level concern — the design system layout template should position help elements consistently.

## Rules for New Components

### Required

1. Extend the most semantically specific native HTML element
2. Ensure working keyboard navigation (inherited or implemented)
3. Add `aria-label` where a visible text label is missing
4. Implement `:focus-visible` with outline conforming to focus tokens
5. Support `aria-disabled` in addition to `disabled` for states
6. Use `sr-only` for screen reader only content (not `display:none` or `visibility:hidden`)
7. Ensure interactive targets are at least 24×24 CSS pixels (WCAG 2.2 SC 2.5.8)
8. Add `scroll-margin-block` so focused elements aren't hidden behind sticky content (WCAG 2.2 SC 2.4.11)
9. Never block paste on password or authentication inputs (WCAG 2.2 SC 3.3.8)

### Recommended

7. Add `aria-expanded` for components that open/close
8. Connect controller and controlled elements with `aria-controls` + `id`
9. Use GUID (`helpers.strings.guid()`) to generate unique IDs
10. Emit custom events with state details for JS integration
11. Test with screen readers (VoiceOver, NVDA) before marking complete
12. Verify WCAG AA contrast (4.5:1 text, 3:1 interactive components)

## WCAG Anti-patterns to Avoid

- ❌ Don't use `tabindex > 0` — it alters the natural tab order
- ❌ Don't remove the focus outline without a visible substitute
- ❌ Don't use color alone to communicate information
- ❌ Don't use `role` when a native element already provides the semantics
- ❌ Don't use `aria-hidden="true"` on interactive elements
- ❌ Don't create focus traps (users must be able to exit with Tab/Esc)
- ❌ Don't block paste on input fields — it prevents password managers (WCAG 2.2)
- ❌ Don't create interactive targets smaller than 24×24 CSS pixels without sufficient spacing (WCAG 2.2)
