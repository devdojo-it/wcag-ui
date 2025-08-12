/**
 * Dispatches a namespaced CustomEvent.
 *
 * Event name format: `${eventNamespace}.${eventName}` (bubbling, cancelable).
 *
 * @param {string} eventNamespace - Namespace (e.g., component name/tag).
 * @param {string} eventName - Event name (e.g., "open", "close").
 * @param {object} [detail={}] - Data to pass in `event.detail`.
 * @param {Event} [originalEvent=undefined] - Original DOM event to include in detail.
 * @param {EventTarget} [dispatcher=undefined] - Optional custom dispatcher (defaults to `this` or `self`).
 * @returns {void}
 */
export const dispatchCustomEvent = function (
  eventNamespace,
  eventName,
  detail = {},
  originalEvent = undefined,
  dispatcher = undefined
) {
  dispatcher = dispatcher ?? this ?? self;

  const event = new CustomEvent(`${eventNamespace}.${eventName}`, {
    bubbles: true,
    cancelable: true,
    detail: {
      ...detail,
      ...(originalEvent && { originalEvent }),
    },
  });

  // Optional: instrument here if you need debug logs for emitted events.

  dispatcher.dispatchEvent(event);
};
