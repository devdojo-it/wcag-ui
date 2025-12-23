# 📌 Date Picker 

## 1. Overview del Componente

Il componente `Date Picker` permette di inserire o selezionare una data tramite un campo di input e un calendario (popup o inline). Deve supportare sia l’inserimento manuale (quando previsto) sia la selezione dal calendario, garantendo la piena fruibilità da tastiera e con screen reader.

---

## 2. Requisiti di Accessibilità (WCAG)

### 🔹 WCAG 1.1.1 - Testo Alternativo

- Se il controllo di apertura calendario è rappresentato solo da un’icona, deve avere un’etichetta accessibile (`aria-label` o `aria-labelledby`).
    
- Le icone decorative all’interno del componente devono essere `aria-hidden="true"`.
    

```html
<button type="button" aria-label="Apri selettore data">
  <svg aria-hidden="true" focusable="false"></svg>
</button>
```

---

### 🔹 WCAG 1.3.1 - Informazioni e Relazioni

- L’input deve essere associato a una `label` visibile o a un nome accessibile equivalente.
    
- Se è presente un messaggio di formato o istruzioni, deve essere associato all’input tramite `aria-describedby`.
    
- Il popup calendario deve essere collegato logicamente all’input (es. tramite `aria-controls`).
    
- I giorni del calendario devono essere strutturati come griglia logica e annunciabili.
    

```html
<label for="date">Data</label>
<input id="date" type="text" aria-describedby="date-hint" />
<p id="date-hint">Formato: GG/MM/AAAA</p>
```

---

### 🔹 WCAG 1.4.3 - Contrasto Minimo

- Testo in input, placeholder (se usato) e contenuti del calendario devono rispettare **4.5:1**.
    
- Stati (focus, selezionato, oggi, disabilitato) devono essere distinguibili con contrasto minimo **3:1**.
    
- Se l’errore è indicato con colore, deve esserci anche un’indicazione testuale o iconica con nome accessibile.
    

---

### 🔹 WCAG 2.1.1 - Tastiera

- L’input deve essere raggiungibile con `Tab`.
    
- Il bottone “apri calendario” deve essere raggiungibile con `Tab` e attivabile con `Enter`/`Space`.
    
- Nel calendario:
    
    - `Frecce`: navigano tra i giorni.
        
    - `Enter`/`Space`: selezionano la data.
        
    - `Esc`: chiude il popup e riporta il focus all’input (o al bottone di apertura).
        
    - `Page Up`/`Page Down`: cambiano mese.
        
    - `Home`/`End`: spostano all’inizio/fine settimana.
        
- Se è previsto input manuale, non deve essere bloccato da maschere non accessibili.
    

```html
<button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="calendar-popup">
  Apri calendario
</button>
```

---

### 🔹 WCAG 2.4.7 - Focus Visibile

- Il focus deve essere sempre visibile su input, bottone e giorni del calendario.
    
- Aprendo il calendario, il focus deve spostarsi in modo prevedibile:
    
    - sul giorno selezionato, oppure
        
    - sul giorno corrente, se non è selezionata alcuna data.
        
- Chiudendo il calendario con `Esc`, il focus deve tornare al controllo che lo ha aperto.
    

```css
.date-picker :focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 3px;
}
```

---

### 🔹 WCAG 3.3.1 - Identificazione degli Errori

- In caso di data non valida o fuori range, il messaggio di errore deve essere testuale.
    
- L’errore deve essere associato all’input tramite `aria-describedby`.
    
- Se si usa `aria-invalid="true"`, deve essere coerente con lo stato reale del campo.
    

```html
<input id="date" aria-invalid="true" aria-describedby="date-error" />
<p id="date-error">Inserisci una data valida nel formato GG/MM/AAAA.</p>
```

---

### 🔹 WCAG 4.1.2 - Nome, Ruolo, Valore

- Input, bottone e giorni devono esporre ruolo e nome corretti.
    
- Il popup deve dichiarare correttamente la propria natura (es. `role="dialog"` o pattern equivalente).
    
