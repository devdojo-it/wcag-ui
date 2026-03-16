import { componentDecorator } from '@wcag-ui/core';

import attributes from './breadcrumbs.attributes';
import events from './breadcrumbs.events';

/**
 * wcagUI Breadcrumbs class
 *
 * @export
 * @class Breadcrumbs
 * @extends {HTMLElement}
 */
export class Breadcrumbs extends HTMLElement {
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
    !this.hasAttribute('aria-label') && this.setAttribute('aria-label', 'Breadcrumb');
  }
}
