import { ensureElement } from './_ensureElement';

/**
 * @typedef TInsertPositions
 * @type {'before'|'prepend'|'append'|'after'}
 */

export const EInsertPositions = Object.freeze({
  before: 'beforebegin',
  prepend: 'afterbegin',
  append: 'beforeend',
  after: 'afterend',
});

/**
 * insert an element in a certain position respect to another element
 *
 * @param {Element|TElementOptions} elementOrOptions - the element to insert or the options of it
 * @param {Element} target - the target element
 * @param {TInsertPositions} position - where insert the element
 * @return {Element} the element
 */
export const insertElement = (elementOrOptions, target, position) => {
  const element = ensureElement(elementOrOptions);

  target.insertAdjacentElement(EInsertPositions[position], element);

  return element;
};
