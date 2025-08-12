import { applyMixins } from "./_applyMixins";
import { defineCustomElement } from "./_defineCustomElement";
import { exposeComponent } from "./_exposeComponent";
import { generateIsAttribute } from './_generateIsAttribute';

/**
 * Registers a component into the Custom Elements registry and wires runtime helpers.
 *
 * Responsibilities:
 * - Derive the `is` attribute/name (e.g., "wcag-tree-view") if not provided via `component.isAttribute`.
 * - Define the custom element via `customElements.define` (with `extends` support).
 * - Apply mixins: lifecycle methods, attribute/event handlers, observed attributes.
 * - Expose the component on the global `wcagUI` namespace for programmatic usage.
 *
 * Assumptions:
 * - `component.name` is a proper PascalCase class name (e.g., `TreeView`).
 * - `component.events` and `component.attributes` are optional dictionaries.
 *
 * @param {CustomElementConstructor & {
 *   name: string,
 *   events?: Record<string, (this: HTMLElement, e: Event) => void>,
 *   attributes?: Record<string, (this: HTMLElement, oldValue: string|null, newValue: string|null) => void>,
 *   extendsElement?: string,
 *   isAttribute?: string
 * }} component - The component class to decorate and register.
 * @returns {void}
 *
 * @example
 * class Button extends HTMLElement { /* ... *\/ }
 * componentDecorator(Button);
 */
export function componentDecorator(component) {
  const isAttribute = component.isAttribute ?? generateIsAttribute(component.name);

  defineCustomElement(component, isAttribute);
  applyMixins(component, isAttribute);
  exposeComponent(component);
}
