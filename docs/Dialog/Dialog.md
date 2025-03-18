# 📌 Dialog - Accessibilità

## 1. Overview del Componente
Il componente `Dialog` è utilizzato per mostrare finestre modali o avvisi importanti che richiedono l’attenzione dell’utente. Deve essere accessibile tramite tastiera, screen reader e garantire una chiara gerarchia visiva.

---
## 2. Come utilizzare il componente

*// Quì va il codice come su button //*
## 3. Requisiti di Accessibilità (WCAG)

### 🔹 WCAG 1.3.1 - Informazioni e Relazioni
- Il `dialog` deve essere contenuto all’interno di un `<dialog>` HTML5 o di un `div` con `role="dialog"`.
- Deve avere un `aria-labelledby` per identificare il titolo e un `aria-describedby` per il contenuto.

```html
<dialog id="modal" aria-labelledby="modal-title" aria-describedby="modal-content">
  <h2 id="modal-title">Titolo della finestra</h2>
  <p id="modal-content">Questo è il contenuto della finestra di dialogo.</p>
  <button onclick="closeDialog()">Chiudi</button>
</dialog>
```

### 🔹 WCAG 1.4.3 - Contrasto Minimo
- Il contenuto del dialog deve avere un contrasto minimo di **4.5:1** rispetto allo sfondo.
- L’overlay dello sfondo deve avere un’opacità sufficiente per garantire leggibilità e separazione visiva dal contenuto principale.

### 🔹 WCAG 2.1.1 - Tastiera
- Il dialog deve essere attivabile e chiudibile con `Esc`.
- Il focus deve essere intrappolato all’interno del dialog finché non viene chiuso.
- Il primo elemento interattivo deve ricevere il focus automaticamente all’apertura.

```js
const dialog = document.getElementById("modal");
document.getElementById("openDialog").addEventListener("click", () => {
  dialog.showModal();
  dialog.querySelector("button").focus();
});

dialog.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    dialog.close();
  }
});
```

### 🔹 WCAG 2.4.7 - Focus Visibile
- Il focus deve essere chiaramente visibile e gestito correttamente nel ciclo di interazione all’interno del dialog.

```css
button:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 4px;
  
}
```

### 🔹 WCAG 4.1.2 - Nome, Ruolo, Valore
- Gli screen reader devono percepire correttamente il ruolo `dialog` e i relativi elementi associati.

```html
<div role="dialog" aria-labelledby="dialog-title" aria-describedby="dialog-content">
  <h2 id="dialog-title">Avviso</h2>
  <p id="dialog-content">Il tuo account sta per scadere.</p>
  <button>OK</button>
</div>
```

---

## 4. Linee Guida per gli Sviluppatori

✅ **Markup HTML Corretto**
```html
<dialog id="example-dialog">
  <h2>Conferma azione</h2>
  <p>Sei sicuro di voler continuare?</p>
  <button onclick="closeDialog()">Annulla</button>
  <button>Conferma</button>
</dialog>
```

🚫 **Esempio Errato (mancanza di gestione focus)**
```html
<div class="dialog">Messaggio</div> <!-- Non gestisce focus né semantica corretta -->
```

✅ **Gestione del Focus**
```js
const dialog = document.getElementById("example-dialog");
dialog.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    dialog.close();
  }
});
```

🚫 **Errore comune: non fornire un meccanismo di chiusura**
```html
<dialog open>Attenzione! Non puoi chiudere questa finestra.</dialog>
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
- Il dialog è navigabile e attivabile da tastiera?
- Il focus è visibile e ben distinto?
- Il contrasto tra testo e sfondo è sufficiente?
- Gli screen reader annunciano correttamente il titolo e il contenuto del dialog?
- Il focus rimane intrappolato all’interno del dialog fino alla chiusura?

---

## 6. Considerazioni Avanzate

🌍 **Internazionalizzazione**
- Testare con testi più lunghi per lingue diverse.
- Evitare testi solo in maiuscolo che possono creare problemi di leggibilità.

📱 **Reattività**
- Deve essere facilmente utilizzabile su touchscreen.
- Garantire che i pulsanti siano chiaramente selezionabili e visibili su schermi piccoli.

🎞 **Motion e Animazioni**
```css
@media (prefers-reduced-motion: reduce) {
  .dialog {
    animation: none;
  }
}
```

---

## 7. Esempi e Best Practices
✅ **Utilizzare `<dialog>` o `role="dialog"` per una semantica corretta.**
✅ **Garantire un chiaro focus visibile per la navigazione da tastiera.**
✅ **Intrappolare il focus all’interno del dialog finché non viene chiuso.**
✅ **Testare con screen reader per verificare l’annuncio corretto del contenuto.**
✅ **Fornire sempre un meccanismo di chiusura chiaro ed efficace.**

---

📌 **Riferimenti**
- [WCAG 2.1 - Success Criterion 1.3.1 Informazioni e Relazioni](https://www.w3.org/TR/WCAG21/#info-and-relationships)
- [WCAG 2.1 - Success Criterion 1.4.3 Contrasto Minimo](https://www.w3.org/TR/WCAG21/#contrast-minimum)
- [WCAG 2.1 - Success Criterion 2.1.1 Tastiera](https://www.w3.org/TR/WCAG21/#keyboard)
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visibile](https://www.w3.org/TR/WCAG21/#focus-visible)
- [WCAG 2.1 - Success Criterion 4.1.2 Nome, Ruolo, Valore](https://www.w3.org/TR/WCAG21/#name-role-value)