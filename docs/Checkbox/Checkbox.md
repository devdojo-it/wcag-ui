# 📌 Checkbox 

## 1. Component Overview
The `Checkbox` component in **checked** state allows users to confirm an active choice. It must be clearly distinguishable visually and accessible via keyboard and screen reader.

---

## 2. Accessibility Requirements (WCAG)

### 🔹 WCAG 1.3.1 - Information and Relationships
- Checkboxes must be associated with a clear label using `<label>` to ensure they are readable by screen readers.
- If checkboxes are grouped, they must be contained in a `fieldset` with a descriptive `legend`.

```html
<fieldset>
  <legend>Select your interests</legend>
  <label><input type="checkbox" name="hobby" value="sport" checked> Sports</label>
  <label><input type="checkbox" name="hobby" value="music" checked> Music</label>
</fieldset>
```

### 🔹 WCAG 1.4.3 - Minimum Contrast
- The checkbox border and label text must have a minimum contrast of **3:1** compared to the background.
- The label text must have a minimum contrast of **4.5:1** compared to the background to ensure readability.

### 🔹 WCAG 2.1.1 - Keyboard
- All checkboxes must be navigable with `Tab` and selectable/deselectable with `Space`.
- If a custom checkbox is provided, it must maintain the same behavior as the native checkbox.

```html
<input type="checkbox" id="accept" name="accept" checked>
<label for="accept">I accept the terms and conditions</label>
```

### 🔹 WCAG 2.4.7 - Focus Visible
- The checkbox must have a clear `focus-visible` state to indicate when it is active.

```css
input[type="checkbox"]:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 4px;x;
}
```

### 🔹 WCAG 4.1.2 - Name, Role, Value
- Screen readers must correctly perceive the `checked` state of the checkbox via `aria-checked="true"` if `role="checkbox"` is used in a custom component.

```html
<div role="checkbox" tabindex="0" aria-checked="true" id="custom-checkbox">
  I accept the terms and conditions
</div>
```

---

## 3. Developer Guidelines

✅ **Correct HTML Markup**
```html
<label>
  <input type="checkbox" name="notifications" value="email" checked> Receive email notifications
</label>
```

🚫 **Wrong Example (missing associated label)**
```html
<input type="checkbox" name="notifications" checked> Receive email notifications <!-- Not correctly associated -->
```

✅ **If the checkbox is custom**
```html
<div role="checkbox" tabindex="0" aria-checked="true">
  I accept promotions
</div>
```

🚫 **Common mistake: not providing a clear selection state**
```html
<div class="custom-checkbox">I accept the terms</div> <!-- Without aria-checked -->
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
- Is the checkbox navigable and selectable/deselectable via keyboard?
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
- Ensure that the checkbox is clickable across the entire associated label area.

🎞 **Motion and Animations**
```css
@media (prefers-reduced-motion: reduce) {
  .custom-checkbox {
    transition: none;
  }
}
```

---

## 6. Examples and Best Practices
✅ **Use `<label>` to ensure correct association between checkbox and text.**
✅ **Ensure clear focus visibility for keyboard navigation.**
✅ **If the checkbox is custom, provide `aria-checked="true"` to communicate the state to screen readers.**
✅ **Do not remove focus without providing a visual alternative.**

---

📌 **References**
- [WCAG 2.1 - Success Criterion 1.3.1 Information and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)
- [WCAG 2.1 - Success Criterion 1.4.3 Minimum Contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum)
- [WCAG 2.1 - Success Criterion 2.1.1 Keyboard](https://www.w3.org/TR/WCAG21/#keyboard)
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visible](https://www.w3.org/TR/WCAG21/#focus-visible)
- [WCAG 2.1 - Success Criterion 4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG21/#name-role-value)