# wcagUI: Crafting UIs with Accessibility Built-In

wcagUI is a toolkit designed to help create accessible and inclusive user interfaces without relying on bulky libraries. This solution makes it simple to build technology that everyone can use, with accessibility integrated into every step of the design process.

---

## Making A11y Accessible

- **Zero External Dependencies:**  
  Developed entirely with HTML, CSS, and JavaScript, wcagUI works without extra libraries. This means an efficient, lightweight solution that fits smoothly into any project.

- **Semantic HTML at Its Core:**  
  Every component is built using clear, semantic HTML. This approach improves accessibility, makes content easier to understand for assistive tools, and boosts search engine visibility.

- **Inclusive by Design:**  
  Based on trusted WCAG patterns and offering automatic WAI-ARIA handling, wcagUI simplifies the creation of interfaces that serve a diverse range of users.

- **Cutting-Edge Web APIs:**  
  Leveraging modern web technologies, wcagUI produces fast, adaptable interfaces built to last.

> *The wcagUI team is thankful for the support provided by [Exeen](https://www.exeen.it), whose expertise has played a key role in shaping this project.*

---

## Why wcagUI?

Digital accessibility should never be an afterthought. With around 1.3 billion people facing barriers in accessing digital content, building technology that works for everyone is essential. wcagUI embeds accessibility directly into the design process by using semantic HTML, established WCAG guidelines, and modern web APIs. This integrated approach fosters a digital space where each user finds a welcoming and effective experience.

[Learn more about the philosophy behind wcagUI →](./why.html)

---

## How wcagUI Works

wcagUI uses native web technologies to make the development of accessible interfaces straightforward and reliable. Key features include:

- **Custom Elements without Shadow DOM:**  
  Components are defined as custom elements and remain part of the global DOM. This transparent structure aids in debugging, improves SEO, and supports smooth integration with other tools.

- **Dynamic Interactions with Custom Events:**  
  A robust custom event system enables components to communicate effortlessly. This design promotes modularity and makes maintenance simpler.

- **Efficient Initialization:**  
  By using static initialization blocks and JavaScript mixins, components are set up consistently, minimizing errors and ensuring reliable performance.

- **Modular Styling:**  
  CSS custom properties and the structured use of `@layer` allow for flexible theming and easy customization without style conflicts.

[Discover the technical details →](./how.html)

---

## Integration Across Frameworks

wcagUI components are built as standard web components that easily integrate into existing projects. Whether using Angular, Vue, React, Svelte, or Astro, wcagUI adapts to your development environment:

- **Angular:**  
  Import with `import "@wcag-ui/button";` and enhance native buttons using the `is` attribute.  
  *(Remember to include `CUSTOM_ELEMENTS_SCHEMA` when necessary.)*

- **Vue:**  
  Configure your app to recognize custom elements and use them directly in your templates.

- **React:**  
  Load the wcagUI script before the React bundle to allow seamless use of custom elements in JSX.

- **Svelte & Astro:**  
  Import components like any native element to begin using them immediately.

[See full integration instructions →](./getting-started-integrations.html)

---

## Get Started

Start building accessible and inclusive interfaces with wcagUI today.  
[Download wcagUI](#) or explore the [documentation](#) to begin creating technology that works for everyone.
