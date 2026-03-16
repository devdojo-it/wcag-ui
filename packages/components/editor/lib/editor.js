import { componentDecorator, events as coreEvents, helpers } from '@wcag-ui/core';
import { DOM } from '@wcag-ui/dom';

import attributes from './editor.attributes';
import events from './editor.events';

const DEFAULT_ACTIONS = [
  { command: 'bold', label: 'Bold', icon: 'B' },
  { command: 'italic', label: 'Italic', icon: 'I' },
  { command: 'underline', label: 'Underline', icon: 'U' },
  { command: 'strikeThrough', label: 'Strikethrough', icon: 'S' },
  { separator: true },
  { command: 'insertUnorderedList', label: 'Bullet list', icon: '\u2022' },
  { command: 'insertOrderedList', label: 'Numbered list', icon: '1.' },
  { separator: true },
  { command: 'removeFormat', label: 'Clear formatting', icon: '\u2718' },
];

/**
 * wcagUI Editor class
 *
 * @export
 * @class Editor
 * @extends {HTMLElement}
 */
export class Editor extends HTMLElement {
  static extendsElement = 'section';
  static attributes = attributes;
  static events = events;

  static {
    componentDecorator(this);
  }

  #guid;

  get #editable() {
    return this.querySelector(':scope > .wcag-editor__content');
  }

  get value() {
    return this.#editable?.innerHTML ?? '';
  }

  set value(html) {
    const el = this.#editable;
    if (el) el.innerHTML = html;
  }

  constructor() {
    super();
    this.#init();
  }

  #init() {
    this.#guid = helpers.strings.guid();
    this.setAttribute('role', 'group');
    !this.hasAttribute('aria-label') && this.setAttribute('aria-label', 'Rich text editor');

    this.#buildToolbar();
    this.#buildEditable();
  }

  #buildToolbar() {
    const toolbar = DOM.createElement('div', {
      class: 'wcag-editor__toolbar',
      role: 'toolbar',
      'aria-label': 'Formatting options',
    });

    for (const action of DEFAULT_ACTIONS) {
      if (action.separator) {
        const sep = DOM.createElement('span', {
          class: 'wcag-editor__separator',
          role: 'separator',
          'aria-orientation': 'vertical',
        });
        toolbar.appendChild(sep);
        continue;
      }

      const btn = DOM.createElement('button', {
        type: 'button',
        class: 'wcag-editor__action',
        'aria-label': action.label,
        'data-command': action.command,
        tabindex: '-1',
      });
      btn.textContent = action.icon;
      toolbar.appendChild(btn);
    }

    // Make first toolbar button tabbable
    const first = toolbar.querySelector('button');
    if (first) first.setAttribute('tabindex', '0');

    this.prepend(toolbar);
  }

  #buildEditable() {
    // If user already provided a content area, enhance it
    let content = this.querySelector(':scope > .wcag-editor__content');
    if (!content) {
      content = DOM.createElement('div', {
        class: 'wcag-editor__content',
      });
      this.appendChild(content);
    }

    content.setAttribute('contenteditable', 'true');
    content.setAttribute('role', 'textbox');
    content.setAttribute('aria-multiline', 'true');
    !content.hasAttribute('aria-label') && content.setAttribute('aria-label', 'Editor content');
    content.id = content.id || `${this.#guid}-content`;
  }

  exec(command, value = null) {
    this.#editable?.focus();
    document.execCommand(command, false, value);
    coreEvents.dispatchComponentEvent.call(this, 'input', { command });
  }
}
