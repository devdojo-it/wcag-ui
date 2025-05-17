export function assertMetaKey(componentIdentifier, key) {
  if (!componentIdentifier[key]) {
    throw new Error(`The meta ${key} is required for the wcagUI component: ${componentIdentifier}`);
  }
}
