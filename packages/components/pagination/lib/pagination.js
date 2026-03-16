import { componentDecorator, events as coreEvents } from '@wcag-ui/core';

import attributes from './pagination.attributes';
import events from './pagination.events';

/**
 * wcagUI Pagination class
 *
 * @export
 * @class Pagination
 * @extends {HTMLElement}
 */
export class Pagination extends HTMLElement {
  static extendsElement = 'nav';
  static attributes = attributes;
  static events = events;

  static {
    componentDecorator(this);
  }

  constructor() {
    super();

    this.#init();
  }

  #init() {
    !this.hasAttribute('aria-label') && this.setAttribute('aria-label', 'Pagination');
  }

  get currentPage() {
    const current = this.querySelector('[aria-current="page"]');
    return current ? Number(current.textContent) : 1;
  }
}
