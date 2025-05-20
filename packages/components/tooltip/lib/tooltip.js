import './styles/tooltip.css';

import { componentDecorator, error } from '@wcag-ui/core';
import { DOM } from '@wcag-ui/dom';

import attributes from './tooltip.attributes';
import events from './tooltip.events';

export class Tooltip extends HTMLElement {
  static name = 'wcag-tooltip';
  static extends = 'span';
  static attributes = attributes;
  static events = events;

  static {
    componentDecorator('Tooltip', Tooltip);
  }

  constructor() {
    super();

    this.#initialize();
  }

  #initialize() {}
}
