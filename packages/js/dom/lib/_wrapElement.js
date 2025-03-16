import { ensureElement } from "./_ensureElement";
import { insertElement } from './_insertElement';
/**
 * insert an element in a certain position respect to another element
 *
 * @param {Element|TElementOptions} elementOrOptions - the element to be wrapped or the options to build it
 * @param {Element|TElementOptions} wrapperElementOrOptions - the wrapperElement or the options to build it
 * @return {Element} the wrapper element
 */
export const wrapElement = (elementOrOptions, wrapperElementOrOptions) => {
  const element = ensureElement(elementOrOptions);
  const wrapperElement = ensureElement(wrapperElementOrOptions);

  // checks if the wrapperElement isConnected or not to the DOM,
  // if not the wrapperElement will be put before begin the element
  !wrapperElement.isConnected && insertElement(wrapperElement, element, "before");

  insertElement(element, wrapperElement, "append");

  return wrapperElement;
};
