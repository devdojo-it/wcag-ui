import { componentDecorator } from '@wcag-ui/core';

import attributes from './tooltip.attributes';
import events from './tooltip.events';

export class Tooltip extends HTMLElement {
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

  #init() {}
}
