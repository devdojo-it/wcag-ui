import { componentDecorator } from "@wcag-ui/core";

import './styles/details.css';

import attributes from "./details.attributes";
import events from "./details.events";

/**
 * wcagUI Details class
 *
 * @export
 * @class Details
 * @extends {HTMLDetailsElement}
 */
export class Details extends HTMLDetailsElement {
  static name = "wcag-details";
  static extends = "details";
  static attributes = attributes;
  static events = events;

  
  /**
   * static initialization
   *
   * @static
   * @memberof Details
   */
  static {
    componentDecorator("Details", Details);
  }

  constructor() {
    super();

    this.initialize();
    this.onclick = this;
  }

  initialize() {
    this.setAttribute('aria-expanded', `${this.open.toString()}`);
  }
}
