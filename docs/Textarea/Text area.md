# 📌 Textarea - Accessibilità

## 1. Component Overview
The component `Textarea` permette agli utenti di inserire testo libero su più righe. Deve essere chiaramente distinguibile visivamente e accessibile via keyboard e screen reader.

---
## 2. How to Use the Component

```html
<label for="comment">Inserisci il tuo commento:</label>
<textarea id="comment" name="comment"></textarea>
```

---
## 3. Requisiti di Accessibilità (WCAG)

### 🔹 WCAG 1.3.1 - Information and Relationships
- Ogni textarea it must have un'etichetta associata tramite l'attributo `for` del `<label>`.

```html
<label for="feedback">Il tuo feedback</label>
<textarea id="feedback"></textarea>
```

### 🔹 WCAG 1.4.3 - Minimum Contrast
- Il bordo della textarea it must have un contrasto minimo di **3:1** compared to the background.
- Il testo dell’etichetta e il testo inserito devono avere un contrasto minimo di **4.5:1** compared to the background.

### 🔹 WCAG 2.1.1 - Keyboard
- La textarea deve essere navigabile con `Tab` e il testo deve essere inseribile con la tastiera senza alcun problema.

```html
<textarea id="bio" name="bio"></textarea>
<label for="bio">Scrivi una breve biografia</label>
```

### 🔹 WCAG 2.4.7 - Focus Visible
- Il focus della textarea deve essere chiaramente visibile.
- Deve essere implementato `outline: 2px solid #005fcc; outline-offset: 4px;x;`.

```css
textarea:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 4px;x;
}
```

### 🔹 WCAG 4.1.2 - Nome, Ruolo, Valore
- Gli screen reader devono percepire correttamente il ruolo `textbox` e il contenuto attualmente inserito nella textarea.

```html
<label for="description">Descrizione del problema</label>
<textarea id="description" role="textbox"></textarea>
```

---

## 4. Linee Guida per gli Sviluppatori

✅ **Correct HTML Markup**
```html
<label for="notes">Note aggiuntive</label>
<textarea id="notes"></textarea>
```

🚫 **Wrong Example (mancanza di label associata)**
```html
<textarea></textarea> Inserisci note <!-- Non associato correttamente -->
```

✅ **Textarea con limiti di caratteri**
```html
<label for="summary">Sintesi (max 500 caratteri)</label>
<textarea id="summary" aria-describedby="char-limit"></textarea>
<div id="char-limit">Massimo 500 caratteri</div>
```

🚫 **Errore comune: placeholder usato come unica etichetta**
```html
<textarea placeholder="Inserisci il testo qui"></textarea> <!-- Senza label associata -->
```

---

## 5. Test e Validazione

🛠 **Assistive Technologies Tested**
- NVDA
- VoiceOver
- JAWS

🛠 **Verification Tools**
- [axe DevTools](https://www.deque.com/axe/)
- [WAVE](https://wave.webaim.org/)
- [Lighthouse Accessibility Audit](https://developers.google.com/web/tools/lighthouse/)

🎯 **Casi d’Uso da Testare**
- La textarea è fully usable via keyboard?
- Il focus è ben visibile?
- Il contenuto inserito è correttamente comunicato agli screen reader?
- Il contrasto tra testo, bordi e sfondo è sufficiente?

---

## 6. Considerazioni Avanzate

🌍 **Internationalization**
- Testare con testi lunghi e lingue diverse.
- Evitare placeholder o testi descrittivi solo in maiuscolo che possano compromettere la leggibilità.

📱 **Responsiveness**
- Deve essere facilmente utilizzabile su dispositivi mobili.
- Assicurare una dimensione sufficiente per facilitare l'inserimento del testo su touchscreen.

🎞 **Motion e Animazioni**
```css
@media (prefers-reduced-motion: reduce) {
  textarea {
    transition: none;
  }
}
```

---

## 7. Esempi e Best Practices
✅ **Associare sempre una `<label>` alla textarea.**
✅ **Garantire che il focus sia chiaramente visibile usando `outline`.**
✅ **Usare `aria-describedby` per informazioni aggiuntive come limiti di caratteri.**
✅ **Non use solo il placeholder come etichetta.**

---

📌 **References**
- [WCAG 2.1 - Success Criterion 1.3.1 Information and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)
- [WCAG 2.1 - Success Criterion 1.4.3 Minimum Contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum)
- [WCAG 2.1 - Success Criterion 2.1.1 Keyboard](https://www.w3.org/TR/WCAG21/#keyboard)
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visible](https://www.w3.org/TR/WCAG21/#focus-visible)
- [WCAG 2.1 - Success Criterion 4.1.2 Nome, Ruolo, Valore](https://www.w3.org/TR/WCAG21/#name-role-value)

