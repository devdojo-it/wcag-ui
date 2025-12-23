# 📌 Chips

## 1. Overview del Componente

Il componente `Chips` rappresenta informazioni compatte come tag, categorie, filtri selezionati o input già inseriti. Le chips possono essere utilizzate in due modalità distinte, che hanno implicazioni dirette sull’accessibilità:

- **Informative Chips**: hanno solo funzione descrittiva. Servono a mostrare informazioni o stati, ma **non sono interattive**.
    
- **Actionable Chips**: consentono un’interazione da parte dell’utente, ad esempio selezione, attivazione di un filtro o rimozione di un elemento.
    

La distinzione tra queste due tipologie è fondamentale: **solo le Actionable Chips devono essere navigabili e attivabili tramite tastiera**, mentre le Informative Chips non devono entrare nel tab order.

---

## 2. Requisiti di Accessibilità (WCAG)

### 🔹 WCAG 1.1.1 - Testo Alternativo

- Se una chip contiene solo un’icona (es. una "X" per la rimozione), deve essere fornito un `aria-label` o un `aria-labelledby` descrittivo.
    
- Il testo accessibile deve descrivere chiaramente l’azione o il contenuto della chip.
    

```html
<button aria-label="Rimuovi filtro Categoria">
  <span aria-hidden="true">✕</span>
</button>
```

---

### 🔹 WCAG 1.3.1 - Informazioni e Relazioni

- Le chips devono essere strutturate semanticamente in base alla loro funzione.
    
- Le Informative Chips devono essere elementi non interattivi (`span`, `li`).
    
- Le Actionable Chips devono essere elementi `button`.
    
- Se le chips rappresentano un insieme di selezioni o filtri, devono essere contenute in una struttura semantica (`ul`, `ol`o `fieldset` con `legend`).
    
- Se una Actionable Chip rappresenta una selezione attiva, deve essere indicata tramite `aria-pressed`.
    

```html
<ul>
  <li><span>Accessibilità</span></li>
  <li><button aria-pressed="true">UX</button></li>
</ul>
```

---

### 🔹 WCAG 1.4.3 - Contrasto Minimo

- Il testo delle chips deve avere un contrasto minimo di **4.5:1** rispetto allo sfondo.
    
- Icone e indicatori di stato devono avere un contrasto minimo di **3:1**.
    
- Gli stati (selezionata, disabilitata) non devono essere comunicati esclusivamente tramite colore.
    

---

### 🔹 WCAG 2.1.1 - Tastiera

- Solo le Actionable Chips devono essere raggiungibili tramite `Tab`.
    
- Le Actionable Chips devono essere attivabili con `Enter` e `Space`.
    
- Se è prevista la rimozione, l’azione deve essere esposta tramite un bottone separato e navigabile.
    
- Le Informative Chips non devono essere focusabili.
    

```html
<button class="chip" aria-pressed="true">Categoria</button>
<button class="chip" aria-label="Rimuovi Categoria">✕</button>
```

---

### 🔹 WCAG 2.4.7 - Focus Visibile

- Le Actionable Chips devono avere un focus visibile e ben distinguibile.
    
- Il focus indicator deve avere un contrasto minimo di **3:1**.
    
- Il focus non deve andare perso dopo la rimozione di una chip.
    

```css
.chip:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 4px;
}
```

---

### 🔹 WCAG 3.2.2 - Coerenza nelle Interazioni

- Il comportamento delle Actionable Chips deve essere prevedibile e coerente.
    
- Evitare rimozioni o cambi di stato inattesi.
    
- Se una chip cambia stato (es. selezionata/non selezionata), il cambiamento deve essere chiaramente percepibile.
    

---

## 3. Linee Guida per gli Sviluppatori

✅ **Markup HTML Corretto**

```html
<ul>
  <li><span class="chip">Informativa</span></li>
  <li><button class="chip" aria-pressed="true">Filtro attivo</button></li>
  <li>
    <span class="chip">Categoria</span>
    <button aria-label="Rimuovi Categoria">✕</button>
  </li>
</ul>
```

🚫 **Esempio Errato**

```html
<div class="chip" tabindex="0">Categoria</div>
```

❌ Problemi:

- Elemento non semantico
    
- Chip informativa resa interattiva
    
- Ruolo non chiaro per le tecnologie assistive
    

✅ **Gestione delle icone**

```html
<button aria-label="Rimuovi chip UX">
  <svg aria-hidden="true" focusable="false"></svg>
</button>
```

---

## 4. Test e Validazione

🛠 **Tecnologie Assistive Testate**

- NVDA
    
- VoiceOver
    
- JAWS
    

🛠 **Strumenti di Verifica**

- [axe DevTools](https://www.deque.com/axe/)
    
- [WAVE](https://wave.webaim.org/)
    
- [Lighthouse Accessibility Audit](https://developers.google.com/web/tools/lighthouse/)
    

🎯 **Casi d’Uso da Testare**

- Le Actionable Chips sono navigabili e attivabili da tastiera?
    
- Le Informative Chips sono escluse dal tab order?
    
- Il focus è sempre visibile?
    
- Gli stati sono annunciati correttamente dagli screen reader?
    

---

## 5. Considerazioni Avanzate

🌍 **Internazionalizzazione**

- Supportare testi di lunghezza variabile.
    
- Evitare troncamenti senza alternativa accessibile.
    

📱 **Reattività**

- Area interattiva minima **44×44 px** per le Actionable Chips.
    
- Utilizzabile su touchscreen e con zoom al 200%.
    

🎞 **Motion e Animazioni**

```css
@media (prefers-reduced-motion: reduce) {
  .chip {
    transition: none;
  }
}
```

---

## 6. Esempi e Best Practices

- Distinguere chiaramente Informative e Actionable Chips già in fase di design.
    
- Non rendere interattiva una chip solo per motivi visivi.
    
- Esporre sempre azioni e stati tramite semantica corretta.
    
- Testare selezione e rimozione con screen reader.
    

---

📌 **Riferimenti**

- [WCAG 2.1 - Success Criterion 1.1.1 Testo Alternativo](https://www.w3.org/TR/WCAG21/#text-alternatives)
    
- [WCAG 2.1 - Success Criterion 1.3.1 Informazioni e Relazioni](https://www.w3.org/TR/WCAG21/#info-and-relationships)
    
- [WCAG 2.1 - Success Criterion 1.4.3 Contrasto Minimo](https://www.w3.org/TR/WCAG21/#contrast-minimum)
    
- [WCAG 2.1 - Success Criterion 2.1.1 Tastiera](https://www.w3.org/TR/WCAG21/#keyboard)
    
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visibile](https://www.w3.org/TR/WCAG21/#focus-visible)
    
- [WCAG 2.1 - Success Criterion 3.2.2 Coerenza nelle Interazioni](https://www.w3.org/TR/WCAG21/#on-input)
    
- [ARIA Authoring Practices - Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)