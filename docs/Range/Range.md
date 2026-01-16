# **📌 Range **

  

## **1. Component Overview**

  

The Range component allows you to set a value (or range of values) by dragging one or two thumbs along a track. It is often used for filters (price, distance) or settings (volume). It must be usable without drag & drop, so with keyboard, and must correctly communicate current value, minimum/maximum, and, if present, selected range.

---

## **2. Requisiti di Accessibilità (WCAG)**

  

### **🔹 WCAG 1.3.1 - Information and Relationships**

- Il range it must have un’etichetta testuale associata.
    
- Se è presente un valore visualizzato (es. “€ 10 – € 80”), deve essere collegato al controllo tramite aria-describedby.
    
- Per slider custom, esporre il ruolo corretto (role="slider") e i valori min/max/now.
    

```
<label id="price-label">Price</label>
<div
  role="slider"
  aria-labelledby="price-label"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-valuenow="50"
  tabindex="0"
></div>
```

---

### **🔹 WCAG 1.4.1 - Use of Color**

- The selected range must not be indicated only by the color of the track.
    
- Add an additional indicator (e.g., pattern, border, text with range) or always available text feedback.
    

---

### **🔹 WCAG 1.4.3 - Minimum Contrast**

- Labels and values: minimum contrast **4.5:1**.
    
- Track, thumb, tick, and status indicators: minimum contrast **3:1**.
    
- The thumb must be distinguishable from the track even without color.
    

---

### **🔹 WCAG 2.1.1 - Keyboard**

- The thumb must be reachable with Tab.
    
- Adjustment must be possible via keyboard:
    
    - Arrow Left/Down: decreases the value.
        
    - Arrow Right/Up: increases the value.
        
    - Page Up / Page Down: larger increments.
        
    - Home / End: minimum/maximum.
        
    
- If there are **two thumbs** (range), both must be reachable and adjustable individually.
    

---

### **🔹 WCAG 2.4.7 - Focus Visible**

- Focus must always be visible on the thumb (or on the focusable element that controls the value).
    
- Focus indicator with minimum contrast **3:1**.
    

```
[role="slider"]:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 4px;x;
}
```

---

### **🔹 WCAG 2.5.1 - Pointer Gestures**

- If the slider requires dragging, an alternative must be available that does not require complex gestures.
    
- Always provide keyboard control and, if possible, an alternative numeric input.
    

---

### **🔹 WCAG 3.3.2 - Labels or Instructions**

- If the slider has particular steps, limits, or units of measure (€, km, %), they must be communicated.
    
- If the range is constrained (min < max), explain the behavior when the thumbs approach or "swap".
    

---

### **🔹 WCAG 4.1.2 - Nome, Ruolo, Valore**

- Per slider custom, aggiornare dinamicamente:
    
    - aria-valuenow
        
    - aria-valuemin
        
    - aria-valuemax
        
    - aria-valuetext (recommended for units/formatting)
        
    
- If it is a two-thumb range, each thumb must have a distinct name (e.g., "Minimum price" / "Maximum price").
    

```
<label id="min-label">Minimum price</label>
<div role="slider" aria-labelledby="min-label" aria-valuemin="0" aria-valuemax="100" aria-valuenow="10" aria-valuetext="10 euros" tabindex="0"></div>

<label id="max-label">Maximum price</label>
<div role="slider" aria-labelledby="max-label" aria-valuemin="0" aria-valuemax="100" aria-valuenow="80" aria-valuetext="80 euros" tabindex="0"></div>
```

---

## **3. Developer Guidelines**

  

✅ **Correct HTML Markup (preferred: native range input)**

```
<label for="volume">Volume</label>
<input id="volume" type="range" min="0" max="100" value="50" />
```

✅ **Correct HTML Markup (custom slider)**

```
<label id="vol-label">Volume</label>
<div
  role="slider"
  tabindex="0"
  aria-labelledby="vol-label"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-valuenow="50"
  aria-valuetext="50%"
></div>
```

🚫 **Wrong Example (drag only, no keyboard)**

```
<div class="slider" onmousedown="drag()"></div>
```

✅ **Focus Management**

```
[role="slider"]:focus-visible {
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
    

  

🎯 **Use Cases to Test**

- Is it possible to change the value using only keyboard (arrows, Page Up/Down, Home/End)?
    
- Does the screen reader announce current value, min, and max?
    
- If it is a two-thumb range, does each thumb have a distinct name?
    
- Is focus always visible?
    
- Is there text feedback for the value/range (not just color)?
    

---

## **5. Advanced Considerations**

  

🌍 **Internationalization**

- Consistent formatting of units (currency, percentages).
    
- Local decimal separator.
    

  

📱 **Responsiveness**

- Minimum interactive target **44×44 px** for the thumb.
    
- Avoid sliders that are too small on mobile.
    

  

🎞 **Motion and Animations**

```
@media (prefers-reduced-motion: reduce) {
  .slider {
    transition: none;
  }
}
```

---

## **6. Examples and Best Practices**

- Prefer input[type=range] when possible.
    
- If custom, expose role="slider" and update aria-valuenow and aria-valuetext.
    
- Always provide keyboard control and text feedback of the value.
    
- For two-thumb range, clearly name min/max.
    

---

📌 **References**

- [WCAG 2.1 - Success Criterion 1.3.1 Information and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)
    
- [WCAG 2.1 - Success Criterion 1.4.1 Use of Color](https://www.w3.org/TR/WCAG21/#use-of-color)
    
- [WCAG 2.1 - Success Criterion 1.4.3 Minimum Contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum)
    
- [WCAG 2.1 - Success Criterion 2.1.1 Keyboard](https://www.w3.org/TR/WCAG21/#keyboard)