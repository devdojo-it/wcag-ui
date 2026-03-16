import { componentDecorator } from '@wcag-ui/core';

/**
 * wcagUI TreeView class
 *
 * @export
 * @class TreeView
 * @extends {HTMLElement}
 */
export class TreeView extends HTMLElement {
  static extendsElement = 'section';
  static attributes = {};
  static events = {};

  /**
   * static initialization
   *
   * @static
   * @memberof TreeView
   */
  static {
    componentDecorator(this);
  }

  #boundClick = null;
  #boundKeydown = null;

  onConnected() {
    // Wrap bare text nodes in <span> so CSS row styles apply uniformly
    this.#normalizeItems();

    this.#boundClick = this.#handleClick.bind(this);
    this.#boundKeydown = this.#handleKeydown.bind(this);

    this.addEventListener('click', this.#boundClick);
    this.addEventListener('keydown', this.#boundKeydown);

    // Initialise hidden state on all groups
    for (const group of this.querySelectorAll('[role="group"]')) {
      const parent = group.closest('[role="treeitem"]');
      if (parent?.getAttribute('aria-expanded') !== 'true') {
        group.hidden = true;
      }
    }

    this.#updateTabindex();
  }

  onDisconnected() {
    this.removeEventListener('click', this.#boundClick);
    this.removeEventListener('keydown', this.#boundKeydown);
  }

  /**
   * Make sure every treeitem has a <span> as its first child for consistent
   * CSS row styling. If the first child is already a <span>, skip.
   */
  #normalizeItems() {
    for (const item of this.querySelectorAll('[role="treeitem"]')) {
      // Already normalised or has an <a> child
      if (item.firstElementChild?.tagName === 'SPAN' || item.firstElementChild?.tagName === 'A') {
        continue;
      }

      // Collect text / non-group child nodes
      const rowNodes = [];
      for (const node of [...item.childNodes]) {
        if (node.nodeType === Node.ELEMENT_NODE && node.getAttribute('role') === 'group') break;
        rowNodes.push(node);
      }

      if (rowNodes.length === 0) continue;

      const span = document.createElement('span');
      rowNodes[0].before(span);
      for (const node of rowNodes) span.appendChild(node);
    }
  }

  /** Toggle expand/collapse on click */
  #handleClick(event) {
    const item = event.target.closest('[role="treeitem"]');
    if (!item || item.getAttribute('aria-disabled') === 'true') return;
    if (!item.hasAttribute('aria-expanded')) return;

    this.#toggle(item);
  }

  /**
   * Keyboard navigation — ARIA TreeView pattern
   * https://www.w3.org/WAI/ARIA/apg/patterns/treeview/
   */
  #handleKeydown(event) {
    const item = event.target.closest('[role="treeitem"]');
    if (!item) return;

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        if (item.hasAttribute('aria-expanded')) {
          if (item.getAttribute('aria-expanded') === 'false') {
            this.#expand(item);
          } else {
            this.#visibleChildren(item)[0]?.focus();
          }
        }
        break;

      case 'ArrowLeft':
        event.preventDefault();
        if (item.getAttribute('aria-expanded') === 'true') {
          this.#collapse(item);
        } else {
          item.parentElement?.closest('[role="treeitem"]')?.focus();
        }
        break;

      case 'ArrowDown': {
        event.preventDefault();
        const all = this.#visibleItems();
        all[all.indexOf(item) + 1]?.focus();
        break;
      }

      case 'ArrowUp': {
        event.preventDefault();
        const all = this.#visibleItems();
        all[all.indexOf(item) - 1]?.focus();
        break;
      }

      case 'Home':
        event.preventDefault();
        this.#visibleItems()[0]?.focus();
        break;

      case 'End': {
        event.preventDefault();
        const items = this.#visibleItems();
        items[items.length - 1]?.focus();
        break;
      }

      case 'Enter':
      case ' ':
        event.preventDefault();
        if (item.hasAttribute('aria-expanded')) this.#toggle(item);
        break;
    }

    this.#updateTabindex(item);
  }

  #toggle(item) {
    item.getAttribute('aria-expanded') === 'true' ? this.#collapse(item) : this.#expand(item);
  }

  #expand(item) {
    item.setAttribute('aria-expanded', 'true');
    const group = item.querySelector('[role="group"]');
    if (group) group.hidden = false;
  }

  #collapse(item) {
    item.setAttribute('aria-expanded', 'false');
    const group = item.querySelector('[role="group"]');
    if (group) group.hidden = true;
  }

  #visibleItems() {
    return [...this.querySelectorAll('[role="treeitem"]')].filter((el) => {
      const group = el.parentElement?.closest('[role="group"]');
      return !group || !group.hidden;
    });
  }

  #visibleChildren(item) {
    const group = item.querySelector('[role="group"]');
    if (!group || group.hidden) return [];
    return [...group.querySelectorAll(':scope > [role="treeitem"]')];
  }

  #updateTabindex(focused = null) {
    for (const el of this.querySelectorAll('[role="treeitem"]')) {
      el.setAttribute('tabindex', '-1');
    }
    (focused ?? this.#visibleItems()[0])?.setAttribute('tabindex', '0');
  }
}

