import { componentDecorator, events as coreEvents, helpers } from '@wcag-ui/core';
import { DOM } from '@wcag-ui/dom';

import attributes from './toast.attributes';
import events from './toast.events';

/**
 * wcagUI Toast class
 *
 * @export
 * @class Toast
 * @extends {HTMLElement}
 */
export class Toast extends HTMLElement {
  static extendsElement = 'output';
  static attributes = attributes;
  static events = events;

  static {
    componentDecorator(this);
  }

  #guid;
  #dismissTimer;

  get dismissible() {
    return this.hasAttribute('dismissible');
  }

  get autoDismiss() {
    const val = this.getAttribute('auto-dismiss');
    return val !== null ? Number(val) || 5000 : 0;
  }

  constructor() {
    super();
    this.#init();
  }

  #init() {
    this.#guid = helpers.strings.guid();
    this.setAttribute('role', this.hasAttribute('assertive') ? 'alert' : 'status');

    if (this.dismissible) {
      this.#addCloseButton();
    }

    if (this.autoDismiss > 0) {
      this.#startAutoDismiss();
    }
  }

  #addCloseButton() {
    const btn = DOM.createElement({
      tag: 'button',
      attributes: {
        type: 'button',
        dismiss: '',
        'aria-label': 'Close',
      },
      content: '\u00D7',
    });
    DOM.insertElement(btn, this, 'append');
  }

  #startAutoDismiss() {
    this.#dismissTimer = setTimeout(() => this.dismiss(), this.autoDismiss);
  }

  dismiss() {
    clearTimeout(this.#dismissTimer);
    this.setAttribute('hidden', '');
    coreEvents.dispatchComponentEvent.call(this, 'dismiss');
  }
}
