import { buildExtendOptions } from './_buildExtendOptions';

export function defineCustomElement(component, isAttribute) {
  !!customElements &&
    !customElements.get(isAttribute) &&
    customElements.define(isAttribute, component, buildExtendOptions(component));
}
