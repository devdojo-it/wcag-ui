import { componentDecorator } from '@wcag-ui/core';
import { DOM } from '@wcag-ui/dom';

import attributes from './input.attributes';
import events from './input.events';

export class Input extends HTMLInputElement {
  static isAttribute = 'wcag-input';
  static extendsElement = 'input';
  static attributes = attributes;
  static events = events;

  static {
    // biome-ignore lint/complexity/noThisInStatic: <"this" is needed to keep names with esbuild>
    componentDecorator(this);
  }

  constructor() {
    super();

    this.#init();
  }

  #init() {
    // <input is="wcag-input" name="NAME" type="TYPE" aria-label="..." />

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
      //     <input name="NAME" type="TYPE" />
      //   </span>
      // </label>
      const label = DOM.wrapElement(fieldWrapper, { tag: 'label' });
      DOM.insertHTML(this.ariaLabel ?? 'aria-label N/A', label, 'prepend');

      // removing aria-label attribute from input because of label text
      this.removeAttribute('aria-label');
    }
  }
}

// import '@wcag-ui/input';
// <script src="cdn @wcag-ui/input"></script>

// before:
// <input is="wcag-input" type="text" aria-label="Username" />

// after:
// <label>
//   Username
//   <span field-wrapper>
//     <input is="wcag-input" type="text" />
//   </span>
// </label>
