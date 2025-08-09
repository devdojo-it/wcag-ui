import { applyMixins } from "./_applyMixins";
import { assertMetaKey } from "./_assertMetaKey";
import { defineCustomElement } from "./_defineCustomElement";
import { exposeComponent } from "./_exposeComponent";

export function componentDecorator(component) {
  assertMetaKey(component, "isAttribute");
  defineCustomElement(component);
  applyMixins(component);
  exposeComponent(component);
}
