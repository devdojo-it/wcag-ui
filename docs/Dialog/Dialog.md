# 📌 Dialog

## 1. Component Overview
The `Dialog` component is used to display modal windows or important alerts that require user attention. It must be accessible via keyboard, screen reader, and ensure clear visual hierarchy.

---

## 2. Accessibility Requirements (WCAG)

### 🔹 WCAG 1.3.1 - Information and Relationships
- The `dialog` must be contained within an HTML5 `<dialog>` or a `div` with `role="dialog"`.
- It must have an `aria-labelledby` to identify the title and an `aria-describedby` for the content.

```html
<dialog id="modal" aria-labelledby="modal-title" aria-describedby="modal-content">
  <h2 id="modal-title">Window Title</h2>
  <p id="modal-content">This is the content of the dialog window.</p>
  <button onclick="closeDialog()">Close</button>
</dialog>
```

### 🔹 WCAG 1.4.3 - Minimum Contrast
- The dialog content must have a minimum contrast of **4.5:1** compared to the background.
- The background overlay must have sufficient opacity to ensure readability and visual separation from the main content.

### 🔹 WCAG 2.1.1 - Keyboard
- The dialog must be activatable and closeable with `Esc`.
- Focus must be trapped within the dialog until it is closed.
- The first interactive element must receive focus automatically when opened.

```js
const dialog = document.getElementById("modal");
document.getElementById("openDialog").addEventListener("click", () => {
  dialog.showModal();
  dialog.querySelector("button").focus();
});

dialog.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    dialog.close();
  }
});
```

### 🔹 WCAG 2.4.7 - Focus Visible
- Focus must be clearly visible and correctly managed in the interaction cycle within the dialog.

```css
button:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 4px;x;
  
}
```

### 🔹 WCAG 4.1.2 - Name, Role, Value
- Screen readers must correctly perceive the `dialog` role and related associated elements.

```html
<div role="dialog" aria-labelledby="dialog-title" aria-describedby="dialog-content">
  <h2 id="dialog-title">Warning</h2>
  <p id="dialog-content">Your account is about to expire.</p>
  <button>OK</button>
</div>
```

---

## 3. Developer Guidelines

✅ **Correct HTML Markup**
```html
<dialog id="example-dialog">
  <h2>Confirm Action</h2>
  <p>Are you sure you want to continue?</p>
  <button onclick="closeDialog()">Cancel</button>
  <button>Confirm</button>
</dialog>
```

🚫 **Wrong Example (lack of focus management)**
```html
<div class="dialog">Message</div> <!-- Does not manage focus nor correct semantics -->
```

✅ **Focus Management**
```js
const dialog = document.getElementById("example-dialog");
dialog.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    dialog.close();
  }
});
```

🚫 **Common mistake: not providing a close mechanism**
```html
<dialog open>Warning! You cannot close this window.</dialog>
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
- Is the dialog navigable and activatable via keyboard?
- Is the focus visible and clearly distinct?
- Is the contrast between text and background sufficient?
- Do screen readers correctly announce the title and content of the dialog?
- Does focus remain trapped within the dialog until closure?

---

## 5. Advanced Considerations

🌍 **Internationalization**
- Test with longer text for different languages.
- Avoid all-uppercase text that can impair readability.

📱 **Responsiveness**
- Must be easily usable on touchscreen.
- Ensure that buttons are clearly selectable and visible on small screens.

🎞 **Motion and Animations**
```css
@media (prefers-reduced-motion: reduce) {
  .dialog {
    animation: none;
  }
}
```

---

## 6. Examples and Best Practices
✅ **Use `<dialog>` or `role="dialog"` for correct semantics.**
✅ **Ensure clear focus visibility for keyboard navigation.**
✅ **Trap focus within the dialog until it is closed.**
✅ **Test with screen reader to verify correct announcement of content.**
✅ **Always provide a clear and effective close mechanism.**

---

📌 **References**
- [WCAG 2.1 - Success Criterion 1.3.1 Information and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)
- [WCAG 2.1 - Success Criterion 1.4.3 Minimum Contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum)
- [WCAG 2.1 - Success Criterion 2.1.1 Keyboard](https://www.w3.org/TR/WCAG21/#keyboard)
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visible](https://www.w3.org/TR/WCAG21/#focus-visible)
- [WCAG 2.1 - Success Criterion 4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG21/#name-role-value)