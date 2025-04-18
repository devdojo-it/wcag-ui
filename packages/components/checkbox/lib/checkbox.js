import './styles/checkbox.css';

import { componentDecorator, error } from '@wcag-ui/core';
import { DOM } from '@wcag-ui/dom';

import attributes from './checkbox.attributes';
import events from './checkbox.events';

export class Checkbox extends HTMLInputElement {
  static name = 'wcag-checkbox';
  static extends = 'input';
  static attributes = attributes;
  static events = events;

  static {
    componentDecorator('Checkbox', Checkbox);
  }

  constructor() {
    super();

    this.#initialize();
  }

  #initialize() {
    // sets type="checkbox" if not present
    this.setAttribute('type', 'checkbox');

    // wrapping the Checkbox with a <span></span>
    // in order to use the wrapper for additional actions and icons
    const fieldWrapper = DOM.wrapElement(this, { tag: 'span' });

    // wrapping the fieldWrapper with a label for having this final DOM result
    // <label>
    //   {{ariaLabel value}}
    //   <span>
    //     <input type="checkbox" />
    //   </span>
    // </label>
    const label = DOM.wrapElement(fieldWrapper, { tag: 'label' });
    DOM.insertHTML(this.ariaLabel ?? 'aria-label N/A', label, 'prepend');

    // hiding the real input checkbox for showing the custom one
    this.setAttribute('sr-only','');
    
    // removing aria-label attribute from Checkbox because of label text
    this.removeAttribute('aria-label');
  }
}
