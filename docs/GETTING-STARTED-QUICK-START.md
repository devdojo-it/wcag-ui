# Quick Start

Welcome to the Quick Start guide for wcagUI. This guide is designed to help you integrate wcagUI into your project quickly and effortlessly. wcagUI empowers you to build accessible, inclusive interfaces using native web technologies and zero external dependencies. Follow the steps below to launch your first accessible component and begin your journey toward creating digital experiences that work for everyone.

## Step 1: Include wcagUI and Core Libraries in Your Project

Begin by adding the wcagUI module along with the core JS and CSS libraries to your project. These libraries are available as ES6 modules or can be loaded via a CDN (such as unpkg). Insert the following snippet into the `<head>` section of your HTML file:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Quick Start with wcagUI</title>
    <!-- Import core CSS via CDN -->
    <link rel="stylesheet" href="https://unpkg.com/@wcag-ui/foundations" />
  </head>
  <body>
    <!-- Import core JS and wcagUI module via ES6 module or CDN -->
    <script type="module" src="https://unpkg.com/@wcag-ui/core"></script>
  </body>
</html>
```

## Step 2: Use a wcagUI Component

The snippet above demonstrates how to use the wcagUI button component. By simply adding the attribute `is="wcag-button"` to a native `<button>` element, you automatically benefit from wcagUI’s built-in accessibility features—including proper ARIA roles and focus management—without any additional configuration.

For example, to add some interactivity, you might include an event listener:

```html
<script>
  document.querySelector('button[is="wcag-button"]').addEventListener("click", () => {
    alert("Button clicked!");
  });
</script>
```

## Step 3: Customize Your Interface

Once your basic setup is confirmed, explore the wide range of wcagUI components. Utilize our CSS APIs to adjust colors, spacing, and typography so that your interface aligns with your project’s branding while upholding high accessibility standards.

For example, you can customize the wcagUI button by defining CSS custom properties. Insert the following in a `<style>` block in your HTML file or your main stylesheet:

```css
:root {
  --wcag-button-bg: #0055aa;
  --wcag-button-color: #ffffff;
  --wcag-button-border-radius: 4px;
}
```

The wcagUI button will automatically use these values to adjust its appearance.

## Step 4: Framework Integration

wcagUI is designed to integrate seamlessly with popular frameworks such as Angular, React, Vue, Svelte, Astro, and Qwik. Whether you're starting a new project or enhancing an existing one, refer to the [Integrations](./getting-started-integrations.html) section of our documentation for detailed instructions tailored to your development environment.

## Step 5: Continue Learning

This Quick Start guide is just the beginning. Dive deeper into our documentation to explore advanced features, customization options, and best practices for building accessible, future-proof digital experiences with wcagUI.

---

Navigation:  
Previous: None  
Next: [Integrations →](./getting-started-integrations.html)
