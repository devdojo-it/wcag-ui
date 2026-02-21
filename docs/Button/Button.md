# 📌 Button

## 1. Component Overview

The `Button` component is used to perform an action within the interface. It must be clearly distinguishable, accessible via keyboard, and compatible with screen readers.

---

## 2. How to Use the Component

Below are examples to activate the component variants.

### Primary Button

```html
<button is="wcag-button">Button</button>
```

### Secondary Button

```html
<button is="wcag-button" secondary>Button</button>
```

### Tertiary Button

```html
<button is="wcag-button" tertiary>Button</button>
```

### Destructive Button

```html
<button is="wcag-button" destructive>Button</button>
```

---

## 3. Accessibility Requirements (WCAG)

### 🔹 WCAG 1.1.1 - Alternative Text

- If the button contains only an icon, it must have a descriptive `aria-label` or an `aria-labelledby` pointing to a text label.

```html
<button is="wcag-button" aria-label="Close the pop-up">
  <svg aria-hidden="true" focusable="false">...</svg>
</button>
```

### 🔹 WCAG 1.3.1 - Information and Relationships

- The button must be semantically structured using the `<button>` tag.
- If it's a link styled as a button, use `<a role="button">` and handle `keydown` to support the Enter/Space key.

```html
<span role="button" tabindex="0">Delete</span>
```

### 🔹 WCAG 1.4.3 - Minimum Contrast

- The button text must have a minimum contrast of **4.5:1** against the background (WCAG 2.1 AA).
- The contrast between the button border and background must be at least **3:1** to ensure the visibility of non-text elements.
- For disabled buttons, the text contrast must remain readable, but it is not required to meet the **4.5:1** requirement, as it is not an available action.

### 🔹 WCAG 2.1.1 - Keyboard

- The button must be fully usable via keyboard (`Tab` for focus, `Enter` and `Space` to activate).
- If the button has an `aria-disabled="true"` state, it must still intercept keyboard and click events.

```html
<button aria-disabled="true" tabindex="0">Apparently disabled</button>
```

### 🔹 WCAG 2.4.7 - Focus Visible

- It must have a clear and well-distinguished `:focus-visible` style (minimum 3:1 against the background).
- Do not remove the focus outline without providing an accessible alternative.

```css
button:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 4px;
}
```

### 🔹 WCAG 3.2.2 - Consistency in Interactions

- Buttons must behave predictably.
- Avoid unexpected state changes or navigation on mouse hover or focus.

---

## 4. Developer Guidelines

✅ **Correct HTML Markup**

```html
<button type="button">Submit</button>
```

🚫 **Wrong Example (non-accessible div)**

```html
<div onclick="submitForm()">Submit</div>
<!-- Not accessible -->
```

✅ **If the button contains only an icon**

```html
<button aria-label="Close the pop-up">
  <svg aria-hidden="true" focusable="false">...</svg>
</button>
```

🚫 **Common mistake: missing aria-label**

```html
<button>
  <svg>...</svg>
  <!-- No label for screen reader -->
</button>
```

---

## 5. Testing and Validation

🛠 **Assistive Technologies Tested**

- NVDA
- VoiceOver
- JAWS

🛠 **Verification Tools**

- [axe DevTools](https://www.deque.com/axe/)
- [WAVE](https://wave.webaim.org/)
- [Lighthouse Accessibility Audit](https://developers.google.com/web/tools/lighthouse/)

🎯 **Use Cases to Test**

- Is the button navigable from the keyboard?
- Does it have sufficient contrast?
- Does it work with screen readers?
- Are the `aria-disabled` and `disabled` states correctly managed?

---

## 6. Advanced Considerations

🌍 **Internationalization**

- Test with longer text for different languages.
- Avoid all-uppercase text that can create readability issues.

📱 **Responsiveness**

- Must be easily selectable even on touchscreen.
- Ensure the button is large enough (minimum 44x44px).

🎞 **Motion and Animations**

```css
@media (prefers-reduced-motion: reduce) {
  button {
    transition: none;
  }
}
```

---

## 7. Examples and Best Practices

✅ **It is better to use `<button>` for compatibility and semantics.** ✅ **Test focus with keyboard and screen reader.** ✅ **Ensure accessible labels for icon-only buttons.** ✅ **Correctly manage the `disabled` and `aria-disabled` state.** ✅ **Make sure the contrast conforms to WCAG.**

---

📌 **References**

- [WCAG 2.1 - Success Criterion 1.1.1 Alternative Text](https://www.w3.org/TR/WCAG21/#text-alternatives)
- [WCAG 2.1 - Success Criterion 1.3.1 Information and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)
- [WCAG 2.1 - Success Criterion 1.4.3 Minimum Contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum)
- [WCAG 2.1 - Success Criterion 2.1.1 Keyboard](https://www.w3.org/TR/WCAG21/#keyboard)
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visible](https://www.w3.org/TR/WCAG21/#focus-visible)
- [WCAG 2.1 - Success Criterion 3.2.2 Consistency in Interactions](https://www.w3.org/TR/WCAG21/#on-input)
