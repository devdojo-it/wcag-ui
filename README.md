# ✨ wcagUI ✨

## Making Accessibility... Accessible!

wcagUI is a Design System, is a UI Kit, it's based on WCAG APG Patterns and designed to help developers creating accessible and inclusive user interfaces.

This solution makes it simple to build technology that everyone can use, with accessibility integrated into every step of the design process.

Designed with developers in mind, wcagUI empowers to build stunning, inclusive interfaces with ease.

Here's what can make wcagUI your choice:

- **Zero External Dependencies** 📦: Crafted in pure HTML, CSS, and JavaScript, wcagUI is entirely self-contained, ensuring a lightweight, straightforward integration without the overhead of bulky libraries.
- **Semantic HTML at Its Core** 📜: Every component is built with semantic HTML, so your UI communicates clear meaning to browsers and assistive technologies—boosting both accessibility and SEO.
- **Accessibile by Design** 🤖: based on [WCAG Patterns](https://www.w3.org/WAI/ARIA/apg/patterns) and featuring mostly automatic WAI-ARIA attribute handling, wcagUI makes it effortless to create interfaces that are inclusive and robust.
- **Cutting-Edge Web APIs** 🚀: Leverage the power of the latest core web technologies; wcagUI harnesses state-of-the-art HTML, CSS, and JavaScript APIs for fast, modern, and future-proof interfaces.

Focus on crafting amazing user experiences while wcagUI takes care of making every interface accessible to everyone. Welcome to a world where inclusive design is truly effortless! 🌍✨

A special thanks to [Exeen](https://www.exeen.it), a Milan-based design studio with Accessibility at Its core, whose invaluable support made this project possible.

# Creating a new Component
TODO: create a node.js script CLI for making the following process automatic

## Process for creating a new component

0. copy and paste the `./scripts/templates/component` folder into the `./packages/components`
1. rename the `component` folder in `./packages/components` with your actual componentName (eg. `tooltip`)
2. find and replace the `componentName` with your actual componentName (eg. `tooltip`), make sure to activate the "AB" button in the replace form
3. rename the `componentName(.*).[js|css]` files with your actual componentName (eg. `tooltip`)
4. add the new component dependency in main `package.json` file (eg. `@wcag-ui/tooltip`: `workspace:^0.0.0`)
5. run `pnpm install` command
6. for working on the component or just use it add the following code lines
  - `@import "npm:@wcag-ui/tooltip/tooltip.min.css"` in your main css file (eg. `./src/styles/index.css`);
  - `import '@wcag-ui/tooltip';` in your main js file (eg. `./src/scripts/index.js`);
  - it's needed to add the specific component HTML code to make it run
7. now your component is ready to work on or to be tested

