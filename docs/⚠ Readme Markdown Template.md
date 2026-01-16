
# 📌 [Component Name] - Accessibility

## 1. Component Overview
Brief description of the component and its purpose.

---

## 2. Accessibility Requirements

### 🔹 Role and Semantics
- Description of the correct role of the component (e.g., `button`, `heading`, `list`).
- Need for `aria-*` attributes, if applicable.

### 🔹 Navigability
- How the component should be handled with the keyboard (`Tab`, `Enter`, `Esc`, arrows, etc.).

### 🔹 Focus Management
- Specify if and how focus is handled.
- Focus visibility requirements (`:focus-visible`, minimum 3:1 contrast).

### 🔹 Contrast and Visibility
- Required contrast levels (e.g., 4.5:1 for text, 3:1 for graphic elements).

### 🔹 Alternative Text
- Guidelines on `alt`, `aria-label`, `aria-labelledby` for non-text elements.

---

## 3. Developer Guidelines

✅ **Correct HTML Markup**
```html
<!-- Esempio di codice accessibile -->
```

🚫 **Wrong Example**
```html
<!-- Esempio di codice non accessibile -->
```

✅ **Icon Management**
```html
<!-- Example with aria-label for icon-only buttons -->
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
- Is the component navigable from the keyboard?
- Does it have sufficient contrast?
- Does it work with screen readers?

---

## 5. Advanced Considerations

🌍 **Internationalization**
- Support for different languages.

📱 **Responsiveness**
- Must work well on touchscreen (minimum 44x44px).

🎞 **Motion and Animations**
```css
@media (prefers-reduced-motion: reduce) {
  /* Reduce or eliminate animations */
}
```

---

## 6. Examples and Best Practices
✅ **Best practices and code snippets**

---

📌 **References**
- [WCAG 2.1 - Success Criterion ...](https://www.w3.org/TR/WCAG21/#...)
- [ARIA Authoring Practices - ...](https://www.w3.org/WAI/ARIA/apg/patterns/...)
