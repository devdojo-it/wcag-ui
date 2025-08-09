import { componentDecorator } from '@wcag-ui/core';

import attributes from './dialog.attributes';
import events from './dialog.events';

/**
 * wcagUI Dialog class
 *
 * @export
 * @class Dialog
 * @extends {HTMLDialogElement}
 */
export class Dialog extends HTMLDialogElement {
  static isAttribute = 'wcag-dialog';
  static extendsElement = 'dialog';
  static attributes = attributes;
  static events = events;

  /**
   * static initialization
   *
   * @static
   * @memberof Dialog
   */
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

// import "@wcag-ui/dialog";
