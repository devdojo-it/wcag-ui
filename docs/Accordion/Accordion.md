
# 📌 Accordion - Accessibilità

## 1. Overview del Componente
Il componente `Accordion` permette di mostrare e nascondere sezioni di contenuto in modo dinamico. È particolarmente utile per organizzare informazioni in spazi ristretti e migliorare la leggibilità. Deve essere accessibile sia per utenti che navigano con la tastiera che per chi utilizza screen reader.

---
## 2. Come utilizzare il componente

*// Quì va il codice come su button //*

---

## 3. Requisiti di Accessibilità (WCAG)

### 🔹 WCAG 1.3.1 - Informazioni e Relazioni
- Ogni sezione dell'accordion deve essere strutturata semanticamente utilizzando `<button>` per il titolo e `<div>` per il contenuto.
- Il titolo deve avere un `aria-controls` che punti all’`id` del pannello corrispondente.
- Il pannello deve avere `role="region"` e `aria-labelledby` per essere associato al titolo.

```html
<button aria-controls="panel1" aria-expanded="false" id="accordion1">Sezione 1</button>
<div id="panel1" role="region" aria-labelledby="accordion1" hidden>
  <p>Contenuto della sezione 1</p>
</div>
```

### 🔹 WCAG 1.4.3 - Contrasto Minimo
- Il testo e gli indicatori visivi devono avere un contrasto minimo di **4.5:1** rispetto allo sfondo.
- Lo stato attivo (focus) deve essere chiaramente visibile con un contrasto minimo di **3:1**.

### 🔹 WCAG 2.1.1 - Tastiera
- L'accordion deve essere navigabile con `Tab`.
- I pulsanti di espansione devono essere attivabili con `Enter` e `Space`.
- Le frecce su/giù possono essere implementate per una navigazione più fluida tra le voci dell’accordion.

```html
<button aria-controls="panel2" aria-expanded="false">Sezione 2</button>
<div id="panel2" role="region" aria-labelledby="accordion2" hidden>
  <p>Contenuto della sezione 2</p>
</div>

<details>
  <summary>Sezione 2</summary>
  <p>Contenuto della sezione 2</p>
</details>
```

### 🔹 WCAG 2.4.7 - Focus Visibile
- Deve essere chiaro quando un elemento dell’accordion è attivo o ha il focus.

```css
button:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 4px 
}
```

### 🔹 WCAG 4.1.2 - Nome, Ruolo, Valore
- Gli screen reader devono percepire correttamente lo stato di apertura e chiusura dell’accordion tramite `aria-expanded`.

```html
<button aria-expanded="true" aria-controls="panel3">Sezione 3</button>
```

---

## 4. Linee Guida per gli Sviluppatori

✅ **Markup HTML Corretto**
```html
<button aria-controls="panel4" aria-expanded="false" id="accordion4">Sezione 4</button>
<div id="panel4" role="region" aria-labelledby="accordion4" hidden>
  <p>Contenuto della sezione 4</p>
</div>
```

🚫 **Esempio Errato (mancanza di semantica)**
```html
<div class="accordion-title" onclick="toggleAccordion()">Sezione 5</div>
<div class="accordion-content" hidden>
  <p>Contenuto della sezione 5</p>
</div> <!-- Non accessibile, manca semantica corretta -->
```

✅ **Gestione del Focus**
```css
button:focus-visible {
  outline: 3px solid #ff9900;
}
```

🚫 **Errore comune: non fornire uno stato chiaro di espansione**
```html
<button>Sezione 6</button> <!-- Manca aria-controls e aria-expanded -->
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
- L'accordion è navigabile e attivabile da tastiera?
- Il focus è visibile e ben distinto?
- Lo stato `aria-expanded` è correttamente aggiornato?
- Il contrasto tra testo e sfondo è sufficiente?

---

## 6. Considerazioni Avanzate

🌍 **Internazionalizzazione**
- Testare con testi più lunghi per lingue diverse.
- Evitare testi solo in maiuscolo che possono creare problemi di leggibilità.

📱 **Reattività**
- Deve essere facilmente utilizzabile su touchscreen.
- Garantire che le sezioni dell’accordion siano visibili e leggibili anche con zoom fino al 200%.

🎞 **Motion e Animazioni**
```css
@media (prefers-reduced-motion: reduce) {
  .accordion-content {
    transition: none;
  }
}
```

---

## 7. Esempi e Best Practices
✅ **Usare `aria-controls` e `aria-expanded` per migliorare l'accessibilità.**
✅ **Garantire un chiaro focus visibile per la navigazione da tastiera.**
✅ **Non basarsi solo sul colore per indicare lo stato aperto/chiuso.**
✅ **Testare con screen reader per verificare la corretta lettura delle sezioni.**

---

📌 **Riferimenti**
- [WCAG 2.1 - Success Criterion 1.3.1 Informazioni e Relazioni](https://www.w3.org/TR/WCAG21/#info-and-relationships)
- [WCAG 2.1 - Success Criterion 1.4.3 Contrasto Minimo](https://www.w3.org/TR/WCAG21/#contrast-minimum)
- [WCAG 2.1 - Success Criterion 2.1.1 Tastiera](https://www.w3.org/TR/WCAG21/#keyboard)
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visibile](https://www.w3.org/TR/WCAG21/#focus-visible)
- [WCAG 2.1 - Success Criterion 4.1.2 Nome, Ruolo, Valore](https://www.w3.org/TR/WCAG21/#name-role-value)
