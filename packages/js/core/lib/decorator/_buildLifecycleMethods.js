import { strings } from '../helpers/_strings';

/**
 * Builds lifecycle methods and event dispatching helpers for a component instance.
 *
 * Generated methods on the instance:
 * - handleEvent(e): calls `handle${PascalCase(e.type)}Event` if present.
 * - attributeChangedCallback(name, oldValue, newValue): calls `handle${PascalCase(name)}AttributeChanged` and `onAttributeChanged` if present.
 * - connectedCallback(): adds listeners for each key in `component.events` and calls `onConnected` if present.
 * - disconnectedCallback(): removes listeners for each key in `component.events` and calls `onDisconnected` if present.
 *
 * Note: This function assumes `component.events` is an object map when present.
 *
 * @param {{ events?: Record<string, Function> }} component - Component static metadata.
 * @returns {{
 *   handleEvent(e: Event): void,
 *   attributeChangedCallback(name: string, oldValue: string|null, newValue: string|null): void,
 *   connectedCallback(): void,
 *   disconnectedCallback(): void
 * }} An object to be mixed into the component prototype.
 */
export function buildLifecycleMethods(component) {
  return {
    handleEvent(e) {
      this[`handle${strings.toPascalCase(e.type)}Event`]?.(e);
    },
    attributeChangedCallback(name, oldValue, newValue) {
      this[`handle${strings.toPascalCase(name)}AttributeChanged`]?.(oldValue, newValue);

      this.onAttributeChanged?.(name, oldValue, newValue);
    },
    connectedCallback() {
      for (const event of Object.keys(component.events)) {
        this.addEventListener(event, this);
      }

      this.onConnected?.();
    },
    disconnectedCallback() {
      for (const event of Object.keys(component.events)) {
        this.removeEventListener(event, this);
      }

      this.onDisconnected?.();
    },
  };
}
