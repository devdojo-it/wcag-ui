# **📌 Range **

  

## **1. Overview del Componente**

  

Il componente Range consente di impostare un valore (o un intervallo di valori) trascinando uno o due thumb lungo una traccia. È spesso usato per filtri (prezzo, distanza) o impostazioni (volume). Deve essere utilizzabile senza drag & drop, quindi con tastiera, e deve comunicare correttamente valore corrente, minimo/massimo e, se presente, intervallo selezionato.

---

## **2. Requisiti di Accessibilità (WCAG)**

  

### **🔹 WCAG 1.3.1 - Informazioni e Relazioni**

- Il range deve avere un’etichetta testuale associata.
    
- Se è presente un valore visualizzato (es. “€ 10 – € 80”), deve essere collegato al controllo tramite aria-describedby.
    
- Per slider custom, esporre il ruolo corretto (role="slider") e i valori min/max/now.
    

```
<label id="price-label">Prezzo</label>
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

### **🔹 WCAG 1.4.1 - Uso del Colore**

- L’intervallo selezionato non deve essere indicato solo dal colore della traccia.
    
- Aggiungere un indicatore aggiuntivo (es. pattern, bordo, testo con range) o un feedback testuale sempre disponibile.
    

---

### **🔹 WCAG 1.4.3 - Contrasto Minimo**

- Etichette e valori: contrasto minimo **4.5:1**.
    
- Traccia, thumb, tick e indicatori di stato: contrasto minimo **3:1**.
    
- Il thumb deve essere distinguibile dalla traccia anche senza colore.
    

---

### **🔹 WCAG 2.1.1 - Tastiera**

- Il thumb deve essere raggiungibile con Tab.
    
- La regolazione deve essere possibile da tastiera:
    
    - Arrow Left/Down: diminuisce il valore.
        
    - Arrow Right/Up: aumenta il valore.
        
    - Page Up / Page Down: incrementi maggiori.
        
    - Home / End: minimo/massimo.
        
    
- Se ci sono **due thumb** (range), entrambi devono essere raggiungibili e regolabili singolarmente.
    

---

### **🔹 WCAG 2.4.7 - Focus Visibile**

- Il focus deve essere sempre visibile sul thumb (o sull’elemento focusabile che controlla il valore).
    
- Focus indicator con contrasto minimo **3:1**.
    

```
[role="slider"]:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 4px;
}
```

---

### **🔹 WCAG 2.5.1 - Movimenti del Puntatore**

- Se lo slider richiede trascinamento, deve essere disponibile un’alternativa che non richieda gesti complessi.
    
- Fornire sempre controllo via tastiera e, se possibile, un input numerico alternativo.
    

---

### **🔹 WCAG 3.3.2 - Etichette o Istruzioni**

- Se lo slider ha step particolari, limiti o unità di misura (€, km, %), devono essere comunicati.
    
- Se l’intervallo è vincolato (min < max), spiegare il comportamento quando i thumb si avvicinano o si “scambiano”.
    

---

### **🔹 WCAG 4.1.2 - Nome, Ruolo, Valore**

- Per slider custom, aggiornare dinamicamente:
    
    - aria-valuenow
        
    - aria-valuemin
        
    - aria-valuemax
        
    - aria-valuetext (consigliato per unità/formatting)
        
    
- Se è un range a due thumb, ogni thumb deve avere un nome distinto (es. “Prezzo minimo” / “Prezzo massimo”).
    

```
<label id="min-label">Prezzo minimo</label>
<div role="slider" aria-labelledby="min-label" aria-valuemin="0" aria-valuemax="100" aria-valuenow="10" aria-valuetext="10 euro" tabindex="0"></div>

<label id="max-label">Prezzo massimo</label>
<div role="slider" aria-labelledby="max-label" aria-valuemin="0" aria-valuemax="100" aria-valuenow="80" aria-valuetext="80 euro" tabindex="0"></div>
```

---

## **3. Linee Guida per gli Sviluppatori**

  

✅ **Markup HTML Corretto (preferibile: input range nativo)**

```
<label for="volume">Volume</label>
<input id="volume" type="range" min="0" max="100" value="50" />
```

✅ **Markup HTML Corretto (custom slider)**

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

🚫 **Esempio Errato (solo drag, nessuna tastiera)**

```
<div class="slider" onmousedown="drag()"></div>
```

✅ **Gestione del Focus**

```
[role="slider"]:focus-visible {
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

- È possibile cambiare valore solo da tastiera (frecce, Page Up/Down, Home/End)?
    
- Lo screen reader annuncia valore corrente, min e max?
    
- Se è un range a due thumb, ogni thumb ha un nome distinto?
    
- Il focus è sempre visibile?
    
- È presente un feedback testuale del valore/intervalle (non solo colore)?
    

---

## **5. Considerazioni Avanzate**

  

🌍 **Internazionalizzazione**

- Formattazione coerente delle unità (valuta, percentuali).
    
- Separatore decimale locale.
    

  

📱 **Reattività**

- Target interattivi minimi **44×44 px** per il thumb.
    
- Evitare slider troppo piccoli su mobile.
    

  

🎞 **Motion e Animazioni**

```
@media (prefers-reduced-motion: reduce) {
  .slider {
    transition: none;
  }
}
```

---

## **6. Esempi e Best Practices**

- Preferire input[type=range] quando possibile.
    
- Se custom, esporre role="slider" e aggiornare aria-valuenow e aria-valuetext.
    
- Fornire sempre controllo da tastiera e un feedback testuale del valore.
    
- Per range a due thumb, nominare chiaramente min/max.
    

---

📌 **Riferimenti**

- [WCAG 2.1 - Success Criterion 1.3.1 Informazioni e Relazioni](https://www.w3.org/TR/WCAG21/#info-and-relationships)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 1.4.1 Uso del Colore](https://www.w3.org/TR/WCAG21/#use-of-color)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 1.4.3 Contrasto Minimo](https://www.w3.org/TR/WCAG21/#contrast-minimum)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 2.1.1 Tastiera](https://www.w3.org/TR/WCAG21/#keyboard)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 2.