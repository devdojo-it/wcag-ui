# **📌 Switch 

  

## **1. Component Overview**

The `Switch` component allows you to activate or deactivate a setting (on/off) with a two-state control. It is conceptually similar to a checkbox, but with a different visual representation. It must clearly communicate state, label, and interactivity, and be fully usable with keyboard and screen reader.

---

## **2. Accessibility Requirements (WCAG)**

  

### **🔹 WCAG 1.1.1 - Alternative Text**

- If the switch does not have associated visible text, it must have an accessible name via aria-label or aria-labelledby.
    
- Decorative icons (e.g., sun/moon) must be aria-hidden="true".
    

```
<button role="switch" aria-checked="false" aria-label="Enable dark mode"></button>
```

---

### **🔹 WCAG 1.3.1 - Information and Relationships**

- The switch must have an associated text label, preferably visible.
    
- If there is supporting text or a description, connect it with aria-describedby.
    
- If the switch is part of a group of options, use a semantic structure (e.g., fieldset + legend).
    

```
<label id="notif-label">Notifications</label>
<button role="switch" aria-checked="true" aria-labelledby="notif-label"></button>
```

---

### **🔹 WCAG 1.4.3 - Minimum Contrast**

- Label and associated text: minimum contrast **4.5:1**.
    
- Status indicators (thumb, track, icons): minimum contrast **3:1**.
    
- The on/off state must not be communicated only through color.
    

---

### **🔹 WCAG 2.1.1 - Keyboard**

- The switch must be reachable with Tab.
    
- It must be activatable with Space and (if implemented) with Enter.
    
- The tab order must be consistent with the layout.
    

```
<button role="switch" aria-checked="false">Dark mode</button>
```

---

### **🔹 WCAG 2.4.7 - Focus Visible**

- Focus must always be visible on the control.
    
- The focus indicator must have a minimum contrast of **3:1**.
    

```
.switch:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 4px;
}
```

---

### **🔹 WCAG 3.2.2 - Consistency in Interactions**

- Activation must be predictable: a click or Space changes only the switch state.
    
- Avoid having the change immediately trigger destructive actions without confirmation.
    
- If the state change updates content elsewhere, avoid sudden focus movements.
    

---

### **🔹 WCAG 4.1.2 - Name, Role, Value**

- The control must correctly expose the switch role and on/off state.
    
- Use role="switch" with aria-checked="true|false" or a native checkbox with switch styling.
    
- The state must be updated dynamically.
    

```
<button role="switch" aria-checked="true">Active</button>
```

---

## **3. Developer Guidelines**

  

✅ **Correct HTML Markup (recommended: native checkbox)**

```
<div>
  <input type="checkbox" id="dark" />
  <label for="dark">Dark mode</label>
</div>
```

✅ **Correct HTML Markup (switch role)**

```
<label id="dark-label">Dark mode</label>
<button class="switch" role="switch" aria-checked="false" aria-labelledby="dark-label"></button>
```

🚫 **Wrong Example (lack of semantics)**

```
<div class="switch" onclick="toggle()"></div>
```

✅ **Focus Management**

```
.switch:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 4px;
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

- Is the switch reachable and activatable via keyboard?
    
- Does the screen reader correctly announce the label and state?
    
- Is focus always visible?
    
- Is the on/off state understandable even without color?
    

---

## **5. Advanced Considerations**

  

🌍 **Internationalization**

- Localizable labels.
    
- Avoid truncated text without an alternative.
    

  

📱 **Responsiveness**

- Minimum interactive target **44×44 px**.
    
- Usable on touchscreen and with 200% zoom.
    

  

🎞 **Motion and Animations**

```
@media (prefers-reduced-motion: reduce) {
  .switch {
    transition: none;
  }
}
```

---

## **6. Examples and Best Practices**

- Prefer a native styled checkbox when possible.
    
- Always make the state evident (text or aria-checked) beyond color.
    
- Avoid switches without a label.
    
- Test with real screen readers.
    

---

📌 **References**

- [WCAG 2.1 - Success Criterion 1.1.1 Alternative Text](https://www.w3.org/TR/WCAG21/#text-alternatives)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 1.3.1 Information and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 1.4.3 Minimum Contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 2.1.1 Keyboard](https://www.w3.org/TR/WCAG21/#keyboard)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visible](https://www.w3.org/TR/WCAG21/#focus-visible)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 3.2.2 Consistency in Interactions](https://www.w3.org/TR/WCAG21/#on-input)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG21/#name-role-value)
    
- [ARIA Authoring Practices - Switch Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)![Attachment.tiff](file:///Attachment.tiff)