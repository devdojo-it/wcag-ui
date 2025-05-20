import './styles/select.css';

import { componentDecorator, error } from '@wcag-ui/core';
import { DOM } from '@wcag-ui/dom';

import attributes from './select.attributes';
import events from './select.events';

export class Select extends HTMLElement {
  static name = 'wcag-select';
  static extends = 'span';
  static attributes = attributes;
  static events = events;

  static {
    componentDecorator('Select', Select);
  }

  constructor() {
    super();

    this.#initialize();
  }

  #initialize() {}
}
