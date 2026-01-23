
# **📌 Tabs**

  

## **1. Component Overview**

  

The component Tabs allows organizing related content into sections, displaying one panel at a time. Tabs must be keyboard navigable with predictable behavior and must correctly expose roles, states, and relationships between tabs and panels for assistive technologies.

---

## **2. Accessibility Requirements (WCAG)**

  

### **🔹 WCAG 1.3.1 - Information and Relationships**

- The tab container must have role="tablist".
    
- Each tab must have role="tab".
    
- Each panel must have role="tabpanel".
    
- Each tab must be associated with its own panel via aria-controls.
    
- Each panel must be associated with its own tab via aria-labelledby.
    

```
<div role="tablist" aria-label="Sections">
  <button role="tab" id="tab-1" aria-controls="panel-1" aria-selected="true">Tab 1</button>
  <button role="tab" id="tab-2" aria-controls="panel-2" aria-selected="false">Tab 2</button>
</div>

<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">
  Tab 1 content
</div>
<div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
  Tab 2 content
</div>
```

---

### **🔹 WCAG 1.4.3 - Minimum Contrast**

- Tab text must have a minimum contrast of **4.5:1**.
- The active tab indicator (underline, border, background) must respect **3:1**.
- Active/inactive state must not be communicated by color alone.
    

---

### **🔹 WCAG 2.1.1 - Keyboard**

- Tab: enters the tablist and then moves focus between tab/panel according to the expected flow.
    
- Arrow Left / Arrow Right: move focus between tabs.
    
- Home / End: first/last tab.
    
- Enter / Space: activate the focused tab.
    
- If tabs change content automatically on focus (auto-activation), the behavior must be consistent and tested.
    

```
<button role="tab" aria-selected="false" tabindex="-1">Tab 2</button>
```

---

### **🔹 WCAG 2.4.3 - Focus Order**

- The active tab must be the only one with tabindex="0".
    
- Inactive tabs must have tabindex="-1" (roving tabindex).
    
- Focus must not end up on hidden elements.
    

---

### **🔹 WCAG 2.4.7 - Focus Visible**

- Focus must always be visible on tabs.
- The focus indicator must have a minimum contrast of **3:1**.

```css
[role="tab"]:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 4px;
}
```

---

### **🔹 WCAG 4.1.2 - Name, Role, Value**

- The screen reader must correctly announce:
    
    - tab name
        
    - selected/unselected state (aria-selected)
        
    - relationship with panel (aria-controls, aria-labelledby)
        
- Inactive panel must be hidden (e.g., hidden) and must not be readable in navigation.

---

## **3. Developer Guidelines**

✅ **Correct HTML Markup**

```html
<div role="tablist" aria-label="Profile">
  <button role="tab" id="tab-a" aria-controls="panel-a" aria-selected="true" tabindex="0">Details</button>
  <button role="tab" id="tab-b" aria-controls="panel-b" aria-selected="false" tabindex="-1">Preferences</button>
</div>

<div role="tabpanel" id="panel-a" aria-labelledby="tab-a">
  Details content
</div>

<div role="tabpanel" id="panel-b" aria-labelledby="tab-b" hidden>
  Preferences content
</div>
```

🚫 **Wrong Example (missing semantics)**

```html
<div class="tabs">
  <div class="tab" onclick="openTab(1)">Tab 1</div>
</div>
```

✅ **Focus Management**

```
[role="tab"]:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 4px;x;
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
    

  

🎯 **Casi d’Uso da Testare**

- Can you navigate between tabs with arrow keys?
- Do Enter/Space activate the correct tab?
- Is only the active tab in tab order?
- Is the inactive panel truly hidden from focus and screen readers?

---

## **5. Advanced Considerations**

🌍 **Internationalization**

- Support longer text without truncating information.
- Localize tab names and content.
    

  

📱 **Responsiveness**

- Minimum interactive targets **44×44 px**.
    
- On overflow, manage scrolling or alternative menu without losing keyboard navigation.
    

  

🎞 **Motion and Animations**

```
@media (prefers-reduced-motion: reduce) {
  .tabs {
    transition: none;
  }
}
```

---

## **6. Examples and Best Practices**

- Use roving tabindex to manage focus correctly.
    
- Prefer activation with Enter/Space (manual activation) when content change is heavy.
    
- Hide inactive panels with hidden.
    
- Test with real screen reader and keyboard.
    

---

📌 **References**

- [WCAG 2.1 - Success Criterion 1.3.1 Information and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 1.4.3 Minimum Contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 2.1.1 Keyboard](https://www.w3.org/TR/WCAG21/#keyboard)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 2.4.3 Focus Order](https://www.w3.org/TR/WCAG21/#focus-order)
    
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visible](https://www.w3.org/TR/WCAG21/#focus-visible)
    
- [WCAG 2.1 - Success Criterion 4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG21/#name-role-value)
    
- [ARIA Authoring Practices - Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)![Attachment.tiff](file:///Attachment.tiff)