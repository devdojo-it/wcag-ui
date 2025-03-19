import { componentDecorator } from '@wcag-ui/core';
import { DOM } from '@wcag-ui/dom';

import './styles/dialog.css';

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
  static name = 'wcag-dialog';
  static extends = 'dialog';
  static attributes = attributes;
  static events = events;

  /**
   * static initialization
   *
   * @static
   * @memberof Dialog
   */
  static {
    componentDecorator('Dialog', Dialog);
  }

  constructor() {
    super();

    this.#initialize();
  }

  #initialize() {}
}
