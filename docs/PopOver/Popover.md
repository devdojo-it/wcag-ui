# 📌 Popover 

## 1. Component Overview

The `Popover` component opens content in an overlay anchored to a trigger (e.g., "Actions" button, help icon, form field). Unlike the tooltip:

- it can contain **longer content**;
- it can contain **interactive elements** (links, buttons, fields);
- it requires explicit management of **opening/closing** and **focus**.

A typical popover opens with click or `Enter/Space` on the trigger and closes with `Esc` and/or click outside.

---

## 2. Accessibility Requirements (WCAG)

### 🔹 WCAG 1.1.1 - Alternative Text

- If the trigger is only an icon, it must have an accessible name (`aria-label` or `aria-labelledby`).
- Decorative icons (trigger or content) must be `aria-hidden="true"`.

```html
<button type="button" aria-label="Open actions">
  <svg aria-hidden="true" focusable="false"></svg>
</button>
```

---

### 🔹 WCAG 1.3.1 - Information and Relationships

- The trigger must declare the relationship with the content via `aria-controls`.
    
- The trigger must expose the state via `aria-expanded`.
    
- The popover content must have a name (with `aria-label` or `aria-labelledby`).
    
- Use a role consistent with the content:
    
    - `role="dialog"` if it contains structured content or controls.
        
    - `role="menu"` **only** if it is a true action menu (menu button pattern).
        

```html
<button
  type="button"
  aria-haspopup="dialog"
  aria-expanded="false"
  aria-controls="pop-1"
>
  Details
</button>

<div id="pop-1" role="dialog" aria-labelledby="pop-1-title" hidden>
  <h2 id="pop-1-title">Details</h2>
  <p>Popover content.</p>
</div>
```

---

### 🔹 WCAG 1.4.3 - Minimum Contrast

- Popover text and controls: minimum contrast **4.5:1**.
- Borders/indicators (arrow, outline, separator): minimum contrast **3:1**.
- States (focus, selected, disabled) must not be based solely on color.
    

---

### 🔹 WCAG 2.1.1 - Keyboard

- The trigger must be reachable with `Tab`.
- `Enter` / `Space` on the trigger open/close the popover.
- `Esc` closes the popover.
- If the popover contains interactive elements, they must be reachable with `Tab`.
    

---

### 🔹 WCAG 2.4.3 - Focus Order

- On opening, focus should move in a predictable manner:
  - to the **first interactive element** of the popover, or
  - to a focusable "header" element (if there are no controls).
- On closing, focus must return to the trigger.
- If the popover is **non-modal** (most common case), focus can leave the popover, but closing must remain controllable (e.g., `Esc` and click outside).
- If the popover is **modal** (rare case), it should be treated as a modal dialog with focus trap.
    

---

### 🔹 WCAG 2.4.7 - Focus Visible

- Focus must be visible on the trigger and on popover elements.
- The focus indicator must have a minimum contrast of **3:1**.

```css
.popover :focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 4px;
}
```

---

### 🔹 WCAG 3.2.2 - Consistency in Interactions

- Opening/closing must be predictable and consistent.
- Avoid "surprise" closures while the user is interacting inside the popover.
- If the popover closes on click outside, it must not close when the user clicks **inside**.
    

---

### 🔹 WCAG 4.1.2 - Name, Role, Value

- The trigger must update `aria-expanded` consistently with the state.
- The content must correctly expose role and name (`role="dialog"` + `aria-labelledby` or `aria-label`).
- If it is a menu, use `role="menu"` with items `role="menuitem"` (and consistent pattern).
    

---

## 3. Developer Guidelines

✅ **Correct HTML Markup (popover as non-modal dialog)**

```html
<button
  id="pop-trigger"
  type="button"
  aria-haspopup="dialog"
  aria-expanded="false"
  aria-controls="pop-panel"
>
  Actions
</button>

<div
  id="pop-panel"
  role="dialog"
  aria-labelledby="pop-title"
  hidden
>
  <h2 id="pop-title">Actions</h2>
  <button type="button">Edit</button>
  <button type="button">Duplicate</button>
  <button type="button" aria-label="Close popover">Close</button>
</div>
```

🚫 **Wrong Example**

```html
<div class="popover-trigger" onclick="openPopover()">Actions</div>
<div class="popover">...</div>
```

❌ Issues:

- Non-semantic trigger
- Missing `aria-expanded` and `aria-controls`
- No focus management
    

✅ **If the content is a true action menu (menu button pattern)**

```html
<button
  type="button"
  aria-haspopup="menu"
  aria-expanded="false"
  aria-controls="menu-1"
>
  Actions
</button>
ctions
</button>

<ul id="menu-1" role="menu" hidden>
  <li role="menuitem"><button type="button">Edit</button></li>
  <li role="menuitem"><button type="button">Delete

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

- Does the popover open/close with `Enter/Space`?
- Does `Esc` always close and return focus to the trigger?
- Does `aria-expanded` update correctly?
- Does focus enter the popover in a predictable manner?
- Can you navigate all internal controls from the keyboard?
    

---

## 5. Advanced Considerations

🌍 **Internationalization**

- Test long texts and multi-line content.
- Avoid layouts that cut off content or hide the "Close" button.

📱 **Responsiveness**

- Minimum interactive targets **44×44 px** for trigger and controls.
- On mobile, consider transforming into a dialog/bottom sheet for stability.
    

🎞 **Motion and Animations**

```css
@media (prefers-reduced-motion: reduce) {
  .popover {
    transition: none;
  }
}
```

---

## 6. Examples and Best Practices

✅ Always use semantic triggers (`<button>`, not `<div>`).
✅ Update `aria-expanded` consistently with popover state.
✅ Manage focus on open/close.
✅ Allow closing via `Esc` and click outside.
✅ Test with screen readers and keyboard navigation.

---

📌 **References**

- [ARIA: dialog role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role)
- [ARIA: menu role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/menu_role)
- [WCAG 2.1 - Keyboard](https://www.w3.org/TR/WCAG21/#keyboard)
- [WCAG 2.1 - Focus Visible](https://www.w3.org/TR/WCAG21/#focus-visible)
```