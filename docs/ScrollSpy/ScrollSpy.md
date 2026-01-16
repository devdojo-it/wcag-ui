# **📌 Scrollspy - Accessibilità**

  

## **1. Overview del Componente**

  

The component Scrollspy evidenzia automaticamente, all’interno di una navigazione (di solito laterale o in-page), la sezione attualmente visibile nella pagina. È tipico per pagine lunghe (documentazione, articoli, schede prodotto) e si basa su link ad ancore (es. #sezione-1).

  

Uno scrollspy accessibile deve:

- funzionare come **normale navigazione ad ancore**;
    
- non dipendere solo dal colore per indicare la sezione attiva;
    
- non spostare il focus “a sorpresa” mentre l’utente scorre;
    
- comunicare correttamente lo stato attivo (es. aria-current).
    

---

## **2. Requisiti di Accessibilità (WCAG)**

  

### **🔹 WCAG 1.3.1 - Information and Relationships**

- La navigazione dello scrollspy deve essere un elemento semantico (nav) con nome accessibile.
    
- L’elenco dei link deve essere strutturato come lista (ul/li) quando applicabile.
    
- Ogni sezione target it must have un id unico e un heading coerente.
    

```
<nav aria-label="In questa pagina">
  <ul>
    <li><a href="#intro">Introduzione</a></li>
    <li><a href="#dettagli">Dettagli</a></li>
  </ul>
</nav>

<section id="intro">
  <h2>Introduzione</h2>
</section>
```

---

### **🔹 WCAG 1.4.1 - Uso del Colore**

- La sezione attiva non deve essere indicata solo dal colore.
    
- Affiancare al colore un indicatore aggiuntivo (es. underline, icona, bordo, font-weight) con contrasto adeguato.
    

---

### **🔹 WCAG 1.4.3 - Minimum Contrast**

- Testo dei link: contrasto minimo **4.5:1**.
    
- Indicatori di stato (border/underline/marker): contrasto minimo **3:1**.
    

---

### **🔹 WCAG 2.4.1 - Salto di Blocchi**

- Se la pagina è lunga o ha navigazioni ripetute, prevedere un link “Salta al contenuto” e/o una struttura che consenta di bypassare menu e sidebar.
    

---

### **🔹 WCAG 2.4.3 - Ordine del Focus**

- La navigazione deve seguire un ordine logico.
    
- La gestione “automatica” dello stato attivo non deve alterare l’ordine di tabulazione.
    
- Evitare che lo scrollspy cambi focus mentre l’utente scorre.
    

---

### **🔹 WCAG 2.4.4 - Scopo del Link**

- Il testo di ogni link deve descrivere chiaramente la destinazione (titolo della sezione).
    
- Evitare link generici come “Vai” o “Sezione”.
    

---

### **🔹 WCAG 2.4.7 - Focus Visible**

- I link dello scrollspy devono avere focus visibile.
    
- Il focus indicator it must have un contrasto minimo di **3:1**.
    

```
.scrollspy a:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 3px;
}
```

---

### **🔹 WCAG 3.2.1 - Al Focus**

- Mettere focus su un link non deve cause cambiamenti inattesi (es. scroll automatico).
    
- Lo scroll deve avvenire solo quando l’utente **attiva** il link (Enter/click), non quando lo focalizza.
    

---

### **🔹 WCAG 4.1.2 - Nome, Ruolo, Valore**

- La sezione attiva deve essere comunicata con aria-current="location" sul link corrispondente.
    
- aria-current deve essere aggiornato quando cambia la sezione visibile.
    

```
<a href="#dettagli" aria-current="location">Dettagli</a>
```

---

## **3. Linee Guida per gli Sviluppatori**

  

✅ **Correct HTML Markup**

```
<nav class="scrollspy" aria-label="In questa pagina">
  <ul>
    <li><a href="#intro" aria-current="location">Introduzione</a></li>
    <li><a href="#dettagli">Dettagli</a></li>
    <li><a href="#faq">FAQ</a></li>
  </ul>
</nav>

<main>
  <section id="intro"><h2>Introduzione</h2></section>
  <section id="dettagli"><h2>Dettagli</h2></section>
  <section id="faq"><h2>FAQ</h2></section>
</main>
```

🚫 **Wrong Example (solo highlight visivo, niente semantica)**

```
<div class="scrollspy">
  <div onclick="goTo('intro')">Introduzione</div>
</div>
```

✅ **Gestione dello stato attivo (aria-current)**

```
// Quando la sezione cambia (es. IntersectionObserver), aggiornare aria-current.
// Importante: non spostare il focus automaticamente.
```

✅ **Scrolling e preferenze utente**

```
html:focus-within {
  scroll-behavior: auto;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

---

## **4. Test e Validazione**

  

🛠 **Assistive Technologies Tested**

- NVDA
    
- VoiceOver
    
- JAWS
    

  

🛠 **Verification Tools**

- [axe DevTools](https://www.deque.com/axe/)![Attachment.tiff](file:///Attachment.tiff)
    
- [WAVE](https://wave.webaim.org/)![Attachment.tiff](file:///Attachment.tiff)
    
- [Lighthouse Accessibility Audit](https://developers.google.com/web/tools/lighthouse/)![Attachment.tiff](file:///Attachment.tiff)
    

  

🎯 **Casi d’Uso da Testare**

- I link funzionano come ancore standard e portano alla sezione corretta?
    
- Il focus sui link è visibile e non viene rubato durante lo scroll?
    
- Lo stato attivo è comunicato anche senza colore?
    
- aria-current viene aggiornato correttamente?
    
- Con prefers-reduced-motion lo scroll non è “smooth” forzato?
    

---

## **5. Considerazioni Avanzate**

  

🌍 **Internationalization**

- Assicurare che i titoli di sezione e i link siano localizzati e consistenti.
    
- Gestire testi lunghi (wrapping, ellissi con alternativa).
    

  

📱 **Responsiveness**

- In mobile, la navigazione può diventare sticky o trasformarsi in dropdown, mantenendo:
    
    - ordine logico,
        
    - focus visibile,
        
    - stato attivo non basato solo sul colore.
        
    
- Target interattivi minimi **44×44 px**.
    

  

🎞 **Motion e Animazioni**

```
@media (prefers-reduced-motion: reduce) {
  .scrollspy {
    transition: none;
  }
}
```

---

## **6. Esempi e Best Practices**

- Lo scrollspy deve essere una normale navigazione ad ancore, non un “teletrasporto” gestito solo via JS.
    
- Non cambiare focus automaticamente quando l’utente scorre.
    
- Usare aria-current="location" per indicare la sezione attiva.
    
- Non basarsi solo sul colore: aggiungere indicatori visivi coerenti.
    

---

📌 **References**

- [WCAG 2.1 - Success Criterion 1.3.1 Information and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 1.4.1 Uso del Colore](https://www.w3.org/TR/WCAG21/#use-of-color)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 1.4.3 Minimum Contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 2.4.1 Salto di Blocchi](https://www.w3.org/TR/WCAG21/#bypass-blocks)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 2.4.3 Ordine del Focus](https://www.w3.org/TR/WCAG21/#focus-order)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 2.4.4 Scopo del Link](https://www.w3.org/TR/WCAG21/#link-purpose-in-context)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visible](https://www.w3.org/TR/WCAG21/#focus-visible)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 3.2.1 Al Focus](https://www.w3.org/TR/WCAG21/#on-focus)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 4.1.2 Nome, Ruolo, Valore](https://www.w3.org/TR/WCAG21/#name-role-value)![Attachment.tiff](file:///Attachment.tiff)
    
- [ARIA Authoring Practices - Landmark Regions (nav)](https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/)![Attachment.tiff](file:///Attachment.tiff)
    
- [ARIA - aria-current (spec)](https://www.w3.org/TR/wai-aria-1.2/#aria-current)![Attachment.tiff](file:///Attachment.tiff)