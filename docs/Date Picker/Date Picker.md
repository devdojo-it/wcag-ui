# 📌 Date Picker 

## 1. Component Overview

The component `Date Picker` allows users to enter or select a date via an input field and a calendar (popup or inline). It must support both manual entry (when provided) and calendar selection, ensuring full usability via keyboard and screen readers.

---

## 2. Accessibility Requirements (WCAG)

### 🔹 WCAG 1.1.1 - Alternative Text

- If the calendar opening control is represented only by an icon, it must have an accessible label (`aria-label` or `aria-labelledby`).
    
- Decorative icons inside the component must be `aria-hidden="true"`.
    

```html
<button type="button" aria-label="Open date picker">
  <svg aria-hidden="true" focusable="false"></svg>
</button>
```

---

### 🔹 WCAG 1.3.1 - Information and Relationships

- The input must be associated with a visible `label` or an equivalent accessible name.
    
- If a format message or instructions are present, they must be associated with the input via `aria-describedby`.
    
- The calendar popup must be logically linked to the input (e.g., via `aria-controls`).
    
- Calendar days must be structured as a logical grid and be announceable.
    

```html
<label for="date">Date</label>
<input id="date" type="text" aria-describedby="date-hint" />
<p id="date-hint">Format: DD/MM/YYYY</p>
```

---

### 🔹 WCAG 1.4.3 - Minimum Contrast

- Text in input, placeholder (if used), and calendar contents must respect **4.5:1**.
    
- States (focus, selected, today, disabled) must be distinguishable with a minimum contrast of **3:1**.
    
- If an error is indicated by color, there must also be a textual or iconic indication with an accessible name.
    

---

### 🔹 WCAG 2.1.1 - Keyboard

- The input must be reachable with `Tab`.
    
- The "open calendar" button must be reachable with `Tab` and activatable with `Enter`/`Space`.
    
- In the calendar:
    
    - `Arrow keys`: navigate between days.
        
    - `Enter`/`Space`: select the date.
        
    - `Esc`: closes the popup and returns focus to the input (or opening button).
        
    - `Page Up`/`Page Down`: change month.
        
    - `Home`/`End`: move to the start/end of the week.
        
- If manual input is provided, it must not be blocked by inaccessible masks.
    

```html
<button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="calendar-popup">
  Open calendar
</button>
```

---

### 🔹 WCAG 2.4.7 - Focus Visible

- Focus must always be visible on input, button, and calendar days.
    
- When opening the calendar, focus must move in a predictable manner:
    
    - to the selected day, or
        
    - to the current day, if no date is selected.
        
- When closing the calendar with `Esc`, focus must return to the control that opened it.
    

```css
.date-picker :focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 3px;
}
```

---

### 🔹 WCAG 3.3.1 - Error Identification

- In case of invalid or out-of-range date, the error message must be textual.
- The error must be associated with the input via `aria-describedby`.
- If you use `aria-invalid="true"`, it must be consistent with the actual field state.

```html
<input id="date" aria-invalid="true" aria-describedby="date-error" />
<p id="date-error">Enter a valid date in DD/MM/YYYY format.</p>
```

---

### 🔹 WCAG 4.1.2 - Name, Role, Value

- Input, button, and days must expose correct role and name.
    
- The popup must correctly declare its nature (e.g., `role="dialog"` or equivalent pattern).
    
- The selected date must be announced (e.g., via `aria-selected="true"` on days).
    

```html
<div id="calendar-popup" role="dialog" aria-label="Date picker">
  <button role="gridcell" aria-selected="true" aria-label="April 15, 2025">15</button>
</div>
```

---

## 3. Developer Guidelines

✅ **Correct HTML Markup**

```html
<label for="dp">Date</label>
<div class="date-picker">
  <input id="dp" type="text" aria-describedby="dp-hint" />
  <button type="button" aria-label="Open date picker" aria-haspopup="dialog" aria-expanded="false" aria-controls="dp-dialog">
    <svg aria-hidden="true" focusable="false"></svg>
  </button>
</div>

<p id="dp-hint">Format: DD/MM/YYYY</p>

<div id="dp-dialog" role="dialog" aria-label="Date picker" hidden>
  <div role="grid" aria-label="April 2025">
    <button role="gridcell" aria-label="April 15, 2025" aria-selected="true">15</button>
  </div>
</div>
```

🚫 **Wrong Example (missing semantics)**

```html
<div class="date" onclick="openCalendar()">15/04/2025</div>
```

✅ **Focus Management**

```css
.date-picker :focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 3px;
}
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

- Can the calendar be opened and closed with keyboard only?
    
- Does focus move correctly between input and calendar?
    
- Does the screen reader announce the complete date and selected state?
    
- Are format or range errors announced correctly?
    

---

## 5. Advanced Considerations

🌍 **Internationalization**

- Support for local date formats.
    
- Localization of months and days.
    
- Handling of the first day of the week.
    

📱 **Responsiveness**

- Minimum interactive targets **44×44 px** for button and days.
    
- Usable on touchscreen and with 200% zoom.
    

🎞 **Motion and Animations**

```css
@media (prefers-reduced-motion: reduce) {
  .date-picker {
    transition: none;
  }
}
```

---

## 6. Examples and Best Practices

- Always allow an alternative manual input option, when provided.
    
- Do not rely solely on the placeholder to communicate the format.
    
- Make focus predictable when opening/closing the calendar.
    
- Correctly handle ranges and disabled dates.
    

---

📌 **References**

- [WCAG 2.1 - Success Criterion 1.1.1 Alternative Text](https://www.w3.org/TR/WCAG21/#text-alternatives)
    
- [WCAG 2.1 - Success Criterion 1.3.1 Information and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)
    
- [WCAG 2.1 - Success Criterion 1.4.3 Minimum Contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum)
    
- [WCAG 2.1 - Success Criterion 2.1.1 Keyboard](https://www.w3.org/TR/WCAG21/#keyboard)
    
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visible](https://www.w3.org/TR/WCAG21/#focus-visible)
    
- [WCAG 2.1 - Success Criterion 3.3.1 Error Identification](https://www.w3.org/TR/WCAG21/#error-identification)
    
- [WCAG 2.1 - Success Criterion 4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG21/#name-role-value)
    
- [ARIA Authoring Practices - Date Picker Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/)