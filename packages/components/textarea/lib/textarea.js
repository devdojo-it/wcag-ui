import { componentDecorator } from '@wcag-ui/core';
import { DOM } from '@wcag-ui/dom';

import attributes from './textarea.attributes';
import events from './textarea.events';

export class Textarea extends HTMLInputElement {
  static name = 'wcag-textarea';
  static extends = 'textarea';
  static attributes = attributes;
  static events = events;

  static {
    componentDecorator('Textarea', Textarea);
  }

  constructor() {
    super();

    this.#initialize();
  }

  #initialize() {
    // <textarea name="NAME" aria-label="..."></textarea>

    // settings default type attribute to text, if missing
    !this.hasAttribute('type') && this.setAttribute('type', 'text');

    if (this.ariaLabel) {
      // wrapping the input with a <span field-wrapper></span>
      // in order to use the wrapper for additional actions and icons
      const fieldWrapper = DOM.wrapElement(this, { tag: 'span' });

      // wrapping the fieldWrapper with a label for having this final DOM result
      // <label>
      //   {{ariaLabel value}}
      //   <span field-wrapper>
      //     <textarea name="NAME"></textarea>
      //   </span>
      // </label>
      const label = DOM.wrapElement(fieldWrapper, { tag: 'label' });
      DOM.insertHTML(this.ariaLabel ?? 'aria-label N/A', label, 'prepend');

      // removing aria-label attribute from input because of label text
      this.removeAttribute('aria-label');
    }
  }
}

// import '@wcag-ui/textarea';
// <script src="cdn @wcag-ui/textarea"></script>

// before:
// <textarea is="wcag-textarea" aria-label="Description"></textarea>

// after:
// <label>
//   Description
//   <span field-wrapper>
//     <textarea is="wcag-textarea"></textarea>
//   </span>
// </label>
