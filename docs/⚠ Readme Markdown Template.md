
# 📌 [Nome del Componente] - Accessibilità

## 1. Overview del Componente
Breve descrizione del componente e del suo scopo.

---

## 2. Requisiti di Accessibilità

### 🔹 Ruolo e Semantica
- Descrizione del ruolo corretto del componente (es. `button`, `heading`, `list`).
- Necessità di `aria-*` attributes, se applicabile.

### 🔹 Navigabilità
- Come il componente deve essere gestito con la tastiera (`Tab`, `Enter`, `Esc`, frecce, ecc.).

### 🔹 Focus Management
- Specificare se e come il focus viene gestito.
- Requisiti di visibilità del focus (`:focus-visible`, contrasto minimo 3:1).

### 🔹 Contrasto e Visibilità
- Livelli di contrasto richiesti (es. 4.5:1 per testo, 3:1 per elementi grafici).

### 🔹 Alternativa Testuale
- Indicazioni su `alt`, `aria-label`, `aria-labelledby` per elementi non testuali.

---

## 3. Linee Guida per gli Sviluppatori

✅ **Markup HTML Corretto**
```html
<!-- Esempio di codice accessibile -->
```

🚫 **Esempio Errato**
```html
<!-- Esempio di codice non accessibile -->
```

✅ **Gestione delle icone**
```html
<!-- Esempio con aria-label per bottoni con sole icone -->
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
- Il componente è navigabile da tastiera?
- Ha un contrasto sufficiente?
- Funziona con screen reader?

---

## 5. Considerazioni Avanzate

🌍 **Internazionalizzazione**
- Supporto per lingue diverse.

📱 **Reattività**
- Deve funzionare bene su touchscreen (minimo 44x44px).

🎞 **Motion e Animazioni**
```css
@media (prefers-reduced-motion: reduce) {
  /* Ridurre o eliminare animazioni */
}
```

---

## 6. Esempi e Best Practices
✅ **Best practice e snippet di codice**

---

📌 **Riferimenti**
- [WCAG 2.1 - Success Criterion ...](https://www.w3.org/TR/WCAG21/#...)
- [ARIA Authoring Practices - ...](https://www.w3.org/WAI/ARIA/apg/patterns/...)
