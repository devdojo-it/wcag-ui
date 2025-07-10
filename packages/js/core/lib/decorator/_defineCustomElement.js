import { buildExtendOptions } from './_buildExtendOptions';

export function defineCustomElement(component) {
  !!customElements &&
    !customElements.get(component.componentName) &&
    customElements.define(component.componentName, component, buildExtendOptions(component));
}
