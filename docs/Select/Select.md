# **📌 Select 

  

## **1. Component Overview**

  

The component Select allows you to choose an option from a list of values. It can be a native select (`<select>`) or a custom component (combobox) with a dropdown list. It must be usable with the keyboard, understandable with screen readers, and predictable in its open, navigation, and selection behaviors.

---

## **2. Accessibility Requirements (WCAG)**

  

### **🔹 WCAG 1.1.1 - Alternative Text**

- If the open control (chevron, icon) is separate from the field and is only iconic, it must have an accessible label (aria-label or aria-labelledby).
    
- Decorative icons must be aria-hidden="true".
    

```
<button type="button" aria-label="Open options list">
  <svg aria-hidden="true" focusable="false"></svg>
</button>
```

---

### **🔹 WCAG 1.3.1 - Information and Relationships**

- The field must have an associated visible label (or an equivalent accessible name).
    
- The help message, placeholder "select…" (if present), and error must be linked via aria-describedby.
    
- **Native Select**: prefer `<label>` + `<select>`.
    
- **Custom Select**: correctly expose the combobox pattern with associated list.
    

```
<label for="city">City</label>
<select id="city">
  <option value="">Select…</option>
  <option>Milan</option>
</select>
```

---

### **🔹 WCAG 1.4.3 - Minimum Contrast**

- Text of the selected value and options: minimum contrast **4.5:1**.
    
- States (focus, hover, selected, disabled) must be distinguishable with minimum contrast **3:1**.
    
- Error state must not be based on color alone.
    

---

### **🔹 WCAG 2.1.1 - Keyboard**

- Tab: focus on the field.
    
- Enter / Space: (for custom select) opens/closes the list.
    
- Arrow Up / Arrow Down: navigate between options.
    
- Home / End: first/last option.
    
- Esc: closes the list without changing selection.
    
- Typing letters: moves focus to matching options (typeahead), if implemented.
    
- When the list is open, navigation must remain consistent and not trap the user.
    

```
<div role="combobox" aria-expanded="false" aria-controls="listbox-1" aria-haspopup="listbox">
  <input aria-autocomplete="list" aria-controls="listbox-1" />
</div>
```

---

### **🔹 WCAG 2.4.7 - Focus Visible**

- Focus must always be visible on the field and on options (when navigated via keyboard).
    
- Opening the list, focus must move in a predictable manner:
    
    - to the selected option, or
        
    - to the first available option.
        
    
- Closing with Esc, focus must return to the field.
    

```
.select :focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 3px;
}
```

---

### **🔹 WCAG 3.3.1 - Error Identification**

- If the field is required and not selected, the error must be expressed as text.
    
- Link the error to the field with aria-describedby.
    
- Use aria-invalid="true" only when the state is truly invalid.
    

```
<select id="city" aria-invalid="true" aria-describedby="city-error">
  <option value="">Select…</option>
  <option>Milan</option>
</select>
<p id="city-error">Select a city.</p>
```

---

### **🔹 WCAG 4.1.2 - Name, Role, Value**

- The control must correctly expose name and role.
    
- For custom components, use role="combobox" and a list with role="listbox" and role="option".
    
- The selected option must be communicated with aria-selected="true".
    

```
<div role="listbox" id="listbox-1" aria-label="Cities">
  <div role="option" aria-selected="true">Milan</div>
  <div role="option">Rome</div>
</div>
```

---

## **3. Developer Guidelines**

  

✅ **Correct HTML Markup (preferred: native)**

```
<label for="country">Country</label>
<select id="country">
  <option value="">Select…</option>
  <option value="it">Italy</option>
  <option value="fr">France</option>
</select>
```

✅ **Correct HTML Markup (custom combobox + listbox)**

```
<label id="lang-label" for="lang">Language</label>
<div
  role="combobox"
  aria-labelledby="lang-label"
  aria-expanded="false"
  aria-controls="lang-list"
  aria-haspopup="listbox"
>
  <input id="lang" aria-autocomplete="list" aria-controls="lang-list" />
</div>

<div id="lang-list" role="listbox" hidden>
  <div role="option" aria-selected="true">Italian</div>
  <div role="option">English</div>
</div>
```

🚫 **Wrong Example (lack of semantics)**

```
<div class="select" onclick="open()">Select…</div>
```

✅ **Focus Management**

```
.select :focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 3px;
}
```

---

## **4. Testing and Validation**

  

🛠 **Assistive Technologies Tested**

- NVDA
    
- VoiceOver
    
- JAWS
    

  

🛠 **Verification Tools**

- [axe DevTools](https://www.deque.com/axe/)![Attachment.tiff](file:///Attachment.tiff)
    
- [WAVE](https://wave.webaim.org/)![Attachment.tiff](file:///Attachment.tiff)
    
- [Lighthouse Accessibility Audit](https://developers.google.com/web/tools/lighthouse/)![Attachment.tiff](file:///Attachment.tiff)
    

  

🎯 **Use Cases to Test**

- Is the select usable via keyboard in all phases (focus, open, navigate, select, close)?
    
- Does the screen reader correctly announce label, value, and state (open/closed)?
    
- Is the selected option announced correctly?
    
- Are errors and descriptions linked to the field?
    

---

## **5. Advanced Considerations**

  

🌍 **Internationalization**

- Correctly handle languages with longer text.
    
- Support different alphabets and typeahead input (if provided).
    

  

📱 **Responsiveness**

- Minimum interactive targets **44×44 px**.
    
- Options easily selectable on touchscreen.
    

  

🎞 **Motion and Animations**

```
@media (prefers-reduced-motion: reduce) {
  .select {
    transition: none;
  }
}
```

---

## **6. Examples and Best Practices**

- Prefer the native select when possible.
    
- If custom, follow the ARIA combobox + listbox pattern.
    
- Avoid overlays that steal focus or close unexpectedly.
    
- Make states clear (selected, disabled, error) even without color.
    

---

📌 **References**

- [WCAG 2.1 - Success Criterion 1.1.1 Alternative Text](https://www.w3.org/TR/WCAG21/#text-alternatives)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 1.3.1 Information and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 1.4.3 Minimum Contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 2.1.1 Keyboard](https://www.w3.org/TR/WCAG21/#keyboard)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visible](https://www.w3.org/TR/WCAG21/#focus-visible)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 3.3.1 Error Identification](https://www.w3.org/TR/WCAG21/#error-identification)
    
- [WCAG 2.1 - Success Criterion 4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG21/#name-role-value)
    
- [ARIA Authoring Practices - Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)![Attachment.tiff](file:///Attachment.tiff)