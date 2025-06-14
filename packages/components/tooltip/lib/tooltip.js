import { componentDecorator, helpers } from '@wcag-ui/core';
import { DOM } from '@wcag-ui/dom';

const { guid } = helpers.strings;
const { isNativelyFocusable, getReferencedElement } = DOM;

/** @type {(tooltip: Tooltip) => void} */
let setupTooltipReference;

const attributes = {
  /**
   * @this {Tooltip}
   */
  id() {
    setupTooltipReference(this);
  },
};

const events = {};

export class Tooltip extends HTMLElement {
  static name = 'wcag-tooltip';
  static extends = 'div';
  static attributes = attributes;
  static events = events;

  static {
    componentDecorator('Tooltip', Tooltip);
    setupTooltipReference = tooltip => tooltip.#setupReference(tooltip.reference);
  }

  /** @type {HTMLElement | SVGElement | MathMLElement | null} */
  #oldReference = null;


  constructor() {
    super();
    this.id ||= `tooltip-${guid()}`;
    this.popover ??= 'auto';
    this.role = 'tooltip';
  }

  get reference() {
    return getReferencedElement(this, this.id, 'aria-describedby', 'aria-details', 'aria-labelledby');
  }

  onConnected() {
    this.#setupReference(this.reference);
  }
  
  onDisconnected() {
    this.#setupReference(null);
  }

  show = this.showPopover;
  
  hide = this.hidePopover;
  
  toggle = this.togglePopover;

  get open() {
    return this.matches(':popover-open');
  }

  /** @param {HTMLElement | SVGElement | MathMLElement | null} reference */
  #setupReference(reference) {
    if (this.#oldReference) {
      if (!isNativelyFocusable(this.#oldReference) && this.#oldReference.tabIndex === 0) {
        this.#oldReference.removeAttribute('tabindex');
      }
      this.#oldReference.removeEventListener('pointerenter', this.#handleReferenceEnter);
      this.#oldReference.removeEventListener('pointerleave', this.#handleReferenceLeave);
      this.#oldReference.removeEventListener('focus', this.#handleReferenceFocus);
      this.#oldReference.removeEventListener('blur', this.#handleReferenceBlur);
    }
    this.#oldReference = reference;
    
    if (!reference) return;
    if (!isNativelyFocusable(reference) && isNaN(parseInt(reference.getAttribute('tabindex') ?? ''))) {
      reference.setAttribute('tabindex', '0');
    }
    reference.addEventListener('pointerenter', this.#handleReferenceEnter);
    reference.addEventListener('pointerleave', this.#handleReferenceLeave);
    reference.addEventListener('focus', this.#handleReferenceFocus);
    reference.addEventListener('blur', this.#handleReferenceBlur);
  };

  #handleReferenceEnter = this.show.bind(this);
  
  #handleReferenceLeave = /** @this {Tooltip} @param {PointerEvent} event */ function({ target }) {
    if (!/** @type {HTMLElement} */(target).matches(':focus-visible')) this.hide(); 
  }.bind(this);

  #handleReferenceFocus = /** @this {Tooltip} @param {PointerEvent} event */ function({ target }) {
    if (/** @type {HTMLElement} */(target).matches(':focus-visible')) this.show(); 
  }.bind(this);
  
  #handleReferenceBlur = /** @this {Tooltip} */ function() {
    if (this.open) this.hide(); 
  }.bind(this);
}
