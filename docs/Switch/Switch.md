# 📌 Switch - Accessibilità

## 1. Overview del Componente
Il componente `Switch` consente agli utenti di attivare o disattivare rapidamente un'opzione o una funzionalità. Deve essere chiaramente distinguibile visivamente e accessibile tramite tastiera e screen reader.

---
## 2. Come utilizzare il componente

```html
<label class="switch">
  <input type="checkbox">
  <span class="slider"></span>
  Ricevi notifiche
</label>
```

---
## 3. Requisiti di Accessibilità (WCAG)

### 🔹 WCAG 1.3.1 - Informazioni e Relazioni
- Ogni switch deve avere un'etichetta associata usando `<label>`.

```html
<label for="notifications">Attiva notifiche</label>
<input type="checkbox" id="notifications">
```

### 🔹 WCAG 1.4.3 - Contrasto Minimo
- Lo stato attivo dello switch deve avere un contrasto minimo di **3:1** rispetto allo sfondo.
- Il testo dell’etichetta deve avere un contrasto minimo di **4.5:1** rispetto allo sfondo.

### 🔹 WCAG 2.1.1 - Tastiera
- Gli switch devono essere navigabili con `Tab` e attivabili con `Space`.

```html
<input type="checkbox" id="dark-mode">
<label for="dark-mode">Dark Mode</label>
```

### 🔹 WCAG 2.4.7 - Focus Visibile
- Il focus dello switch deve essere chiaramente visibile.
- Deve essere implementato `outline: 2px solid #005fcc; outline-offset: 4px;`.

```css
input[type="checkbox"]:focus-visible + .slider {
  outline: 2px solid #005fcc;
  outline-offset: 4px;
}
```

### 🔹 WCAG 4.1.2 - Nome, Ruolo, Valore
- Gli screen reader devono percepire correttamente il ruolo `switch` e lo stato attuale (`checked` o `unchecked`).

```html
<input type="checkbox" role="switch" aria-checked="false">
<label>Modalità Silenziosa</label>
```

---

## 4. Linee Guida per gli Sviluppatori

✅ **Markup HTML Corretto**
```html
<label>
  <input type="checkbox" role="switch"> Abilita notifiche
</label>
```

🚫 **Esempio Errato (mancanza di label associata)**
```html
<input type="checkbox"> Abilita notifiche <!-- Non associato correttamente -->
```

✅ **Switch personalizzato**
```html
<div role="switch" tabindex="0" aria-checked="false">
  Attiva modalità notte
</div>
```

🚫 **Errore comune: non fornire uno stato chiaro di selezione**
```html
<div class="custom-switch">Modalità notte</div> <!-- Senza aria-checked -->
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
- Lo switch è navigabile e attivabile da tastiera?
- Il focus è visibile e ben distinto?
- Lo stato `aria-checked` è correttamente aggiornato?
- Il contrasto tra testo, indicatore e sfondo è sufficiente?

---

## 6. Considerazioni Avanzate

🌍 **Internazionalizzazione**
- Testare con testi lunghi o traduzioni differenti.
- Evitare testi solo in maiuscolo che possano compromettere la leggibilità.

📱 **Reattività**
- Deve essere facilmente attivabile anche su touchscreen.
- Garantire che lo switch sia cliccabile su tutta l’area associata.

🎞 **Motion e Animazioni**
```css
@media (prefers-reduced-motion: reduce) {
  .switch-slider {
    transition: none;
  }
}
```

---

## 7. Esempi e Best Practices
✅ **Utilizzare sempre `<label>` associato correttamente.**
✅ **Assicurare un chiaro focus visibile con `outline`.**
✅ **Per switch personalizzati, fornire `aria-checked`.**
✅ **Non rimuovere mai l’indicazione visiva del focus.**

---

📌 **Riferimenti**
- [WCAG 2.1 - Success Criterion 1.3.1 Informazioni e Relazioni](https://www.w3.org/TR/WCAG21/#info-and-relationships)
- [WCAG 2.1 - Success Criterion 1.4.3 Contrasto Minimo](https://www.w3.org/TR/WCAG21/#contrast-minimum)
- [WCAG 2.1 - Success Criterion 2.1.1 Tastiera](https://www.w3.org/TR/WCAG21/#keyboard)
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visibile](https://www.w3.org/TR/WCAG21/#focus-visible)
- [WCAG 2.1 - Success Criterion 4.1.2 Nome, Ruolo, Valore](https://www.w3.org/TR/WCAG21/#name-role-value)


