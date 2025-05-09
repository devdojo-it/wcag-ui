import { componentDecorator, helpers } from "@wcag-ui/core";
import { DOM } from "@wcag-ui/dom";

import './styles/accordion.css';

import attributes from './accordion.attributes';
import events from './accordion.events';

/**
 * wcagUI Accordion class
 *
 * @export
 * @class Accordion
 * @extends {HTMLElement}
 */
export class Accordion extends HTMLElement {
  static name = 'wcag-accordion';
  static extends = 'section';
  static attributes = attributes;
  static events = events;

  /**
   * static initialization
   *
   * @static
   * @memberof Accordion
   */
  static {
    componentDecorator('Accordion', Accordion);
  }

  #guid = helpers.strings.guid();

  get name() {
    return this.getAttribute('name') ?? `${this.#guid}-accordion`;
  }

  set name(name) {
    this.setAttribute('name', name ?? `${this.#guid}-accordion`);
    this.update();
  }

  #mutationObserver;

  #mutationHandler(mutations) {
    for (const mutation of mutations) {
      (mutation.type === 'childList' || mutation.type === 'attribute') && this.update();
    }
  }

  update() {
    const name = this.name;

    for (const item of this.querySelectorAll(':scope > details')) {
      item.setAttribute('name', name);
    }
  }

  constructor() {
    super();

    this.#initialize();
  }

  #initialize() {
    this.#mutationObserver = new MutationObserver(this.#mutationHandler.bind(this));

    this.#mutationObserver.observe(this, {
      attributes: true,
      attributeFilter: ['name'],
      childList: true,
      subtree: false,
    });

    this.update();
  }
}
