# 📌 Popover 

## 1. Component Overview

The component `Popover` apre un contenuto in overlay ancorato a un trigger (es. bottone “Azioni”, icona help, campo form). A differenza del tooltip:

- può contenere contenuti **più lunghi**;
    
- può contenere **elementi interattivi** (link, bottoni, campi);
    
- richiede gestione esplicita di **apertura/chiusura** e **focus**.
    

Un popover tipico si apre con click o `Enter/Space` sul trigger e si chiude con `Esc` e/o click fuori.

---

## 2. Accessibility Requirements (WCAG)

### 🔹 WCAG 1.1.1 - Alternative Text

- Se il trigger è solo un’icona, it must have un nome accessibile (`aria-label` o `aria-labelledby`).
    
- Le icone decorative (trigger o contenuto) devono essere `aria-hidden="true"`.
    

```html
<button type="button" aria-label="Apri azioni">
  <svg aria-hidden="true" focusable="false"></svg>
</button>
```

---

### 🔹 WCAG 1.3.1 - Information and Relationships

- Il trigger deve dichiarare la relazione con il contenuto tramite `aria-controls`.
    
- Il trigger deve esporre lo stato tramite `aria-expanded`.
    
- Il contenuto del popover it must have un nome (con `aria-label` o `aria-labelledby`).
    
- Usare un ruolo coerente con il contenuto:
    
    - `role="dialog"` se contiene contenuti strutturati o controlli.
        
    - `role="menu"` **solo** se è un vero menu di azioni (pattern menu button).
        

```html
<button
  type="button"
  aria-haspopup="dialog"
  aria-expanded="false"
  aria-controls="pop-1"
>
  Dettagli
</button>

<div id="pop-1" role="dialog" aria-labelledby="pop-1-title" hidden>
  <h2 id="pop-1-title">Dettagli</h2>
  <p>Contenuto del popover.</p>
</div>
```

---

### 🔹 WCAG 1.4.3 - Minimum Contrast

- Testo del popover e dei controlli: contrasto minimo **4.5:1**.
    
- Bordi/indicatori (freccia, outline, separator): contrasto minimo **3:1**.
    
- Stati (focus, selected, disabled) non devono basarsi solo sul colore.
    

---

### 🔹 WCAG 2.1.1 - Keyboard

- Il trigger deve essere raggiungibile con `Tab`.
    
- `Enter` / `Space` sul trigger aprono/chiudono il popover.
    
- `Esc` chiude il popover.
    
- Se il popover contiene elementi interattivi, devono essere raggiungibili con `Tab`.
    

---

### 🔹 WCAG 2.4.3 - Ordine del Focus

- All’apertura, il focus deve spostarsi in a predictable manner:
    
    - sul **primo elemento interattivo** del popover, oppure
        
    - su un elemento “header” focusabile (se non ci sono controlli).
        
- Alla chiusura, il focus deve tornare al trigger.
    
- Se il popover è **non modale** (caso più comune), il focus può uscire dal popover, ma la chiusura deve restare controllabile (es. `Esc` e click fuori).
    
- Se il popover è **modale** (caso raro), va trattato come dialog modale con focus trap.
    

---

### 🔹 WCAG 2.4.7 - Focus Visible

- Il focus deve essere visibile sul trigger e sugli elementi del popover.
    
- Il focus indicator it must have un contrasto minimo di **3:1**.
    

```css
.popover :focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 4px;x;
}
```

---

### 🔹 WCAG 3.2.2 - Consistency in Interactions

- L’apertura/chiusura deve essere prevedibile e coerente.
    
- Evitare chiusure “a sorpresa” mentre l’utente sta interagendo dentro il popover.
    
- Se il popover si chiude al click fuori, non deve chiudersi quando l’utente clicca **dentro**.
    

---

### 🔹 WCAG 4.1.2 - Nome, Ruolo, Valore

- Il trigger deve aggiornare `aria-expanded` in modo coerente con lo stato.
    
- Il contenuto deve esporre correttamente ruolo e nome (`role="dialog"` + `aria-labelledby` o `aria-label`).
    
- Se è un menu, use `role="menu"` con item `role="menuitem"` (e pattern coerente).
    

---

## 3. Developer Guidelines

✅ **Correct HTML Markup (popover come dialog non-modale)**

```html
<button
  id="pop-trigger"
  type="button"
  aria-haspopup="dialog"
  aria-expanded="false"
  aria-controls="pop-panel"
>
  Azioni
</button>

<div
  id="pop-panel"
  role="dialog"
  aria-labelledby="pop-title"
  hidden
>
  <h2 id="pop-title">Azioni</h2>
  <button type="button">Modifica</button>
  <button type="button">Duplica</button>
  <button type="button" aria-label="Chiudi popover">Chiudi</button>
</div>
```

🚫 **Wrong Example**

```html
<div class="popover-trigger" onclick="openPopover()">Azioni</div>
<div class="popover">...</div>
```

❌ Problemi:

- Trigger non semantico
    
- Mancano `aria-expanded` e `aria-controls`
    
- Nessuna gestione del focus
    

✅ **Se il contenuto è un vero menu azioni (menu button pattern)**

```html
<button
  type="button"
  aria-haspopup="menu"
  aria-expanded="false"
  aria-controls="menu-1"
>
  Azioni
</button>

<ul id="menu-1" role="menu" hidden>
  <li role="menuitem"><button type="button">Modifica</button></li>
  <li role="menuitem"><button type="button">Elimina</button></li>
</ul>
```

---

## 4. Testing and Validation

🛠 **Assistive Technologies Tested**

- NVDA
    
- VoiceOver
    
- JAWS
    

🛠 **Verification Tools**

- [axe DevTools](https://www.deque.com/axe/)
    
- [WAVE](https://wave.webaim.org/)
    
- [Lighthouse Accessibility Audit](https://developers.google.com/web/tools/lighthouse/)
    

🎯 **Casi d’Uso da Testare**

- Il popover si apre/chiude con `Enter/Space`?
    
- `Esc` chiude sempre e riporta il focus al trigger?
    
- `aria-expanded` si aggiorna correttamente?
    
- Il focus entra nel popover in a predictable manner?
    
- È possibile navigare tutti i controlli interni da tastiera?
    

---

## 5. Advanced Considerations

🌍 **Internationalization**

- Testare testi lunghi e contenuti multilinea.
    
- Evitare layout che tagliano contenuto o nascondono il tasto “Chiudi”.
    

📱 **Responsiveness**

- Target interattivi minimi **44×44 px** per trigger e controlli.
    
- Su mobile, valutare la trasformazione in dialog/bottom sheet per stabilità.
    

🎞 **Motion e Animazioni**

```css
@media (prefers-reduced-moti
```