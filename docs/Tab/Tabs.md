
# **📌 Tabs**

  

## **1. Overview del Componente**

  

The component Tabs consente di organizzare contenuti correlati in sezioni, mostrando un pannello alla volta. Le tab devono essere navigabili da tastiera con un comportamento prevedibile e devono esporre correttamente ruoli, stati e relazioni tra tab e pannelli per le tecnologie assistive.

---

## **2. Requisiti di Accessibilità (WCAG)**

  

### **🔹 WCAG 1.3.1 - Information and Relationships**

- Il contenitore delle tab it must have role="tablist".
    
- Ogni tab it must have role="tab".
    
- Ogni pannello it must have role="tabpanel".
    
- Ogni tab deve essere associata al proprio pannello tramite aria-controls.
    
- Ogni pannello deve essere associato alla propria tab tramite aria-labelledby.
    

```
<div role="tablist" aria-label="Sezioni">
  <button role="tab" id="tab-1" aria-controls="panel-1" aria-selected="true">Tab 1</button>
  <button role="tab" id="tab-2" aria-controls="panel-2" aria-selected="false">Tab 2</button>
</div>

<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">
  Contenuto Tab 1
</div>
<div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
  Contenuto Tab 2
</div>
```

---

### **🔹 WCAG 1.4.3 - Minimum Contrast**

- Il testo delle tab it must have un contrasto minimo **4.5:1**.
    
- L’indicatore di tab attiva (underline, bordo, background) deve rispettare **3:1**.
    
- Lo stato attivo/non attivo non deve essere comunicato solo con colore.
    

---

### **🔹 WCAG 2.1.1 - Keyboard**

- Tab: entra nella tablist e poi passa dal focus alle tab/pannello secondo il flusso previsto.
    
- Arrow Left / Arrow Right: spostano il focus tra le tab.
    
- Home / End: prima/ultima tab.
    
- Enter / Space: attivano la tab focalizzata.
    
- Se le tab cambiano contenuto automaticamente al focus (auto-activation), il comportamento deve essere coerente e testato.
    

```
<button role="tab" aria-selected="false" tabindex="-1">Tab 2</button>
```

---

### **🔹 WCAG 2.4.3 - Ordine del Focus**

- La tab attiva deve essere l’unica con tabindex="0".
    
- Le tab non attive devono avere tabindex="-1" (roving tabindex).
    
- Il focus non deve finire su elementi nascosti.
    

---

### **🔹 WCAG 2.4.7 - Focus Visible**

- Il focus deve essere sempre visibile sulle tab.
    
- Il focus indicator it must have un contrasto minimo di **3:1**.
    

```
[role="tab"]:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 4px;x;
}
```

---

### **🔹 WCAG 4.1.2 - Nome, Ruolo, Valore**

- Lo screen reader deve annunciare correttamente:
    
    - nome della tab
        
    - stato selezionato/non selezionato (aria-selected)
        
    - relazione con il pannello (aria-controls, aria-labelledby)
        
    
- Il pannello non attivo deve essere nascosto (es. hidden) e non deve essere leggibile in navigazione.
    

---

## **3. Linee Guida per gli Sviluppatori**

  

✅ **Correct HTML Markup**

```
<div role="tablist" aria-label="Profilo">
  <button role="tab" id="tab-a" aria-controls="panel-a" aria-selected="true" tabindex="0">Dettagli</button>
  <button role="tab" id="tab-b" aria-controls="panel-b" aria-selected="false" tabindex="-1">Preferenze</button>
</div>

<div role="tabpanel" id="panel-a" aria-labelledby="tab-a">
  Contenuto Dettagli
</div>

<div role="tabpanel" id="panel-b" aria-labelledby="tab-b" hidden>
  Contenuto Preferenze
</div>
```

🚫 **Wrong Example (mancanza di semantica)**

```
<div class="tabs">
  <div class="tab" onclick="openTab(1)">Tab 1</div>
</div>
```

✅ **Gestione del Focus**

```
[role="tab"]:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 4px;x;
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

- È possibile navigare tra le tab con le frecce?
    
- Enter/Space attivano la tab corretta?
    
- Solo la tab attiva è in tab order?
    
- Il pannello inattivo è davvero nascosto a focus e screen reader?
    

---

## **5. Considerazioni Avanzate**

  

🌍 **Internationalization**

- Supportare testi più lunghi senza troncare informazioni.
    
- Localizzare nomi tab e contenuti.
    

  

📱 **Responsiveness**

- Target interattivi minimi **44×44 px**.
    
- In overflow, gestire scrolling o menu alternativo senza perdere navigazione da tastiera.
    

  

🎞 **Motion e Animazioni**

```
@media (prefers-reduced-motion: reduce) {
  .tabs {
    transition: none;
  }
}
```

---

## **6. Esempi e Best Practices**

- Usare roving tabindex per gestire correttamente il focus.
    
- Preferire attivazione con Enter/Space (manual activation) quando il cambio contenuto è pesante.
    
- Nascondere i pannelli non attivi con hidden.
    
- Testare con screen reader e tastiera reale.
    

---

📌 **References**

- [WCAG 2.1 - Success Criterion 1.3.1 Information and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 1.4.3 Minimum Contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 2.1.1 Keyboard](https://www.w3.org/TR/WCAG21/#keyboard)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 2.4.3 Ordine del Focus](https://www.w3.org/TR/WCAG21/#focus-order)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visible](https://www.w3.org/TR/WCAG21/#focus-visible)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 4.1.2 Nome, Ruolo, Valore](https://www.w3.org/TR/WCAG21/#name-role-value)![Attachment.tiff](file:///Attachment.tiff)
    
- [ARIA Authoring Practices - Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)![Attachment.tiff](file:///Attachment.tiff)