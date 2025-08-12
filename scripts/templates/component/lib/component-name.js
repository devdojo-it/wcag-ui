/** biome-ignore-all lint/correctness/noUnusedImports: <this is a template> */
import { componentDecorator, helpers } from '@wcag-ui/core';
import { DOM } from '@wcag-ui/dom';

import attributes from './component-name.attributes';
import events from './component-name.events';

/**
 * wcagUI ComponentName class
 *
 * @export
 * @class ComponentName
 * @extends {HTMLElement}
 */
export class ComponentName extends HTMLElement {
  static extendsElement = 'section';
  static attributes = attributes;
  static events = events;

  /**
   * static initialization
   *
   * @static
   * @memberof ComponentName
   */
  static {
    componentDecorator(this);
  }

  constructor() {
    super();

    this.#init();
  }

  #init() {}
}
