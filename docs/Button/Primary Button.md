
📌 Primary Button - Accessibilità

## 1. Overview del Componente
Il componente `Button` viene utilizzato per eseguire un'azione all'interno dell'interfaccia. Deve essere chiaramente distinguibile, accessibile tramite tastiera e compatibile con gli screen reader.

---

## 2. Come utilizzare il componente

### Primary Button

```html
<button is="wcag-button">
  Bottone
</button>
```

### Secondary Button

```html
<button is="wcag-button" secondary>
  Bottone
</button>
```

### Tertiary Button

```html
<button is="wcag-button" tertiary>
  Bottone
</button>
```

### Destructive Button

```html
<button is="wcag-button" destructive>
  Bottone
</button>
```


---

## 2. Requisiti di Accessibilità (WCAG)

### 🔹 WCAG 1.1.1 - Testo Alternativo
- Se il bottone contiene solo un'icona, deve avere un `aria-label` descrittivo o un `aria-labelledby` che punti a un'etichetta testuale.

```html
<button is="wcag-button" aria-label="Chiudi il pop-up">
  <svg aria-hidden="true" focusable="false">...</svg>
</button>
```

### 🔹 WCAG 1.3.1 - Informazioni e Relazioni
- Il bottone deve essere strutturato semanticamente utilizzando il tag `<button>`.
- Se è un link stilizzato come bottone, usare `<a role="button">` e gestire `keydown` per supportare il tasto Enter/Space.

```html
<span role="button" tabindex="0">Elimina </span>
```

### 🔹 WCAG 1.4.3 - Contrasto Minimo
- Il testo del bottone deve avere un contrasto minimo di **4.5:1** rispetto allo sfondo (WCAG 2.1 AA).
- Il contrasto tra il bordo e lo sfondo del bottone deve essere di almeno **3:1** per garantire la visibilità degli elementi non testuali.
- Per bottoni disabilitati, il contrasto del testo deve rimanere leggibile, ma non è obbligatorio che rispetti il requisito **4.5:1**, poiché non è un'azione disponibile.

### 🔹 WCAG 2.1.1 - Tastiera
- Il bottone deve essere completamente utilizzabile tramite tastiera (`Tab` per il focus, `Enter` e `Space` per l'attivazione).
- Se il bottone ha uno stato `aria-disabled="true"`, deve comunque intercettare eventi di tastiera e clic.

```html
<button aria-disabled="true" tabindex="0">Apparentemente disabilitato</button>
```

### 🔹 WCAG 2.4.7 - Focus Visibile
- Deve avere uno stile `:focus-visible` chiaro e ben distinguibile (minimo 3:1 rispetto allo sfondo).
- Non rimuovere il focus outline senza fornire un'alternativa accessibile.

```css
button:focus-visible {
  outline: 2px solid #005fcc;
	  outline-offset: 4p
}
```

### 🔹 WCAG 3.2.2 - Coerenza nelle Interazioni
- I bottoni devono comportarsi in modo prevedibile.
- Evitare cambiamenti di stato o navigazioni inattese al passaggio del mouse o al focus.

---

## 3. Linee Guida per gli Sviluppatori

✅ **Markup HTML Corretto**
```html
<button type="button">Invia</button>
```

🚫 **Esempio Errato (div non accessibile)**
```html
<div onclick="submitForm()">Invia</div> <!-- Non accessibile -->
```

✅ **Se il bottone contiene solo un'icona**
```html
<button aria-label="Chiudi il pop-up">
  <svg aria-hidden="true" focusable="false">...</svg>
</button>
```

🚫 **Errore comune: mancanza di aria-label**
```html
<button>
  <svg>...</svg> <!-- Non ha un'etichetta per screen reader -->
</button>
```

---

## 4. Test e Validazione

🛠 **Tecnologie Assistive Testate**
- NVDA
- VoiceOver
- JAWS

🛠 **Strumenti di Verifica**
- [axe DevTools](https://www.deque.com/axe/)
- [WAVE](https://wave.webaim.org/)
- [Lighthouse Accessibility Audit](https://developers.google.com/web/tools/lighthouse/)

🎯 **Casi d’Uso da Testare**
- Il bottone è navigabile da tastiera?
- Ha un contrasto sufficiente?
- Funziona con screen reader?
- Gli stati `aria-disabled` e `disabled` sono correttamente gestiti?

---

## 5. Considerazioni Avanzate

🌍 **Internazionalizzazione**
- Testare con testi più lunghi per lingue diverse.
- Evitare testi solo in maiuscolo che possono creare problemi di leggibilità.

📱 **Reattività**
- Deve essere facilmente selezionabile anche su touchscreen.
- Garantire che il bottone sia abbastanza grande (minimo 44x44px).

🎞 **Motion e Animazioni**
```css
@media (prefers-reduced-motion: reduce) {
  button {
    transition: none;
  }
}
```

---

## 6. Esempi e Best Practices
✅ **Meglio usare `<button>` per compatibilità e semantica.**
✅ **Testare il focus con tastiera e screen reader.**
✅ **Garantire etichette accessibili per bottoni con sole icone.**
✅ **Gestire correttamente lo stato `disabled` e `aria-disabled`.**
✅ **Assicurarsi che il contrasto sia conforme alle WCAG.**

---

📌 **Riferimenti**
- [WCAG 2.1 - Success Criterion 1.1.1 Testo Alternativo](https://www.w3.org/TR/WCAG21/#text-alternatives)
- [WCAG 2.1 - Success Criterion 1.3.1 Informazioni e Relazioni](https://www.w3.org/TR/WCAG21/#info-and-relationships)
- [WCAG 2.1 - Success Criterion 1.4.3 Contrasto Minimo](https://www.w3.org/TR/WCAG21/#contrast-minimum)
- [WCAG 2.1 - Success Criterion 2.1.1 Tastiera](https://www.w3.org/TR/WCAG21/#keyboard)
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visibile](https://www.w3.org/TR/WCAG21/#focus-visible)
- [WCAG 2.1 - Success Criterion 3.2.2 Coerenza nelle Interazioni](https://www.w3.org/TR/WCAG21/#on-input)
