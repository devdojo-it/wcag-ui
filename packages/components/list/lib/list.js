import { componentDecorator } from '@wcag-ui/core';

import attributes from './list.attributes';
import events from './list.events';

/**
 * wcagUI List class
 *
 * @export
 * @class List
 * @extends {HTMLElement}
 */
export class List extends HTMLElement {
  static extendsElement = 'ul';
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
    !this.hasAttribute('role') && this.setAttribute('role', 'list');
  }
}
