/**
 * @callback TAncestorsComparer
 * @param {Node} el
 * @returns {boolean}
 */

/**
 * The ancestors method is designed to traverse the DOM
 * and retrieve ancestor nodes of a given element
 *
 * @param {Node} el - given element
 * @param {string|TAncestorsComparer} [selectorOrComparer=''] A CSS selector string to match ancestor elements or
 * a function that receives a Node and returns true if the node matches the condition.
 * @param {boolean} [one=false] - return only the first matching ancestor or more than one
 * @param {boolean} [includeThis=false] - include the given element in the list of the ancestors
 * @return {Element[]}
 */
export const ancestors = (el, selectorOrComparer, one = false, includeThis = false) => {
  const ancestorsList = [];

  while ((one ? ancestorsList.length === 0 : true) && el !== document) {
    // (!selector || (el.matches && el.matches(selector))) && ancestorsList.unshift(el);

    if (!selectorOrComparer) {
      ancestorsList.unshift(el);
    } else {
      if (selectorOrComparer instanceof Function) {
        selectorOrComparer(el) && ancestorsList.unshift(el);
      } else if (el instanceof Element && el.matches && el.matches(selectorOrComparer)) {
        ancestorsList.unshift(el);
      }
    }

    el.parentNode && (el = el.parentNode);
  }

  !includeThis && !!ancestorsList.indexOf(el) && ancestorsList.splice(ancestorsList.indexOf(el), 1);

  return ancestorsList;
};

/**
 * The ancestor method is designed to traverse the DOM
 * and retrieve ancestor nodes of a given element
 *
 * @param {Node} el - given element
 * @param {string|TAncestorsComparer} [selectorOrComparer=''] A CSS selector string to match ancestor element or
 * a function that receives a Node and returns true if the node matches the condition.
 * @param {boolean} [includeThis=false] - include the given element in the list of the ancestors
 * @return {Element|undefined}
 */
export const ancestor = (el, selectorOrComparer = '', includeThis = false) => {
  const ancestorsResult = ancestors(el, selectorOrComparer, true, includeThis);

  return ancestorsResult.length > 0 ? ancestorsResult[0] : undefined;
};
