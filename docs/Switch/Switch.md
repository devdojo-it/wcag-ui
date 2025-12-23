# **📌 Switch 

  

## **1. Overview del Componente**

  

Il componente Switch permette di attivare o disattivare un’impostazione (on/off) con un controllo a due stati. È concettualmente simile a una checkbox, ma con una rappresentazione visiva diversa. Deve comunicare chiaramente stato, etichetta e interattività, ed essere completamente utilizzabile da tastiera e con screen reader.

---

## **2. Requisiti di Accessibilità (WCAG)**

  

### **🔹 WCAG 1.1.1 - Testo Alternativo**

- Se lo switch non ha un testo visibile associato, deve avere un nome accessibile tramite aria-label o aria-labelledby.
    
- Icone decorative (es. sole/luna) devono essere aria-hidden="true".
    

```
<button role="switch" aria-checked="false" aria-label="Attiva modalità scura"></button>
```

---

### **🔹 WCAG 1.3.1 - Informazioni e Relazioni**

- Lo switch deve avere un’etichetta testuale associata, preferibilmente visibile.
    
- Se è presente un testo di supporto o una descrizione, collegarlo con aria-describedby.
    
- Se lo switch è parte di un gruppo di opzioni, utilizzare una struttura semantica (es. fieldset + legend).
    

```
<label id="notif-label">Notifiche</label>
<button role="switch" aria-checked="true" aria-labelledby="notif-label"></button>
```

---

### **🔹 WCAG 1.4.3 - Contrasto Minimo**

- Etichetta e testo associato: contrasto minimo **4.5:1**.
    
- Indicatori visivi dello stato (thumb, track, icone): contrasto minimo **3:1**.
    
- Lo stato on/off non deve essere comunicato solo tramite colore.
    

---

### **🔹 WCAG 2.1.1 - Tastiera**

- Lo switch deve essere raggiungibile con Tab.
    
- Deve essere attivabile con Space e (se implementato) con Enter.
    
- L’ordine di tabulazione deve essere coerente con il layout.
    

```
<button role="switch" aria-checked="false">Modalità scura</button>
```

---

### **🔹 WCAG 2.4.7 - Focus Visibile**

- Il focus deve essere sempre visibile sul controllo.
    
- Il focus indicator deve avere un contrasto minimo di **3:1**.
    

```
.switch:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 4px;
}
```

---

### **🔹 WCAG 3.2.2 - Coerenza nelle Interazioni**

- L’attivazione deve essere prevedibile: un click o Space cambia solo lo stato dello switch.
    
- Evitare che la modifica attivi immediatamente azioni distruttive senza conferma.
    
- Se il cambio di stato aggiorna contenuti altrove, evitare spostamenti improvvisi del focus.
    

---

### **🔹 WCAG 4.1.2 - Nome, Ruolo, Valore**

- Il controllo deve esporre correttamente il ruolo di switch e lo stato on/off.
    
- Utilizzare role="switch" con aria-checked="true|false" oppure una checkbox nativa con stile switch.
    
- Lo stato deve essere aggiornato dinamicamente.
    

```
<button role="switch" aria-checked="true">Attivo</button>
```

---

## **3. Linee Guida per gli Sviluppatori**

  

✅ **Markup HTML Corretto (consigliato: checkbox nativa)**

```
<div>
  <input type="checkbox" id="dark" />
  <label for="dark">Modalità scura</label>
</div>
```

✅ **Markup HTML Corretto (role switch)**

```
<label id="dark-label">Modalità scura</label>
<button class="switch" role="switch" aria-checked="false" aria-labelledby="dark-label"></button>
```

🚫 **Esempio Errato (mancanza di semantica)**

```
<div class="switch" onclick="toggle()"></div>
```

✅ **Gestione del Focus**

```
.switch:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 4px;
}
```

---

## **4. Test e Validazione**

  

🛠 **Tecnologie Assistive Testate**

- NVDA
    
- VoiceOver
    
- JAWS
    

  

🛠 **Strumenti di Verifica**

- [axe DevTools](https://www.deque.com/axe/)![Attachment.tiff](file:///Attachment.tiff)
    
- [WAVE](https://wave.webaim.org/)![Attachment.tiff](file:///Attachment.tiff)
    
- [Lighthouse Accessibility Audit](https://developers.google.com/web/tools/lighthouse/)![Attachment.tiff](file:///Attachment.tiff)
    

  

🎯 **Casi d’Uso da Testare**

- Lo switch è raggiungibile e attivabile da tastiera?
    
- Lo screen reader annuncia correttamente label e stato?
    
- Il focus è sempre visibile?
    
- Lo stato on/off è comprensibile anche senza colore?
    

---

## **5. Considerazioni Avanzate**

  

🌍 **Internazionalizzazione**

- Etichette localizzabili.
    
- Evitare testi troncati senza alternativa.
    

  

📱 **Reattività**

- Target interattivo minimo **44×44 px**.
    
- Utilizzabile su touchscreen e con zoom al 200%.
    

  

🎞 **Motion e Animazioni**

```
@media (prefers-reduced-motion: reduce) {
  .switch {
    transition: none;
  }
}
```

---

## **6. Esempi e Best Practices**

- Preferire una checkbox nativa stilizzata quando possibile.
    
- Rendere sempre evidente lo stato (testo o aria-checked) oltre al colore.
    
- Evitare switch senza etichetta.
    
- Testare con screen reader reali.
    

---

📌 **Riferimenti**

- [WCAG 2.1 - Success Criterion 1.1.1 Testo Alternativo](https://www.w3.org/TR/WCAG21/#text-alternatives)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 1.3.1 Informazioni e Relazioni](https://www.w3.org/TR/WCAG21/#info-and-relationships)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 1.4.3 Contrasto Minimo](https://www.w3.org/TR/WCAG21/#contrast-minimum)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 2.1.1 Tastiera](https://www.w3.org/TR/WCAG21/#keyboard)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visibile](https://www.w3.org/TR/WCAG21/#focus-visible)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 3.2.2 Coerenza nelle Interazioni](https://www.w3.org/TR/WCAG21/#on-input)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 4.1.2 Nome, Ruolo, Valore](https://www.w3.org/TR/WCAG21/#name-role-value)![Attachment.tiff](file:///Attachment.tiff)
    
- [ARIA Authoring Practices - Switch Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)![Attachment.tiff](file:///Attachment.tiff)