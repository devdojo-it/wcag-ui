import { componentDecorator, events as coreEvents } from '@wcag-ui/core';
import { DOM } from '@wcag-ui/dom';

import attributes from './rating.attributes';
import events from './rating.events';

/**
 * wcagUI Rating class
 *
 * @export
 * @class Rating
 * @extends {HTMLElement}
 */
export class Rating extends HTMLElement {
  static extendsElement = 'section';
  static attributes = attributes;
  static events = events;

  /**
   * static initialization
   *
   * @static
   * @memberof Rating
   */
  static {
    componentDecorator(this);
  }

  constructor() {
    super();

    this.#init();
  }

  get max() {
    return Math.max(1, Number.parseInt(this.getAttribute('max') || '5', 10) || 5);
  }

  get value() {
    return Math.min(this.max, Math.max(0, Number.parseInt(this.getAttribute('value') || '0', 10) || 0));
  }

  get isReadonly() {
    return this.hasAttribute('readonly') || this.getAttribute('aria-disabled') === 'true';
  }

  #init() {
    this.update();
  }

  onConnected() {
    this.update();
  }

  update() {
    this.setAttribute('role', 'radiogroup');
    !this.hasAttribute('aria-label') && this.setAttribute('aria-label', 'Rating');
    this.setAttribute('aria-readonly', String(this.isReadonly));

    const max = this.max;
    let buttons = [...this.querySelectorAll(':scope > button[rating-option]')];

    if (buttons.length !== max) {
      this.textContent = '';

      for (let index = 1; index <= max; index++) {
        const button = DOM.createElement({
          tag: 'button',
          attributes: {
            type: 'button',
            'rating-option': '',
            'data-value': `${index}`,
          },
          content: '&#9733;',
        });

        DOM.insertElement(button, this, 'append');
      }

      buttons = [...this.querySelectorAll(':scope > button[rating-option]')];
    }

    for (const [index, button] of buttons.entries()) {
      const optionValue = index + 1;
      const checked = optionValue === this.value;
      const focusable = this.value === 0 ? index === 0 : checked;

      button.setAttribute('role', 'radio');
      button.setAttribute('aria-label', `${optionValue} of ${max}`);
      button.setAttribute('aria-checked', String(checked));
      button.setAttribute('tabindex', this.isReadonly ? '-1' : focusable ? '0' : '-1');

      optionValue <= this.value ? button.setAttribute('filled', '') : button.removeAttribute('filled');
      checked ? button.setAttribute('current', '') : button.removeAttribute('current');
    }
  }

  selectValue(nextValue, emit = true) {
    const normalized = Math.min(this.max, Math.max(0, Number(nextValue) || 0));

    this.setAttribute('value', `${normalized}`);
    emit && coreEvents.dispatchComponentEvent.call(this, 'change', { value: normalized });
  }

  focusOption(index) {
    this.querySelectorAll(':scope > button[rating-option]')[index]?.focus();
  }
}
