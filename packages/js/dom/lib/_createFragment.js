import { sanitizeHTML } from './_sanitizeHTML';

/**
 * create an document fragment, appends the specified children to it and returns it
 *
 * @param {...ChildNode} children to append
 * @return {Element}
 */
export const createFragment = (...children) => {
  const fragment = document.createDocumentFragment();

  fragment.append(...children);

  return fragment;
};
