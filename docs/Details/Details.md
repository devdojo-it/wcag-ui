# 📌 Details

## 1. Component Overview

The `Details` component is used to show or hide additional information on user request. It must be accessible for keyboard-navigating users and those using screen readers.

---

## 2. Accessibility Requirements (WCAG)

### 🔹 WCAG 1.3.1 - Information and Relationships

- The `<details>` tag is semantically correct for hiding and showing progressive content.
- The `<summary>` element must be clear and descriptive so users know what to expect when expanding the detail.

```html
<details>
  <summary>Show details</summary>
  <p>This is the hidden content that will be shown on click.</p>
</details>
```

### 🔹 WCAG 1.4.3 - Minimum Contrast

- The `summary` text must have a minimum contrast of **4.5:1** compared to the background.
- The expanded state must be clearly distinguishable from the collapsed state.

### 🔹 WCAG 2.1.1 - Keyboard

- The `details` component must be navigable with `Tab`.
- The `summary` must be activatable with `Enter` and `Space`.

```html
<details>
  <summary tabindex="0">Additional information</summary>
  <p>Details shown after activation.</p>
</details>
```

### 🔹 WCAG 2.4.7 - Focus Visible

- The `summary` must have a clear and distinctive `focus-visible` style.

```css
summary:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 4px;
}
```

### 🔹 WCAG 4.1.2 - Name, Role, Value

- Screen readers must correctly perceive the open and closed state.
- If using a custom component, you must update `aria-expanded`.

```html
<button aria-expanded="false" aria-controls="details-content">Show details</button>
<div id="details-content" hidden>
  <p>Hidden content</p>
</div>
```

---

## 3. Developer Guidelines

✅ **Correct HTML Markup**

```html
<details>
  <summary>Expand to see more information</summary>
  <p>Additional content shown on request.</p>
</details>
```

🚫 **Wrong Example (missing semantics)**

```html
<div onclick="toggleDetails()">Show details</div>
<div class="details-content" hidden>
  <p>Hidden content.</p>
</div>
<!-- Not accessible, lacks proper semantics -->
```

✅ **Focus Management**

```css
summary:focus-visible {
  outline: 2px solid #ff9900;
  outline-offset: 4px;
}
```

🚫 **Common mistake: not providing a clear expansion state**

````html
<button>Show details</button> <!-- Missing aria-expanded and

---

## 4. Testing and Validation

🛠 **Assistive Technologies Tested**
- NVDA
- VoiceOver
- JAWS

🛠 **Verification Tools**
- [axe DevTools](https://www.deque.com/axe/)
- [WAVE](https://wave.webaim.org/)
- [Lighthouse Accessibility Audit](https://developers.google.com/web/tools/lighthouse/)

🎯 **Casi d’Uso da Testare**

- Is the `details` navigable and activatable via keyboard?
- Is focus visible and well-distinguished?
- Is the `aria-expanded` state correctly updated in custom components?
- Is the contrast between text and background sufficient?
---

## 5. Advanced Considerations

🌍 **Internationalization**
- Test with longer text for different languages.
- Avoid all-uppercase text that can impair readability.

📱 **Responsiveness**
- Deve essere facilmente utilizzabile su touchscreen.
- Must be easily usable on touchscreen.
- Ensure that the content is visible and readable even with zoom up to
🎞 **Motion and Animations**
```css
@media (prefers-reduced-motion: reduce) {
  .details-content {
    transition: none;
  }
}
````

---

## 6. Examples and Best Practices

✅ **Use the `<details>` tag to improve accessibility without needing extra ARIA.** ✅ **Ensure clear focus visibility for keyboard navigation.** ✅ **Do not rely solely on color to indicate open/closed state.** ✅ **Test with screen readers to verify correct section reading.**

---

📌 **References**

- [WCAG 2.1 - Success Criterion 1.3.1 Information and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)
- [WCAG 2.1 - Success Criterion 1.4.3 Minimum Contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum)
- [WCAG 2.1 - Success Criterion 2.1.1 Keyboard](https://www.w3.org/TR/WCAG21/#keyboard)
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visible](https://www.w3.org/TR/WCAG21/#focus-visible)
- [WCAG 2.1 - Success Criterion 4.1.2 Name, Role, Valu
