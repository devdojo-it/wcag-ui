# 📌 Chips

## 1. Component Overview

The `Chips` component represents compact information such as tags, categories, selected filters, or already-entered input. Chips can be used in two distinct modes, which have direct accessibility implications:

- **Informative Chips**: serve only a descriptive function. They show information or states, but are **not interactive**.
- **Actionable Chips**: allow user interaction, such as selection, filter activation, or element removal.

The distinction between these two types is fundamental: **only Actionable Chips must be navigable and activatable via keyboard**, while Informative Chips must not enter the tab order.

---

## 2. Accessibility Requirements (WCAG)

### 🔹 WCAG 1.1.1 - Alternative Text

- If a tag contains only an icon (e.g., an "X" for removal), a descriptive `aria-label` or `aria-labelledby` must be provided.
- The accessible text must clearly describe the action or content of the tag.

```html
<button aria-label="Remove Category filter">
  <span aria-hidden="true">✕</span>
</button>
```

---

### 🔹 WCAG 1.3.1 - Information and Relationships

- Chips must be structured semantically based on their function.
- Informative Chips must be non-interactive elements (`span`, `li`).
- Actionable Chips must be `button` elements.
- If chips represent a set of selections or filters, they must be contained in a semantic structure (`ul`, `ol`, or `fieldset` with `legend`).
- If an Actionable Tag represents an active selection, it must be indicated via `aria-pressed`.

```html
<ul>
  <li><span>Accessibility</span></li>
  <li><button aria-pressed="true">UX</button></li>
</ul>
```

---

### 🔹 WCAG 1.4.3 - Minimum Contrast

- Tag text must have a minimum contrast of **4.5:1** compared to the background.
- Icons and status indicators must have a minimum contrast of **3:1**.
- States (selected, disabled) must not be communicated exclusively through color.

---

### 🔹 WCAG 2.1.1 - Keyboard

- Only Actionable Chips must be reachable via `Tab`.
- Actionable Chips must be activatable with `Enter` and `Space`.
- If removal is provided, the action must be exposed through a separate, navigable button.
- Informative Chips must not be focusable.

```html
<button class="tag" aria-pressed="true">Category</button>
<button class="tag" aria-label="Remove Category">✕</button>
```

---

### 🔹 WCAG 2.4.7 - Focus Visible

- Actionable Chips must have a visible and well-distinguished focus.
- The focus indicator must have a minimum contrast of **3:1**.
- Focus must not be lost after a tag is removed.

```css
.tag:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 4px;x;
}
```

---

### 🔹 WCAG 3.2.2 - Consistency in Interactions

- The behavior of Actionable Chips must be predictable and consistent.
- Avoid unexpected removals or state changes.
- If a tag changes state (e.g., selected/unselected), the change must be clearly perceptible.

---

## 3. Developer Guidelines

✅ **Correct HTML Markup**

```html
<ul>
  <li><span class="tag">Informative</span></li>
  <li><button class="tag" aria-pressed="true">Active Filter</button></li>
  <li>
    <span class="tag">Category</span>
    <button aria-label="Remove Category">✕</button>
  </li>
</ul>
```

🚫 **Wrong Example**

```html
<div class="tag" tabindex="0">Categoria</div>
```

❌ Problems:

- Non-semantic element
- Informative tag made interactive
- Unclear role for assistive technologies

✅ **Icon Management**

```html
<button aria-label="Remove UX tag">
  <svg aria-hidden="true" focusable="false"></svg>
</button>
```

---

## 4. Testing and Validation

🛠 **Assistive Technologies Tested**

- NVDA
- VoiceOver
- JAWS

🛠 **Verification Tools**

- [axe DevTools](https://www.deque.com/axe/)
- [WAVE](https://wave.webaim.org/)
- [Lighthouse Accessibility Audit](https://developers.google.com/web/tools/lighthouse/)

🎯 **Test Cases**

- Are Actionable Chips navigable and activatable via keyboard?
- Are Informative Chips excluded from tab order?
- Is focus always visible?
- Are states correctly announced by screen readers?

---

## 5. Advanced Considerations

🌍 **Internationalization**

- Support variable-length text.
- Avoid truncation without accessible alternative.

📱 **Responsiveness**

- Minimum interactive area **44×44 px** for Actionable Chips.
- Usable on touchscreen and with 200% zoom.

🎞 **Motion and Animations**

```css
@media (prefers-reduced-motion: reduce) {
  .tag {
    transition: none;
  }
}
```

---

## 6. Examples and Best Practices

- Clearly distinguish Informative and Actionable Chips from the design phase.
- Do not make a tag interactive solely for visual reasons.
- Always expose actions and states through correct semantics.
- Test selection and removal with screen reader.

---

📌 **References**

- [WCAG 2.1 - Success Criterion 1.1.1 Alternative Text](https://www.w3.org/TR/WCAG21/#text-alternatives)
- [WCAG 2.1 - Success Criterion 1.3.1 Information and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)
- [WCAG 2.1 - Success Criterion 1.4.3 Minimum Contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum)
- [WCAG 2.1 - Success Criterion 2.1.1 Keyboard](https://www.w3.org/TR/WCAG21/#keyboard)
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visible](https://www.w3.org/TR/WCAG21/#focus-visible)
- [WCAG 2.1 - Success Criterion 3.2.2 Consistency in Interactions](https://www.w3.org/TR/WCAG21/#on-input)
- [ARIA Authoring Practices - Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
