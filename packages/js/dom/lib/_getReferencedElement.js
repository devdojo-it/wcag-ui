/** @type {(node: Node) => node is Document | ShadowRoot} */
const isRoot = (node) => {
  return typeof node.getRootNode === 'function';
};

/**
 * @param {string} string
 */
function escapeAttributeValueSelector(string) {
  return string.replace(/["' \\]/g, '\\$0');
}

/**
 * Return the element in the same DOM tree (either the document or a ShadowRoot)
 * that is referenced by the given id.
 * @param {Element} element
 * @param {string | null} id
 * @param {...string} attributes
 * @returns {HTMLElement | SVGElement | MathMLElement | null}
 */
export function getReferencedElement(element, id, ...attributes) {
  const root = element.getRootNode();
  if (!id || !isRoot(root)) return null;
  const escapedId = escapeAttributeValueSelector(id);
  return root.querySelector(
    (attributes.length ? attributes : ['id']).map((attribute) => `[${attribute}~="${escapedId}"]`).join(',')
  );
}
