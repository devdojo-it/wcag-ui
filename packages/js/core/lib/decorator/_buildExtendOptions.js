export function buildExtendOptions(component) {
  return component.extendsElement ? { extends: component.extendsElement } : undefined;
}
