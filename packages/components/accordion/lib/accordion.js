import { componentDecorator, helpers } from "@wcag-ui/core";
import { DOM } from "@wcag-ui/dom";

import "./styles/accordion.css";

import attributes from "./accordion.attributes";
import events from "./accordion.events";

/**
 * wcagUI Accordion class
 *
 * @export
 * @class Accordion
 * @extends {HTMLElement}
 */
export class Accordion extends HTMLElement {
  static name = "wcag-accordion";
  static extends = "section";
  static attributes = attributes;
  static events = events;

  /**
   * static initialization
   *
   * @static
   * @memberof Accordion
   */
  static {
    componentDecorator("Accordion", Accordion);
  }

  #guid = helpers.strings.guid();
  #items;

  constructor() {
    super();

    this.#initialize();
  }

  #initialize() {
    this.#items = this.querySelectorAll(":scope > details");

    for (const item of this.#items) {
      item.setAttribute("name", `${this.#guid}-accordion`);
    }
  }
}
