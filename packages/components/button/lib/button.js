import { componentDecorator } from "@wcag-ui/core";

import attributes from "./button.attributes";
import events from "./button.events";

/**
 * wcagUI Button class
 *
 * @export
 * @class Button
 * @extends {HTMLButtonElement}
 */
export class Button extends HTMLButtonElement {
  static componentName = "wcag-button";
  static extendsElement = "button";
  static attributes = attributes;
  static events = events;

  /**
   * static initialization block
   *
   * @static
   * @memberof Button
   */
  static {
    componentDecorator("Button", Button);
  }

  constructor() {
    super();

    this.#initialize();
  }

  #initialize() {
    !this.hasAttribute("type") && this.setAttribute("type", "button");
    // !this.hasAttribute("role") && this.setAttribute("role", "button");
  }
}

// <script type="importmap">
//   {
//     "imports": {
//       "@wcag-ui/core": "https://unpkg.com/@wcag-ui/core",
//       "@wcag-ui/button": "https://unpkg.com/@wcag-ui/button"
//     }
//   }
// </script>
// <link rel="stylesheet" href="https://unpkg.com/@wcag-ui/button/button.css" />


// import '@wcag-ui/button';
// import '@wcag-ui/button/button.css';

// before: <button is="wcag-button">Ciao<button>

// after: <button is="wcag-button" type="button">Ciao<button>



