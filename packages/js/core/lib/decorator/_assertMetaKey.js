/**
 * Asserts that a required static meta key exists on the component constructor.
 *
 * Throws a descriptive error if the key is missing.
 *
 * @param {Record<string, unknown>} component - Component constructor (or its static bag).
 * @param {string} key - The required key to verify (e.g., 'events', 'attributes').
 * @returns {void}
 * @throws {Error} If the key is not present on the component.
 */
export function assertMetaKey(component, key) {
  if (!component[key]) {
    throw new Error(`The meta ${key} is required for the wcagUI component: ${component}`);
  }
}
