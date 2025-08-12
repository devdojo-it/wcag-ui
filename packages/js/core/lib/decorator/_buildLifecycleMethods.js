import { strings } from '../helpers/_strings';

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
