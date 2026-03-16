import { componentDecorator, events as coreEvents } from '@wcag-ui/core';
import { DOM } from '@wcag-ui/dom';

import attributes from './tag.attributes';
import events from './tag.events';

/**
 * wcagUI Tag class
 *
 * @export
 * @class Tag
 * @extends {HTMLElement}
 */
export class Tag extends HTMLElement {
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

  #init() {
    if (this.hasAttribute('removable')) {
      this.#addCloseButton();
    }
  }

  #addCloseButton() {
    const btn = DOM.createElement({ tag: 'button' });
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-label', 'Remove');
    btn.textContent = '\u00D7';
    btn.addEventListener('click', () => {
      coreEvents.dispatchComponentEvent.call(this, 'remove', { value: this.textContent });
      this.remove();
    });
    DOM.insertElement(btn, this, 'append');
  }
}
