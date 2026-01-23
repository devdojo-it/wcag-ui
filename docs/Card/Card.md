# 📌 Card

## 1. Component Overview
The `Card` component is a container that groups related content, presents information, and can include user-executable actions. It must be structured accessibly to ensure a good experience for all users, including those using assistive technologies.

---

## 2. Accessibility Requirements (WCAG)

### 🔹 WCAG 1.3.1 - Information and Relationships
- Card content must be structured semantically with correct elements (`<section>`, `<article>`, `<div>` with appropriate role, `aria-labelledby` to associate title and content).
- If the card contains a title, it must be a heading element (`<h2>`, `<h3>`, etc.) to support screen reader navigation.

```html
<article aria-labelledby="card-title-1">
  <h2 id="card-title-1">Card Title</h2>
  <p>Card description with helpful information.</p>
</article>
```

### 🔹 WCAG 1.4.3 - Minimum Contrast
- Card text must have a minimum contrast of **4.5:1** compared to the background.
- Actions within the card (buttons or links) must meet minimum contrast requirements to be distinguishable from surrounding elements.

### 🔹 WCAG 2.1.1 - Keyboard
- All interactive elements within the card must be navigable and activatable via keyboard (`Tab`, `Enter`, `Space`).
- If the entire card is interactive, it must be activatable with `Enter` and `Space`, and perceived as a single interactive element by screen readers.

```html
<a href="#" class="card" role="button">
  <h2>Card Title</h2>
  <p>Card description.</p>
</a>
```

### 🔹 WCAG 2.4.7 - Focus Visible
- Interactive elements must have a clear and distinguishable `:focus-visible` style for keyboard-navigating users.
- If the entire card is interactive, focus must be clearly visible and well-contrasted.

```css
.card:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 4px;
}
```

### 🔹 WCAG 3.2.2 - Consistency in Interactions
- If the card contains buttons or links, they must behave in a predictable manner.
- Do not use interactive cards that trigger unexpected actions on focus or mouse hover alone.

---

## 3. Developer Guidelines

✅ **Correct HTML Markup**
```html
<article class="card">
  <h2>Title</h2>
  <p>Card text.</p>
  <a href="#">Action</a>
</article>
```

🚫 **Wrong Example (missing semantics)**
```html
<div class="card" onclick="openModal()">
  <h2>Title</h2>
  <p>Card text.</p>
</div> <!-- Not accessible, lacks proper semantics and keyboard navigation -->
```

✅ **If the card is interactive**
```html
<a href="#" class="card" role="button">
  <h2>Card Title</h2>
  <p>Card description.</p>
</a>
```

🚫 **Common mistake: not providing clear indication of interactivity**
```html
<div class="card" tabindex="0">
  <h2>Card Title</h2>
  <p>Card description.</p>
</div> <!-- Does not have a clear role for screen readers -->
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

🎯 **Test Cases**
- Is the card navigable and readable by screen reader?
- Are the interactive elements of the card accessible via keyboard?
- Is the contrast sufficient for text and interactive components?
- If the card is interactive, is its behavior clear?

---

## 5. Advanced Considerations

🌍 **Internationalization**
- Test with longer text for different languages.
- Avoid all-uppercase text that can impair readability.

📱 **Responsiveness**
- Must be easily selectable even on touchscreen.
- Ensure that the card content is readable even with zoom up to 200%.

🎞 **Motion and Animations**
```css
@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }
}
```

---

## 6. Examples and Best Practices
✅ **Use semantic tags (`<section>`, `<article>`) to improve content understanding.**
✅ **Ensure clear focus visibility for interactive elements.**
✅ **If the card is clickable, ensure it's navigable from the keyboard and readable by screen readers.**
✅ **Do not transform entire `<div>` into interactive elements without assigning clear roles (`role="button"`, `role="link"`).**

---

📌 **References**
- [WCAG 2.1 - Success Criterion 1.3.1 Information and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)
- [WCAG 2.1 - Success Criterion 1.4.3 Minimum Contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum)
- [WCAG 2.1 - Success Criterion 2.1.1 Keyboard](https://www.w3.org/TR/WCAG21/#keyboard)
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visible](https://www.w3.org/TR/WCAG21/#focus-visible)
- [WCAG 2.1 - Success Criterion 3.2.2 Consistency in Interactions](https://www.w3.org/TR/WCAG21/#on-input)
