
## 1. Component Overview

The component `Calendar` consente la selezione di una data o di un intervallo di date tramite un’interfaccia visiva organizzata per giorni, settimane e mesi. È comunemente utilizzato all’interno di form, filtri e flussi di prenotazione. Deve essere utilizzabile senza mouse e comprensibile anche senza percezione visiva.

---

## 2. Accessibility Requirements

### 🔹 Ruolo e Semantica

- Il calendario deve essere strutturato come una griglia logica di date.
    
- Ogni giorno selezionabile deve essere un elemento `button`.
    
- Il contenitore del calendario deve esporre una relazione chiara tra mese/anno e giorni.
    
- Ogni giorno it must have un nome accessibile che includa giorno, mese e anno completi.
    
- Utilizzare `aria-selected` per indicare la data selezionata.
    
- Utilizzare `aria-disabled` per le date non disponibili.
    

### 🔹 Navigabilità

- `Tab`: consente di entrare e uscire dal calendario.
    
- `Frecce`: consentono di spostarsi tra i giorni.
    
- `Enter` / `Space`: selezionano la data.
    
- `Page Up` / `Page Down`: cambiano il mese visualizzato.
    
- `Home` / `End`: spostano il focus all’inizio o alla fine della settimana.
    

### 🔹 Focus Management

- Il focus deve essere sempre visibile sul giorno attivo.
    
- Il focus non deve andare perso durante il cambio di mese.
    
- Il focus indicator it must have un contrasto minimo di **3:1**.
    

### 🔹 Contrasto e Visibilità

- Il testo dei giorni it must have un contrasto minimo **4.5:1**.
    
- Gli stati (selezionato, oggi, disabilitato) devono avere un contrasto minimo **3:1**.
    
- Gli stati non devono essere comunicati esclusivamente tramite colore.
    

### 🔹 Alternativa Testuale

- Ogni giorno deve esporre un nome accessibile completo tramite `aria-label`.
    
- Evitare che lo screen reader annunci solo il numero del giorno.
    

---

## 3. Developer Guidelines

✅ **Correct HTML Markup**

```
<div role="grid" aria-labelledby="calendar-label">
  <div id="calendar-label">Aprile 2025</div>

  <button role="gridcell" aria-label="1 aprile 2025">1</button>
  <button role="gridcell" aria-selected="true" aria-label="2 aprile 2025">2</button>
  <button role="gridcell" aria-disabled="true" aria-label="3 aprile 2025 non disponibile">3</button>
</div>
```

🚫 **Wrong Example**

```
<div class="day" onclick="selectDate()">2</div>
```

❌ Problemi:

- Elemento non semantico
    
- Non navigabile da tastiera
    
- Data non annunciata correttamente
    

✅ **Gestione delle icone**

```
<button aria-label="Apri selettore data">
  <svg aria-hidden="true" focusable="false"></svg>
</button>
```

---

## 4. Testing and Validation

🛠 **Assistive Technologies Tested**

- NVDA
    
- VoiceOver
    
- JAWS
    

🛠 **Verification Tools**

- [axe DevTools](https://www.deque.com/axe/)
    
- [WAVE](https://wave.webaim.org/)
    
- [Lighthouse Accessibility Audit](https://developers.google.com/web/tools/lighthouse/)
    

🎯 **Casi d’Uso da Testare**

- Il calendario è completamente navigabile da tastiera?
    
- Il focus rimane visibile durante la navigazione?
    
- La data selezionata viene annunciata correttamente?
    
- Le date disabilitate sono percepibili?
    

---

## 5. Advanced Considerations

🌍 **Internationalization**

- Supporto a formati data locali.
    
- Gestione del primo giorno della settimana.
    
- Localizzazione di mesi e giorni.
    

📱 **Responsiveness**

- Target interattivi minimi **44×44 px**.
    
- Utilizzabile su touchscreen.
    
- Supporto allo zoom fino al **200%**.
    

🎞 **Motion e Animazioni**

```
@media (prefers-reduced-motion: reduce) {
  .calendar {
    transition: none;
  }
}
```

---

## 6. Examples and Best Practices

- Esporre sempre la data completa agli screen reader.
    
- Non basarsi solo sul colore per indicare lo stato.
    
- Gestire correttamente focus e navigazione tra mesi.
    
- Testare con screen reader reali.
    

---

📌 **References**

- [WCAG 2.1 - Success Criterion 1.3.1 Information and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)
    
- [WCAG 2.1 - Success Criterion 1.4.3 Minimum Contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum)
    
- [WCAG 2.1 - Success Criterion 2.1.1 Keyboard](https://www.w3.org/TR/WCAG21/#keyboard)
    
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visible](https://www.w3.org/TR/WCAG21/#focus-visible)
    
- [WCAG 2.1 - Success Criterion 4.1.2 Nome, Ruolo, Valore](https://www.w3.org/TR/WCAG21/#name-role-value)
    
- [ARIA Authoring Practices - Date Picker](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/)