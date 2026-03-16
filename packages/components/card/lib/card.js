import { componentDecorator } from '@wcag-ui/core';

import attributes from './card.attributes';
import events from './card.events';

/**
 * wcagUI Card class
 *
 * @export
 * @class Card
 * @extends {HTMLElement}
 */
export class Card extends HTMLElement {
  static extendsElement = 'article';
  static attributes = attributes;
  static events = events;

  static {
    componentDecorator(this);
  }

  constructor() {
    super();

    this.#init();
  }

  #init() {}
}
