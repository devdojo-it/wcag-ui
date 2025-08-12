import { dispatchCustomEvent } from './_dispatchCustomEvent';

/**
 * Dispatches a namespaced custom event for a wcag-ui component instance.
 *
 * Uses `this.componentName` as the namespace and `${componentName}.${eventName}` as final event type.
 *
 * @param {string} eventName - Event name (e.g., "open", "close").
 * @param {object} details - Data to include in `event.detail`.
 * @param {Event} [originalEvent=undefined] - Optional originating DOM event.
 * @returns {void}
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
