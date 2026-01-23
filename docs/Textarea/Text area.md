# 📌 Textarea - Accessibility

## 1. Component Overview
The `Textarea` component allows users to enter free text across multiple lines. It must be clearly distinguishable visually and accessible via keyboard and screen reader.

---
## 2. How to Use the Component

```html
<label for="comment">Enter your comment:</label>
<textarea id="comment" name="comment"></textarea>
```

---
## 3. Accessibility Requirements (WCAG)

### 🔹 WCAG 1.3.1 - Information and Relationships
- Every textarea must have an associated label via the `for` attribute of the `<label>`.

```html
<label for="feedback">Your feedback</label>
<textarea id="feedback"></textarea>
```

### 🔹 WCAG 1.4.3 - Minimum Contrast
- The textarea border must have a minimum contrast of **3:1** compared to the background.
- The label text and the entered text must have a minimum contrast of **4.5:1** compared to the background.

### 🔹 WCAG 2.1.1 - Keyboard
- The textarea must be navigable with `Tab` and text must be insertable via keyboard without any issues.

```html
<textarea id="bio" name="bio"></textarea>
<label for="bio">Write a brief biography</label>
```

### 🔹 WCAG 2.4.7 - Focus Visible
- The focus of the textarea must be clearly visible.
- Must implement `outline: 2px solid #005fcc; outline-offset: 4px;`.

```css
textarea:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 4px;x;
}
```

### 🔹 WCAG 4.1.2 - Name, Role, Value
- Screen readers must correctly perceive the `textbox` role and the content currently entered in the textarea.

```html
<label for="description">Problem description</label>
<textarea id="description" role="textbox"></textarea>
```

---

## 4. Developer Guidelines

✅ **Correct HTML Markup**
```html
<label for="notes">Additional notes</label>
<textarea id="notes"></textarea>
```

🚫 **Wrong Example (missing associated label)**
```html
<textarea></textarea> Enter notes <!-- Not correctly associated -->
```

✅ **Textarea with character limits**
```html
<label for="summary">Summary (max 500 characters)</label>
<textarea id="summary" aria-describedby="char-limit"></textarea>
<div id="char-limit">Maximum 500 characters</div>
```

🚫 **Common mistake: placeholder used as only label**
```html
<textarea placeholder="Enter text here"></textarea> <!-- No associated label -->
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

🎯 **Test Cases**
- Is the textarea fully usable via keyboard?
- Is focus clearly visible?
- Is entered content correctly communicated to screen readers?
- Is the contrast between text, borders, and background sufficient?

---

## 6. Advanced Considerations

🌍 **Internationalization**
- Test with long texts and different languages.
- Avoid placeholder or descriptive text in all caps that may compromise readability.

📱 **Responsiveness**
- Must be easily usable on mobile devices.
- Ensure sufficient size to facilitate text entry on touchscreen devices.

🎞 **Motion and Animations**
```css
@media (prefers-reduced-motion: reduce) {
  textarea {
    transition: none;
  }
}
```

---

## 7. Examples and Best Practices
✅ **Always associate a `<label>` with the textarea.**
✅ **Ensure that focus is clearly visible using `outline`.**
✅ **Use `aria-describedby` for additional information like character limits.**
✅ **Do not use only the placeholder as a label.**

---

📌 **References**
- [WCAG 2.1 - Success Criterion 1.3.1 Information and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)
- [WCAG 2.1 - Success Criterion 1.4.3 Minimum Contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum)
- [WCAG 2.1 - Success Criterion 2.1.1 Keyboard](https://www.w3.org/TR/WCAG21/#keyboard)
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visible](https://www.w3.org/TR/WCAG21/#focus-visible)
- [WCAG 2.1 - Success Criterion 4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG21/#name-role-value)

