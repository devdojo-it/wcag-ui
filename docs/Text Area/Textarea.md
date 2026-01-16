# **📌 Textarea 

  

## **1. Overview del Componente**

  

The component Textarea consente l’inserimento di testo libero su più righe (es. note, descrizioni, messaggi). Deve essere utilizzabile da tastiera, correttamente etichettato, compatibile con screen reader e supportare stati come errore, disabilitato e conteggio caratteri (se presente).

---

## **2. Requisiti di Accessibilità (WCAG)**

  

### **🔹 WCAG 1.3.1 - Information and Relationships**

- La textarea it must have una label associata tramite for e id.
    
- Testi di aiuto (placeholder, hint, esempi) devono essere collegati tramite aria-describedby.
    
- Se il campo è obbligatorio, comunicarlo in modo testuale e/o con attributi appropriati.
    

```
<label for="message">Messaggio</label>
<textarea id="message" aria-describedby="message-hint"></textarea>
<p id="message-hint">Scrivi un messaggio breve (max 500 caratteri).</p>
```

---

### **🔹 WCAG 1.4.3 - Minimum Contrast**

- Testo inserito e label: contrasto minimo **4.5:1**.
    
- Bordi, icone e indicatori di stato (errore/focus): contrasto minimo **3:1**.
    
- Lo stato di errore non deve essere comunicato solo tramite colore.
    

---

### **🔹 WCAG 2.1.1 - Keyboard**

- The component deve essere raggiungibile con Tab.
    
- Deve supportare input standard (scrittura, selezione testo, copia/incolla).
    
- Evitare scorciatoie personalizzate che interferiscono con le shortcut del browser o delle tecnologie assistive.
    

---

### **🔹 WCAG 2.4.7 - Focus Visible**

- Il focus deve essere sempre visibile sulla textarea.
    
- Il focus indicator it must have un contrasto minimo di **3:1**.
    

```
textarea:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 3px;
}
```

---

### **🔹 WCAG 3.3.1 - Identificazione degli Errori**

- In caso di errore, mostrare un messaggio testuale vicino al campo.
    
- Collegare il messaggio alla textarea tramite aria-describedby.
    
- Usare aria-invalid="true" quando il contenuto è invalido.
    

```
<label for="desc">Descrizione</label>
<textarea id="desc" aria-invalid="true" aria-describedby="desc-error"></textarea>
<p id="desc-error">La descrizione è obbligatoria.</p>
```

---

### **🔹 WCAG 4.1.2 - Nome, Ruolo, Valore**

- Il nome accessibile deve essere determinato dalla label.
    
- Il ruolo deve essere quello nativo del controllo (textarea).
    
- Lo stato disabilitato deve essere espresso con disabled.
    

```
<textarea id="notes" disabled></textarea>
```

---

## **3. Linee Guida per gli Sviluppatori**

  

✅ **Correct HTML Markup**

```
<label for="notes">Note</label>
<textarea id="notes" aria-describedby="notes-hint notes-counter"></textarea>
<p id="notes-hint">Inserisci eventuali dettagli utili.</p>
<p id="notes-counter">0/500</p>
```

🚫 **Wrong Example (mancanza di label)**

```
<textarea placeholder="Note"></textarea>
```

✅ **Gestione del Focus**

```
textarea:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 3px;
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

- La textarea ha una label associata e annunciata correttamente?
    
- Il focus è visibile?
    
- Gli errori sono annunciati e collegati al campo?
    
- Conteggio caratteri (se presente) è aggiornato e comprensibile?
    

---

## **5. Considerazioni Avanzate**

  

🌍 **Internationalization**

- Supportare testi lunghi e lingue diverse.
    
- Evitare testi troncati nei messaggi di errore o hint.
    

  

📱 **Responsiveness**

- Area di input adeguata su mobile.
    
- Target e scroll gestiti correttamente con zoom al 200%.
    

  

🎞 **Motion e Animazioni**

```
@media (prefers-reduced-motion: reduce) {
  .textarea {
    transition: none;
  }
}
```

---

## **6. Esempi e Best Practices**

- Non use il placeholder come unica label.
    
- Collegare hint, errori e contatore con aria-describedby.
    
- Se c’è un limite caratteri, comunicarlo in modo testuale.
    
- Testare con screen reader reali.
    

---

📌 **References**

- [WCAG 2.1 - Success Criterion 1.3.1 Information and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 1.4.3 Minimum Contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 2.1.1 Keyboard](https://www.w3.org/TR/WCAG21/#keyboard)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 2.4.7 Focus Visible](https://www.w3.org/TR/WCAG21/#focus-visible)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 3.3.1 Identificazione degli Errori](https://www.w3.org/TR/WCAG21/#error-identification)![Attachment.tiff](file:///Attachment.tiff)
    
- [WCAG 2.1 - Success Criterion 4.1.2 Nome, Ruolo, Valore](https://www.w3.org/TR/WCAG21/#name-role-value)![Attachment.tiff](file:///Attachment.tiff)