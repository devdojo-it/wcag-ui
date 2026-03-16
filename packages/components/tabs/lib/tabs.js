import { componentDecorator, events as coreEvents, helpers } from '@wcag-ui/core';

import attributes from './tabs.attributes';
import events from './tabs.events';

/**
 * wcagUI Tabs class
 *
 * @export
 * @class Tabs
 * @extends {HTMLElement}
 */
export class Tabs extends HTMLElement {
  static extendsElement = 'section';
  static attributes = attributes;
  static events = events;

  static {
    componentDecorator(this);
  }

  #guid;

  get #tablist() {
    return this.querySelector(':scope > [role="tablist"]');
  }

  get #tabs() {
    return [...(this.#tablist?.querySelectorAll('[role="tab"]') ?? [])];
  }

  get #panels() {
    return [...this.querySelectorAll(':scope > [role="tabpanel"]')];
  }

  get activeTab() {
    return this.#tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true');
  }

  set activeTab(index) {
    this.#activate(index);
  }

  constructor() {
    super();
    this.#init();
  }

  #init() {
    this.#guid = helpers.strings.guid();
    this.#wireAria();

    const active = this.#tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true');
    this.#activate(active === -1 ? 0 : active, false);
  }

  #wireAria() {
    const tabs = this.#tabs;
    const panels = this.#panels;

    for (const [i, tab] of tabs.entries()) {
      const tabId = tab.id || `${this.#guid}-tab-${i}`;
      const panelId = panels[i]?.id || `${this.#guid}-panel-${i}`;

      tab.id = tabId;
      tab.setAttribute('aria-controls', panelId);
      tab.setAttribute('tabindex', tab.getAttribute('aria-selected') === 'true' ? '0' : '-1');

      if (panels[i]) {
        panels[i].id = panelId;
        panels[i].setAttribute('aria-labelledby', tabId);
      }
    }
  }

  #activate(index, emit = true) {
    const tabs = this.#tabs;
    const panels = this.#panels;
    if (index < 0 || index >= tabs.length) return;

    for (const [i, tab] of tabs.entries()) {
      const selected = i === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.setAttribute('tabindex', selected ? '0' : '-1');

      if (panels[i]) {
        panels[i].hidden = !selected;
      }
    }

    if (emit) {
      coreEvents.dispatchComponentEvent.call(this, 'tab-change', { index });
    }
  }
}
