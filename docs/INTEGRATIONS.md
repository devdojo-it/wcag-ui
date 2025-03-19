# Integration

wcagUI’s custom elements are built on standard web components, ensuring seamless compatibility with modern frontend frameworks and libraries. Thanks to our import system and support for the `is` attribute, integrating wcagUI into your project is effortless. Below are examples demonstrating how to import and use wcagUI components—using our button component as an example—across various frameworks.

---

### Angular

**Import:**  
In your main module or bootstrap file, import the custom element:

```typescript
// main.ts or app.module.ts
import "@wcag-ui/button";
```

**Usage in Template:**  
Extend a native button with the `is` attribute:

```html
<button is="wcag-button">Click Me</button>
```

_Note:_ If Angular warns about unknown elements, include the `CUSTOM_ELEMENTS_SCHEMA` in your module:

```typescript
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

@NgModule({
  // ...
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

---

### Vue

**Import:**  
In your main entry file, import the component:

```javascript
// main.js
import { createApp } from "vue";
import App from "./App.vue";
import "@wcag-ui/button";

const app = createApp(App);

// Mark elements as custom if they are <button> tags (used with the is attribute)
// or if the tag name itself starts with 'wcag-'.
// Note: This configuration will mark all <button> elements as custom.
// If your project uses native buttons normally, further refinement may be needed.
app.config.compilerOptions.isCustomElement = (tag) => tag === "button" || tag.startsWith("wcag-");

app.mount("#app");
```

**Usage in Template:**  
Use a native button enhanced with the `is` attribute:

```html
<template>
  <div>
    <button is="wcag-button">Click Me</button>
  </div>
</template>
```

---

### React

**Import:**  
In your React component, import the custom element:

```jsx
// App.jsx
import React from "react";
import "@wcag-ui/button";

function App() {
  return (
    <div>
      <button is="wcag-button">Click Me</button>
    </div>
  );
}

export default App;
```

_Tip:_ Ensure the wcagUI script is loaded before your React bundle to guarantee proper initialization.

---

### Svelte

**Import:**  
In your Svelte component, simply import the custom element:

```html
<!-- App.svelte -->
<script>
  import "@wcag-ui/button";
</script>

<main>
  <button is="wcag-button">Click Me</button>
</main>
```

---

### Astro

**Import:**  
In your Astro component, import the custom element at the top of your file:

```jsx
---
// Navbar.astro or any Astro component
import '@wcag-ui/button';
---
<html>
  <body>
    <button is="wcag-button">Click Me</button>
  </body>
</html>
```

---

By importing the necessary modules (e.g., `import '@wcag-ui/button'`) and leveraging the flexibility of the `is` attribute, wcagUI provides an integration-friendly solution that works harmoniously across any frontend ecosystem. No matter your preferred framework—Angular, Vue, React, Svelte, Astro, or others—you can build accessible, inclusive interfaces with minimal configuration and maximum efficiency.
