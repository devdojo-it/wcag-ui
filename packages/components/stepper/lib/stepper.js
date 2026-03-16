import { componentDecorator, events as coreEvents, helpers } from '@wcag-ui/core';

import attributes from './stepper.attributes';
import events from './stepper.events';

/**
 * wcagUI Stepper class
 *
 * @export
 * @class Stepper
 * @extends {HTMLElement}
 */
export class Stepper extends HTMLElement {
  static extendsElement = 'section';
  static attributes = attributes;
  static events = events;

  static {
    componentDecorator(this);
  }

  #guid;

  constructor() {
    super();

    this.#init();
  }

  #init() {
    this.#guid = helpers.strings.guid();
    this.setAttribute('role', 'group');
    !this.hasAttribute('aria-label') && this.setAttribute('aria-label', 'Progress');
  }

  get activeStep() {
    const active = this.querySelector('[aria-current="step"]');
    if (!active) return -1;
    const steps = [...this.querySelectorAll(':scope > ol > li')];
    return steps.indexOf(active);
  }

  set activeStep(index) {
    const steps = [...this.querySelectorAll(':scope > ol > li')];
    for (const [i, step] of steps.entries()) {
      step.removeAttribute('aria-current');
      step.removeAttribute('complete');

      if (i < index) step.setAttribute('complete', '');
      if (i === index) step.setAttribute('aria-current', 'step');
    }

    coreEvents.dispatchComponentEvent.call(this, 'step-change', { step: index });
  }
}
