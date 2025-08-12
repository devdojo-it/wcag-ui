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
    componentDecorator(this);
  }

  constructor() {
    super();

    this.#init();
  }

  #init() {}
}

// import "@wcag-ui/dialog";
