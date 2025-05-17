import { buildExtendOptions } from "./_buildExtendOptions";

export function defineCustomElement(componentIdentifier) {
  !!customElements &&
    !customElements.get(componentIdentifier.name) &&
    customElements.define(componentIdentifier.name, componentIdentifier, buildExtendOptions(componentIdentifier));
}
