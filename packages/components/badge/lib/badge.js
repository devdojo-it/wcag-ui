import { componentDecorator } from '@wcag-ui/core';

import attributes from './badge.attributes';
import events from './badge.events';

/**
 * wcagUI Badge class
 *
 * @export
 * @class Badge
 * @extends {HTMLElement}
 */
export class Badge extends HTMLElement {
  static extendsElement = 'span';
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
    !this.hasAttribute('role') && this.setAttribute('role', 'status');
  }
}
