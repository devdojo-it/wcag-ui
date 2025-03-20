# Integrations with wcagUI

Integrating wcagUI into your project is straightforward and flexible. Built as standard web components, wcagUI works seamlessly with a variety of frontend frameworks and modern build systems. This guide provides detailed technical instructions for integrating wcagUI across multiple environments, including specific examples for both the latest versions and the most commonly used legacy versions of Angular, React, and Vue, as well as examples for Svelte, Astro, and Qwik.

## General Integration Concepts

wcagUI components are built on native web component standards. Key aspects include:

- **Standard Web Components:**  
  All components adhere to the Custom Elements specification and are implemented without shadow DOM. This means components reside in the global DOM, which simplifies styling, debugging, and integration with other libraries.

- **Automatic WAI-ARIA Handling:**  
  Accessibility features, such as ARIA attributes, are applied automatically to reduce the need for manual adjustments.

- **Flexible Import System:**  
  Components can be imported individually or as part of a bundle. The support for the `is` attribute lets you extend native HTML elements seamlessly, preserving familiar markup while enhancing functionality.

- **Modular Architecture:**  
  Leveraging JavaScript mixins and static initialization blocks, wcagUI components are designed to be extended and customized without modifying the core code.

- **Browser Compatibility:**  
  Targeting modern browsers with ES6+ features, wcagUI remains adaptable through the use of polyfills (for example, `@webcomponents/webcomponentsjs`) when supporting older environments.

---

## Angular Integration

### Latest Angular (v15+ / Standalone Components)

_Main Application Bootstrap (main.ts):_

```typescript
// main.ts (Latest Angular using Standalone Components)
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import '@wcag-ui/button';

bootstrapApplication(AppComponent)
  .catch(err => console.error(err));
```

_Standalone App Component (app.component.ts):_

```typescript
// app.component.ts (Latest Angular Standalone)
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<button is="wcag-button">Click Me</button>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {}
```

### Legacy Angular (v8 – v9)

_NgModule-Based Setup (app.module.ts):_

```typescript
// app.module.ts (Legacy Angular)
import '@wcag-ui/button';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

_Component Template (app.component.html):_

```html
<!-- app.component.html (Legacy Angular) -->
<button is="wcag-button">Click Me</button>
```

*Note:* If issues arise with custom elements not being recognized, ensure that the necessary polyfills for custom elements are included in your project.

---

## React Integration (v16+)

This unified example works for React versions 16 and above.

```jsx
// App.jsx (React v16+)
import React from 'react';
import ReactDOM from 'react-dom';
import '@wcag-ui/button';

function App() {
  return (
    <div>
      <button is="wcag-button">Click Me</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

*Technical Considerations:*

- **Script Loading Order:** Ensure the wcagUI script is loaded before your React bundle. This can be managed via your HTML template or dynamic imports.
- **Server-Side Rendering (SSR):** When using SSR, confirm that custom elements are properly hydrated on the client side.
- **Type Safety:** Consider defining TypeScript interfaces for wcagUI components to enhance the developer experience.

---

## Vue Integration

### Latest Vue (Vue 3)

_Importing and Configuring with createApp (main.js):_

```javascript
// main.js (Latest Vue)
import { createApp } from 'vue';
import App from './App.vue';
import '@wcag-ui/button';

const app = createApp(App);

// Configure Vue 3 to recognize custom elements
app.config.compilerOptions.isCustomElement = (tag) => tag === 'button' || tag.startsWith('wcag-');

app.mount('#app');
```

_Component Template (App.vue):_

```html
<!-- App.vue (Latest Vue) -->
<template>
  <div>
    <button is="wcag-button">Click Me</button>
  </div>
</template>
```

### Legacy Vue (Vue 2)

_Importing and Configuring with Vue Instance (main.js):_

```javascript
// main.js (Legacy Vue)
import Vue from 'vue';
import App from './App.vue';
import '@wcag-ui/button';

// Configure Vue 2 to ignore custom elements
Vue.config.ignoredElements = ['button', /^wcag-/];

new Vue({
  render: h => h(App),
}).$mount('#app');
```

_Component Template (App.vue):_

```html
<!-- App.vue (Legacy Vue) -->
<template>
  <div>
    <button is="wcag-button">Click Me</button>
  </div>
</template>
```

*Technical Tip:* Vue 2 uses `ignoredElements` to prevent warnings about unknown elements, while Vue 3 uses `compilerOptions.isCustomElement` for custom element recognition.

---

## Svelte Integration

Svelte makes it simple to integrate wcagUI components. Just import the component in your Svelte file:

```html
<!-- App.svelte -->
<script>
  import '@wcag-ui/button';
</script>

<main>
  <button is="wcag-button">Click Me</button>
</main>
```

---

## Astro Integration

Astro supports both static and dynamic content. To integrate wcagUI, import the component at the top of your Astro file:

```jsx
---
// Navbar.astro
import '@wcag-ui/button';
---
<html>
  <body>
    <button is="wcag-button">Click Me</button>
  </body>
</html>
```

---

## Qwik Integration

Qwik, known for its resumability, supports web components effortlessly. Here’s an example of integrating wcagUI in a Qwik component:

```tsx
// src/components/App.tsx (Qwik)
import { component$ } from '@builder.io/qwik';
import '@wcag-ui/button';

export const App = component$(() => {
  return (
    <div>
      <button is="wcag-button">Click Me</button>
    </div>
  );
});
```

And in your entry point:

```tsx
// src/entry.tsx (Qwik)
import { render } from '@builder.io/qwik';
import { App } from './components/App';

render(document.getElementById('root')!, <App />);
```

---

## Additional Technical Considerations

- **Polyfills and Browser Support:** For older browsers, include polyfills for custom elements and ES6 features. Tools like `@webcomponents/webcomponentsjs` help ensure compatibility.
- **Module Bundlers:** wcagUI components are distributed as ES modules and work with bundlers such as Webpack, Rollup, or Parcel. Ensure your bundler supports dynamic imports if needed.
- **Customization and Extensibility:** The modular design allows for easy customization using JavaScript mixins and static initialization blocks, so you can extend component functionality without modifying the core code.
- **Performance Optimization:** The absence of shadow DOM allows natural CSS cascading, reducing style recalculation overhead. Combined with modular CSS practices using custom properties and `@layer`, wcagUI supports fast rendering and smooth performance.
- **Documentation and Community Support:** Comprehensive documentation is available to address integration challenges and share best practices. Engage with the community for troubleshooting tips and advanced configurations.

---

By following these detailed guidelines, wcagUI can be integrated into virtually any project environment. This versatile toolkit is engineered for modern frontend frameworks and build systems, enabling the creation of accessible, efficient, and future-proof digital experiences.

[Return to Home →](./index.html)
