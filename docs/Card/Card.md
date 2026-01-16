# 📌 Card

## 1. Component Overview
The component `Card` è un contenitore che raggruppa contenuti correlati, presenta informazioni e può includere azioni eseguibili dall'utente. Deve essere strutturato in modo accessibile per garantire una buona esperienza a tutti gli utenti, inclusi quelli che utilizzano tecnologie assistive.

---

## 2. Accessibility Requirements (WCAG)

### 🔹 WCAG 1.3.1 - Information and Relationships
- Il contenuto della card deve essere strutturato semanticamente con elementi corretti (`<section>`, `<article>`, `<div>` con ruolo appropriato, `aria-labelledby` per associare titolo e contenuto).
- Se la card contiene un titolo, esso deve essere un elemento di intestazione (`<h2>`, `<h3>`, ecc.) per favorire la navigazione con screen reader.

```html
<article aria-labelledby="card-title-1">
  <h2 id="card-title-1">Titolo della Card</h2>
  <p>Descrizione della card con informazioni utili.</p>
</article>
```

### 🔹 WCAG 1.4.3 - Minimum Contrast
- Il testo della card it must have un contrasto minimo di **4.5:1** compared to the background.
- Le azioni all’interno della card (bottoni o link) devono rispettare i requisiti di contrasto minimo per essere distinguibili dagli elementi circostanti.

### 🔹 WCAG 2.1.1 - Keyboard
- Tutti gli elementi interattivi all’interno della card devono essere navigabili e attivabili da tastiera (`Tab`, `Enter`, `Space`).
- Se l'intera card è interattiva, deve essere attivabile con `Enter` e `Space`, ed essere percepita come un unico elemento interattivo dagli screen reader.

```html
<a href="#" class="card" role="button">
  <h2>Titolo della Card</h2>
  <p>Descrizione della card.</p>
</a>
```

### 🔹 WCAG 2.4.7 - Focus Visible
- Gli elementi interattivi devono avere uno stile `:focus-visible` chiaro e distinguibile per gli utenti che navigano con la tastiera.
- Se l'intera card è interattiva, il focus deve essere chiaramente visibile e ben contrastato.

```css
.card:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 4px;x; 
}
```

### 🔹 WCAG 3.2.2 - Consistency in Interactions
- Se la card contiene pulsanti o link, devono comportarsi in a predictable manner.
- Non utilizzare card interattive che attivano azioni inaspettate solo con il focus o il passaggio del mouse.

---

## 3. Developer Guidelines

✅ **Correct HTML Markup**
```html
<article class="card">
  <h2>Titolo</h2>
  <p>Testo della card.</p>
  <a href="#">Azione</a>
</article>
```

🚫 **Wrong Example (mancanza di semantica)**
```html
<div class="card" onclick="openModal()">
  <h2>Titolo</h2>
  <p>Testo della card.</p>
</div> <!-- Not accessible, manca semantica corretta e navigabilità da tastiera -->
```

✅ **Se la card è interattiva**
```html
<a href="#" class="card" role="button">
  <h2>Titolo della Card</h2>
  <p>Descrizione della card.</p>
</a>
```

🚫 **Errore comune: non fornire un'indicazione chiara dell'interattività**
```html
<div class="card" tabindex="0">
  <h2>Titolo della Card</h2>
  <p>Descrizione della card.</p>
</div> <!-- Non ha un ruolo chiaro per screen reader -->
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
- La card è navigabile e leggibile da screen reader?
- Gli elementi interattivi della card sono accessibili da tastiera?
- Il contrasto è sufficiente per testo e componenti interattivi?
- Se la card è interattiva, è chiaro il suo comportamento?

---

## 5. Advanced Considerations

🌍 **Internationalization**
- Test with longer text for different languages.
- Avoid all-uppercase text that can impair readability.

📱 **Responsiveness**
- Deve essere easily selectable even on touchscreen.
- Garantire che il contenuto della card sia ben leggibile anche con zoom fino al 200%.

🎞 **Motion e Animazioni**
```css
@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }
}
```

---

## 6. Examples and Best Practices
✅ **Usare tag semantici (`<section>`, `<article>`) per migliorare la comprensione del contenuto.**
✅ **Garantire un chiaro focus visibile per gli elementi interattivi.**
✅ **Se la card è cliccabile, assicurarsi che sia navigabile correttamente da tastiera e leggibile dagli screen reader.**
✅ **Non trasformare interi `<div>` in elementi interattivi senza assegnare ruoli chiari (`role="button"`, `role="link"`).**

---

📌 **References**
- [WCAG 2.1 - Success Criterion 1.3.1 Information and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)
- [WCAG 2.1 - Success Criterion 1.4.3 Minimum Contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum)
- [WCAG 2.1 - Success Criterion 2.1.1 Keyboard](https://www.w3.org/TR/WCAG21/#keyboard)
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visible](https://www.w3.org/TR/WCAG21/#focus-visible)
- [WCAG 2.1 - Success Criterion 3.2.2 Consistency in Interactions](https://www.w3.org/TR/WCAG21/#on-input)
