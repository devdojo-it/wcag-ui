/**
 * Converts a component name (PascalCase or camelCase)
 * into the "wcag-kebab-case" format for the `is` attribute.
 *
 * @param {string} name - Component name (e.g., "TreeView", "Button", "ScrollSpy")
 * @returns {string} - Formatted name for `is` (e.g., "wcag-tree-view")
 */
export function generateIsAttribute(name) {
  return `wcag-${name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2') // split camelCase/PascalCase
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2') // handle acronyms like HTMLParser
    .toLowerCase()}`;
}
