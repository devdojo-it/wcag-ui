# 📌 Details 

## 1. Overview del Componente
Il componente `Details` viene utilizzato per mostrare o nascondere informazioni aggiuntive su richiesta dell'utente. Deve essere accessibile sia per utenti che navigano con la tastiera che per chi utilizza screen reader.

---

## 2. Requisiti di Accessibilità (WCAG)

### 🔹 WCAG 1.3.1 - Informazioni e Relazioni
- Il tag `<details>` è semanticamente corretto per nascondere e mostrare contenuti progressivi.
- L'elemento `<summary>` deve essere chiaro e descrittivo, in modo che gli utenti sappiano cosa aspettarsi quando espandono il dettaglio.

```html
<details>
  <summary>Mostra dettagli</summary>
  <p>Questo è il contenuto nascosto che verrà mostrato al clic.</p>
</details>
```

### 🔹 WCAG 1.4.3 - Contrasto Minimo
- Il testo del `summary` deve avere un contrasto minimo di **4.5:1** rispetto allo sfondo.
- Lo stato espanso deve essere chiaramente distinguibile dallo stato collassato.

### 🔹 WCAG 2.1.1 - Tastiera
- Il componente `details` deve essere navigabile con `Tab`.
- Il `summary` deve essere attivabile con `Enter` e `Space`.

```html
<details>
  <summary tabindex="0">Informazioni aggiuntive</summary>
  <p>Dettagli mostrati dopo l'attivazione.</p>
</details>
```

### 🔹 WCAG 2.4.7 - Focus Visibile
- Il `summary` deve avere uno stile di `focus-visible` chiaro e ben distinguibile.

```css
summary:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 4px
  
}
```

### 🔹 WCAG 4.1.2 - Nome, Ruolo, Valore
- Gli screen reader devono percepire correttamente lo stato di apertura e chiusura.
- Se si utilizza un componente custom, è necessario aggiornare `aria-expanded`.

```html
<button aria-expanded="false" aria-controls="details-content">Mostra dettagli</button>
<div id="details-content" hidden>
  <p>Contenuto nascosto.</p>
</div>
```

---

## 3. Linee Guida per gli Sviluppatori

✅ **Markup HTML Corretto**
```html
<details>
  <summary>Espandi per vedere più informazioni</summary>
  <p>Contenuto aggiuntivo mostrato su richiesta.</p>
</details>
```

🚫 **Esempio Errato (mancanza di semantica)**
```html
<div onclick="toggleDetails()">Mostra dettagli</div>
<div class="details-content" hidden>
  <p>Contenuto nascosto.</p>
</div> <!-- Non accessibile, manca semantica corretta -->
```

✅ **Gestione del Focus**
```css
summary:focus-visible {
  outline: 2px solid #ff9900;
  outline-offset: 4px
}
```

🚫 **Errore comune: non fornire uno stato chiaro di espansione**
```html
<button>Mostra dettagli</button> <!-- Manca aria-expanded e aria-controls -->
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
- Il `details` è navigabile e attivabile da tastiera?
- Il focus è visibile e ben distinto?
- Lo stato `aria-expanded` è correttamente aggiornato nei componenti custom?
- Il contrasto tra testo e sfondo è sufficiente?

---

## 5. Considerazioni Avanzate

🌍 **Internazionalizzazione**
- Testare con testi più lunghi per lingue diverse.
- Evitare testi solo in maiuscolo che possono creare problemi di leggibilità.

📱 **Reattività**
- Deve essere facilmente utilizzabile su touchscreen.
- Garantire che il contenuto sia visibile e leggibile anche con zoom fino al 200%.

🎞 **Motion e Animazioni**
```css
@media (prefers-reduced-motion: reduce) {
  .details-content {
    transition: none;
  }
}
```

---

## 6. Esempi e Best Practices
✅ **Usare il tag `<details>` per migliorare l'accessibilità senza bisogno di ARIA extra.**
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
