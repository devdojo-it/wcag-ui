export function buildExtendOptions(component) {
  return component.extends ? { extends: component.extends } : undefined;
}
