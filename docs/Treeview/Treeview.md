# **📌 Treeview**

  

## **1. Overview del Componente**

  

The component Treeview (o Tree) consente di navigare and handle una struttura gerarchica di elementi (nodi) con livelli annidati. I nodi possono essere espandibili/collassabili e, a seconda del caso d’uso, selezionabili (singola o multipla selezione). Deve essere fully usable da tastiera e comunicare correttamente gerarchia, stato (espanso/collassato, selezionato) e posizione (livello) alle tecnologie assistive.

---

## **2. Requisiti di Accessibilità (WCAG)**

  

### **🔹 WCAG 1.3.1 - Information and Relationships**

- Il tree deve esporre una struttura semantica coerente con una gerarchia.
    
- Il contenitore principale it must have role="tree".
    
- Ogni nodo it must have role="treeitem".
    
- I gruppi di figli devono essere contenuti in role="group".
    
- I nodi espandibili devono esporre aria-expanded="true|false".
    
- Se i nodi sono selezionabili, use aria-selected="true|false".
    

```
<ul role="tree" aria-label="Categorie">
  <li role="treeitem" aria-expanded="false" aria-selected="false" tabindex="0">
    Documenti
    <ul role="group" hidden>
      <li role="treeitem" aria-selected="false" tabindex="-1">Report</li>
    </ul>
  </li>
</ul>
```

---

### **🔹 WCAG 1.4.3 - Minimum Contrast**

- Testo dei nodi: contrasto minimo **4.5:1**.
    
- Indicatori (chevron, linee, icone) e stati (focus, selected): contrasto minimo **3:1**.
    
- Selezione e stato espanso/collassato non devono basarsi solo sul colore.
    

---

### **🔹 WCAG 2.1.1 - Keyboard**

- Il tree deve supportare la navigazione da tastiera secondo pattern consolidati:
    
    - Arrow Up / Arrow Down: spostano il focus al nodo precedente/successivo visibile.
        
    - Arrow Right: se nodo collassato → espande; se già espanso → focus al primo figlio.
        
    - Arrow Left: se nodo espanso → collassa; se collassato → focus al padre.
        
    - Home / End: primo/ultimo nodo visibile.
        
    - Enter / Space: attiva l’azione primaria (es. selezione).
        
    - * (opzionale): espande tutti i fratelli allo stesso livello (se implementato).
        
    
- Tab deve entrare/uscire dal tree (un solo elemento in tab order: roving tabindex).
    

---

### **🔹 WCAG 2.4.3 - Ordine del Focus**

- Applicare **roving tabindex**:
    
    - un solo treeitem con tabindex="0" (quello attualmente focalizzato),
        
    - gli altri tabindex="-1".
        
    
- Il focus non deve finire su nodi nascosti (collassati).
    

---

### **🔹 WCAG 2.4.7 - Focus Visible**

- Il focus deve essere sempre visibile sul nodo attivo.
    
- Il focus indicator it must have contrasto minimo **3:1**.
    

```
[role="treeitem"]:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 3px;
}
```

---

### **🔹 WCAG 4.1.2 - Nome, Ruolo, Valore**

- Ogni nodo it must have un nome accessibile (testo visibile o aria-label).
    
- I nodi espandibili devono aggiornare aria-expanded dinamicamente.
    
- Selezione/deselezione deve aggiornare aria-selected.
    
- Se i nodi hanno checkbox (multi-selezione), considerare pattern con checkbox native e relazione chiara con il treeitem.
    

---

## **3. Linee Guida per gli Sviluppatori**

  

✅ **Correct HTML Markup**

```
<ul role="tree" aria-label="Struttura">
  <li role="treeitem" aria-expanded="true" tabindex="0">
    Progetti
    <ul role="group">
      <li role="treeitem" tabindex="-1">2024</li>
      <li role="treeitem" tabindex="-1">2025</li>
    </ul>
  </li>
</ul>
```

🚫 **Wrong Example (mancanza di semantica)**

```
<div class="tree-node" onclick="toggle()">Progetti</div>
<div class="children">2024</div>
```

✅ **Gestione del Focus**

```
[role="treeitem"]:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 3px;
}
```

---

## **4. Test e Validazione**

  

🛠 **Assistive Technologies Tested**

- NVDA
    
- VoiceOver
    
- JAWS
    

  

🛠 **Verification Tools**

- [axe DevTools](https://www.deque.com/axe/)![Attachment.tiff](file:///Attachment.tiff)
    
- [WAVE](https://wave.webaim.org/)![Attachment.tiff](file:///Attachment.tiff)
    
- [Lighthouse Accessibility Audit](https://developers.google.com/web/tools/lighthouse/)![Attachment.tiff](file:///Attachment.tiff)
    

  

🎯 **Casi d’Uso da Testare**

- È possibile navigare tutti i nodi con le frecce?
    
- Arrow Right/Left espande/collassa come previsto?
    
- Solo un nodo è in tab order (roving tabindex)?
    
- Screen reader annuncia livello, stato espanso/collassato e selezione?
    
- I nodi collassati non sono raggiungibili né annunciati?
    

---

## **5. Considerazioni Avanzate**

  

🌍 **Internationalization**

- Supportare testi lunghi senza perdere leggibilità.
    
- Evitare troncamenti senza alternativa accessibile.
    

  

📱 **Responsiveness**

- Target interattivi minimi **44×44 px** per i nodi.
    
- In mobile, valutare un layout alternativo (lista drill-down) se lo spazio è limitato.
    

  

🎞 **Motion e Animazioni**

```
@media (prefers-reduced-motion: reduce) {
  .tree {
    transition: none;
  }
}
```

---

## **6. Esempi e Best Practices**

- Usare roving tabindex per un’esperienza tastiera pulita.
    
- Non use checkbox “fake”: preferire controlli nativi o pattern testati.
    
- Annunciare chiaramente stato e selezione.
    
- Testare con screen reader reali su gerarchie profonde.
    

---

📌 **References**

- [WCAG 2.1 - Success Criterion 1.3.1 Information and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 1.4.3 Minimum Contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 2.1.1 Keyboard](https://www.w3.org/TR/WCAG21/#keyboard)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 2.4.3 Ordine del Focus](https://www.w3.org/TR/WCAG21/#focus-order)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visible](https://www.w3.org/TR/WCAG21/#focus-visible)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 4.1.2 Nome, Ruolo, Valore](https://www.w3.org/TR/WCAG21/#name-role-value)![Attachment.tiff](file:///Attachment.tiff)
    
- [ARIA Authoring Practices - Tree View Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/)![Attachment.tiff](file:///Attachment.tiff)