# 📌 Checkbox 

## 1. Overview del Componente
Il componente `Checkbox` nello stato **checked** (selezionato) consente agli utenti di confermare una scelta attiva. Deve essere chiaramente distinguibile visivamente e accessibile tramite tastiera e screen reader.

---

## 2. Requisiti di Accessibilità (WCAG)

### 🔹 WCAG 1.3.1 - Informazioni e Relazioni
- Le checkbox devono essere associate a un'etichetta chiara utilizzando `<label>` per garantire che siano leggibili dagli screen reader.
- Se le checkbox sono raggruppate, devono essere contenute in un `fieldset` con un `legend` descrittivo.

```html
<fieldset>
  <legend>Seleziona i tuoi interessi</legend>
  <label><input type="checkbox" name="hobby" value="sport" checked> Sport</label>
  <label><input type="checkbox" name="hobby" value="musica" checked> Musica</label>
</fieldset>
```

### 🔹 WCAG 1.4.3 - Contrasto Minimo
- Il bordo della checkbox e il testo dell'etichetta devono avere un contrasto minimo di **3:1** rispetto allo sfondo.
- Il testo dell’etichetta deve avere un contrasto minimo di **4.5:1** rispetto allo sfondo per garantire la leggibilità.

### 🔹 WCAG 2.1.1 - Tastiera
- Tutte le checkbox devono essere navigabili con `Tab` e selezionabili/deselezionabili con `Space`.
- Se viene fornita una checkbox personalizzata, deve mantenere lo stesso comportamento della checkbox nativa.

```html
<input type="checkbox" id="accept" name="accept" checked>
<label for="accept">Accetto i termini e condizioni</label>
```

### 🔹 WCAG 2.4.7 - Focus Visibile
- La checkbox deve avere un chiaro stato `focus-visible` per indicare quando è attiva.

```css
input[type="checkbox"]:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 4px;
}
```

### 🔹 WCAG 4.1.2 - Nome, Ruolo, Valore
- Gli screen reader devono percepire correttamente lo stato `checked` della checkbox tramite `aria-checked="true"` se viene utilizzato `role="checkbox"` in un componente custom.

```html
<div role="checkbox" tabindex="0" aria-checked="true" id="custom-checkbox">
  Accetto i termini e condizioni
</div>
```

---

## 3. Linee Guida per gli Sviluppatori

✅ **Markup HTML Corretto**
```html
<label>
  <input type="checkbox" name="notifiche" value="email" checked> Ricevi notifiche via email
</label>
```

🚫 **Esempio Errato (mancanza di label associata)**
```html
<input type="checkbox" name="notifiche" checked> Ricevi notifiche via email <!-- Non associato correttamente -->
```

✅ **Se la checkbox è personalizzata**
```html
<div role="checkbox" tabindex="0" aria-checked="true">
  Accetto le promozioni
</div>
```

🚫 **Errore comune: non fornire uno stato chiaro di selezione**
```html
<div class="custom-checkbox">Accetto i termini</div> <!-- Senza aria-checked -->
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
- La checkbox è navigabile e selezionabile/deselezionabile da tastiera?
- Il focus è visibile e ben distinto?
- Lo stato `aria-checked="true"` è correttamente aggiornato nei componenti custom?
- Il contrasto tra testo e sfondo è sufficiente?

---

## 5. Considerazioni Avanzate

🌍 **Internazionalizzazione**
- Testare con testi più lunghi per lingue diverse.
- Evitare testi solo in maiuscolo che possono creare problemi di leggibilità.

📱 **Reattività**
- Deve essere facilmente selezionabile anche su touchscreen.
- Garantire che la checkbox sia cliccabile su tutta l’area del label associato.

🎞 **Motion e Animazioni**
```css
@media (prefers-reduced-motion: reduce) {
  .custom-checkbox {
    transition: none;
  }
}
```

---

## 6. Esempi e Best Practices
✅ **Utilizzare `<label>` per garantire la corretta associazione tra checkbox e testo.**
✅ **Assicurare un chiaro focus visibile per la navigazione da tastiera.**
✅ **Se la checkbox è personalizzata, fornire `aria-checked="true"` per comunicare lo stato agli screen reader.**
✅ **Non rimuovere il focus senza fornire un’alternativa visiva.**

---

📌 **Riferimenti**
- [WCAG 2.1 - Success Criterion 1.3.1 Informazioni e Relazioni](https://www.w3.org/TR/WCAG21/#info-and-relationships)
- [WCAG 2.1 - Success Criterion 1.4.3 Contrasto Minimo](https://www.w3.org/TR/WCAG21/#contrast-minimum)
- [WCAG 2.1 - Success Criterion 2.1.1 Tastiera](https://www.w3.org/TR/WCAG21/#keyboard)
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visibile](https://www.w3.org/TR/WCAG21/#focus-visible)
- [WCAG 2.1 - Success Criterion 4.1.2 Nome, Ruolo, Valore](https://www.w3.org/TR/WCAG21/#name-role-value)