# 📌 Textarea - Accessibilità

## 1. Overview del Componente
Il componente `Textarea` permette agli utenti di inserire testo libero su più righe. Deve essere chiaramente distinguibile visivamente e accessibile tramite tastiera e screen reader.

---
## 2. Come utilizzare il componente

```html
<label for="comment">Inserisci il tuo commento:</label>
<textarea id="comment" name="comment"></textarea>
```

---
## 3. Requisiti di Accessibilità (WCAG)

### 🔹 WCAG 1.3.1 - Informazioni e Relazioni
- Ogni textarea deve avere un'etichetta associata tramite l'attributo `for` del `<label>`.

```html
<label for="feedback">Il tuo feedback</label>
<textarea id="feedback"></textarea>
```

### 🔹 WCAG 1.4.3 - Contrasto Minimo
- Il bordo della textarea deve avere un contrasto minimo di **3:1** rispetto allo sfondo.
- Il testo dell’etichetta e il testo inserito devono avere un contrasto minimo di **4.5:1** rispetto allo sfondo.

### 🔹 WCAG 2.1.1 - Tastiera
- La textarea deve essere navigabile con `Tab` e il testo deve essere inseribile con la tastiera senza alcun problema.

```html
<textarea id="bio" name="bio"></textarea>
<label for="bio">Scrivi una breve biografia</label>
```

### 🔹 WCAG 2.4.7 - Focus Visibile
- Il focus della textarea deve essere chiaramente visibile.
- Deve essere implementato `outline: 2px solid #005fcc; outline-offset: 4px;`.

```css
textarea:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 4px;
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

✅ **Markup HTML Corretto**
```html
<label for="notes">Note aggiuntive</label>
<textarea id="notes"></textarea>
```

🚫 **Esempio Errato (mancanza di label associata)**
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

🛠 **Tecnologie Assistive Testate**
- NVDA
- VoiceOver
- JAWS

🛠 **Strumenti di Verifica**
- [axe DevTools](https://www.deque.com/axe/)
- [WAVE](https://wave.webaim.org/)
- [Lighthouse Accessibility Audit](https://developers.google.com/web/tools/lighthouse/)

🎯 **Casi d’Uso da Testare**
- La textarea è completamente utilizzabile tramite tastiera?
- Il focus è ben visibile?
- Il contenuto inserito è correttamente comunicato agli screen reader?
- Il contrasto tra testo, bordi e sfondo è sufficiente?

---

## 6. Considerazioni Avanzate

🌍 **Internazionalizzazione**
- Testare con testi lunghi e lingue diverse.
- Evitare placeholder o testi descrittivi solo in maiuscolo che possano compromettere la leggibilità.

📱 **Reattività**
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
✅ **Non usare solo il placeholder come etichetta.**

---

📌 **Riferimenti**
- [WCAG 2.1 - Success Criterion 1.3.1 Informazioni e Relazioni](https://www.w3.org/TR/WCAG21/#info-and-relationships)
- [WCAG 2.1 - Success Criterion 1.4.3 Contrasto Minimo](https://www.w3.org/TR/WCAG21/#contrast-minimum)
- [WCAG 2.1 - Success Criterion 2.1.1 Tastiera](https://www.w3.org/TR/WCAG21/#keyboard)
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visibile](https://www.w3.org/TR/WCAG21/#focus-visible)
- [WCAG 2.1 - Success Criterion 4.1.2 Nome, Ruolo, Valore](https://www.w3.org/TR/WCAG21/#name-role-value)

