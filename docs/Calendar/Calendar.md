
## 1. Component Overview

The component `Calendar` allows users to select a single date or date range through a visual interface organized by days, weeks, and months. It is commonly used within forms, filters, and booking flows. It must be usable without a mouse and understandable without visual perception.

---

## 2. Accessibility Requirements

### 🔹 Role and Semantics

- The calendar must be structured as a logical grid of dates.
    
- Each selectable day must be a `button` element.
    
- The calendar container must expose a clear relationship between month/year and days.
    
- Each day must have an accessible name that includes the complete day, month, and year.
    
- Use `aria-selected` to indicate the selected date.
    
- Use `aria-disabled` for unavailable dates.
    

### 🔹 Navigation

- `Tab`: allows entering and exiting the calendar.
    
- `Arrow keys`: allow moving between days.
    
- `Enter` / `Space`: select the date.
    
- `Page Up` / `Page Down`: change the displayed month.
    
- `Home` / `End`: move focus to the start or end of the week.
    

### 🔹 Focus Management

- Focus must always be visible on the active day.
    
- Focus must not be lost during month changes.
    
- The focus indicator must have a minimum contrast of **3:1**.
    

### 🔹 Contrast and Visibility

- Day text must have a minimum contrast of **4.5:1**.
    
- States (selected, today, disabled) must have a minimum contrast of **3:1**.
    
- States must not be communicated exclusively through color.
    

### 🔹 Alternative Text

- Each day must expose a complete accessible name via `aria-label`.
    
- Avoid having the screen reader announce only the day number.
    

---

## 3. Developer Guidelines

✅ **Correct HTML Markup**

```
<div role="grid" aria-labelledby="calendar-label">
  <div id="calendar-label">April 2025</div>

  <button role="gridcell" aria-label="April 1, 2025">1</button>
  <button role="gridcell" aria-selected="true" aria-label="April 2, 2025">2</button>
  <button role="gridcell" aria-disabled="true" aria-label="April 3, 2025 unavailable">3</button>
</div>
```

🚫 **Wrong Example**

```
<div class="day" onclick="selectDate()">2</div>
```

❌ Problems:

- Non-semantic element
    
- Not keyboard navigable
    
- Date not announced correctly
    

✅ **Icon Management**

```
<button aria-label="Open date picker">
  <svg aria-hidden="true" focusable="false"></svg>
</button>
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
    

🎟 **Test Cases**

- Is the calendar fully keyboard navigable?
    
- Does focus remain visible during navigation?
    
- Is the selected date announced correctly?
    
- Are disabled dates perceivable?
    

---

## 5. Advanced Considerations

🌍 **Internationalization**

- Support for local date formats.
    
- Handling of the first day of the week.
    
- Localization of months and days.
    

📱 **Responsiveness**

- Minimum interactive targets **44×44 px**.
    
- Usable on touchscreen.
    
- Support for zoom up to **200%**.
    

🎞 **Motion and Animations**

```
@media (prefers-reduced-motion: reduce) {
  .calendar {
    transition: none;
  }
}
```

---

## 6. Examples and Best Practices

- Always expose the complete date to screen readers.
    
- Do not rely solely on color to indicate state.
    
- Correctly manage focus and navigation between months.
    
- Test with real screen readers.
    

---

📌 **References**

- [WCAG 2.1 - Success Criterion 1.3.1 Information and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)
    
- [WCAG 2.1 - Success Criterion 1.4.3 Minimum Contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum)
    
- [WCAG 2.1 - Success Criterion 2.1.1 Keyboard](https://www.w3.org/TR/WCAG21/#keyboard)
    
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visible](https://www.w3.org/TR/WCAG21/#focus-visible)
    
- [WCAG 2.1 - Success Criterion 4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG21/#name-role-value)
    
- [ARIA Authoring Practices - Date Picker](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/)