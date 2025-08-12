import { buildExtendOptions } from './_buildExtendOptions';

/**
 * Defines the component as a Custom Element if not already registered.
 *
 * - Skips definition if `customElements` is not available.
 * - Skips if the tag is already defined.
 * - Uses `extends` option when `component.extendsElement` is provided.
 *
 * @param {CustomElementConstructor & { extendsElement?: string }} component - Component class.
 * @param {string} isAttribute - Custom element tag to register (e.g., "wcag-tree-view").
 * @returns {void}
 */
export function defineCustomElement(component, isAttribute) {
  !!customElements &&
    !customElements.get(isAttribute) &&
    customElements.define(isAttribute, component, buildExtendOptions(component));
}
