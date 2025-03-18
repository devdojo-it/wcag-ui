# 📌 Actionable Chips - Accessibilità

## 1. Overview del Componente
Il componente `Actionable Chip` è un elemento interattivo utilizzato per filtrare contenuti o selezionare opzioni all’interno di un set compatto. Deve essere accessibile sia visivamente che attraverso tecnologie assistive per garantire un’esperienza utente inclusiva.

---
## 2. Come utilizzare il componente

*// Quì va il codice come su button //*
## 3. Requisiti di Accessibilità (WCAG)

### 🔹 WCAG 1.1.1 - Testo Alternativo
- Se la chip contiene solo un'icona (es. una "X" per la rimozione), deve avere un `aria-label` descrittivo o un `aria-labelledby` che punti a un testo associato.

```html
<button aria-label="Rimuovi filtro Label">
  <span aria-hidden="true">✕</span> Label
</button>
```

### 🔹 WCAG 1.3.1 - Informazioni e Relazioni
- Le chip devono essere contenute all’interno di un `fieldset` con un `legend` descrittivo se usate per selezioni multiple.
- Se una chip rappresenta una selezione attiva, deve essere distinguibile da quelle non selezionate tramite attributi ARIA come `aria-pressed`.

```html
<button aria-pressed="true">Label</button>
```

### 🔹 WCAG 1.4.3 - Contrasto Minimo
- Il testo della chip deve avere un contrasto minimo di **4.5:1** rispetto allo sfondo.
- Le chip disabilitate non devono basarsi solo sulla differenza di colore per indicare il loro stato.
- Lo stato `hover` deve mantenere un contrasto sufficiente per rimanere leggibile.

### 🔹 WCAG 2.1.1 - Tastiera
- Le chip devono essere completamente navigabili tramite tastiera (`Tab` per il focus, `Enter` o `Space` per l’attivazione o selezione, `Esc` per la rimozione se previsto).
- Se una chip ha un'icona di chiusura, essa deve essere un elemento interattivo separato.

```html
<button class="chip">Label <button aria-label="Rimuovi Label">✕</button></button>
```

### 🔹 WCAG 2.4.7 - Focus Visibile
- Deve essere chiaro quando una chip è attiva e quando riceve il focus tramite tastiera.
- Non rimuovere il focus outline senza fornire un’alternativa accessibile.

```css
.chip:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 4px;
}
```

### 🔹 WCAG 3.2.2 - Coerenza nelle Interazioni
- Il comportamento delle chip deve essere prevedibile e coerente.
- Evitare cambiamenti di stato o rimozioni involontarie senza conferma o possibilità di annullamento.

---

## 4. Linee Guida per gli Sviluppatori

✅ **Markup HTML Corretto**
```html
<div role="group" aria-labelledby="chip-group">
  <p id="chip-group">Filtri selezionati:</p>
  <button class="chip" aria-pressed="true">Categoria</button>
  <button class="chip">Opzione 1</button>
  <button class="chip" aria-label="Rimuovi Opzione 2">Opzione 2 ✕</button>
</div>
```

🚫 **Esempio Errato (mancanza di semantica)**
```html
<div class="chip" onclick="removeFilter()">
  ✕ Opzione 2
</div> <!-- Non accessibile, manca semantica e navigabilità da tastiera -->
```

✅ **Se la chip è selezionabile e rimovibile**
```html
<button class="chip" aria-pressed="true">
  Label <button aria-label="Rimuovi Label">✕</button>
</button>
```

🚫 **Errore comune: non fornire un'indicazione chiara dell'interattività**
```html
<div class="chip" tabindex="0">
  Label
</div> <!-- Non ha un ruolo chiaro per screen reader -->
```

---

## 5. Test e Validazione

🛠 **Tecnologie Assistive Testate**
- NVDA
- VoiceOver
- JAWS

🛠 **Strumenti di Verifica**
- [axe DevTools](https://www.deque.com/axe/)
- [WAVE](https://wave.webaim.org/)
- [Lighthouse Accessibility Audit](https://developers.google.com/web/tools/lighthouse/)

🎯 **Casi d’Uso da Testare**
- Le chip sono navigabili e selezionabili da tastiera?
- Il focus è visibile e ben distinto?
- Il contrasto è sufficiente per testo e componenti interattivi?
- Se una chip può essere rimossa, lo stato è chiaro per l'utente?

---

## 6. Considerazioni Avanzate

🌍 **Internazionalizzazione**
- Testare con testi più lunghi per lingue diverse.
- Evitare testi solo in maiuscolo che possono creare problemi di leggibilità.

📱 **Reattività**
- Deve essere facilmente selezionabile anche su touchscreen.
- Garantire che le chip siano ben leggibili e cliccabili anche con zoom al 200%.

🎞 **Motion e Animazioni**
```css
@media (prefers-reduced-motion: reduce) {
  .chip {
    transition: none;
  }
}
```

---

## 7. Esempi e Best Practices
✅ **Usare ruoli e attributi ARIA per migliorare la comprensione del contenuto.**
✅ **Garantire un chiaro focus visibile per gli elementi interattivi.**
✅ **Se la chip è selezionabile, indicare il suo stato con `aria-pressed`.**
✅ **Non rendere un `<div>` interattivo senza assegnare un ruolo e una semantica adeguata.**

---

📌 **Riferimenti**
- [WCAG 2.1 - Success Criterion 1.1.1 Testo Alternativo](https://www.w3.org/TR/WCAG21/#text-alternatives)
- [WCAG 2.1 - Success Criterion 1.3.1 Informazioni e Relazioni](https://www.w3.org/TR/WCAG21/#info-and-relationships)
- [WCAG 2.1 - Success Criterion 1.4.3 Contrasto Minimo](https://www.w3.org/TR/WCAG21/#contrast-minimum)
- [WCAG 2.1 - Success Criterion 2.1.1 Tastiera](https://www.w3.org/TR/WCAG21/#keyboard)
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visibile](https://www.w3.org/TR/WCAG21/#focus-visible)
- [WCAG 2.1 - Success Criterion 3.2.2 Coerenza nelle Interazioni](https://www.w3.org/TR/WCAG21/#on-input)
