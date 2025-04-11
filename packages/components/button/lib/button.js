import { componentDecorator } from "@wcag-ui/core";

import "./styles/button.css";

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
  static name = "wcag-button";
  static extends = "button";
  static attributes = attributes;
  static events = events;

  /**
   * static initialization
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


// import '@wcag-ui/button';

// <button is="wcag-button">Ciao<button>
// <wcag-button>Ciao<wcag-button>

// import '@wcag-ui/input';

// <input is="wcag-input" type="text" aria-label="Username" />

// <label>
//   Username
//   <input is="wcag-input" type="text" aria-label="Username" />
// </label>
