import { componentDecorator } from '@wcag-ui/core';

import attributes from './progress-bar.attributes';
import events from './progress-bar.events';

/**
 * wcagUI ProgressBar class
 *
 * @export
 * @class ProgressBar
 * @extends {HTMLElement}
 */
export class ProgressBar extends HTMLElement {
  static extendsElement = 'section';
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
    this.setAttribute('role', 'progressbar');
    this.setAttribute('aria-valuemin', this.getAttribute('aria-valuemin') ?? '0');
    this.setAttribute('aria-valuemax', this.getAttribute('aria-valuemax') ?? '100');

    const value = this.getAttribute('value') ?? '0';
    this.setAttribute('aria-valuenow', value);
    this.style.setProperty('--wcag-progress-bar--value', `${value}%`);
  }

  get value() {
    return Number(this.getAttribute('aria-valuenow') ?? 0);
  }

  set value(v) {
    const clamped = Math.max(0, Math.min(100, Number(v)));
    this.setAttribute('aria-valuenow', String(clamped));
    this.style.setProperty('--wcag-progress-bar--value', `${clamped}%`);
  }
}
