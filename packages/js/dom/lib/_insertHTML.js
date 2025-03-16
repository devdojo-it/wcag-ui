import { sanitizeHTML } from './_sanitizeHTML';

/**
 * Inserts a sanitized HTML code in a certain position relative to another element.
 *
 * @param {string} html - the HTML code to be inserted in the targetElement
 * @param {HTMLElement} targetElement - the target element where the insertion will happen
 * @param {TInsertPositions} position - the position where to insert the element (before='beforebegin', prepend='afterbegin', append='beforeend', after='afterend')
 * @param {boolean} [emptyTarget=false] - specifies if the targetElement should be emptied before insertion
 * @return {NodeList} The inserted elements NodeList
 */

export const insertHTML = (html, targetElement, position, emptyTarget = false) => {
  emptyTarget && (targetElement.innerHTML = "");

  const sanitizedDOM = sanitizeHTML(html, true);

  const fragment = document.createDocumentFragment();
  fragment.append(...sanitizedDOM);

  // position === 'beforebegin' && target.before(fragment);
  // position === 'afterbegin' && target.prepend(fragment);
  // position === 'beforeend' && target.append(fragment);
  // position === 'afterend' && target.after(fragment);
  targetElement[position](fragment);

  return sanitizedDOM;
};
