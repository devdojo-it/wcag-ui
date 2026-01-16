# 📌 Details 

## 1. Component Overview
The component `Details` viene utilizzato per mostrare o nascondere informazioni aggiuntive su richiesta dell'utente. Deve essere accessibile sia per utenti che navigano con la tastiera che per chi utilizza screen reader.

---

## 2. Accessibility Requirements (WCAG)

### 🔹 WCAG 1.3.1 - Information and Relationships
- Il tag `<details>` è semanticamente corretto per nascondere e mostrare contenuti progressivi.
- L'elemento `<summary>` deve essere chiaro e descrittivo, in modo che gli utenti sappiano cosa aspettarsi quando espandono il dettaglio.

```html
<details>
  <summary>Mostra dettagli</summary>
  <p>Questo è il contenuto nascosto che verrà mostrato al clic.</p>
</details>
```

### 🔹 WCAG 1.4.3 - Minimum Contrast
- Il testo del `summary` it must have un contrasto minimo di **4.5:1** compared to the background.
- Lo stato espanso deve essere chiaramente distinguibile dallo stato collassato.

### 🔹 WCAG 2.1.1 - Keyboard
- The component `details` deve essere navigabile con `Tab`.
- Il `summary` deve essere attivabile con `Enter` e `Space`.

```html
<details>
  <summary tabindex="0">Informazioni aggiuntive</summary>
  <p>Dettagli mostrati dopo l'attivazione.</p>
</details>
```

### 🔹 WCAG 2.4.7 - Focus Visible
- Il `summary` it must have uno stile di `focus-visible` clear and distinctive.

```css
summary:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 4px;x
  
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

## 3. Developer Guidelines

✅ **Correct HTML Markup**
```html
<details>
  <summary>Espandi per vedere più informazioni</summary>
  <p>Contenuto aggiuntivo mostrato su richiesta.</p>
</details>
```

🚫 **Wrong Example (mancanza di semantica)**
```html
<div onclick="toggleDetails()">Mostra dettagli</div>
<div class="details-content" hidden>
  <p>Contenuto nascosto.</p>
</div> <!-- Not accessible, manca semantica corretta -->
```

✅ **Gestione del Focus**
```css
summary:focus-visible {
  outline: 2px solid #ff9900;
  outline-offset: 4px;x
}
```

🚫 **Errore comune: non fornire uno stato chiaro di espansione**
```html
<button>Mostra dettagli</button> <!-- Manca aria-expanded e aria-controls -->
```

---

## 4. Testing and Validation

🛠 **Assistive Technologies Tested**
- NVDA
- VoiceOver
- JAWS

🛠 **Verification Tools**
- [axe DevTools](https://www.deque.com/axe/)
- [WAVE](https://wave.webaim.org/)
- [Lighthouse Accessibility Audit](https://developers.google.com/web/tools/lighthouse/)

🎯 **Casi d’Uso da Testare**
- Il `details` è navigabile e attivabile da tastiera?
- Il focus è visibile e ben distinto?
- Lo stato `aria-expanded` è correttamente aggiornato nei componenti custom?
- Il contrasto tra testo e sfondo è sufficiente?

---

## 5. Advanced Considerations

🌍 **Internationalization**
- Test with longer text for different languages.
- Avoid all-uppercase text that can impair readability.

📱 **Responsiveness**
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

## 6. Examples and Best Practices
✅ **Usare il tag `<details>` per migliorare l'accessibilità senza bisogno di ARIA extra.**
✅ **Garantire un chiaro focus visibile per la navigazione da tastiera.**
✅ **Non basarsi solo sul colore per indicare lo stato aperto/chiuso.**
✅ **Testare con screen reader per verificare la corretta lettura delle sezioni.**

---

📌 **References**
- [WCAG 2.1 - Success Criterion 1.3.1 Information and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)
- [WCAG 2.1 - Success Criterion 1.4.3 Minimum Contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum)
- [WCAG 2.1 - Success Criterion 2.1.1 Keyboard](https://www.w3.org/TR/WCAG21/#keyboard)
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visible](https://www.w3.org/TR/WCAG21/#focus-visible)
- [WCAG 2.1 - Success Criterion 4.1.2 Nome, Ruolo, Valore](https://www.w3.org/TR/WCAG21/#name-role-value)
