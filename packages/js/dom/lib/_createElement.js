import { sanitizeHTML } from './_sanitizeHTML';

/**
 * create an element and return it
 *
 * @param {TElementOptions} options of the element to create
 * @return {Element}
 */
export const createElement = (options) => {
  if (!options.tag) {
    throw new Error(`wcag-ui.core.createElement error: no tag provided`);
  }

  const element = document.createElement(options.tag);

  options.classes && element.classList.add(...options.classes);

  for (const [key, value] of Object.entries(options.attributes ?? {})) {
    element.setAttribute(key, value);
  }

  const fragment = document.createDocumentFragment();
  fragment.append(...sanitizeHTML(options.content, true));

  options.content && element.append(fragment);

  return element;
};
