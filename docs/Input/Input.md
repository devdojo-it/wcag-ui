# 📌 Input - Accessibilità

## 1. Overview del Componente
Il componente `Text Field` permette agli utenti di inserire brevi testi su una sola riga. Deve essere chiaramente distinguibile visivamente e accessibile tramite tastiera e screen reader.

---
## 2. Come utilizzare il componente

```html
<label for="username">Nome utente</label>
<input type="text" id="username" name="username">
```

---
## 3. Requisiti di Accessibilità (WCAG)

### 🔹 WCAG 1.3.1 - Informazioni e Relazioni
- Ogni campo di testo deve avere un'etichetta associata tramite l'attributo `for` del `<label>`.

```html
<label for="nome">Nome completo</label>
<input type="text" id="nome">
```

### 🔹 WCAG 1.4.3 - Contrasto Minimo
- Il bordo del text field deve avere un contrasto minimo di **3:1** rispetto allo sfondo.
- Il testo dell’etichetta deve avere un contrasto minimo di **4.5:1** rispetto allo sfondo.

### 🔹 WCAG 2.1.1 - Tastiera
- Il campo di testo deve essere pienamente utilizzabile con la tastiera.

```html
<label for="username">Username</label>
<input type="text" id="username">
```

### 🔹 WCAG 2.4.7 - Focus Visibile
- Il focus del campo di testo deve essere chiaramente visibile.
- Deve essere implementato `outline: 2px solid #005fcc; outline-offset: 4px;`.

```css
input[type="text"]:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 4px;
}
```

### 🔹 WCAG 4.1.2 - Nome, Ruolo, Valore
- Gli screen reader devono percepire correttamente il ruolo `textbox` e leggere il valore inserito.

```html
<label for="email">Email</label>
<input type="text" id="email" aria-label="Email utente">
```

---

## 4. Linee Guida per gli Sviluppatori

✅ **Markup HTML Corretto**
```html
<label for="city">Città</label>
<input type="text" id="city">
```

🚫 **Esempio Errato (mancanza di label associata)**
```html
<input type="text"> Città <!-- Non associato correttamente -->
```

✅ **Campo di testo con istruzioni aggiuntive**
```html
<label for="telefono">Telefono</label>
<input type="text" id="telefono" aria-describedby="formato-telefono">
<p id="formato-telefono">Formato: +39 XXX XXX XXXX</p>
```

🚫 **Errore comune: placeholder usato come unica etichetta**
```html
<input type="text" placeholder="Inserisci nome"> <!-- Senza label associata -->
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
- Il campo di testo è completamente utilizzabile da tastiera?
- Il focus è chiaramente visibile?
- L’etichetta associata è chiaramente letta dallo screen reader?
- Il contrasto tra testo, bordo e sfondo è sufficiente?

---

## 6. Considerazioni Avanzate

🌍 **Internazionalizzazione**
- Testare con testi più lunghi per lingue diverse.
- Evitare testi descrittivi solo in maiuscolo per leggibilità ottimale.

📱 **Reattività**
- Deve essere facilmente utilizzabile su dispositivi mobili.
- Assicurare sufficiente spazio per l'inserimento del testo su touchscreen.

🎞 **Motion e Animazioni**
```css
@media (prefers-reduced-motion: reduce) {
  input[type="text"] {
    transition: none;
  }
}
```

---

## 7. Esempi e Best Practices
✅ **Utilizzare sempre una `<label>` per associare chiaramente il campo di testo.**
✅ **Garantire un chiaro focus visibile con `outline`.**
✅ **Utilizzare `aria-describedby` per informazioni aggiuntive.**
✅ **Non utilizzare solo il placeholder come etichetta principale.**

---

📌 **Riferimenti**
- [WCAG 2.1 - Success Criterion 1.3.1 Informazioni e Relazioni](https://www.w3.org/TR/WCAG21/#info-and-relationships)
- [WCAG 2.1 - Success Criterion 1.4.3 Contrasto Minimo](https://www.w3.org/TR/WCAG21/#contrast-minimum)
- [WCAG 2.1 - Success Criterion 2.1.1 Tastiera](https://www.w3.org/TR/WCAG21/#keyboard)
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visibile](https://www.w3.org/TR/WCAG21/#focus-visible)
- [WCAG 2.1 - Success Criterion 4.1.2 Nome, Ruolo, Valore](https://www.w3.org/TR/WCAG21/#name-role-value)

