import { buildAttributeHandlers, buildEventHandlers } from './_buildHandlers';
import { buildLifecycleMethods } from './_buildLifecycleMethods';

/**
 * Augments the component prototype with generated handlers and lifecycle methods.
 *
 * What is added to the prototype:
 * - `componentName`: the resolved custom element tag (e.g., "wcag-tree-view").
 * - Attribute handler methods derived from `component.attributes` (e.g., `handleOpenAttributeChanged`).
 * - Event handler methods derived from `component.events` (e.g., `handleClickEvent`).
 * - Standard lifecycle helpers from `buildLifecycleMethods` (`connectedCallback`, `disconnectedCallback`, etc.).
 *
 * Side effects on the constructor:
 * - Sets `observedAttributes` to the keys of `component.attributes` when provided.
 *
 * This function is safe to call once per component class during decoration/registration.
 *
 * @param {CustomElementConstructor & {
 *   attributes?: Record<string, Function>,
 *   events?: Record<string, Function>
 * }} component - Target component class (constructor function).
 * @param {string} isAttribute - The final custom element tag (e.g., "wcag-tree-view").
 * @returns {void}
 */
export function applyMixins(component, isAttribute) {
  Object.assign(
    component.prototype,
    { componentName: isAttribute },
    component.attributes && { ...buildAttributeHandlers(component.attributes) },
    component.events && { ...buildEventHandlers(component.events) },
    buildLifecycleMethods(component),
  );

  // When attribute handlers map is provided, expose observed attributes to the platform
  component.attributes && (component.observedAttributes = Object.keys(component.attributes));
}
