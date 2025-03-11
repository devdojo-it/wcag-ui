import { buildExtendOptions } from "./_buildExtendOptions";

export function defineCustomElement(component) {
  !!customElements &&
    !customElements.get(component.name) &&
    customElements.define(component.name, component, buildExtendOptions(component));
}
