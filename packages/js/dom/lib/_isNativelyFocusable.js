const nativelyFocusableElements = [
  'button',
  'input',
  'select',
  'textarea',
  'a[href]',
  'area[href]',
  'summary',
  'iframe',
  'details',
  'video',
  'audio',
  'dialog',
  '[contenteditable]'
].join(',');

/**
 * Check if an element is natively focusable.
 * @param {Element} element
 */
export function isNativelyFocusable(element) {
  return element.matches(nativelyFocusableElements);
}
