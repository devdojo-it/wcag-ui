# 📌 Tooltip - Accessibilità

## 1. Overview del Componente
Il componente `Tooltip` fornisce informazioni aggiuntive o contestuali che appaiono quando l'utente passa con il mouse o attiva il focus su un elemento. Deve essere facilmente accessibile sia tramite tastiera che screen reader.

---
## 2. Come utilizzare il componente

```html
<button aria-describedby="tooltip-info">Salva</button>
<div role="tooltip" id="tooltip-info">Salva le modifiche effettuate</div>
```

---
## 3. Requisiti di Accessibilità (WCAG)

### 🔹 WCAG 1.3.1 - Informazioni e Relazioni
- Utilizzare l'attributo `aria-describedby` per associare chiaramente il tooltip al contenuto a cui fa riferimento.

```html
<input type="text" aria-describedby="username-tooltip">
<div role="tooltip" id="tooltip-info">Inserisci un nome utente valido</div>
```

### 🔹 WCAG 1.4.3 - Contrasto Minimo
- Il testo del tooltip deve avere un contrasto minimo di **4.5:1** rispetto allo sfondo.

### 🔹 WCAG 2.1.1 - Tastiera
- Il tooltip deve apparire navigando con la tastiera e non solo con il mouse (ad es. focus o `aria-describedby`).

### 🔹 WCAG 2.4.7 - Focus Visibile
- Assicurare che il tooltip sia chiaramente visibile quando l'elemento associato è in focus.

```css
.tooltip:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 4px;
}
```

### 🔹 WCAG 4.1.2 - Nome, Ruolo, Valore
- Il tooltip deve avere il ruolo `tooltip` e deve essere annunciato correttamente dagli screen reader tramite `aria-describedby` o `aria-labelledby`.

```html
<button aria-describedby="tooltip-save">Salva</button>
<div role="tooltip" id="tooltip-info">Salva il tuo documento</div>
```

---

## 4. Linee Guida per gli Sviluppatori

✅ **Markup HTML Corretto**
```html
<button aria-describedby="info">Più info</button>
<div role="tooltip" id="info">Informazioni aggiuntive</div>
```

🚫 **Esempio Errato (mancanza di aria-describedby)**
```html
<button>Più info</button>
<div class="tooltip">Informazioni aggiuntive</div> <!-- Non accessibile -->
```

✅ **Tooltip visualizzato al focus**
```html
<button aria-describedby="help">Aiuto</button>
<div role="tooltip" id="help">Clicca per ottenere aiuto</div>
```

🚫 **Errore comune: Tooltip senza ruolo o ID associato**
```html
<button>Più informazioni</button>
<div class="tooltip">Dettagli qui</div> <!-- Non associato e senza ruolo -->
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
- Il tooltip è visibile quando navigato tramite tastiera?
- Il tooltip è correttamente annunciato dagli screen reader?
- Il contrasto tra testo e sfondo è sufficiente?

---

## 6. Considerazioni Avanzate

🌍 **Internazionalizzazione**
- Testare tooltip con testi lunghi o traduzioni differenti.

📱 **Reattività**
- Deve essere facilmente visualizzabile anche su touchscreen.
- Valutare l’utilizzo di interazioni diverse per attivare il tooltip su mobile.

🎞 **Motion e Animazioni**
```css
@media (prefers-reduced-motion: reduce) {
  .tooltip {
    transition: none;
  }
}
```

---

## 7. Esempi e Best Practices
✅ **Associare sempre il tooltip correttamente tramite `aria-describedby`.**
✅ **Garantire che il tooltip sia accessibile tramite tastiera.**
✅ **Verificare che il testo abbia sufficiente contrasto rispetto allo sfondo.**

---

📌 **Riferimenti**
- [WCAG 2.1 - Success Criterion 1.3.1 Informazioni e Relazioni](https://www.w3.org/TR/WCAG21/#info-and-relationships)
- [WCAG 2.1 - Success Criterion 1.4.3 Contrasto Minimo](https://www.w3.org/TR/WCAG21/#contrast-minimum)
- [WCAG 2.1 - Success Criterion 2.1.1 Tastiera](https://www.w3.org/TR/WCAG21/#keyboard)
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visibile](https://www.w3.org/TR/WCAG21/#focus-visible)
- [WCAG 2.1 - Success Criterion 4.1.2 Nome, Ruolo, Valore](https://www.w3.org/TR/WCAG21/#name-role-value)

