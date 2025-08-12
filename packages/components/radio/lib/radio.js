import { componentDecorator } from '@wcag-ui/core';
import { DOM } from '@wcag-ui/dom';

import attributes from './radio.attributes';
import events from './radio.events';

export class Radio extends HTMLInputElement {
  static extendsElement = 'input';
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
    // sets type="radio" if not present
    this.setAttribute('type', 'radio');

    // wrapping the Radio with a <span></span>
    // in order to use the wrapper for additional actions and icons
    const fieldWrapper = DOM.wrapElement(this, { tag: 'span' });

    // wrapping the fieldWrapper with a label for having this final DOM result
    // <label>
    //   {{ariaLabel value}}
    //   <span>
    //     <input type="radio" />
    //   </span>
    // </label>
    const label = DOM.wrapElement(fieldWrapper, { tag: 'label' });
    DOM.insertHTML(this.ariaLabel ?? 'aria-label N/A', label, 'prepend');

    // hiding the real input radio for showing the custom one
    this.setAttribute('sr-only', '');

    // removing aria-label attribute from Radio because of label text
    this.removeAttribute('aria-label');
  }
}
