import { sanitizeHTML } from "./_sanitizeHTML";

/**
 * @typedef TElementAttributes
 * @type {{[key: string]: string}}
 */

/**
 * @typedef TElementOptions
 * @type {object}
 * @property {string} tagName - element's tag name.
 * @property {string[]} [classes] - element's classes.
 * @property {TElementAttributes} [attributes] - element's attributes in the form of { [key: string]: string }.
 * @property {string} [content] - the content to be added as textContent in the element.
 */

/**
 * @typedef TInsertPositions
 * @type {'before'|'prepend'|'append'|'after'}
 */

const EInsertPositions = Object.freeze({
  before: "beforebegin",
  prepend: "afterbegin",
  append: "beforeend",
  after: "afterend",
});

/**
 * create an element and return it
 *
 * @param {Element|TElementOptions} elementOrOptions - instance of an element or options
 * @return {boolean} true, if the parameter is an Element
 */
function isElement(elementOrOptions) {
  return elementOrOptions instanceof HTMLElement;
}

/**
 * create an element and return it
 *
 * @param {TElementOptions} options of the element to create
 * @return {Element}
 */
export const createElement = (options) => {
  if (!options.tagName) {
    throw new Error(`monk-ui.core.createElement error: no tagName provided`);
  }

  const element = document.createElement(options.tagName);

  options.classes && element.classList.add(...options.classes);

  for (const [key, value] of Object.entries(options.attributes ?? {})) {
    element.setAttribute(key, value);
  }

  const fragment = document.createDocumentFragment();
  fragment.append(...sanitizeHTML(options.content, true));

  options.content && element.append(fragment);

  return element;
};

/**
 * checks if the parameter is an element or creates it
 *
 * @param {Element|TElementOptions} elementOrOptions - the element or the options for building it
 * @return {Element}
 */
export const ensureElement = (elementOrOptions) => {
  const ensuredElement = isElement(elementOrOptions)
    ? elementOrOptions
    : createElement(elementOrOptions);
};

/**
 * Inserts a sanitized HTML code in a certain position relative to another element.
 *
 * @param {string} html - the HTML code to be inserted in the targetElement
 * @param {HTMLElement} targetElement - the target element where the insertion will happen
 * @param {TInsertPositions} position - the position where to insert the element (before='beforebegin', prepend='afterbegin', append='beforeend', after='afterend')
 * @param {boolean} [emptyTarget=false] - specifies if the targetElement should be emptied before insertion
 * @return {NodeList} The inserted elements NodeList
 */

export const insert = (html, targetElement, position, emptyTarget = false) => {
  emptyTarget && (target.innerHTML = "");

  const sanitizedDOM = sanitizeHTML(html, true);

  const fragment = document.createDocumentFragment();
  fragment.append(...sanitizedDOM);

  // position === 'beforebegin' && target.before(fragment);
  // position === 'afterbegin' && target.prepend(fragment);
  // position === 'beforeend' && target.append(fragment);
  // position === 'afterend' && target.after(fragment);
  target[EInsertPositions[position]](fragment);

  return sanitizedDOM;
};

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
