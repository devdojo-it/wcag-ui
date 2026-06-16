import { componentDecorator, events as coreEvents, helpers } from '@wcag-ui/core';
import { DOM } from '@wcag-ui/dom';

import attributes from './popover.attributes';
import events from './popover.events';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * wcagUI Popover class
 *
 * @export
 * @class Popover
 * @extends {HTMLElement}
 */
export class Popover extends HTMLElement {
  static extendsElement = 'section';
  static attributes = attributes;
  static events = events;

  #guid;
  #panel;
  #trigger;
  #toggleHandler;

  /**
   * static initialization
   *
   * @static
   * @memberof Popover
   */
  static {
    componentDecorator(this);
  }

  constructor() {
    super();
    this.#guid = helpers.strings.guid();
    this.#toggleHandler = this.#handleToggle.bind(this);

    this.#init();
  }

  get isOpen() {
    return this.#panel?.matches(':popover-open') ?? false;
  }

  get panel() {
    return this.#panel;
  }

  get trigger() {
    return this.#trigger;
  }

  get supportsPopover() {
    return typeof this.#panel?.showPopover === 'function';
  }

  #init() {
    this.update();
  }

  onConnected() {
    this.update();
  }

  onDisconnected() {
    this.#panel?.removeEventListener('toggle', this.#toggleHandler);
  }

  update() {
    this.#panel?.removeEventListener('toggle', this.#toggleHandler);
    this.#ensureStructure();
    this.#panel?.addEventListener('toggle', this.#toggleHandler);
  }

  show() {
    if (!this.#panel) {
      return;
    }

    if (this.supportsPopover) {
      this.#panel.showPopover();
      return;
    }

    this.#panel.hidden = false;
    this.#syncExpanded(true);
    this.#focusPanel();
    coreEvents.dispatchComponentEvent.call(this, 'open', { trigger: this.#trigger });
  }

  hide(returnFocus = true) {
    if (!this.#panel) {
      return;
    }

    if (this.supportsPopover) {
      this.#panel.hidePopover();
      return;
    }

    this.#panel.hidden = true;
    this.#syncExpanded(false);
    returnFocus && this.#trigger?.focus();
    coreEvents.dispatchComponentEvent.call(this, 'close', { trigger: this.#trigger });
  }

  toggle() {
    this.isOpen ? this.hide() : this.show();
  }

  #ensureStructure() {
    let trigger = this.querySelector(':scope > button[popover-trigger], :scope > button[trigger], :scope > button');

    if (!trigger) {
      trigger = DOM.createElement({
        tag: 'button',
        attributes: {
          type: 'button',
          'popover-trigger': '',
        },
        content: this.getAttribute('label') || 'Open',
      });

      DOM.insertElement(trigger, this, 'prepend');
    }

    let panel = this.querySelector(
      ':scope > section[popover-panel], :scope > div[popover-panel], :scope > section[panel], :scope > div[panel]'
    );

    if (!panel) {
      panel = DOM.createElement({
        tag: 'section',
        attributes: {
          'popover-panel': '',
        },
      });

      DOM.insertElement(panel, this, 'append');
    }

    if (!panel.textContent?.trim() && this.getAttribute('content')) {
      DOM.insertHTML(this.getAttribute('content'), panel, 'append', true);
    }

    this.#trigger = trigger;
    this.#panel = panel;

    const panelId = this.#panel.id || `${this.#guid}-panel`;
    const anchorName = `--wcag-popover-anchor-${this.#guid}`;
    const accessibleLabel =
      this.#panel.getAttribute('aria-label') ||
      this.getAttribute('aria-label') ||
      this.#trigger.textContent?.trim() ||
      'Popover';

    this.#trigger.setAttribute('popover-trigger', '');
    !this.#trigger.hasAttribute('type') && this.#trigger.setAttribute('type', 'button');
    this.#trigger.setAttribute('popovertarget', panelId);
    this.#trigger.setAttribute('popovertargetaction', 'toggle');
    this.#trigger.setAttribute('aria-haspopup', this.#panel.getAttribute('role') || 'dialog');
    this.#trigger.setAttribute('aria-controls', panelId);

    this.#panel.id = panelId;
    this.#panel.setAttribute('popover-panel', '');
    this.#panel.setAttribute('popover', 'auto');
    !this.#panel.hasAttribute('role') && this.#panel.setAttribute('role', 'dialog');
    !('showPopover' in HTMLElement.prototype) && this.#panel.setAttribute('hidden', '');
    !this.#panel.hasAttribute('aria-labelledby') &&
      !this.#panel.hasAttribute('aria-label') &&
      this.#panel.setAttribute('aria-label', accessibleLabel);

    if (!this.#panel.querySelector(FOCUSABLE_SELECTOR) && !this.#panel.hasAttribute('tabindex')) {
      this.#panel.setAttribute('tabindex', '-1');
    }

    this.#trigger.style.setProperty('anchor-name', anchorName);
    this.#panel.style.setProperty('position-anchor', anchorName);
    this.#syncExpanded(this.isOpen);
  }

  #syncExpanded(open) {
    this.#trigger?.setAttribute('aria-expanded', String(open));
  }

  #focusPanel() {
    const firstFocusable = this.#panel?.querySelector(FOCUSABLE_SELECTOR);
    (firstFocusable ?? this.#panel)?.focus?.();
  }

  #handleToggle(event) {
    const isOpen = event.newState === 'open';

    this.#syncExpanded(isOpen);

    if (isOpen) {
      queueMicrotask(() => {
        this.#focusPanel();
      });
      coreEvents.dispatchComponentEvent.call(this, 'open', { trigger: this.#trigger });
      return;
    }

    this.#trigger?.focus();
    coreEvents.dispatchComponentEvent.call(this, 'close', { trigger: this.#trigger });
  }
}
