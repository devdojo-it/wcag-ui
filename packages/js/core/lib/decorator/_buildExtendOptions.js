export function buildExtendOptions(componentIdentifier) {
  return componentIdentifier.extends ? { extends: componentIdentifier.extends } : undefined;
}
