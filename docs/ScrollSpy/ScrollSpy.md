# **📌 Scrollspy - Accessibility**

  

## **1. Component Overview**

  

The Scrollspy component automatically highlights the currently visible section within a navigation (usually sidebar or in-page). It is typical for long pages (documentation, articles, product pages) and is based on anchor links (e.g., #section-1).

  

An accessible scrollspy must:

- function as **normal anchor navigation**;
    
- not depend on color alone to indicate the active section;
    
- not move focus "unexpectedly" while the user scrolls;
    
- correctly communicate the active state (e.g., aria-current).
    

---

## **2. Accessibility Requirements (WCAG)**

  

### **🔹 WCAG 1.3.1 - Information and Relationships**

- The scrollspy navigation must be a semantic element (nav) with an accessible name.
    
- The list of links must be structured as a list (ul/li) when applicable.
    
- Each target section must have a unique id and a coherent heading.
    

```
<nav aria-label="On this page">
  <ul>
    <li><a href="#intro">Introduction</a></li>
    <li><a href="#details">Details</a></li>
  </ul>
</nav>

<section id="intro">
  <h2>Introduction</h2>
</section>
```

---

### **🔹 WCAG 1.4.1 - Use of Color**

- The active section must not be indicated by color alone.
    
- Accompany the color with an additional indicator (e.g., underline, icon, border, font-weight) with adequate contrast.
    

---

### **🔹 WCAG 1.4.3 - Minimum Contrast**

- Link text: minimum contrast **4.5:1**.
    
- State indicators (border/underline/marker): minimum contrast **3:1**.
    

---

### **🔹 WCAG 2.4.1 - Skip Blocks**

- If the page is long or has repeated navigation, provide a "Skip to content" link and/or a structure that allows bypassing menu and sidebar.
    

---

### **🔹 WCAG 2.4.3 - Focus Order**

- Navigation must follow a logical order.
    
- "Automatic" management of the active state must not alter the tab order.
    
- Prevent scrollspy from changing focus while the user scrolls.
    

---

### **🔹 WCAG 2.4.4 - Link Purpose**

- The text of each link must clearly describe the destination (section title).
    
- Avoid generic links like "Go" or "Section".
    

---

### **🔹 WCAG 2.4.7 - Focus Visible**

- The scrollspy links must have visible focus.
    
- The focus indicator must have a minimum contrast of **3:1**.
    

```
.scrollspy a:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 3px;
}
```

---

### **🔹 WCAG 3.2.1 - On Focus**

- Focusing a link must not cause unexpected changes (e.g., automatic scroll).
    
- Scrolling should only occur when the user **activates** the link (Enter/click), not when focusing it.
    

---

### **🔹 WCAG 4.1.2 - Name, Role, Value**

- The active section must be communicated with aria-current="location" on the corresponding link.
    
- aria-current must be updated when the visible section changes.
    

```
<a href="#details" aria-current="location">Details</a>
```

---

## **3. Developer Guidelines**

  

✅ **Correct HTML Markup**

```
<nav class="scrollspy" aria-label="On this page">
  <ul>
    <li><a href="#intro" aria-current="location">Introduction</a></li>
    <li><a href="#details">Details</a></li>
    <li><a href="#faq">FAQ</a></li>
  </ul>
</nav>

<main>
  <section id="intro"><h2>Introduction</h2></section>
  <section id="details"><h2>Details</h2></section>
  <section id="faq"><h2>FAQ</h2></section>
</main>
```

🚫 **Wrong Example (visual highlight only, no semantics)**

```
<div class="scrollspy">
  <div onclick="goTo('intro')">Introduction</div>
</div>
```

✅ **Managing active state (aria-current)**

```
// When the section changes (e.g., IntersectionObserver), update aria-current.
// Important: do not move focus automatically.
```

✅ **Scrolling and user preferences**

```
html:focus-within {
  scroll-behavior: auto;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
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
    

  

🎯 **Test Cases**

- Do the links work as standard anchors and go to the correct section?
    
- Is focus on links visible and not stolen during scroll?
    
- Is the active state communicated even without color?
    
- Is aria-current updated correctly?
    
- With prefers-reduced-motion, is scroll not forced to be "smooth"?
    

---

## **5. Considerazioni Avanzate**

  

🌍 **Internationalization**

- Assicurare che i titoli di sezione e i link siano localizzati e consistenti.
    
- Gestire testi lunghi (wrapping, ellissi con alternativa).
    

  

📱 **Responsiveness**

- On mobile, navigation can become sticky or transform into a dropdown, while maintaining:
    
    - logical order,
        
    - visible focus,
        
    - stato attivo non basato solo sul colore.
        
    
- Target interattivi minimi **44×44 px**.
    

  

🎞 **Motion and Animations**

```
@media (prefers-reduced-motion: reduce) {
  .scrollspy {
    transition: none;
  }
}
```

---

## **6. Examples and Best Practices**

- Scrollspy must be normal anchor navigation, not a "teleport" managed only via JS.
    
- Do not change focus automatically when the user scrolls.
    
- Use aria-current="location" to indicate the active section.
    
- Do not rely solely on color: add consistent visual indicators.
    

---

📌 **References**

- [WCAG 2.1 - Success Criterion 1.3.1 Information and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 1.4.1 Use of Color](https://www.w3.org/TR/WCAG21/#use-of-color)
    
- [WCAG 2.1 - Success Criterion 1.4.3 Minimum Contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum)
    
- [WCAG 2.1 - Success Criterion 2.4.1 Skip Blocks](https://www.w3.org/TR/WCAG21/#bypass-blocks)
    
- [WCAG 2.1 - Success Criterion 2.4.3 Focus Order](https://www.w3.org/TR/WCAG21/#focus-order)
    
- [WCAG 2.1 - Success Criterion 2.4.4 Link Purpose](https://www.w3.org/TR/WCAG21/#link-purpose-in-context)
    
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visible](https://www.w3.org/TR/WCAG21/#focus-visible)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 3.2.1 On Focus](https://www.w3.org/TR/WCAG21/#on-focus)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG21/#name-role-value)![Attachment.tiff](file:///Attachment.tiff)
    
- [ARIA Authoring Practices - Landmark Regions (nav)](https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/)![Attachment.tiff](file:///Attachment.tiff)
    
- [ARIA - aria-current (spec)](https://www.w3.org/TR/wai-aria-1.2/#aria-current)![Attachment.tiff](file:///Attachment.tiff)