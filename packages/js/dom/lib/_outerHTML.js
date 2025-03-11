/**
 * Returns the outer HTML of an element, with an option to exclude the element's content.
 *
 * @param {HTMLElement} element The target element from which to get the outer HTML.
 * @param {boolean} [excludeContent=false] A boolean flag indicating whether to exclude the content between the opening and closing tags.
 * If set to true, the content will be removed from the resulting HTML.
 * @return {string} The outer HTML of the element, optionally without its content.
 */

export const outerHTML = (element, excludeContent = false) => {
  if (!excludeContent) {
    return element.outerHTML;
  }

  return element.outerHTML.replaceAll("\n", "").replace(/(?<=<.*?>).*(?=<\/.*>)/gm, "");
};
