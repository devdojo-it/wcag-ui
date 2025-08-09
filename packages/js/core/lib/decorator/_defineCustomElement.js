import { buildExtendOptions } from './_buildExtendOptions';

export function defineCustomElement(component) {
  !!customElements &&
    !customElements.get(component.isAttribute) &&
    customElements.define(component.isAttribute, component, buildExtendOptions(component));
}
