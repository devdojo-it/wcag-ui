import { applyMixins } from "./_applyMixins";
import { defineCustomElement } from "./_defineCustomElement";
import { exposeComponent } from "./_exposeComponent";
import { generateIsAttribute } from './_generateIsAttribute';

export function componentDecorator(component) {
  const isAttribute = component.isAttribute ?? generateIsAttribute(component.name);

  defineCustomElement(component, isAttribute);
  applyMixins(component, isAttribute);
  exposeComponent(component);
}
