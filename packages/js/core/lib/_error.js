/**
 * Throws a standardized wcag-ui error.
 *
 * @param {string} componentName - Component name for context (e.g., "Dialog").
 * @param {string} errorMessage - Error message.
 * @returns {never}
 */
export const error = (componentName, errorMessage) => {
  throw new Error(`wcag-ui.${componentName} error: ${errorMessage}`);
};
