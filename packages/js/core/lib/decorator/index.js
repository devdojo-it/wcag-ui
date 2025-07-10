import { applyMixins } from "./_applyMixins";
import { assertMetaKey } from "./_assertMetaKey";
import { defineCustomElement } from "./_defineCustomElement";
import { exposeComponent } from "./_exposeComponent";

export function componentDecorator(className, component) {
  assertMetaKey(component, "componentName");
  defineCustomElement(component);
  applyMixins(component);
  exposeComponent(className, component);
}
