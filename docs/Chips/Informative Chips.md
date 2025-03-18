# 📌 Informative Chips - Accessibilità

## 1. Overview del Componente
Il componente `Informative Chip` è utilizzato per visualizzare informazioni statiche e contestuali senza interazioni dirette. Deve essere chiaro, leggibile e accessibile per tutti gli utenti, inclusi quelli che utilizzano tecnologie assistive.

---
## 2. Come utilizzare il componente

*// Quì va il codice come su button //*
## 3. Requisiti di Accessibilità (WCAG)

### 🔹 WCAG 1.3.1 - Informazioni e Relazioni
- Le chip informative devono essere identificate semanticamente tramite `aria-role="status"` o essere contenute in un elemento con una chiara relazione con il contesto.
- Se una chip rappresenta uno stato (es. "Nuovo", "In corso"), utilizzare `aria-live="polite"` se è dinamica e aggiornata in tempo reale.

```html
<span role="status">Nuovo</span>
```

### 🔹 WCAG 1.4.3 - Contrasto Minimo
- Il testo della chip deve avere un contrasto minimo di **4.5:1** rispetto allo sfondo.
- Se le chip hanno un colore di sfondo distintivo, il contrasto tra il testo e il colore di sfondo deve rientrare nei parametri WCAG per garantire la leggibilità.

### 🔹 WCAG 2.4.6 - Intestazioni e Etichette
- Se la chip rappresenta un valore informativo essenziale, deve essere associata a un'etichetta descrittiva.
- Non utilizzare solo il colore per trasmettere informazioni; fornire un'icona di supporto o un testo alternativo.

```html
<div aria-labelledby="status-label">
  <span id="status-label">Stato:</span> <span role="status">In elaborazione</span>
</div>
```

### 🔹 WCAG 3.2.2 - Coerenza nelle Interazioni
- Le chip informative devono avere un comportamento coerente all'interno del design system.
- Se una chip cambia dinamicamente di stato (es. "Completato", "In attesa"), deve essere notificata correttamente agli screen reader tramite `aria-live="polite"` o `aria-live="assertive"` se è critica.

```html
<span aria-live="polite">Ordine spedito</span>
```

---

## 4. Linee Guida per gli Sviluppatori

✅ **Markup HTML Corretto**
```html
<span class="chip" role="status">Nuovo</span>
```

🚫 **Esempio Errato (mancanza di semantica)**
```html
<div class="chip">Nuovo</div> <!-- Non è chiaro il ruolo informativo della chip -->
```

✅ **Se la chip è aggiornata dinamicamente**
```html
<span role="status" aria-live="polite">In lavorazione</span>
```

🚫 **Errore comune: non fornire un’indicazione chiara del ruolo informativo**
```html
<span class="chip">In elaborazione</span> <!-- Senza un contesto chiaro -->
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
- Le chip informative sono lette correttamente dagli screen reader?
- Il contrasto del testo rispetto allo sfondo è sufficiente?
- Le chip dinamiche notificano il cambiamento in modo accessibile?

---

## 6. Considerazioni Avanzate

🌍 **Internazionalizzazione**
- Testare con testi più lunghi per lingue diverse.
- Evitare testi solo in maiuscolo che possono creare problemi di leggibilità.

📱 **Reattività**
- Deve essere facilmente leggibile su diversi dispositivi.
- Garantire che il contenuto della chip sia visibile e chiaro anche con zoom fino al 200%.

🎞 **Motion e Animazioni**
```css
@media (prefers-reduced-motion: reduce) {
  .chip {
    transition: none;
  }
}
```

---

## 7. Esempi e Best Practices
✅ **Usare `role="status"` o `aria-live` per garantire un’accessibilità chiara.**
✅ **Assicurare un contrasto sufficiente per il testo informativo.**
✅ **Evitare di usare solo il colore per trasmettere informazioni.**
✅ **Mantenere la coerenza visiva e semantica delle chip informative.**

---

📌 **Riferimenti**
- [WCAG 2.1 - Success Criterion 1.3.1 Informazioni e Relazioni](https://www.w3.org/TR/WCAG21/#info-and-relationships)
- [WCAG 2.1 - Success Criterion 1.4.3 Contrasto Minimo](https://www.w3.org/TR/WCAG21/#contrast-minimum)
- [WCAG 2.1 - Success Criterion 2.4.6 Intestazioni e Etichette](https://www.w3.org/TR/WCAG21/#headings-and-labels)
- [WCAG 2.1 - Success Criterion 3.2.2 Coerenza nelle Interazioni](https://www.w3.org/TR/WCAG21/#on-input)