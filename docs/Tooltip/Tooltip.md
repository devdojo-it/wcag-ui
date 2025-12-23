# 📌 Tooltip 

## 1. Overview del Componente

Il componente `Tooltip` mostra un’informazione di supporto contestuale, di solito breve, associata a un elemento trigger (icona, testo, bottone). Il tooltip non deve essere indispensabile per comprendere o usare l’interfaccia: se contiene informazioni essenziali, va valutato un pattern diverso (es. testo persistente o help inline).

---

## 2. Requisiti di Accessibilità (WCAG)

### 🔹 WCAG 1.3.1 - Informazioni e Relazioni

- Il tooltip deve essere associato al trigger tramite `aria-describedby`.
    
- Il contenuto del tooltip deve essere in un elemento separato con `role="tooltip"`.
    
- Il tooltip deve avere un `id` stabile referenziato dal trigger.
    

```html
<button aria-describedby="tip-1">Info</button>
<div id="tip-1" role="tooltip" hidden>
  Testo di aiuto.
</div>
```

---

### 🔹 WCAG 1.4.3 - Contrasto Minimo

- Il testo del tooltip deve rispettare un contrasto minimo **4.5:1**.
    
- Il tooltip (background/border) e l’indicatore visivo (freccia) devono rispettare almeno **3:1**.
    

---

### 🔹 WCAG 1.4.13 - Contenuto su Hover o Focus

- Il tooltip deve comparire sia su **hover** che su **focus** del trigger.
    
- Deve essere possibile **dismiss** (chiudere) il tooltip senza spostare il focus, tipicamente con `Esc`.
    
- Il tooltip non deve scomparire immediatamente quando il puntatore si sposta sul tooltip (se interattivo) e deve permettere all’utente di raggiungerlo se contiene elementi interattivi.
    
- Il tooltip non deve coprire contenuti importanti e non deve impedire l’interazione col trigger.
    

---

### 🔹 WCAG 2.1.1 - Tastiera

- Il trigger deve essere raggiungibile con `Tab`.
    
- In focus, il tooltip deve essere visibile.
    
- `Esc`: chiude il tooltip.
    
- Se il tooltip contiene contenuto interattivo, non è più un tooltip: va trattato come popover/dialog (pattern diverso).
    

---

### 🔹 WCAG 2.4.7 - Focus Visibile

- Il trigger deve avere focus visibile.
    
- Il tooltip non deve rubare focus.
    

```css
.tooltip-trigger:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 4px;
}
```

---

### 🔹 WCAG 4.1.2 - Nome, Ruolo, Valore

- Il trigger deve avere nome accessibile.
    
- Il tooltip deve esporre `role="tooltip"`.
    
- L’associazione deve avvenire tramite `aria-describedby`.
    

---

## 3. Linee Guida per gli Sviluppatori

✅ **Markup HTML Corretto**

```html
<button class="tooltip-trigger" aria-describedby="help-tip">
  <span aria-hidden="true">i</span>
  <span class="sr-only">Informazioni</span>
</button>

<div id="help-tip" role="tooltip" hidden>
  Il codice è riportato nella sezione “Dettagli”.
</div>
```

🚫 **Esempio Errato (solo hover)**

```html
<span class="info" onmouseenter="showTip()">i</span>
```

✅ **Gestione delle icone**

```html
<button aria-label="Mostra informazioni" aria-describedby="tip-2">
  <svg aria-hidden="true" focusable="false"></svg>
</button>
<div id="tip-2" role="tooltip" hidden>
  Informazione di supporto.
</div>
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

- Il tooltip appare sia su hover che su focus?
    
- Il tooltip è dismissable con `Esc`?
    
- Il tooltip resta visibile abbastanza a lungo da essere letto?
    
- Il contenuto è annunciato correttamente tramite `aria-describedby`?
    

---

## 5. Considerazioni Avanzate

🌍 **Internazionalizzazione**

- Testare con testi più lunghi.
    
- Evitare tooltip troppo verbosi.
    

📱 **Reattività**

- Su touchscreen, prevedere un comportamento coerente (tap per mostrare/nascondere).
    
- Target interattivo minimo **44×44 px** per il trigger.
    

🎞 **Motion e Animazioni**

```css
@media (prefers-reduced-motion: reduce) {
  .tooltip {
    transition: none;
  }
}
```

---

## 6. Esempi e Best Practices

- Non usare tooltip per informazioni essenziali.
    
- Mostrare su focus, non solo su hover.
    
- Chiudere con `Esc` e non rubare il focus.
    
- Se serve interazione dentro, usare un popover/dialog.
    

---

📌 **Riferimenti**

- [WCAG 2.1 - Success Criterion 1.3.1 Informazioni e Relazioni](https://www.w3.org/TR/WCAG21/#info-and-relationships)
    
- [WCAG 2.1 - Success Criterion 1.4.3 Contrasto Minimo](https://www.w3.org/TR/WCAG21/#contrast-minimum)
    
- [WCAG 2.1 - Success Criterion 1.4.13 Contenuto su Hover o Focus](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus)
    
- [WCAG 2.1 - Success Criterion 2.1.1 Tastiera](https://www.w3.org/TR/WCAG21/#keyboard)
    
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visibile](https://www.w3.org/TR/WCAG21/#focus-visible)
    
- [WCAG 2.1 - Success Criterion 4.1.2 Nome, Ruolo, Valore](https://www.w3.org/TR/WCAG21/#name-role-value)
    
- [ARIA Authoring Practices - Tooltip Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)