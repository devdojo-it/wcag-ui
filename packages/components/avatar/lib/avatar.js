import { componentDecorator } from '@wcag-ui/core';
import { DOM } from '@wcag-ui/dom';

import attributes from './avatar.attributes';
import events from './avatar.events';

/**
 * wcagUI Avatar class
 *
 * @export
 * @class Avatar
 * @extends {HTMLElement}
 */
export class Avatar extends HTMLElement {
  static extendsElement = 'span';
  static attributes = attributes;
  static events = events;

  /**
   * static initialization
   *
   * @static
   * @memberof Avatar
   */
  static {
    componentDecorator(this);
  }

  constructor() {
    super();

    this.#init();
  }

  #init() {
    this.update();
  }

  onConnected() {
    this.update();
  }

  update() {
    const source = this.getAttribute('src');
    const accessibleLabel = this.#accessibleLabel;
    const fallbackText = this.#fallbackText;
    let image = this.querySelector(':scope > img[avatar-image]');
    let fallback = this.querySelector(':scope > span[avatar-fallback]');

    if (source) {
      fallback?.remove();

      if (!image) {
        image = DOM.createElement({
          tag: 'img',
          attributes: {
            'avatar-image': '',
            alt: '',
            'aria-hidden': 'true',
          },
        });

        DOM.insertElement(image, this, 'append');
      }

      image.setAttribute('src', source);
    } else {
      image?.remove();

      if (!fallback) {
        fallback = DOM.createElement({
          tag: 'span',
          attributes: {
            'avatar-fallback': '',
          },
        });

        this.textContent = '';
        DOM.insertElement(fallback, this, 'append');
      }

      fallback.textContent = fallbackText;
    }

    if (accessibleLabel) {
      this.setAttribute('role', 'img');
      this.setAttribute('aria-label', accessibleLabel);
      this.removeAttribute('aria-hidden');
      return;
    }

    this.removeAttribute('role');
    this.removeAttribute('aria-label');
    this.setAttribute('aria-hidden', 'true');
  }

  get #accessibleLabel() {
    return (
      this.getAttribute('alt') ||
      this.getAttribute('aria-label') ||
      this.getAttribute('name') ||
      this.getAttribute('initials') ||
      ''
    );
  }

  get #fallbackText() {
    const explicitInitials = this.getAttribute('initials');
    const sourceText =
      explicitInitials ||
      this.getAttribute('name') ||
      this.getAttribute('aria-label') ||
      this.textContent ||
      '?';

    return this.#toInitials(sourceText);
  }

  #toInitials(value) {
    return value
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((chunk) => chunk[0])
      .join('')
      .toUpperCase();
  }
}
