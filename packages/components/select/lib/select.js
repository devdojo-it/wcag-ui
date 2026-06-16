import { componentDecorator } from '@wcag-ui/core';
import { DOM } from '@wcag-ui/dom';

import attributes from './select.attributes';
import events from './select.events';

export class Select extends HTMLSelectElement {
  static extendsElement = 'select';
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
    if (this.ariaLabel && this.parentElement?.tagName !== 'LABEL') {
      const fieldWrapper = DOM.wrapElement(this, { tag: 'span' });
      const label = DOM.wrapElement(fieldWrapper, { tag: 'label' });
      DOM.insertHTML(this.ariaLabel ?? 'aria-label N/A', label, 'prepend');
      this.removeAttribute('aria-label');
    }

    this.#ensureCustomizablePicker();
  }

  onConnected() {
    this.#ensureCustomizablePicker();
  }

  #ensureCustomizablePicker() {
    const button = this.querySelector(':scope > button');

    if (!button) {
      DOM.insertHTML('<button><selectedcontent></selectedcontent></button>', this, 'prepend');
      return;
    }

    if (!button.querySelector('selectedcontent')) {
      DOM.insertHTML('<selectedcontent></selectedcontent>', button, 'append');
    }
  }
}
