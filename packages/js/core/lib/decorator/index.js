import { applyMixins } from "./_applyMixins";
import { assertMetaKey } from "./_assertMetaKey";
import { defineCustomElement } from "./_defineCustomElement";
import { exposeComponent } from "./_exposeComponent";

export function componentDecorator(componentName, component) {
  assertMetaKey(component, "name");
  defineCustomElement(component);
  applyMixins(component);
  exposeComponent(componentName, component);
}
