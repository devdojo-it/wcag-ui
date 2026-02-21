# **📌 Input**

## **1. Component Overview**

The Input component allows single-line text input (e.g., names, email addresses, search terms, phone numbers). It must be usable by keyboard, correctly labeled, compatible with screen readers, and support states such as error, disabled, and validation feedback.

---

## **2. Accessibility Requirements (WCAG)**

### **🔹 WCAG 1.3.1 - Information and Relationships**

- The input must have an associated label via `for` and `id` attributes.
- Help text (placeholder, hint, validation requirements) must be linked via `aria-describedby`.
- If the field is required, communicate it textually and/or with appropriate attributes.

```html
<label for="email">Email Address</label>
<input id="email" type="email" aria-describedby="email-hint" />
<p id="email-hint">Enter a valid email address.</p>
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

- Focus must always be visible on the input.
- The focus indicator must have a minimum contrast of **3:1**.

```css
input:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 3px;
}
```

---

### **🔹 WCAG 3.3.1 - Error Identification**

- In case of error, show an error message near the field.
- Link the message to the input via `aria-describedby`.
- Use `aria-invalid="true"` when the content is invalid.

```html
<label for="username">Username</label>
<input id="username" aria-invalid="true" aria-describedby="username-error" />
<p id="username-error">Username is required.</p>
```

---

### **🔹 WCAG 4.1.2 - Name, Role, Value**

- The accessible name must be determined by the label.
- The role must be that of the native control (input).
- The disabled state must be expressed with the `disabled` attribute.

```html
<input id="name" disabled />
```

---

## **3. Developer Guidelines**

✅ **Correct HTML Markup**

```html
<label for="search">Search</label>
<input id="search" type="text" aria-describedby="search-hint" />
<p id="search-hint">Enter a keyword or phrase.</p>
```

🚫 **Wrong Example (missing label)**

```html
<input placeholder="Search" />
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

- Does the input have an associated and correctly announced label?
- Is focus visible?
- Are errors announced and linked to the field?
- Is validation feedback (if present) comprehensible and accessible?

---

## **5. Advanced Considerations**

🌍 **Internationalization**

- Support different text lengths and languages.
- Avoid truncated text in error messages or hints.

📱 **Responsiveness**

- Adequate input width on mobile devices.
- Touch target size should meet minimum recommendations.
- Text should remain readable and not zoom when focused.

🎞 **Motion and Animations**

```css
@media (prefers-reduced-motion: reduce) {
  .input {
    transition: none;
  }
}
```

---

## **6. Examples and Best Practices**

- Do not use placeholder as the only label.
- Link hints, errors, and validation messages with `aria-describedby`.
- Always indicate required fields textually, not just with symbols.
- Test with real screen readers.
- Support various input types (email, password, tel, number, etc.) with appropriate type attributes.

---

📌 **References**

- [WCAG 2.1 - Success Criterion 1.3.1 Information and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)
- [WCAG 2.1 - Success Criterion 1.4.3 Minimum Contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum)
- [WCAG 2.1 - Success Criterion 2.1.1 Keyboard](https://www.w3.org/TR/WCAG21/#keyboard)
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visible](https://www.w3.org/TR/WCAG21/#focus-visible)
- [WCAG 2.1 - Success Criterion 3.3.1 Error Identification](https://www.w3.org/TR/WCAG21/#error-identification)
- [WCAG 2.1 - Success Criterion 4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG21/#name-role-value)
