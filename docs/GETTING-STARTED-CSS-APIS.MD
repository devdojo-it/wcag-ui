# Getting Started – CSS APIs

Welcome to the CSS APIs guide for wcagUI. This guide explains how to customize the appearance of your wcagUI components using a powerful set of CSS APIs. By leveraging CSS custom properties, you can effortlessly override default styles, create themes, and ensure that your interface remains consistent and accessible.

---

## Customizing Global Styles 🎨

wcagUI exposes a range of CSS custom properties that allow you to modify the look and feel of its components globally. You can define these properties in your main stylesheet or within a `<style>` block in your HTML document. For example, to customize the appearance of a button and set global spacing and typography values, add the following:

```css
:root {
  --wcag-button-bg: #0055aa;
  --wcag-button-color: #ffffff;
  --wcag-button-border-radius: 4px;
  --wcag-spacing-small: 0.5rem;
  --wcag-spacing-medium: 1rem;
  --wcag-font-family: 'Roboto', sans-serif;
}
```

These custom properties let you change colors, spacing, and typography across all wcagUI components without modifying the component code itself.

---

## Using CSS Layers for Modular Styling 🏗️

To manage and organize your styles more effectively, wcagUI encourages the use of CSS layers. The `@layer` rule lets you group related styles and control their cascade order. For example, encapsulate your theme-related styles as follows:

```css
@layer wcag-ui-theme {
  :root {
    --wcag-button-bg: #0055aa;
    --wcag-button-color: #ffffff;
  }
}
```

This method helps maintain a clean separation of concerns and simplifies future updates to your design system.

---

## Responsive Customizations 📱💻

Responsive design is a key part of accessibility. With wcagUI's CSS APIs, you can use media queries to adjust custom properties based on the viewport size. For example, modify button styling for smaller screens with:

```css
@media (max-width: 600px) {
  :root {
    --wcag-button-border-radius: 2px;
    --wcag-spacing-medium: 0.75rem;
  }
}
```

This ensures that your UI remains user-friendly and accessible across all devices.

---

## Further Customizations and Theming 🔧

The flexibility of wcagUI's CSS APIs allows you to build comprehensive themes that reflect your brand’s identity. Combine custom properties with traditional CSS techniques to fine-tune component appearances, transitions, and interactions. Explore additional documentation and community examples to discover advanced theming strategies.

---

Navigation:  
Previous: [Integrations →](./getting-started-integrations.html)  
Next: None
