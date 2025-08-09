import { componentDecorator } from '@wcag-ui/core';

import attributes from './tooltip.attributes';
import events from './tooltip.events';

export class Tooltip extends HTMLElement {
  static isAttribute = 'wcag-tooltip';
  static extendsElement = 'span';
  static attributes = attributes;
  static events = events;

  static {
    // biome-ignore lint/complexity/noThisInStatic: <"this" is needed to keep names with esbuild>
    componentDecorator(this);
  }

  constructor() {
    super();

    this.#init();
  }

  #init() {}
}
