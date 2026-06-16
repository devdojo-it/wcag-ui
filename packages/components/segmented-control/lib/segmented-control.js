import { componentDecorator, events as coreEvents } from '@wcag-ui/core';
import { DOM } from '@wcag-ui/dom';

import attributes from './segmented-control.attributes';
import events from './segmented-control.events';

/**
 * wcagUI SegmentedControl class
 *
 * @export
 * @class SegmentedControl
 * @extends {HTMLElement}
 */
export class SegmentedControl extends HTMLElement {
  static extendsElement = 'section';
  static attributes = attributes;
  static events = events;

  /**
   * static initialization
   *
   * @static
   * @memberof SegmentedControl
   */
  static {
    componentDecorator(this);
  }

  constructor() {
    super();

    this.#init();
  }

  get value() {
    return this.getAttribute('value') || '';
  }

  #init() {
    this.update();
  }

  onConnected() {
    this.update();
  }

  update() {
    this.setAttribute('role', 'radiogroup');
    !this.hasAttribute('aria-label') && this.setAttribute('aria-label', 'Segmented control');

    let buttons = [...this.querySelectorAll(':scope > button')];

    if (buttons.length === 0) {
      const labels = (this.getAttribute('options') || 'First,Second')
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean);

      this.textContent = '';

      for (const label of labels) {
        const button = DOM.createElement({
          tag: 'button',
          attributes: {
            type: 'button',
            value: label.toLowerCase(),
          },
          content: label,
        });

        DOM.insertElement(button, this, 'append');
      }

      buttons = [...this.querySelectorAll(':scope > button')];
    }

    const currentValue = this.value || buttons[0]?.getAttribute('value') || buttons[0]?.textContent?.trim() || '';
    !this.value && currentValue && this.setAttribute('value', currentValue);

    for (const [index, button] of buttons.entries()) {
      const optionValue = button.getAttribute('value') || button.textContent.trim();
      const checked = optionValue === currentValue;

      button.setAttribute('segment', '');
      button.setAttribute('type', 'button');
      button.setAttribute('role', 'radio');
      button.setAttribute('aria-checked', String(checked));
      button.setAttribute('tabindex', checked ? '0' : '-1');

      checked ? button.setAttribute('selected', '') : button.removeAttribute('selected');

      if (!button.getAttribute('value')) {
        button.setAttribute('value', optionValue);
      }

      if (!checked && index === 0 && !buttons.some((item) => item.hasAttribute('selected'))) {
        button.setAttribute('tabindex', '0');
      }
    }
  }

  selectValue(nextValue, emit = true) {
    this.setAttribute('value', nextValue);
    emit && coreEvents.dispatchComponentEvent.call(this, 'change', { value: nextValue });
  }

  focusOption(index) {
    this.querySelectorAll(':scope > button[segment]')[index]?.focus();
  }
}
