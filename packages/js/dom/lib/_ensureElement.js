import { createElement } from './_createElement';

/**
 * create an element and return it
 *
 * @param {Element|TElementOptions} elementOrOptions - instance of an element or options
 * @return {boolean} true, if the parameter is an Element
 */
function isElement(elementOrOptions) {
  return elementOrOptions instanceof HTMLElement || elementOrOptions instanceof DocumentFragment;
}

/**
 * checks if the parameter is an element or creates it
 *
 * @param {Element|TElementOptions} elementOrOptions - the element or the options for building it
 * @return {Element}
 */
export const ensureElement = (elementOrOptions) => {
  return isElement(elementOrOptions) ? elementOrOptions : createElement(elementOrOptions);
};
