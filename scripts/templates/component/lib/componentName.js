/** biome-ignore-all lint/correctness/noUnusedImports: <this is a template> */
import { componentDecorator, helpers } from "@wcag-ui/core";
import { DOM } from "@wcag-ui/dom";

import attributes from './component-name.attributes';
import events from './component-name.events';

/**
 * wcagUI componentName class
 *
 * @export
 * @class componentName
 * @extends {HTMLElement}
 */
export class ComponentName extends HTMLElement {
  static isAttribute = 'wcag-component-name';
  static extendsElement = 'section';
  static attributes = attributes;
  static events = events;

  /**
   * static initialization
   *
   * @static
   * @memberof componentName
   */
  static {
    // biome-ignore lint/complexity/noThisInStatic: <"this" is needed to keep names with esbuild>
    componentDecorator(this);
  }

  constructor() {
    super();

    this.#init();
  }

  #init() {
  }
}
