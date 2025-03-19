/**
 * Allowed Node Types Enumeration
 * @enum {number}
 */
const EAllowedNodeType = Object.freeze({
  HTMLElement: 1,
  ChildNode: 3,
  Comment: 8,
});

/**
 * Checks if the specified property of a ChildNode is empty
 * @param {ChildNode} sibling
 * @param {string} [property='']
 * @return {boolean}
 */
const isEmptyProperty = (sibling, property = "") => {
  return property && sibling[property]?.trim().length > 0;
};

/**
 * Checks if a sibling can be added to the siblings list
 * @param {ChildNode} sibling
 * @param {string[]} [excludeTags=[]]
 * @param {ChildNode[]} [excludeElements=[]]
 * @return {boolean}
 */
const canAddSibling = (
  sibling,
  excludeTags = [],
  excludeElements = [],
  includeComments = true
) => {
  // Text nodes and textContent not empty check
  const isSiblingTextNotEmpty =
    sibling.nodeType === EAllowedNodeType.ChildNode && isEmptyProperty(sibling, "textContent");

  // Element and outerHTML not empty check
  const isSiblingElementNotEmpty =
    !excludeTags.includes(sibling.tag?.toLowerCase()) &&
    isEmptyProperty(sibling, "outerHTML");

  // Sibling not in excludeElements list
  const isSiblingElementNotInExcludeElements = !excludeElements.includes(sibling);

  return (
    (!!includeComments && sibling.nodeType === EAllowedNodeType.Comment) ||
    ((isSiblingTextNotEmpty || isSiblingElementNotEmpty) && isSiblingElementNotInExcludeElements)
  );
};

/**
 * Gets an array of ChildNodes siblings of a specified ChildNode,
 * the resulting array will include the specified ChildNode itself
 * @param {ChildNode} child
 * @param {string[]} [notAllowedTags=[]]
 * @param {ChildNode[]} [notAllowedElements=[]]
 * @return {ChildNode[]}
 */
const getSiblings = (
  child,
  notAllowedTags = [],
  notAllowedElements = [],
  siblingMethod = "nextSibling"
) => {
  const siblings = [];
  let sibling = child;

  while (sibling && allowedNodeTypes.includes(sibling.nodeType)) {
    canAddSibling(sibling, notAllowedTags, notAllowedElements) && siblings.push(sibling);
    sibling = sibling[siblingMethod];
  }

  return siblings;
};

/**
 * Gets an array of all ChildNodes siblings of a specified ChildNode,
 * starting from the first ChildNode inside the specified ChildNode's parent
 * @param {ChildNode} elem
 * @param {string[]} [notAllowedTags=[]]
 * @return {ChildNode[]}
 */
export const getAllSiblings = (elem, notAllowedTags = []) => {
  return getSiblings(elem.parentNode?.firstChild, notAllowedTags, [elem]);
};

/**
 * Gets an array of next ChildNodes siblings of a specified ChildNode,
 * starting from the first ChildNode sibling after the specified ChildNode's parent
 * @param {ChildNode} elem
 * @param {string[]} [notAllowedTags=[]]
 * @return {ChildNode[]}
 */
export const getNextSiblings = (elem, notAllowedTags = []) => {
  return getSiblings(elem.nextSibling, notAllowedTags);
};

/**
 * Gets an array of prev ChildNodes siblings of a specified ChildNode,
 * starting from the first ChildNode sibling before the specified ChildNode's parent
 * @param {ChildNode} elem
 * @param {string[]} [notAllowedTags=[]]
 * @return {ChildNode[]}
 */
export const getPrevSiblings = (elem, notAllowedTags = []) => {
  return getSiblings(elem.previousSibling, notAllowedTags, [], "previousSibling");
};
