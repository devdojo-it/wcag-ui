# 📌 Radio Button Checked - Accessibilità

## 1. Overview del Componente
Il componente `Radio Button` nello stato **unchecked** (non selezionato) consente agli utenti di scegliere un'opzione all'interno di un gruppo. Deve essere chiaramente distinguibile visivamente e accessibile tramite tastiera e screen reader.

---
## 2. Come utilizzare il componente

*// Quì va il codice come su button //*

---

## 3. Requisiti di Accessibilità (WCAG)

### 🔹 WCAG 1.3.1 - Informazioni e Relazioni
- I radio button devono essere contenuti in un `fieldset` con un `legend` descrittivo.
- Ogni radio button deve avere un’etichetta associata con `<label>`.

```html
<fieldset>
  <legend>Seleziona un'opzione</legend>
  <label><input type="radio" name="opzione" value="A"> Opzione A</label>
  <label><input type="radio" name="opzione" value="B"> Opzione B</label>
</fieldset>
```

### 🔹 WCAG 1.4.3 - Contrasto Minimo
- Il bordo del radio button deve avere un contrasto minimo di **3:1** rispetto allo sfondo.
- Il testo dell’etichetta deve avere un contrasto minimo di **4.5:1** rispetto allo sfondo.

### 🔹 WCAG 2.1.1 - Tastiera
- I radio button devono essere navigabili con `Tab` e selezionabili con `Space`.

```html
<input type="radio" id="option1" name="choice" value="1">
<label for="option1">Scelta 1</label>
```

### 🔹 WCAG 2.4.7 - Focus Visibile
- Il focus del radio button deve essere chiaramente visibile.
- Deve essere implementato `outline: 2px solid #005fcc; outline-offset: 4px;` per migliorare la visibilità del focus.

```css
input[type="radio"]:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 4px;
}
```

### 🔹 WCAG 4.1.2 - Nome, Ruolo, Valore
- Gli screen reader devono percepire correttamente il ruolo `radio` e lo stato `unchecked`.

```html
<input type="radio" id="option2" name="choice" value="2" role="radio" aria-checked="false">
<label for="option2">Scelta 2</label>
```

---

## 4. Linee Guida per gli Sviluppatori

✅ **Markup HTML Corretto**
```html
<label>
  <input type="radio" name="preferenza" value="email"> Ricevi aggiornamenti via email
</label>
```

🚫 **Esempio Errato (mancanza di label associata)**
```html
<input type="radio" name="preferenza"> Ricevi aggiornamenti <!-- Non associato correttamente -->
```

✅ **Se il radio button è personalizzato**
```html
<div role="radio" tabindex="0" aria-checked="false">
  Seleziona questa opzione
</div>
```

🚫 **Errore comune: non fornire uno stato chiaro di selezione**
```html
<div class="custom-radio">Opzione selezionabile</div> <!-- Senza aria-checked -->
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
- Il radio button è navigabile e selezionabile da tastiera?
- Il focus è visibile e ben distinto?
- Lo stato `aria-checked="false"` è correttamente aggiornato nei componenti custom?
- Il contrasto tra testo e sfondo è sufficiente?

---

## 6. Considerazioni Avanzate

🌍 **Internazionalizzazione**
- Testare con testi più lunghi per lingue diverse.
- Evitare testi solo in maiuscolo che possono creare problemi di leggibilità.

📱 **Reattività**
- Deve essere facilmente selezionabile anche su touchscreen.
- Garantire che il radio button sia cliccabile su tutta l’area del label associato.

🎞 **Motion e Animazioni**
```css
@media (prefers-reduced-motion: reduce) {
  .custom-radio {
    transition: none;
  }
}
```

---

## 7. Esempi e Best Practices
✅ **Utilizzare `<label>` per garantire la corretta associazione tra radio button e testo.**
✅ **Assicurare un chiaro focus visibile con `outline: 2px solid #005fcc; outline-offset: 4px;`.**
✅ **Se il radio button è personalizzato, fornire `aria-checked="false"` per comunicare lo stato agli screen reader.**
✅ **Non rimuovere il focus senza fornire un’alternativa visiva.**

---

📌 **Riferimenti**
- [WCAG 2.1 - Success Criterion 1.3.1 Informazioni e Relazioni](https://www.w3.org/TR/WCAG21/#info-and-relationships)
- [WCAG 2.1 - Success Criterion 1.4.3 Contrasto Minimo](https://www.w3.org/TR/WCAG21/#contrast-minimum)
- [WCAG 2.1 - Success Criterion 2.1.1 Tastiera](https://www.w3.org/TR/WCAG21/#keyboard)
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visibile](https://www.w3.org/TR/WCAG21/#focus-visible)
- [WCAG 2.1 - Success Criterion 4.1.2 Nome, Ruolo, Valore](https://www.w3.org/TR/WCAG21/#name-role-value)