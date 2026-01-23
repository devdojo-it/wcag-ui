# **📌 Textarea**

## **1. Component Overview**

The Textarea component allows free text input across multiple lines (e.g., notes, descriptions, messages). It must be usable by keyboard, correctly labeled, compatible with screen readers, and support states such as error, disabled, and character count (if present).

---

## **2. Accessibility Requirements (WCAG)**

### **🔹 WCAG 1.3.1 - Information and Relationships**

- The textarea must have an associated label via `for` and `id` attributes.
- Help text (placeholder, hint, examples) must be linked via `aria-describedby`.
- If the field is required, communicate it textually and/or with appropriate attributes.

```html
<label for="message">Message</label>
<textarea id="message" aria-describedby="message-hint"></textarea>
<p id="message-hint">Write a short message (max 500 characters).</p>
```

---

### **🔹 WCAG 1.4.3 - Minimum Contrast**

- Entered text and label: minimum contrast **4.5:1**.
- Borders, icons, and status indicators (error/focus): minimum contrast **3:1**.
- Error state must not be communicated by color alone.

---

### **🔹 WCAG 2.1.1 - Keyboard**

- The component must be reachable with Tab.
- Must support standard input (writing, text selection, copy/paste).
- Avoid custom shortcuts that interfere with browser or assistive technology shortcuts.

---

### **🔹 WCAG 2.4.7 - Focus Visible**

- Focus must always be visible on the textarea.
- The focus indicator must have a minimum contrast of **3:1**.

```css
textarea:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 3px;
}
```

---

### **🔹 WCAG 3.3.1 - Error Identification**

- In case of error, show an error message near the field.
- Link the message to the textarea via `aria-describedby`.
- Use `aria-invalid="true"` when the content is invalid.

```html
<label for="desc">Description</label>
<textarea id="desc" aria-invalid="true" aria-describedby="desc-error"></textarea>
<p id="desc-error">Description is required.</p>
```

---

### **🔹 WCAG 4.1.2 - Name, Role, Value**

- The accessible name must be determined by the label.
- The role must be that of the native control (textarea).
- The disabled state must be expressed with the `disabled` attribute.

```html
<textarea id="notes" disabled></textarea>
```

---

## **3. Developer Guidelines**

✅ **Correct HTML Markup**

```html
<label for="notes">Notes</label>
<textarea id="notes" aria-describedby="notes-hint notes-counter"></textarea>
<p id="notes-hint">Enter any helpful details.</p>
<p id="notes-counter">0/500</p>
```

🚫 **Wrong Example (missing label)**

```html
<textarea placeholder="Notes"></textarea>
```

---

## **4. Testing and Validation**

🛠 **Assistive Technologies Tested**

- NVDA
- VoiceOver
- JAWS

🛠 **Verification Tools**

- [axe DevTools](https://www.deque.com/axe/)
- [WAVE](https://wave.webaim.org/)
- [Lighthouse Accessibility Audit](https://developers.google.com/web/tools/lighthouse/)

🎯 **Test Cases**

- Does the textarea have an associated and correctly announced label?
- Is focus visible?
- Are errors announced and linked to the field?
- Is character count (if present) updated and comprehensible?

---

## **5. Advanced Considerations**

🌍 **Internationalization**

- Support long texts and different languages.
- Avoid truncated text in error messages or hints.

�� **Responsiveness**

- Adequate input area on mobile.
- Target and scroll correctly managed with 200% zoom.

🎞 **Motion and Animations**

```css
@media (prefers-reduced-motion: reduce) {
  .textarea {
    transition: none;
  }
}
```

---

## **6. Examples and Best Practices**

- Do not use placeholder as the only label.
- Link hints, errors, and counter with `aria-describedby`.
- If there's a character limit, communicate it textually.
- Test with real screen readers.

---

📌 **References**

- [WCAG 2.1 - Success Criterion 1.3.1 Information and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)
- [WCAG 2.1 - Success Criterion 1.4.3 Minimum Contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum)
- [WCAG 2.1 - Success Criterion 2.1.1 Keyboard](https://www.w3.org/TR/WCAG21/#keyboard)
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visible](https://www.w3.org/TR/WCAG21/#focus-visible)
- [WCAG 2.1 - Success Criterion 3.3.1 Error Identification](https://www.w3.org/TR/WCAG21/#error-identification)
- [WCAG 2.1 - Success Criterion 4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG21/#name-role-value)
