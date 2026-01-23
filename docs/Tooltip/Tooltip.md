# 📌 Tooltip 

## 1. Component Overview

The `Tooltip` component shows contextual support information, usually brief, associated with a trigger element (icon, text, button). The tooltip should not be essential to understanding or using the interface: if it contains essential information, a different pattern should be considered (e.g., persistent text or inline help).

---

## 2. Accessibility Requirements (WCAG)

### 🔹 WCAG 1.3.1 - Information and Relationships

- The tooltip must be associated with the trigger via `aria-describedby`.
    
- The tooltip content must be in a separate element with `role="tooltip"`.
    
- The tooltip must have a stable `id` referenced by the trigger.
    

```html
<button aria-describedby="tip-1">Info</button>
<div id="tip-1" role="tooltip" hidden>
  Help text.
</div>
```

---

### 🔹 WCAG 1.4.3 - Minimum Contrast

- The tooltip text must respect a minimum contrast of **4.5:1**.
    
- The tooltip (background/border) and visual indicator (arrow) must respect at least **3:1**.
    

---

### 🔹 WCAG 1.4.13 - Content on Hover or Focus

- The tooltip must appear on both **hover** and **focus** of the trigger.
    
- It must be possible to **dismiss** (close) the tooltip without moving focus, typically with `Esc`.
    
- The tooltip must not disappear immediately when the pointer moves over the tooltip (if interactive) and must allow the user to reach it if it contains interactive elements.
    
- The tooltip must not cover important content and must not prevent interaction with the trigger.
    

---

### 🔹 WCAG 2.1.1 - Keyboard

- The trigger must be reachable with `Tab`.
    
- On focus, the tooltip must be visible.
    
- `Esc`: closes the tooltip.
    
- If the tooltip contains interactive content, it is no longer a tooltip: it should be treated as a popover/dialog (different pattern).
    

---

### 🔹 WCAG 2.4.7 - Focus Visible

- The trigger must have visible focus.
    
- The tooltip must not steal focus.
    

```css
.tooltip-trigger:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 4px;x;
}
```

---

### 🔹 WCAG 4.1.2 - Name, Role, Value

- The trigger must have an accessible name.
    
- The tooltip must expose `role="tooltip"`.
    
- The association must occur via `aria-describedby`.
    

---

## 3. Developer Guidelines

✅ **Correct HTML Markup**

```html
<button class="tooltip-trigger" aria-describedby="help-tip">
  <span aria-hidden="true">i</span>
  <span class="sr-only">Information</span>
</button>

<div id="help-tip" role="tooltip" hidden>
  The code is reported in the "Details" section.
</div>
```

🚫 **Wrong Example (solo hover)**

```html
<span class="info" onmouseenter="showTip()">i</span>
```

✅ **Icon Management**

```html
<button aria-label="Show information" aria-describedby="tip-2">
  <svg aria-hidden="true" focusable="false"></svg>
</button>
<div id="tip-2" role="tooltip" hidden>
  Supporting information.
</div>
```

---

## 4. Testing and Validation

🛠 **Assistive Technologies Tested**

- NVDA
    
- VoiceOver
    
- JAWS
    

🛠 **Verification Tools**

- [axe DevTools](https://www.deque.com/axe/)
    
- [WAVE](https://wave.webaim.org/)
    
- [Lighthouse Accessibility Audit](https://developers.google.com/web/tools/lighthouse/)
    

🎯 **Test Cases**

- Does the tooltip appear on both hover and focus?
    
- Is the tooltip dismissable with `Esc`?
    
- Does the tooltip remain visible long enough to be read?
    
- Is the content correctly announced via `aria-describedby`?
    

---

## 5. Advanced Considerations

🌍 **Internationalization**

- Test with longer texts.
    
- Avoid overly verbose tooltips.
    

📱 **Responsiveness**

- On touchscreen, provide consistent behavior (tap to show/hide).
    
- Minimum interactive target **44×44 px** for the trigger.
    

🎞 **Motion and Animations**

```css
@media (prefers-reduced-motion: reduce) {
  .tooltip {
    transition: none;
  }
}
```

---

## 6. Examples and Best Practices

- Do not use tooltips for essential information.
    
- Show on focus, not just on hover.
    
- Close with `Esc` and do not steal focus.
    
- If interaction is needed inside, use a popover/dialog.
    

---

📌 **References**

- [WCAG 2.1 - Success Criterion 1.3.1 Information and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)
    
- [WCAG 2.1 - Success Criterion 1.4.3 Minimum Contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum)
    
- [WCAG 2.1 - Success Criterion 1.4.13 Content on Hover or Focus](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus)
    
- [WCAG 2.1 - Success Criterion 2.1.1 Keyboard](https://www.w3.org/TR/WCAG21/#keyboard)
    
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visible](https://www.w3.org/TR/WCAG21/#focus-visible)
    
- [WCAG 2.1 - Success Criterion 4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG21/#name-role-value)
    
- [ARIA Authoring Practices - Tooltip Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)