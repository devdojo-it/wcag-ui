# **📌 Select 

  

## **1. Overview del Componente**

  

Il componente Select consente di scegliere un’opzione da una lista di valori. Può essere un select nativo (<select>) oppure un componente custom (combobox) con lista in overlay. Deve essere utilizzabile con tastiera, comprensibile con screen reader e prevedibile nei comportamenti di apertura, navigazione e selezione.

---

## **2. Requisiti di Accessibilità (WCAG)**

  

### **🔹 WCAG 1.1.1 - Testo Alternativo**

- Se il controllo di apertura (chevron, icona) è separato dal campo ed è solo iconico, deve avere un’etichetta accessibile (aria-label o aria-labelledby).
    
- Icone decorative devono essere aria-hidden="true".
    

```
<button type="button" aria-label="Apri elenco opzioni">
  <svg aria-hidden="true" focusable="false"></svg>
</button>
```

---

### **🔹 WCAG 1.3.1 - Informazioni e Relazioni**

- Il campo deve avere una label visibile associata (o un nome accessibile equivalente).
    
- Il messaggio di aiuto, placeholder “seleziona…” (se presente) e l’errore devono essere collegati tramite aria-describedby.
    
- **Select nativo**: preferire <label> + <select>.
    
- **Select custom**: esporre correttamente il pattern di combobox con lista associata.
    

```
<label for="city">Città</label>
<select id="city">
  <option value="">Seleziona…</option>
  <option>Milano</option>
</select>
```

---

### **🔹 WCAG 1.4.3 - Contrasto Minimo**

- Testo del valore selezionato e delle opzioni: contrasto minimo **4.5:1**.
    
- Stati (focus, hover, selected, disabled) devono essere distinguibili con contrasto minimo **3:1**.
    
- Lo stato di errore non deve basarsi solo sul colore.
    

---

### **🔹 WCAG 2.1.1 - Tastiera**

- Tab: focus sul campo.
    
- Enter / Space: (per custom select) apre/chiude la lista.
    
- Arrow Up / Arrow Down: naviga tra le opzioni.
    
- Home / End: prima/ultima opzione.
    
- Esc: chiude la lista senza cambiare selezione.
    
- Digitando lettere: sposta il focus su opzioni corrispondenti (typeahead), se implementato.
    
- Quando la lista è aperta, la navigazione deve rimanere consistente e non intrappolare l’utente.
    

```
<div role="combobox" aria-expanded="false" aria-controls="listbox-1" aria-haspopup="listbox">
  <input aria-autocomplete="list" aria-controls="listbox-1" />
</div>
```

---

### **🔹 WCAG 2.4.7 - Focus Visibile**

- Il focus deve essere sempre visibile sul campo e sulle opzioni (quando navigate da tastiera).
    
- Aprendo la lista, il focus deve spostarsi in modo prevedibile:
    
    - sull’opzione selezionata, oppure
        
    - sulla prima opzione disponibile.
        
    
- Chiudendo con Esc, il focus deve tornare al campo.
    

```
.select :focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 3px;
}
```

---

### **🔹 WCAG 3.3.1 - Identificazione degli Errori**

- Se il campo è obbligatorio e non selezionato, l’errore deve essere espresso come testo.
    
- Collegare l’errore al campo con aria-describedby.
    
- Usare aria-invalid="true" solo quando lo stato è realmente invalido.
    

```
<select id="city" aria-invalid="true" aria-describedby="city-error">
  <option value="">Seleziona…</option>
  <option>Milano</option>
</select>
<p id="city-error">Seleziona una città.</p>
```

---

### **🔹 WCAG 4.1.2 - Nome, Ruolo, Valore**

- Il controllo deve esporre correttamente nome e ruolo.
    
- Per componenti custom, utilizzare role="combobox" e una lista con role="listbox" e role="option".
    
- L’opzione selezionata deve essere comunicata con aria-selected="true".
    

```
<div role="listbox" id="listbox-1" aria-label="Città">
  <div role="option" aria-selected="true">Milano</div>
  <div role="option">Roma</div>
</div>
```

---

## **3. Linee Guida per gli Sviluppatori**

  

✅ **Markup HTML Corretto (preferibile: nativo)**

```
<label for="country">Paese</label>
<select id="country">
  <option value="">Seleziona…</option>
  <option value="it">Italia</option>
  <option value="fr">Francia</option>
</select>
```

✅ **Markup HTML Corretto (custom combobox + listbox)**

```
<label id="lang-label" for="lang">Lingua</label>
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
  <div role="option" aria-selected="true">Italiano</div>
  <div role="option">English</div>
</div>
```

🚫 **Esempio Errato (mancanza di semantica)**

```
<div class="select" onclick="open()">Seleziona…</div>
```

✅ **Gestione del Focus**

```
.select :focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 3px;
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

- Il select è utilizzabile da tastiera in tutte le fasi (focus, open, navigate, select, close)?
    
- Lo screen reader annuncia correttamente label, valore e stato (aperto/chiuso)?
    
- L’opzione selezionata è annunciata correttamente?
    
- Errori e descrizioni sono collegati al campo?
    

---

## **5. Considerazioni Avanzate**

  

🌍 **Internazionalizzazione**

- Gestire correttamente lingue con testi più lunghi.
    
- Supportare alfabeti diversi e input typeahead (se previsto).
    

  

📱 **Reattività**

- Target interattivi minimi **44×44 px**.
    
- Opzioni facilmente selezionabili su touchscreen.
    

  

🎞 **Motion e Animazioni**

```
@media (prefers-reduced-motion: reduce) {
  .select {
    transition: none;
  }
}
```

---

## **6. Esempi e Best Practices**

- Preferire il select nativo quando possibile.
    
- Se custom, seguire il pattern ARIA di combobox + listbox.
    
- Evitare overlay che rubano focus o chiudono in modo inatteso.
    
- Rendere chiari gli stati (selected, disabled, error) anche senza colore.
    

---

📌 **Riferimenti**

- [WCAG 2.1 - Success Criterion 1.1.1 Testo Alternativo](https://www.w3.org/TR/WCAG21/#text-alternatives)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 1.3.1 Informazioni e Relazioni](https://www.w3.org/TR/WCAG21/#info-and-relationships)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 1.4.3 Contrasto Minimo](https://www.w3.org/TR/WCAG21/#contrast-minimum)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 2.1.1 Tastiera](https://www.w3.org/TR/WCAG21/#keyboard)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visibile](https://www.w3.org/TR/WCAG21/#focus-visible)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 3.3.1 Identificazione degli Errori](https://www.w3.org/TR/WCAG21/#error-identification)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 4.1.2 Nome, Ruolo, Valore](https://www.w3.org/TR/WCAG21/#name-role-value)![Attachment.tiff](file:///Attachment.tiff)
    
- [ARIA Authoring Practices - Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)![Attachment.tiff](file:///Attachment.tiff)