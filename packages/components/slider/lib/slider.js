import { componentDecorator } from '@wcag-ui/core';
import { DOM } from '@wcag-ui/dom';

import attributes from './slider.attributes';
import events from './slider.events';

/**
 * wcagUI Slider class
 *
 * @export
 * @class Slider
 * @extends {HTMLInputElement}
 */
export class Slider extends HTMLInputElement {
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
    this.setAttribute('type', 'range');

    const fieldWrapper = DOM.wrapElement(this, { tag: 'span' });
    const label = DOM.wrapElement(fieldWrapper, { tag: 'label' });
    DOM.insertHTML(this.ariaLabel ?? 'aria-label N/A', label, 'prepend');

    this.removeAttribute('aria-label');

    this.#syncFill();
  }

  #syncFill() {
    const min = Number(this.min || 0);
    const max = Number(this.max || 100);
    const val = Number(this.value || 0);
    const pct = ((val - min) / (max - min)) * 100;
    this.style.setProperty('--wcag-slider--fill', `${pct}%`);
  }

  onConnected() {
    this.addEventListener('input', this.#onInput);
  }

  onDisconnected() {
    this.removeEventListener('input', this.#onInput);
  }

  #onInput = () => {
    this.#syncFill();
  };
}
