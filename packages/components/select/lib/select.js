import { componentDecorator } from '@wcag-ui/core';
import { DOM } from '@wcag-ui/dom';

import attributes from './select.attributes';
import events from './select.events';

export class Select extends HTMLElement {
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
    // <select name="NAME" aria-label="...">...</select>

    if (this.ariaLabel) {
      // wrapping the input with a <span field-wrapper></span>
      // in order to use the wrapper for additional actions and icons
      const fieldWrapper = DOM.wrapElement(this, { tag: 'span' });

      // wrapping the fieldWrapper with a label for having this final DOM result
      // <label>
      //   {{ariaLabel value}}
      //   <span field-wrapper>
      //     <select name="NAME">...</select>
      //   </span>
      // </label>
      const label = DOM.wrapElement(fieldWrapper, { tag: 'label' });
      DOM.insertHTML(this.ariaLabel ?? 'aria-label N/A', label, 'prepend');

      // removing aria-label attribute from input because of label text
      this.removeAttribute('aria-label');
    }
  }
}

// import '@wcag-ui/select';

// before: <select name="NAME" aria-label="User Role">...</select>

// after:
// <label>
//   User Role
//   <span field-wrapper>
//     <select name="NAME">...</select>
//   </span>
// </label>