- La data selezionata deve essere annunciata (es. tramite `aria-selected="true"` sui giorni).
    

```html
<div id="calendar-popup" role="dialog" aria-label="Selettore data">
  <button role="gridcell" aria-selected="true" aria-label="15 aprile 2025">15</button>
</div>
```

---

## 3. Linee Guida per gli Sviluppatori

✅ **Markup HTML Corretto**

```html
<label for="dp">Data</label>
<div class="date-picker">
  <input id="dp" type="text" aria-describedby="dp-hint" />
  <button type="button" aria-label="Apri selettore data" aria-haspopup="dialog" aria-expanded="false" aria-controls="dp-dialog">
    <svg aria-hidden="true" focusable="false"></svg>
  </button>
</div>

<p id="dp-hint">Formato: GG/MM/AAAA</p>

<div id="dp-dialog" role="dialog" aria-label="Selettore data" hidden>
  <div role="grid" aria-label="Aprile 2025">
    <button role="gridcell" aria-label="15 aprile 2025" aria-selected="true">15</button>
  </div>
</div>
```

🚫 **Esempio Errato (mancanza di semantica)**

```html
<div class="date" onclick="openCalendar()">15/04/2025</div>
```

✅ **Gestione del Focus**

```css
.date-picker :focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 3px;
}
```

---

## 4. Test e Validazione

🛠 **Tecnologie Assistive Testate**

- NVDA
    
- VoiceOver
    
- JAWS
    

🛠 **Strumenti di Verifica**

- [axe DevTools](https://www.deque.com/axe/)
    
- [WAVE](https://wave.webaim.org/)
    
- [Lighthouse Accessibility Audit](https://developers.google.com/web/tools/lighthouse/)
    

🎯 **Casi d’Uso da Testare**

- È possibile aprire e chiudere il calendario solo da tastiera?
    
- Il focus si sposta correttamente tra input e calendario?
    
- Lo screen reader annuncia data completa e stato selezionato?
    
- Gli errori di formato o range sono annunciati correttamente?
    

---

## 5. Considerazioni Avanzate

🌍 **Internazionalizzazione**

- Supporto a formati data locali.
    
- Localizzazione di mesi e giorni.
    
- Gestione del primo giorno della settimana.
    

📱 **Reattività**

- Target interattivi minimi **44×44 px** per bottone e giorni.
    
- Utilizzabile su touchscreen e con zoom al 200%.
    

🎞 **Motion e Animazioni**

```css
@media (prefers-reduced-motion: reduce) {
  .date-picker {
    transition: none;
  }
}
```

---

## 6. Esempi e Best Practices

- Consentire sempre un’alternativa di input manuale, quando prevista.
    
- Non affidarsi solo al placeholder per comunicare il formato.
    
- Rendere prevedibile il focus all’apertura/chiusura del calendario.
    
- Gestire correttamente range e date disabilitate.
    

---

📌 **Riferimenti**

- [WCAG 2.1 - Success Criterion 1.1.1 Testo Alternativo](https://www.w3.org/TR/WCAG21/#text-alternatives)
    
- [WCAG 2.1 - Success Criterion 1.3.1 Informazioni e Relazioni](https://www.w3.org/TR/WCAG21/#info-and-relationships)
    
- [WCAG 2.1 - Success Criterion 1.4.3 Contrasto Minimo](https://www.w3.org/TR/WCAG21/#contrast-minimum)
    
- [WCAG 2.1 - Success Criterion 2.1.1 Tastiera](https://www.w3.org/TR/WCAG21/#keyboard)
    
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visibile](https://www.w3.org/TR/WCAG21/#focus-visible)
    
- [WCAG 2.1 - Success Criterion 3.3.1 Identificazione degli Errori](https://www.w3.org/TR/WCAG21/#error-identification)
    
- [WCAG 2.1 - Success Criterion 4.1.2 Nome, Ruolo, Valore](https://www.w3.org/TR/WCAG21/#name-role-value)
    
- [ARIA Authoring Practices - Date Picker Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/)