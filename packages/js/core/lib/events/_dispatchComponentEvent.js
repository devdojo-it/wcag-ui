import { dispatchCustomEvent } from './_dispatchCustomEvent';

/**
 * Dispatches a custom event for a wcag-ui component
 *
 * @param {string} eventName
 * @param {object} details
 * @param {Event} [originalEvent=undefined]
 */
export const dispatchComponentEvent = function (eventName, details, originalEvent = undefined) {
  const componentName = this.componentName;

  dispatchCustomEvent.call(
    this,
    componentName,
    eventName,
    details,
    originalEvent ?? new Event(`${componentName}.${eventName}`)
  );
};
