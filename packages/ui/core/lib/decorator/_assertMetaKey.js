export function assertMetaKey(component, key) {
  if (!component[key]) {
    throw new Error(`The meta ${key} is required for the wcagUI component: ${component}`);
  }
}
