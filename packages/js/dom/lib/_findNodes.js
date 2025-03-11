/**
 * finds nodes in a given node by using the query parameter for querying the textContent
 *
 * @param {string} query - the namespace of the event
 * @param {Node} node - the given node
 * @return {Node[]}
 */
export const findNodes = (query, node) => {
  if (!node.textContent?.toLowerCase().includes(query.toLowerCase())) {
    return [];
  }

  if (![...node.childNodes].length) {
    return [node];
  }

  const foundNodes = [];

  for (const child of [...node.childNodes]) {
    foundNodes.push(...findNodes(query, child));
  }

  return foundNodes;
};
