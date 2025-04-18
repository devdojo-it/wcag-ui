/**
 * Throws a wcagUI error
 *
 * @param {string} componentName
 * @param {string} errorMessage
 */
export const error = function (componentName, errorMessage) {
  throw new Error(`wcag-ui.${componentName} error: ${errorMessage}})`);
};
