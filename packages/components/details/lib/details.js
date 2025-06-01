import { componentDecorator, helpers } from '@wcag-ui/core';
import { DOM } from '@wcag-ui/dom';

import attributes from './details.attributes';
import events from './details.events';

/**
 * wcagUI Details class
 *
 * @export
 * @class Details
 * @extends {HTMLDetailsElement}
 */
export class Details extends HTMLDetailsElement {
  static name = 'wcag-details';
  static extends = 'details';
  static attributes = attributes;
  static events = events;

  /**
   * static initialization
   *
   * @static
   * @memberof Details
   */
  static {
    componentDecorator('Details', Details);
  }

  #guid;
  #summary;
  #content;

  constructor() {
    super();

    this.#initialize();
  }

  #initialize() {
    this.#guid = helpers.strings.guid();

    this.setAttribute('aria-expanded', `${this.open.toString()}`);

    this.#summary = this.querySelector('summary');

    !this.#summary.hasAttribute('id') && this.#summary.setAttribute('id', this.#guid);

    !this.#summary.hasAttribute('aria-controls') &&
      this.#summary.setAttribute('aria-controls', `${this.#guid}-content`);

    DOM.insertElement({ tag: 'i', classes: ['wcag-icon-chevron-down'] }, this.#summary, 'append');

    // DOM.wrapElement(
    //   Icon.build({
    //     ...(!!this.iconFont && !!this.iconClass
    //       ? { customFont: this.iconFont, customClass: this.iconClass }
    //       : { name: this.iconName }),
    //     dimension: EMonkUIDimensions[this.dimension!]
    //   }),
    //   this.#summary
    // );

    const contentElementsFragment = DOM.createFragment(...DOM.getNextSiblings(this.#summary));

    this.#content =
      this.querySelector(':scope > section:only-of-type') ??
      DOM.createElement({
        tag: 'section',
      });

    !this.#content.hasAttribute('content') && this.#content.setAttribute('content', '');
    !this.#content.hasAttribute('id') && this.#content.setAttribute('id', `${this.#guid}-content`);
    // !this.#content.hasAttribute("aria-labelledby") && this.#content.setAttribute("aria-labelledby", this.#guid);
    // !this.#content.hasAttribute("role") && this.#content.setAttribute("role", "region");

    DOM.insertElement(this.#content, this.#summary, 'after');
    this.#content.append(contentElementsFragment);
    // DOM.insertElement(contentElementsFragment, this.#content, "append"); // TODO: fix support for DocumentFragment in insertAdjacentElement
  }

  expand() {
    this.open = true;
  }

  collapse() {
    this.open = false;
  }
}
