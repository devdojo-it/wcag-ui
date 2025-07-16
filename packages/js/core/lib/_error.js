/**
 * Throws a wcagUI error
 *
 * @param {string} componentName
 * @param {string} errorMessage
 */
export const error = (componentName, errorMessage) => {
  throw new Error(`wcag-ui.${componentName} error: ${errorMessage}})`);
};
