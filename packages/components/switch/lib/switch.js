import { componentDecorator } from '@wcag-ui/core';
import { DOM } from '@wcag-ui/dom';

import attributes from './switch.attributes';
import events from './switch.events';

export class Switch extends HTMLInputElement {
  static componentName = 'wcag-switch';
  static extendsElement = 'input';
  static attributes = attributes;
  static events = events;

  static {
    componentDecorator('Switch', Switch);
  }

  constructor() {
    super();

    this.#initialize();
  }

  #initialize() {
    // sets type="checkbox" and switch attributes if not present
    this.setAttribute('type', 'checkbox');
    this.setAttribute('switch', '');

    // wrapping the Switch with a <span></span>
    // in order to use the wrapper for additional actions and icons
    const fieldWrapper = DOM.wrapElement(this, { tag: 'span' });

    // wrapping the fieldWrapper with a label for having this final DOM result
    // <label>
    //   {{ariaLabel value}}
    //   <span>
    //     <input type="checkbox" switch />
    //   </span>
    // </label>
    const label = DOM.wrapElement(fieldWrapper, { tag: 'label' });
    DOM.insertHTML(this.ariaLabel ?? 'aria-label N/A', label, 'prepend');

    // hiding the real input switch for showing the custom one
    this.setAttribute('sr-only', '');

    // removing aria-label attribute from Switch because of label text
    this.removeAttribute('aria-label');
  }
}
