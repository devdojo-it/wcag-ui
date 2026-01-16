# 📌 Radio Button Checked 

## 1. Component Overview
The `Radio Button` component in **checked** state allows users to choose an option within a group. It must be clearly distinguishable visually and accessible via keyboard and screen reader.

---

## 2. Accessibility Requirements (WCAG)

### 🔹 WCAG 1.3.1 - Information and Relationships
- Radio buttons must be contained in a `fieldset` with a descriptive `legend`.
- Each radio button must have an associated label with `<label>`.

```html
<fieldset>
  <legend>Select an option</legend>
  <label><input type="radio" name="opzione" value="A"> Option A</label>
  <label><input type="radio" name="opzione" value="B"> Option B</label>
</fieldset>
```

### 🔹 WCAG 1.4.3 - Minimum Contrast
- The radio button border must have a minimum contrast of **3:1** compared to the background.
- The label text must have a minimum contrast of **4.5:1** compared to the background.

### 🔹 WCAG 2.1.1 - Keyboard
- Radio buttons must be navigable with `Tab` and selectable with `Space`.

```html
<input type="radio" id="option1" name="choice" value="1">
<label for="option1">Choice 1</label>
```

### 🔹 WCAG 2.4.7 - Focus Visible
- The focus of the radio button must be clearly visible.
- `outline: 2px solid #005fcc; outline-offset: 4px;x;` should be implemented to improve focus visibility.

```css
input[type="radio"]:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 4px;x;
}
```

### 🔹 WCAG 4.1.2 - Name, Role, Value
- Screen readers must correctly perceive the `radio` role and `checked` state.

```html
<input type="radio" id="option2" name="choice" value="2" role="radio" aria-checked="true">
<label for="option2">Choice 2</label>
```

---

## 3. Developer Guidelines

✅ **Correct HTML Markup**
```html
<label>
  <input type="radio" name="preferenza" value="email"> Receive updates via email
</label>
```

🚫 **Wrong Example (missing associated label)**
```html
<input type="radio" name="preferenza"> Receive updates <!-- Not correctly associated -->
```

✅ **If the radio button is custom**
```html
<div role="radio" tabindex="0" aria-checked="true">
  Select this option
</div>
```

🚫 **Common mistake: not providing a clear selection state**
```html
<div class="custom-radio">Selectable option</div> <!-- Without aria-checked -->
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
- Is the radio button navigable and selectable via keyboard?
- Is the focus visible and clearly distinct?
- Is the `aria-checked="true"` state correctly updated in custom components?
- Is the contrast between text and background sufficient?

---

## 5. Advanced Considerations

🌍 **Internationalization**
- Test with longer text for different languages.
- Avoid all-uppercase text that can impair readability.

📱 **Responsiveness**
- Must be easily selectable even on touchscreen.
- Ensure that the radio button is clickable across the entire associated label area.

🎞 **Motion and Animations**
```css
@media (prefers-reduced-motion: reduce) {
  .custom-radio {
    transition: none;
  }
}
```

---

## 6. Examples and Best Practices
✅ **Use `<label>` to ensure correct association between radio button and text.**
✅ **Ensure clear focus visibility with `outline: 2px solid #005fcc; outline-offset: 4px;x;`.**
✅ **If the radio button is custom, provide `aria-checked="true"` to communicate the state to screen readers.**
✅ **Do not remove focus without providing a visual alternative.**

---

📌 **References**
- [WCAG 2.1 - Success Criterion 1.3.1 Information and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)
- [WCAG 2.1 - Success Criterion 1.4.3 Minimum Contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum)
- [WCAG 2.1 - Success Criterion 2.1.1 Keyboard](https://www.w3.org/TR/WCAG21/#keyboard)
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visible](https://www.w3.org/TR/WCAG21/#focus-visible)
- [WCAG 2.1 - Success Criterion 4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG21/#name-role-value)