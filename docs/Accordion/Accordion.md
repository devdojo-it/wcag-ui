
# 📌 Accordion 

## 1. Component Overview
The `Accordion` component allows you to show and hide content sections dynamically. It is particularly useful for organizing information in restricted spaces and improving readability. It must be accessible for users who navigate with the keyboard and those who use screen readers.

---

## 2. Accessibility Requirements (WCAG)

### 🔹 WCAG 1.3.1 - Information and Relationships
- Each accordion section must be semantically structured using `<button>` for the title and `<div>` for the content.
- The title must have an `aria-controls` that points to the `id` of the corresponding panel.
- The panel must have `role="region"` and `aria-labelledby` to be associated with the title.

```html
<button aria-controls="panel1" aria-expanded="false" id="accordion1">Section 1</button>
<div id="panel1" role="region" aria-labelledby="accordion1" hidden>
  <p>Content of section 1</p>
</div>
```

### 🔹 WCAG 1.4.3 - Minimum Contrast
- Text and visual indicators must have a minimum contrast of **4.5:1** against the background.
- The active state (focus) must be clearly visible with a minimum contrast of **3:1**.

### 🔹 WCAG 2.1.1 - Keyboard
- The accordion must be navigable with `Tab`.
- Expansion buttons must be activatable with `Enter` and `Space`.
- Up/down arrow keys can be implemented for smoother navigation between accordion items.

```html
<button aria-controls="panel2" aria-expanded="false">Section 2</button>
<div id="panel2" role="region" aria-labelledby="accordion2" hidden>
  <p>Content of section 2</p>
</div>
```

### 🔹 WCAG 2.4.7 - Focus Visible
- It must be clear when an accordion element is active or has focus.

```css
button:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 4px;x 
}
```

### 🔹 WCAG 4.1.2 - Name, Role, Value
- Screen readers must correctly perceive the open and closed state of the accordion via `aria-expanded`.

```html
<button aria-expanded="true" aria-controls="panel3">Section 3</button>
```

---

## 3. Developer Guidelines

✅ **Correct HTML Markup**
```html
<button aria-controls="panel4" aria-expanded="false" id="accordion4">Section 4</button>
<div id="panel4" role="region" aria-labelledby="accordion4" hidden>
  <p>Content of section 4</p>
</div>
```

🚫 **Wrong Example (lack of semantics)**
```html
<div class="accordion-title" onclick="toggleAccordion()">Section 5</div>
<div class="accordion-content" hidden>
  <p>Content of section 5</p>
</div> <!-- Not accessible, lacks proper semantics -->
```

✅ **Focus Management**
```css
button:focus-visible {
  outline: 3px solid #ff9900;
}
```

🚫 **Common mistake: not providing a clear expansion state**
```html
<button>Section 6</button> <!-- Missing aria-controls and aria-expanded -->
```

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

🎯 **Use Cases to Test**
- Is the accordion navigable and activatable via keyboard?
- Is the focus visible and clearly distinct?
- Is the `aria-expanded` state correctly updated?
- Is the contrast between text and background sufficient?

---

## 5. Advanced Considerations

🌍 **Internationalization**
- Test with longer text for different languages.
- Avoid all-uppercase text that can impair readability.

📱 **Responsiveness**
- Must be easily usable on touchscreen.
- Ensure that accordion sections are visible and readable even with zoom up to 200%.

🎞 **Motion and Animations**
```css
@media (prefers-reduced-motion: reduce) {
  .accordion-content {
    transition: none;
  }
}
```

---

## 6. Examples and Best Practices
✅ **Use `aria-controls` and `aria-expanded` to improve accessibility.**
✅ **Ensure clear focus visibility for keyboard navigation.**
✅ **Do not rely solely on color to indicate open/closed state.**
✅ **Test with screen reader to verify correct reading of sections.**

---

📌 **References**
- [WCAG 2.1 - Success Criterion 1.3.1 Information and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)
- [WCAG 2.1 - Success Criterion 1.4.3 Minimum Contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum)
- [WCAG 2.1 - Success Criterion 2.1.1 Keyboard](https://www.w3.org/TR/WCAG21/#keyboard)
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visible](https://www.w3.org/TR/WCAG21/#focus-visible)
- [WCAG 2.1 - Success Criterion 4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG21/#name-role-value)
