import { componentDecorator, helpers } from '@wcag-ui/core';
import { DOM } from '@wcag-ui/dom';

import attributes from './tooltip.attributes';
import events from './tooltip.events';

export class Tooltip extends HTMLElement {
  static extendsElement = 'span';
  static attributes = attributes;
  static events = events;

  #guid;
  #panel;
  #panelMouseEnterHandler;
  #panelMouseLeaveHandler;

  static {
    componentDecorator(this);
  }

  constructor() {
    super();
    this.#guid = helpers.strings.guid();
    this.#panelMouseEnterHandler = this.#handlePanelMouseEnter.bind(this);
    this.#panelMouseLeaveHandler = this.#handlePanelMouseLeave.bind(this);

    this.#init();
  }

  get isOpen() {
    return this.#panel?.matches(':popover-open') ?? false;
  }

  get panel() {
    return this.#panel;
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
    this.#detachPanelListeners();
  }

  update() {
    this.#detachPanelListeners();
    this.#ensurePanel();
    this.#attachPanelListeners();
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
  }

  hide() {
    if (!this.#panel) {
      return;
    }

    if (this.supportsPopover) {
      this.#panel.hidePopover();
      return;
    }

    this.#panel.hidden = true;
  }

  #ensurePanel() {
    const hostId = this.id || `${this.#guid}-trigger`;
    const content = this.getAttribute('content') || this.getAttribute('tooltip') || '';
    let panel =
      this.nextElementSibling?.matches?.('span[tooltip-panel]') &&
      this.nextElementSibling.getAttribute('tooltip-owner') === hostId
        ? this.nextElementSibling
        : document.querySelector(`span[tooltip-panel][tooltip-owner="${hostId}"]`);

    if (!panel && !content) {
      this.#panel = null;
      return;
    }

    if (!panel) {
      panel = document.createElement('span');
      panel.setAttribute('tooltip-panel', '');
      DOM.insertElement(panel, this, 'after');
    }

    this.id = hostId;
    this.#panel = panel;

    const panelId = this.#panel.id || `${this.#guid}-panel`;
    const anchorName = `--wcag-tooltip-anchor-${this.#guid}`;

    this.#panel.id = panelId;
    this.#panel.setAttribute('tooltip-panel', '');
    this.#panel.setAttribute('tooltip-owner', hostId);
    this.#panel.setAttribute('role', 'tooltip');
    this.#panel.setAttribute('popover', 'hint');
    content && (this.#panel.textContent = content);
    !('showPopover' in HTMLElement.prototype) && this.#panel.setAttribute('hidden', '');

    if (!this.hasAttribute('tabindex') && !this.matches('a, button, input, select, textarea')) {
      this.setAttribute('tabindex', '0');
    }

    this.setAttribute('aria-describedby', panelId);
    this.style.setProperty('anchor-name', anchorName);
    this.#panel.style.setProperty('position-anchor', anchorName);
  }

  #attachPanelListeners() {
    this.#panel?.addEventListener('mouseenter', this.#panelMouseEnterHandler);
    this.#panel?.addEventListener('mouseleave', this.#panelMouseLeaveHandler);
  }

  #detachPanelListeners() {
    this.#panel?.removeEventListener('mouseenter', this.#panelMouseEnterHandler);
    this.#panel?.removeEventListener('mouseleave', this.#panelMouseLeaveHandler);
  }

  #handlePanelMouseEnter() {
    this.show();
  }

  #handlePanelMouseLeave(event) {
    if (event.relatedTarget === this || this.contains(event.relatedTarget)) {
      return;
    }

    this.hide();
  }
}
