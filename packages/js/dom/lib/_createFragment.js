
/**
 * create an document fragment, appends the specified children to it and returns it
 *
 * @param {...ChildNode} children to append
 * @return {DocumentFragment}
 */
export const createFragment = (...children) => {
  const fragment = document.createDocumentFragment();

  fragment.append(...children);

  return fragment;
};
