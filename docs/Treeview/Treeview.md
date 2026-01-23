# **📌 Treeview**

  

## **1. Component Overview**

  

The component Treeview (or Tree) allows users to navigate and handle a hierarchical structure of elements (nodes) with nested levels. Nodes can be expandable/collapsible and, depending on the use case, selectable (single or multiple selection). It must be fully usable from the keyboard and correctly communicate hierarchy, state (expanded/collapsed, selected), and position (level) to assistive technologies.

---

## **2. Accessibility Requirements (WCAG)**

  

### **🔹 WCAG 1.3.1 - Information and Relationships**

- The tree must expose a semantic structure consistent with a hierarchy.
    
- The main container must have role="tree".
    
- Each node must have role="treeitem".
    
- Groups of children must be contained in role="group".
    
- Expandable nodes must expose aria-expanded="true|false".
    
- If nodes are selectable, use aria-selected="true|false".
    

```
<ul role="tree" aria-label="Categories">
  <li role="treeitem" aria-expanded="false" aria-selected="false" tabindex="0">
    Documents
    <ul role="group" hidden>
      <li role="treeitem" aria-selected="false" tabindex="-1">Report</li>
    </ul>
  </li>
</ul>
```

---

### **🔹 WCAG 1.4.3 - Minimum Contrast**

- Node text: minimum contrast **4.5:1**.
    
- Indicators (chevron, lines, icons) and states (focus, selected): minimum contrast **3:1**.
    
- Selection and expanded/collapsed state must not rely on color alone.
    

---

### **🔹 WCAG 2.1.1 - Keyboard**

- The tree must support keyboard navigation according to established patterns:
    
    - Arrow Up / Arrow Down: move focus to the previous/next visible node.
        
    - Arrow Right: if node is collapsed → expands; if already expanded → focus first child.
        
    - Arrow Left: if node is expanded → collapses; if collapsed → focus parent.
        
    - Home / End: first/last visible node.
        
    - Enter / Space: activate the primary action (e.g., selection).
        
    - * (optional): expands all siblings at the same level (if implemented).
        
    
- Tab must enter/exit the tree (only one element in tab order: roving tabindex).
    

---

### **🔹 WCAG 2.4.3 - Focus Order**

- Apply **roving tabindex**:
    
    - only one treeitem with tabindex="0" (the currently focused one),
        
    - the others tabindex="-1".
        
    
- Focus must not end up on hidden (collapsed) nodes.
    

---

### **🔹 WCAG 2.4.7 - Focus Visible**

- Focus must always be visible on the active node.
    
- The focus indicator must have a minimum contrast of **3:1**.
    

```
[role="treeitem"]:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 3px;
}
```

---

### **🔹 WCAG 4.1.2 - Name, Role, Value**

- Each node must have an accessible name (visible text or aria-label).
    
- Expandable nodes must update aria-expanded dynamically.
    
- Selection/deselection must update aria-selected.
- If nodes have checkboxes (multi-selection), consider patterns with native checkboxes and clear relationship with treeitem.

---

## **3. Developer Guidelines**

✅ **Correct HTML Markup**

```html
<ul role="tree" aria-label="Structure">
  <li role="treeitem" aria-expanded="true" tabindex="0">
    Projects
    <ul role="group">
      <li role="treeitem" tabindex="-1">2024</li>
      <li role="treeitem" tabindex="-1">2025</li>
    </ul>
  </li>
</ul>
```

🚫 **Wrong Example (missing semantics)**

```html
<div class="tree-node" onclick="toggle()">Projects</div>
<div class="children">2024</div>
```

✅ **Focus Management**

```css
[role="treeitem"]:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 3px;
}
```

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

- Is it possible to navigate all nodes with arrow keys?
- Do Arrow Right/Left expand/collapse as expected?
- Is only one node in tab order (roving tabindex)?
- Does screen reader announce level, expanded/collapsed state, and selection?
- Are collapsed nodes not reachable or announced?

---

## **5. Advanced Considerations**

🌍 **Internationalization**

- Support long text without losing readability.
- Avoid truncation without an accessible alternative.

📱 **Responsiveness**

- Minimum interactive targets **44×44 px** for nodes.
- On mobile, consider an alternative layout (drill-down list) if space is limited.
    

  

🎞 **Motion and Animations**

```
@media (prefers-reduced-motion: reduce) {
  .tree {
    transition: none;
  }
}
```

---

## **6. Examples and Best Practices**

- Use roving tabindex for a clean keyboard experience.
    
- Do not use "fake" checkboxes: prefer native controls or tested patterns.
    
- Clearly announce state and selection.
    
- Test with real screen readers on deep hierarchies.
    

---

📌 **References**

- [WCAG 2.1 - Success Criterion 1.3.1 Information and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 1.4.3 Minimum Contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 2.1.1 Keyboard](https://www.w3.org/TR/WCAG21/#keyboard)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 2.4.3 Focus Order](https://www.w3.org/TR/WCAG21/#focus-order)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visible](https://www.w3.org/TR/WCAG21/#focus-visible)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG21/#name-role-value)![Attachment.tiff](file:///Attachment.tiff)
    
- [ARIA Authoring Practices - Tree View Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/)![Attachment.tiff](file:///Attachment.tiff)